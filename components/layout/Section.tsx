export function Section({
  children,
  className = "",
  /** Less vertical padding — good for stacked home sections */
  tight = false,
}: {
  children: React.ReactNode;
  className?: string;
  tight?: boolean;
}) {
  const py = tight ? "py-6 md:py-10" : "py-16 md:py-24";
  return (
    <section className={`${py} px-6 md:px-12 ${className}`}>
      {children}
    </section>
  );
}
