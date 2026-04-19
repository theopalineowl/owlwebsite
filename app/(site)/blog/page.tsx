import Image from "next/image";
import { formatDate } from "@/lib/sanity/format";
import { Section } from "@/components/layout/Section";
import { Card } from "@/components/ui/Card";
import { FadeInSection } from "@/components/ui/FadeInSection";
import { SectionTwinkles } from "@/components/ui/SectionTwinkles";
import { STATIC_BLOG_POSTS } from "@/lib/blog/static-posts";
import { listTeaseFromBody } from "@/lib/blog/post-tease";

const intro =
  "An exploration of ideas, rituals, tools, and daily practices.";

type ListPost = {
  _id: string;
  title: string;
  slug: string;
  publishedAt: string;
  tease?: string;
  coverImage?: unknown;
  localCoverSrc?: string;
};

export default async function BlogListPage() {
  const { fetchSanityBlogPosts, urlFor } = await import(
    "@/lib/blog/fetch-sanity-posts"
  );

  const rows = await fetchSanityBlogPosts();
  const sanityPosts: ListPost[] = rows.map((p) => ({
    _id: p._id,
    title: p.title,
    slug: p.slug,
    publishedAt: p.publishedAt,
    coverImage: p.coverImage,
    tease: listTeaseFromBody(undefined, p.body, p.excerpt),
  }));

  const staticRows: ListPost[] = STATIC_BLOG_POSTS.map((p) => ({
    _id: p._id,
    title: p.title,
    slug: p.slug,
    publishedAt: p.publishedAt,
    tease: listTeaseFromBody(p.bodyPlaceholder, undefined),
    localCoverSrc: p.coverSrc,
  }));

  const sanitySlugs = new Set(sanityPosts.map((p) => p.slug));
  const staticOnly = staticRows.filter((p) => !sanitySlugs.has(p.slug));

  const posts = [...staticOnly, ...sanityPosts].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  return (
    <Section className="relative">
      <SectionTwinkles />
      <div className="max-w-5xl mx-auto w-full px-4 sm:px-8 lg:px-10">
        <FadeInSection delay={0}>
          <div className="relative mb-10 md:mb-12">
            <div
              className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[min(18rem,80vw)] w-[min(42rem,100%)] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(126,58,237,0.18)_0%,transparent_68%)] opacity-90"
              aria-hidden
            />
            <h1
              className="relative font-[var(--font-display)] text-3xl sm:text-4xl md:text-5xl font-semibold text-[var(--text-primary)] text-center text-balance leading-tight"
              style={{ textShadow: "0 0 28px rgba(126, 58, 237, 0.28)" }}
            >
              Blog
            </h1>
          </div>
        </FadeInSection>

        <div
          className="border-t border-white/10 mb-10 md:mb-12 max-w-3xl mx-auto"
          aria-hidden
        />

        <FadeInSection delay={80}>
          <div className="max-w-3xl lg:max-w-4xl mx-auto">
            <p className="text-[var(--text-muted)] leading-relaxed mb-2">
              {intro}
            </p>
            <p className="mb-10 md:mb-12">
              <a
                href="https://themindfullibrarian.org"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--accent-gold)] hover:underline"
              >
                Prior blog content at themindfullibrarian.org →
              </a>
            </p>
          </div>
        </FadeInSection>

        <div className="max-w-3xl lg:max-w-4xl mx-auto space-y-6 md:space-y-8">
          {posts.length === 0 ? (
            <p className="text-[var(--text-muted)]">No posts yet.</p>
          ) : (
            posts.map((post, i) =>
              post.localCoverSrc ? (
                <FadeInSection key={post._id} delay={100 + i * 50}>
                  <Card
                    href={`/blog/${post.slug}`}
                    variant="dark"
                    className="flex flex-row items-start gap-4 sm:gap-5 md:gap-6 p-4 sm:p-5 md:p-6"
                  >
                    <div className="relative shrink-0 w-[5.25rem] sm:w-24 md:w-28 aspect-[4/3] rounded-lg overflow-hidden bg-white/10">
                      <Image
                        src={post.localCoverSrc}
                        alt={post.title}
                        fill
                        className="object-contain object-center"
                        sizes="(max-width: 640px) 84px, (max-width: 1024px) 96px, 112px"
                        priority={post.slug === "the-fig-tree"}
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h2 className="font-[var(--font-display)] text-lg sm:text-xl font-semibold text-[var(--text-primary)] mb-2 text-pretty leading-snug">
                        {post.title}
                      </h2>
                      <p className="text-sm text-[var(--text-muted)] mb-3">
                        {formatDate(post.publishedAt)}
                      </p>
                      {post.tease && (
                        <p className="text-[var(--text-muted)] text-sm leading-relaxed">
                          {post.tease}
                        </p>
                      )}
                    </div>
                  </Card>
                </FadeInSection>
              ) : (
                <FadeInSection key={post._id} delay={100 + i * 50}>
                  <Card
                    href={`/blog/${post.slug}`}
                    variant="dark"
                    className="block p-5 sm:p-6"
                  >
                    <div className="flex flex-col md:flex-row gap-6">
                      {post.coverImage != null ? (
                        <div className="relative w-full md:w-48 h-40 md:h-32 shrink-0 rounded-lg overflow-hidden border border-white/10">
                          <Image
                            src={urlFor(post.coverImage)
                              .width(400)
                              .height(260)
                              .url()}
                            alt={post.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 192px"
                          />
                        </div>
                      ) : null}
                      <div className="min-w-0 flex-1">
                        <h2 className="font-[var(--font-display)] text-xl font-semibold text-[var(--text-primary)] mb-2">
                          {post.title}
                        </h2>
                        <p className="text-sm text-[var(--text-muted)] mb-2">
                          {formatDate(post.publishedAt)}
                        </p>
                        {post.tease && (
                          <p className="text-[var(--text-muted)] text-sm leading-relaxed line-clamp-2">
                            {post.tease}
                          </p>
                        )}
                      </div>
                    </div>
                  </Card>
                </FadeInSection>
              )
            )
          )}
        </div>
      </div>
    </Section>
  );
}
