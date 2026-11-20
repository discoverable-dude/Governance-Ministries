import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ContactForm } from "@/components/ContactForm";
import { getSettings } from "@/lib/content";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  path: "/contact/",
  title: "Contact",
  description: "Contact Governance Ministries: address, telephone and email, or send us a message.",
});

export default async function Contact({ searchParams }: { searchParams: Promise<{ topic?: string }> }) {
  const { topic } = await searchParams;
  const s = await getSettings();
  const book = topic === "book";
  return (
    <>
      <Breadcrumbs trail={[{ name: "Contact", href: "/contact/" }]} />
      <div className="wrap grid gap-12 pb-16 pt-8 md:pb-[120px] lg:grid-cols-2 lg:gap-20">
        <div className="flex flex-col gap-6">
          <h1 className="h-display text-[40px] text-ink md:text-[56px]">Contact</h1>
          <address className="flex flex-col gap-2 font-serif text-[18px] not-italic leading-[1.7] text-body">
            <span>{s.contact.address}</span>
            <a href={`tel:${s.contact.phone.replace(/[^+\d]/g, "")}`} className="py-1 font-semibold">{s.contact.phone}</a>
            <a href={`mailto:${s.contact.email}`} className="py-1 font-semibold">{s.contact.email}</a>
          </address>
          <p className="text-[14px] text-body">Registered charity no. {s.charityNumber}</p>
        </div>
        <div>
          <h2 className="mb-6 text-[24px] font-extrabold text-ink">{book ? "Request your free copy" : "Send us a message"}</h2>
          <ContactForm
            topic={book ? "book" : undefined}
            defaultMessage={book ? "I would like a free copy of The Glory Returns to the Workplace." : undefined}
          />
        </div>
      </div>
    </>
  );
}
