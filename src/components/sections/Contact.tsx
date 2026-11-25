import Magnetic from "@/components/Magnetic";
import Reveal from "@/components/Reveal";
import { profile } from "@/data/resume";

export default function Contact() {
  return (
    <section id="contact" className="scroll-mt-24 px-4 py-24 sm:px-6 sm:py-32">
      <Reveal>
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[36px] bg-ink px-6 py-16 text-white sm:px-14 sm:py-24">
          <div aria-hidden="true" className="absolute -right-32 -top-32 size-96 rounded-full bg-accent/50 blur-[120px]" />
          <p className="relative flex items-center gap-3 text-sm font-medium uppercase tracking-[0.22em] text-white/60">
            <span className="h-px w-10 bg-accent-soft" />
            Contact
          </p>
          <h2 className="relative mt-5 font-display text-[clamp(3.5rem,11vw,8.5rem)] uppercase leading-[0.88] tracking-tight">
            Let&apos;s work
            <br />
            <span className="text-accent-soft">together</span>
          </h2>
          <p className="relative mt-6 max-w-lg text-lg text-white/70">
            I&apos;m looking for a React.js Developer role. If you have an opportunity or a project in mind, I&apos;d love
            to hear from you.
          </p>
          <div className="relative mt-10 flex flex-wrap gap-3">
            <Magnetic>
              <a
                href={`mailto:${profile.email}`}
                className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-4 font-medium transition-colors hover:bg-white hover:text-ink"
              >
                {profile.email}
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-full border border-white/25 px-6 py-4 font-medium transition-colors hover:border-white hover:bg-white hover:text-ink"
              >
                GitHub ↗
              </a>
            </Magnetic>
          </div>
        </div>
      </Reveal>

      <footer className="mx-auto mt-12 flex max-w-6xl flex-wrap items-center justify-between gap-4 text-sm text-muted">
        <p>© 2026 {profile.name}</p>
        <p>{profile.location}</p>
        <a href="#top" className="transition-colors hover:text-ink">
          Back to top ↑
        </a>
      </footer>
    </section>
  );
}
