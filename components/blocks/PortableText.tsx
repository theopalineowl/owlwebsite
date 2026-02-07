"use client";

import { PortableText as PT, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="mb-4 leading-relaxed text-[var(--text-primary)]">{children}</p>,
    h2: ({ children }) => (
      <h2 className="font-[var(--font-display)] text-2xl font-semibold text-[var(--text-primary)] mt-8 mb-4">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-[var(--font-display)] text-xl font-semibold text-[var(--text-primary)] mt-6 mb-3">
        {children}
      </h3>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc list-inside mb-4 space-y-1 text-[var(--text-primary)]">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal list-inside mb-4 space-y-1 text-[var(--text-primary)]">{children}</ol>,
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
        className="text-[var(--accent-gold)] hover:underline"
      >
        {children}
      </a>
    ),
  },
};

export function PortableText({ value }: { value: PortableTextBlock[] }) {
  return <PT value={value} components={components} />;
}
