import Link from "next/link";

type CardProps = {
  href?: string;
  /** Use a native anchor (e.g. file downloads) instead of Next.js Link */
  download?: boolean;
  children: React.ReactNode;
  className?: string;
  /** Glass card on nebula background (home-dark) */
  variant?: "light" | "dark";
};

export function Card({
  href,
  download = false,
  children,
  className = "",
  variant = "light",
}: CardProps) {
  const base =
    variant === "dark"
      ? "rounded-xl border border-white/15 bg-white/[0.06] backdrop-blur-md shadow-none transition-all duration-300 hover:-translate-y-1 hover:border-violet-400/40 hover:shadow-[0_0_24px_rgba(126,58,237,0.15)] motion-reduce:hover:translate-y-0"
      : "rounded-lg bg-white/80 p-6 shadow-[var(--shadow-soft)] transition-shadow hover:shadow-[var(--shadow-lift)]";
  const cn = `${base} ${className}`.trim();
  if (href) {
    if (download) {
      return (
        <a href={href} download className={cn}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={cn}>
        {children}
      </Link>
    );
  }
  return <div className={cn}>{children}</div>;
}
