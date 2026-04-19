import { client } from "@/lib/sanity/client";
import { featuredReviewsQuery } from "@/lib/sanity/queries";
import type { ReviewListItem } from "@/lib/sanity/types";

export async function fetchFeaturedReviews(): Promise<ReviewListItem[]> {
  try {
    return await client.fetch(featuredReviewsQuery);
  } catch {
    return [];
  }
}
