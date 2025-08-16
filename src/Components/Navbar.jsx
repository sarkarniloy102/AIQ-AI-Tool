import React from "react";
import { ChevronDownIcon, EllipsisVerticalIcon, ArrowUpTrayIcon } from "@heroicons/react/24/outline";

const Navbar = () => {
  return (
    <nav className="bg-zinc-900 text-white flex justify-between items-center px-6 h-14 shadow-md">
      
      {/* Left: Logo + dropdown */}
      <div className="flex items-center space-x-2 cursor-pointer">
        <span className="font-bold text-lg bg-clip-text text-transparent bg-gradient-to-r from-gray-400 to-yellow-100">AIQ</span>
        <ChevronDownIcon className="w-4 h-4" />
      </div>

      {/* Right: Share + Menu */}
      <div className="flex items-center space-x-4">
        <button className="flex items-center space-x-1 hover:bg-zinc-800 px-3 py-1 rounded">
          <ArrowUpTrayIcon className="w-4 h-4" />
          <span className="text-sm">Share</span>
        </button>
        <button className="p-2 rounded hover:bg-zinc-800">
          <EllipsisVerticalIcon className="w-5 h-5" />
        </button>
      </div>

    </nav>
  );
};

export default Navbar;
