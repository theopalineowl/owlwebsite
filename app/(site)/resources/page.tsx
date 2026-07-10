import { FadeInSection } from "@/components/ui/FadeInSection";
import { SectionTwinkles } from "@/components/ui/SectionTwinkles";
import { Section } from "@/components/layout/Section";
import { ResourceCard } from "@/components/resources/ResourceCard";
import { getAllResources } from "@/lib/resources/get-resources";

export const revalidate = 60;

const intro =
  "Free guides, workbooks, and tools to support your spiritual journey.";

export default async function ResourcesPage() {
  const resources = await getAllResources();

  return (
    <Section className="relative">
      <SectionTwinkles />
      <div className="max-w-5xl mx-auto w-full px-4 sm:px-8 lg:px-10">
        <FadeInSection delay={0}>
          <div className="relative mb-10 md:mb-12">
            <div
              className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[min(18rem,80vw)] w-[min(42rem,100%)] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(126,58,237,0.18)_0%,transparent_68%)] opacity-90"
              aria-hidden
            />
            <h1
              className="relative font-[var(--font-display)] text-3xl sm:text-4xl md:text-5xl font-semibold text-[var(--text-primary)] text-center text-balance leading-tight"
              style={{ textShadow: "0 0 28px rgba(126, 58, 237, 0.28)" }}
            >
              Resources
            </h1>
          </div>
        </FadeInSection>

        <div
          className="border-t border-white/10 mb-10 md:mb-12 max-w-3xl mx-auto"
          aria-hidden
        />

        <FadeInSection delay={80}>
          <p className="text-[var(--text-muted)] leading-relaxed mb-10 md:mb-12 max-w-3xl lg:max-w-4xl mx-auto">
            {intro}
          </p>
        </FadeInSection>

        <div className="max-w-3xl lg:max-w-4xl mx-auto space-y-6 md:space-y-8">
          {resources.length === 0 ? (
            <p className="text-[var(--text-muted)]">No resources yet.</p>
          ) : (
            resources.map((resource, i) => (
              <FadeInSection key={resource.id} delay={100 + i * 50}>
                <ResourceCard resource={resource} />
              </FadeInSection>
            ))
          )}
        </div>
      </div>
    </Section>
  );
}
