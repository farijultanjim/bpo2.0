"use client";

import { useEffect, useRef, type ComponentType } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ClipboardCheck,
  FileCheck,
  Rocket,
  type LucideProps,
} from "lucide-react";
import { MOTION, prefersReducedMotion, registerMotionEasings } from "@/app/lib/motion";
import { CtaButton } from "@/components/ui/CtaButton";

const steps: Array<{
  number: string;
  title: string;
  copy: string;
  icon: ComponentType<LucideProps>;
}> = [
  {
    number: "01",
    title: "Engage & NDA",
    copy: "Execute our standard confidentiality agreement, assess scope, and define team requirements.",
    icon: FileCheck,
  },
  {
    number: "02",
    title: "Learn & SOP",
    copy: "We shadow your current team, build comprehensive operating playbooks, and confirm your tooling access.",
    icon: ClipboardCheck,
  },
  {
    number: "03",
    title: "Pilot & Go Live",
    copy: "Launch a controlled pilot with zero disruption, validate SLAs, and transition into continuous 24/7 delivery.",
    icon: Rocket,
  },
];

export function Process() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    registerMotionEasings();
    const section = sectionRef.current;
    if (!section) return;
    if (prefersReducedMotion()) return;

    const context = gsap.context(() => {
      gsap.from("[data-process-word]", {
        yPercent: 110,
        rotate: 3,
        duration: 1.25,
        ease: MOTION.signature.gsap,
        stagger: 0.08,
        scrollTrigger: { trigger: section, start: "top 68%" },
      });

      gsap.fromTo(
        "[data-process-line]",
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: MOTION.scrub.gsap,
          scrollTrigger: {
            trigger: "[data-process-grid]",
            start: "top 78%",
            end: "bottom 70%",
            scrub: 0.8,
          },
        },
      );

      gsap.from("[data-process-card]", {
        y: 70,
        opacity: 0,
        stagger: 0.16,
        duration: 1,
        ease: MOTION.signature.gsap,
        scrollTrigger: {
          trigger: "[data-process-grid]",
          start: "top 76%",
        },
      });
    }, section);

    return () => context.revert();
  }, []);

  return (
    <section
      id="process"
      ref={sectionRef}
      className="relative overflow-hidden bg-accent text-primary"
    >
      {/* Anchor target for Lenis / Navigation */}
      <div id="work" className="absolute -top-16 pointer-events-none" />
      <div className="mx-auto max-w-site px-5 py-24 sm:px-8 sm:py-32 lg:px-12 lg:py-44">
        <div className="grid items-end gap-10 lg:grid-cols-3 lg:gap-20">
          <h2 className="section-heading lg:col-span-2">
            <span className="block overflow-hidden py-1">
              <span data-process-word className="block">
                No mystery.
              </span>
            </span>
            <span className="block overflow-hidden py-1">
              <span data-process-word className="block">
                Just method.
              </span>
            </span>
          </h2>

          <div className="lg:col-span-1 flex flex-col items-start gap-7 lg:pb-7">
            <p className="max-w-md text-base font-semibold leading-relaxed sm:text-lg">
              Transitioning operations should feel seamless from day one. Our
              methodology keeps control in your hands and progress measurable.
            </p>
            <CtaButton
              href="#contact"
              variant="dark"
            >
              Start onboarding
            </CtaButton>
          </div>
        </div>

        <div data-process-grid className="relative mt-20 grid gap-5 lg:mt-32 lg:grid-cols-3">
          <div className="absolute left-0 right-0 top-0 hidden h-px bg-primary/20 lg:block">
            <div
              data-process-line
              className="h-full origin-left bg-primary"
            />
          </div>

          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <article
                data-process-card
                key={step.number}
                className="group flex min-h-80 sm:min-h-96 flex-col border-t border-primary/30 py-6 lg:border-t-0 lg:px-6 lg:pt-10 first:lg:pl-0 last:lg:pr-0"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold tracking-widest">
                    STEP / {step.number}
                  </span>
                  <span className="grid size-12 place-items-center rounded-full border border-primary/30 transition-all duration-500 group-hover:-translate-y-1 group-hover:bg-primary group-hover:text-accent">
                    <Icon size={20} strokeWidth={1.7} />
                  </span>
                </div>

                <div className="mt-auto">
                  <h3 className="font-bricolage text-4xl font-semibold uppercase tracking-tight sm:text-5xl">
                    {step.title}
                  </h3>
                  <p className="mt-5 max-w-sm text-sm font-semibold leading-relaxed text-primary/70 sm:text-base">
                    {step.copy}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Process;
export { Process as ProcessSection };
