import type { Metadata } from "next";
import Link from "next/link";
import IdCard from "@/components/IdCard";
import SparkleCursor from "@/components/SparkleCursor";
import ThemeToggle from "@/components/ThemeToggle";

export const metadata: Metadata = {
  title: "Page not found — Hariom Ray",
};

// 404 page: the ID card hangs here too, as an "access denied" pass.
export default function NotFound() {
  return (
    <>
      <SparkleCursor />
      <header className="fixed inset-x-0 top-3 z-50 px-3 sm:top-4 sm:px-4">
        <nav className="mx-auto flex max-w-6xl items-center justify-between rounded-full border border-line bg-surface/80 py-1.5 pl-4 pr-1.5 backdrop-blur-md sm:py-2 sm:pl-5 sm:pr-2">
          <Link href="/" className="font-display text-xl uppercase tracking-wide">
            Hariom<span className="text-accent">.</span>
          </Link>
          <ThemeToggle />
        </nav>
      </header>

      <main className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_20%,rgba(94,103,230,0.16),transparent_60%)]"
        />
        <div className="relative mx-auto grid min-h-svh max-w-6xl grid-cols-1 items-center px-4 pb-16 sm:px-6 lg:grid-cols-[1fr_1fr]">
          <div className="order-2 lg:order-1">
            <p className="flex items-center gap-3 text-sm font-medium uppercase tracking-[0.22em] text-muted">
              <span className="h-px w-10 bg-accent" />
              Error 404
            </p>
            <h1 className="mt-4 font-display text-[clamp(4rem,14vw,9rem)] uppercase leading-[0.88] tracking-tight">
              Lost in
              <br />
              <span className="text-accent">the stack</span>
            </h1>
            <p className="mt-6 max-w-md text-lg text-muted">
              The page you&apos;re looking for doesn&apos;t exist or has been moved. Let&apos;s get you back on track.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/"
                className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-medium text-white transition-colors hover:bg-ink hover:text-bg"
              >
                <span className="transition-transform group-hover:-translate-x-1">←</span>
                Back to home
              </Link>
              <Link
                href="/#work"
                className="inline-flex items-center rounded-full border border-ink/15 px-6 py-3.5 text-sm font-medium transition-colors hover:border-ink hover:bg-ink hover:text-bg"
              >
                See my work
              </Link>
            </div>
          </div>

          <div className="relative order-1 mb-10 flex justify-center self-start lg:order-2 lg:mb-0">
            <IdCard
              name="Page not found"
              role="Access denied"
              idNumber="ERR-404"
              location="Nowhere, Internet"
              initials="404"
              strapText="ERROR 404 · PAGE NOT FOUND"
              photo={null}
              passLabel="Visitor Pass"
              badge="Not found"
            />
          </div>
        </div>
      </main>
    </>
  );
}
