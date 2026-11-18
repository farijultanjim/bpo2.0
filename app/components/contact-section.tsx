"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUp, ArrowUpRight, Mail, Phone } from "lucide-react";
import { prefersReducedMotion } from "../lib/motion";
import { useMagnetic } from "../lib/use-magnetic";

export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const ctaRef = useMagnetic<HTMLAnchorElement>(0.26);

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
      className="relative overflow-hidden bg-ink px-5 pb-8 pt-24 text-paper sm:px-8 sm:pt-32 lg:px-12 lg:pt-44"
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 1440 620"
        fill="none"
        className="pointer-events-none absolute inset-x-0 bottom-0 w-full text-paper opacity-10"
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

        <div className="mt-14 flex flex-col gap-10 border-t border-paper/20 pt-7 lg:flex-row lg:items-end lg:justify-between">
          <div data-contact-detail>
            <p className="max-w-lg text-base font-medium leading-relaxed text-paper/75 sm:text-lg">
              Connect with our solutions team. We&apos;ll evaluate your current
              operations, outline your offshore roadmap, and provide a fixed FTE
              savings forecast.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                ref={ctaRef}
                href="mailto:contact@spectra.com"
                className="button-accent group inline-flex items-center gap-4 rounded-full py-3 pl-5 pr-3 text-sm font-bold"
              >
                <Mail size={18} strokeWidth={1.8} />
                Get in touch
                <ArrowUpRight
                  size={18}
                  strokeWidth={1.8}
                  className="transition-transform duration-500 group-hover:rotate-45"
                />
              </a>
              <a
                href="tel:+18005927489"
                className="inline-flex items-center gap-3 rounded-full border border-paper/25 px-5 py-3 text-sm font-bold transition-colors duration-300 hover:bg-paper hover:text-ink"
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
            className="group grid size-16 place-items-center rounded-full border border-paper/25 transition-colors duration-300 hover:bg-paper hover:text-ink lg:size-20"
          >
            <ArrowUp
              size={23}
              strokeWidth={1.6}
              className="transition-transform duration-500 group-hover:-translate-y-1"
            />
          </a>
        </div>

        <footer className="mt-24 grid gap-8 border-t border-paper/20 py-7 text-xs font-bold uppercase tracking-wider text-paper/65 sm:mt-32 sm:grid-cols-3 lg:mt-44">
          <p>© 2026 Spectra Operations Inc.</p>
          <div className="flex gap-6 sm:justify-center">
            <a href="#services" className="transition-colors hover:text-paper">
              Services
            </a>
            <a href="#process" className="transition-colors hover:text-paper">
              Process
            </a>
            <a href="#results" className="transition-colors hover:text-paper">
              Proof
            </a>
            <a href="#faq" className="transition-colors hover:text-paper">
              FAQ
            </a>
          </div>
          <p className="sm:text-right">Outsourcing with savings.</p>
        </footer>
      </div>
    </section>
  );
}
