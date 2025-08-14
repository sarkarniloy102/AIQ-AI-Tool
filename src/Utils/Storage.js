// Save a new question to history
export function saveHistory(question) {
    if (!question) return [];

    let history = JSON.parse(localStorage.getItem('history')) || [];

    // Optional: prevent duplicates
    if (!history.includes(question)) {
        history = [question, ...history];
    }

    // Optional: limit history length
    if (history.length > 50) {
        history = history.slice(0, 50);
    }

    localStorage.setItem('history', JSON.stringify(history));
    return history;
}

// Get full history
export function getHistory() {
    return JSON.parse(localStorage.getItem('history')) || [];
}

// Clear history
export function clearHistory(setRecentHistory) {
    localStorage.removeItem('history');  // safer than localStorage.clear()
    setRecentHistory([]);
}
