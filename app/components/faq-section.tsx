"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Minus, Plus } from "lucide-react";
import { prefersReducedMotion } from "../lib/motion";

const questions = [
  {
    question: "How quickly can we transition an offshore team?",
    answer:
      "Most initial teams are shadowed, documented into SOPs, and operating live within 2 to 4 weeks, with zero operational downtime for your existing staff.",
  },
  {
    question: "What are the typical cost savings compared to domestic FTEs?",
    answer:
      "Clients save between 60% and 72% per role. An offshore FTE typically costs around $18k annually versus $65k+ domestically, skipping healthcare, bonuses, and 401k liabilities.",
  },
  {
    question: "Will the offshore team operate in our own software and tools?",
    answer:
      "Yes. Our domain specialists work directly inside your TMS (e.g. McLeod, CargoWise, Descartes), CRM, email, and communication tools (Slack/Teams) during your required US business hours.",
  },
  {
    question: "How is data security and compliance handled?",
    answer:
      "We operate in secure, SOC 2 and ISO 27001-aligned enterprise facilities with clean-desk policies, restricted USB/storage access, and dedicated secure VPN/VDI tunnels.",
  },
];

export function FaqSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [openItem, setOpenItem] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const section = sectionRef.current;
    if (!section) return;
    if (prefersReducedMotion()) return;

    const context = gsap.context(() => {
      gsap.from("[data-faq-heading]", {
        y: 70,
        opacity: 0,
        duration: 1.15,
        stagger: 0.08,
        ease: "power4.out",
        scrollTrigger: { trigger: section, start: "top 70%" },
      });

      gsap.from("[data-faq-item]", {
        y: 45,
        opacity: 0,
        duration: 0.9,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "[data-faq-list]",
          start: "top 80%",
        },
      });
    }, section);

    return () => context.revert();
  }, []);

  return (
    <section
      id="faq"
      ref={sectionRef}
      className="bg-paper px-5 py-24 text-ink sm:px-8 sm:py-32 lg:px-12 lg:py-44"
    >
      <div className="mx-auto max-w-site">
        <div className="grid gap-16 lg:grid-cols-3 lg:gap-24">
          <div className="lg:col-span-1 lg:sticky lg:top-32 lg:h-fit">
            <div data-faq-heading className="mb-7 flex items-center gap-3">
              <span className="size-2 rounded-full bg-accent" />
              <p className="text-xs font-bold uppercase tracking-widest">
                Straight answers
              </p>
            </div>
            <h2
              data-faq-heading
              className="section-heading"
            >
              Before we
              <br />
              scale up.
            </h2>
            <p
              data-faq-heading
              className="mt-8 max-w-sm text-base font-medium leading-relaxed text-ink/70"
            >
              Clear expectations build reliable partnerships. Here are the
              questions leadership teams ask us most.
            </p>
          </div>

          <div data-faq-list className="lg:col-span-2 border-t border-ink">
            {questions.map((item, index) => {
              const isOpen = openItem === index;
              const panelId = `faq-panel-${index}`;

              return (
                <article
                  data-faq-item
                  key={item.question}
                  className="border-b border-ink/20"
                >
                  <button
                    type="button"
                    onClick={() => setOpenItem(isOpen ? -1 : index)}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    className="group flex w-full items-start justify-between gap-8 py-7 text-left sm:py-9 cursor-pointer"
                  >
                    <span className="flex gap-5 sm:gap-8">
                      <span className="pt-1 text-xs font-extrabold tracking-widest text-ink/40">
                        0{index + 1}
                      </span>
                      <span className="max-w-2xl font-bricolage text-2xl font-semibold leading-tight tracking-tight sm:text-3xl">
                        {item.question}
                      </span>
                    </span>
                    <span className="grid size-11 shrink-0 place-items-center rounded-full border border-ink/25 transition-all duration-300 group-hover:bg-ink group-hover:text-paper">
                      {isOpen ? (
                        <Minus size={18} strokeWidth={1.8} />
                      ) : (
                        <Plus size={18} strokeWidth={1.8} />
                      )}
                    </span>
                  </button>

                  <div
                    id={panelId}
                    className={`grid transition-[grid-template-rows] duration-700 ease-out ${
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="max-w-2xl pb-8 pl-10 pr-16 text-sm font-medium leading-relaxed text-ink/70 sm:pb-10 sm:pl-16 sm:text-base">
                        {item.answer}
                      </p>
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
