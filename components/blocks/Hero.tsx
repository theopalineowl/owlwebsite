import Image from "next/image";
import { HeroBackgroundImage } from "./HeroBackgroundImage";
import { HeroTwinkleOverlay } from "./HeroTwinkleOverlay";

export function Hero() {
  return (
    <section className="relative w-full h-screen min-h-[600px] max-h-[100dvh] overflow-hidden flex flex-col">
      <HeroBackgroundImage />

      {/* Content: grid so headline, quote, and portrait all fit in one viewport */}
      <div className="relative z-10 flex-1 flex flex-col px-6 md:px-10 lg:px-14 pt-[clamp(2rem,8vh,4rem)] pb-[clamp(1.5rem,6vh,3rem)]">
        {/* Row 1: headline lower and centered */}
        <div className="flex-shrink-0 flex justify-center w-full mt-[clamp(4rem,14vh,8rem)] md:mt-[clamp(5rem,18vh,10rem)]">
          <header className="text-center mx-auto animate-hero-headline">
            <p
              className="font-[var(--font-display)] text-2xl md:text-3xl lg:text-4xl text-white/95 tracking-[0.18em] uppercase"
              style={{ textShadow: "0 2px 20px rgba(0,0,0,0.4)" }}
            >
              Welcome to
            </p>
            <p
              className="magic-title font-semibold text-white leading-tight uppercase mt-1 md:text-5xl lg:text-6xl xl:text-7xl"
              style={{ textShadow: "0 2px 24px rgba(0,0,0,0.35)" }}
            >
              The Opaline Owl
            </p>
          </header>
        </div>

        {/* Row 2: portrait centered under heading, quote to the right of portrait */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-8 md:gap-10 items-center min-h-0 mt-6 md:mt-8 px-2">
          {/* Left: empty so portrait sits in center column */}
          <div className="hidden md:block order-1" aria-hidden="true" />
          {/* Portrait: center column — centered under heading */}
          <div className="flex flex-col items-center animate-hero-portrait order-2 col-start-1 md:col-start-2 row-start-1 md:justify-self-center">
            <div
              className="relative w-[min(240px,42vw)] aspect-[3/4] max-h-[min(42vh,320px)] rounded-2xl overflow-hidden flex-shrink-0"
              style={{
                boxShadow:
                  "0 4px 24px rgba(0,0,0,0.2), 0 0 0 1px rgba(255,255,255,0.06)",
                background: "rgba(255,255,255,0.04)",
                backdropFilter: "blur(16px) saturate(1.1)",
                WebkitBackdropFilter: "blur(16px) saturate(1.1)",
              }}
            >
              <Image
                src="/images/jennyheadshot.jpg"
                alt="Jenny Nunez"
                fill
                className="object-cover"
                priority
                sizes="240px"
              />
            </div>
            <p
              className="mt-2 font-[var(--font-display)] text-lg md:text-xl font-semibold text-white text-center"
              style={{ textShadow: "0 2px 12px rgba(0,0,0,0.3)" }}
            >
              Jenny Nunez
            </p>
            <p
              className="text-sm md:text-base text-white/80 font-[var(--font-body)] text-center"
              style={{ textShadow: "0 1px 8px rgba(0,0,0,0.25)" }}
            >
              Eclectic Witch
            </p>
          </div>

          {/* Quote: right column — to the right of portrait */}
          <blockquote
            className="animate-hero-quote text-center md:text-left max-w-[380px] md:max-w-[420px] order-3 col-start-1 md:col-start-3 row-start-2 md:row-start-1 justify-self-center md:justify-self-start"
            style={{ textShadow: "0 2px 16px rgba(0,0,0,0.35)" }}
          >
            <p className="font-[var(--font-body)] text-base md:text-lg lg:text-xl text-white/95 italic leading-relaxed">
              &ldquo;Guiding seekers in the development of intuitive rituals for connection to Source.&rdquo;
            </p>
          </blockquote>
        </div>
      </div>

      <HeroTwinkleOverlay />
    </section>
  );
}
