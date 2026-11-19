"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type ComponentType } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowUpRight,
  Compass,
  Headset,
  Megaphone,
  Plane,
  Receipt,
  Route,
  Truck,
  Users,
  type LucideProps,
} from "lucide-react";
import { prefersReducedMotion } from "../lib/motion";

type ServiceStep = {
  title: string;
  description: string;
};

type ServiceItem = {
  number: string;
  title: string;
  tagline: string;
  description: string;
  pills: string[];
  image: string;
  icon: ComponentType<LucideProps>;
  steps: ServiceStep[];
};

const services: ServiceItem[] = [
  {
    number: "01",
    title: "Freight operations",
    tagline: "Air & ocean, import & export",
    description:
      "Every milestone from booking and pre-alert to POD. One dedicated desk runs the whole file end-to-end so nothing waits for the next shift.",
    pills: ["Air import", "Air export", "Ocean import", "Ocean export"],
    image: "/images/bpo/freight.webp",
    icon: Plane,
    steps: [
      {
        title: "Pre-alert & setup",
        description:
          "Validate HAWB/MAWB or MBL/HBL, manifest, and invoice; create the master job file.",
      },
      {
        title: "Booking & cargo-ready",
        description:
          "Book directly with airlines or shipping lines and issue draft HAWB/HBL for approval.",
      },
      {
        title: "AMS, ISF & customs",
        description:
          "Match AMS, submit ISF, identify entry type, and follow up clearance with customs brokers.",
      },
      {
        title: "Arrival, POD & close-out",
        description:
          "Issue arrival notices, release freight holds, monitor POD, and confirm delivery.",
      },
    ],
  },
  {
    number: "02",
    title: "Control tower / KAM",
    tagline: "Key accounts, run inside your own systems",
    description:
      "Rates, bookings, and visibility reporting for your enterprise accounts. We manage the entire lifecycle from lead generation to final billing.",
    pills: ["Key accounts", "Booking support", "Pricing & quoting", "Reporting"],
    image: "/images/bpo/global-operations.webp",
    icon: Compass,
    steps: [
      {
        title: "Lead generation",
        description:
          "Target industries and trade lanes, shortlist prospective clients, and initiate outreach.",
      },
      {
        title: "Rate & quotation",
        description:
          "Procure competitive buy rates, calculate margins, submit quotes, and track win/loss.",
      },
      {
        title: "Booking management",
        description:
          "Customer confirmations, schedule coordination, uplift follow-up, and billing instructions.",
      },
      {
        title: "Reporting & KPIs",
        description:
          "Win/loss ratios, pricing trends, daily shipment logs, and revenue reconciliations.",
      },
    ],
  },
  {
    number: "03",
    title: "Customer service",
    tagline: "A 24/7 front line for your customers",
    description:
      "A dedicated front line that keeps your customers informed and exceptions under tight control, working US hours directly inside your CRM and email.",
    pills: ["24/7 coverage", "US-hour alignment", "Exception control", "Works in your tools"],
    image: "/images/bpo/customer-service.webp",
    icon: Headset,
    steps: [
      {
        title: "Track & trace",
        description:
          "Proactive status updates, milestone verification, and ETA alerts before customers ask.",
      },
      {
        title: "Scheduling support",
        description:
          "Warehouse pickup and consignee delivery appointments coordinated with all parties.",
      },
      {
        title: "Escalation handling",
        description:
          "Port congestion, customs holds, and carrier delays flagged early and followed through.",
      },
      {
        title: "Live US-hour desk",
        description:
          "Real-time communication and instant responses inside your email, portal, and Slack.",
      },
    ],
  },
  {
    number: "04",
    title: "Dispatch operations",
    tagline: "Every load tracked through to POD",
    description:
      "Loads planned, carriers tendered, and deliveries tracked live from shipment readiness to signed proof of delivery and invoice reconciliation.",
    pills: ["Intake & planning", "Carrier tendering", "GPS tracking", "Appointments", "POD"],
    image: "/images/bpo/dispatch.webp",
    icon: Route,
    steps: [
      {
        title: "Intake & load planning",
        description:
          "Confirm cargo readiness, select mode, and match carriers from your approved matrix.",
      },
      {
        title: "Tender & GPS dispatch",
        description:
          "Tender loads, capture driver contact details, and verify active GPS tracking before pickup.",
      },
      {
        title: "Documents & scheduling",
        description:
          "Issue delivery orders, customs releases, appointment bookings, and TMS trip entries.",
      },
      {
        title: "Track, POD & close-out",
        description:
          "Confirm delivery completion, archive signed PODs, and audit carrier rate sheets.",
      },
    ],
  },
  {
    number: "05",
    title: "Trucking operations",
    tagline: "Quotation to settlement",
    description:
      "Every truck booked, tracked, delivered, and billed with active exception management running at every stage: detect, log, classify, resolve, and close.",
    pills: ["Quote & booking", "Truck assignment", "Live tracking", "POD & billing"],
    image: "/images/bpo/trucking.webp",
    icon: Truck,
    steps: [
      {
        title: "Quote & booking",
        description:
          "Quote from contracted rate sheets, secure equipment capacity, and book files.",
      },
      {
        title: "Assignment & pickup",
        description:
          "Assign trucks and drivers; confirm container release, terminal appointments, and ETAs.",
      },
      {
        title: "EDI tracking & POD",
        description:
          "Real-time EDI tracking, signed bills of lading, and delivery receipts verified and uploaded.",
      },
      {
        title: "Invoicing & closure",
        description:
          "Validate line-haul rates and accessorials (detention/layover), reconcile, and close.",
      },
    ],
  },
  {
    number: "06",
    title: "Finance & accounting",
    tagline: "From carrier invoice to customer payment",
    description:
      "Accurate billing and clean ledgers. Billing and delivery-cost updates are processed by the same offshore team running your shipments.",
    pills: ["AP / AR", "Billing & invoicing", "Freight bill audit", "Month-end close"],
    image: "/images/bpo/finance.webp",
    icon: Receipt,
    steps: [
      {
        title: "AP / AR processing",
        description:
          "Vendor invoice matching, payment approvals, customer invoicing, and collection calls.",
      },
      {
        title: "Job costing & billing",
        description:
          "Delivery cost reconciliations, accessorial verification, and final customer invoices.",
      },
      {
        title: "Freight bill audit",
        description:
          "Audit carrier bills against contracted tariffs, spot rates, and revenue checks.",
      },
      {
        title: "Month-end reconciliation",
        description:
          "Accruals, inter-company billing, and bank reconciliations completed on schedule.",
      },
    ],
  },
  {
    number: "07",
    title: "HR & talent acquisition",
    tagline: "Payroll and recruitment, end to end",
    description:
      "Recruitment, screening, and payroll handled end to end for your offshore team, providing vetted domain specialists ready to produce from day one.",
    pills: ["Dedicated staffing", "Screening", "Interviews", "Payroll & compliance"],
    image: "/images/bpo/hr-team.webp",
    icon: Users,
    steps: [
      {
        title: "Sourcing & screening",
        description:
          "Job posting, candidate outreach, English proficiency vetting, and logistics screening.",
      },
      {
        title: "Interviews & offers",
        description:
          "Rigorous technical evaluations, background checks, and standard employment agreements.",
      },
      {
        title: "Onboarding & IT setup",
        description:
          "Secure workstation configuration, VPN/VDI access, and initial productivity training.",
      },
      {
        title: "Payroll management",
        description:
          "Timesheets, statutory compliance, benefits administration, and performance reviews.",
      },
    ],
  },
  {
    number: "08",
    title: "Marketing & creative",
    tagline: "Plan, create, publish, analyze, optimize",
    description:
      "Your logistics brand kept active, on-message, and driving inbound shipper inquiries across LinkedIn, email marketing, and digital channels.",
    pills: ["Social media", "Content writing", "Analytics & CRM", "Video editing"],
    image: "/images/bpo/marketing.webp",
    icon: Megaphone,
    steps: [
      {
        title: "Social & content creation",
        description:
          "Channel management, logistics thought leadership, on-brand graphics, and copy.",
      },
      {
        title: "Analytics & pipeline audits",
        description:
          "Campaign performance tracking, web traffic analytics, and inbound lead reporting.",
      },
      {
        title: "Paid ads & CRM sync",
        description:
          "Targeted B2B campaigns with qualified shipper leads synced to HubSpot or Salesforce.",
      },
      {
        title: "Audio & video editing",
        description:
          "Service walkthroughs, customer interview clips, and promotional reels.",
      },
    ],
  },
];

