import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-4 py-20">
      <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[2rem] border border-slate-700 bg-linear-to-br from-slate-900 via-slate-950 to-slate-800 p-10 shadow-2xl shadow-blue-950/30">
        <div className="absolute inset-0 `bg-[radial-linear-gradient(circle_at_top_left,rgba(56,189,248,0.18),transparent_45%)]`" />
        <div className="absolute top-10 right-10 h-24 w-24 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="relative z-10 grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-3 rounded-full border border-slate-700 bg-white/5 px-4 py-2 text-sm font-semibold text-sky-400">
              Error 404
            </div>

            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-sky-300">Page not found</p>
              <h1 className="mt-4 text-5xl font-extrabold tracking-tight text-white sm:text-6xl">
                Lost in the arena?
              </h1>
            </div>

            <p className="max-w-xl text-base leading-8 text-slate-300">
              The page you are looking for does not exist or has been moved. Return to the homepage to continue booking courts, managing facilities, and finding your next game.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-full bg-sky-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-sky-400"
              >
                Go back home
              </Link>
              <Link
                href="/facilities"
                className="inline-flex items-center justify-center rounded-full border border-slate-700 bg-white/5 px-6 py-3 text-sm font-semibold text-slate-100 transition hover:border-slate-500 hover:bg-white/10"
              >
                Explore facilities
              </Link>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/5 bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/40 backdrop-blur-xl">
            <div className="flex items-center justify-between gap-4 rounded-3xl bg-slate-950/70 p-6 text-white shadow-inner shadow-slate-950/30">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Route</p>
                <p className="mt-2 text-lg font-semibold">/page-not-found</p>
              </div>
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-slate-800 text-sky-400">
                <span className="text-lg font-bold">404</span>
              </div>
            </div>

            <div className="mt-8 space-y-5">
              <div className="rounded-3xl bg-slate-950/80 p-5 text-slate-300 shadow-lg shadow-slate-950/30">
                <p className="text-sm font-semibold text-white">Troubleshooting</p>
                <p className="mt-3 text-sm leading-7 text-slate-400">
                  Check your URL and make sure the route is correct. If you typed it manually, a small typo may be the cause.
                </p>
              </div>
              <div className="rounded-3xl bg-slate-950/80 p-5 text-slate-300 shadow-lg shadow-slate-950/30">
                <p className="text-sm font-semibold text-white">Need help?</p>
                <p className="mt-3 text-sm leading-7 text-slate-400">
                  Reach out later or return to the dashboard to continue managing your bookings with confidence.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
