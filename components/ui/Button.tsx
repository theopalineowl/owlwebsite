import Link from "next/link";

type ButtonProps = {
  href?: string;
  children: React.ReactNode;
  className?: string;
  type?: "button" | "submit";
};

const base =
  "inline-flex items-center justify-center rounded-full px-8 py-3 text-sm font-medium text-[var(--text-primary)] bg-gradient-to-b from-[var(--accent-gold-muted)] to-[var(--accent-gold)] shadow-[var(--shadow-soft)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[var(--shadow-lift)]";

export function Button({
  href,
  children,
  className = "",
  type = "button",
}: ButtonProps) {
  if (href) {
    return (
      <Link href={href} className={`${base} ${className}`}>
        {children}
      </Link>
    );
  }
  return (
    <button type={type} className={`${base} ${className}`}>
      {children}
    </button>
  );
}
