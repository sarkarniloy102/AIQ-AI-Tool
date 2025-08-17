import { useState, useEffect, useRef } from "react";
import History from "./Components/History";
import { getHistory } from "./Utils/Storage";
import { handleAskQuestion } from "./Utils/handleAskQuestion";
import Content from "./Components/Content";

function App() {
  const [question, setQuestion] = useState("");
  const [result, setResult] = useState(() => {
    const saved = localStorage.getItem("chatResult");
    return saved ? JSON.parse(saved) : [];
  });
  const [recentHistory, setrecentHistory] = useState(getHistory());
  const [selectedHistory, setSelectedHistory] = useState("");
  const scrollToAns = useRef();
  const [loader, setLoader] = useState(false);

  // const ask = (ques = "") => {
  //   setLoader(true);
  //   handleAskQuestion({
  //     ques,
  //     question,
  //     selectedHistory,
  //     setRecentHistory: setrecentHistory,
  //     setResult,
  //     setQuestion,
  //   });

  //   setTimeout(() => {
  //     if (scrollToAns.current) {
  //       scrollToAns.current.scrollTo({
  //         top: scrollToAns.current.scrollHeight,
  //         behavior: "smooth",
  //       });
  //     }
  //     setLoader(false);
  //   }, 500);
  // };

  const ask = async (ques = "") => {
    setLoader(true);
    await handleAskQuestion({
      ques,
      question,
      selectedHistory,
      setRecentHistory: setrecentHistory,
      setResult,
      setQuestion,
    });

    if (scrollToAns.current) {
      scrollToAns.current.scrollTo({
        top: scrollToAns.current.scrollHeight,
        behavior: "smooth",
      });
    }

    setLoader(false);
  };

  useEffect(() => {
    if (selectedHistory) ask();
  }, [selectedHistory]);

  // persist chat
  useEffect(() => {
    localStorage.setItem("chatResult", JSON.stringify(result));
  }, [result]);

  // dark mode with persistence
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") || "dark";
  });

  useEffect(() => {
    if (darkMode === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", darkMode);
  }, [darkMode]);

  return (
    <div className={darkMode === "dark" ? "dark" : "light"}>
      <div className="grid grid-cols-5 h-screen text-center">
        {/* theme option */}
        <select
          onChange={(e) => setDarkMode(e.target.value)}
          value={darkMode}
          className="fixed dark:text-white text-zinc-800 bottom-0 p-5"
        >
          <option value="dark" className="dark:bg-zinc-500">
            Dark
          </option>
          <option value="light" className="dark:bg-zinc-500">
            Light
          </option>
        </select>

        {/* Sidebar */}
        <div className="col-span-1 dark:bg-zinc-800 bg-blue-100">
          <History
            recentHistory={recentHistory}
            setRecentHistory={setrecentHistory}
            setSelectedHistory={setSelectedHistory}
            setResult={setResult}
          />
        </div>

        {/*content */}
        <Content
          question={question}
          setQuestion={setQuestion}
          result={result}
          loader={loader}
          ask={ask}
          scrollToAns={scrollToAns}
        />
      </div>
    </div>
  );
}

export default App;
