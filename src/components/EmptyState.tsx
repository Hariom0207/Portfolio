// Friendly placeholder shown when a list (projects, experience, ...) has nothing in it yet.
export default function EmptyState({
  title = "Nothing here yet",
  message = "This section is being updated — check back soon.",
}: {
  title?: string;
  message?: string;
}) {
  return (
    <div className="flex flex-col items-center rounded-3xl border border-dashed border-line px-6 py-16 text-center">
      <div className="relative mb-6 flex size-20 items-center justify-center">
        <span className="absolute inset-0 animate-ping rounded-full bg-accent/10 [animation-duration:2.5s]" />
        <span className="relative flex size-16 items-center justify-center rounded-2xl border border-line bg-surface text-accent shadow-sm">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M3 7l9-4 9 4-9 4-9-4z" />
            <path d="M3 7v10l9 4 9-4V7" />
            <path d="M12 11v10" />
          </svg>
        </span>
      </div>
      <h3 className="font-display text-3xl uppercase tracking-wide">{title}</h3>
      <p className="mt-2 max-w-sm text-muted">{message}</p>
    </div>
  );
}
