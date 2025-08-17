import { clearHistory } from '../Utils/Storage';

const History = ({ recentHistory, setRecentHistory, setSelectedHistory, setResult }) => {


    const NewChat = () => {
        localStorage.removeItem('chatResult');
        setResult([]);
    }


    return (
        <div className='container h-screen overflow-auto overscroll-auto'>
            <h1 className='text-xl dark:text-white text-zinc-900 py-2 flex items-center justify-center gap-1'>
                <span>Recent History</span>
                <button
                    onClick={() => clearHistory(setRecentHistory)}
                    className='cursor-pointer '>
                    <svg className='hover:w-8 hover:h-8 ' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" /></svg></button>
            </h1>
            {/* button for new chats */}
            <button
                onClick={NewChat}
                className="flex items-center gap-2 m-2 p-2 rounded-m text-zinc-800 hover:text-lg dark:text-white cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M120-160v-600q0-33 23.5-56.5T200-840h480q33 0 56.5 23.5T760-760v203q-10-2-20-2.5t-20-.5q-10 0-20 .5t-20 2.5v-203H200v400h283q-2 10-2.5 20t-.5 20q0 10 .5 20t2.5 20H240L120-160Zm160-440h320v-80H280v80Zm0 160h200v-80H280v80Zm400 280v-120H560v-80h120v-120h80v120h120v80H760v120h-80ZM200-360v-400 400Z" /></svg>
                <span>New chat</span>
            </button>
            {/* past chats */}
            <span className='flex justify-start pl-5 border-b dark:border-zinc-600 dark:text-zinc-300 border-gray-300 font-bold '>Chats</span>
            <ul className='text-left  dark:text-zinc-400 text-zinc-800 overflow-auto '>
                {
                    recentHistory && recentHistory.map((item, idx) => (
                        <li
                            key={idx}
                            onClick={() => { setSelectedHistory(item) }}
                            className=' rounded-md px-6 py-1 cursor-pointer dark:hover:bg-zinc-700  hover:bg-blue-300 hover:text-zinc-100 truncate'>{item} </li>
                    ))
                }
            </ul>

        </div>
    );
};

export default History;