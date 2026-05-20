export default function Loading() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-transparent px-4 py-20">
      <div className="w-full max-w-5xl">
        <div className="flex items-center justify-center">
          <div className="flex flex-col items-center gap-6 text-center">
            <div role="status" aria-live="polite">
              <svg
                className="h-16 w-16 animate-spin text-blue-600"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                />
              </svg>
            </div>

            <p className="text-lg font-medium text-slate-700">Loading content…</p>

            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="animate-pulse space-y-4">
                  <div className="h-40 w-full rounded-2xl bg-gray-200" />
                  <div className="h-4 w-3/4 rounded bg-gray-200" />
                  <div className="h-3 w-1/2 rounded bg-gray-200" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
