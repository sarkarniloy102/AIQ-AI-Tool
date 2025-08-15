import { useState, useEffect } from "react";
import Answers from "./Components/Answers";
import History from "./Components/History";
import { getHistory } from "./Utils/Storage";
import { handleAskQuestion } from "./Utils/handleAskQuestion";

function App() {
  const [question, setQuestion] = useState("");
  const [result, setResult] = useState([]);
  const [recentHistory, setrecentHistory] = useState(getHistory());
  const [selectedHistory, setSelectedHistory] = useState("");

  const ask = (ques = "") =>
    handleAskQuestion({
      ques,
      question,
      selectedHistory,
      setRecentHistory: setrecentHistory,
      setResult,
      setQuestion
    });

  const isEnter = (e) => {
    if (e.key === "Enter") {
      ask();
    }
  };

  useEffect(() => {
    if (selectedHistory) ask();
    console.log(selectedHistory);
  }, [selectedHistory]);

  return (
    <>
      <div className="grid grid-cols-5 h-screen text-center">
        {/* sidebar */}
        <div className="col-span-1 bg-zinc-800">
          <History
            recentHistory={recentHistory}
            setRecentHistory={setrecentHistory}
            setSelectedHistory={setSelectedHistory}
          />
        </div>

        {/* content */}
        <div className="col-span-4">
          <div className="container h-155 p-10 overflow-auto overscroll-auto">
            <div className="text-zinc-100">
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

          {/* input box */}
          <div className="bg-zinc-800 w-1/2 h-14 p-1 pr-4 m-auto text-white rounded-4xl border border-zinc-500 flex justify-center items-center ">
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
        </div>
      </div>
    </>
  );
}

export default App;
