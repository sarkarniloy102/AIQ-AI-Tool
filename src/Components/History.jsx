import React from 'react';

const History = ({ recentHistory }) => {
    return (
        <div>
            <h1 className='text-xl text-white py-2'>Recent History</h1>
            <ul className='text-left text-zinc-400 overflow-auto '>
                {
                    recentHistory && recentHistory.map((item) => (
                        <li className=' px-4 py-1 cursor-pointer hover:bg-zinc-700 hover:text-zinc-100 truncate'>{item}</li>
                    ))
                }
            </ul>

        </div>
    );
};

export default History;