export type Block = { _type: string; _key: string; [k: string]: unknown };
export type Media = { src: string; alt: string; width: number; height: number };
export type Link = { label: string; href: string };
export type Accent = "orange" | "red" | "burgundy" | "blue" | "cyan" | "aqua";

export type Seo = {
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: Media;
  noIndex?: boolean;
};

export type DivisionRef = { name: string; slug: string; accentColour: Accent };

export type Division = DivisionRef & {
  summary: string;
  body: Block[];
  externalUrl?: string;
  heroImage?: Media;
  order: number;
};

export type NewsPost = {
  title: string;
  slug: string;
  publishedAt: string;
  excerpt: string;
  coverImage?: Media;
  division?: DivisionRef;
  body: Block[];
  seo?: Seo;
};

export type SiteSettings = {
  siteName: string;
  nav: Link[];
  headerCta: Link;
  footerNav: Link[];
  contact: { address: string; phone: string; email: string };
  charityNumber: string;
  socialLinks: Link[];
};

type Keyed = { _key: string };

export type Section = Keyed &
  (
    | {
        _type: "hero";
        heading: string;
        intro?: string;
        image?: Media;
        compact?: boolean;
        primaryCta?: Link;
        secondaryCta?: Link;
      }
    | { _type: "statRow"; items: { value: string; label: string }[] }
    | {
        _type: "cardGrid";
        heading?: string;
        fromDivisions?: boolean;
        columns?: 2 | 3;
        cards?: { title: string; body: string; accent?: Accent; link?: Link }[];
      }
    | {
        _type: "splitFeature";
        heading: string;
        eyebrow?: string;
        body: string;
        quote?: { text: string; attribution: string };
        image?: Media;
        cta?: Link;
      }
    | { _type: "timeline"; heading?: string; items: { year: string; title: string; body: string }[] }
    | { _type: "richText"; heading?: string; body: Block[]; link?: Link; ruled?: boolean }
    | { _type: "ctaBand"; heading: string; body?: string; cta: Link }
    | { _type: "newsTeaser"; heading: string; link?: Link; limit?: number }
    | { _type: "logoRow"; heading?: string; logos: { name: string; image?: Media; url?: string }[] }
  );

export type Page = {
  title: string;
  slug: string;
  sections: Section[];
  seo?: Seo;
};
