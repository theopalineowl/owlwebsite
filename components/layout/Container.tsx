export function Container({
  children,
  className = "",
  as: As = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "article" | "main";
}) {
  return (
    <As className={`max-w-5xl mx-auto ${className}`}>
      {children}
    </As>
  );
}
