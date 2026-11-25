import type { CSSProperties } from "react";
import IdCard from "@/components/IdCard";
import Magnetic from "@/components/Magnetic";
import Reveal from "@/components/Reveal";
import { Parallax } from "@/components/ScrollEffects";
import { profile } from "@/data/resume";

// One line of the big name; each letter slides up from a mask.
function SplitLine({ text, delay, className = "" }: { text: string; delay: number; className?: string }) {
  return (
    <span className={`block overflow-hidden pb-[0.04em] ${className}`} aria-hidden="true">
      {text.split("").map((ch, i) => (
        <span key={i} className="letter" style={{ "--d": `${delay + i * 55}ms` } as CSSProperties}>
          {ch}
        </span>
      ))}
    </span>
  );
}

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_75%_25%,rgba(94,103,230,0.14),transparent_60%)]"
      />

      <div className="relative mx-auto grid max-w-6xl grid-cols-1 px-4 sm:px-6 lg:min-h-svh lg:grid-cols-[1.15fr_1fr]">
        {/* Text column */}
        <div className="order-2 flex flex-col justify-center pb-20 pt-4 lg:order-1 lg:pb-16 lg:pt-28">
          <Parallax speed={0.25}>
          <Reveal>
            <p className="flex items-center gap-3 text-sm font-medium uppercase tracking-[0.22em] text-muted">
              <span className="h-px w-10 bg-accent" />
              Hi, I&apos;m
            </p>
          </Reveal>

          <h1 className="mt-4 font-display text-[clamp(4.5rem,15vw,10.5rem)] uppercase leading-[0.88] tracking-tight">
            <span className="sr-only">{profile.name}</span>
            <SplitLine text={profile.firstName} delay={150} />
            <SplitLine text={profile.lastName} delay={500} className="text-accent" />
          </h1>

          <Reveal delay={750}>
            <p className="mt-6 font-display text-2xl uppercase tracking-wide sm:text-3xl">
              React.js <span className="text-muted">&amp;</span> MERN Stack Developer
            </p>
          </Reveal>

          <Reveal delay={850}>
            <p className="mt-4 max-w-md text-base leading-relaxed text-muted sm:text-lg">{profile.intro}</p>
          </Reveal>

          <Reveal delay={950}>
            <div className="mt-8 flex flex-wrap gap-3">
              <Magnetic>
                <a
                  href="#work"
                  className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-medium text-white transition-colors hover:bg-ink"
                >
                  View my work
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </a>
              </Magnetic>
              <Magnetic>
                <a
                  href="#contact"
                  className="inline-flex items-center rounded-full border border-ink/15 px-6 py-3.5 text-sm font-medium transition-colors hover:border-ink hover:bg-ink hover:text-white"
                >
                  Get in touch
                </a>
              </Magnetic>
            </div>
          </Reveal>

          <Reveal delay={1050}>
            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted">
              <span className="flex items-center gap-2">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                  <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
                </span>
                Available for React.js roles
              </span>
              <span>{profile.location}</span>
            </div>
          </Reveal>
          </Parallax>
        </div>

        {/* Hanging ID card column */}
        <div className="relative order-1 flex justify-center lg:order-2">
          <IdCard
            name={profile.name}
            role={profile.role}
            idNumber={profile.idNumber}
            location={profile.shortLocation}
            initials={profile.initials}
            strapText="HARIOM RAY · MERN DEV"
            photo={profile.photo}
          />
        </div>
      </div>
    </section>
  );
}
