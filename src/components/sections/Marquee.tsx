"use client";

import { useEffect, useRef } from "react";
import { marquee } from "@/data/resume";

// Skills strip that always moves, speeds up and skews when you scroll,
// and reverses direction when you scroll up.
export default function Marquee() {
  const trackRef = useRef<HTMLDivElement>(null);
  const items = [...marquee, ...marquee];

  useEffect(() => {
    const track = trackRef.current;
    if (!track || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let x = 0;
    let boost = 0;
    let dir = 1;
    let lastY = window.scrollY;
    let prev = performance.now();
    let raf = 0;

    const onScroll = () => {
      const y = window.scrollY;
      const d = y - lastY;
      lastY = y;
      if (d !== 0) dir = d > 0 ? 1 : -1;
      boost = Math.min(boost + Math.abs(d) * 6, 1400);
    };

    const tick = (now: number) => {
      const dt = Math.min((now - prev) / 1000, 0.05);
      prev = now;
      x -= dir * (70 + boost) * dt;
      const half = track.scrollWidth / 2;
      if (half > 0) {
        if (x <= -half) x += half;
        if (x > 0) x -= half;
      }
      boost *= Math.pow(0.05, dt);
      const skew = Math.min(boost / 140, 10) * dir;
      track.style.transform = `translate3d(${x}px, 0, 0) skewX(${-skew}deg)`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    // outer wrapper clips the tilted strip so it never causes sideways scrolling
    <div className="relative z-10 overflow-hidden py-4">
    <div className="-mx-[3%] w-[106%] -rotate-1 overflow-hidden bg-panel py-4 text-white shadow-[0_20px_40px_-20px_rgba(0,0,0,.4)] sm:py-5">
      <div ref={trackRef} className="flex w-max will-change-transform">
        {items.map((s, i) => (
          <span
            key={i}
            aria-hidden={i >= marquee.length}
            className="flex items-center gap-6 pr-6 font-display text-2xl uppercase tracking-wide transition-colors hover:text-accent-soft sm:gap-10 sm:pr-10 sm:text-4xl"
          >
            {s}
            <span className="text-accent-soft">✦</span>
          </span>
        ))}
      </div>
    </div>
    </div>
  );
}
