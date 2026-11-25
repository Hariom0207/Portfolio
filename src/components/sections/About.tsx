import CountUp from "@/components/CountUp";
import FlipPhoto from "@/components/FlipPhoto";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import Tilt from "@/components/Tilt";
import { profile, skills, stats } from "@/data/resume";

export default function About() {
  return (
    <section id="about" className="scroll-mt-24 bg-surface">
      <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32">
        <SectionHeading eyebrow="About" title="About me" />

        <div className="mt-14 grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          {/* Photo flips in as you scroll, then stays in view while the text scrolls */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            {profile.photo && (
              <FlipPhoto
                src={profile.photo}
                alt={profile.name}
                initials={profile.initials}
                badges={["2+ yrs · MERN", "Open to work"]}
              />
            )}
          </div>

          <div>
            {profile.summary.map((p, i) => (
              <Reveal key={i} delay={i * 100}>
                <p className={`text-lg leading-relaxed ${i === 0 ? "text-xl text-ink" : "mt-5 text-muted"}`}>{p}</p>
              </Reveal>
            ))}

            <div className="mt-10 grid grid-cols-3 gap-3">
              {stats.map((s, i) => (
                <Reveal key={s.label} delay={i * 100}>
                  <Tilt className="rounded-2xl" max={10}>
                    <div className="h-full rounded-2xl border border-line bg-bg p-4 sm:p-5">
                      <div className="font-display text-4xl text-accent sm:text-5xl">
                        <CountUp value={s.value} suffix={s.suffix} />
                      </div>
                      <div className="mt-1 text-xs leading-snug text-muted sm:text-sm">{s.label}</div>
                    </div>
                  </Tilt>
                </Reveal>
              ))}
            </div>

            <div className="mt-10 space-y-4">
              {skills.map((g, i) => (
                <Reveal key={g.group} delay={i * 60}>
                  <div className="grid gap-2 border-t border-line pt-4 sm:grid-cols-[150px_1fr]">
                    <span className="text-sm font-medium uppercase tracking-[0.12em] text-muted">{g.group}</span>
                    <div className="flex flex-wrap gap-2">
                      {g.items.map((s) => (
                        <span
                          key={s}
                          className="rounded-full border border-line bg-bg px-3 py-1 text-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-accent hover:bg-accent hover:text-white"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
