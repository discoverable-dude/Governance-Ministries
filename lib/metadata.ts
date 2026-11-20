import type { Metadata } from "next";
import { absoluteUrl } from "./site";
import type { Seo } from "./types";

export function buildMetadata(opts: { path: string; title: string; description?: string; seo?: Seo; type?: "website" | "article"; publishedTime?: string }): Metadata {
  const title = opts.seo?.metaTitle ?? opts.title;
  const description = opts.seo?.metaDescription ?? opts.description;
  const url = absoluteUrl(opts.path);
  const og = opts.seo?.ogImage;
  return {
    // metaTitle from the CMS is a full title, so bypass the template
    title: opts.seo?.metaTitle ? { absolute: opts.seo.metaTitle } : opts.title,
    description,
    alternates: { canonical: url },
    robots: opts.seo?.noIndex ? { index: false, follow: true } : undefined,
    openGraph: {
      title,
      description,
      url,
      type: opts.type ?? "website",
      publishedTime: opts.publishedTime,
      images: og ? [{ url: og.src, width: og.width, height: og.height, alt: og.alt }] : undefined,
    },
  };
}
