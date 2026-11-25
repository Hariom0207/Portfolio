import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import Tilt from "@/components/Tilt";
import { services } from "@/data/resume";

export default function Services() {
  return (
    <section id="services" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-24 sm:px-6 sm:py-32">
      <div className="grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-end">
        <SectionHeading eyebrow="Services" title="What I can do for you" />
        <Reveal delay={100}>
          <p className="max-w-md text-muted lg:justify-self-end">
            From the interface people click on to the API and database behind it — I work across the whole MERN stack,
            with a focus on clean, responsive React frontends.
          </p>
        </Reveal>
      </div>

      <div className="mt-14 grid gap-5 sm:grid-cols-2">
        {services.map((s, i) => (
          <Reveal key={s.title} delay={i * 90}>
            <Tilt className="rounded-3xl">
            <article className="group h-full rounded-3xl border border-line bg-surface p-8 transition-all duration-500 hover:border-accent/40 hover:shadow-[0_30px_60px_-30px_rgba(94,103,230,.45)]">
              <div className="flex items-start justify-between">
                <span className="font-display text-5xl text-accent">{String(i + 1).padStart(2, "0")}</span>
                <span className="flex size-10 items-center justify-center rounded-full border border-line text-muted transition-all duration-500 group-hover:rotate-45 group-hover:border-accent group-hover:bg-accent group-hover:text-white">
                  ↗
                </span>
              </div>
              <h3 className="mt-8 font-display text-3xl uppercase tracking-wide">{s.title}</h3>
              <ul className="mt-4 space-y-2 text-muted">
                {s.points.map((p) => (
                  <li key={p} className="flex items-center gap-3">
                    <span className="size-1.5 rounded-full bg-accent" />
                    {p}
                  </li>
                ))}
              </ul>
            </article>
            </Tilt>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
