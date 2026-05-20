"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const FeaturedFacility = () => {
    const [facilities, setFacilities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFacilities = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/facilities`);
                if (!res.ok) throw new Error("Failed to fetch facilities");
                const data = await res.json();
                setFacilities(data || []);
            } catch (err) {
                console.error(err);
                setError(err.message || "Error");
            } finally {
                setLoading(false);
            }
        };

        fetchFacilities();
    }, []);

    const featured = facilities.slice(0, 6);

    return (
        <section className="mx-auto max-w-7xl px-4 py-16">
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold text-gray-900">
                        Featured Facilities
                    </h2>
                    <p className="mt-2 text-gray-600">
                        Hand-picked sports facilities — book your preferred slot now.
                    </p>
                </div>

                <Link
                    href="/facilities"
                    className="hidden items-center gap-2 rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200 md:flex"
                >
                    View All
                </Link>
            </div>

            {loading && (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div
                            key={i}
                            className="h-72 animate-pulse rounded-2xl bg-gray-100"
                        />
                    ))}
                </div>
            )}

            {error && (
                <div className="rounded-md bg-red-50 p-4 text-sm text-red-700">
                    Could not load featured facilities.
                </div>
            )}

            {!loading && !error && (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {featured.map((f) => (
                        <article
                            key={f._id}
                            className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-md transition hover:shadow-xl"
                        >
                            <div className="relative h-44 w-full">
                                <Image
                                    src={f.image_url || "/assets/placeholder.jpg"}
                                    alt={f.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            <div className="flex flex-1 flex-col gap-3 p-5">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900">
                                        {f.name}
                                    </h3>
                                    <p className="mt-1 text-sm text-gray-500">
                                        Starting at <span className="font-medium">৳ {f.price_per_hour}</span> / hour
                                    </p>
                                </div>

                                <p className="text-sm text-gray-600">
                                    {f.description ? f.description.slice(0, 120) : "Great facility for training and matches."}
                                </p>

                                <div className="mt-auto flex items-center gap-3">
                                    <Link
                                        href={`/facilities/${f._id}`}
                                        className="rounded-lg bg-linear-to-r from-black to-gray-800 px-4 py-2 text-sm font-semibold text-white hover:from-blue-600 hover:to-blue-500"
                                        aria-label={`View ${f.name}`}
                                    >
                                        Details
                                    </Link>

                                    <Link
                                        href={`/facilities/${f._id}`}
                                        className="ml-auto rounded-lg border border-blue-600 px-4 py-2 text-sm font-semibold text-blue-600 hover:bg-blue-50"
                                        aria-label={`Book ${f.name}`}
                                    >
                                        Book Now
                                    </Link>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            )}
        </section>
    );
};

export default FeaturedFacility;