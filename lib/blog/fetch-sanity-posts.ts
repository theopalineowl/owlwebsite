import type { PortableTextBlock } from "@portabletext/types";
import { client } from "@/lib/sanity/client";
import { postBySlugQuery, postsQuery } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/image";

/** Re-export for dynamic-import consumers (blog pages avoid top-level Sanity in page chunks). */
export { urlFor };

export type SanityPostListRow = {
  _id: string;
  title: string;
  slug: string;
  publishedAt: string;
  excerpt?: string;
  body?: PortableTextBlock[];
  coverImage?: unknown;
  externalLink?: string;
};

export async function fetchSanityBlogPosts(): Promise<SanityPostListRow[]> {
  try {
    return await client.fetch<SanityPostListRow[]>(postsQuery);
  } catch {
    return [];
  }
}

export type SanityBlogPostDetail = {
  title: string;
  publishedAt: string;
  coverImage?: Parameters<typeof urlFor>[0];
  body?: PortableTextBlock[];
  externalLink?: string;
};

export async function fetchSanityPostBySlug(
  slug: string
): Promise<SanityBlogPostDetail | null> {
  try {
    return await client.fetch(postBySlugQuery, { slug });
  } catch {
    return null;
  }
}
