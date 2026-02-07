export function Badge({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-0.5 text-xs font-medium text-[var(--text-primary)] bg-[var(--accent-gold-muted)]/20 ${className}`}
    >
      {children}
    </span>
  );
}
