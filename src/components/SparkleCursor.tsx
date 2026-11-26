"use client";

import { useEffect, useRef } from "react";

// Electric spark streak, or a small square "ember".
type Spark = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  max: number;
  width: number;
  color: string;
  ember: boolean;
};
type Wave = { x: number; y: number; life: number };

const COLORS = ["#5e67e6", "#6d75f2", "#3b82f6", "#38bdf8", "#a3a9ff", "#e0f2fe"];
const HOVER_TARGETS = "a, button, input, textarea, select, label, [role='button'], .cursor-grab";

// Custom cursor: a sharp targeting reticle that throws off electric blue spark streaks.
// Replaces the system arrow on mouse/trackpad devices; touch devices are left alone.
export default function SparkleCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reticleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const reticle = reticleRef.current;
    if (!canvas || !reticle) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const root = document.documentElement;
    root.classList.add("has-custom-cursor");

    const sparks: Spark[] = [];
    const waves: Wave[] = [];
    const pos = { x: -200, y: -200 };
    const vel = { x: 0, y: 0 };
    let last = { x: -200, y: -200, t: performance.now() };
    let hover = 0;
    let hoverTarget = 0;
    let press = 1;
    let spin = 0;
    let visible = false;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const add = (s: Spark) => {
      sparks.push(s);
      if (sparks.length > 600) sparks.shift();
    };

    // sparks fly backwards from the direction of motion, with spread
    const trail = (count: number) => {
      if (reduce) return;
      const speed = Math.hypot(vel.x, vel.y);
      const base = speed > 1 ? Math.atan2(-vel.y, -vel.x) : Math.random() * Math.PI * 2;
      for (let i = 0; i < count; i++) {
        const a = base + (Math.random() - 0.5) * 1.4;
        const s = 60 + Math.random() * 160 + Math.min(speed * 0.15, 200);
        const ember = Math.random() < 0.25;
        const max = 0.25 + Math.random() * 0.35;
        add({
          x: pos.x,
          y: pos.y,
          vx: Math.cos(a) * s,
          vy: Math.sin(a) * s,
          life: max,
          max,
          width: ember ? 2 + Math.random() * 2 : 1 + Math.random() * 1.4,
          color: COLORS[(Math.random() * COLORS.length) | 0],
          ember,
        });
      }
    };

    const burst = () => {
      if (reduce) return;
      waves.push({ x: pos.x, y: pos.y, life: 1 });
      for (let i = 0; i < 28; i++) {
        const a = (i / 28) * Math.PI * 2 + Math.random() * 0.2;
        const s = 220 + Math.random() * 260;
        const max = 0.35 + Math.random() * 0.3;
        add({
          x: pos.x,
          y: pos.y,
          vx: Math.cos(a) * s,
          vy: Math.sin(a) * s,
          life: max,
          max,
          width: 1.3 + Math.random() * 1.5,
          color: COLORS[(Math.random() * COLORS.length) | 0],
          ember: i % 5 === 0,
        });
      }
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const now = performance.now();
      pos.x = e.clientX;
      pos.y = e.clientY;
      const dt = Math.max(8, now - last.t) / 1000;
      vel.x = (pos.x - last.x) / dt;
      vel.y = (pos.y - last.y) / dt;
      if (!visible) {
        visible = true;
        reticle.style.opacity = "1";
        vel.x = vel.y = 0;
      }
      const dist = Math.hypot(pos.x - last.x, pos.y - last.y);
      if (dist > 2) trail(Math.min(9, 2 + Math.ceil(dist / 6)));
      last = { x: pos.x, y: pos.y, t: now };
    };
    const onOver = (e: PointerEvent) => {
      const t = e.target as Element | null;
      hoverTarget = t?.closest?.(HOVER_TARGETS) ? 1 : 0;
    };
    const onDown = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      press = 0.65;
      burst();
    };
    const onLeave = () => {
      visible = false;
      reticle.style.opacity = "0";
    };

    let prev = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const dt = Math.min((now - prev) / 1000, 0.05);
      prev = now;

      // reticle
      hover += (hoverTarget - hover) * Math.min(1, dt * 12);
      press += (1 - press) * Math.min(1, dt * 10);
      spin += dt * (20 + hover * 160);
      reticle.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%) scale(${press})`;
      reticle.style.setProperty("--spread", `${hover * 7}px`);
      reticle.style.setProperty("--spin", `${45 + hover * 45 + (reduce ? 0 : spin * hover)}deg`);

      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      ctx.globalCompositeOperation = "lighter";

      // click shockwaves
      for (let i = waves.length - 1; i >= 0; i--) {
        const w = waves[i];
        w.life -= dt * 2.2;
        if (w.life <= 0) {
          waves.splice(i, 1);
          continue;
        }
        ctx.globalAlpha = w.life * 0.8;
        ctx.strokeStyle = "#6d75f2";
        ctx.lineWidth = 2 * w.life + 0.5;
        ctx.shadowColor = "#3b82f6";
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.arc(w.x, w.y, (1 - w.life) * 46 + 6, 0, Math.PI * 2);
        ctx.stroke();
      }

      // sparks
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.life -= dt;
        if (s.life <= 0) {
          sparks.splice(i, 1);
          continue;
        }
        const drag = 1 - dt * 6;
        s.vx *= drag;
        s.vy = s.vy * drag + 220 * dt; // a little gravity
        s.x += s.vx * dt;
        s.y += s.vy * dt;
        const t = s.life / s.max;
        ctx.globalAlpha = Math.min(1, t * 1.4);
        ctx.shadowColor = s.color;
        ctx.shadowBlur = 8;
        if (s.ember) {
          ctx.fillStyle = s.color;
          const w = s.width * t + 0.5;
          ctx.fillRect(s.x - w / 2, s.y - w / 2, w, w);
        } else {
          // streak along the direction of travel
          const len = 0.035;
          ctx.strokeStyle = s.color;
          ctx.lineWidth = s.width * (0.4 + 0.6 * t);
          ctx.lineCap = "round";
          ctx.beginPath();
          ctx.moveTo(s.x, s.y);
          ctx.lineTo(s.x - s.vx * len, s.y - s.vy * len);
          ctx.stroke();
        }
      }
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "source-over";
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("resize", resize);
    document.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      root.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("resize", resize);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[300]">
      <canvas ref={canvasRef} className="absolute inset-0 size-full" />
      {/* targeting reticle */}
      <div ref={reticleRef} className="reticle absolute left-0 top-0 size-10 opacity-0 transition-opacity duration-200">
        <span className="reticle-diamond" />
        <span className="reticle-tick reticle-t" />
        <span className="reticle-tick reticle-r" />
        <span className="reticle-tick reticle-b" />
        <span className="reticle-tick reticle-l" />
      </div>
    </div>
  );
}
