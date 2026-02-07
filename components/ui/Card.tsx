import Link from "next/link";

type CardProps = {
  href?: string;
  children: React.ReactNode;
  className?: string;
};

export function Card({ href, children, className = "" }: CardProps) {
  const cn = `rounded-lg bg-white/80 p-6 shadow-[var(--shadow-soft)] transition-shadow hover:shadow-[var(--shadow-lift)] ${className}`;
  if (href) {
    return <Link href={href} className={cn}>{children}</Link>;
  }
  return <div className={cn}>{children}</div>;
}
