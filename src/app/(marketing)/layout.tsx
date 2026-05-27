import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AssistantWidget } from "@/components/assistant/AssistantWidget";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen">
      <Navbar />
      <main className="pt-20">{children}</main>
      <Footer />
      <AssistantWidget />
    </div>
  );
}
