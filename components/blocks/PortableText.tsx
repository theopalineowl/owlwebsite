"use client";

import { useMemo } from "react";
import { PortableText as PT, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";

function makeComponents(
  tone: "default" | "onDark" | "onParchment"
): PortableTextComponents {
  const body =
    tone === "onDark"
      ? "text-[var(--text-muted)]"
      : tone === "onParchment"
        ? "text-black text-base sm:text-lg"
        : "text-[var(--text-primary)]";
  const heading =
    tone === "onParchment"
      ? "text-black"
      : "text-[var(--text-primary)]";
  const h2Size =
    tone === "onParchment"
      ? "text-[1.35rem] sm:text-2xl md:text-[1.75rem]"
      : "";
  const h3Size =
    tone === "onParchment"
      ? "text-[1.2rem] sm:text-xl md:text-2xl"
      : "";
  const linkClass =
    tone === "onParchment"
      ? "text-violet-950 underline decoration-violet-950/40 hover:decoration-violet-950"
      : "text-[var(--accent-gold)] hover:underline";
  return {
    block: {
      normal: ({ children }) => (
        <p className={`mb-4 leading-relaxed ${body}`}>{children}</p>
      ),
      h2: ({ children }) => (
        <h2
          className={`font-[var(--font-display)] font-semibold ${heading} mt-8 mb-4 ${
            tone === "onParchment"
              ? h2Size
              : "text-2xl"
          }`}
        >
          {children}
        </h2>
      ),
      h3: ({ children }) => (
        <h3
          className={`font-[var(--font-display)] font-semibold ${heading} mt-6 mb-3 ${
            tone === "onParchment"
              ? h3Size
              : "text-xl"
          }`}
        >
          {children}
        </h3>
      ),
    },
    list: {
      bullet: ({ children }) => (
        <ul className={`list-disc list-inside mb-4 space-y-1 ${body}`}>
          {children}
        </ul>
      ),
      number: ({ children }) => (
        <ol className={`list-decimal list-inside mb-4 space-y-1 ${body}`}>
          {children}
        </ol>
      ),
    },
    listItem: {
      bullet: ({ children }) => <li>{children}</li>,
      number: ({ children }) => <li>{children}</li>,
    },
    marks: {
      link: ({ children, value }) => (
        <a
          href={value?.href}
          target="_blank"
          rel="noopener noreferrer"
          className={linkClass}
        >
          {children}
        </a>
      ),
    },
  };
}

export function PortableText({
  value,
  tone = "default",
}: {
  value: PortableTextBlock[];
  tone?: "default" | "onDark" | "onParchment";
}) {
  const components = useMemo(() => makeComponents(tone), [tone]);
  return <PT value={value} components={components} />;
}
