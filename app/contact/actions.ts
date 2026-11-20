"use server";

export type ContactState = { ok: boolean; message: string } | null;

const clean = (v: FormDataEntryValue | null) => (typeof v === "string" ? v.trim().slice(0, 5000) : "");

export async function sendEnquiry(_prev: ContactState, form: FormData): Promise<ContactState> {
  if (clean(form.get("website"))) return { ok: true, message: "Thank you, your message has been sent." }; // honeypot
  const name = clean(form.get("name"));
  const email = clean(form.get("email"));
  const message = clean(form.get("message"));
  const topic = clean(form.get("topic"));
  if (!name || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) || !message) {
    return { ok: false, message: "Please give your name, a valid email address and a message." };
  }
  const key = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!key || !to || !from) {
    return { ok: false, message: "Sorry, the form is unavailable right now. Please email us directly." };
  }
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to,
      reply_to: email,
      subject: `Website enquiry${topic === "book" ? " (free book)" : ""} from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nTopic: ${topic || "general"}\n\n${message}`,
    }),
  });
  if (!res.ok) return { ok: false, message: "Sorry, we could not send your message. Please email us directly." };
  return { ok: true, message: "Thank you, your message has been sent." };
}
