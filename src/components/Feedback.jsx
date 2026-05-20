"use client";

import Image from "next/image";
import { Star } from "lucide-react";
import Link from "next/link";

const REVIEWS = [
  {
    name: "AnomalousSquid",
    text: `Fantastic app\nThis is a fantastic example of what an app should be. Clean and easy to use design. Minimal adverts (given it's free to use). I love it!`,
    rating: 5,
  },
  {
    name: "GilliyCG",
    text: `Grassroots U9\nSportsNest does everything I need it to do. It is great for the team admin, fixtures and training.`,
    rating: 5,
  },
  {
    name: "Kezza 50",
    text: `Matches and Training sorted\nGreat platform very easy to set up matches and training sessions, can see who has accepted and send reminders to the parents...`,
    rating: 5,
  },
];

const Stars = ({ count = 5 }) => (
  <div className="flex items-center gap-1">
    {Array.from({ length: count }).map((_, i) => (
      <Star key={i} className="h-4 w-4 text-pink-500" />
    ))}
  </div>
);

export default function Feedback() {
  return (
    <section className="bg-[#faf0ec] py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-white p-3 shadow">
                <Image src="/assets/sports.png" alt="app" width={40} height={40} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">User Reviews</h3>
            </div>

            <div className="mt-8">
              <div className="flex items-center gap-4">
                <div className="rounded bg-white p-3 shadow">
                  <Stars />
                </div>

                <div>
                  <div className="text-2xl font-bold">4.8</div>
                  <div className="text-sm text-slate-600">7,515 ratings</div>
                </div>
              </div>

              <div className="mt-8">
                <Link
                  href="#"
                  className="inline-flex items-center rounded-full bg-[#ff2d55] px-6 py-3 text-sm font-semibold text-white shadow hover:bg-[#e0254a]"
                >
                  READ ALL REVIEWS
                </Link>
              </div>

              <p className="mt-6 text-sm text-slate-600">Showing our 4 &amp; 5 star reviews</p>
            </div>
          </div>

          <div className="lg:col-span-8">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {REVIEWS.map((r) => (
                <article key={r.name} className="rounded-xl bg-white p-6 shadow-md">
                  <h4 className="text-lg font-bold text-slate-900">{r.name}</h4>
                  <p className="mt-3 text-sm text-slate-700 whitespace-pre-line">{r.text}</p>

                  <div className="mt-5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Stars />
                    </div>

                    <div className="h-8 w-8">
                      <Image src="/assets/sports.png" alt="app" width={32} height={32} />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
