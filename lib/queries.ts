const img = (f: string) =>
  `${f}{ "src": asset->url, "alt": coalesce(alt, ""), "width": asset->metadata.dimensions.width, "height": asset->metadata.dimensions.height }`;

const seo = `seo{ metaTitle, metaDescription, noIndex, ${img("ogImage")} }`;
const divRef = `{ name, "slug": slug.current, accentColour }`;

export const SETTINGS_QUERY = `*[_type=="siteSettings"][0]{ siteName, nav, headerCta, footerNav, contact, charityNumber, socialLinks }`;

export const DIVISIONS_QUERY = `*[_type=="division"] | order(order asc){
  name, "slug": slug.current, summary, body, externalUrl, accentColour, order, ${img("heroImage")}
}`;

export const NEWS_FIELDS = `title, "slug": slug.current, publishedAt, excerpt, ${img("coverImage")},
  "division": division->${divRef}, body, ${seo}`;
export const NEWS_LIST_QUERY = `*[_type=="newsPost"] | order(publishedAt desc){ ${NEWS_FIELDS} }`;

export const PAGE_QUERY = `*[_type=="page" && slug.current==$slug][0]{
  title, "slug": slug.current, ${seo},
  sections[]{ ..., ${img("image")}, "logos": logos[]{ name, url, ${img("image")} } }
}`;
