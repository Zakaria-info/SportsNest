"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import logo from "../../public/assets/sports.png"
import { authClient } from "@/lib/auth-client";

export default function Navbar() {
  const {
    data: session,
  } = authClient.useSession();
  
  const user = session?.user;
  const isAuthenticated = Boolean(user);
  const router = useRouter();

  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    await authClient.signOut?.();
    setIsMenuOpen(false);
    router.push('/login');
  };

  
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

        {/* Mobile menu button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="inline-flex items-center rounded-md border border-zinc-200 bg-white p-2 text-zinc-700 hover:bg-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-200 md:hidden"
          aria-label="Toggle navigation menu"
        >
          <span className="text-xl">{isMenuOpen ? '✕' : '☰'}</span>
        </button>

        {/* Navigation Links */}
        <div className="hidden items-center gap-6 text-sm font-medium text-zinc-700 dark:text-zinc-300 md:flex">
          <Link href="/">Home</Link>
          {isAuthenticated && (
            <>
              <Link href="/facilities">All Facilities</Link>
              <Link href="/bookings" className="opacity-60 hover:opacity-100">My Bookings</Link>
              <Link href="/add-facilities" className="opacity-60 hover:opacity-100">Add Facility</Link>
              <Link href="/manage" className="opacity-60 hover:opacity-100">Manage Facilities</Link>
            </>
          )}
        </div>

        {/* Right Side Controls */}
        <div className="hidden items-center gap-4 md:flex">
          
         
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="rounded bg-zinc-100 p-2 text-xs font-semibold dark:bg-zinc-900 dark:text-zinc-100"
          >
            {isDarkMode ? "☀️ Light" : "🌙 Dark"}
          </button>

          {/* Conditional Login / Logout State */}
          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                {user.name || user.email}
              </span>
              <button 
                onClick={handleLogout}
                className="rounded bg-red-500 px-4 py-2 text-sm font-semibold text-white hover:bg-red-600"
              >
                Logout
              </button>
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

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="mt-4 space-y-4 rounded-lg border border-zinc-200 bg-white p-4 text-sm font-medium text-zinc-700 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300 md:hidden">
          <div className="flex flex-col gap-3">
            <Link href="/" className="block rounded px-3 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-900">Home</Link>
            {isAuthenticated && (
              <>
                <Link href="/facilities" className="block rounded px-3 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-900">All Facilities</Link>
                <Link href="/bookings" className="block rounded px-3 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-900">My Bookings</Link>
                <Link href="/add-facilities" className="block rounded px-3 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-900">Add Facility</Link>
                <Link href="/manage" className="block rounded px-3 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-900">Manage Facilities</Link>
              </>
            )}
          </div>
          <div className="border-t border-zinc-200 pt-4 dark:border-zinc-800">
            {user ? (
              <div className="flex flex-col gap-3">
                <span className="text-sm font-semibold">{user.name || user.email}</span>
                <button
                  onClick={handleLogout}
                  className="rounded bg-red-500 px-4 py-2 text-sm font-semibold text-white hover:bg-red-600"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
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
      )}
    </nav>
  );
}