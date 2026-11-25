import nodemailer from "nodemailer";

// Sends contact-form messages to your inbox via Gmail.
// Needs these in .env.local (and in your hosting provider's env settings):
//   GMAIL_USER=hari273om@gmail.com
//   GMAIL_APP_PASSWORD=xxxx xxxx xxxx xxxx   (Google Account → Security → App passwords)
//   CONTACT_TO=hari273om@gmail.com           (optional, defaults to GMAIL_USER)

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const oneLine = (v: unknown, max: number) => String(v ?? "").replace(/[\r\n]+/g, " ").trim().slice(0, max);

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: real people never fill this hidden field.
  if (body.website) return Response.json({ ok: true });

  const name = oneLine(body.name, 100);
  const email = oneLine(body.email, 200);
  const subject = oneLine(body.subject, 150);
  const message = String(body.message ?? "").trim().slice(0, 5000);

  if (!name || !EMAIL_RE.test(email) || message.length < 10) {
    return Response.json(
      { error: "Please fill in your name, a valid email and a message (at least 10 characters)." },
      { status: 400 },
    );
  }

  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  if (!user || !pass) {
    return Response.json({ error: "not-configured" }, { status: 503 });
  }

  try {
    const transporter = nodemailer.createTransport({ service: "gmail", auth: { user, pass } });
    await transporter.sendMail({
      from: { name: "Portfolio contact form", address: user },
      to: process.env.CONTACT_TO || user,
      replyTo: { name, address: email },
      subject: `Portfolio: ${subject || "New message"} — ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject || "-"}\n\n${message}`,
    });
    return Response.json({ ok: true });
  } catch (err) {
    console.error("Contact form email failed:", err);
    return Response.json({ error: "Could not send your message right now. Please email me directly." }, { status: 500 });
  }
}
