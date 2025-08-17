import { clearHistory } from '../Utils/Storage';
import { EllipsisHorizontalIcon, PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";

const History = ({ recentHistory, setRecentHistory, setSelectedHistory, setResult }) => {
    const [openIndex, setOpenIndex] = useState(null);

    // Delete single history item
    const deleteHistoryItem = (index) => {
        const newHistory = [...recentHistory];
        newHistory.splice(index, 1);
        setRecentHistory(newHistory);
        localStorage.setItem("recentHistory", JSON.stringify(newHistory));
        setOpenIndex(null);
    };

    // New chat
    const NewChat = () => {
        localStorage.removeItem('chatResult');
        setResult([]);
    };

    // Close dropdown if clicking outside any open dropdown
    useEffect(() => {
        const handleClickOutside = (event) => {
            console.log(event);
            setOpenIndex(null);
        };
        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, []);

    return (
        <div className='container h-screen overflow-auto overscroll-auto p-2'>
            <h1 className='text-xl dark:text-white text-zinc-900 py-2 flex items-center justify-center gap-1'>
                <span>Recent History</span>
                <button
                    onClick={() => clearHistory(setRecentHistory)}
                    className='cursor-pointer'>
                    <TrashIcon className='w-5 h-5 hover:w-6 hover:h-6'/>
                </button>
            </h1>

            {/* New Chat */}
            <button
                onClick={NewChat}
                className="flex items-center gap-2 m-2 p-2 rounded text-zinc-800 hover:text-lg dark:text-white cursor-pointer">
                    <PencilSquareIcon className='w-5 h-5'/>
                <span>New chat</span>
            </button>

            {/* Past Chats */}
            <span className='flex justify-start pl-5 border-b dark:border-zinc-600 dark:text-zinc-300 border-gray-300 font-bold'>Chats</span>
            <ul className='text-left dark:text-zinc-400 text-zinc-800 overflow-auto'>
                {recentHistory && recentHistory.map((item, idx) => (
                    <li
                        key={idx}
                        className='flex justify-between items-center rounded-md px-6 py-1 cursor-pointer dark:hover:bg-zinc-700 hover:bg-blue-300 hover:text-zinc-100 truncate'
                        onClick={() => setSelectedHistory(item)}
                    >
                        <span className="truncate">{item}</span>

                        {/* Dropdown button */}
                        <button
                            onClick={(e) => { e.stopPropagation(); setOpenIndex(openIndex === idx ? null : idx); }}
                            className="text-black dark:text-white p-1 focus:outline-none cursor-pointer"
                        >
                            <EllipsisHorizontalIcon className="w-5 h-5 hover:w-6 hover:h-6" />
                        </button>

                        {/* Dropdown menu */}
                        {openIndex === idx && (
                            <div
                                className="absolute right-0  bg-blue-50 dark:bg-zinc-700 border dark:border-zinc-600 rounded shadow-lg z-10"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <button
                                    onClick={() => deleteHistoryItem(idx)}
                                    className=" text-left p-1 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-800 rounded cursor-pointer"
                                >
                                    Delete
                                </button>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default History;
