// Skeleton screen shown while a page is loading (e.g. navigating back home from the 404 page).
export default function Loading() {
  return (
    <div aria-busy="true" aria-label="Loading" className="min-h-svh">
      {/* nav */}
      <div className="fixed inset-x-0 top-3 z-50 px-3 sm:top-4 sm:px-4">
        <div className="mx-auto flex max-w-6xl items-center justify-between rounded-full border border-line bg-surface/80 py-2 pl-5 pr-2">
          <div className="skeleton h-5 w-24 rounded-md" />
          <div className="hidden gap-3 md:flex">
            {[72, 56, 52, 88].map((w) => (
              <div key={w} className="skeleton h-4 rounded-md" style={{ width: w }} />
            ))}
          </div>
          <div className="flex gap-2">
            <div className="skeleton size-10 rounded-full" />
            <div className="skeleton hidden h-10 w-24 rounded-full md:block" />
          </div>
        </div>
      </div>

      {/* hero */}
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-4 pt-28 sm:px-6 lg:min-h-svh lg:grid-cols-[1.15fr_1fr] lg:items-center lg:pt-0">
        <div className="order-2 space-y-5 lg:order-1">
          <div className="skeleton h-4 w-28 rounded-md" />
          <div className="skeleton h-[clamp(4rem,12vw,9rem)] w-[80%] rounded-2xl" />
          <div className="skeleton h-[clamp(4rem,12vw,9rem)] w-[45%] rounded-2xl" />
          <div className="skeleton h-7 w-[70%] rounded-lg" />
          <div className="space-y-2.5">
            <div className="skeleton h-4 w-full max-w-md rounded-md" />
            <div className="skeleton h-4 w-[85%] max-w-sm rounded-md" />
          </div>
          <div className="flex gap-3 pt-2">
            <div className="skeleton h-12 w-36 rounded-full" />
            <div className="skeleton h-12 w-32 rounded-full" />
          </div>
        </div>
        <div className="order-1 flex flex-col items-center lg:order-2">
          <div className="skeleton h-28 w-[22px]" />
          <div className="skeleton h-[420px] w-[280px] rounded-[18px]" />
        </div>
      </div>
    </div>
  );
}
