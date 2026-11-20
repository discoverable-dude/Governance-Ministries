import { notFound } from "next/navigation";
import { Sections } from "@/components/Sections";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { getPage } from "@/lib/content";
import { buildMetadata } from "@/lib/metadata";

export async function generateMetadata() {
  const page = await getPage("about");
  return buildMetadata({ path: "/about/", title: "About", seo: page?.seo });
}

export default async function About() {
  const page = await getPage("about");
  if (!page) notFound();
  return (
    <>
      <div className="bg-navy"><Breadcrumbs dark trail={[{ name: "About", href: "/about/" }]} /></div>
      <Sections sections={page.sections} />
    </>
  );
}
