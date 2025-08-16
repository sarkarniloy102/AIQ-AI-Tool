import React from "react";
import { ChevronDownIcon, EllipsisVerticalIcon, ArrowUpTrayIcon } from "@heroicons/react/24/outline";

const Navbar = () => {
  return (
    <nav className="dark:bg-zinc-900 bg-blue-200 dark:text-white text-zinc-900 flex justify-between items-center px-6 h-14 shadow-xs">
      
      {/* Left: Logo + dropdown */}
      <div className="flex items-center space-x-2 cursor-pointer">
        <span className="font-bold text-lg bg-clip-text text-transparent bg-gradient-to-r from-gray-400 to-yellow-100">AIQ</span>
        <ChevronDownIcon className="w-4 h-4" />
      </div>

      {/* Right: Share + Menu */}
      <div className="flex items-center space-x-4">
        <button className="flex items-center space-x-1 dark:hover:bg-zinc-800 hover:bg-amber-100 px-3 py-1 rounded">
          <ArrowUpTrayIcon className="w-4 h-4" />
          <span className="text-sm">Share</span>
        </button>
        <button className="p-2 rounded dark:hover:bg-zinc-800 hover:bg-amber-100">
          <EllipsisVerticalIcon className="w-5 h-5" />
        </button>
      </div>

    </nav>
  );
};

export default Navbar;
