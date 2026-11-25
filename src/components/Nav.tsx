"use client";

import { useState } from "react";

const links = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#work", label: "Work" },
  { href: "#experience", label: "Experience" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-4 z-50 px-4">
      <nav className="mx-auto flex max-w-6xl items-center justify-between rounded-full border border-line bg-white/75 py-2 pl-5 pr-2 shadow-[0_10px_30px_-15px_rgba(0,0,0,.2)] backdrop-blur-md">
        <a href="#top" className="font-display text-xl uppercase tracking-wide">
          Hariom<span className="text-accent">.</span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="rounded-full px-4 py-2 text-sm text-muted transition-colors hover:bg-black/5 hover:text-ink"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          className="hidden rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent md:inline-flex"
        >
          Let&apos;s talk
        </a>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
          className="flex size-10 items-center justify-center rounded-full bg-ink text-white md:hidden"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            {open ? <path d="M4 4l10 10M14 4L4 14" /> : <path d="M2 5h14M2 13h14" />}
          </svg>
        </button>
      </nav>

      {open && (
        <div className="mx-auto mt-2 max-w-6xl rounded-3xl border border-line bg-white p-2 shadow-lg md:hidden">
          {[...links, { href: "#contact", label: "Contact" }].map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block rounded-2xl px-4 py-3 font-display text-2xl uppercase tracking-wide hover:bg-black/5"
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
