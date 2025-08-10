

const Answers = ({ ans, idx }) => {
    console.log(ans, idx);
    return (
        <>
            <ul>
                <li className="text-left p-1">
                    {ans}
                </li>
            </ul>
        </>
    );
};

export default Answers;