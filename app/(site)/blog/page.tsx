import Image from "next/image";
import { client } from "@/lib/sanity/client";
import { postsQuery } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/image";
import { formatDate } from "@/lib/sanity/format";
import { Section } from "@/components/layout/Section";
import { Card } from "@/components/ui/Card";

const intro =
  "An exploration of ideas, rituals, tools, and daily practices.";

export default async function BlogListPage() {
  let posts: {
    _id: string;
    title: string;
    slug: string;
    publishedAt: string;
    excerpt?: string;
    coverImage?: unknown;
  }[] = [];
  try {
    posts = await client.fetch(postsQuery);
  } catch {
    // No Sanity
  }

  return (
    <Section>
      <div className="max-w-3xl mx-auto">
        <h1 className="font-[var(--font-display)] text-4xl font-semibold text-[var(--text-primary)] mb-4">
          Blog
        </h1>
        <p className="text-[var(--text-muted)] mb-2">{intro}</p>
        <p className="mb-12">
          <a
            href="https://themindfullibrarian.org"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--accent-gold)] hover:underline"
          >
            Prior blog content at themindfullibrarian.org →
          </a>
        </p>
        <div className="space-y-8">
          {posts.length === 0 ? (
            <p className="text-[var(--text-muted)]">No posts yet.</p>
          ) : (
            posts.map((post) => (
              <Card key={post._id} href={`/blog/${post.slug}`}>
                <div className="flex flex-col md:flex-row gap-6">
                  {post.coverImage != null ? (
                    <div className="relative w-full md:w-48 h-40 md:h-32 shrink-0 rounded-lg overflow-hidden">
                      <Image
                        src={urlFor(post.coverImage).width(400).height(260).url()}
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
                    {post.excerpt && (
                      <p className="text-[var(--text-muted)] text-sm leading-relaxed line-clamp-2">
                        {post.excerpt}
                      </p>
                    )}
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </Section>
  );
}
