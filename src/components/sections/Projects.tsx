import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import Tilt from "@/components/Tilt";
import { projects } from "@/data/resume";

export default function Projects() {
  return (
    <section id="work" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-24 sm:px-6 sm:py-32">
      <SectionHeading eyebrow="Selected work" title="Featured projects" />

      <div className="mt-14 grid gap-6 md:grid-cols-2">
        {projects.map((p, i) => {
          const inner = (
            <>
              <Tilt className="rounded-[22px]" max={9}>
              <div
                className={`relative flex h-60 items-end overflow-hidden rounded-[22px] bg-gradient-to-br p-6 shadow-[0_30px_60px_-35px_rgba(0,0,0,.5)] sm:h-72 ${p.theme}`}
              >
                <div
                  aria-hidden="true"
                  className="absolute inset-0 opacity-[0.08]"
                  style={{
                    backgroundImage:
                      "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
                    backgroundSize: "28px 28px",
                  }}
                />
                <span className="relative font-display text-[clamp(3rem,7vw,5rem)] uppercase leading-[0.85] text-white transition-transform duration-700 group-hover:-translate-y-2 group-hover:scale-[1.03]">
                  {p.title}
                </span>
                <span className="absolute right-5 top-5 rounded-full bg-white/15 px-3 py-1 text-xs font-medium uppercase tracking-[0.14em] text-white backdrop-blur">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="absolute bottom-5 right-5 flex size-12 translate-y-3 items-center justify-center rounded-full bg-white text-lg text-ink opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  {p.url ? "↗" : "★"}
                </span>
              </div>
              </Tilt>
              <div className="px-2 pt-5">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">{p.category}</p>
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
                  <span className="flex items-center gap-1 text-sm font-medium">
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
