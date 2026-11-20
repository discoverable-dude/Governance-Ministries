import Link from "next/link";
import { JsonLd } from "./JsonLd";
import { absoluteUrl } from "@/lib/site";

export function Breadcrumbs({ trail }: { trail: { name: string; href: string }[] }) {
  const all = [{ name: "Home", href: "/" }, ...trail];
  return (
    <>
      <nav aria-label="Breadcrumb" className="wrap pt-8 text-[14px] font-semibold">
        <ol className="flex flex-wrap items-center gap-x-2 text-body">
          {all.map((c, i) => (
            <li key={c.href} className="flex items-center gap-2">
              {i < all.length - 1 ? (
                <>
                  <Link href={c.href} className="py-2">{c.name}</Link>
                  <span aria-hidden="true">/</span>
                </>
              ) : (
                <span aria-current="page">{c.name}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: all.map((c, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: c.name,
            item: absoluteUrl(c.href),
          })),
        }}
      />
    </>
  );
}
