import { saveHistory } from "./Storage";
import { payload } from "./API";
import { URL } from "../Constants";

export async function handleAskQuestion({
    ques = "",
    question,
    selectedHistory,
    setRecentHistory,
    setResult,
    setQuestion,
    
}) {
    
    
    const currentQuestion = ques || question || selectedHistory;
    if (!currentQuestion) return;

    // Save to history
    const updatedHistory = saveHistory(currentQuestion);
    setRecentHistory(updatedHistory);

    // Call API
    
    const response = await fetch(URL, {
        method: "POST",
        body: JSON.stringify(payload(currentQuestion, selectedHistory))
    });

    const data = await response.json();
    const dataString = data.candidates[0].content.parts[0].text;
    const dataArray = dataString.split("* ").map(item => item.trim());

    // Update results
    setResult(result => [
        ...result,
        { type: "q", text: currentQuestion },
        { type: "a", text: dataArray }
    ]);

    setQuestion(""); // clear input
}
