"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "../../public/assets/sports.png"

export default function Navbar() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  
  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <nav className="w-full border-b border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Logo / Site Name */}
        <Link href="/" className="flex items-center gap-2 text-xl font-bold text-emerald-600 dark:text-emerald-400">
          <Image className="rounded-lg" src={logo} alt="SportsNest Logo" width={60} height={50} />
          SportsNest
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-6 text-sm font-medium text-zinc-700 dark:text-zinc-300">
          <Link href="/">Home</Link>
          <Link href="/facilities">All Facilities</Link>
          
          <Link href="/bookings" className="opacity-60 hover:opacity-100">My Bookings</Link>
          <Link href="/add" className="opacity-60 hover:opacity-100">Add Facility</Link>
          <Link href="/manage" className="opacity-60 hover:opacity-100">Manage Facilities</Link>
        </div>

        {/* Right Side Controls */}
        <div className="flex items-center gap-4">
          
         
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="rounded bg-zinc-100 p-2 text-xs font-semibold dark:bg-zinc-900 dark:text-zinc-100"
          >
            {isDarkMode ? "☀️ Light" : "🌙 Dark"}
          </button>

          {/* Conditional Login / Logout State */}
          {isLoggedIn ? (
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="rounded bg-zinc-100 px-3 py-2 text-sm font-medium dark:bg-zinc-900 dark:text-white"
              >
                Profile Menu ▾
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded border border-zinc-200 bg-white p-2 shadow dark:border-zinc-800 dark:bg-zinc-900">
                  <Link 
                    href="/bookings" 
                    onClick={() => setIsDropdownOpen(false)}
                    className="block w-full px-2 py-1.5 text-left text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800"
                  >
                    My Bookings
                  </Link>
                  <Link 
                    href="/add" 
                    onClick={() => setIsDropdownOpen(false)}
                    className="block w-full px-2 py-1.5 text-left text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800"
                  >
                    Add Facility
                  </Link>
                  <Link 
                    href="/manage" 
                    onClick={() => setIsDropdownOpen(false)}
                    className="block w-full px-2 py-1.5 text-left text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800"
                  >
                    Manage My Facilities
                  </Link>
                  <hr className="my-1 border-zinc-200 dark:border-zinc-800" />
                  <button
                    onClick={() => {
                      setIsLoggedIn(false);
                      setIsDropdownOpen(false);
                    }}
                    className="w-full text-left px-2 py-1.5 text-sm font-semibold text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
             
              <Link
                href="/signup"
                className="rounded bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
              >
                Sign Up
              </Link>
              <Link
                href="/login"
                className="rounded bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
              >
                Login
              </Link>
            </div>
          )}

        </div>
      </div>
    </nav>
  );
}