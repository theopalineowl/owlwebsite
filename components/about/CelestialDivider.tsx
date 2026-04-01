export function CelestialDivider({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex items-center gap-4 py-10 md:py-12 ${className}`}
      role="separator"
      aria-hidden
    >
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-200/35 to-transparent" />
      <svg
        className="shrink-0 text-amber-200/90 drop-shadow-[0_0_12px_rgba(251,191,36,0.45)]"
        width={26}
        height={26}
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden
      >
        <path d="M12 1.5l2.2 6.8h7.1l-5.7 4.1 2.2 6.8L12 15.1l-5.8 4.1 2.2-6.8L2.7 8.3h7.1L12 1.5z" />
      </svg>
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-200/35 to-transparent" />
    </div>
  );
}
