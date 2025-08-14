export const payload = (question, selectedHistory) => {
    const payloadData = question?question :selectedHistory;

    return {
        contents: [
            {
                parts: [
                    { text: payloadData }
                ]
            }
        ]
    };
};
