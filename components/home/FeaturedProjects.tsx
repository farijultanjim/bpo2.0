"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MOTION, prefersReducedMotion, registerMotionEasings } from "@/app/lib/motion";

export interface Project {
  slug: string;
  title: string;
  client: string;
  category: string;
  year: string;
  metric: string;
  summary: string;
  color: string;
  accentColor: string;
}

export const FEATURED_PROJECTS: Project[] = [
  {
    slug: "payglobal",
    title: "Global AML & Settlement Desk",
    client: "PayGlobal FinTech",
    category: "Compliance Ops",
    year: "2025",
    metric: "68% Cost Saved • 42 FTEs",
    summary:
      "Built a 24/7 transaction monitoring and compliance desk handling 120k+ monthly alerts with sub-4-minute SLA.",
    color: "var(--project-fintech-bg)",
    accentColor: "var(--project-fintech-accent)",
  },
  {
    slug: "strata",
    title: "Freight Control Tower Sync",
    client: "Strata Logistics",
    category: "Control Tower",
    year: "2025",
    metric: "4-Week Scale • 35 FTEs",
    summary:
      "Integrated dedicated dispatch and shipment visibility teams directly inside CargoWise across North America, UK, Australia, and the Middle East.",
    color: "var(--project-cloud-bg)",
    accentColor: "var(--project-cloud-accent)",
  },
  {
    slug: "carepulse",
    title: "Automated Claims & Freight Audit",
    client: "CarePulse Health",
    category: "Billing & Audit",
    year: "2025",
    metric: "99.8% Accuracy • 3x Speed",
    summary:
      "Streamlined high-volume invoice matching, document verification, and exception resolution with zero backlog.",
    color: "var(--project-health-bg)",
    accentColor: "var(--project-health-accent)",
  },
  {
    slug: "omnicorp",
    title: "Zero-Trust Carrier Back-Office",
    client: "OmniCorp Freight",
    category: "Dedicated Staffing",
    year: "2025",
    metric: "72% Savings • 60+ FTEs",
    summary:
      "Deployed a SOC 2-aligned offshore operations unit managing carrier onboarding, rate audits, and 24/7 support.",
    color: "var(--project-security-bg)",
    accentColor: "var(--project-security-accent)",
  },
];

/**
 * Live, looping motion graphics tailored to each domain.
 * Pure vector + CSS animations — GPU accelerated, lightweight, 60fps.
 */
