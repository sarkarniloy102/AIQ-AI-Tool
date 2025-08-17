import Answers from "./Answers";
import Loader from "./Loader";
import Navbar from "./Navbar";

const Content = ({ question, setQuestion, result, loader, ask, scrollToAns }) => {
    const isEnter = (e) => {
        if (e.key === "Enter") ask();
    };

    return (
        <div className="flex flex-col h-screen">
            {/* Navbar */}
            <Navbar />

            {/* Loader */}
            {loader && <Loader />}

            {/* Q&A display */}
            <div
                ref={scrollToAns}
                className="flex-1 p-4 md:p-8 lg:p-10 overflow-auto overscroll-auto"
            >
                <div className="dark:text-zinc-100 text-zinc-900">
                    {result.map((item, idx) =>
                        item.type === "q" ? (
                            <Answers
                                key={idx + Math.random()}
                                className="text-right text-base md:text-xl lg:text-2xl border border-zinc-600 p-2 md:p-4 rounded"
                                ans={item.text}
                                totalResult={1}
                                flag={0}
                                idx={idx}
                            />
                        ) : (
                            item.text.map((ansItem, ansIndex) => (
                                <Answers
                                    key={ansIndex + Math.random()}
                                    className="text-left text-sm md:text-base p-2 md:p-4 rounded"

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
            <div className="dark:bg-zinc-800 bg-blue-100 mb-4 w-2/3 lg:w-1/2 h-14 p-1 pr-4 m-auto text-zinc-900 dark:text-white rounded-4xl border dark:border-zinc-500 border-blue-200 flex justify-center items-center ">
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
            <span className="mb-4 text-sm dark:text-zinc-300 text-zinc-800">AIQ can make mistakes. Check important info.</span>
        </div>
    );
};

export default Content;
