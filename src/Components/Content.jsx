import Answers from "./Answers";
import Loader from "./Loader";
import Navbar from "./Navbar";

const Content = ({ question, setQuestion, result, loader, ask, scrollToAns }) => {
    const isEnter = (e) => {
        if (e.key === "Enter") ask();
    };

    return (
        <div className="col-span-4">
            {/* Navbar */}
            <Navbar />

            {/* Loader */}
            {loader && <Loader />}

            {/* Q&A display */}
            <div
                ref={scrollToAns}
                className="container h-140 p-10 overflow-auto overscroll-auto"
            >
                <div className="dark:text-zinc-100 text-zinc-900">
                    {result.map((item, idx) =>
                        item.type === "q" ? (
                            <Answers
                                key={idx + Math.random()}
                                className="text-right text-7xl border border-zinc-600 p-1"
                                ans={item.text}
                                totalResult={1}
                                flag={0}
                                idx={idx}
                            />
                        ) : (
                            item.text.map((ansItem, ansIndex) => (
                                <Answers
                                    key={ansIndex + Math.random()}
                                    className="text-left p-1"
                                    ans={ansItem}
                                    totalResult={1}
                                    flag={1}
                                    idx={ansIndex}
                                />
                            ))
                        )
                    )}
                </div>
            </div>

            {/* Input box */}
            <div className="dark:bg-zinc-800 bg-blue-100 mb-4 w-1/2 h-14 p-1 pr-4 m-auto text-zinc-900 dark:text-white rounded-4xl border dark:border-zinc-500 border-blue-200 flex justify-center items-center ">
                <input
                    type="text"
                    placeholder="Ask Me Anything"
                    className="w-full h-full p-3 outline-none"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    onKeyDown={isEnter}
                />
                <button onClick={() => ask()} className="cursor-pointer">
                    Ask
                </button>
            </div>
            <span className="mt-4 text-sm dark:text-zinc-300 text-zinc-800">AIQ can make mistakes. Check important info.</span>
        </div>
    );
};

export default Content;
