import {
  STATIC_RESOURCES,
  getStaticResourceBySlug,
} from "@/lib/resources/static-resources";
import {
  fetchSanityResourceBySlug,
  fetchSanityResources,
} from "@/lib/resources/fetch-sanity-resources";
import type { Resource } from "@/lib/resources/types";

export async function getAllResources(): Promise<Resource[]> {
  const sanityResources = await fetchSanityResources();
  const sanitySlugs = new Set(sanityResources.map((r) => r.slug));
  const staticOnly = STATIC_RESOURCES.filter((r) => !sanitySlugs.has(r.slug));

  return [...staticOnly, ...sanityResources].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export async function getResourceBySlug(
  slug: string
): Promise<Resource | null> {
  const staticResource = getStaticResourceBySlug(slug);
  if (staticResource) return staticResource;

  return fetchSanityResourceBySlug(slug);
}
