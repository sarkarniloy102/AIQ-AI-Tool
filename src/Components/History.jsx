import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import { useState, useEffect, useRef } from "react";

const History = ({ recentHistory, setRecentHistory, setSelectedHistory }) => {
  const [openIndex, setOpenIndex] = useState(null);
  const dropdownRef = useRef(null);

  const deleteHistoryItem = (index) => {
    const newHistory = [...recentHistory];
    newHistory.splice(index, 1);
    setRecentHistory(newHistory);
    localStorage.setItem("recentHistory", JSON.stringify(newHistory));
    setOpenIndex(null);
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenIndex(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="container h-screen overflow-auto overscroll-auto p-2">
      <h1 className="text-xl dark:text-white text-zinc-900 py-2 flex items-center justify-center gap-1">
        Recent History
      </h1>

      <ul className="text-left dark:text-zinc-400 text-zinc-800 overflow-auto">
        {recentHistory &&
          recentHistory.map((item, idx) => (
            <li
              key={idx}
              className="flex justify-between items-center rounded-md px-4 py-2 hover:bg-blue-100 dark:hover:bg-zinc-700 relative"
            >
              <span
                className="cursor-pointer truncate"
                onClick={() => setSelectedHistory(item)}
              >
                {item}
              </span>

              {/* Three-dot dropdown icon */}
              <div className="relative" ref={dropdownRef}>
                <button
                  className="text-black dark:text-white p-1 focus:outline-none cursor-pointer"
                  onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                >
                  <EllipsisHorizontalIcon className="w-5 h-5" />
                </button>

                {/* Dropdown menu */}
                {openIndex === idx && (
                  <div className="absolute right-0 mt-1 w-20 bg-white dark:bg-zinc-700 border dark:border-zinc-600 rounded shadow-lg z-10">
                    <button
                      onClick={() => deleteHistoryItem(idx)}
                      className=" border-0 w-full text-left px-3 py-2 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-800 rounded cursor-pointer"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default History;
