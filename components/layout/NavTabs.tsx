"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavLink = { label: string; href: string };

export function NavTabs({ links }: { links: NavLink[] }) {
  const pathname = usePathname();

  return (
    <ul className="flex items-stretch overflow-hidden rounded-lg shadow-md">
      {links.map((link, i) => {
        const isActive =
          pathname === link.href ||
          (link.href !== "/" && pathname.startsWith(link.href));
        const isFirst = i === 0;
        const isLast = i === links.length - 1;

        return (
          <li
            key={link.href}
            className={`
              flex items-center justify-center
              border-r border-[var(--bg-parchment)]/30 last:border-r-0
              ${isFirst ? "rounded-l-lg" : ""}
              ${isLast ? "rounded-r-lg" : ""}
              ${isActive ? "bg-[var(--accent-gold)]" : "bg-[var(--text-muted)]"}
            `}
          >
            <Link
              href={link.href}
              className={`px-4 py-3 md:px-5 md:py-3.5 font-[var(--font-display)] text-sm md:text-base uppercase tracking-wide transition-colors whitespace-nowrap ${
                isActive
                  ? "text-[var(--text-primary)]"
                  : "text-[var(--bg-parchment)] hover:bg-black/10"
              }`}
            >
              {link.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
