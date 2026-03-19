import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { CTASection } from "@/components/sections/CTASection";
import { FAQSection } from "@/components/sections/FAQSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { ProductPreviewSection } from "@/components/sections/ProductPreviewSection";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { UseCasesSection } from "@/components/sections/UseCasesSection";
import { VisualBreakSection } from "@/components/sections/VisualBreakSection";

export default function HomePage() {
  return (
    <main className="relative overflow-hidden bg-ink text-copy">
      <Navbar />
      <HeroSection />
      <TrustStrip />
      <HowItWorksSection />
      <ProductPreviewSection />
      <FeaturesSection />
      <UseCasesSection />
      <VisualBreakSection />
      <FAQSection />
      <CTASection />
      <Footer />
    </main>
  );
}

