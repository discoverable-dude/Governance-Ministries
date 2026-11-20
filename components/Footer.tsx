import Link from "next/link";
import { Logo, RainbowBar } from "./Logo";
import { getDivisions, getSettings } from "@/lib/content";

const col = "text-[15px] text-[#c4d3de] hover:text-white flex min-h-11 items-center break-inside-avoid";

export async function Footer() {
  const [settings, divisions] = await Promise.all([getSettings(), getDivisions()]);
  const c = settings.contact;
  return (
    <footer className="on-dark bg-navy-deep">
      <RainbowBar className="h-1.5" />
      <div className="wrap grid gap-10 py-14 lg:grid-cols-[1fr_1.3fr_1fr] lg:gap-12 lg:py-16">
        <div className="flex flex-col gap-5">
          <Logo small />
          <p className="text-[14px] leading-relaxed text-[#a9bccb]">Registered charity no. {settings.charityNumber}</p>
        </div>
        <nav aria-label="Our work">
          <p className="mb-2 text-[15px] font-bold text-white">Our work</p>
          <div className="flex flex-col sm:block sm:columns-2 sm:gap-10">
          {divisions.map((d) => (
            <Link key={d.slug} href={`/about/${d.slug}/`} className={col}>{d.name}</Link>
          ))}
          {settings.footerNav.map((l) => (
            <a key={l.href} href={l.href} className={col}>{l.label}</a>
          ))}
          </div>
        </nav>
        <div className="flex flex-col">
          <p className="mb-2 text-[15px] font-bold text-white">Contact</p>
          <p className="mb-1 text-[15px] leading-relaxed text-[#c4d3de]">{c.address}</p>
          <a href={`tel:${c.phone.replace(/[^+\d]/g, "")}`} className={col}>{c.phone}</a>
          <a href={`mailto:${c.email}`} className={col}>{c.email}</a>
        </div>
      </div>
    </footer>
  );
}
