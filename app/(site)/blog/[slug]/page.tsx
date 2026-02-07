import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { client } from "@/lib/sanity/client";
import { postBySlugQuery } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/image";
import { formatDate } from "@/lib/sanity/format";
import { PortableText } from "@/components/blocks/PortableText";
import { Section } from "@/components/layout/Section";

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await client.fetch(postBySlugQuery, { slug });
  if (!post) notFound();

  const hasBody = post.body && Array.isArray(post.body) && post.body.length > 0;

  return (
    <Section>
      <article className="max-w-3xl mx-auto">
        <Link
          href="/blog"
          className="text-sm text-[var(--accent-gold)] hover:underline mb-6 inline-block"
        >
          ← Back to Blog
        </Link>
        {post.coverImage && (
          <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-8 shadow-[var(--shadow-soft)]">
            <Image
              src={urlFor(post.coverImage).width(800).height(450).url()}
              alt={post.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 800px"
            />
          </div>
        )}
        <h1 className="font-[var(--font-display)] text-4xl font-semibold text-[var(--text-primary)] mb-2">
          {post.title}
        </h1>
        <p className="text-[var(--text-muted)] mb-8">{formatDate(post.publishedAt)}</p>
        {post.externalLink && (
          <p className="mb-6">
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
        {hasBody ? (
          <div className="prose prose-lg max-w-none text-[var(--text-primary)]">
            <PortableText value={post.body} />
          </div>
        ) : (
          <p className="text-[var(--text-muted)]">No content yet.</p>
        )}
      </article>
    </Section>
  );
}
