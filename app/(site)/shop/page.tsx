import Image from "next/image";
import { FadeInSection } from "@/components/ui/FadeInSection";
import { SectionTwinkles } from "@/components/ui/SectionTwinkles";
import { Section } from "@/components/layout/Section";
import { DeckRow } from "@/components/shop/DeckRow";
import { ShopButton } from "@/components/shop/ShopButton";
import { decks } from "@/lib/shop/decks";
import {
  shopIntroParagraphs,
  shopSuggestionMethods,
  shopSuggestionsClosing,
  shopSuggestionsIntro,
} from "./shop-copy";

export default function ShopPage() {
  return (
    <Section className="relative">
      <SectionTwinkles />
      <div className="max-w-6xl mx-auto w-full px-4 sm:px-8 lg:px-10">
        <FadeInSection delay={0}>
          <div className="relative mb-8 md:mb-10">
            <div
              className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[min(18rem,80vw)] w-[min(42rem,100%)] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(126,58,237,0.18)_0%,transparent_68%)] opacity-90"
              aria-hidden
            />
            <h1
              className="relative font-[var(--font-display)] text-3xl sm:text-4xl md:text-5xl font-semibold text-[var(--text-primary)] text-center text-balance leading-tight"
              style={{ textShadow: "0 0 28px rgba(126, 58, 237, 0.28)" }}
            >
              Oracle Decks
            </h1>
          </div>
        </FadeInSection>

        <FadeInSection delay={40}>
          <div className="relative mb-8 md:mb-10 aspect-[16/10] md:aspect-[2/1] w-full overflow-hidden rounded-xl border border-white/15 shadow-[0_0_40px_rgba(126,58,237,0.12)]">
            <Image
              src="/Shop/home.jpg"
              alt="The Opaline Owl Mystical Forest Oracle cards spread on a wooden table with candles and crystals"
              fill
              priority
              sizes="(min-width: 1024px) 72rem, 100vw"
              className="object-cover object-[center_42%]"
            />
          </div>
        </FadeInSection>

        <FadeInSection delay={80}>
          <div className="flex justify-center mb-10 md:mb-14">
            <ShopButton />
          </div>
        </FadeInSection>

        <div
          className="border-t border-white/10 mb-10 md:mb-12 max-w-3xl mx-auto"
          aria-hidden
        />

        <FadeInSection delay={100}>
          <div className="max-w-3xl mx-auto space-y-5 mb-14 md:mb-20">
            {shopIntroParagraphs.map((paragraph) => (
              <p
                key={paragraph.slice(0, 48)}
                className="text-[var(--text-muted)] leading-relaxed"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </FadeInSection>

        <div className="space-y-16 md:space-y-24 mb-16 md:mb-24">
          {decks.map((deck, i) => (
            <FadeInSection key={deck.id} delay={120 + i * 40}>
              <DeckRow deck={deck} imageOnLeft={i % 2 === 0} />
            </FadeInSection>
          ))}
        </div>

        <div
          className="border-t border-white/10 mb-10 md:mb-12 max-w-3xl mx-auto"
          aria-hidden
        />

        <FadeInSection delay={80}>
          <div className="max-w-3xl mx-auto mb-12 md:mb-16">
            <h2
              className="font-[var(--font-display)] text-2xl sm:text-3xl md:text-4xl font-semibold text-[var(--text-primary)] text-center text-balance leading-tight mb-8 md:mb-10"
              style={{ textShadow: "0 0 24px rgba(126, 58, 237, 0.24)" }}
            >
              Suggestions for Use
            </h2>
            <p className="text-[var(--text-muted)] leading-relaxed mb-8">
              {shopSuggestionsIntro}
            </p>
            <div className="space-y-8">
              {shopSuggestionMethods.map((method) => (
                <div key={method.title}>
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-violet-300/80 mb-2">
                    {method.title}
                  </p>
                  <p className="text-[var(--text-muted)] leading-relaxed whitespace-pre-line">
                    {method.body}
                  </p>
                </div>
              ))}
            </div>
            <p className="text-[var(--text-muted)] leading-relaxed mt-8">
              {shopSuggestionsClosing}
            </p>
          </div>
        </FadeInSection>

        <FadeInSection delay={100}>
          <div className="flex justify-center">
            <ShopButton />
          </div>
        </FadeInSection>
      </div>
    </Section>
  );
}
