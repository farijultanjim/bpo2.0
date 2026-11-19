"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import { prefersReducedMotion } from "../lib/motion";
import { useMagnetic } from "../lib/use-magnetic";

export function CraftSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const ctaRef = useMagnetic<HTMLAnchorElement>(0.26);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const section = sectionRef.current;
    const image = imageRef.current;
    if (!section || !image) return;
    if (prefersReducedMotion()) return;

    const context = gsap.context(() => {
      gsap.from("[data-reveal]", {
        y: 80,
        opacity: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: section,
          start: "top 72%",
        },
      });

      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        gsap.fromTo(
          image,
          { width: "74%", borderRadius: "3rem" },
          {
            width: "100%",
            borderRadius: "0rem",
            ease: "none",
            scrollTrigger: {
              trigger: image,
              start: "top 88%",
              end: "center 45%",
              scrub: 1,
            },
          },
        );
      });

      mm.add("(max-width: 767px)", () => {
        gsap.fromTo(
          image,
          { width: "92%", borderRadius: "1.25rem" },
          {
            width: "100%",
            borderRadius: "0rem",
            ease: "none",
            scrollTrigger: {
              trigger: image,
              start: "top 88%",
              end: "center 45%",
              scrub: 1,
            },
          },
        );
      });

      gsap.fromTo(
        "[data-parallax-image]",
        { yPercent: -10, scale: 1.12 },
        {
          yPercent: 10,
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: image,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    }, section);

    return () => context.revert();
  }, []);

  return (
    <section id="infrastructure" ref={sectionRef} className="overflow-hidden bg-paper text-ink">
      <div className="mx-auto max-w-site px-5 pb-20 pt-24 sm:px-8 sm:pt-32 lg:px-12 lg:pb-32 lg:pt-44">
        <div className="grid gap-8 border-t border-ink/20 pt-6 lg:grid-cols-12 lg:gap-16">
          {/* Left Column: Kicker + Quick Operational Badges */}
          <div data-reveal className="lg:col-span-4 space-y-6">
            <div className="flex items-center gap-3">
              <span className="size-2 rounded-full bg-accent" />
              <p className="text-xs font-bold uppercase tracking-widest text-ink">
                Dedicated Capacity
              </p>
            </div>
            <div className="hidden lg:block space-y-3 pt-2">
              <div className="rounded-xl border border-ink/10 bg-canvas/60 p-4">
                <p className="text-xs font-bold uppercase tracking-wider text-ink/60">
                  Global Hubs
                </p>
                <p className="mt-1 text-sm font-bold text-ink">
                  New York • Dubai • Dhaka • Singapore
                </p>
              </div>
              <div className="rounded-xl border border-ink/10 bg-canvas/60 p-4">
                <p className="text-xs font-bold uppercase tracking-wider text-ink/60">
                  Shift Coverage
                </p>
                <p className="mt-1 text-sm font-bold text-ink">
                  Real-time US-hours operational sync
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Heading + Value Statement + Dependable Pillars + CTA */}
          <div className="lg:col-span-8 space-y-8">
            <h2 className="section-heading">
              <span data-reveal className="block">Always on.</span>
              <span data-reveal className="block text-stroke">Every shift.</span>
            </h2>

            <p
              data-reveal
              className="max-w-3xl text-base font-medium leading-relaxed text-ink/75 sm:text-lg"
            >
              Extend your core team overseas without the hiring lag, night-shift
              burnout, or turnover. 500+ domain specialists work directly in your
              software stack during US business hours—clearing shipment
              backlogs, monitoring dispatch, and resolving carrier exceptions before
              your morning starts.
            </p>

            {/* Dependable Trust Pillars */}
            <div data-reveal className="grid gap-4 sm:grid-cols-3 pt-2">
              <div className="rounded-2xl border border-ink/15 bg-canvas/50 p-5">
                <p className="text-xs font-extrabold uppercase tracking-wider text-ink/50">
                  01 / Coverage
                </p>
                <h3 className="mt-2 font-bricolage text-lg font-bold uppercase tracking-tight text-ink">
                  US Working Hours
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-ink/70">
                  Multi-shift teams operating in real time across EST, CST, and PST business hours.
                </p>
              </div>

              <div className="rounded-2xl border border-ink/15 bg-canvas/50 p-5">
                <p className="text-xs font-extrabold uppercase tracking-wider text-ink/50">
                  02 / Software
                </p>
                <h3 className="mt-2 font-bricolage text-lg font-bold uppercase tracking-tight text-ink">
                  Your Own Tools
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-ink/70">
                  We operate directly inside your TMS, ERP, carrier portals, email, and Slack channels.
                </p>
              </div>

              <div className="rounded-2xl border border-ink/15 bg-canvas/50 p-5">
                <p className="text-xs font-extrabold uppercase tracking-wider text-ink/50">
                  03 / Savings
                </p>
                <h3 className="mt-2 font-bricolage text-lg font-bold uppercase tracking-tight text-ink">
                  Up to 72% Lower Cost
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-ink/70">
                  No payroll taxes, healthcare, 401K, or recruiting overhead for every added FTE.
                </p>
              </div>
            </div>

            {/* Direct Action Button */}
            <div data-reveal className="pt-2">
              <a
                ref={ctaRef}
                href="#services"
                className="button-accent group inline-flex items-center gap-5 rounded-full py-2 pl-5 pr-2 text-sm font-bold"
              >
                Explore services
                <span className="grid size-10 place-items-center rounded-full bg-ink text-paper transition-transform duration-500 ease-out group-hover:rotate-45">
                  <ArrowUpRight size={18} strokeWidth={2} />
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div
        ref={imageRef}
        className="relative mx-auto h-cinematic min-h-cinematic max-w-wide overflow-hidden mb-20"
      >
        <div data-parallax-image className="absolute parallax-bleed">
          <Image
            src="/images/bpo/global-operations.webp"
            alt="Spectra collaborative operations center"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-linear-to-t from-ink/85 via-ink/25 to-transparent" />
        <div className="absolute inset-x-5 bottom-7 flex items-end justify-between text-paper sm:inset-x-8 lg:inset-x-12 lg:bottom-10">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-accent mb-2">
              Four Worldwide Hubs
            </p>
            <p className="max-w-xs text-sm font-semibold uppercase leading-relaxed tracking-wider text-paper/90">
              Dubai • New York • Dhaka • Singapore
            </p>
          </div>
          <p className="font-bricolage text-5xl font-semibold tracking-tighter sm:text-7xl">
            24/7
          </p>
        </div>
      </div>
    </section>
  );
}
