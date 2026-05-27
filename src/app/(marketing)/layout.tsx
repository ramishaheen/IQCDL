import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AssistantWidget } from "@/components/assistant/AssistantWidget";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="theme-dark relative min-h-screen bg-[#05060f]">
      <Navbar />
      <main className="pt-20">{children}</main>
      <Footer />
      <AssistantWidget />
    </div>
  );
}
