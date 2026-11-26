"use client";

import { useEffect, useRef } from "react";

const R = 26;
const C = 2 * Math.PI * R;

// Highlighted round button in the bottom-right corner.
// Appears after scrolling down; its ring fills up with scroll progress.
export default function BackToTop() {
  const btnRef = useRef<HTMLButtonElement>(null);
  const ringRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    const btn = btnRef.current;
    const ring = ringRef.current;
    if (!btn || !ring) return;
    let raf = 0;
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      ring.style.strokeDashoffset = String(C * (1 - p));
      btn.dataset.show = String(window.scrollY > window.innerHeight * 0.6);
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <button
      ref={btnRef}
      type="button"
      data-show="false"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0 })}
      className="back-to-top group fixed bottom-4 right-4 z-50 flex size-14 items-center justify-center rounded-full bg-accent text-white shadow-[0_10px_30px_-6px_rgba(94,103,230,.7)] sm:bottom-6 sm:right-6 sm:size-16"
    >
      {/* glowing pulse ring */}
      <span aria-hidden="true" className="absolute inset-0 animate-ping rounded-full bg-accent/40 [animation-duration:2.4s]" />
      {/* scroll progress ring */}
      <svg aria-hidden="true" viewBox="0 0 60 60" className="absolute inset-0 size-full -rotate-90">
        <circle cx="30" cy="30" r={R} fill="none" stroke="rgba(255,255,255,.25)" strokeWidth="2.5" />
        <circle
          ref={ringRef}
          cx="30"
          cy="30"
          r={R}
          fill="none"
          stroke="#fff"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray={C}
          strokeDashoffset={C}
        />
      </svg>
      <svg
        aria-hidden="true"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="relative transition-transform duration-300 group-hover:-translate-y-1"
      >
        <path d="M12 19V5M5 12l7-7 7 7" />
      </svg>
    </button>
  );
}
