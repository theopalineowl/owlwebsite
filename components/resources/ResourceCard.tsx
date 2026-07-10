import Link from "next/link";
import { formatDate } from "@/lib/sanity/format";
import { Card } from "@/components/ui/Card";
import { ResourceDownloadButton } from "@/components/resources/ResourceDownloadButton";
import type { Resource } from "@/lib/resources/types";

type ResourceCardProps = {
  resource: Resource;
};

export function ResourceCard({ resource }: ResourceCardProps) {
  const downloadHref = `/resources/${resource.slug}/download`;

  return (
    <Card variant="dark" className="block p-5 sm:p-6">
      <div className="min-w-0">
        <Link
          href={`/resources/${resource.slug}`}
          className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/60 rounded-sm"
        >
          <h2 className="font-[var(--font-display)] text-lg sm:text-xl font-semibold text-[var(--text-primary)] mb-2 text-pretty leading-snug group-hover:text-violet-200 transition-colors">
            {resource.title}
          </h2>
        </Link>
        <p className="text-sm text-[var(--text-muted)] mb-3">
          {formatDate(resource.publishedAt)} · {resource.fileLabel}
        </p>
        <p className="text-[var(--text-muted)] text-sm leading-relaxed mb-6 md:mb-8">
          {resource.description}
        </p>
        <div className="flex justify-center">
          <ResourceDownloadButton
            href={downloadHref}
            label={`Download ${resource.fileLabel}`}
          />
        </div>
      </div>
    </Card>
  );
}
