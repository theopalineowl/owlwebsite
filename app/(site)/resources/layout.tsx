import { DividerOrnament } from "@/components/ui/DividerOrnament";
import { FloatingParticles } from "@/components/ui/FloatingParticles";

export default function ResourcesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="home-dark min-h-screen">
      <FloatingParticles />
      <DividerOrnament />
      {children}
    </div>
  );
}
