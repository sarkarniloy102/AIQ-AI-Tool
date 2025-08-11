/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { checkHeading, replaceHeadingStarts } from "../Funtion";


const Answers = ({ ans, idx, totalResult }) => {

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



    return (
        <>
            <ul>
                <li className="text-left p-1">
                    {
                        idx === 0 && totalResult > 1 ? <strong className=" block text-xl">{answer}</strong > :
                            heading ? <strong className="pt-2 block text-lg">{answer}</strong > : <span className="pl-4">{answer}</span>
                    }
                </li>
            </ul>
        </>
    );
};

export default Answers;