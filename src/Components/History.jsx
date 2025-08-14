import { clearHistory } from '../Utils/Storage';

const History = ({ recentHistory, setRecentHistory, setSelectedHistory }) => {


    return (
        <div>
            <h1 className='text-xl text-white py-2 flex items-center justify-center gap-1'>
                <span>Recent History</span>
                <button
                    onClick={() => clearHistory(setRecentHistory)}
                    className='cursor-pointer '>
                    <svg className='hover:w-8 hover:h-8' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" /></svg></button>
            </h1>
            <ul className='text-left  text-zinc-400 overflow-auto '>
                {
                    recentHistory && recentHistory.map((item, idx) => (
                        <li
                            key={idx}
                            onClick={() => { setSelectedHistory(item) }}
                            className=' rounded-md px-6 py-1 cursor-pointer hover:bg-zinc-700 hover:text-zinc-100 truncate'>{item} </li>
                    ))
                }
            </ul>

        </div>
    );
};

export default History;