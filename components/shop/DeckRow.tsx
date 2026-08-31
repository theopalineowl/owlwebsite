import Image from "next/image";
import type { OracleDeck } from "@/lib/shop/decks";

type DeckRowProps = {
  deck: OracleDeck;
  imageOnLeft: boolean;
};

export function DeckRow({ deck, imageOnLeft }: DeckRowProps) {
  return (
    <article
      className={`flex flex-col gap-6 md:gap-10 lg:gap-14 md:items-center ${
        imageOnLeft ? "md:flex-row" : "md:flex-row-reverse"
      }`}
    >
      <div className="relative w-full md:w-1/2 aspect-[16/9] overflow-hidden rounded-xl border border-white/15 shadow-[0_0_24px_rgba(126,58,237,0.08)]">
        <Image
          src={deck.imageSrc}
          alt={deck.title}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
      <div className="w-full md:w-1/2 flex flex-col items-start">
        <h2 className="font-[var(--font-display)] text-2xl sm:text-3xl font-semibold text-[var(--text-primary)] mb-2 text-pretty leading-snug">
          {deck.title}
        </h2>
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-violet-300/80 mb-4 leading-relaxed">
          {deck.tagline}
        </p>
        <p className="text-[var(--text-muted)] leading-relaxed mb-6 md:mb-8">
          {deck.description}
        </p>
        {deck.shopUrl ? (
          <a
            href={deck.shopUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full px-8 py-3 text-sm font-semibold text-white bg-gradient-to-b from-violet-500 to-violet-700 shadow-[0_0_24px_rgba(126,58,237,0.35)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_32px_rgba(126,58,237,0.5)]"
          >
            Buy Now
          </a>
        ) : (
          <p className="text-sm uppercase tracking-[0.18em] text-[var(--text-muted)]">
            Coming soon
          </p>
        )}
      </div>
    </article>
  );
}
