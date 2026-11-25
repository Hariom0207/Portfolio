"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import ThemeToggle from "@/components/ThemeToggle";

// In the same order as the sections on the page.
const links = [
  { id: "services", label: "Services" },
  { id: "about", label: "About" },
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
];
const tracked = [...links.map((l) => l.id), "contact"];
const labelOf = (id: string | null) =>
  id === "contact" ? "Contact" : (links.find((l) => l.id === id)?.label ?? "Home");

type Pill = { left: number; right: number; dir: 1 | -1 };

// Text whose letters roll up one after another (on hover, or while `active`).
function RollText({ text, active }: { text: string; active: boolean }) {
  return (
    <span className="roll relative inline-flex overflow-hidden" data-active={active} aria-hidden="true">
      {text.split("").map((ch, i) => (
        <span key={i} className="roll-char relative inline-block" style={{ "--i": i } as CSSProperties}>
          <span className="block">{ch === " " ? " " : ch}</span>
          <span className="absolute left-0 top-full block text-accent">{ch === " " ? " " : ch}</span>
        </span>
      ))}
    </span>
  );
}

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [pill, setPill] = useState<Pill | null>(null);
  const [scrolledDown, setScrolledDown] = useState(false);
  const [hovered, setHovered] = useState(false);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    let raf = 0;
    let lastY = window.scrollY;
    let lastLeft = -1;

    const update = () => {
      const y = window.scrollY;

      // collapse while scrolling down, expand when scrolling up or near the top
      if (y < 160) setScrolledDown(false);
      else if (y > lastY + 6) setScrolledDown(true);
      else if (y < lastY - 6) setScrolledDown(false);
      lastY = y;

      // which section is in view: the last one whose top has passed 40% of the screen
      const line = window.innerHeight * 0.4;
      let current: string | null = null;
      for (const id of tracked) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }
      if (window.innerHeight + y >= document.documentElement.scrollHeight - 4) current = "contact";
      setActive(current);

      // position of the stretchy highlight under the active link
      const list = listRef.current;
      const el = current ? list?.querySelector<HTMLElement>(`[data-id="${current}"]`) : null;
      if (list && el) {
        const left = el.offsetLeft;
        const right = list.offsetWidth - (el.offsetLeft + el.offsetWidth);
        const dir: 1 | -1 = lastLeft < 0 || left >= lastLeft ? 1 : -1;
        lastLeft = left;
        setPill((p) => (p && p.left === left && p.right === right ? p : { left, right, dir }));
      } else {
        setPill(null);
      }
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

  const collapsed = scrolledDown && !hovered && !open;
  const contactActive = active === "contact";

  // Leading edge moves fast, trailing edge catches up slowly -> liquid stretch.
  const fast = "320ms cubic-bezier(.22,1,.36,1)";
  const slow = "620ms cubic-bezier(.65,0,.35,1) 60ms";
  const pillStyle: CSSProperties = pill
    ? {
        left: pill.left,
        right: pill.right,
        opacity: 1,
        transition:
          pill.dir === 1
            ? `right ${fast}, left ${slow}, opacity 300ms`
            : `left ${fast}, right ${slow}, opacity 300ms`,
      }
    : { left: 0, right: "100%", opacity: 0 };

  return (
    <header className="pointer-events-none fixed inset-x-0 top-3 z-50 px-3 sm:top-4 sm:px-4">
      <nav
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={`pointer-events-auto mx-auto flex items-center justify-between gap-2 rounded-full border border-line bg-surface/80 py-1.5 pl-4 pr-1.5 shadow-[0_10px_30px_-12px_rgba(0,0,0,.25)] backdrop-blur-md transition-[max-width,padding,box-shadow] duration-700 ease-[cubic-bezier(.22,1,.36,1)] sm:py-2 sm:pl-5 sm:pr-2 ${
          collapsed ? "max-w-[21rem] shadow-[0_14px_40px_-12px_rgba(94,103,230,.45)]" : "max-w-6xl"
        }`}
      >
        <a href="#top" className="shrink-0 font-display text-xl uppercase tracking-wide" aria-label="Back to top">
          {collapsed ? "H" : "Hariom"}
          <span className="text-accent">.</span>
        </a>

        {/* current section chip — only while collapsed */}
        <button
          type="button"
          onClick={() => setScrolledDown(false)}
          className={`flex items-center gap-2 overflow-hidden rounded-full bg-accent/10 text-sm font-medium text-accent transition-all duration-500 ${
            collapsed ? "max-w-40 px-3.5 py-2 opacity-100" : "pointer-events-none max-w-0 px-0 py-2 opacity-0"
          }`}
          aria-label="Expand navigation"
          tabIndex={collapsed ? 0 : -1}
        >
          <span className="size-1.5 shrink-0 animate-pulse rounded-full bg-accent" />
          <span key={active ?? "home"} className="nav-chip-in whitespace-nowrap">
            {labelOf(active)}
          </span>
        </button>

        {/* desktop links */}
        <ul
          ref={listRef}
          className={`relative hidden items-center transition-all duration-500 md:flex ${
            collapsed
              ? "pointer-events-none max-w-0 scale-90 overflow-hidden opacity-0"
              : "max-w-[640px] scale-100 opacity-100"
          }`}
        >
          <span
            aria-hidden="true"
            className="absolute inset-y-0 rounded-full bg-accent/12 shadow-[inset_0_0_0_1px_rgba(94,103,230,.3),0_0_24px_-4px_rgba(94,103,230,.45)]"
            style={pillStyle}
          />
          {links.map((l) => {
            const isActive = active === l.id;
            return (
              <li key={l.id} data-id={l.id} className="relative">
                <a
                  href={`#${l.id}`}
                  aria-current={isActive ? "true" : undefined}
                  className={`relative flex items-center whitespace-nowrap rounded-full px-4 py-2 text-sm transition-colors duration-300 ${
                    isActive ? "font-medium" : "text-muted hover:text-ink"
                  }`}
                >
                  <span className="sr-only">{l.label}</span>
                  <RollText text={l.label} active={isActive} />
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          <ThemeToggle />
          <a
            href="#contact"
            aria-current={contactActive ? "true" : undefined}
            className={`hidden whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-medium transition-colors duration-300 md:inline-flex ${
              contactActive ? "bg-accent text-white" : "bg-ink text-bg hover:bg-accent hover:text-white"
            }`}
          >
            Let&apos;s talk
          </a>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
            className="flex size-10 items-center justify-center rounded-full bg-ink text-bg md:hidden"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              {open ? <path d="M4 4l10 10M14 4L4 14" /> : <path d="M2 5h14M2 13h14" />}
            </svg>
          </button>
        </div>
      </nav>

      {open && (
        <div className="nav-menu-in pointer-events-auto mx-auto mt-2 max-w-6xl rounded-3xl border border-line bg-surface p-2 shadow-xl md:hidden">
          {[...links, { id: "contact", label: "Contact" }].map((l, i) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              onClick={() => setOpen(false)}
              style={{ "--i": i } as CSSProperties}
              className={`nav-item-in flex items-center justify-between rounded-2xl px-4 py-3 font-display text-2xl uppercase tracking-wide ${
                active === l.id ? "bg-accent/10 text-accent" : "hover:bg-ink/5"
              }`}
            >
              {l.label}
              {active === l.id ? <span className="size-2 rounded-full bg-accent" /> : <span className="text-muted">→</span>}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
