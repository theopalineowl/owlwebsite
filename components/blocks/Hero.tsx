import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { HeroBackgroundVideo } from "./HeroBackgroundVideo";
import { HeroTwinkleOverlay } from "./HeroTwinkleOverlay";

const headline = "Return to Balance. Reconnect with Source.";
const subheadline =
  "Grounded spiritual education for seekers ready to cultivate personal practices rooted in awareness, nature, and inner wisdom.";

export function Hero() {
  return (
    <section className="relative min-h-[85vh] flex flex-col items-center justify-center px-6 py-24 text-center overflow-hidden">
      {/* Content first in DOM for LCP; layered above video */}
      <div className="relative z-10 max-w-3xl">
        <h1 className="font-[var(--font-display)] text-4xl md:text-5xl lg:text-6xl font-semibold text-white drop-shadow-md leading-tight">
          {headline}
        </h1>
        <p className="mt-6 text-lg md:text-xl text-white/95 font-[var(--font-body)] max-w-2xl mx-auto">
          {subheadline}
        </p>
        <div className="mt-10">
          <Button href="/courses" className="!text-white !bg-[var(--accent-gold)]/90 hover:!bg-[var(--accent-gold)]">
            Join the Journey
          </Button>
        </div>
      </div>
      {/* Full-bleed background video + overlay (decorative) */}
      <HeroBackgroundVideo />
      {/* Logo watermark: higher up, bottom ~20% behind headline; 7% opacity, no edges/glow/shadow */}
      <div
        className="absolute inset-x-0 bottom-[50%] top-0 flex justify-center pointer-events-none z-0"
        aria-hidden="true"
      >
        <div className="relative w-[min(55vw,420px)] h-[35vh] max-h-[85vh]">
          <Image
            src="/images/logo.png"
            alt=""
            fill
            className="object-contain object-bottom opacity-[0.2] select-none"
            style={{
              filter: "invert(1) brightness(1.4) grayscale(1)",
            }}
            sizes="(max-width: 768px) 55vw, 420px"
          />
        </div>
      </div>
      <HeroTwinkleOverlay />
    </section>
  );
}
