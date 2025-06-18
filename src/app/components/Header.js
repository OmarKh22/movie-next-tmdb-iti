"use client";
import Link from "next/link";
import { HiChevronDown } from "react-icons/hi";
import { IoHeartSharp } from "react-icons/io5";
import { useEffect, useState } from "react";

export default function Header() {
  const [wishlistCount, setWishlistCount] = useState(0);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlistCount(stored.length);

    const handleStorageChange = () => {
      const updated = JSON.parse(localStorage.getItem("wishlist")) || [];
      setWishlistCount(updated.length);
    };

    window.addEventListener("wishlistChanged", handleStorageChange);
    return () =>
      window.removeEventListener("wishlistChanged", handleStorageChange);
  }, []);

  return (
    <header className="bg-[#FFE353] shadow-md py-3 px-6 flex justify-between items-center">
      {/* Logo */}
      <Link href="/" className="text-2xl font-bold text-black">
        MovieApp
      </Link>

      {/* Icons */}
      <div className="flex items-center gap-4">
        {/* Language Dropdown */}
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

        {/* Wishlist Icon with count */}
        <Link href="/wishlist" className="flex items-center gap-2 relative">
          <div className="relative">
            <IoHeartSharp className="text-3xl text-[#292d32]" />
            {wishlistCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </div>
          <span className="font-medium">watchlist</span>
        </Link>
      </div>
    </header>
  );
}
