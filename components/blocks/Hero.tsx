import Image from "next/image";
import { HeroBackgroundImage } from "./HeroBackgroundImage";
import { HeroTwinkleOverlay } from "./HeroTwinkleOverlay";

export function Hero() {
  return (
    <section className="relative w-full h-screen min-h-[600px] max-h-[100dvh] overflow-hidden flex flex-col">
      <HeroBackgroundImage />

      {/* Content: headline + portrait row on md+ (portrait left); quote below */}
      <div className="relative z-10 flex-1 flex flex-col pl-4 pr-6 sm:pl-5 sm:pr-8 md:pl-6 md:pr-10 lg:pl-8 lg:pr-14 pt-[clamp(2rem,8vh,4rem)] pb-[clamp(1.5rem,6vh,3rem)]">
        {/* Row 1: mobile = heading then portrait; md+ = grid portrait (left) | heading centered in remainder */}
        <div className="flex-shrink-0 flex flex-col md:grid md:grid-cols-[auto_minmax(0,1fr)] md:items-center gap-6 md:gap-8 lg:gap-12 w-full mt-[clamp(4rem,14vh,8rem)] md:mt-[clamp(3rem,12vh,6rem)]">
          <div className="flex flex-col items-center md:items-start animate-hero-portrait order-2 md:order-1 md:justify-self-start md:pl-6 lg:pl-10">
            <div
              className="relative w-[min(240px,42vw)] md:w-[min(260px,32vw)] lg:w-[min(300px,28vw)] aspect-[3/4] max-h-[min(42vh,320px)] md:max-h-[min(52vh,420px)] rounded-2xl overflow-hidden flex-shrink-0"
              style={{
                boxShadow:
                  "0 4px 24px rgba(0,0,0,0.2), 0 0 0 1px rgba(255,255,255,0.06)",
                background: "rgba(255,255,255,0.04)",
                backdropFilter: "blur(16px) saturate(1.1)",
                WebkitBackdropFilter: "blur(16px) saturate(1.1)",
              }}
            >
              <Image
                src="/images/portait.jpg"
                alt="Jenny Nunez"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 42vw, (max-width: 1280px) 30vw, 320px"
              />
            </div>
            <p
              className="mt-2 font-[var(--font-display)] text-lg md:text-xl font-semibold text-white text-center md:text-left w-full"
              style={{ textShadow: "0 2px 12px rgba(0,0,0,0.3)" }}
            >
              Jenny Nunez
            </p>
            <p
              className="text-sm md:text-base text-white/80 font-[var(--font-body)] text-center md:text-left w-full"
              style={{ textShadow: "0 1px 8px rgba(0,0,0,0.25)" }}
            >
              Eclectic Witch
            </p>
          </div>

          <div className="order-1 md:order-2 flex min-w-0 items-center justify-center md:px-4 lg:px-8">
            <header className="text-center animate-hero-headline w-full max-w-[min(100%,52rem)]">
              <p
                className="font-[var(--font-display)] text-3xl sm:text-4xl md:text-4xl lg:text-5xl xl:text-6xl text-white/95 tracking-[0.18em] uppercase"
                style={{ textShadow: "0 2px 20px rgba(0,0,0,0.4)" }}
              >
                Welcome to
              </p>
              <p
                className="magic-title font-semibold text-white leading-[1.05] uppercase mt-2 md:mt-3 text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl"
                style={{ textShadow: "0 2px 24px rgba(0,0,0,0.35)" }}
              >
                The Opaline Owl
              </p>
            </header>
          </div>
        </div>

        {/* Quote */}
        <div className="flex-1 flex items-center justify-center min-h-0 mt-6 md:mt-8 px-2">
          <blockquote
            className="animate-hero-quote text-center max-w-[380px] md:max-w-[420px]"
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
