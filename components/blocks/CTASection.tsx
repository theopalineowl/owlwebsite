import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { SectionTwinkles } from "@/components/ui/SectionTwinkles";

export function CTASection() {
  return (
    <Section className="relative py-16 md:py-20">
      <SectionTwinkles />
      <div className="text-center relative">
        <p className="text-[var(--text-muted)] mb-6 font-[var(--font-body)]">
          Ready to begin?
        </p>
        <Button
          href="/courses"
          className="!text-white !bg-[var(--accent-gold)]/90 hover:!bg-[var(--accent-gold)]"
        >
          Join the Journey!
        </Button>
      </div>
    </Section>
  );
}
