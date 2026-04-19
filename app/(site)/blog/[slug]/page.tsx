import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatDate } from "@/lib/sanity/format";
import { PortableText } from "@/components/blocks/PortableText";
import { Section } from "@/components/layout/Section";
import { FadeInSection } from "@/components/ui/FadeInSection";
import { SectionTwinkles } from "@/components/ui/SectionTwinkles";
import {
  STATIC_BLOG_POSTS,
  getStaticPostBySlug,
} from "@/lib/blog/static-posts";

export function generateStaticParams() {
  return STATIC_BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const staticPost = getStaticPostBySlug(slug);
  if (staticPost) {
    return (
      <Section className="relative">
        <SectionTwinkles />
        <div className="max-w-5xl mx-auto w-full px-4 sm:px-8 lg:px-10">
          <FadeInSection delay={0}>
            <Link
              href="/blog"
              className="text-sm text-[var(--accent-gold)] hover:underline mb-8 inline-block"
            >
              ← Back to Blog
            </Link>
          </FadeInSection>

          <FadeInSection delay={60}>
            <Image
              src={staticPost.coverSrc}
              alt={staticPost.title}
              width={1200}
              height={900}
              className={
                staticPost.coverImageClassName ??
                "mb-10 w-full max-w-2xl mx-auto h-auto object-contain"
              }
              sizes="(max-width: 768px) 100vw, 42rem"
              priority
            />
          </FadeInSection>

          <FadeInSection delay={100}>
            <div className="max-w-3xl mx-auto">
              <h1
                className="font-[var(--font-display)] text-3xl sm:text-4xl font-semibold text-[var(--text-primary)] mb-3 text-pretty leading-tight"
                style={{ textShadow: "0 0 24px rgba(126, 58, 237, 0.22)" }}
              >
                {staticPost.title}
              </h1>
              <p className="text-[var(--text-muted)] mb-10">
                {formatDate(staticPost.publishedAt)}
              </p>
              <div className="border-t border-white/10 mb-10" aria-hidden />
              <div className="prose prose-lg max-w-none">
                <p className="text-[var(--text-muted)] leading-relaxed whitespace-pre-wrap">
                  {staticPost.bodyPlaceholder}
                </p>
              </div>
            </div>
          </FadeInSection>
        </div>
      </Section>
    );
  }

  const { fetchSanityPostBySlug, urlFor } = await import(
    "@/lib/blog/fetch-sanity-posts"
  );
  const post = await fetchSanityPostBySlug(slug);

  if (!post) notFound();

  const hasBody =
    post.body && Array.isArray(post.body) && post.body.length > 0;

  return (
    <Section className="relative">
      <SectionTwinkles />
      <div className="max-w-5xl mx-auto w-full px-4 sm:px-8 lg:px-10">
        <FadeInSection delay={0}>
          <Link
            href="/blog"
            className="text-sm text-[var(--accent-gold)] hover:underline mb-8 inline-block"
          >
            ← Back to Blog
          </Link>
        </FadeInSection>

        {post.coverImage ? (
          <FadeInSection delay={60}>
            <Image
              src={urlFor(post.coverImage).width(1200).height(675).url()}
              alt={post.title}
              width={1200}
              height={675}
              className="mb-10 w-full max-w-3xl mx-auto h-auto object-contain"
              priority
              sizes="(max-width: 768px) 100vw, 800px"
            />
          </FadeInSection>
        ) : null}

        <FadeInSection delay={100}>
          <article className="max-w-3xl mx-auto">
            <h1
              className="font-[var(--font-display)] text-3xl sm:text-4xl font-semibold text-[var(--text-primary)] mb-3 text-pretty leading-tight"
              style={{ textShadow: "0 0 24px rgba(126, 58, 237, 0.22)" }}
            >
              {post.title}
            </h1>
            <p className="text-[var(--text-muted)] mb-8">
              {formatDate(post.publishedAt)}
            </p>
            {post.externalLink && (
              <p className="mb-8">
                <a
                  href={post.externalLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--accent-gold)] hover:underline"
                >
                  Read on external site →
                </a>
              </p>
            )}
            <div className="border-t border-white/10 mb-10" aria-hidden />
            {hasBody && post.body ? (
              <div className="prose prose-lg max-w-none">
                <PortableText value={post.body} tone="onDark" />
              </div>
            ) : (
              <p className="text-[var(--text-muted)]">No content yet.</p>
            )}
          </article>
        </FadeInSection>
      </div>
    </Section>
  );
}
