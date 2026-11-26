// While the intro loader is showing, <html> has the class "is-loading".
// Animations that should be *seen* (hero letters, ID card drop, scroll reveals)
// wait for the loader to finish before they start.

export const PRELOADER_DONE = "preloader:done";

/** Runs `cb` once the intro loader is gone (immediately if it isn't showing). Returns a cleanup function. */
export function onPreloaderDone(cb: () => void): () => void {
  if (!document.documentElement.classList.contains("is-loading")) {
    cb();
    return () => {};
  }
  const handler = () => cb();
  window.addEventListener(PRELOADER_DONE, handler, { once: true });
  return () => window.removeEventListener(PRELOADER_DONE, handler);
}
