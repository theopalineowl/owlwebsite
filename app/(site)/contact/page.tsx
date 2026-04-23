"use client";

import Image from "next/image";
import { Section } from "@/components/layout/Section";
import { SectionTwinkles } from "@/components/ui/SectionTwinkles";
import { FadeInSection } from "@/components/ui/FadeInSection";

export default function ContactPage() {
  return (
    <div className="home-dark min-h-screen">
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
                Contact
              </h1>
            </div>
          </FadeInSection>

          <div
            className="border-t border-white/10 mb-10 md:mb-12 max-w-3xl mx-auto"
            aria-hidden
          />

          <FadeInSection delay={80}>
            <div className="max-w-xl mx-auto">
              <p className="text-[var(--text-muted)] leading-relaxed text-center mb-8">
                Say hello — Jenny reads every message. Or reach out to her on Instagram! 
              </p>

              <div className="journey-card journey-glow rounded-xl border border-white/20 bg-white/5 backdrop-blur-sm px-6 py-8 md:px-8 md:py-10 space-y-8 shadow-[0_0_24px_rgba(126,58,237,0.08)]">
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-violet-300/80 mb-2">
                    Email
                  </p>
                  <a
                    href="mailto:jennynunez@theopalineowl.org"
                    className="font-[var(--font-display)] text-lg md:text-xl text-[var(--text-primary)] hover:text-violet-200 transition-colors underline-offset-4 hover:underline"
                  >
                    Jenny Nunez
                  </a>
                  <p className="text-sm text-[var(--text-muted)] mt-2 break-all">
                    jennynunez@theopalineowl.org
                  </p>
                </div>

                <div className="border-t border-white/10 pt-8">
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-violet-300/80 mb-3">
                    Instagram
                  </p>
                  <a
                    href="https://www.instagram.com/theopalineowl/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 text-[var(--text-primary)] hover:text-violet-200 transition-colors group"
                  >
                    <Image
                      src="/images/instagram.png"
                      alt=""
                      width={36}
                      height={36}
                      className="size-9 shrink-0 rounded-lg object-cover ring-1 ring-white/15 group-hover:ring-violet-400/40 transition-[box-shadow] group-hover:shadow-[0_0_16px_rgba(126,58,237,0.35)]"
                    />
                    <span className="font-[var(--font-body)] text-base md:text-lg underline-offset-4 group-hover:underline">
                      @theopalineowl
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </FadeInSection>
        </div>
      </Section>
    </div>
  );
}
