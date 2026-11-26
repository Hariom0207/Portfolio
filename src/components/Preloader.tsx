"use client";

import { useEffect, useRef } from "react";
import { PRELOADER_DONE } from "@/lib/preloader";

const MIN_MS = 1100; // always show long enough to read
const MAX_MS = 3500; // never block longer than this, even on slow networks

// Full-screen intro loader: "HR." with a 0→100 counter that follows real page loading,
// then wipes upward. Shown once per browser session (see the theme script in layout.tsx).
export default function Preloader() {
  const ref = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const count = countRef.current;
    const bar = barRef.current;
    const root = document.documentElement;
    if (!el || !count || !bar || root.classList.contains("skip-preloader")) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const start = performance.now();
    let loaded = document.readyState === "complete";
    const onLoad = () => {
      loaded = true;
    };
    window.addEventListener("load", onLoad);

    let shown = 0;
    let raf = 0;
    let hideTimer = 0;
    const finish = () => {
      el.classList.add("preloader-done");
      root.classList.remove("is-loading");
      window.dispatchEvent(new Event(PRELOADER_DONE));
      try {
        sessionStorage.setItem("hr-loaded", "1");
      } catch {}
      hideTimer = window.setTimeout(() => (el.style.display = "none"), 1000);
    };

    const tick = (now: number) => {
      const elapsed = now - start;
      const ready = loaded || elapsed > MAX_MS;
      // creep toward 90% while loading, then run to 100% once everything is ready
      const target = ready ? 100 : Math.min(90, elapsed / 25);
      shown += (target - shown) * (reduce ? 1 : 0.08);
      if (target === 100 && shown > 99.5) shown = 100;
      count.textContent = String(Math.floor(shown));
      bar.style.transform = `scaleX(${shown / 100})`;
      if (shown >= 100 && elapsed >= (reduce ? 0 : MIN_MS)) {
        finish();
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(hideTimer);
      window.removeEventListener("load", onLoad);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="preloader fixed inset-0 z-[200] flex flex-col items-center justify-center bg-panel text-white"
    >
      <div aria-hidden="true" className="absolute left-1/2 top-1/2 size-[60vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/25 blur-[100px]" />
      <div className="relative overflow-hidden">
        <p className="preloader-logo font-display text-[clamp(5rem,22vw,13rem)] leading-none tracking-tight">
          HR<span className="text-accent-soft">.</span>
        </p>
      </div>
      <p className="preloader-sub relative mt-3 text-xs uppercase tracking-[0.35em] text-white/55 sm:text-sm">
        Hariom Ray · Portfolio
      </p>

      <div className="absolute inset-x-5 bottom-8 flex items-end justify-between sm:inset-x-10 sm:bottom-10">
        <span className="text-xs uppercase tracking-[0.3em] text-white/50">Loading</span>
        <span className="font-display text-6xl leading-none tabular-nums sm:text-8xl">
          <span ref={countRef}>0</span>
          <span className="text-accent-soft">%</span>
        </span>
      </div>
      <div ref={barRef} className="absolute bottom-0 left-0 h-1 w-full origin-left scale-x-0 bg-accent" />
    </div>
  );
}
