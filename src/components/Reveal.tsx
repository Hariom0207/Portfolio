"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { onPreloaderDone } from "@/lib/preloader";

// Fades + slides its children up when they scroll into view.
export default function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible");
          io.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
    );
    // wait until the intro loader is gone so the animation is actually seen
    const stop = onPreloaderDone(() => io.observe(el));
    return () => {
      stop();
      io.disconnect();
    };
  }, []);

  return (
    <div ref={ref} className={`reveal ${className}`} style={{ "--d": `${delay}ms` } as CSSProperties}>
      {children}
    </div>
  );
}
