import { useState, useEffect, useRef } from "react";
import History from "./Components/History";
import { getHistory } from "./Utils/Storage";
import { handleAskQuestion } from "./Utils/handleAskQuestion";
import Content from "./Components/Content";

function App() {
  const [question, setQuestion] = useState("");
  const [result, setResult] = useState([]);
  const [recentHistory, setrecentHistory] = useState(getHistory());
  const [selectedHistory, setSelectedHistory] = useState("");
  const scrollToAns = useRef();
  const [loader, setLoader] = useState(false);

  const ask = (ques = "") => {
    setLoader(true);
    handleAskQuestion({
      ques,
      question,
      selectedHistory,
      setRecentHistory: setrecentHistory,
      setResult,
      setQuestion,
    });

    setTimeout(() => {
      if (scrollToAns.current) {
        scrollToAns.current.scrollTo({
          top: scrollToAns.current.scrollHeight,
          behavior: "smooth",
        });
      }
      setLoader(false);
    }, 500);
  };

  useEffect(() => {
    if (selectedHistory) ask();
  }, [selectedHistory]);

  return (
    <div className="grid grid-cols-5 h-screen text-center">
      {/* Sidebar */}
      <div className="col-span-1 bg-zinc-800">
        <History
          recentHistory={recentHistory}
          setRecentHistory={setrecentHistory}
          setSelectedHistory={setSelectedHistory}
        />
      </div>

      {/* Main content */}
      <Content
        question={question}
        setQuestion={setQuestion}
        result={result}
        loader={loader}
        ask={ask}
        scrollToAns={scrollToAns}
      />
    </div>
  );
}

export default App;
