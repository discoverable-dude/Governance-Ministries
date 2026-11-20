# Governance Ministries

Next.js (App Router, Server Components, static + ISR), Tailwind v4, Sanity. Part of the VSC UK / Governance Ministries rebuild: see the build brief.

## Run
```bash
pnpm install
pnpm dev          # works with no env: renders lib/seed.ts content
pnpm build && pnpm start
```

## Content
- No `NEXT_PUBLIC_SANITY_PROJECT_ID`: content comes from `lib/seed.ts`.
- With it set: content comes from Sanity (dataset `governance`), schemas in `studio/schemaTypes`. Add a Sanity webhook to `POST /api/revalidate` with `SANITY_REVALIDATE_SECRET` (tag-based ISR).

## Rules baked in
- `trailingSlash: true`, www canonical, self-referencing canonicals, `lang="en-GB"`.
- Redirects live in `redirects.json` and feed `next.config.ts`.
- No client JS except the contact form: mobile menu is a `<details>`, dropdown is CSS.
- JSON-LD: Organization (UKTrust + charity no. 1051780), BreadcrumbList, NewsArticle.

See `CONTENT-TODO.md` for outstanding content and decisions.
