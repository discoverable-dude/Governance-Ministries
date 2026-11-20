import type { MetadataRoute } from "next";
import { getDivisions, getNews } from "@/lib/content";
import { absoluteUrl } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [divisions, news] = await Promise.all([getDivisions(), getNews()]);
  return [
    { url: absoluteUrl("/") },
    { url: absoluteUrl("/about/") },
    ...divisions.map((d) => ({ url: absoluteUrl(`/about/${d.slug}/`) })),
    { url: absoluteUrl("/news/") },
    ...news.map((n) => ({ url: absoluteUrl(`/news/${n.slug}/`), lastModified: n.publishedAt })),
    { url: absoluteUrl("/contact/") },
  ];
}
