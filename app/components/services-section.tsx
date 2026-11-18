"use client";

import Image from "next/image";
import { useEffect, useRef, type ComponentType } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowUpRight,
  Headset,
  Plane,
  Truck,
  type LucideProps,
} from "lucide-react";
import { prefersReducedMotion } from "../lib/motion";

type Service = {
  number: string;
  title: string;
  description: string;
  image: string;
  icon: ComponentType<LucideProps>;
};

const services: Service[] = [
  {
    number: "01",
    title: "Freight operations",
    description:
      "End-to-end air and ocean export/import operations, booking confirmations, bill of lading documentation, and customs milestone tracking.",
    image: "/images/roofing/service-roof-replacement.webp",
    icon: Plane,
  },
  {
    number: "02",
    title: "Dispatch & trucking",
    description:
      "Dedicated route coordination, load tendering, driver check calls, exception handling, and 24/7 status updates across US time zones.",
    image: "/images/roofing/service-roof-repair.webp",
    icon: Truck,
  },
  {
    number: "03",
    title: "Control tower & support",
    description:
      "24/7 customer service, track-and-trace visibility, email and EDI exception management directly inside your enterprise TMS tools.",
    image: "/images/roofing/service-roof-inspection.webp",
    icon: Headset,
  },
];

export function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const section = sectionRef.current;
    if (!section) return;
    if (prefersReducedMotion()) return;

    const context = gsap.context(() => {
      gsap.from("[data-services-heading]", {
        yPercent: 105,
        duration: 1.25,
        ease: "power4.out",
        scrollTrigger: { trigger: section, start: "top 72%" },
      });

      gsap.fromTo(
        "[data-roof-path]",
        { strokeDashoffset: 1 },
        {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
            end: "bottom 80%",
            scrub: 1,
          },
        },
      );

      // The cards stack: each one pins at the top and the next slides over it,
      // pressing the outgoing card back rather than simply scrolling it away.
      //
      // Driven from live geometry rather than a ScrollTrigger per card: a
      // sticky element's measured position depends on scroll, so the cached
      // start/end a trigger records are wrong as soon as it sticks.
      const cards = gsap.utils.toArray<HTMLElement>("[data-service]");

      const syncStack = () => {
        cards.forEach((card, index) => {
          const next = cards[index + 1];
          if (!next) {
            gsap.set(card, { scale: 1, opacity: 1 });
            return;
          }

          const enters = window.innerHeight;
          const parks = parseFloat(getComputedStyle(next).top) || 0;
          const progress = gsap.utils.clamp(
            0,
            1,
            (enters - next.getBoundingClientRect().top) / (enters - parks),
          );

          gsap.set(card, {
            scale: 1 - 0.1 * progress,
            opacity: 1 - 0.6 * progress,
            transformOrigin: "center top",
          });
        });
      };

      ScrollTrigger.create({
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        onUpdate: syncStack,
        onRefresh: syncStack,
      });

      syncStack();
    }, section);

    return () => context.revert();
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative bg-ink px-5 py-24 text-paper sm:px-8 sm:py-32 lg:px-12 lg:py-44"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <svg
          aria-hidden="true"
          viewBox="0 0 1200 260"
          fill="none"
          className="absolute -left-12 top-20 w-full text-paper opacity-10"
        >
          <path
            data-roof-path
            pathLength="1"
            strokeDasharray="1"
            d="M8 246 302 45l180 123L661 8l531 238M302 45v201M661 8v238"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      </div>

      <div className="relative mx-auto max-w-site">
        <div className="grid gap-14 lg:grid-cols-3 lg:gap-20">
          <div className="lg:col-span-1 lg:sticky lg:top-24 lg:h-fit lg:self-start">
            <div className="mb-8 flex items-center gap-3">
              <span className="size-2 rounded-full bg-accent" />
              <p className="text-xs font-bold uppercase tracking-widest">
                What we do
              </p>
            </div>
            <div className="overflow-hidden">
              <h2 data-services-heading className="section-heading">
                Covering
                <br />
                every shift.
              </h2>
            </div>
            <p className="mt-8 max-w-sm text-sm font-medium leading-relaxed text-paper/70 sm:text-base">
              From back-office tracking to full 24/7 dispatch, dedicated domain
              specialists embedded into your software stack.
            </p>
          </div>

          <div
            data-services-list
            className="lg:col-span-2 space-y-6 lg:pt-24"
            style={{ "--stack-base": "6rem" } as React.CSSProperties}
          >
            {services.map((service, index) => {
              const Icon = service.icon;

              return (
                <article
                  data-service
                  key={service.number}
                  style={{ top: `calc(var(--stack-base, 6rem) + ${index * 1.25}rem)` }}
                  className="group sticky min-h-96 sm:min-h-128 overflow-hidden rounded-3xl border border-paper/15 bg-canvas shadow-2xl shadow-ink/40"
                >
                  <Image
                    src={service.image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 62vw, 100vw"
                    className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-ink/10 via-ink/10 to-ink/90" />

                  <div className="absolute inset-x-0 top-0 flex items-center justify-between p-6 sm:p-8">
                    <span className="text-xs font-bold tracking-widest">
                      / {service.number}
                    </span>
                    <span className="grid size-12 place-items-center rounded-full border border-paper/30 bg-ink/20 backdrop-blur-md transition-colors duration-500 group-hover:bg-accent group-hover:text-ink">
                      <Icon size={20} strokeWidth={1.7} />
                    </span>
                  </div>

                  <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                    <div className="flex items-end justify-between gap-6 border-t border-paper/25 pt-6">
                      <div>
                        <h3 className="font-bricolage text-3xl font-semibold uppercase tracking-tight sm:text-5xl">
                          {service.title}
                        </h3>
                        <p className="mt-4 max-w-xl text-sm leading-relaxed text-paper/75 sm:text-base">
                          {service.description}
                        </p>
                      </div>
                      <span className="hidden size-14 shrink-0 place-items-center rounded-full bg-accent text-ink transition-transform duration-500 group-hover:rotate-45 sm:grid">
                        <ArrowUpRight size={21} strokeWidth={1.8} />
                      </span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
