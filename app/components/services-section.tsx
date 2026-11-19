"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type ComponentType } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
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
        title: "Pre-alert setup",
        description: "Audit HAWB/MBL & create master job files.",
      },
      {
        title: "Carrier booking",
        description: "Direct airline & ocean bookings with draft HBL.",
      },
      {
        title: "Customs & ISF",
        description: "Match AMS, file ISF & expedite broker release.",
      },
      {
        title: "Arrival & POD",
        description: "Issue arrival notices, verify POD & close.",
      },
    ],
  },
  {
    number: "02",
    title: "Control tower / KAM",
    tagline: "Key accounts, run inside your own systems",
    description:
      "Rates, bookings, and visibility reporting for your enterprise accounts. We manage the entire lifecycle from lead generation to final billing.",
    pills: [
      "Key accounts",
      "Booking support",
      "Pricing & quoting",
      "Reporting",
    ],
    image: "/images/bpo/global-operations.webp",
    icon: Compass,
    steps: [
      {
        title: "Lead pipeline",
        description: "Target trade lanes & qualify shipper accounts.",
      },
      {
        title: "Rate & quotes",
        description: "Procure buy rates, price margins & submit quotes.",
      },
      {
        title: "Booking lifecycle",
        description: "Confirm uplift, coordinate schedules & billing.",
      },
      {
        title: "KPI reporting",
        description: "Daily shipment logs, win/loss & margin audits.",
      },
    ],
  },
  {
    number: "03",
    title: "Customer service",
    tagline: "A 24/7 front line for your customers",
    description:
      "A dedicated front line that keeps your customers informed and exceptions under tight control, working US hours directly inside your CRM and email.",
    pills: [
      "24/7 coverage",
      "US-hour alignment",
      "Exception control",
      "Works in your tools",
    ],
    image: "/images/bpo/customer-service.webp",
    icon: Headset,
    steps: [
      {
        title: "Track & trace",
        description: "Proactive status alerts before shippers ask.",
      },
      {
        title: "Appointments",
        description: "Coordinate warehouse pickups & delivery times.",
      },
      {
        title: "Exception desk",
        description: "Resolve port holds, customs delays & carrier reroutes.",
      },
      {
        title: "Live US shifts",
        description: "Real-time responses in your email, portal & Slack.",
      },
    ],
  },
  {
    number: "04",
    title: "Dispatch operations",
    tagline: "Every load tracked through to POD",
    description:
      "Loads planned, carriers tendered, and deliveries tracked live from shipment readiness to signed proof of delivery and invoice reconciliation.",
    pills: [
      "Intake & planning",
      "Carrier tendering",
      "GPS tracking",
      "Appointments",
      "POD",
    ],
    image: "/images/bpo/dispatch.webp",
    icon: Route,
    steps: [
      {
        title: "Load planning",
        description: "Confirm cargo readiness & select mode.",
      },
      {
        title: "Tender & GPS",
        description: "Tender loads, verify driver & track live GPS.",
      },
      {
        title: "Trip orders",
        description: "Issue delivery orders & terminal release.",
      },
      {
        title: "POD archive",
        description: "Collect signed PODs & audit carrier charges.",
      },
    ],
  },
  {
    number: "05",
    title: "Trucking operations",
    tagline: "Quotation to settlement",
    description:
      "Every truck booked, tracked, delivered, and billed with active exception management running at every stage: detect, log, classify, resolve, and close.",
    pills: [
      "Quote & booking",
      "Truck assignment",
      "Live tracking",
      "POD & billing",
    ],
    image: "/images/bpo/trucking.webp",
    icon: Truck,
    steps: [
      {
        title: "Rate & booking",
        description: "Lock contracted rates & secure truck capacity.",
      },
      {
        title: "Dispatch & ETA",
        description: "Assign drivers, pull containers & monitor ETA.",
      },
      {
        title: "EDI & signed POD",
        description: "Real-time EDI tracking with signed receipts.",
      },
      {
        title: "Billing & audit",
        description: "Validate detention/layover & settle invoices.",
      },
    ],
  },
  {
    number: "06",
    title: "Finance & accounting",
    tagline: "From carrier invoice to customer payment",
    description:
      "Accurate billing and clean ledgers. Billing and delivery-cost updates are processed by the same offshore team running your shipments.",
    pills: [
      "AP / AR",
      "Billing & invoicing",
      "Freight bill audit",
      "Month-end close",
    ],
    image: "/images/bpo/finance.webp",
    icon: Receipt,
    steps: [
      {
        title: "AP / AR processing",
        description: "Match vendor bills & manage collections.",
      },
      {
        title: "Job costing",
        description: "Reconcile delivery costs & issue invoices.",
      },
      {
        title: "Freight bill audit",
        description: "Verify tariff rates & accessorial accuracy.",
      },
      {
        title: "Month-end close",
        description: "Accruals, inter-company billing & reconciliation.",
      },
    ],
  },
  {
    number: "07",
    title: "HR & talent acquisition",
    tagline: "Payroll and recruitment, end to end",
    description:
      "Recruitment, screening, and payroll handled end to end for your offshore team, providing vetted domain specialists ready to produce from day one.",
    pills: [
      "Dedicated staffing",
      "Screening",
      "Interviews",
      "Payroll & compliance",
    ],
    image: "/images/bpo/hr-team.webp",
    icon: Users,
    steps: [
      {
        title: "Talent sourcing",
        description: "Post roles & screen logistics candidates.",
      },
      {
        title: "Domain interviews",
        description: "Technical tests, English vetting & checks.",
      },
      {
        title: "IT & onboarding",
        description: "Configure secure workstations & VPN access.",
      },
      {
        title: "Payroll & reviews",
        description: "Manage timesheets, compliance & evaluations.",
      },
    ],
  },
  {
    number: "08",
    title: "Marketing & creative",
    tagline: "Plan, create, publish, analyze, optimize",
    description:
      "Your logistics brand kept active, on-message, and driving inbound shipper inquiries across LinkedIn, email marketing, and digital channels.",
    pills: [
      "Social media",
      "Content writing",
      "Analytics & CRM",
      "Video editing",
    ],
    image: "/images/bpo/marketing.webp",
    icon: Megaphone,
    steps: [
      {
        title: "Content & social",
        description: "Logistics thought leadership & visual graphics.",
      },
      {
        title: "Pipeline audits",
        description: "Track campaign performance & inbound traffic.",
      },
      {
        title: "Paid campaigns",
        description: "Target shippers & sync leads into HubSpot/CRM.",
      },
      {
        title: "Video editing",
        description: "Produce service walkthroughs & client reels.",
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
  const activeIndexRef = useRef(0);
  const desktopTabsRef = useRef<HTMLDivElement>(null);

  // Mobile continuous snap carousel state & smooth controllers
  const [mobileIndex, setMobileIndex] = useState(0);
  const [isSnapping, setIsSnapping] = useState(true);
  const mobileCarouselRef = useRef<HTMLDivElement>(null);
  const mobileTabsRef = useRef<HTMLDivElement>(null);
  const isMobileScrollingRef = useRef(false);
  const mobileScrollTimerRef = useRef<number | null>(null);

  const scrollMobileTo = (index: number) => {
    const container = mobileCarouselRef.current;
    if (!container) return;

    const card0 = container.children[0] as HTMLElement | undefined;
    const targetCard = container.children[index] as HTMLElement | undefined;
    if (!card0 || !targetCard) return;

    const targetScrollLeft = Math.max(0, targetCard.offsetLeft - card0.offsetLeft);

    // If already at target position, no-op
    if (index === mobileIndex && Math.abs(container.scrollLeft - targetScrollLeft) < 4) {
      return;
    }

    // Immediately select index so button smoothly extends & shifts color without lag
    setMobileIndex(index);
    isMobileScrollingRef.current = true;
    setIsSnapping(false);
    container.style.scrollSnapType = "none";
    container.style.scrollBehavior = "auto";

    if (mobileScrollTimerRef.current) {
      window.clearTimeout(mobileScrollTimerRef.current);
    }

    gsap.killTweensOf(container);

    // Fast, responsive, snappy card slide (0.45s)
    gsap.to(container, {
      scrollLeft: targetScrollLeft,
      duration: 0.45,
      ease: "power2.out",
      onComplete: () => {
        if (container) {
          container.style.scrollSnapType = "x mandatory";
        }
        setIsSnapping(true);
        isMobileScrollingRef.current = false;
      },
    });

    if (mobileTabsRef.current) {
      const activeBtn = mobileTabsRef.current.children[index] as HTMLElement | undefined;
      if (activeBtn && typeof activeBtn.scrollIntoView === "function") {
        activeBtn.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
      }
    }
  };

  const handleMobileScroll = () => {
    if (isMobileScrollingRef.current) return;
    const container = mobileCarouselRef.current;
    if (!container) return;

    const cards = Array.from(container.children) as HTMLElement[];
    if (!cards.length) return;
    const card0 = cards[0];

    const scrollLeft = container.scrollLeft;
    let closestIdx = 0;
    let minDistance = Infinity;

    cards.forEach((card, idx) => {
      const cardPos = card.offsetLeft - card0.offsetLeft;
      const distance = Math.abs(scrollLeft - cardPos);
      if (distance < minDistance) {
        minDistance = distance;
        closestIdx = idx;
      }
    });

    if (closestIdx !== mobileIndex) {
      setMobileIndex(closestIdx);
      if (mobileTabsRef.current) {
        const activeBtn = mobileTabsRef.current.children[closestIdx] as HTMLElement | undefined;
        if (activeBtn && typeof activeBtn.scrollIntoView === "function") {
          activeBtn.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
        }
      }
    }
  };

  const prevMobileService = () => {
    const nextIdx = (mobileIndex - 1 + services.length) % services.length;
    scrollMobileTo(nextIdx);
  };

  const nextMobileService = () => {
    const nextIdx = (mobileIndex + 1) % services.length;
    scrollMobileTo(nextIdx);
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const section = sectionRef.current;
    if (!section) return;
    if (prefersReducedMotion()) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const cards = cardsRef.current.filter((c): c is HTMLElement => c !== null);

      const syncStack = () => {
        let topActive = 0;

        cards.forEach((card, index) => {
          if (index === 0) return;
          const parkTop = parseFloat(getComputedStyle(card).top) || (80 + index * 8.8);
          // Hysteresis: require card to be closer to stack to activate,
          // but give more leeway before deactivating when scrolling back up.
          const threshold = index <= activeIndexRef.current ? parkTop + 115 : parkTop + 80;
          const rect = card.getBoundingClientRect();
          if (rect.top <= threshold) {
            topActive = index;
          }
        });

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
            scale: 1 - 0.035 * progress,
            opacity: 1,
            transformOrigin: "center top",
          });
        });

        if (!isJumpingRef.current) {
          if (topActive !== activeIndexRef.current) {
            activeIndexRef.current = topActive;
            setActiveIndex(topActive);
            if (desktopTabsRef.current) {
              const activeBtn = desktopTabsRef.current.children[topActive] as HTMLElement | undefined;
              if (activeBtn && typeof activeBtn.scrollIntoView === "function") {
                activeBtn.scrollIntoView({ behavior: "smooth", inline: "nearest", block: "nearest" });
              }
            }
          }
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
      };
    });

    return () => {
      mm.revert();
      if (jumpTimeoutRef.current) {
        window.clearTimeout(jumpTimeoutRef.current);
      }
    };
  }, []);

  const scrollToService = (index: number) => {
    activeIndexRef.current = index;
    setActiveIndex(index);
    isJumpingRef.current = true;
    if (jumpTimeoutRef.current) {
      window.clearTimeout(jumpTimeoutRef.current);
    }

    if (desktopTabsRef.current) {
      const activeBtn = desktopTabsRef.current.children[index] as HTMLElement | undefined;
      if (activeBtn && typeof activeBtn.scrollIntoView === "function") {
        activeBtn.scrollIntoView({ behavior: "smooth", inline: "nearest", block: "nearest" });
      }
    }

    const container = cardsContainerRef.current;
    const card = cardsRef.current[index];
    if (!container || !card) {
      isJumpingRef.current = false;
      return;
    }

    // 1. Calculate the container's static document top (unaffected by current scroll position or sticky states)
    const containerDocTop =
      container.getBoundingClientRect().top + window.scrollY;
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
    const parkTop = parseFloat(getComputedStyle(card).top) || 80 + index * 8.8;

    // Target scroll lands the card at its exact park position (or slightly past to ensure clean stacking)
    const targetY = Math.max(
      0,
      Math.round(cardDocTop - parkTop + (index === 0 ? 0 : 35)),
    );

    const unlock = () => {
      isJumpingRef.current = false;
    };

    jumpTimeoutRef.current = window.setTimeout(unlock, 1550);

    const lenis = (
      window as unknown as {
        __lenis?: {
          scrollTo: (
            target: number,
            opts?: {
              duration?: number;
              easing?: (t: number) => number;
              lock?: boolean;
              onComplete?: () => void;
            },
          ) => void;
        };
      }
    ).__lenis;

    if (lenis && typeof lenis.scrollTo === "function") {
      lenis.scrollTo(targetY, {
        duration: 1.45,
        easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
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
        {/* ========================================================= */}
        {/* MOBILE VIEW (< lg: 1024px) - Fluid Continuous Snap Carousel */}
        {/* ========================================================= */}
        <div className="block lg:hidden space-y-5">
          {/* Mobile Dynamic Heading Stage (Smooth Blurred Crossfade on Swipe/Jump) */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="size-2 rounded-full bg-accent" />
              <p className="text-xs font-bold uppercase tracking-widest text-paper/80">
                What we do • Specialized Operations
              </p>
            </div>

            {/* Blurred Crossfade Overlapping Grid for Heading & Description */}
            <div className="grid grid-cols-1 grid-rows-1 min-h-[10.5rem]">
              {services.map((item, idx) => {
                const isActive = idx === mobileIndex;
                const isPast = idx < mobileIndex;
                const stateClass = isActive
                  ? "service-text-active"
                  : isPast
                    ? "service-text-hidden-up"
                    : "service-text-hidden-down";

                return (
                  <div
                    key={item.number}
                    className={`col-start-1 row-start-1 space-y-3 ${stateClass}`}
                  >
                    <div className="space-y-1">
                      <h2 className="font-bricolage text-3xl sm:text-4xl font-semibold uppercase tracking-tight text-paper">
                        {item.title}
                      </h2>
                      <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-accent">
                        {item.tagline}
                      </p>
                    </div>

                    <p className="text-xs sm:text-sm font-medium leading-relaxed text-paper/75 line-clamp-3 sm:line-clamp-none">
                      {item.description}
                    </p>

                    {/* Scope Pills */}
                    <div className="flex flex-wrap gap-1.5 pt-0.5">
                      {item.pills.map((pill) => (
                        <span
                          key={pill}
                          className="rounded-full border border-paper/20 bg-paper/5 px-2.5 py-0.5 text-[0.65rem] font-semibold text-paper/90"
                        >
                          {pill}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Horizontal Scrollable Segmented Tab Bar (Symmetric & Balanced) */}
          <div className="border-t border-paper/15 pt-4">
            <div
              ref={mobileTabsRef}
              className="flex items-center gap-2 overflow-x-auto py-1 scrollbar-none"
            >
              {services.map((service, idx) => {
                const isSelected = idx === mobileIndex;
                return (
                  <button
                    key={service.number}
                    type="button"
                    onClick={() => scrollMobileTo(idx)}
                    className={`group relative flex shrink-0 items-center rounded-full px-3.5 py-2 text-xs font-bold transition-[background-color,color,border-color] duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] cursor-pointer ${
                      isSelected
                        ? "bg-accent text-primary border border-accent"
                        : "border border-paper/20 bg-paper/5 text-paper/70 hover:border-paper/40 hover:bg-paper/10 hover:text-paper"
                    }`}
                  >
                    <span className="shrink-0">{service.number}</span>
                    <span
                      className={`inline-block overflow-hidden whitespace-nowrap transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${
                        isSelected
                          ? "max-w-44 opacity-100 pl-2"
                          : "max-w-0 opacity-0 pl-0"
                      }`}
                    >
                      {service.title}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Continuous Real-time Horizontal Snap Track with All 8 Clean Cards */}
          <div
            ref={mobileCarouselRef}
            onScroll={handleMobileScroll}
            onTouchStart={() => {
              gsap.killTweensOf(mobileCarouselRef.current);
              setIsSnapping(true);
              isMobileScrollingRef.current = false;
            }}
            onPointerDown={(e) => {
              if (e.pointerType === "touch") {
                gsap.killTweensOf(mobileCarouselRef.current);
                setIsSnapping(true);
                isMobileScrollingRef.current = false;
              }
            }}
            className={`relative flex gap-4 overflow-x-auto scrollbar-none px-1 py-1 ${
              isSnapping ? "snap-x snap-mandatory" : ""
            }`}
            style={{
              WebkitOverflowScrolling: "touch",
            }}
          >
            {services.map((item, sIdx) => {
              const CurIcon = item.icon;
              return (
                <div
                  key={item.number}
                  className="group relative overflow-hidden rounded-3xl border border-paper/20 bg-ink shadow-md flex flex-col justify-between p-5 pb-5 sm:p-7 sm:pb-7 w-[86vw] sm:w-[82vw] max-w-[27rem] shrink-0 snap-start min-h-[25.5rem]"
                >
                  {/* Full-bleed Background Picture (Vivid & Bright) */}
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="86vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  {/* Strictly Internal Gradient Scrim: 100% Clipped inside Rounded Card */}
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/30 via-50% to-ink/10 pointer-events-none" />

                  {/* Card Top: Prominent Service Title & Floating Glass Icon */}
                  <div className="relative z-1 flex items-start justify-between gap-3">
                    <h3 className="font-bricolage text-xl sm:text-2xl font-bold uppercase tracking-tight text-paper drop-shadow-lg leading-tight">
                      {item.title}
                    </h3>

                    <span className="grid size-11 place-items-center rounded-full border border-paper/30 bg-ink/60 text-paper backdrop-blur-md transition-all duration-500 group-hover:rotate-12 group-hover:bg-accent group-hover:text-ink shadow-md shrink-0">
                      <CurIcon size={20} strokeWidth={1.8} />
                    </span>
                  </div>

                  {/* Middle/Bottom: 4 Operational Milestones (Seamlessly Docked to Base) */}
                  <div className="relative z-1 mt-auto space-y-2">
                    <p className="text-xs font-extrabold uppercase tracking-widest text-accent drop-shadow-sm">
                      Operational Execution
                    </p>

                    <div className="grid grid-cols-2 gap-2">
                      {item.steps.map((step, stepIdx) => (
                        <div
                          key={step.title}
                          className="rounded-2xl border border-paper/15 bg-ink/60 p-2.5 backdrop-blur-md transition-all duration-300 hover:border-accent/40 hover:bg-ink/80 shadow-sm"
                        >
                          <div className="flex items-center gap-1.5">
                            <span className="text-[0.62rem] font-extrabold text-accent uppercase tracking-wider">
                              0{stepIdx + 1}
                            </span>
                            <span className="size-1 rounded-full bg-paper/40" />
                            <h4 className="font-bricolage text-[0.72rem] font-bold uppercase text-paper leading-tight">
                              {step.title}
                            </h4>
                          </div>
                          <p className="mt-1 text-[0.68rem] leading-snug text-paper/85 font-medium">
                            {step.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Floating Navigation Controls & Common Dedicated CTA */}
          <div className="space-y-3 px-1 pt-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={prevMobileService}
                  aria-label="Previous Service"
                  className="grid size-10 place-items-center rounded-full border border-paper/25 bg-ink/60 text-paper transition-all hover:bg-accent hover:text-ink cursor-pointer shadow-md"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  type="button"
                  onClick={nextMobileService}
                  aria-label="Next Service"
                  className="grid size-10 place-items-center rounded-full border border-paper/25 bg-ink/60 text-paper transition-all hover:bg-accent hover:text-ink cursor-pointer shadow-md"
                >
                  <ChevronRight size={18} />
                </button>
                <span className="ml-2 text-xs font-bold text-paper/60">
                  Swipe cards ↔
                </span>
              </div>

              {/* Pagination dots indicator */}
              <div className="flex items-center gap-1.5">
                {services.map((_, dotIdx) => (
                  <button
                    key={dotIdx}
                    type="button"
                    onClick={() => scrollMobileTo(dotIdx)}
                    aria-label={`Go to slide ${dotIdx + 1}`}
                    className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                      dotIdx === mobileIndex
                        ? "w-6 bg-accent"
                        : "w-1.5 bg-paper/30 hover:bg-paper/50"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Common Primary Dynamic CTA Button outside cards (Matches Hero Section Design) */}
            <a
              href="#contact"
              className="button-accent group inline-flex w-full items-center justify-between gap-5 rounded-full py-2 pl-5 pr-2 text-sm font-bold shadow-xl transition-transform duration-300 hover:scale-[1.01]"
            >
              <span className="truncate">Inquire about {services[mobileIndex].title}</span>
              <span className="grid size-10 place-items-center rounded-full bg-ink text-paper transition-transform duration-500 ease-out group-hover:rotate-45 shrink-0">
                <ArrowUpRight size={18} strokeWidth={2} />
              </span>
            </a>
          </div>
        </div>

        {/* ========================================================= */}
        {/* DESKTOP VIEW (>= lg: 1024px) - 2-Column Stacking Stage   */}
        {/* ========================================================= */}
        <div className="hidden lg:grid gap-14 lg:grid-cols-12 lg:gap-16">
          {/* Left Column: Vertically Centered Sticky Stage with smooth crossfade */}
          <div className="lg:col-span-5 lg:sticky lg:top-0 lg:h-svh lg:flex lg:flex-col lg:justify-center lg:self-start space-y-6">
            <div className="flex items-center gap-3">
              <span className="size-2 rounded-full bg-accent" />
              <p className="text-xs font-bold uppercase tracking-widest text-paper/80">
                What we do • Specialized Operations
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
                    <div className="flex flex-wrap gap-2 pt-1">
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
                );
              })}
            </div>

            {/* Interactive 8-Service Navigator */}
            <div className="pt-4 border-t border-paper/15 space-y-3">
              <p className="text-xs font-extrabold uppercase tracking-widest text-paper/50">
                Jump to Division
              </p>
              <div
                ref={desktopTabsRef}
                className="flex items-center gap-2 overflow-x-auto py-1 scrollbar-none"
              >
                {services.map((item, idx) => {
                  const isActive = idx === activeIndex;
                  return (
                    <button
                      key={item.number}
                      type="button"
                      onClick={() => scrollToService(idx)}
                      className={`group relative flex shrink-0 items-center rounded-full px-3.5 py-1.5 text-xs font-bold transition-[background-color,color,border-color] duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] cursor-pointer ${
                        isActive
                          ? "bg-accent text-primary border border-accent shadow-sm"
                          : "border border-paper/15 bg-paper/10 text-paper/70 hover:border-paper/30 hover:bg-paper/20 hover:text-paper"
                      }`}
                      aria-label={`Jump to ${item.title}`}
                    >
                      <span className="shrink-0">{item.number}</span>
                      <span
                        className={`inline-block overflow-hidden whitespace-nowrap transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${
                          isActive
                            ? "max-w-44 opacity-100 pl-2"
                            : "max-w-0 opacity-0 pl-0"
                        }`}
                      >
                        {item.title}
                      </span>
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
                  className="group sticky min-h-[34rem] sm:min-h-[35rem] lg:min-h-[36rem] overflow-hidden rounded-3xl border border-paper/20 bg-ink shadow-2xl shadow-ink/70 flex flex-col justify-between p-7 sm:p-8 lg:p-9"
                >
                  {/* Full Background Image (Full-bleed & Bright) */}
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    sizes="(min-width: 1024px) 58vw, 100vw"
                    className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                  />

                  {/* Soft & Transparent Gradient: keeps the photo bright & vivid while supporting text readability */}
                  <div className="absolute inset-0 bg-gradient-to-b from-ink/15 via-ink/30 to-ink/75 pointer-events-none" />

                  {/* Top Header Row: Large Prominent Title & Floating Glass Icon (Clean & Uncut) */}
                  <div className="relative z-1 flex items-start justify-between gap-4">
                    <h3 className="font-bricolage text-2xl sm:text-3xl lg:text-4xl font-bold uppercase tracking-tight text-paper drop-shadow-lg leading-tight">
                      {service.title}
                    </h3>

                    <span className="grid size-12 sm:size-14 place-items-center rounded-full border border-paper/30 bg-ink/50 text-paper backdrop-blur-md transition-all duration-500 group-hover:rotate-12 group-hover:bg-accent group-hover:text-ink shadow-md shrink-0">
                      <Icon size={24} strokeWidth={1.8} />
                    </span>
                  </div>

                  {/* Middle: 4 Frosted Glass Milestone Tiles with Compact Typography (Wide-Open Picture View) */}
                  <div className="relative z-1 space-y-3">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-extrabold uppercase tracking-widest text-accent drop-shadow-md">
                        Operational Execution
                      </p>
                      <span className="text-xs font-semibold text-paper/75 uppercase tracking-wider hidden sm:inline-block drop-shadow-sm">
                        Dedicated US-Hour Desk
                      </span>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                      {service.steps.map((step, sIdx) => (
                        <div
                          key={step.title}
                          className="rounded-2xl border border-paper/20 bg-ink/50 p-3 sm:p-3.5 backdrop-blur-md transition-all duration-300 hover:border-accent/40 hover:bg-ink/75 shadow-sm"
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-[0.65rem] font-extrabold text-accent uppercase tracking-wider">
                              Step 0{sIdx + 1}
                            </span>
                            <span className="size-1 rounded-full bg-paper/40" />
                            <h4 className="font-bricolage text-xs sm:text-sm font-bold uppercase text-paper tracking-wide">
                              {step.title}
                            </h4>
                          </div>
                          <p className="mt-1 text-[0.72rem] sm:text-xs leading-relaxed text-paper/85 font-medium">
                            {step.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="relative z-1 flex items-center justify-between border-t border-paper/15 pt-4">
                    <p className="text-xs font-medium text-paper/80 hidden sm:block drop-shadow-sm">
                      Direct integration into your CRM, TMS & freight software.
                    </p>
                    <a
                      href="#contact"
                      className="button-accent group ml-auto inline-flex items-center gap-5 rounded-full py-2 pl-5 pr-2 text-sm font-bold shadow-xl transition-transform duration-300 hover:scale-[1.01] cursor-pointer"
                    >
                      <span>Inquire about {service.title}</span>
                      <span className="grid size-10 place-items-center rounded-full bg-ink text-paper transition-transform duration-500 ease-out group-hover:rotate-45 shrink-0">
                        <ArrowUpRight size={18} strokeWidth={2} />
                      </span>
                    </a>
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
