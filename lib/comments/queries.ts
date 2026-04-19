import { client } from "@/lib/sanity/client";
import type { CommentTargetType, PublicComment } from "./types";

const LIST_COMMENTS = `*[_type == "readerComment" && targetType == $targetType && targetSlug == $slug] | order(_createdAt asc) {
  _id,
  authorName,
  message,
  _createdAt
}`;

export async function listCommentsForPage(
  targetType: CommentTargetType,
  slug: string,
): Promise<PublicComment[]> {
  return client.fetch<PublicComment[]>(LIST_COMMENTS, { targetType, slug });
}
