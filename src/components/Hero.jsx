"use client";
import React from "react";
import Link from "next/link";
import { Zap } from "lucide-react"; // Import a 'spark' icon for extra energy

export default function Hero() {
  return (
    <header className="relative w-full min-h-[75vh] flex items-center justify-center bg-sky-50 dark:bg-zinc-950 text-zinc-900 dark:text-white overflow-hidden transition-colors duration-300">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#7dd3fc40_0%,transparent_70%)] pointer-events-none" />

      {/* Main Content Area */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center space-y-7">
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-sky-400/40 bg-sky-100 text-sky-700 dark:bg-sky-950 dark:border-sky-800 dark:text-sky-300 text-xs font-bold uppercase tracking-wider mx-auto shadow-inner shadow-sky-200/50 dark:shadow-sky-950/20">
          <Zap className="w-4 h-4 text-amber-500" />
          Instant Arena Access
        </div>

        <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tighter leading-[0.95]">
          Your Next Game
          <br />
          Explodes{" "}
          <span className="bg-linear-to-r from-sky-500 to-emerald-400 bg-clip-text text-transparent">
            Right Now
          </span>
        </h1>

        <p className="text-base sm:text-xl text-zinc-600 dark:text-zinc-300 max-w-2xl mx-auto font-medium leading-relaxed">
          Find and book premier football turfs, badminton courts, and elite
          facilities instantly. Seamless scheduling, unparalleled competition.
        </p>

        <div className="pt-5">
          <Link
            href="/facilities"
            className="inline-flex items-center justify-center px-10 py-4 rounded-full text-base font-bold tracking-tight text-white bg-linear-to-r from-sky-500 to-emerald-500 hover:from-sky-600 hover:to-emerald-600 active:scale-[0.97] shadow-lg shadow-sky-500/30 hover:shadow-sky-600/40 transition-all duration-200"
          >
            Explore Facilities
          </Link>
        </div>
      </div>
    </header>
  );
}
