import { Section } from "@/components/layout/Section";
import { SectionTwinkles } from "@/components/ui/SectionTwinkles";

export function QuoteSection({
  quote,
  attribution,
}: {
  quote: string;
  attribution: string;
}) {
  return (
    <Section className="relative py-10 md:py-14">
      <SectionTwinkles />
      <blockquote className="max-w-2xl mx-auto text-center relative">
        <p className="font-[var(--font-display)] text-xl md:text-2xl text-[var(--text-primary)] italic leading-relaxed">
          &ldquo;{quote}&rdquo;
        </p>
        <footer className="mt-4 text-[var(--text-muted)] text-sm">
          — {attribution}
        </footer>
      </blockquote>
    </Section>
  );
}