function ProjectVisual({ index }: { index: number }) {
  if (index === 0) {
    // Live 24/7 AML Telemetry & Transaction Sweep
    return (
      <div className="relative w-full h-full flex items-center justify-center overflow-hidden select-none">
        <div
          className="absolute inset-0 opacity-[0.12] bg-[radial-gradient(var(--accent)_1px,transparent_1px)] [background-size:18px_18px]"
          aria-hidden="true"
        />

        <svg
          viewBox="0 0 400 320"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full max-w-[340px] md:max-w-[380px] h-auto drop-shadow-xl"
          aria-hidden="true"
        >
          <circle
            cx="200"
            cy="160"
            r="120"
            stroke="var(--accent)"
            strokeWidth="1.5"
            strokeDasharray="6 6"
            strokeOpacity="0.35"
            className="animate-radar-counter origin-[200px_160px]"
          />

          <circle
            cx="200"
            cy="160"
            r="85"
            stroke="var(--accent)"
            strokeWidth="2"
            strokeOpacity="0.55"
          />

          <circle
            cx="200"
            cy="160"
            r="50"
            fill="var(--primary-hover)"
            className="animate-pulse-grow"
          />

          <g className="animate-radar-spin origin-[200px_160px]">
            <line
              x1="200"
              y1="160"
              x2="320"
              y2="160"
              stroke="var(--accent)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <path
              d="M200 160L315 125A120 120 0 0 1 320 160Z"
              fill="url(#radar-gradient-0)"
              fillOpacity="0.35"
            />
          </g>

          <path
            d="M50 240 Q 130 140, 200 190 T 350 90"
            stroke="var(--accent)"
            strokeWidth="2.5"
            strokeDasharray="8 6"
            strokeLinecap="round"
            className="animate-dash-flow"
          />

          <circle cx="200" cy="190" r="4.5" fill="var(--accent)" />
          <circle cx="350" cy="90" r="5.5" fill="var(--surface)" />
          <circle
            cx="350"
            cy="90"
            r="10"
            stroke="var(--accent)"
            strokeWidth="1.5"
            className="animate-pulse-grow"
          />

          <circle cx="200" cy="160" r="6" fill="var(--accent)" />

          <defs>
            <linearGradient
              id="radar-gradient-0"
              x1="200"
              y1="160"
              x2="320"
              y2="125"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="var(--accent)" stopOpacity="0.7" />
              <stop offset="1" stopColor="var(--accent)" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>

        <div className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-black/55 backdrop-blur-md border border-white/10 px-3 py-1 text-[11px] font-mono text-white/90">
          <span className="size-1.5 rounded-full bg-accent animate-ping" />
          <span>99.94% SLA • 24/7 LIVE DESK</span>
        </div>
      </div>
    );
  }

  if (index === 1) {
    // Multi-Cloud Distributed Cluster & Continuous Data Packets
    return (
      <div className="relative w-full h-full flex items-center justify-center overflow-hidden select-none">
        <div
          className="absolute inset-0 opacity-[0.12] bg-[radial-gradient(var(--project-cloud-accent)_1px,transparent_1px)] [background-size:18px_18px]"
          aria-hidden="true"
        />

        <svg
          viewBox="0 0 400 320"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full max-w-[340px] md:max-w-[380px] h-auto drop-shadow-xl"
          aria-hidden="true"
        >
          <g
            stroke="var(--project-cloud-accent)"
            strokeWidth="2"
            strokeDasharray="8 6"
            className="animate-dash-flow"
          >
            <line x1="110" y1="90" x2="200" y2="160" />
            <line x1="290" y1="90" x2="200" y2="160" />
            <line x1="200" y1="160" x2="200" y2="245" />
            <line x1="110" y1="90" x2="290" y2="90" strokeOpacity="0.4" />
          </g>

          <g className="animate-float-gentle">
            <rect
              x="70"
              y="65"
              width="80"
              height="50"
              rx="10"
              fill="var(--project-cloud-bg)"
              stroke="var(--project-cloud-accent)"
              strokeWidth="1.5"
              strokeOpacity="0.5"
            />
            <circle cx="90" cy="90" r="4" fill="var(--project-cloud-accent)" />
            <rect
              x="102"
              y="86"
              width="36"
              height="8"
              rx="2"
              fill="var(--project-cloud-accent)"
              fillOpacity="0.35"
            />
          </g>

          <g className="animate-float-gentle [animation-delay:1.5s]">
            <rect
              x="250"
              y="65"
              width="80"
              height="50"
              rx="10"
              fill="var(--project-cloud-bg)"
              stroke="var(--project-cloud-accent)"
              strokeWidth="1.5"
              strokeOpacity="0.5"
            />
            <circle cx="270" cy="90" r="4" fill="var(--project-cloud-accent)" />
            <rect
              x="282"
              y="86"
              width="36"
              height="8"
              rx="2"
              fill="var(--project-cloud-accent)"
              fillOpacity="0.35"
            />
          </g>

          <g>
            <circle
              cx="200"
              cy="160"
              r="38"
              fill="var(--project-cloud-bg)"
              stroke="var(--project-cloud-accent)"
              strokeWidth="2"
              className="animate-pulse-grow"
            />
            <circle cx="200" cy="160" r="10" fill="var(--project-cloud-accent)" />
            <circle
              cx="200"
              cy="160"
              r="22"
              stroke="var(--project-cloud-accent)"
              strokeWidth="1"
              strokeDasharray="4 4"
              className="animate-radar-spin-fast origin-[200px_160px]"
            />
          </g>

          <g className="animate-float-gentle [animation-delay:0.8s]">
            <rect
              x="160"
              y="220"
              width="80"
              height="50"
              rx="10"
              fill="var(--project-cloud-bg)"
              stroke="var(--project-cloud-accent)"
              strokeWidth="1.5"
              strokeOpacity="0.5"
            />
            <circle cx="180" cy="245" r="4" fill="var(--project-cloud-accent)" />
            <rect
              x="192"
              y="241"
              width="36"
              height="8"
              rx="2"
              fill="var(--project-cloud-accent)"
              fillOpacity="0.35"
            />
          </g>
        </svg>

        <div className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-black/55 backdrop-blur-md border border-white/10 px-3 py-1 text-[11px] font-mono text-white/90">
          <span className="size-1.5 rounded-full bg-project-cloud-accent animate-ping" />
          <span>MULTI-HUB • 4-WEEK LAUNCH</span>
        </div>
      </div>
    );
  }

  if (index === 2) {
    // Intelligent Document OCR Scanner & Live Laser Beam
    return (
      <div className="relative w-full h-full flex items-center justify-center overflow-hidden select-none">
        <div
          className="absolute inset-0 opacity-[0.12] bg-[radial-gradient(var(--project-health-accent)_1px,transparent_1px)] [background-size:18px_18px]"
          aria-hidden="true"
        />

        <div className="relative w-full max-w-[340px] md:max-w-[380px] h-[220px] flex items-center justify-center">
          <div className="relative w-[240px] h-[155px] rounded-xl bg-project-health-bg border border-project-health-accent/30 shadow-2xl p-4 flex flex-col justify-between animate-float-gentle">
            <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
              <div className="flex items-center gap-2">
                <span className="size-2.5 rounded-full bg-project-health-accent" />
                <span className="text-[10px] font-mono text-project-health-accent tracking-wider uppercase">
                  CLAIMS INGESTION
                </span>
              </div>
              <span className="text-[9px] font-mono text-white/40">#CL-8921</span>
            </div>

            <div className="space-y-2 py-2">
              <div className="h-2 w-3/4 bg-white/20 rounded" />
              <div className="h-2 w-full bg-white/15 rounded" />
              <div className="h-2 w-1/2 bg-project-health-accent/40 rounded" />
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-white/10 text-[9px] font-mono text-white/60">
              <span>SOP APPROVED</span>
              <span className="text-project-health-accent font-semibold">99.8% CONF</span>
            </div>

            <div className="absolute inset-x-0 top-3 h-[2px] bg-gradient-to-r from-transparent via-project-health-accent to-transparent shadow-[0_0_12px_var(--project-health-accent)] animate-laser-scan pointer-events-none" />
          </div>

          <div className="absolute w-[220px] h-[145px] rounded-xl bg-project-health-bg/80 border border-white/5 -translate-y-3 -translate-x-3 -z-10" />
        </div>

        <div className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-black/55 backdrop-blur-md border border-white/10 px-3 py-1 text-[11px] font-mono text-white/90">
          <span className="size-1.5 rounded-full bg-project-health-accent animate-ping" />
          <span>99.8% ACCURACY • OCR + AUDIT</span>
        </div>
      </div>
    );
  }

  // Zero-Trust Hexagonal Defense Shield & Threat Sweep
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden select-none">
      <div
        className="absolute inset-0 opacity-[0.12] bg-[radial-gradient(var(--project-security-accent)_1px,transparent_1px)] [background-size:18px_18px]"
        aria-hidden="true"
      />

      <svg
        viewBox="0 0 400 320"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full max-w-[340px] md:max-w-[380px] h-auto drop-shadow-xl"
        aria-hidden="true"
      >
        <g className="animate-radar-spin origin-[200px_160px]">
          <polygon
            points="200,45 295,98 295,222 200,275 105,222 105,98"
            stroke="var(--project-security-accent)"
            strokeWidth="1.8"
            strokeOpacity="0.45"
            strokeDasharray="8 6"
          />
        </g>

        <g className="animate-radar-counter origin-[200px_160px]">
          <polygon
            points="200,75 270,115 270,205 200,245 130,205 130,115"
            fill="var(--project-security-bg)"
            stroke="var(--project-security-accent)"
            strokeWidth="2"
          />
        </g>

        <g className="animate-radar-spin origin-[200px_160px]">
          <line
            x1="200"
            y1="160"
            x2="270"
            y2="115"
            stroke="var(--project-security-accent)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="M200 160 L270 115 A 65 65 0 0 1 270 205 Z"
            fill="url(#radar-gradient-3)"
            fillOpacity="0.3"
          />
        </g>

        <circle
          cx="200"
          cy="160"
          r="28"
          fill="var(--project-security-bg)"
          stroke="var(--project-security-accent)"
          strokeWidth="2"
          className="animate-pulse-grow"
        />
        <circle cx="200" cy="160" r="8" fill="var(--project-security-accent)" />

        <defs>
          <linearGradient
            id="radar-gradient-3"
            x1="200"
            y1="160"
            x2="270"
            y2="160"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="var(--project-security-accent)" stopOpacity="0.8" />
            <stop offset="1" stopColor="var(--project-security-accent)" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>

      <div className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-black/55 backdrop-blur-md border border-white/10 px-3 py-1 text-[11px] font-mono text-white/90">
        <span className="size-1.5 rounded-full bg-project-security-accent animate-ping" />
        <span>SOC 2 ALIGNED • ZERO BREACH</span>
      </div>
    </div>
  );
}

