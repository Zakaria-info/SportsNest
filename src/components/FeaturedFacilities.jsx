"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { MapPin, Users, Calendar, AlertCircle } from "lucide-react";

export default function FeaturedFacilities() {
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeaturedData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/facilities/featured");
        
        if (!response.ok) {
          throw new Error("Could not fetch the live data from the server.");
        }
        
        const data = await response.json();
        setFacilities(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedData();
  }, []);

  // Simple loading feedback while matching database records
  if (loading) {
    return (
      <div className="w-full text-center py-24 bg-white dark:bg-zinc-950 text-zinc-500 font-medium">
        <div className="animate-pulse">Loading Live Arenas...</div>
      </div>
    );
  }

  // Recruiter-safe error handling structure
  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center gap-3 p-4 rounded-xl border border-rose-200 bg-rose-50 text-rose-800 dark:border-rose-950/40 dark:bg-rose-950/20 dark:text-rose-400">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span className="text-sm font-medium">Backend connection offline. Showing fallback state.</span>
        </div>
      </div>
    );
  }

  return (
    <section className="w-full py-16 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
              Top Booked Arenas
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight mt-1">
              Featured Sports Facilities
            </h2>
          </div>
          <Link 
            href="/facilities" 
            className="text-sm font-semibold text-sky-600 hover:text-sky-700 dark:text-sky-400 dark:hover:text-sky-300 underline underline-offset-4"
          >
            Browse All Facilities →
          </Link>
        </div>

        {/* Live Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {facilities.map((item) => (
            <div 
              key={item._id} // Correctly handles MongoDB's unique string keys
              className="flex flex-col justify-between rounded-2xl border border-zinc-200/60 bg-zinc-50/30 p-6 dark:border-zinc-800/60 dark:bg-zinc-900/20 hover:shadow-xl transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="px-2.5 py-1 text-xs font-bold rounded-md bg-sky-100 text-sky-800 dark:bg-sky-950/60 dark:text-sky-300">
                    {item.facility_type}
                  </span>
                  <span className="text-xs font-medium text-zinc-400 dark:text-zinc-500">
                    🔥 {item.booking_count || 0} bookings
                  </span>
                </div>

                <h3 className="text-lg font-bold text-zinc-900 dark:text-white tracking-tight">
                  {item.name}
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>

                <div className="grid grid-cols-2 gap-3 my-4 pt-3 border-t border-zinc-100 dark:border-zinc-800/60 text-xs font-medium text-zinc-600 dark:text-zinc-400">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                    <span className="truncate">{item.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5 justify-end">
                    <Users className="w-3.5 h-3.5 text-zinc-400" />
                    <span>Max {item.capacity} Players</span>
                  </div>
                </div>

                <div className="mb-5">
                  <span className="flex items-center gap-1 text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-1.5">
                    <Calendar className="w-3 h-3" /> Booking Availability
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {item.available_slots?.map((slot, idx) => (
                      <span 
                        key={idx} 
                        className="text-[10px] font-semibold px-2 py-0.5 rounded border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 bg-white dark:bg-zinc-900"
                      >
                        {slot.split(" - ")[0]}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-zinc-100 dark:border-zinc-800/60 mt-auto">
                <div>
                  <span className="text-[10px] font-bold text-zinc-400 block uppercase tracking-tight">
                    Price/Hour
                  </span>
                  <span className="text-base font-black text-emerald-600 dark:text-emerald-400">
                    ৳{item.price_per_hour}
                  </span>
                </div>

                <Link
                  href={`/facilities/${item._id}`} // Links to a dynamic details routing path smoothly
                  className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-white active:scale-[0.97] transition-all duration-200"
                >
                  Book Now
                </Link>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}