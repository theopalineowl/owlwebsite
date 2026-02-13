import { client } from "@/lib/sanity/client";
import { featuredReviewsQuery } from "@/lib/sanity/queries";
import type { ReviewListItem } from "@/lib/sanity/types";
import { FadeInSection } from "@/components/ui/FadeInSection";
import { Hero } from "@/components/blocks/Hero";
import { QuoteSection } from "@/components/blocks/QuoteSection";
import { WelcomeSection } from "@/components/blocks/WelcomeSection";
import { ThreeStepsSection } from "@/components/blocks/ThreeStepsSection";
import { BenefitsSection } from "@/components/blocks/BenefitsSection";
import { ProfileSection } from "@/components/blocks/ProfileSection";
import { CTASection } from "@/components/blocks/CTASection";

export default async function HomePage() {
  let reviews: ReviewListItem[] = [];
  try {
    reviews = await client.fetch(featuredReviewsQuery);
  } catch {
    // No Sanity env
  }

  return (
    <>
      <FadeInSection>
        <Hero />
      </FadeInSection>
      <div className="home-dark">
        <FadeInSection delay={100}>
          <ProfileSection reviews={reviews} />
        </FadeInSection>
        <FadeInSection delay={150}>
          <QuoteSection
            quote="The lips of wisdom are closed, except to the ears of Understanding."
            attribution="The Kybalion"
          />
        </FadeInSection>
        <FadeInSection delay={150}>
          <WelcomeSection />
        </FadeInSection>
        <FadeInSection delay={200}>
          <ThreeStepsSection />
        </FadeInSection>
        <FadeInSection delay={100}>
          <QuoteSection
            quote="As above, so below; as below, so above"
            attribution="The Kybalion"
          />
        </FadeInSection>
        <FadeInSection delay={100}>
          <BenefitsSection />
        </FadeInSection>
        <FadeInSection delay={100}>
          <CTASection />
        </FadeInSection>
      </div>
    </>
  );
}
