import { SHOP_ALL_URL } from "@/lib/shop/decks";

const gold =
  "inline-flex items-center justify-center rounded-full px-10 py-3 text-sm font-medium uppercase tracking-[0.18em] text-[var(--text-primary)] bg-gradient-to-b from-[var(--accent-gold-muted)] to-[var(--accent-gold)] shadow-[var(--shadow-soft)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[var(--shadow-lift)]";

export function ShopButton({ className = "" }: { className?: string }) {
  return (
    <a
      href={SHOP_ALL_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`${gold} ${className}`.trim()}
    >
      Shop
    </a>
  );
}
