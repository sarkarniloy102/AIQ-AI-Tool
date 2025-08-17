import { useState, useEffect, useRef } from "react";
import History from "./Components/History";
import { getHistory } from "./Utils/Storage";
import { handleAskQuestion } from "./Utils/handleAskQuestion";
import Content from "./Components/Content";
import ThemeToggle from "./Components/ThemeToggle"; // 👈 new
import SidebarToggle from "./Components/SidebarToggle";

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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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

  return (
    <div>
      <div className="grid grid-cols-5 h-screen text-center">
        {/* Theme Toggle */}
        <ThemeToggle />
        {/* responsive Sidebar Toggle Button */}
        <SidebarToggle
          isOpen={isSidebarOpen}
          setIsOpen={setIsSidebarOpen}></SidebarToggle>
        {/* Sidebar */}
        {/* <div className="col-span-1 dark:bg-zinc-800 bg-blue-100">
          <History
            recentHistory={recentHistory}
            setRecentHistory={setrecentHistory}
            setSelectedHistory={setSelectedHistory}
            setResult={setResult}
          />
        </div> */}
        <div
          className={`fixed inset-y-0 left-0 z-30 w-64 transform transition-transform duration-300 md:relative md:translate-x-0 dark:bg-zinc-800 bg-blue-100 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            }`}
        >
          <History
            recentHistory={recentHistory}
            setRecentHistory={setrecentHistory}
            setSelectedHistory={setSelectedHistory}
            setResult={setResult}
          />
        </div>

        {/* Overlay for mobile sidebar */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 z-20 bg-black opacity-30 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          ></div>
        )}

        {/* Content */}
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
