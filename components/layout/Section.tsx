export function Section({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`py-16 md:py-24 px-6 md:px-12 ${className}`}>
      {children}
    </section>
  );
}
