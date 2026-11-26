"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import FaceAvatar from "@/components/FaceAvatar";

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));
// ease-out with a small overshoot, so the flip settles with a little bounce
const easeOutBack = (t: number) => 1 + 2.2 * Math.pow(t - 1, 3) + 1.2 * Math.pow(t - 1, 2);

const FLIP_MS = 1200;
// Resting 3D pose after the flip: card leans back toward the text on its right.
const POSE = { y: 13, x: 5, z: -5 };

// Photo card that flips from its back side to the front once 40% of it is on screen,
// settles into a tilted 3D pose, then keeps a gentle tilt motion and follows the mouse.
export default function FlipPhoto({ src, alt, initials }: { src: string; alt: string; initials: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const card = cardRef.current;
    const pill = pillRef.current;
    if (!wrap || !card || !pill) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const tilt = { x: 0, y: 0, tx: 0, ty: 0 };
    let flipStart = reduce ? -Infinity : 0; // 0 = not flipped yet
    let raf = 0;
    let running = false;

    const tick = (now: number) => {
      // flip progress: 0 = showing the back, 1 = showing the photo
      const t = flipStart === 0 ? 0 : clamp((now - flipStart) / FLIP_MS, 0, 1);
      const f = reduce ? 1 : easeOutBack(t);
      const settled = Math.min(f, 1);

      // gentle idle tilt that fades in after the flip has finished
      const idle = reduce || flipStart === 0 ? 0 : clamp((now - flipStart - FLIP_MS) / 700, 0, 1);
      const idleY = Math.sin(now / 1500) * 7 * idle;
      const idleX = Math.sin(now / 2100) * 4 * idle;

      tilt.x += (tilt.tx - tilt.x) * 0.1;
      tilt.y += (tilt.ty - tilt.y) * 0.1;

      const rotY = (1 - f) * 180 + POSE.y * settled + idleY + tilt.y;
      const rotX = POSE.x * settled + idleX + tilt.x;
      const rotZ = POSE.z * settled;
      const scale = 0.84 + 0.16 * settled;
      card.style.transform = `perspective(1400px) rotateZ(${rotZ}deg) rotateY(${rotY}deg) rotateX(${rotX}deg) scale(${scale})`;

      // "Available for work" pill slides in near the end of the flip and floats
      const p = reduce ? 1 : flipStart === 0 ? 0 : clamp((now - flipStart - FLIP_MS * 0.6) / 500, 0, 1);
      pill.style.opacity = String(p);
      pill.style.transform = `translate3d(0, ${(1 - p) * 24 + Math.sin(now / 900) * 4 * idle}px, 0)`;

      if (running) raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        // start the flip once 40% of the photo is visible (only the first time)
        if (flipStart === 0 && entry.intersectionRatio >= 0.4) flipStart = performance.now();
        running = entry.isIntersecting;
        cancelAnimationFrame(raf);
        if (running) raf = requestAnimationFrame(tick);
      },
      { threshold: [0, 0.4] },
    );
    io.observe(wrap);

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const r = wrap.getBoundingClientRect();
      tilt.ty = ((e.clientX - r.left) / r.width - 0.5) * 18;
      tilt.tx = -((e.clientY - r.top) / r.height - 0.5) * 14;
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

  const face = "absolute inset-0 overflow-hidden rounded-[30px] [backface-visibility:hidden]";

  return (
    <div ref={wrapRef} className="relative mx-auto w-[84%] max-w-[400px] pb-10 pt-4 sm:w-full sm:pb-12">
      <div className="relative aspect-[4/5] w-full">
        <div
          ref={cardRef}
          className="relative size-full will-change-transform [transform-style:preserve-3d]"
          style={{ transform: "perspective(1400px) rotateY(180deg) scale(0.84)" }}
        >
          {/* front: the photo */}
          <div
            className={`${face} skeleton shadow-[0_50px_90px_-40px_rgba(0,0,0,.55)] ring-1 ring-black/5 dark:ring-white/10`}
          >
            <Image
              src={src}
              alt={alt}
              fill
              sizes="(min-width: 1024px) 400px, 90vw"
              className="object-cover object-[56%_0%]"
            />
            {/* soft light sweep */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-black/25" />
          </div>

          {/* back: monogram */}
          <div className={`${face} flex items-center justify-center bg-card`} style={{ transform: "rotateY(180deg)" }}>
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

      {/* "Available for work" pill, centred on the photo's bottom edge (half on the card, half below) */}
      <div
        ref={pillRef}
        className="absolute inset-x-0 bottom-[14px] z-10 mx-auto flex w-fit items-center gap-3 whitespace-nowrap rounded-full bg-panel py-1.5 pl-1.5 pr-2 text-white opacity-0 shadow-[0_20px_40px_-15px_rgba(0,0,0,.55)] ring-1 ring-white/10 sm:bottom-[18px]"
      >
        <FaceAvatar src={src} alt="" className="size-9 sm:size-10" />
        <span className="text-sm sm:text-base">Available for work</span>
        <span className="flex size-8 items-center justify-center rounded-full bg-emerald-500/20">
          <span className="relative flex size-2.5">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-70" />
            <span className="relative size-2.5 rounded-full bg-emerald-400" />
          </span>
        </span>
      </div>
    </div>
  );
}
