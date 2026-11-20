# Content and decisions outstanding

Copy marked `// confirm` in `lib/seed.ts` is placeholder wording awaiting the real text.

## Copy needed
- **TBN Europe, Living Seeds, OnePalm Outreach**: summaries and page bodies. The live pages could not be reached from the build environment; migrate the existing text from the live site.
- **Life Campus** (`/about/life-campus/`): this is a **new URL** (not in the live inventory). Confirm, or point the nav item at `/about/` instead.
- **News post**: the Enterprise Centre post is built only from facts in the design. Needs real body text, date and photo. Its slug is new.
- **Free book CTA**: currently goes to `/contact/?topic=book` (form prefilled). Replace with the real fulfilment link if there is one.

## Photography
Hero, book, TBN UK and Life Campus images come from the design concept (`public/images/`). Still tinted blocks: Workplace Church, TBN Europe, Living Seeds and OnePalm cards, and the news cover. Client to supply archive photography; replace the concept images with finals when available.

## Decisions
- `/feed/` redirects to `/news/` (per `redirects.json`). Change to a real RSS route if the client wants a feed.
- Contact form needs `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` (or swap the provider in `app/contact/actions.ts`).
- Copy the WordPress `uploads` directory verbatim into `public/content/uploads/` (served with immutable cache headers).

## Redirect file change
`redirects.json`: `/wp-sitemap-:path*` became `/wp-sitemap-:path`. Next.js rejects `:path*` directly after a hyphen; WP child sitemaps are single segments so behaviour is identical.
