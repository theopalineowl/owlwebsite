import type { PortableTextBlock } from "@portabletext/types";
import { client } from "@/lib/sanity/client";
import { reviewBySlugQuery } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/image";

/** Re-export for dynamic-import consumers (book review page avoids top-level Sanity in page chunk). */
export { urlFor };

export type SanityBookReview = {
  title: string;
  bookAuthor?: string;
  publishedAt: string;
  bookCover?: Parameters<typeof urlFor>[0];
  rating: number;
  excerpt?: string;
  body?: PortableTextBlock[];
};

export async function fetchSanityReviewBySlug(
  slug: string
): Promise<SanityBookReview | null> {
  try {
    return await client.fetch(reviewBySlugQuery, { slug });
  } catch {
    return null;
  }
}
