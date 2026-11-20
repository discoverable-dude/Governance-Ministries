import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { Prose, firstParagraph } from "@/components/Prose";
import { Photo } from "@/components/Media";
import { getNews, getNewsPost } from "@/lib/content";
import { buildMetadata } from "@/lib/metadata";
import { absoluteUrl } from "@/lib/site";

export async function generateStaticParams() {
  return (await getNews()).map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getNewsPost(slug);
  if (!post) return {};
  return buildMetadata({
    path: `/news/${slug}/`,
    title: post.title,
    description: post.excerpt || firstParagraph(post.body),
    seo: post.seo,
    type: "article",
    publishedTime: post.publishedAt,
  });
}

export default async function NewsArticle({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getNewsPost(slug);
  if (!post) notFound();
  const date = new Date(post.publishedAt);
  return (
    <>
      <Breadcrumbs trail={[{ name: "News", href: "/news/" }, { name: post.title, href: `/news/${post.slug}/` }]} />
      <article className="wrap pb-16 pt-8 md:pb-[120px]">
        <div className="flex max-w-[760px] flex-col gap-6">
          <h1 className="h-display text-[36px] text-ink md:text-[52px]">{post.title}</h1>
          <p className="text-[14px] font-semibold text-body">
            <time dateTime={post.publishedAt}>
              {date.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
            </time>
            {post.division && <> &middot; {post.division.name}</>}
          </p>
          {post.coverImage && <Photo media={post.coverImage} priority sizes="760px" className="h-auto w-full rounded-md" />}
          <Prose body={post.body} />
        </div>
      </article>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "NewsArticle",
          headline: post.title,
          datePublished: post.publishedAt,
          description: post.excerpt,
          image: post.coverImage ? [post.coverImage.src] : undefined,
          mainEntityOfPage: absoluteUrl(`/news/${post.slug}/`),
          publisher: { "@type": "Organization", name: "Governance Ministries", url: absoluteUrl("/") },
        }}
      />
    </>
  );
}
