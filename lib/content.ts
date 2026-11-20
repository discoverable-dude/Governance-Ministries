import { cache } from "react";
import { createClient } from "next-sanity";
import * as seed from "./seed";
import * as q from "./queries";
import type { Division, NewsPost, Page, SiteSettings } from "./types";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const client = projectId
  ? createClient({
      projectId,
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "governance",
      apiVersion: "2025-01-01",
      useCdn: false,
    })
  : null;

/** Fetch from Sanity, tagged so the webhook can revalidate. Returns undefined when Sanity is not configured. */
async function fetchSanity<T>(query: string, params: Record<string, unknown> = {}): Promise<T | null | undefined> {
  if (!client) return undefined;
  return client.fetch<T>(query, params, { next: { tags: ["sanity"] } });
}

export const getSettings = cache(async (): Promise<SiteSettings> => {
  const r = await fetchSanity<SiteSettings>(q.SETTINGS_QUERY);
  return r ?? seed.settings;
});

export const getDivisions = cache(async (): Promise<Division[]> => {
  const r = await fetchSanity<Division[]>(q.DIVISIONS_QUERY);
  return r === undefined ? seed.divisions : (r ?? []);
});

export async function getDivision(slug: string): Promise<Division | undefined> {
  return (await getDivisions()).find((d) => d.slug === slug);
}

export const getNews = cache(async (): Promise<NewsPost[]> => {
  const r = await fetchSanity<NewsPost[]>(q.NEWS_LIST_QUERY);
  return r === undefined ? [...seed.news].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt)) : (r ?? []);
});

export async function getNewsPost(slug: string): Promise<NewsPost | undefined> {
  return (await getNews()).find((n) => n.slug === slug);
}

export const getPage = cache(async (slug: string): Promise<Page | undefined> => {
  const r = await fetchSanity<Page>(q.PAGE_QUERY, { slug });
  if (r === undefined) return seed.pages.find((pg) => pg.slug === slug);
  return r ?? undefined;
});
