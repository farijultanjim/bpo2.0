"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MOTION, prefersReducedMotion, registerMotionEasings } from "@/app/lib/motion";
import { CtaButton } from "@/components/ui/CtaButton";

export function Craft() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    registerMotionEasings();
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
        ease: MOTION.signature.gsap,
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
    <section id="infrastructure" ref={sectionRef} className="overflow-hidden bg-background text-foreground">
      <div className="mx-auto max-w-site px-5 pb-16 pt-16 sm:px-8 sm:pb-20 sm:pt-24 lg:px-12 lg:pb-24 lg:pt-28">
        <div className="grid gap-8 border-t border-foreground/20 pt-6 lg:grid-cols-12 lg:gap-16">
          {/* Left Column: Kicker + Quick Operational Badges */}
          <div data-reveal className="lg:col-span-4 space-y-6">
            <div className="flex items-center gap-3">
              <span className="size-2 rounded-full bg-accent" />
              <p className="text-xs font-bold uppercase tracking-widest text-foreground">
                Enterprise Infrastructure
              </p>
            </div>
            <div className="hidden lg:block space-y-3 pt-2">
              <div className="rounded-xl border border-foreground/10 bg-canvas/60 p-4">
                <p className="text-xs font-bold uppercase tracking-wider text-foreground/60">
                  Global Hubs
                </p>
                <p className="mt-1 text-sm font-bold text-foreground">
                  New York • Dubai • Dhaka
                </p>
              </div>
              <div className="rounded-xl border border-foreground/10 bg-canvas/60 p-4">
                <p className="text-xs font-bold uppercase tracking-wider text-foreground/60">
                  Shift Coverage
                </p>
                <p className="mt-1 text-sm font-bold text-foreground">
                  Real-time US, UK, CA, AU &amp; UAE shift sync
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Heading + Infrastructure Statement + Trust Pillars + CTA */}
          <div className="lg:col-span-8 space-y-7">
            <h2 className="section-heading">
              <span data-reveal className="block">Always on.</span>
              <span data-reveal className="block text-stroke">Every shift.</span>
            </h2>

            <p
              data-reveal
              className="max-w-3xl text-base font-medium leading-relaxed text-foreground/75 sm:text-lg"
            >
              Enterprise-grade operations built for high-volume freight forwarders
              and 3PLs. Our facilities run on redundant dual-fiber networks, strict
              VDI/VPN security, and TMS-certified specialists—ensuring uninterrupted
              execution across North America, UK, Australia, and Middle East shifts.
            </p>

            {/* Infrastructure Trust Pillars */}
            <div data-reveal className="grid gap-3.5 sm:grid-cols-3 pt-1">
              <div className="rounded-2xl border border-foreground/15 bg-canvas/50 p-5">
                <p className="text-xs font-extrabold uppercase tracking-wider text-foreground/50">
                  01 / Security
                </p>
                <h3 className="mt-2 font-bricolage text-lg font-bold uppercase tracking-tight text-foreground">
                  SOC 2 & ISO Aligned
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-foreground/70">
                  Clean-desk facilities, restricted USB access, and encrypted VDI/VPN tunnels for your data.
                </p>
              </div>

              <div className="rounded-2xl border border-foreground/15 bg-canvas/50 p-5">
                <p className="text-xs font-extrabold uppercase tracking-wider text-foreground/50">
                  02 / Redundancy
                </p>
                <h3 className="mt-2 font-bricolage text-lg font-bold uppercase tracking-tight text-foreground">
                  99.98% Uptime
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-foreground/70">
                  Dual-ISP enterprise fiber, automated failover, and 24/7 backup power across all hubs.
                </p>
              </div>

              <div className="rounded-2xl border border-foreground/15 bg-canvas/50 p-5">
                <p className="text-xs font-extrabold uppercase tracking-wider text-foreground/50">
                  03 / Certified
                </p>
                <h3 className="mt-2 font-bricolage text-lg font-bold uppercase tracking-tight text-foreground">
                  TMS-Ready Talent
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-foreground/70">
                  Pre-vetted specialists trained in CargoWise, McLeod, Descartes, and carrier portals.
                </p>
              </div>
            </div>

            {/* Direct Action Button */}
            <div data-reveal className="pt-1">
              <CtaButton href="#contact">
                Book a discovery call
              </CtaButton>
            </div>
          </div>
        </div>
      </div>

      <div
        ref={imageRef}
        className="relative mx-auto h-[52svh] min-h-[24rem] sm:h-[62svh] lg:h-[70svh] lg:min-h-[34rem] max-w-[120rem] overflow-hidden mb-16 sm:mb-20"
      >
        <div data-parallax-image className="absolute -top-[12%] -bottom-[12%] inset-x-0">
          <Image
            src="/images/bpo/global-operations.webp"
            alt="Spectra collaborative operations center"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-linear-to-t from-primary/85 via-primary/25 to-transparent" />
        <div className="absolute inset-x-5 bottom-7 flex items-end justify-between text-background sm:inset-x-8 lg:inset-x-12 lg:bottom-10">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-accent mb-2">
              Three Worldwide Hubs
            </p>
            <p className="max-w-xs text-sm font-semibold uppercase leading-relaxed tracking-wider text-background/90">
              New York • Dubai • Dhaka
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

export default Craft;
export { Craft as CraftSection };
