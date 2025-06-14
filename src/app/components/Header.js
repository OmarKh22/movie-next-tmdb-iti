"use client";
import Link from "next/link";
import { HiChevronDown } from "react-icons/hi";
import { IoHeartSharp } from "react-icons/io5";



export default function Header() {
  return (
    <header className="bg-[#FFE353] shadow-md py-3 px-6 flex justify-between items-center">
      {/* Logo */}
      <Link href="/" className="text-2xl font-bold text-black">
        MovieApp
      </Link>

      {/* Icons */}
      <div className="flex items-center gap-4">
        {/* Simple Dropdown */}
        <div className="relative">
          <input type="checkbox" id="lang-toggle" className="peer hidden" />
          <label
            htmlFor="lang-toggle"
            className="flex items-center gap-1 cursor-pointer px-2 py-1 font-bold text-sm"
          >
            EN{" "}
            <HiChevronDown className="text-lg transition-transform peer-checked:rotate-180" />
          </label>

          <div className="absolute right-0 mt-2 hidden peer-checked:block bg-white border shadow-md rounded w-24 z-10">
            <button className="block w-full text-left px-3 py-2 hover:bg-yellow-100">
              EN
            </button>
            <button className="block w-full text-left px-3 py-2 hover:bg-yellow-100">
              AR
            </button>
          </div>
        </div>

        <IoHeartSharp className="text-3xl"/>
        <button title="Watchlist">WatchList</button>
      </div>
    </header>
  );
}
