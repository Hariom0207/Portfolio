import EmptyState from "@/components/EmptyState";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import Tilt from "@/components/Tilt";
import { education, experience } from "@/data/resume";

export default function Experience() {
  return (
    <section id="experience" className="scroll-mt-24 bg-surface">
      <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32">
        <SectionHeading eyebrow="Career" title="Experience" />
        {experience.length === 0 && (
          <div className="mt-14">
            <EmptyState title="No experience listed" message="Work history will appear here soon." />
          </div>
        )}

        <div className="mt-14 border-b border-line">
          {experience.map((e, i) => (
            <Reveal key={e.company} delay={i * 100}>
              <article className="group relative grid gap-4 border-t border-line py-10 md:grid-cols-[220px_1fr]">
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-[-1px] h-px w-0 bg-accent transition-all duration-700 group-hover:w-full"
                />
                <p className="text-sm font-medium uppercase tracking-[0.14em] text-muted transition-colors group-hover:text-accent">
                  {e.period}
                </p>
                <div className="transition-transform duration-500 group-hover:translate-x-2">
                  <h3 className="font-display text-3xl uppercase tracking-wide sm:text-4xl">{e.role}</h3>
                  <p className="mt-1 text-accent">
                    {e.company} <span className="text-muted">· {e.place}</span>
                  </p>
                  <ul className="mt-5 space-y-2.5 text-muted">
                    {e.points.map((p) => (
                      <li key={p} className="flex gap-3">
                        <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="mt-24">
          <SectionHeading eyebrow="Learning" title="Education" />
          {education.length === 0 && (
            <div className="mt-12">
              <EmptyState title="No education listed" message="Education details will appear here soon." />
            </div>
          )}
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {education.map((ed, i) => (
              <Reveal key={ed.degree} delay={i * 90}>
                <Tilt className="rounded-3xl">
                <div className="h-full rounded-3xl border border-line bg-bg p-7">
                  <p className="font-display text-4xl text-accent">{ed.score}</p>
                  <h3 className="mt-6 font-display text-2xl uppercase tracking-wide">{ed.degree}</h3>
                  <p className="mt-1 text-muted">{ed.school}</p>
                  {ed.period && <p className="mt-3 text-sm uppercase tracking-[0.14em] text-muted">{ed.period}</p>}
                </div>
                </Tilt>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
