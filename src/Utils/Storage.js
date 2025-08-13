// Save a new question to history
export function saveHistory(question) {
    let history = JSON.parse(localStorage.getItem('history')) || [];
    history = [question, ...history];
    localStorage.setItem('history', JSON.stringify(history));
    return history;
}

// Get full history
export function getHistory() {
    return JSON.parse(localStorage.getItem('history')) || [];
}

// Clear history
export function clearHistory(setRecentHistory) {
    // localStorage.removeItem('history');
    localStorage.clear();
    setRecentHistory([]);
    
}
