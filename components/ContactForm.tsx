"use client";

import { useActionState } from "react";
import { sendEnquiry, type ContactState } from "@/app/contact/actions";

const field = "min-h-12 w-full rounded border border-[#6f8294] bg-white px-4 py-3 text-[16px] text-ink";

/** The only client component besides none: a plain <form> that also works without JS. */
export function ContactForm({ topic, defaultMessage }: { topic?: string; defaultMessage?: string }) {
  const [state, action, pending] = useActionState<ContactState, FormData>(sendEnquiry, null);
  return (
    <form action={action} className="flex flex-col gap-5">
      <input type="hidden" name="topic" value={topic ?? ""} />
      <div aria-hidden="true" className="absolute -left-[9999px]">
        <label>Website <input type="text" name="website" tabIndex={-1} autoComplete="off" /></label>
      </div>
      <label className="flex flex-col gap-2 font-semibold">
        Name
        <input name="name" required autoComplete="name" className={field} />
      </label>
      <label className="flex flex-col gap-2 font-semibold">
        Email
        <input name="email" type="email" required autoComplete="email" className={field} />
      </label>
      <label className="flex flex-col gap-2 font-semibold">
        Message
        <textarea name="message" required rows={6} defaultValue={defaultMessage} className={field} />
      </label>
      <button type="submit" disabled={pending} className="btn btn-dark self-start disabled:opacity-60">
        {pending ? "Sending…" : "Send message"}
      </button>
      {state && (
        <p role="status" className={`font-semibold ${state.ok ? "text-[#0b6b3a]" : "text-[#a31b2b]"}`}>{state.message}</p>
      )}
    </form>
  );
}
