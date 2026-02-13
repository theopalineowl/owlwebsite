import Link from "next/link";
import Image from "next/image";
import type { SiteSettings } from "@/lib/sanity/types";
import { NavTabs } from "@/components/layout/NavTabs";

const defaultNavLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Book Reviews", href: "/book-reviews" },
  { label: "Courses", href: "/courses" },
  { label: "Contact", href: "/contact" },
];

export function Navbar({ settings }: { settings?: SiteSettings | null }) {
  const links = settings?.navLinks?.length
    ? settings.navLinks.filter((l) => l.label && l.href)
    : defaultNavLinks;

  const navLinks = links.map((l) => ({
    label: l.label!,
    href: l.href!,
  }));

  return (
    <header className="sticky top-0 z-50 bg-[var(--text-primary)]">
      <nav className="flex items-center justify-between gap-4 py-3 px-4 md:px-8 max-w-7xl mx-auto">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <span className="inline-flex rounded-full bg-[#f5f0e6] p-0.5 ring-2 ring-[var(--bg-parchment)]/30">
            <Image
              src="/images/logo.png"
              alt="The Opaline Owl"
              width={40}
              height={40}
              className="rounded-full"
            />
          </span>
          <span className="font-[var(--font-display)] text-base font-medium text-[var(--bg-parchment)] hidden sm:inline">
            {settings?.siteTitle || "The Opaline Owl"}
          </span>
        </Link>
        <div className="flex-1 flex justify-end min-w-0 overflow-x-auto">
          <NavTabs links={navLinks} />
        </div>
      </nav>
    </header>
  );
}
