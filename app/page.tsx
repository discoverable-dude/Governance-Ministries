import { notFound } from "next/navigation";
import { Sections } from "@/components/Sections";
import { getPage } from "@/lib/content";
import { buildMetadata } from "@/lib/metadata";

export async function generateMetadata() {
  const page = await getPage("home");
  return buildMetadata({ path: "/", title: "Governance Ministries", seo: page?.seo });
}

export default async function Home() {
  const page = await getPage("home");
  if (!page) notFound();
  return <Sections sections={page.sections} />;
}
