import Link from "next/link";
import { Photo } from "./Media";
import { Prose } from "./Prose";
import { RainbowBar } from "./Logo";
import { DivisionCard, NewsCard } from "./Cards";
import { ACCENT_HEX } from "@/lib/accents";
import { getDivisions, getNews } from "@/lib/content";
import type { Section } from "@/lib/types";

const H2 = ({ children }: { children: React.ReactNode }) => (
  <h2 className="reveal h-display text-[32px] text-ink md:text-[48px] md:leading-[1.1]">{children}</h2>
);
const pad = "pt-14 md:pt-[120px]";

async function Render({ s, first }: { s: Section; first: boolean }) {
  switch (s._type) {
    case "hero": {
      const H = first ? "h1" : "h2";
      return (
        <section className="on-dark bg-navy">
          <div className={`grid ${s.compact ? "" : "lg:grid-cols-[1fr_560px]"}`}>
            <div className={`wrap flex w-full flex-col gap-6 pb-12 pt-10 lg:gap-8 ${s.compact ? "lg:py-20" : "lg:pb-20 lg:pt-24"} ${s.compact ? "" : "lg:!mx-0 lg:!max-w-none lg:!pl-[max(120px,calc((100vw-1440px)/2+120px))] lg:!pr-16"}`}>
              <H className={`hero-title h-display text-white ${s.compact ? "text-[40px] md:text-[56px]" : "text-[42px] md:text-[60px] lg:text-[76px] lg:leading-[1.04] lg:tracking-[-0.015em]"}`}>{s.heading}</H>
              <RainbowBar animate className={s.compact ? "h-1.5 w-[180px]" : "h-1.5 w-[180px] lg:h-2 lg:w-[264px]"} />
              {s.intro && <p className="hero-fade max-w-[600px] text-[16px] leading-[1.65] text-[#d3dee8] lg:text-[19px]">{s.intro}</p>}
              {(s.primaryCta || s.secondaryCta) && (
                <div className="hero-fade flex flex-col gap-4 sm:flex-row">
                  {s.primaryCta && <Link href={s.primaryCta.href} className="btn btn-light">{s.primaryCta.label}</Link>}
                  {s.secondaryCta && <Link href={s.secondaryCta.href} className="btn btn-ghost hidden sm:inline-flex">{s.secondaryCta.label}</Link>}
                </div>
              )}
            </div>
            {!s.compact && (
              <div className="hero-photo relative h-[230px] overflow-hidden md:h-[380px] lg:h-[620px]">
                {s.image ? (
                  <Photo media={s.image} priority sizes="(min-width:1024px) 560px, 100vw" className="h-full w-full" />
                ) : (
                  <div aria-hidden="true" className="flex h-full w-full bg-[#0f3a5c]">
                    {["#ff8f24", "#f34957", "#94153e", "#1b6ea8", "#2db9e6", "#6dd1db"].map((c, i) => (
                      <span key={c} className="grow opacity-90" style={{ background: c, flexGrow: [15, 20, 18, 12, 18, 17][i] }} />
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </section>
      );
    }

    case "statRow":
      return (
        <section className={pad}>
          <dl className="wrap grid gap-8 sm:grid-cols-3">
            {s.items.map((i) => (
              <div key={i.label}>
                <dt className="text-[15px] font-semibold text-body">{i.label}</dt>
                <dd className="h-display text-[48px] text-ink">{i.value}</dd>
              </div>
            ))}
          </dl>
        </section>
      );

    case "cardGrid": {
      const divisions = s.fromDivisions ? await getDivisions() : [];
      const cols = s.columns === 2 ? "lg:grid-cols-2" : "lg:grid-cols-3";
      return (
        <section className={`wrap flex flex-col gap-8 lg:gap-12 ${pad} ${!s.fromDivisions && s.columns === 2 ? "lg:grid lg:grid-cols-[440px_1fr] lg:gap-24" : ""}`}>
          {s.heading && <H2>{s.heading}</H2>}
          {s.fromDivisions ? (
            <div className={`grid gap-6 md:grid-cols-2 lg:gap-8 ${cols}`}>
              {divisions.map((d) => <DivisionCard key={d.slug} d={d} />)}
            </div>
          ) : (
            <div className={`grid gap-8 lg:gap-12 ${cols}`}>
              {s.cards?.map((c) => (
                <div key={c.title} className="reveal flex flex-col gap-3 lg:gap-4">
                  {c.accent && <span aria-hidden="true" className="reveal-bar block h-1.5 w-12" style={{ background: ACCENT_HEX[c.accent] }} />}
                  <h3 className="text-[19px] font-bold leading-[1.3] text-ink lg:text-[22px]">{c.title}</h3>
                  <p className="font-serif text-[17px] leading-[1.7] text-body lg:text-[18px]">{c.body}</p>
                  {c.link && <Link href={c.link.href} className="font-bold">{c.link.label}</Link>}
                </div>
              ))}
            </div>
          )}
        </section>
      );
    }

    case "splitFeature":
      return (
        <section className={`mt-14 bg-mist md:mt-[120px]`}>
          <div className="mx-auto grid max-w-[1440px] md:grid-cols-2 lg:grid-cols-[620px_1fr]">
            <div className="book-photo overflow-hidden"><Photo media={s.image} sizes="(min-width:1024px) 620px, 100vw" tint="#c9d7e0" className="h-[240px] w-full object-[30%_50%] md:h-full md:min-h-[460px] lg:h-[600px]" /></div>
            <div className="reveal flex flex-col justify-center gap-5 px-5 py-8 md:px-12 md:py-14 lg:gap-[22px] lg:py-20 lg:pl-20 lg:pr-[120px]">
              <h2 className="h-display text-[32px] text-ink md:text-[48px] md:leading-[1.08]">{s.heading}</h2>
              {s.eyebrow && <p className="text-[15px] font-semibold text-burgundy lg:text-[16px]">{s.eyebrow}</p>}
              <p className="font-serif text-[17px] leading-[1.7] text-body lg:text-[18px]">{s.body}</p>
              {s.quote && (
                <figure className="quote-mark flex flex-col gap-2">
                  <blockquote className="font-serif text-[20px] leading-[1.5] text-ink lg:text-[22px]">&ldquo;{s.quote.text}&rdquo;</blockquote>
                  <figcaption className="text-[14px] font-semibold text-body">{s.quote.attribution}</figcaption>
                </figure>
              )}
              {s.cta && <Link href={s.cta.href} className="btn btn-dark self-start">{s.cta.label}</Link>}
            </div>
          </div>
        </section>
      );

    case "timeline":
      return (
        <section className={`wrap flex flex-col gap-8 ${pad}`}>
          {s.heading && <H2>{s.heading}</H2>}
          <ol className="flex flex-col gap-6 border-l-2 border-rule pl-6">
            {s.items.map((i) => (
              <li key={i.year + i.title}>
                <p className="text-[14px] font-bold text-burgundy">{i.year}</p>
                <h3 className="text-[20px] font-bold text-ink">{i.title}</h3>
                <p className="font-serif text-[17px] leading-[1.7] text-body">{i.body}</p>
              </li>
            ))}
          </ol>
        </section>
      );

    case "richText":
      return (
        <section className={`wrap ${pad}`}>
          <div className={s.ruled ? "grid gap-6 border-t border-rule pt-12 lg:grid-cols-2 lg:gap-20 lg:pt-14" : "grid gap-6 lg:grid-cols-[440px_1fr] lg:gap-24"}>
            {s.heading && (
              <h2 className={`h-display text-ink ${s.ruled ? "text-[28px] leading-[1.2] md:text-[34px]" : "text-[32px] md:text-[44px] md:leading-[1.1]"}`}>{s.heading}</h2>
            )}
            <div className="flex flex-col gap-4">
              <Prose body={s.body} />
              {s.link && <Link href={s.link.href} className="link-arrow inline-flex min-h-11 items-center font-bold">{s.link.label}</Link>}
            </div>
          </div>
        </section>
      );

    case "ctaBand":
      return (
        <section className="on-dark mt-14 bg-navy md:mt-[120px]">
          <div className="wrap flex flex-col items-start gap-5 py-12 lg:flex-row lg:items-center lg:justify-between lg:py-16">
            <div className="flex flex-col gap-2">
              <h2 className="h-display text-[30px] text-white md:text-[40px]">{s.heading}</h2>
              {s.body && <p className="text-[17px] text-[#d3dee8]">{s.body}</p>}
            </div>
            <Link href={s.cta.href} className="btn btn-light">{s.cta.label}</Link>
          </div>
        </section>
      );

    case "newsTeaser": {
      const posts = (await getNews()).slice(0, s.limit ?? 3);
      if (!posts.length) return null;
      return (
        <section className={`wrap flex flex-col gap-8 lg:gap-10 ${pad}`}>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <H2>{s.heading}</H2>
            {s.link && <Link href={s.link.href} className="link-arrow hidden min-h-11 items-center text-[16px] font-bold md:inline-flex">{s.link.label}</Link>}
          </div>
          <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr_1fr]">
            {posts.map((post, i) => <NewsCard key={post.slug} post={post} lead={i === 0} />)}
          </div>
          {s.link && <Link href={s.link.href} className="link-arrow inline-flex min-h-11 items-center text-[16px] font-bold md:hidden">{s.link.label}</Link>}
        </section>
      );
    }

    case "logoRow":
      return (
        <section className={`wrap flex flex-col gap-8 ${pad}`}>
          {s.heading && <H2>{s.heading}</H2>}
          <ul className="flex flex-wrap items-center gap-10">
            {s.logos.map((l) => (
              <li key={l.name}>
                {l.image ? <Photo media={l.image} sizes="160px" className="h-12 w-auto" /> : <span className="font-bold">{l.name}</span>}
              </li>
            ))}
          </ul>
        </section>
      );
  }
}

export function Sections({ sections }: { sections: Section[] }) {
  return (
    <>
      {sections.map((s, i) => (
        <Render key={s._key} s={s} first={i === 0} />
      ))}
    </>
  );
}
