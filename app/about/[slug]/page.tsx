import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Sections } from "@/components/Sections";
import { Prose, firstParagraph } from "@/components/Prose";
import { Photo } from "@/components/Media";
import { RainbowBar } from "@/components/Logo";
import { ACCENT_HEX } from "@/lib/accents";
import { getDivision, getDivisions } from "@/lib/content";
import { buildMetadata } from "@/lib/metadata";

export async function generateStaticParams() {
  return (await getDivisions()).map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const d = await getDivision(slug);
  if (!d) return {};
  return buildMetadata({ path: `/about/${slug}/`, title: d.name, description: d.summary || firstParagraph(d.body) });
}

export default async function DivisionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [d, all] = await Promise.all([getDivision(slug), getDivisions()]);
  if (!d) notFound();
  return (
    <>
      <Breadcrumbs trail={[{ name: "About", href: "/about/" }, { name: d.name, href: `/about/${d.slug}/` }]} />
      <div className="wrap grid gap-12 pb-16 pt-4 md:pb-[96px] lg:grid-cols-[1fr_280px] lg:gap-20">
        <article className="flex flex-col gap-6">
          <span aria-hidden="true" className="reveal-bar block h-2 w-20" style={{ background: ACCENT_HEX[d.accentColour] }} />
          <h1 className="h-display text-[40px] text-ink md:text-[56px]">{d.name}</h1>
          <RainbowBar animate className="h-1 w-32" />
          {d.heroImage && <Photo media={d.heroImage} priority sizes="(min-width:1024px) 800px, 100vw" className="h-auto w-full rounded-md" />}
          <p className="max-w-[720px] font-serif text-[20px] leading-[1.6] text-ink md:text-[22px]">{d.summary}</p>
          <div className="max-w-[720px]"><Prose body={d.body.slice(d.body.length > 1 ? 0 : 1)} /></div>
          {d.externalUrl && (
            <a href={d.externalUrl} className="btn btn-dark self-start">
              Visit {new URL(d.externalUrl).hostname.replace(/^www\./, "")}
            </a>
          )}
        </article>
        <nav aria-label="Our work" className="border-t border-rule pt-8 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
          <p className="mb-3 text-[15px] font-bold text-ink">Our work</p>
          <ul className="flex flex-col">
            {all.map((x) => (
              <li key={x.slug}>
                {x.slug === d.slug ? (
                  <span aria-current="page" className="flex min-h-11 items-center font-bold text-ink">{x.name}</span>
                ) : (
                  <Link href={`/about/${x.slug}/`} className="flex min-h-11 items-center font-semibold">{x.name}</Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <Sections sections={[{ _type: "ctaBand", _key: "cta", heading: "Want to know more?", body: "We would be glad to hear from you.", cta: { label: "Contact us", href: "/contact/" } }]} />
    </>
  );
}
