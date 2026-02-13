"use client";

import { Section } from "@/components/layout/Section";

export default function CoursesPage() {
  return (
    <Section>
      <div className="max-w-xl mx-auto text-center">
        <h1 className="font-[var(--font-display)] text-4xl font-semibold text-[var(--text-primary)] mb-4">
          Coming Soon
        </h1>
        <p className="text-[var(--text-muted)] mb-8">
          Get notified when courses launch.
        </p>
        <form
          className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="email"
            placeholder="Your email"
            className="flex-1 min-w-0 rounded-full border border-[var(--text-muted)]/30 px-5 py-3 text-[var(--text-primary)] bg-white placeholder:text-[var(--text-muted)]/60 focus:outline-none focus:ring-2 focus:ring-[var(--accent-gold-muted)]/50"
          />
          <button
            type="submit"
            className="shrink-0 inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium text-[var(--text-primary)] bg-gradient-to-b from-[var(--accent-gold-muted)] to-[var(--accent-gold)] shadow-[var(--shadow-soft)] hover:-translate-y-0.5 hover:shadow-[var(--shadow-lift)] transition-all"
          >
            Notify me
          </button>
        </form>
        <p className="mt-4 text-sm text-[var(--text-muted)]">
          Front-end only — no backend yet.
        </p>
      </div>
    </Section>
  );
}
