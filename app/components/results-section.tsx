"use client";

import { useEffect, useRef, type ComponentType } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  BadgeCheck,
  Clock3,
  ShieldCheck,
  Star,
  type LucideProps,
} from "lucide-react";
import { prefersReducedMotion } from "../lib/motion";

type Result = {
  value: number;
  decimals: number;
  suffix: string;
  label: string;
  icon: ComponentType<LucideProps>;
};

const results: Result[] = [
  {
    value: 72,
    decimals: 0,
    suffix: "%",
    label: "Lower salary cost per offshore FTE",
    icon: ShieldCheck,
  },
  {
    value: 47,
    decimals: 0,
    suffix: "k",
    label: "Average annual savings per hire",
    icon: Clock3,
  },
  {
    value: 500,
    decimals: 0,
    suffix: "+",
    label: "Domain experts in global logistics",
    icon: Star,
  },
  {
    value: 24,
    decimals: 0,
    suffix: "/7",
    label: "Continuous operations & US hours coverage",
    icon: BadgeCheck,
  },
];

const format = (value: number, decimals: number) => value.toFixed(decimals);

export function ResultsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const section = sectionRef.current;
    if (!section) return;
    if (prefersReducedMotion()) return;

    const context = gsap.context(() => {
      gsap.from("[data-results-title] > span", {
        yPercent: 110,
        rotate: 2,
        duration: 1.2,
        stagger: 0.08,
        ease: "power4.out",
        scrollTrigger: { trigger: section, start: "top 68%" },
      });

      gsap.from("[data-result-row]", {
        x: 90,
        opacity: 0,
        duration: 1,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "[data-results-list]",
          start: "top 78%",
        },
      });

      gsap.fromTo(
        "[data-results-rule]",
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: "[data-results-list]",
            start: "top 72%",
            end: "bottom 68%",
            scrub: 0.8,
          },
        },
      );

      // Count each figure up from zero. The markup already renders the final
      // value, so the numbers stay correct without JS.
      gsap.utils
        .toArray<HTMLElement>("[data-count]")
        .forEach((node, index) => {
          const { value, decimals } = results[index];
          const counter = { value: 0 };

          gsap.to(counter, {
            value,
            duration: 1.9,
            ease: "power2.out",
            delay: index * 0.12,
            onUpdate() {
              node.textContent = format(counter.value, decimals);
            },
            scrollTrigger: {
              trigger: "[data-results-list]",
              start: "top 78%",
            },
          });
        });
    }, section);

    return () => context.revert();
  }, []);

  return (
    <section
      id="results"
      ref={sectionRef}
      className="overflow-clip bg-paper px-5 py-24 text-ink sm:px-8 sm:py-32 lg:px-12 lg:py-44"
    >
      <div className="relative mx-auto max-w-site">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          <div className="lg:sticky lg:top-32 lg:h-fit">
            <div className="mb-8 flex items-center gap-3">
              <span className="size-2 rounded-full bg-accent" />
              <p className="text-xs font-bold uppercase tracking-widest">
                Built on proof
              </p>
            </div>

            <h2 data-results-title className="section-heading">
              <span className="block overflow-hidden pb-1">
                <span className="block">Numbers that</span>
              </span>
              <span className="block overflow-hidden pb-1">
                <span className="block text-stroke">hold weight.</span>
              </span>
            </h2>

            <p className="mt-8 max-w-md text-base font-medium leading-relaxed text-ink/70 sm:text-lg">
              Trust is earned through measurable cost reduction, strict SLA
              adherence, and audited operational security.
            </p>
          </div>

          <div data-results-list className="relative">
            <div
              data-results-rule
              className="absolute inset-x-0 top-0 h-px origin-left bg-ink"
            />
            {results.map((result) => {
              const Icon = result.icon;

              return (
                <article
                  data-result-row
                  key={result.label}
                  className="group grid min-h-52 grid-cols-2 items-center gap-8 border-b border-ink/20 py-8 sm:grid-cols-3"
                >
                  <p className="font-bricolage text-6xl sm:text-7xl lg:text-8xl font-semibold leading-none tracking-tighter tabular-nums">
                    <span data-count>{format(result.value, result.decimals)}</span>
                    <span>{result.suffix}</span>
                  </p>
                  <p className="hidden max-w-xs text-sm font-semibold leading-relaxed text-ink/70 sm:block sm:text-base">
                    {result.label}
                  </p>
                  <span className="grid size-14 place-items-center justify-self-end rounded-full border border-ink/20 transition-all duration-500 group-hover:rotate-6 group-hover:border-ink group-hover:bg-ink group-hover:text-accent">
                    <Icon size={22} strokeWidth={1.6} />
                  </span>
                  <p className="col-span-2 max-w-xs text-sm font-semibold leading-relaxed text-ink/70 sm:hidden">
                    {result.label}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
