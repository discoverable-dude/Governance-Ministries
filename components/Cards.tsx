import Link from "next/link";
import { Photo } from "./Media";
import { ACCENT_HEX } from "@/lib/accents";
import type { Division, NewsPost } from "@/lib/types";

export function DivisionCard({ d }: { d: Division }) {
  const accent = ACCENT_HEX[d.accentColour];
  return (
    <article className="card reveal relative flex flex-col overflow-hidden rounded-md bg-mist" style={{ ["--accent" as string]: accent }}>
      <span className="card-bar block h-1.5 md:h-2" style={{ background: accent }} />
      <Photo media={d.heroImage} accent={accent} sizes="(min-width:1024px) 33vw, 100vw" className="hidden h-[180px] w-full md:block lg:h-[220px]" />
      <div className="flex grow flex-col gap-3.5 p-6 lg:p-8">
        <h3 className="text-[22px] font-extrabold text-ink lg:text-[24px]">
          <Link href={`/about/${d.slug}/`} className="text-ink after:absolute after:inset-0 hover:text-brand">
            {d.name}
          </Link>
        </h3>
        <p className="grow font-serif text-[16px] leading-[1.6] text-body line-clamp-3 md:line-clamp-none lg:text-[17px]">{d.summary}</p>
        {d.externalUrl ? (
          <a href={d.externalUrl} className="link-arrow relative z-10 inline-flex min-h-11 items-center self-start text-[15px] font-bold">
            Visit {new URL(d.externalUrl).hostname.replace(/^www\./, "")}
          </a>
        ) : (
          <span className="link-arrow inline-flex min-h-11 items-center text-[15px] font-bold text-brand">About {d.name}</span>
        )}
      </div>
    </article>
  );
}

export function NewsCard({ post, lead = false }: { post: NewsPost; lead?: boolean }) {
  return (
    <article className="reveal relative flex flex-col gap-4">
      <div className="media-zoom overflow-hidden rounded-md">
      <Photo
        media={post.coverImage}
        accent={post.division ? ACCENT_HEX[post.division.accentColour] : "#0e5685"}
        sizes={lead ? "(min-width:1024px) 40vw, 100vw" : "(min-width:1024px) 30vw, 100vw"}
        className={`w-full ${lead ? "h-[200px] lg:h-[300px]" : "h-[200px] lg:h-[220px]"}`}
      />
      </div>
      {post.division && (
        <p className="flex items-center gap-2.5 text-[14px] font-bold text-body">
          <span aria-hidden="true" className="block h-3 w-3" style={{ background: ACCENT_HEX[post.division.accentColour] }} />
          {post.division.name}
        </p>
      )}
      <h3 className={`font-serif font-medium leading-[1.25] text-ink ${lead ? "text-[24px] lg:text-[28px]" : "text-[22px]"}`}>
        <Link href={`/news/${post.slug}/`} className="text-ink after:absolute after:inset-0 hover:text-brand">
          {post.title}
        </Link>
      </h3>
      {!lead && <p className="font-serif text-[16px] leading-relaxed text-body">{post.excerpt}</p>}
    </article>
  );
}
