"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));
const ease = (t: number) => 1 - Math.pow(1 - t, 3);

// Photo card that flips from its back side to the front as you scroll it into view,
// and tilts in 3D following the mouse.
export default function FlipPhoto({
  src,
  alt,
  initials,
  badges,
}: {
  src: string;
  alt: string;
  initials: string;
  badges: [string, string];
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const card = cardRef.current;
    if (!wrap || !card) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const tilt = { x: 0, y: 0, tx: 0, ty: 0 };
    let raf = 0;
    let running = false;

    const tick = () => {
      const r = wrap.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 when the top of the photo enters the screen, 1 once it reaches ~35% from the top
      const p = reduce ? 1 : ease(clamp((vh - r.top) / (vh * 0.65), 0, 1));
      tilt.x += (tilt.tx - tilt.x) * 0.12;
      tilt.y += (tilt.ty - tilt.y) * 0.12;
      card.style.transform = `perspective(1400px) rotateY(${(1 - p) * 180 + tilt.y}deg) rotateX(${tilt.x}deg) scale(${0.82 + 0.18 * p})`;
      if (running) raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(([entry]) => {
      running = entry.isIntersecting;
      cancelAnimationFrame(raf);
      if (running) raf = requestAnimationFrame(tick);
    });
    io.observe(wrap);

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const r = wrap.getBoundingClientRect();
      tilt.ty = ((e.clientX - r.left) / r.width - 0.5) * 16;
      tilt.tx = -((e.clientY - r.top) / r.height - 0.5) * 12;
    };
    const onLeave = () => {
      tilt.tx = tilt.ty = 0;
    };
    wrap.addEventListener("pointermove", onMove);
    wrap.addEventListener("pointerleave", onLeave);

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      wrap.removeEventListener("pointermove", onMove);
      wrap.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  const face = "absolute inset-0 overflow-hidden rounded-[28px] [backface-visibility:hidden]";

  return (
    <div ref={wrapRef} className="relative mx-auto aspect-[4/5] w-full max-w-[420px]">
      <div
        ref={cardRef}
        className="relative size-full will-change-transform [transform-style:preserve-3d]"
        style={{ transform: "perspective(1400px) rotateY(180deg) scale(0.82)" }}
      >
        {/* front: the photo */}
        <div className={`${face} border border-line bg-[#ececec] shadow-[0_40px_80px_-40px_rgba(0,0,0,.45)]`}>
          <Image src={src} alt={alt} fill sizes="(min-width: 1024px) 420px, 90vw" className="object-cover object-top" />
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/35 to-transparent" />
        </div>

        {/* floating badges, pushed forward in 3D */}
        <span
          className="absolute -left-3 top-10 rounded-full bg-ink px-4 py-2 text-sm font-medium text-white shadow-lg sm:-left-6"
          style={{ transform: "translateZ(60px)", backfaceVisibility: "hidden" }}
        >
          {badges[0]}
        </span>
        <span
          className="absolute -right-3 bottom-12 flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-medium text-white shadow-lg sm:-right-6"
          style={{ transform: "translateZ(80px)", backfaceVisibility: "hidden" }}
        >
          <span className="size-2 rounded-full bg-emerald-300" />
          {badges[1]}
        </span>

        {/* back: monogram */}
        <div
          className={`${face} flex items-center justify-center bg-card`}
          style={{ transform: "rotateY(180deg)" }}
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage:
                "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
              backgroundSize: "26px 26px",
            }}
          />
          <div aria-hidden="true" className="absolute -right-20 -top-20 size-72 rounded-full bg-accent/50 blur-3xl" />
          <span className="relative font-display text-[9rem] leading-none text-white/90">{initials}</span>
        </div>
      </div>
    </div>
  );
}