export function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLElement | null)[]>([]);
  const isJumpingRef = useRef(false);
  const jumpTimeoutRef = useRef<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const section = sectionRef.current;
    if (!section) return;
    if (prefersReducedMotion()) return;

    const cards = cardsRef.current.filter((c): c is HTMLElement => c !== null);

    const syncStack = () => {
      let topActive = 0;
      const parkThreshold = 220;

      cards.forEach((card, index) => {
        const rect = card.getBoundingClientRect();
        if (rect.top <= parkThreshold) {
          topActive = index;
        }

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
          scale: 1 - 0.035 * progress,
          opacity: 1,
          transformOrigin: "center top",
        });
      });

      if (!isJumpingRef.current) {
        setActiveIndex(topActive);
      }
    };

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top bottom",
      end: "bottom top",
      onUpdate: syncStack,
      onRefresh: syncStack,
    });

    syncStack();

    return () => {
      trigger.kill();
      if (jumpTimeoutRef.current) {
        window.clearTimeout(jumpTimeoutRef.current);
      }
    };
  }, []);

  const scrollToService = (index: number) => {
    setActiveIndex(index);
    isJumpingRef.current = true;
    if (jumpTimeoutRef.current) {
      window.clearTimeout(jumpTimeoutRef.current);
    }

    const container = cardsContainerRef.current;
    const card = cardsRef.current[index];
    if (!container || !card) {
      isJumpingRef.current = false;
      return;
    }

    // 1. Calculate the container's static document top (unaffected by current scroll position or sticky states)
    const containerDocTop = container.getBoundingClientRect().top + window.scrollY;
    const containerPaddingTop =
      parseFloat(getComputedStyle(container).paddingTop) || 0;

    // 2. Compute natural un-stuck offset using layout heights and standard margins
    let offsetFromContainer = containerPaddingTop;
    for (let i = 0; i < index; i++) {
      const cardEl = cardsRef.current[i];
      const nextCardEl = cardsRef.current[i + 1];
      const cardHeight = cardEl ? cardEl.offsetHeight : 550;
      const margin = nextCardEl
        ? parseFloat(getComputedStyle(nextCardEl).marginTop) || 32
        : 32;
      offsetFromContainer += cardHeight + margin;
    }

    // 3. Static target document top of this card
    const cardDocTop = containerDocTop + offsetFromContainer;
    const parkTop = parseFloat(getComputedStyle(card).top) || (80 + index * 8.8);

    // Target scroll lands the card at its exact park position (or slightly past to ensure clean stacking)
    const targetY = Math.max(
      0,
      Math.round(cardDocTop - parkTop + (index === 0 ? 0 : 35)),
    );

    const unlock = () => {
      isJumpingRef.current = false;
    };

    jumpTimeoutRef.current = window.setTimeout(unlock, 1200);

    const lenis = (
      window as unknown as {
        __lenis?: {
          scrollTo: (
            target: number,
            opts?: { duration?: number; lock?: boolean; onComplete?: () => void },
          ) => void;
        };
      }
    ).__lenis;

    if (lenis && typeof lenis.scrollTo === "function") {
      lenis.scrollTo(targetY, {
        duration: 1.1,
        lock: false,
        onComplete: unlock,
      });
    } else {
      window.scrollTo({ top: targetY, behavior: "smooth" });
    }
  };

  const activeService = services[activeIndex] || services[0];

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative bg-ink px-5 py-24 text-paper sm:px-8 sm:py-32 lg:px-12 lg:py-44"
    >
      <div className="relative mx-auto max-w-site">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          {/* Left Column: Vertically Centered Sticky Stage with smooth crossfade */}
          <div className="lg:col-span-5 lg:sticky lg:top-0 lg:h-svh lg:flex lg:flex-col lg:justify-center lg:self-start space-y-6">
            <div className="flex items-center gap-3">
              <span className="size-2 rounded-full bg-accent" />
              <p className="text-xs font-bold uppercase tracking-widest text-paper/80">
                What we do • Service {activeService.number} of 08
              </p>
            </div>

            {/* Smooth Blurred Crossfade Stage */}
            <div className="grid grid-cols-1 grid-rows-1">
              {services.map((item, idx) => {
                const isActive = idx === activeIndex;
                const isPast = idx < activeIndex;
                const stateClass = isActive
                  ? "service-text-active"
                  : isPast
                  ? "service-text-hidden-up"
                  : "service-text-hidden-down";

                return (
                  <div
                    key={item.number}
                    className={`col-start-1 row-start-1 space-y-4 ${stateClass}`}
                  >
                    <div className="space-y-2">
                      <h2 className="font-bricolage text-4xl sm:text-5xl font-semibold uppercase tracking-tight text-paper">
                        {item.title}
                      </h2>
                      <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-accent">
                        {item.tagline}
                      </p>
                    </div>

                    <p className="text-sm sm:text-base font-medium leading-relaxed text-paper/75 max-w-md">
                      {item.description}
                    </p>

                    {/* Scope / Sub-service pills */}
                    <div className="space-y-2 pt-2">
                      <p className="text-xs font-extrabold uppercase tracking-widest text-paper/50">
                        Service Scope
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {item.pills.map((pill) => (
                          <span
                            key={pill}
                            className="rounded-full border border-paper/20 bg-paper/5 px-3.5 py-1 text-xs font-semibold text-paper/90"
                          >
                            {pill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Interactive 8-Service Navigator */}
            <div className="pt-4 border-t border-paper/15 space-y-3">
              <p className="text-xs font-extrabold uppercase tracking-widest text-paper/50">
                Jump to Service
              </p>
              <div className="flex flex-wrap gap-1.5">
                {services.map((item, idx) => {
                  const isActive = idx === activeIndex;
                  return (
                    <button
                      key={item.number}
                      type="button"
                      onClick={() => scrollToService(idx)}
                      className={`h-8 px-3 rounded-full text-xs font-bold transition-all duration-300 cursor-pointer ${
                        isActive
                          ? "bg-accent text-primary shadow-md scale-105"
                          : "bg-paper/10 text-paper/70 hover:bg-paper/20 hover:text-paper"
                      }`}
                      aria-label={`Jump to ${item.title}`}
                    >
                      {item.number}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: High-Impact Stacking Cards with Attention-Grabbing Imagery */}
          <div
            ref={cardsContainerRef}
            className="lg:col-span-7 space-y-8 lg:pt-6"
            style={{ "--stack-base": "5rem" } as React.CSSProperties}
          >
            {services.map((service, index) => {
              const Icon = service.icon;

              return (
                <article
                  id={`service-${service.number}`}
                  key={service.number}
                  ref={(el) => {
                    cardsRef.current[index] = el;
                  }}
                  style={{
                    top: `calc(var(--stack-base, 5rem) + ${index * 0.55}rem)`,
                  }}
                  className="group sticky min-h-card overflow-hidden rounded-3xl border border-paper/20 bg-ink shadow-2xl shadow-ink/70"
                >
                  {/* High-Impact Attention-Grabbing Picture */}
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    sizes="(min-width: 1024px) 58vw, 100vw"
                    className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                  />

                  {/* Cinematic Scrim: lets the top photo shine brightly, while darkening the lower content area for crisp legibility */}
                  <div className="absolute inset-0 bg-gradient-to-b from-ink/25 via-ink/65 to-ink/95" />

                  {/* Card Content Overlay */}
                  <div className="relative z-1 flex flex-col justify-between h-full p-6 sm:p-8 space-y-6">
                    {/* Card Top Row */}
                    <div className="space-y-3 border-b border-paper/20 pb-5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-extrabold uppercase tracking-widest text-accent drop-shadow-md">
                            SERVICE / {service.number}
                          </span>
                          <span className="hidden sm:inline-block size-1 rounded-full bg-paper/60" />
                          <span className="hidden sm:inline-block text-xs font-bold uppercase tracking-wider text-paper drop-shadow-md">
                            {service.title}
                          </span>
                        </div>
                        <span className="grid size-12 place-items-center rounded-full border border-paper/40 bg-ink/40 backdrop-blur-md transition-all duration-500 group-hover:rotate-12 group-hover:bg-accent group-hover:text-ink shadow-lg">
                          <Icon size={22} strokeWidth={1.8} />
                        </span>
                      </div>

                      {/* Mobile-only context: Displays tagline & brief overview so mobile users have full context */}
                      <div className="lg:hidden space-y-1 pt-1">
                        <p className="text-xs font-bold uppercase tracking-wider text-accent">
                          {service.tagline}
                        </p>
                        <p className="text-xs text-paper/85 font-medium leading-relaxed line-clamp-2">
                          {service.description}
                        </p>
                      </div>
                    </div>

                    {/* Middle: 4 Operational Workflow Steps with Frosted Glass Panels */}
                    <div className="space-y-3">
                      <p className="text-xs font-extrabold uppercase tracking-widest text-paper/80 drop-shadow-md">
                        Operational Execution
                      </p>
                      <div className="grid gap-3 sm:grid-cols-2">
                        {service.steps.map((step, sIdx) => (
                          <div
                            key={step.title}
                            className="rounded-2xl border border-paper/20 bg-ink/50 p-4 backdrop-blur-md transition-colors duration-300 hover:border-accent/40 hover:bg-ink/70"
                          >
                            <p className="text-xs font-extrabold text-accent uppercase tracking-wider">
                              Step 0{sIdx + 1}
                            </p>
                            <h4 className="mt-1 font-bricolage text-sm sm:text-base font-bold text-paper uppercase">
                              {step.title}
                            </h4>
                            <p className="mt-1.5 text-xs leading-relaxed text-paper/80">
                              {step.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Card Footer */}
                    <div className="flex items-center justify-between border-t border-paper/20 pt-5">
                      <p className="text-xs font-medium text-paper/80 hidden sm:block drop-shadow-sm">
                        Dedicated multi-shift desk operating inside your software.
                      </p>
                      <a
                        href="#contact"
                        className="button-accent group/btn ml-auto inline-flex items-center gap-3 rounded-full py-2 pl-4 pr-1.5 text-xs font-bold uppercase tracking-wider cursor-pointer shadow-lg"
                      >
                        Inquire about {service.title}
                        <span className="grid size-7 place-items-center rounded-full bg-ink text-paper transition-transform duration-300 group-hover/btn:rotate-45">
                          <ArrowUpRight size={14} strokeWidth={2} />
                        </span>
                      </a>
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
