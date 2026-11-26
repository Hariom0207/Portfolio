import ContactForm from "@/components/ContactForm";
import FaceAvatar from "@/components/FaceAvatar";
import Magnetic from "@/components/Magnetic";
import Reveal from "@/components/Reveal";
import { profile } from "@/data/resume";

// Circular photo with slowly rotating text around it.
function PhotoBadge() {
  const ringText = "OPEN TO WORK • REACT.JS DEVELOPER • MERN STACK • ";
  const circumference = 2 * Math.PI * 88; // the text is stretched to exactly fill the whole circle
  return (
    <div className="group relative size-44 shrink-0 sm:size-52">
      <svg viewBox="0 0 200 200" className="spin-slow absolute inset-0 size-full" aria-hidden="true">
        <defs>
          <path id="contact-ring" d="M100,100 m-88,0 a88,88 0 1,1 176,0 a88,88 0 1,1 -176,0" />
        </defs>
        <text className="fill-accent-soft text-[13px] font-semibold">
          <textPath href="#contact-ring" textLength={circumference - 6} lengthAdjust="spacing">
            {ringText}
          </textPath>
        </text>
      </svg>
      <div className="absolute inset-[15%] rounded-full border-2 border-accent shadow-[0_0_40px_rgba(94,103,230,.5)] transition-transform duration-500 group-hover:scale-105">
        <FaceAvatar src={profile.portrait} alt={profile.name} className="size-full" />
      </div>
      <span className="absolute bottom-[14%] right-[14%] size-5 rounded-full border-[3px] border-panel bg-emerald-400" />
    </div>
  );
}

export default function Contact() {
  return (
    <section id="contact" className="scroll-mt-24 px-4 py-24 sm:px-6 sm:py-32">
      <Reveal>
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[36px] bg-panel px-6 py-14 text-white ring-1 ring-white/5 sm:px-12 sm:py-20">
          <div aria-hidden="true" className="absolute -right-32 -top-32 size-96 rounded-full bg-accent/50 blur-[120px]" />
          <div aria-hidden="true" className="absolute -bottom-40 -left-32 size-96 rounded-full bg-accent/25 blur-[120px]" />

          <div className="relative grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-14">
            <div>
              <p className="flex items-center gap-3 text-sm font-medium uppercase tracking-[0.22em] text-white/60">
                <span className="h-px w-10 bg-accent-soft" />
                Contact
              </p>
              <h2 className="mt-5 font-display text-[clamp(3.2rem,8vw,6.5rem)] uppercase leading-[0.88] tracking-tight">
                Let&apos;s work
                <br />
                <span className="text-accent-soft">together</span>
              </h2>
              <p className="mt-6 max-w-md text-lg text-white/70">
                I&apos;m looking for a React.js Developer role. If you have an opportunity or a project in mind, I&apos;d
                love to hear from you.
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-6">
                <PhotoBadge />
                <div>
                  <p className="font-display text-3xl uppercase tracking-wide">{profile.name}</p>
                  <p className="text-white/60">{profile.title}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Magnetic>
                      <a
                        href={`mailto:${profile.email}`}
                        className="inline-flex items-center rounded-full border border-white/25 px-4 py-2 text-sm transition-colors hover:border-white hover:bg-white hover:text-ink"
                      >
                        {profile.email}
                      </a>
                    </Magnetic>
                    <Magnetic>
                      <a
                        href={profile.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-full border border-white/25 px-4 py-2 text-sm transition-colors hover:border-[#0a66c2] hover:bg-[#0a66c2] hover:text-white"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                          <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
                        </svg>
                        LinkedIn ↗
                      </a>
                    </Magnetic>
                  </div>
                </div>
              </div>
            </div>

            <ContactForm email={profile.email} />
          </div>
        </div>
      </Reveal>

      <footer className="mx-auto mt-12 flex max-w-6xl flex-wrap items-center justify-between gap-4 text-sm text-muted">
        <p>© 2026 {profile.name}</p>
        <p>{profile.location}</p>
        <a
          href={profile.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="pr-16 transition-colors hover:text-accent sm:pr-20"
        >
          LinkedIn ↗
        </a>
      </footer>
    </section>
  );
}
