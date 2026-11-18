import { CraftSection } from "./components/craft-section";
import { ContactSection } from "./components/contact-section";
import { FaqSection } from "./components/faq-section";
import { HeroSection } from "./components/hero-section";
import { ProcessSection } from "./components/process-section";
import { ResultsSection } from "./components/results-section";
import { ServicesSection } from "./components/services-section";
import { SiteHeader } from "./components/site-header";
import { TestimonialsSection } from "./components/testimonials-section";

export default function Home() {
  return (
    <main id="top">
      <SiteHeader />
      <HeroSection />
      <CraftSection />
      <ServicesSection />
      <ProcessSection />
      <ResultsSection />
      <TestimonialsSection />
      <FaqSection />
      <ContactSection />
    </main>
  );
}
