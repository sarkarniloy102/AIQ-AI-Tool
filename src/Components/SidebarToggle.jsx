

const SidebarToggle = ({ isOpen, setIsOpen }) => {
    return (
        <button
            className="md:hidden fixed top-4 left-4 z-50 p-2 rounded bg-blue-200 dark:bg-zinc-800 hover:bg-blue-300 dark:hover:bg-zinc-700"
            onClick={() => setIsOpen(!isOpen)}
        >
            <svg
                className="w-6 h-6 text-zinc-900 dark:text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                />
            </svg>
        </button>
    );
};

export default SidebarToggle;