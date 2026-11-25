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
import { MOTION, prefersReducedMotion, registerMotionEasings } from "@/app/lib/motion";
import { CtaButton } from "@/components/ui/CtaButton";

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

export function Metrics() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    registerMotionEasings();
    const section = sectionRef.current;
    if (!section) return;
    if (prefersReducedMotion()) return;

    const context = gsap.context(() => {
      gsap.from("[data-results-title] > span", {
        yPercent: 110,
        rotate: 2,
        duration: 1.2,
        stagger: 0.08,
        ease: MOTION.signature.gsap,
        scrollTrigger: { trigger: section, start: "top 68%" },
      });

      gsap.from("[data-result-row]", {
        y: 32,
        opacity: 0,
        duration: 0.85,
        stagger: 0.1,
        ease: MOTION.signature.gsap,
        scrollTrigger: {
          trigger: "[data-results-list]",
          start: "top 82%",
        },
      });

      gsap.fromTo(
        "[data-results-rule]",
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: MOTION.scrub.gsap,
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
            ease: MOTION.signature.gsap,
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
      className="relative overflow-clip bg-background px-5 py-16 text-foreground sm:px-8 sm:py-24 lg:px-12 lg:py-28"
    >
      {/* Anchor target for Lenis / Navigation */}
      <div id="metrics" className="absolute -top-16 pointer-events-none" />
      <div className="relative mx-auto max-w-site">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16 items-start">
          <div className="lg:col-span-5 lg:sticky lg:top-28 lg:h-fit">
            <div className="mb-6 flex items-center gap-3">
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

            <p className="mt-6 max-w-md text-sm font-medium leading-relaxed text-foreground/70 sm:text-base">
              Trust is earned through measurable cost reduction, strict SLA
              adherence, and audited operational security.
            </p>

            {/* Compact ROI Benchmark Strip */}
            <div className="mt-7 max-w-md rounded-2xl border border-foreground/15 bg-canvas/60 p-4 sm:p-5">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-foreground/55">
                    Annual FTE Benchmark
                  </p>
                  <p className="mt-1 text-sm font-bold text-foreground">
                    <span className="line-through text-foreground/45 mr-2">$65k+ US</span>
                    <span className="text-primary">~$18k Offshore</span>
                  </p>
                </div>
                <span className="shrink-0 rounded-full bg-accent px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-primary">
                  Save 72%
                </span>
              </div>
              <div className="mt-4 pt-3.5 border-t border-foreground/10">
                <CtaButton href="#contact" variant="dark" className="w-full justify-between">
                  Calculate your savings
                </CtaButton>
              </div>
            </div>
          </div>

          <div data-results-list className="relative lg:col-span-7">
            <div
              data-results-rule
              className="absolute inset-x-0 top-0 h-px origin-left bg-primary"
            />
            {results.map((result, idx) => {
              const Icon = result.icon;

              return (
                <article
                  data-result-row
                  key={result.label}
                  className="group grid grid-cols-[1fr_auto] items-center gap-x-6 gap-y-2 border-b border-foreground/15 px-3 py-5 transition-colors duration-300 ease-[var(--ease-micro)] hover:bg-canvas/50 sm:grid-cols-[auto_1fr_auto] sm:gap-8 sm:px-4 sm:py-6"
                >
                  <div className="flex items-baseline gap-3 sm:min-w-[11.5rem]">
                    <span className="text-[11px] font-mono font-bold text-foreground/35">
                      0{idx + 1}
                    </span>
                    <p className="font-bricolage text-4xl sm:text-5xl lg:text-6xl font-semibold leading-none tracking-tighter tabular-nums text-foreground">
                      <span data-count>{format(result.value, result.decimals)}</span>
                      <span className="text-primary/80 transition-colors duration-300 group-hover:text-primary">
                        {result.suffix}
                      </span>
                    </p>
                  </div>

                  <p className="hidden max-w-xs text-sm font-semibold leading-relaxed text-foreground/75 sm:block">
                    {result.label}
                  </p>

                  <span className="grid size-11 sm:size-12 place-items-center justify-self-end rounded-full border border-foreground/15 bg-background transition-all duration-300 ease-[var(--ease-micro)] group-hover:rotate-6 group-hover:border-primary group-hover:bg-primary group-hover:text-accent">
                    <Icon size={20} strokeWidth={1.6} />
                  </span>

                  <p className="col-span-2 max-w-xs text-sm font-semibold leading-relaxed text-foreground/75 sm:hidden">
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

export default Metrics;
export { Metrics as ResultsSection, Metrics as Results };
