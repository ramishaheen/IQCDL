import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AssistantWidget } from "@/components/assistant/AssistantWidget";
import { ThemeScope } from "@/components/providers/ThemeProvider";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeScope>
      <Navbar />
      <main className="pt-20">{children}</main>
      <Footer />
      <AssistantWidget />
    </ThemeScope>
  );
}
