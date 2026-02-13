import Link from "next/link";
import type { SiteSettings } from "@/lib/sanity/types";

export function Footer({ settings }: { settings?: SiteSettings | null }) {
  const links = settings?.navLinks?.filter((l) => l.label && l.href) ?? [];
  const social = settings?.socialLinks?.filter((l) => l.label && l.url) ?? [];

  return (
    <footer className="border-t border-[var(--text-muted)]/10 py-12 px-6 md:px-12">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="text-sm text-[var(--text-muted)] text-center md:text-left">
          {settings?.footerText || "© The Opaline Owl. Grounded spiritual education."}
        </p>
        <div className="flex items-center gap-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href!}
              className="text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)]"
            >
              {link.label}
            </Link>
          ))}
          {social.map((s) => (
            <a
              key={s.url}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[var(--text-muted)] hover:text-[var(--accent-gold)]"
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
