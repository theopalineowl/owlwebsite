import Link from "next/link";
import { notFound } from "next/navigation";
import { formatDate } from "@/lib/sanity/format";
import { Section } from "@/components/layout/Section";
import { FadeInSection } from "@/components/ui/FadeInSection";
import { SectionTwinkles } from "@/components/ui/SectionTwinkles";
import { ResourceDownloadButton } from "@/components/resources/ResourceDownloadButton";
import { getResourceBySlug } from "@/lib/resources/get-resources";
import { STATIC_RESOURCES } from "@/lib/resources/static-resources";

export const revalidate = 60;
export const dynamicParams = true;

export function generateStaticParams() {
  return STATIC_RESOURCES.map((resource) => ({ slug: resource.slug }));
}

export default async function ResourcePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const resource = await getResourceBySlug(slug);

  if (!resource) notFound();

  const downloadHref = `/resources/${resource.slug}/download`;

  return (
    <Section className="relative">
      <SectionTwinkles />
      <div className="max-w-5xl mx-auto w-full px-4 sm:px-8 lg:px-10">
        <FadeInSection delay={0}>
          <Link
            href="/resources"
            className="text-sm text-[var(--accent-gold)] hover:underline mb-8 inline-block"
          >
            ← Back to Resources
          </Link>
        </FadeInSection>

        <FadeInSection delay={80}>
          <div className="max-w-3xl mx-auto rounded-xl border border-white/15 bg-white/[0.06] backdrop-blur-md p-5 sm:p-8">
            <h1
              className="font-[var(--font-display)] text-2xl sm:text-3xl font-semibold text-[var(--text-primary)] mb-3 text-pretty leading-tight"
              style={{ textShadow: "0 0 24px rgba(126, 58, 237, 0.22)" }}
            >
              {resource.title}
            </h1>
            <p className="text-sm text-[var(--text-muted)] mb-6">
              {formatDate(resource.publishedAt)} · {resource.fileLabel}
            </p>
            <p className="text-[var(--text-muted)] leading-relaxed mb-8">
              {resource.description}
            </p>
            <div className="flex justify-center">
              <ResourceDownloadButton
                href={downloadHref}
                label={`Download ${resource.fileLabel}`}
              />
            </div>
          </div>
        </FadeInSection>
      </div>
    </Section>
  );
}