export function FeaturedProjects() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    registerMotionEasings();

    const section = sectionRef.current;
    const cardsContainer = cardsRef.current;
    if (!section || !cardsContainer) return;
    if (prefersReducedMotion()) return;

    const context = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>("[data-project-card]");
      if (!cards.length) return;

      gsap.set(cards, { y: 45, opacity: 0 });

      gsap.to(cards, {
        y: 0,
        opacity: 1,
        duration: 1.05,
        ease: MOTION.signature.gsap,
        stagger: 0.15,
        clearProps: "transform",
        scrollTrigger: {
          trigger: cardsContainer,
          start: "top 82%",
          once: true,
        },
      });

      cards.forEach((card) => {
        const media = card.querySelector<HTMLElement>("[data-project-media]");
        if (media) {
          gsap.fromTo(
            media,
            { yPercent: -5 },
            {
              yPercent: 5,
              ease: MOTION.scrub.gsap,
              scrollTrigger: {
                trigger: card,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            },
          );
        }
      });
    }, section);

    return () => context.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="featured-projects"
      aria-labelledby="featured-projects-title"
      className="bg-background px-5 py-16 text-foreground sm:px-8 sm:py-24 lg:px-32 lg:py-28"
    >
      <div className="mx-auto w-full max-w-site">
        {/* Section Header matching Cuberto layout rhythm */}
        <div className="grid gap-6 pb-12 md:grid-cols-[280px_1fr] md:gap-0 sm:pb-16 lg:pb-20">
          <div className="flex items-center gap-3 self-start">
            <span className="size-2 rounded-full bg-accent" />
            <h2
              id="featured-projects-title"
              className="text-xs font-bold tracking-widest text-foreground uppercase"
            >
              Featured Projects
            </h2>
          </div>
          <p className="max-w-[840px] text-[clamp(20px,1.8vw,26px)] leading-[1.3] tracking-[-0.01em] text-foreground font-medium">
            Proven operational transformations delivered for high-volume freight, fintech, and enterprise teams.
          </p>
        </div>

        {/* 2-Column Staggered Creative Showcase */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-x-8 md:gap-y-16 lg:gap-x-12 lg:gap-y-20"
        >
          {FEATURED_PROJECTS.map((project, idx) => {
            const isStaggered = idx % 2 === 1;

            return (
              <article
                key={project.slug}
                data-project-card
                className={`group/project flex flex-col cursor-pointer ${
                  isStaggered ? "md:mt-14" : ""
                }`}
              >
                {/* Visual Media Showcase Canvas */}
                <div
                  className="relative aspect-[16/12] w-full overflow-hidden rounded-[clamp(16px,2vw,24px)] border border-foreground/15 transition-all duration-500 ease-[var(--ease-signature)] group-hover/project:border-foreground/30 group-hover/project:shadow-2xl"
                  style={{ backgroundColor: project.color }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover/project:opacity-100 transition-opacity duration-500 z-10 pointer-events-none" />

                  <div
                    data-project-media
                    className="relative w-full h-full flex items-center justify-center"
                  >
                    <div className="w-full h-full flex items-center justify-center transition-transform duration-500 ease-[var(--ease-signature)] group-hover/project:scale-[1.04]">
                      <ProjectVisual index={idx} />
                    </div>
                  </div>

                  {/* Floating Action Pill on Hover */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                    <span className="scale-90 opacity-0 group-hover/project:scale-100 group-hover/project:opacity-100 transition-all duration-400 ease-[var(--ease-signature)] inline-flex items-center gap-2 rounded-full bg-white text-black px-4 py-2 text-[12px] font-mono font-medium shadow-xl">
                      <span>VIEW CASE STUDY</span>
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 16 16"
                        fill="none"
                        aria-hidden="true"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3.5 12.5 12.5 3.5M6 3.5h6.5V10"
                        />
                      </svg>
                    </span>
                  </div>
                </div>

                {/* Minimal, High-Impact Narrative Underneath */}
                <div className="mt-5 flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-bricolage text-[clamp(22px,2vw,28px)] font-semibold tracking-tight text-foreground leading-[1.15] group-hover/project:text-primary transition-colors duration-300">
                      {project.title}
                    </h3>

                    <div className="mt-2 flex flex-wrap items-center gap-2 text-[12px] font-mono text-muted">
                      <span className="text-foreground/80 font-medium">{project.client}</span>
                      <span>•</span>
                      <span>{project.category}</span>
                    </div>

                    <p className="mt-2.5 text-[14px] leading-[1.5] text-muted max-w-[380px]">
                      {project.summary}
                    </p>
                  </div>

                  {/* Metric Badge */}
                  <div className="shrink-0 pt-0.5">
                    <div className="inline-flex items-center gap-1.5 rounded-full bg-canvas/70 border border-foreground/15 px-3 py-1 text-[11px] font-mono font-medium text-foreground">
                      <span
                        className="size-1.5 rounded-full"
                        style={{ backgroundColor: project.accentColor }}
                        aria-hidden="true"
                      />
                      <span>{project.metric.split("•")[0].trim()}</span>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default FeaturedProjects;
