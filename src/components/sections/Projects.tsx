import Image from "next/image";
import EmptyState from "@/components/EmptyState";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import Tilt from "@/components/Tilt";
import { projects } from "@/data/resume";

export default function Projects() {
  return (
    <section id="work" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-24 sm:px-6 sm:py-32">
      <SectionHeading eyebrow="Selected work" title="Featured projects" />
      {projects.length === 0 && (
        <div className="mt-14">
          <EmptyState title="Projects coming soon" message="I'm putting together case studies of my latest work." />
        </div>
      )}

      <div className="mt-14 grid gap-6 md:grid-cols-2">
        {projects.map((p, i) => {
          const inner = (
            <>
              <Tilt className="rounded-[22px]" max={9}>
              <div
                className={`relative flex h-60 overflow-hidden rounded-[22px] bg-gradient-to-br p-6 shadow-[0_30px_60px_-35px_rgba(0,0,0,.5)] sm:h-72 ${
                  p.logo ? "items-center justify-center ring-1 ring-black/5" : "items-end"
                } ${p.theme}`}
              >
                {/* subtle grid texture (dark lines on light logo panels, light lines on colour panels) */}
                <div
                  aria-hidden="true"
                  className={`absolute inset-0 ${p.logo ? "opacity-[0.05]" : "opacity-[0.08]"}`}
                  style={{
                    backgroundImage: p.logo
                      ? "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)"
                      : "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
                    backgroundSize: "28px 28px",
                  }}
                />

                {p.logo ? (
                  <Image
                    src={p.logo.src}
                    alt={`${p.title} logo`}
                    width={p.logo.width}
                    height={p.logo.height}
                    sizes="(min-width: 768px) 400px, 80vw"
                    className={`relative object-contain mix-blend-multiply transition-transform duration-700 group-hover:scale-105 ${p.logo.className}`}
                  />
                ) : (
                  <span
                    className={`relative font-display text-[clamp(3rem,7vw,5rem)] uppercase leading-[0.85] text-white transition-transform duration-700 group-hover:-translate-y-2 group-hover:scale-[1.03] ${
                      p.comingSoon ? "opacity-60" : ""
                    }`}
                  >
                    {p.title}
                  </span>
                )}

                {p.comingSoon && !p.logo && (
                  <>
                    {/* moving diagonal stripes */}
                    <div aria-hidden="true" className="coming-soon-stripes absolute inset-0 opacity-[0.12]" />
                    <span className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-2.5 rounded-full bg-black/35 px-5 py-2.5 font-display text-2xl uppercase tracking-[0.12em] text-white shadow-lg ring-1 ring-white/25 backdrop-blur-md sm:text-3xl">
                      <span className="relative flex size-2.5">
                        <span className="absolute inline-flex size-full animate-ping rounded-full bg-amber-300 opacity-75" />
                        <span className="relative size-2.5 rounded-full bg-amber-300" />
                      </span>
                      Coming soon
                    </span>
                  </>
                )}
                {/* logo projects: smaller badge in the corner so the logo stays visible */}
                {p.comingSoon && p.logo && (
                  <span className="absolute bottom-5 left-5 flex items-center gap-2 rounded-full bg-[#14151b] px-4 py-2 font-display text-lg uppercase tracking-[0.12em] text-white shadow-lg">
                    <span className="relative flex size-2">
                      <span className="absolute inline-flex size-full animate-ping rounded-full bg-amber-300 opacity-75" />
                      <span className="relative size-2 rounded-full bg-amber-300" />
                    </span>
                    Coming soon
                  </span>
                )}

                <span
                  className={`absolute right-5 top-5 rounded-full px-3 py-1 text-xs font-medium uppercase tracking-[0.14em] backdrop-blur ${
                    p.logo ? "bg-black/5 text-black/60" : "bg-white/15 text-white"
                  }`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                {p.url && (
                  <span className="absolute bottom-5 right-5 flex size-12 translate-y-3 items-center justify-center rounded-full bg-ink text-lg text-bg opacity-0 shadow-lg transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    ↗
                  </span>
                )}
              </div>
              </Tilt>
              <div className="px-2 pt-5">
                <p className="flex flex-wrap items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-accent">
                  {p.category}
                  {p.comingSoon && (
                    <span className="rounded-full bg-amber-400/15 px-2 py-0.5 text-[10px] tracking-[0.14em] text-amber-600 dark:text-amber-300">
                      Coming soon
                    </span>
                  )}
                </p>
                <h3 className="mt-2 font-display text-3xl uppercase tracking-wide">{p.title}</h3>
                <p className="mt-2 text-muted">{p.description}</p>
                <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <span key={t} className="rounded-full border border-line px-3 py-1 text-xs text-muted">
                        {t}
                      </span>
                    ))}
                  </div>
                  <span className={`flex items-center gap-1.5 text-sm font-medium ${p.comingSoon ? "text-muted" : ""}`}>
                    {p.comingSoon && <span className="size-1.5 animate-pulse rounded-full bg-amber-400" />}
                    {p.linkLabel}
                    {p.url && <span className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5">↗</span>}
                  </span>
                </div>
              </div>
            </>
          );

          return (
            <Reveal key={p.title} delay={(i % 2) * 120} className={i === projects.length - 1 && projects.length % 2 ? "md:col-span-2 md:mx-auto md:w-1/2" : ""}>
              {p.url ? (
                <a href={p.url} target="_blank" rel="noopener noreferrer" className="group block">
                  {inner}
                </a>
              ) : (
                <div className="group">{inner}</div>
              )}
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
