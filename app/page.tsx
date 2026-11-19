import { Hero } from "@/components/home/Hero";
import { Craft } from "@/components/home/Craft";
import { Services } from "@/components/home/Services";
import { Process } from "@/components/home/Process";
import { Metrics } from "@/components/home/Metrics";
import { Testimonials } from "@/components/home/Testimonials";
import { Faq } from "@/components/home/Faq";
import { Contact } from "@/components/home/Contact";

export default function Home() {
  return (
    <main id="top">
      <Hero />
      <Craft />
      <Services />
      <Process />
      <Metrics />
      <Testimonials />
      <Faq />
      <Contact />
    </main>
  );
}
