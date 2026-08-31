import { DividerOrnament } from "@/components/ui/DividerOrnament";
import { FloatingParticles } from "@/components/ui/FloatingParticles";

export default function ShopLayout({
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
