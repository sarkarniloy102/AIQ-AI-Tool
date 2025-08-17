import React from "react";
import { ChevronDownIcon, ArrowUpTrayIcon } from "@heroicons/react/24/outline";

const Navbar = () => {

  const handleShare = async () => {
    const shareData = {
      titletitle: "Check this out!",
      text: "Here's something interesting I found:",
      url: window.location.href
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        console.log("shared successfully");
      } catch (err) {
        console.error("Error sharing:", err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareData.url);
        alert("Link copied to clipboard!");
      } catch (err) {
        console.error("Error sharing:", err);
        alert("Failed to copy link.");
      }
    }
  }


  return (
    <nav className="sticky dark:bg-zinc-900 bg-blue-200 dark:text-white text-zinc-900 flex justify-between items-center px-4 lg:px-6 pt-2.5 lg:pt-0 h-14 shadow-xs">

      {/* Left: Logo + dropdown */}
      <div className="flex items-center space-x-2 cursor-pointer">
        <span className="font-bold text-lg bg-clip-text text-transparent bg-gradient-to-r from-gray-400 to-yellow-100 pl-10 lg:pl-1">AIQ</span>
        <ChevronDownIcon className="w-4 h-4 hidden lg:inline" />
      </div>

      {/* Right: Share + Menu */}
      <div className="flex items-center space-x-4">
        <button
          onClick={handleShare}
          className="flex items-center space-x-1 cursor-pointer dark:hover:bg-zinc-800 hover:bg-amber-100 px-3 py-1 rounded">
          <ArrowUpTrayIcon className="w-4 h-4" />
          <span className="text-sm ">Share</span>
        </button>

      </div>

    </nav>
  );
};

export default Navbar;
