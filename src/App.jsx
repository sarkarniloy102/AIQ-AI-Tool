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

  // dark mode 
  const [darkMode, setDarkMode] = useState('dark');
  useEffect(() => {
    if (darkMode == 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  return (
    <div className={darkMode=='dark' ? 'dark' : 'light'}>
      <div className="grid grid-cols-5 h-screen text-center">
        {/* theme option */}
        <select onChange={(e) => setDarkMode(e.target.value)}  className="fixed dark:text-white text-zinc-800  bottom-0 p-5">
          <option value="dark" className="dark:bg-zinc-500">Dark</option>
          <option value="light" className="dark:bg-zinc-500">Light</option>
        </select>
        {/* Sidebar */}
        <div className="col-span-1 dark:bg-zinc-800 bg-blue-100">
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
    </div>
  );
}

export default App;
