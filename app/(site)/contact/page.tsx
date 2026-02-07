"use client";

import { Section } from "@/components/layout/Section";

export default function ContactPage() {
  return (
    <Section>
      <div className="max-w-xl mx-auto">
        <h1 className="font-[var(--font-display)] text-4xl font-semibold text-[var(--text-primary)] mb-4">
          Contact
        </h1>
        <p className="text-[var(--text-muted)] mb-8">
          Send a message — UI only, no backend yet.
        </p>
        <form
          className="space-y-6"
          onSubmit={(e) => e.preventDefault()}
        >
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-[var(--text-primary)] mb-2">
              Name
            </label>
            <input
              id="name"
              type="text"
              className="w-full rounded-lg border border-[var(--text-muted)]/30 px-4 py-3 text-[var(--text-primary)] bg-white focus:outline-none focus:ring-2 focus:ring-[var(--accent-gold-muted)]/50"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[var(--text-primary)] mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="w-full rounded-lg border border-[var(--text-muted)]/30 px-4 py-3 text-[var(--text-primary)] bg-white focus:outline-none focus:ring-2 focus:ring-[var(--accent-gold-muted)]/50"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-[var(--text-primary)] mb-2">
              Message
            </label>
            <textarea
              id="message"
              rows={5}
              className="w-full rounded-lg border border-[var(--text-muted)]/30 px-4 py-3 text-[var(--text-primary)] bg-white focus:outline-none focus:ring-2 focus:ring-[var(--accent-gold-muted)]/50"
            />
          </div>
          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-full px-8 py-3 text-sm font-medium text-[var(--text-primary)] bg-gradient-to-b from-[var(--accent-gold-muted)] to-[var(--accent-gold)] shadow-[var(--shadow-soft)] hover:-translate-y-0.5 hover:shadow-[var(--shadow-lift)] transition-all"
          >
            Send
          </button>
        </form>
      </div>
    </Section>
  );
}
