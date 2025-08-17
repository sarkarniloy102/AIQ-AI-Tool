import { useState, useEffect } from "react";

const ThemeToggle = () => {
    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem("theme") || "dark";
    });

    useEffect(() => {
        if (darkMode === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
        localStorage.setItem("theme", darkMode);
    }, [darkMode]);

    return (
        <div className="fixed top-4 right-30 flex items-center z-50">
            <label className="relative inline-flex items-center cursor-pointer">
                <input
                    type="checkbox"
                    checked={darkMode === "dark"}
                    onChange={() => setDarkMode(darkMode === "dark" ? "light" : "dark")}
                    className="sr-only"
                />
                <div className="w-11 h-6 bg-gray-200 dark:bg-zinc-700 rounded-full peer peer-focus:ring-2 peer-focus:ring-blue-300 dark:peer-focus:ring-yellow-300 transition-colors"></div>
                <div className="absolute left-1 top-1 w-4 h-4 bg-white dark:bg-yellow-400 rounded-full transition-transform peer-checked:translate-x-5"></div>
            </label>
        </div>
    );
};

export default ThemeToggle;
