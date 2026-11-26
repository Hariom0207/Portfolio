"use client";

import { useEffect, useRef } from "react";
import { onPreloaderDone } from "@/lib/preloader";

const STRAP = 170; // strap length above the card (px)
const CARD_W = 280;
const CARD_H = 420;

type IdCardProps = {
  name: string;
  role: string;
  idNumber: string;
  location: string;
  initials: string;
  strapText: string;
  photo?: string | null;
  passLabel?: string;
  badge?: string;
};

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

// Deterministic barcode bars generated from a string.
function barcode(seed: string) {
  const bars: { x: number; w: number }[] = [];
  let x = 0;
  for (let i = 0; x < 58; i++) {
    const code = seed.charCodeAt(i % seed.length) + i * 7;
    const w = (code % 3) + 1;
    bars.push({ x, w });
    x += w + ((code >> 2) % 2) + 1;
  }
  return bars;
}

export default function IdCard({
  name,
  role,
  idNumber,
  location,
  initials,
  strapText,
  photo,
  passLabel = "Developer Pass",
  badge = "Open to work",
}: IdCardProps) {
  const rigRef = useRef<HTMLDivElement>(null);
  const strapRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLElement>(null);
  const shineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const rig = rigRef.current;
    const strap = strapRef.current;
    const body = bodyRef.current;
    const card = cardRef.current;
    const shine = shineRef.current;
    if (!rig || !strap || !body || !card || !shine) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const s = {
      angle: reduce ? 0 : 0.16, // swing angle (rad), pivot at top of strap
      vel: 0,
      drop: reduce ? 0 : -(STRAP + CARD_H + 120), // vertical drop-in offset
      dropVel: 0,
      stretch: 0, // strap stretch while pulling
      stretchVel: 0,
      tiltX: 0,
      tiltY: 0,
      targetX: 0,
      targetY: 0,
      dragging: false,
      grabOffset: 0,
      grabDist: 0,
      lastMove: 0,
    };
    // the card drops in shortly after the intro loader has gone
    let startAt = Infinity;
    const stopWaiting = onPreloaderDone(() => {
      startAt = performance.now() + (reduce ? 0 : 300);
    });

    const anchor = () => {
      const r = rig.parentElement!.getBoundingClientRect();
      return { x: r.left + r.width / 2, y: r.top };
    };

    const onDown = (e: PointerEvent) => {
      card.setPointerCapture(e.pointerId);
      const a = anchor();
      const dx = e.clientX - a.x;
      const dy = e.clientY - a.y;
      s.dragging = true;
      s.grabOffset = -Math.atan2(dx, dy) - s.angle;
      s.grabDist = Math.hypot(dx, dy) - s.stretch;
      s.lastMove = performance.now();
      s.targetX = s.targetY = 0;
      card.style.cursor = "grabbing";
    };

    const onMove = (e: PointerEvent) => {
      if (!s.dragging) {
        if (e.pointerType !== "mouse") return;
        const r = card.getBoundingClientRect();
        s.targetY = ((e.clientX - r.left) / r.width - 0.5) * 22;
        s.targetX = -((e.clientY - r.top) / r.height - 0.5) * 18;
        return;
      }
      const a = anchor();
      const dx = e.clientX - a.x;
      const dy = e.clientY - a.y;
      const next = clamp(-Math.atan2(dx, dy) - s.grabOffset, -1.3, 1.3);
      const now = performance.now();
      const dt = Math.max(1, now - s.lastMove) / 1000;
      s.vel = s.vel * 0.5 + ((next - s.angle) / dt) * 0.5;
      s.angle = next;
      s.lastMove = now;
      const extra = Math.hypot(dx, dy) - s.grabDist;
      s.stretch = extra > 0 ? Math.min(extra * 0.55, 150) : Math.max(extra * 0.3, -30);
    };

    const onUp = (e: PointerEvent) => {
      if (!s.dragging) return;
      s.dragging = false;
      s.vel = performance.now() - s.lastMove > 80 ? 0 : clamp(s.vel, -9, 9);
      card.style.cursor = "grab";
      if (card.hasPointerCapture(e.pointerId)) card.releasePointerCapture(e.pointerId);
    };

    const onLeave = () => {
      s.targetX = s.targetY = 0;
    };

    card.addEventListener("pointerdown", onDown);
    card.addEventListener("pointermove", onMove);
    card.addEventListener("pointerup", onUp);
    card.addEventListener("pointercancel", onUp);
    card.addEventListener("pointerleave", onLeave);

    let prev = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const dt = Math.min((now - prev) / 1000, 1 / 30);
      prev = now;

      if (now >= startAt) {
        const steps = 4;
        const h = dt / steps;
        // gentle never-ending sway (about ±3°) so the card keeps moving a little
        const sway = reduce ? 0 : 0.05 * Math.sin((now - startAt) / 950);
        for (let i = 0; i < steps; i++) {
          if (!s.dragging) {
            // pendulum with damping, pulled toward the sway angle
            s.vel += (-18 * Math.sin(s.angle - sway) - 1.4 * s.vel) * h;
            s.angle += s.vel * h;
            // strap stretch springs back
            s.stretchVel += (-260 * s.stretch - 16 * s.stretchVel) * h;
            s.stretch += s.stretchVel * h;
          }
          // drop-in spring (slight bounce)
          s.dropVel += (-120 * s.drop - 13 * s.dropVel) * h;
          s.drop += s.dropVel * h;
        }
      }

      const k = Math.min(1, dt * 8);
      s.tiltX += (s.targetX - s.tiltX) * k;
      s.tiltY += (s.targetY - s.tiltY) * k;
      const yaw = clamp(s.tiltY + s.vel * 7, -35, 35);

      rig.style.transform = `translate3d(0, ${s.drop}px, 0) rotate(${s.angle}rad)`;
      strap.style.height = `${STRAP + s.stretch}px`;
      body.style.transform = `translate3d(0, ${s.stretch}px, 0)`;
      card.style.transform = `perspective(1000px) rotateX(${s.tiltX}deg) rotateY(${yaw}deg)`;
      shine.style.backgroundPosition = `${50 + yaw * 3}% 50%`;

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      card.removeEventListener("pointerdown", onDown);
      card.removeEventListener("pointermove", onMove);
      card.removeEventListener("pointerup", onUp);
      card.removeEventListener("pointercancel", onUp);
      card.removeEventListener("pointerleave", onLeave);
      stopWaiting();
    };
  }, []);

  const strapLabel = Array.from({ length: 8 }, () => `${strapText}  ·  `).join("");
  const bars = barcode(idNumber + name);

  return (
    <div className="relative" style={{ width: CARD_W, height: STRAP + CARD_H + 48 }}>
      <div
        ref={rigRef}
        className="absolute inset-x-0 top-0 will-change-transform"
        style={{
          height: STRAP + CARD_H,
          transformOrigin: "50% 0",
          transform: `translate3d(0, -${STRAP + CARD_H + 120}px, 0)`,
        }}
      >
        {/* Lanyard strap */}
        <div
          ref={strapRef}
          aria-hidden="true"
          className="absolute left-1/2 top-0 flex w-[22px] -translate-x-1/2 items-start justify-center overflow-hidden"
          style={{
            height: STRAP,
            background:
              "linear-gradient(90deg, rgba(0,0,0,.35), rgba(255,255,255,.09) 30%, rgba(0,0,0,0) 60%, rgba(0,0,0,.35)), #1c1d22",
          }}
        >
          {/* two identical copies so the scrolling text loops seamlessly */}
          <span className="strap-text flex flex-col text-[8px] font-semibold tracking-[0.3em] text-accent-soft">
            <span className="whitespace-nowrap [writing-mode:vertical-rl]">{strapLabel}</span>
            <span className="whitespace-nowrap [writing-mode:vertical-rl]">{strapLabel}</span>
          </span>
        </div>

        <div ref={bodyRef} className="absolute inset-x-0" style={{ top: STRAP, height: CARD_H }}>
          {/* Metal clip */}
          <svg
            aria-hidden="true"
            className="pointer-events-none absolute -top-[34px] left-1/2 z-10 -translate-x-1/2"
            width="36"
            height="58"
            viewBox="0 0 36 58"
          >
            <defs>
              <linearGradient id="idcard-metal" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor="#2b2d32" />
                <stop offset="0.15" stopColor="#8e939b" />
                <stop offset="0.35" stopColor="#d4d7dc" />
                <stop offset="0.45" stopColor="#ffffff" />
                <stop offset="0.6" stopColor="#a4a8b0" />
                <stop offset="0.85" stopColor="#51555c" />
                <stop offset="1" stopColor="#2b2d32" />
              </linearGradient>
            </defs>
            <rect x="5" y="0" width="26" height="16" rx="3" fill="url(#idcard-metal)" />
            <rect x="15.5" y="15" width="5" height="15" fill="url(#idcard-metal)" />
            <rect x="8" y="28" width="20" height="21" rx="10" fill="none" stroke="url(#idcard-metal)" strokeWidth="3.5" />
          </svg>

          {/* The card */}
          <article
            ref={cardRef}
            aria-label={`${name}, ${role}`}
            className="absolute inset-0 cursor-grab touch-none select-none overflow-hidden rounded-[18px] bg-card text-zinc-100"
            style={{
              boxShadow:
                "0 40px 70px -25px rgba(0,0,0,.55), 0 14px 28px -14px rgba(0,0,0,.4), inset 0 0 0 1px rgba(255,255,255,.08)",
              willChange: "transform",
            }}
          >
            {/* background texture */}
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-[0.06]"
              style={{
                backgroundImage:
                  "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
                backgroundSize: "22px 22px",
              }}
            />
            <div aria-hidden="true" className="absolute -right-24 -top-24 size-64 rounded-full bg-accent/40 blur-3xl" />

            {/* clip slot */}
            <div
              aria-hidden="true"
              className="absolute left-1/2 top-3 h-2 w-11 -translate-x-1/2 rounded-full bg-black/70"
              style={{ boxShadow: "inset 0 1px 2px rgba(0,0,0,.7), 0 1px 0 rgba(255,255,255,.12)" }}
            />

            {/* header */}
            <div className="absolute inset-x-[18px] top-[34px] flex items-center justify-between text-[10px] font-medium uppercase tracking-[0.16em]">
              <span className="flex items-center gap-2">
                <span className="size-[7px] rounded-full bg-accent-soft shadow-[0_0_10px_var(--color-accent-soft)]" />
                {passLabel}
              </span>
              <span className="opacity-60">ID</span>
            </div>

            {/* photo / monogram */}
            <div className="absolute inset-x-[18px] top-[62px] h-[188px] overflow-hidden rounded-xl bg-gradient-to-br from-accent to-[#1c1e3f]">
              {photo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={photo}
                  alt={name}
                  draggable={false}
                  className="size-full scale-[1.35] object-cover object-[50%_18%]"
                />
              ) : (
                <div className="flex size-full items-center justify-center">
                  <span className="font-display text-[118px] leading-none tracking-tight text-white/90">{initials}</span>
                </div>
              )}
              <span className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full bg-black/45 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.12em] backdrop-blur">
                <span className="size-1.5 rounded-full bg-emerald-400" />
                {badge}
              </span>
            </div>

            {/* details */}
            <div className="absolute inset-x-[18px] bottom-[18px] flex flex-col gap-1">
              <div className="text-[26px] font-semibold leading-tight tracking-tight">{name}</div>
              <div className="text-[13px] font-medium opacity-75">{role}</div>
              <div className="text-[11px] opacity-50">{location}</div>
              <div className="mt-2 flex items-end justify-between border-t border-white/15 pt-2.5">
                <span className="text-[11px] tracking-[0.1em] opacity-80">{idNumber}</span>
                <svg width="62" height="19" viewBox="0 0 62 19" fill="currentColor" aria-hidden="true" className="opacity-85">
                  {bars.map((b) => (
                    <rect key={b.x} x={b.x} y="0" width={b.w} height="19" />
                  ))}
                </svg>
              </div>
            </div>

            {/* moving shine */}
            <div
              ref={shineRef}
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 mix-blend-overlay"
              style={{
                backgroundImage:
                  "linear-gradient(115deg, transparent 30%, rgba(255,255,255,.28) 48%, transparent 66%)",
                backgroundSize: "250% 100%",
              }}
            />
          </article>
        </div>
      </div>

      <p className="pointer-events-none absolute inset-x-0 bottom-0 text-center text-xs uppercase tracking-[0.2em] text-muted">
        Grab the card · give it a swing
      </p>
    </div>
  );
}
