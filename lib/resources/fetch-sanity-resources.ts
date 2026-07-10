import { client } from "@/lib/sanity/client";
import { resourceBySlugQuery, resourcesQuery } from "@/lib/sanity/queries";
import type { Resource } from "@/lib/resources/types";

type SanityResourceRow = {
  _id: string;
  title: string;
  slug: string;
  publishedAt: string;
  description: string;
  fileUrl?: string;
  fileExtension?: string;
};

function toResource(row: SanityResourceRow): Resource | null {
  if (!row.fileUrl) return null;

  const ext = row.fileExtension?.toUpperCase() || "FILE";

  return {
    id: row._id,
    slug: row.slug,
    title: row.title,
    description: row.description,
    fileSrc: row.fileUrl,
    fileLabel: ext,
    publishedAt: row.publishedAt,
  };
}

export async function fetchSanityResources(): Promise<Resource[]> {
  try {
    const rows = await client.fetch<SanityResourceRow[]>(resourcesQuery);
    return rows
      .map(toResource)
      .filter((resource): resource is Resource => resource != null);
  } catch {
    return [];
  }
}

export async function fetchSanityResourceBySlug(
  slug: string
): Promise<Resource | null> {
  try {
    const row = await client.fetch<SanityResourceRow | null>(
      resourceBySlugQuery,
      { slug }
    );
    if (!row) return null;
    return toResource(row);
  } catch {
    return null;
  }
}
