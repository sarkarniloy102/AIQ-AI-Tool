/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { checkHeading, replaceHeadingStarts } from "../Funtion";
import SyntaxHighlighter from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import ReactMarkdown from "react-markdown"


const Answers = ({ ans, idx, totalResult, flag }) => {

    const [heading, setHeading] = useState(false);
    const [answer, setAnswer] = useState(ans);

    useEffect(() => {
        if (checkHeading(ans)) {
            setHeading(ans);
            setAnswer(replaceHeadingStarts(ans));
        }
    }, [ans])

    function checkHeading(str) {
        return /^(\*)(\*)(.*)\*$/.test(str)
    }

    const renderer = {
        code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
                <SyntaxHighlighter {...props}
                    children={String(children).replace(/\n$/, '')}
                    language={match[1]}
                    style={dark}
                    PreTag="div" />
            ):(
                <code {...props} className={className}>
                    {children}
                </code>
            )
        }
    }


    return (
        <>
            <ul>
                <div className={flag === 0 ? "flex justify-end" : ""}>
                    <li className={`${flag === 1 ? "text-left " : "text-right border-7 dark:border-zinc-800 border-blue-100 dark:bg-zinc-800 bg-blue-100 w-fit rounded-tr-3xl rounded-br-3xl rounded-bl-3xl"} p-1`}>
                        {
                            idx === 0 && totalResult > 1 ? <strong className=" block text-xl">{answer}</strong > :
                                heading ? <strong className="pt-2 block text-lg">{answer}</strong > : <span className={flag === 0 ? "pl-1" : "pl-4"}>
                                    <ReactMarkdown components={renderer}>
                                        {answer}
                                    </ReactMarkdown>
                                </span>
                        }
                    </li>

                </div>

            </ul>
        </>
    );
};

export default Answers;