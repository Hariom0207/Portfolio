import Reveal from "@/components/Reveal";

export default function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <Reveal>
      <p className="flex items-center gap-3 text-sm font-medium uppercase tracking-[0.22em] text-muted">
        <span className="h-px w-10 bg-accent" />
        {eyebrow}
      </p>
      <h2 className="mt-4 font-display text-[clamp(3rem,8vw,6rem)] uppercase leading-[0.9] tracking-tight">{title}</h2>
    </Reveal>
  );
}
