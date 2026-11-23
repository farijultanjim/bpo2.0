"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUp, Phone } from "lucide-react";
import { prefersReducedMotion } from "@/app/lib/motion";
import { CtaButton } from "@/components/ui/CtaButton";

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const section = sectionRef.current;
    if (!section) return;
    if (prefersReducedMotion()) return;

    const context = gsap.context(() => {
      gsap.from("[data-contact-line] > span", {
        yPercent: 110,
        duration: 1.35,
        stagger: 0.1,
        ease: "power4.out",
        scrollTrigger: { trigger: section, start: "top 68%" },
      });

      gsap.from("[data-contact-detail]", {
        y: 35,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: section, start: "top 58%" },
      });

      gsap.fromTo(
        "[data-contact-roof]",
        { strokeDashoffset: 1 },
        {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            end: "bottom bottom",
            scrub: 1,
          },
        },
      );
    }, section);

    return () => context.revert();
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative overflow-hidden bg-primary px-5 pb-20 pt-24 text-background sm:px-8 sm:pb-28 sm:pt-32 lg:px-12 lg:pb-36 lg:pt-44"
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 1440 620"
        fill="none"
        className="pointer-events-none absolute inset-x-0 bottom-0 w-full text-background opacity-10"
      >
        <path
          data-contact-roof
          pathLength="1"
          strokeDasharray="1"
          d="M-50 590 360 185l230 225L844 42l646 548M360 185v405M844 42v548"
          stroke="currentColor"
          strokeWidth="2"
        />
      </svg>

      <div className="relative mx-auto max-w-site">
        <div className="flex items-center gap-3">
          <span className="size-2 rounded-full bg-accent" />
          <p className="text-xs font-bold uppercase tracking-widest">
            Start with certainty
          </p>
        </div>

        <div className="mt-14 font-bricolage text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-semibold uppercase leading-none tracking-tighter">
          <div data-contact-line className="overflow-hidden py-1">
            <span className="block">Ready when</span>
          </div>
          <div data-contact-line className="overflow-hidden py-1">
            <span className="block text-accent">your scale is.</span>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-10 border-t border-white/15 pt-7 lg:flex-row lg:items-end lg:justify-between">
          <div data-contact-detail>
            <p className="max-w-lg text-base font-medium leading-relaxed text-background/75 sm:text-lg">
              Connect with our solutions team. We&apos;ll evaluate your current
              operations, outline your offshore roadmap, and provide a fixed FTE
              savings forecast.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <CtaButton
                href="mailto:contact@spectra.com"
              >
                Get in touch
              </CtaButton>
              <a
                href="tel:+18005927489"
                className="inline-flex items-center gap-3 rounded-full border border-white/20 px-5 py-2.5 text-sm font-bold transition-colors duration-300 hover:bg-background hover:text-primary cursor-pointer"
              >
                <Phone size={17} strokeWidth={1.8} />
                +1 (800) 592-7489
              </a>
            </div>
          </div>

          <a
            data-contact-detail
            href="#top"
            aria-label="Back to top"
            className="group grid size-16 place-items-center rounded-full border border-white/20 transition-colors duration-300 hover:bg-background hover:text-primary lg:size-20"
          >
            <ArrowUp
              size={23}
              strokeWidth={1.6}
              className="transition-transform duration-500 group-hover:-translate-y-1"
            />
          </a>
        </div>
      </div>
    </section>
  );
}

export default Contact;
export { Contact as ContactSection };
