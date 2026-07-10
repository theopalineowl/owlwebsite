import type { Resource } from "@/lib/resources/types";

export const STATIC_RESOURCES: Resource[] = [
  {
    id: "static-beginning-the-journey",
    slug: "beginning-the-journey",
    title:
      "Beginning the Journey: Cultivating Spiritual Awareness through Balance",
    description:
      "A free guide to grounding your practice, finding balance, and opening to spiritual awareness at your own pace.",
    fileSrc:
      "/documents/beginning-the-journey-cultivating-spiritual-awareness-through-balance.pdf",
    fileLabel: "PDF",
    publishedAt: "2026-07-09",
  },
];

export function getStaticResourceBySlug(slug: string): Resource | undefined {
  return STATIC_RESOURCES.find((r) => r.slug === slug);
}
