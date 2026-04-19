import type { ReviewListItem } from "@/lib/sanity/types";
import { staticReviewsAsFeaturedItems } from "@/lib/book-reviews/static-reviews";
import { FadeInSection } from "@/components/ui/FadeInSection";
import { Hero } from "@/components/blocks/Hero";
import { QuoteSection } from "@/components/blocks/QuoteSection";
import { ThreeStepsSection } from "@/components/blocks/ThreeStepsSection";
import { BenefitsSection } from "@/components/blocks/BenefitsSection";
import { MeetAndWelcomeSection } from "@/components/blocks/MeetAndWelcomeSection";
import { CTASection } from "@/components/blocks/CTASection";
import { FloatingParticles } from "@/components/ui/FloatingParticles";

export default async function HomePage() {
  const { fetchFeaturedReviews } = await import(
    "@/lib/sanity/fetch-featured-reviews"
  );
  let reviews: ReviewListItem[] = await fetchFeaturedReviews();

  const staticFeatured = staticReviewsAsFeaturedItems();
  const sanitySlugs = new Set(reviews.map((r) => r.slug));
  const mergedFeatured = [
    ...staticFeatured.filter((r) => !sanitySlugs.has(r.slug)),
    ...reviews,
  ]
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    )
    .slice(0, 3);
  reviews = mergedFeatured;

  return (
    <>
      <FadeInSection>
        <Hero />
      </FadeInSection>
      <div className="home-dark">
        <FloatingParticles />
        <FadeInSection delay={100}>
          <MeetAndWelcomeSection reviews={reviews} />
        </FadeInSection>
        <FadeInSection delay={150}>
          <QuoteSection
            quote="The lips of wisdom are closed, except to the ears of Understanding."
            attribution="The Kybalion"
          />
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
