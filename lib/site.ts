export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.governanceministries.org").replace(/\/$/, "");
export const CHARITY_NUMBER = "1051780";

/** Absolute, www, trailing-slash URL for a path. */
export function absoluteUrl(path: string): string {
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${p.endsWith("/") ? p : `${p}/`}`;
}
