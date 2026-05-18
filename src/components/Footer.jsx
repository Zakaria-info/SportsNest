"use client";
import React from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, Globe, Compass, Activity } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-zinc-200 bg-white text-zinc-600 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-400 transition-colors">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-zinc-100 dark:border-zinc-900 pb-6">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-emerald-600 rounded-lg text-white">
              <Activity className="w-4 h-4" />
            </div>
            <span className="text-lg font-bold text-zinc-900 dark:text-white">
              SportsNest
            </span>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 text-sm">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-emerald-500" />
              <span>support@sportsnest.com</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-emerald-500" />
              <span>+1 (234) 567-890</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-emerald-500" />
              <span>123 Arena Blvd</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="#"
              className="p-2 rounded bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
            >
              <Globe className="w-4 h-4" />
            </a>
            <a
              href="#"
              className="p-2 rounded bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
            >
              <Compass className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-400 dark:text-zinc-500 gap-2">
          <div>&copy; {currentYear} SportsNest. All rights reserved.</div>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:underline">
              Privacy
            </Link>
            <Link href="/terms" className="hover:underline">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
