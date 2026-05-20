import { CalendarDays, CreditCard, MessageCircle } from "lucide-react";
import Link from "next/link";

const CONNECT_ITEMS = [
  {
    title: "Organise events",
    description:
      "Create events, schedule matches, and manage team availability with a clean workflow designed for coaches and players.",
    buttonText: "Organise Events",
    icon: CalendarDays,
    color: "from-sky-500 to-cyan-500",
  },
  {
    title: "Handle payments",
    description:
      "Collect session fees, membership dues, or court bookings using a secure and transparent payment flow.",
    buttonText: "Manage Payments",
    icon: CreditCard,
    color: "from-emerald-500 to-teal-500",
  },
  {
    title: "Secure messaging",
    description:
      "Send instant updates to players and coaches while keeping every conversation safe and easy to follow. Also allows players to connect with each other.",
    buttonText: "Open Messaging",
    icon: MessageCircle,
    color: "from-violet-500 to-fuchsia-500",
  },
];

const Connect = () => {
  return (
    <section className="relative overflow-hidden bg-white py-16 sm:py-20">
      <div className="pointer-events-none absolute right-0 top-6 hidden h-48 w-48 rounded-full bg-sky-100 blur-3xl opacity-80 md:block" />
      <div className="pointer-events-none absolute left-0 bottom-0 hidden h-72 w-72 rounded-full bg-emerald-100 blur-3xl opacity-80 md:block" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-sky-600">
            Connect
          </p>
          <h2 className="mt-4 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            Making complex tasks simple.
          </h2>
          <p className="mt-5 text-base leading-7 text-slate-600 sm:text-lg">
            Build trust with a polished workflow that brings scheduling, payments, and messaging together in one professional experience.
          </p>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-3">
          {CONNECT_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <article
                key={item.title}
                className="group rounded-[2rem] border border-slate-200 bg-slate-50 p-8 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div
                  className={`mb-7 inline-flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br ${item.color} text-white shadow-lg shadow-slate-200/80`}
                >
                  <Icon className="h-10 w-10" />
                </div>

                <h3 className="text-xl font-semibold text-slate-900">
                  {item.title}
                </h3>

                <p className="mt-4 text-sm leading-7 text-slate-600">
                  {item.description}
                </p>

                <Link
                  href="/facilities"
                  className="mt-8 inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                >
                  {item.buttonText}
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Connect;
