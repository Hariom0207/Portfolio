"use client";

import { useState, type FormEvent } from "react";

type Status = { kind: "idle" | "sending" | "sent" | "error"; message?: string };

const field =
  "w-full rounded-2xl border border-white/15 bg-white/[0.06] px-4 py-3.5 text-white placeholder:text-white/35 outline-none transition-all duration-300 focus:border-accent-soft focus:bg-white/[0.09] focus:shadow-[0_0_0_4px_rgba(94,103,230,.25)]";

export default function ContactForm({ email }: { email: string }) {
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    setStatus({ kind: "sending" });

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = (await res.json().catch(() => ({}))) as { error?: string };

      if (res.ok) {
        form.reset();
        setStatus({ kind: "sent", message: "Thanks! Your message has been sent — I'll get back to you soon." });
        return;
      }
      if (json.error === "not-configured") {
        // Email sending isn't set up yet: open the visitor's mail app with the message filled in.
        const subject = encodeURIComponent(data.subject || `Hello from ${data.name}`);
        const body = encodeURIComponent(`${data.message}\n\n— ${data.name} (${data.email})`);
        window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
        setStatus({ kind: "idle" });
        return;
      }
      setStatus({ kind: "error", message: json.error || "Something went wrong. Please try again." });
    } catch {
      setStatus({ kind: "error", message: "Network error. Please try again, or email me directly." });
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="relative rounded-[28px] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm sm:p-8"
    >
      <h3 className="font-display text-3xl uppercase tracking-wide">Send a message</h3>
      <p className="mt-1 text-sm text-white/55">I usually reply within a day.</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-xs font-medium uppercase tracking-[0.14em] text-white/55">Name</span>
          <input name="name" required maxLength={100} autoComplete="name" placeholder="Your name" className={field} />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-xs font-medium uppercase tracking-[0.14em] text-white/55">Email</span>
          <input
            name="email"
            type="email"
            required
            maxLength={200}
            autoComplete="email"
            placeholder="you@example.com"
            className={field}
          />
        </label>
      </div>

      <label className="mt-4 block">
        <span className="mb-1.5 block text-xs font-medium uppercase tracking-[0.14em] text-white/55">Subject</span>
        <input name="subject" maxLength={150} placeholder="Job opportunity, project, ..." className={field} />
      </label>

      <label className="mt-4 block">
        <span className="mb-1.5 block text-xs font-medium uppercase tracking-[0.14em] text-white/55">Message</span>
        <textarea
          name="message"
          required
          minLength={10}
          maxLength={5000}
          rows={5}
          placeholder="Tell me a little about it..."
          className={`${field} resize-none`}
        />
      </label>

      {/* honeypot for spam bots — hidden from people */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={status.kind === "sending"}
          className="group inline-flex items-center gap-2 rounded-full bg-accent px-7 py-4 font-medium text-white transition-all duration-300 hover:bg-white hover:text-ink disabled:opacity-60"
        >
          {status.kind === "sending" ? "Sending..." : "Send message"}
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </button>
        {status.message && (
          <p role="status" className={`text-sm ${status.kind === "error" ? "text-red-300" : "text-emerald-300"}`}>
            {status.message}
          </p>
        )}
      </div>
    </form>
  );
}
