import React from 'react';

const History = ({ recentHistory }) => {
    return (
        <div>
            <ul>
                {
                    recentHistory && recentHistory.map((item) => (
                        <li className='text-left text-zinc-100 p-2 '>{item}</li>
                    ))
                }
            </ul>

        </div>
    );
};

export default History;