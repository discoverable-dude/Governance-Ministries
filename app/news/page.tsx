import { Breadcrumbs } from "@/components/Breadcrumbs";
import { NewsCard } from "@/components/Cards";
import { getNews } from "@/lib/content";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  path: "/news/",
  title: "News",
  description: "News and updates from Governance Ministries and its divisions.",
});

export default async function NewsIndex() {
  const posts = await getNews();
  return (
    <>
      <Breadcrumbs trail={[{ name: "News", href: "/news/" }]} />
      <div className="wrap pb-16 pt-8 md:pb-[120px]">
        <h1 className="h-display mb-10 text-[40px] text-ink md:text-[56px]">News</h1>
        {posts.length === 0 ? (
          <p className="font-serif text-[18px] text-body">No news yet. Please check back soon.</p>
        ) : (
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => <NewsCard key={post.slug} post={post} />)}
          </div>
        )}
      </div>
    </>
  );
}
