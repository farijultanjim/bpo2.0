"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ChevronDown,
  Compass,
  Headset,
  Megaphone,
  Plane,
  Receipt,
  Route,
  Truck,
  Users,
} from "lucide-react";
import { useMagnetic } from "@/app/lib/use-magnetic";

const EASE = "cubic-bezier(0.8, 0, 0.3, 1)";
const CURVE_EASE = [0.22, 1, 0.36, 1] as const;

const NAV_LINKS = [
  { label: "Services", href: "#services", hasDropdown: true },
  { label: "Process", href: "#work" },
  { label: "Why us", href: "#metrics" },
  { label: "Infrastructure", href: "#infrastructure" },
  { label: "FAQ", href: "#faq" },
];
const SERVICES_MENU = [
  {
    number: "01",
    title: "Freight Forwarding",
    tagline: "Air & ocean, import & export files",
    href: "#services",
    icon: Plane,
  },
  {
    number: "02",
    title: "Global Control Tower",
    tagline: "Live supply chain visibility & tracking",
    href: "#services",
    icon: Compass,
  },
  {
    number: "03",
    title: "24/7 Customer Service",
    tagline: "Round-the-clock desks for shippers",
    href: "#services",
    icon: Headset,
  },
  {
    number: "04",
    title: "Carrier Sourcing & Dispatch",
    tagline: "Capacity booking & driver check-calls",
    href: "#services",
    icon: Route,
  },
  {
    number: "05",
    title: "Fleet & Truckload Tracking",
    tagline: "FTL & LTL track & trace across US lanes",
    href: "#services",
    icon: Truck,
  },
  {
    number: "06",
    title: "Freight Billing & Audit",
    tagline: "Invoice matching, rate audits & claims",
    href: "#services",
    icon: Receipt,
  },
  {
    number: "07",
    title: "Marketing & Growth",
    tagline: "Lead generation & outreach for 3PLs",
    href: "#services",
    icon: Megaphone,
  },
  {
    number: "08",
    title: "Dedicated Logistics Staffing",
    tagline: "Vetted offshore talent placed in 14 days",
    href: "#services",
    icon: Users,
  },
];


const smoothScrollTo = (target: string, e?: React.MouseEvent) => {
  if (e) e.preventDefault();
  const targetMap: Record<string, string> = {
    "#work": "#process",
    "#metrics": "#results",
    "#infrastructure": "#infrastructure",
  };
  const resolvedTarget = targetMap[target] || target;
  const el =
    document.querySelector(resolvedTarget) || document.querySelector(target);
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
  }
};

const getIsDarkUnderHeader = (): boolean => {
  if (typeof window === "undefined") return true;
  const headerY = 50;
  const sections = document.querySelectorAll("main > section");
  for (let i = 0; i < sections.length; i++) {
    const section = sections[i] as HTMLElement;
    const rect = section.getBoundingClientRect();
    if (rect.top <= headerY && rect.bottom > headerY) {
      const cls = section.className || "";
      if (
        cls.includes("bg-accent") ||
        cls.includes("bg-background") ||
        cls.includes("bg-background") ||
        section.id === "process" ||
        section.id === "results" ||
        section.id === "faq" ||
        section.id === "infrastructure" ||
        section.id === "craft"
      ) {
        return false;
      }
      return true;
    }
  }
  return true;
};

export function Header() {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("#services");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const servicesTimeoutRef = useRef<number | null>(null);
  const navRef = useRef<HTMLElement>(null);

  const handleServicesEnter = () => {
    if (servicesTimeoutRef.current) {
      window.clearTimeout(servicesTimeoutRef.current);
      servicesTimeoutRef.current = null;
    }
    setIsServicesOpen(true);
  };

  const handleServicesLeave = () => {
    if (servicesTimeoutRef.current) {
      window.clearTimeout(servicesTimeoutRef.current);
    }
    servicesTimeoutRef.current = window.setTimeout(() => {
      setIsServicesOpen(false);
    }, 180);
  };
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuBtnRef = useRef<HTMLButtonElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const ctaRef = useMagnetic<HTMLAnchorElement>(0.38);

  // Dynamic theme detection based on current section under the header
  useEffect(() => {
    const updateTheme = () => {
      setIsDarkTheme(getIsDarkUnderHeader());
    };
    updateTheme();
    window.addEventListener("scroll", updateTheme, { passive: true });
    window.addEventListener("resize", updateTheme, { passive: true });
    return () => {
      window.removeEventListener("scroll", updateTheme);
      window.removeEventListener("resize", updateTheme);
    };
  }, []);

  // Scroll compaction: header rises and logo / CTA pull in toward the nav
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const header = headerRef.current;
    const container = containerRef.current;
    if (!header || !container) return;

    const mm = gsap.matchMedia();
    mm.add(
      {
        desktop: "(min-width: 1024px)",
        mobile: "(max-width: 1023px)",
        reduced: "(prefers-reduced-motion: reduce)",
      },
      (ctx) => {
        const { desktop, reduced } = ctx.conditions as {
          desktop: boolean;
          reduced: boolean;
        };
        if (reduced) return;

        const pull = container.offsetWidth * (desktop ? 0.08 : 0.03);
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: document.body,
            start: "top top",
            end: "+=320",
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        });
        tl.to(header, { paddingTop: 14, ease: "none" }, 0)
          .to(logoRef.current, { x: () => pull, ease: "none" }, 0)
          .to(rightRef.current, { x: () => -pull, ease: "none" }, 0);
      },
    );
    return () => mm.revert();
  }, []);

  // Scroll Spy: accurately track active section in viewport
  useEffect(() => {
    const handleScrollSpy = () => {
      const scrollPos = window.scrollY + 220;

      for (let i = NAV_LINKS.length - 1; i >= 0; i--) {
        const link = NAV_LINKS[i];
        const selector =
          link.href === "#work"
            ? "#process"
            : link.href === "#metrics"
              ? "#results"
              : link.href;
        const el = document.querySelector(selector) as HTMLElement | null;
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(link.href);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScrollSpy, { passive: true });
    handleScrollSpy();
    return () => window.removeEventListener("scroll", handleScrollSpy);
  }, []);

  // Mobile drawer: close on Escape or click outside
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        menuBtnRef.current?.focus();
      }
    };
    const onDown = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        menuRef.current &&
        !menuRef.current.contains(target) &&
        menuBtnRef.current &&
        !menuBtnRef.current.contains(target)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onDown);
    };
  }, [open]);

  // Close services mega pill on Escape or click outside
  useEffect(() => {
    if (!isServicesOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsServicesOpen(false);
      }
    };
    const onDown = (e: MouseEvent) => {
      const target = e.target as Node;
      if (navRef.current && !navRef.current.contains(target)) {
        setIsServicesOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onDown);
    };
  }, [isServicesOpen]);

  // Close the mobile drawer if the viewport grows to desktop
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = (e: MediaQueryListEvent) => {
      if (e.matches) setOpen(false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <>
      {/* Mobile-only dim overlay */}
      <div
        id="header-background"
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-50 bg-foreground/40 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        style={{ transitionTimingFunction: EASE }}
        aria-hidden="true"
      />

      <header
        ref={headerRef}
        id="header"
        className="fixed top-0 left-0 w-full z-50 px-5 sm:px-8 lg:px-16 py-5 sm:py-8 lg:py-10 pointer-events-none"
      >
        <div
          ref={containerRef}
          className="mx-auto w-full max-w-site relative pointer-events-auto"
        >
          <div
            id="header-container"
            className="relative flex items-center justify-between gap-6 min-h-[44px]"
          >
            {/* Logo — far left */}
            <Link
              ref={logoRef}
              id="header-logo"
              href="/"
              aria-label="Spectra — Home"
              className="group flex shrink-0 items-center gap-2.5 transition-opacity duration-300 hover:opacity-85 z-10"
            >
              <div className="relative flex items-center justify-center size-8 md:size-9 rounded-lg bg-accent text-primary transition-transform duration-500 group-hover:rotate-45">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-primary"
                  aria-hidden="true"
                >
                  <path
                    d="M12 2L21 7V17L12 22L3 17V7L12 2Z"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 2V22"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeOpacity="0.4"
                  />
                  <path
                    d="M3 7L21 17M3 17L21 7"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeOpacity="0.6"
                  />
                </svg>
              </div>
              <span
                className={`font-heading text-xl md:text-2xl font-extrabold tracking-tight uppercase leading-none select-none transition-colors duration-300 ${
                  isDarkTheme ? "text-background drop-shadow-md" : "text-foreground"
                }`}
              >
                SPECTRA
              </span>
            </Link>

            {/* Inline nav pill — fixed wide width from start, identical rounded-full pill shape, vertical expansion on hover */}
            <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 top-0 items-start justify-center z-30 pointer-events-auto">
              <motion.nav
                ref={navRef}
                id="header-nav"
                aria-label="Primary"
                animate={{
                  boxShadow: isServicesOpen
                    ? "0 24px 60px -12px rgba(0, 0, 0, 0.32), 0 0 0 1px rgba(255, 255, 255, 0.06)"
                    : "0 4px 14px -2px rgba(0, 0, 0, 0.12)",
                }}
                transition={{
                  duration: 0.45,
                  ease: CURVE_EASE,
                }}
                onMouseLeave={() => {
                  setHoveredIndex(null);
                  handleServicesLeave();
                }}
                className="relative w-[600px] xl:w-[640px] rounded-[26px] overflow-hidden border border-line/40 bg-surface/95 backdrop-blur-2xl p-1.5 transition-colors duration-300"
              >
                {/* Top Row: 5 nav links spaced across the full pill width */}
                <div className="flex items-center justify-between h-9 px-3 w-full">
                  {NAV_LINKS.map((link, idx) => {
                    const isHovered = hoveredIndex === idx;
                    const isActive = activeSection === link.href;
                    const isServicesLink = link.label === "Services";

                    return (
                      <a
                        key={link.label}
                        href={link.href}
                        onMouseEnter={() => {
                          setHoveredIndex(idx);
                          if (isServicesLink) {
                            handleServicesEnter();
                          } else {
                            if (servicesTimeoutRef.current) {
                              window.clearTimeout(servicesTimeoutRef.current);
                              servicesTimeoutRef.current = null;
                            }
                            setIsServicesOpen(false);
                          }
                        }}
                        onClick={(e) => {
                          setIsServicesOpen(false);
                          smoothScrollTo(link.href, e);
                        }}
                        className="group relative flex h-9 items-center gap-1.5 rounded-full px-4 text-[13px] font-medium uppercase tracking-wider transition-colors duration-200 z-1 cursor-pointer shrink-0"
                        style={{ transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)" }}
                      >
                        {/* Feature 1: Smooth Sliding Hover Pill via Framer Motion layoutId */}
                        {isHovered && (
                          <motion.span
                            layoutId="nav-hover-pill"
                            className="absolute inset-0 rounded-full bg-accent/25 -z-1"
                            transition={{ type: "spring", stiffness: 450, damping: 32 }}
                          />
                        )}

                        {/* Feature 2: Active Section Dot Indicator */}
                        {isActive && (
                          <motion.span
                            layoutId="nav-active-dot"
                            className="absolute bottom-1 left-1/2 -translate-x-1/2 size-1 rounded-full bg-accent"
                            transition={{ type: "spring", stiffness: 450, damping: 32 }}
                          />
                        )}

                        <span className="relative block h-4 overflow-hidden whitespace-nowrap">
                          <span
                            className={`block leading-4 whitespace-nowrap transition-transform duration-400 group-hover:-translate-y-full ${
                              isActive ? "text-primary font-semibold" : "text-foreground"
                            }`}
                            style={{ transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)" }}
                          >
                            {link.label}
                          </span>
                          <span
                            className="absolute top-0 left-0 block leading-4 whitespace-nowrap translate-y-full transition-transform duration-400 group-hover:translate-y-0 text-primary font-semibold"
                            style={{ transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)" }}
                            aria-hidden="true"
                          >
                            {link.label}
                          </span>
                        </span>

                        {/* Animated Chevron for Services */}
                        {isServicesLink && (
                          <ChevronDown
                            size={13}
                            className={`transition-transform duration-300 opacity-60 group-hover:opacity-100 ${
                              isServicesOpen ? "rotate-180 text-primary" : "rotate-0 text-foreground"
                            }`}
                          />
                        )}
                      </a>
                    );
                  })}
                </div>

                {/* Vertical Expansion: Height animates smoothly downwards with reference curve easing */}
                <AnimatePresence>
                  {isServicesOpen && (
                    <motion.div
                      key="services-dropdown"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{
                        height: { duration: 0.45, ease: CURVE_EASE },
                        opacity: { duration: 0.25, ease: CURVE_EASE },
                      }}
                      className="overflow-hidden"
                      onMouseEnter={handleServicesEnter}
                      onMouseLeave={handleServicesLeave}
                    >
                      {/* Subtle separator inside the pill */}
                      <div className="mx-2 my-2 h-px bg-line/25" />

                      {/* Header Sub-bar */}
                      <div className="flex items-center justify-between px-3 pt-1 pb-2">
                        <div className="flex items-center gap-2">
                          <span className="size-1.5 rounded-full bg-accent animate-pulse" />
                          <span className="text-[11px] font-extrabold uppercase tracking-widest text-foreground/80">
                            Specialized Operations • 8 Core Divisions
                          </span>
                        </div>
                        <span className="text-[10px] font-bold text-primary uppercase tracking-wider bg-accent/25 px-2.5 py-0.5 rounded-full">
                          24/7 US Hours Desk
                        </span>
                      </div>

                      {/* 2-Column Grid of 8 Services */}
                      <div className="grid grid-cols-2 gap-2 p-1.5">
                        {SERVICES_MENU.map((service) => {
                          const Icon = service.icon;

                          return (
                            <a
                              key={service.number}
                              href={service.href}
                              onClick={(e) => {
                                setIsServicesOpen(false);
                                smoothScrollTo(service.href, e);
                              }}
                              className="group/item flex items-start gap-3 rounded-2xl p-2.5 transition-all duration-200 hover:bg-accent/15 cursor-pointer"
                            >
                              <span className="grid size-9 shrink-0 place-items-center rounded-xl border border-line/40 bg-canvas/80 text-foreground transition-all duration-300 group-hover/item:border-accent group-hover/item:bg-accent group-hover/item:text-primary shadow-xs">
                                <Icon size={17} strokeWidth={1.8} />
                              </span>
                              <div className="min-w-0 flex-1">
                                <div className="flex items-center gap-2">
                                  <span className="text-[10px] font-mono font-bold text-accent-hover tracking-wider">
                                    {service.number}
                                  </span>
                                  <h4 className="font-bricolage text-[13px] font-bold uppercase tracking-tight text-foreground transition-colors duration-200 group-hover/item:text-primary truncate">
                                    {service.title}
                                  </h4>
                                </div>
                                <p className="mt-0.5 text-[11px] leading-snug text-muted line-clamp-1">
                                  {service.tagline}
                                </p>
                              </div>
                            </a>
                          );
                        })}
                      </div>

                      {/* Bottom Footer Action Strip */}
                      <div className="mt-2 border-t border-line/25 px-4 py-2.5 flex items-center justify-between bg-canvas/40 rounded-b-[24px]">
                        <p className="text-[11px] font-medium text-muted">
                          Direct integration into CargoWise, McLeod & freight TMS.
                        </p>
                        <a
                          href="#services"
                          onClick={(e) => {
                            setIsServicesOpen(false);
                            smoothScrollTo("#services", e);
                          }}
                          className="group/link inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary hover:text-accent-hover transition-colors cursor-pointer"
                        >
                          <span>Explore all services</span>
                          <span className="transition-transform duration-300 group-hover/link:translate-x-1">→</span>
                        </a>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.nav>
            </div>

            {/* Right controls — CTA always far right */}
            <div
              ref={rightRef}
              id="header-right"
              className="flex shrink-0 items-center gap-3 z-10"
            >
              {/* Mobile-only menu toggle */}
              <button
                id="header-right-menu-btn"
                ref={menuBtnRef}
                type="button"
                onClick={() => setOpen((prev) => !prev)}
                aria-label="Menu button"
                aria-expanded={open}
                aria-controls="header-menu"
                className={`group relative flex lg:hidden h-11 items-center overflow-hidden rounded-full px-6 pr-4 text-sm font-bold uppercase tracking-wider transition-colors duration-300 cursor-pointer border-none shadow-none ${
                  isDarkTheme
                    ? "bg-accent text-primary hover:bg-primary hover:text-accent"
                    : "bg-primary text-background hover:bg-accent hover:text-primary"
                }`}
              >
                <div className="relative flex items-center justify-center overflow-hidden gap-2">
                  <span className="relative block h-5 w-12 overflow-hidden text-left">
                    <span
                      className="absolute inset-0 block transition-transform duration-300"
                      style={{
                        transform: open
                          ? "translateY(-100%)"
                          : "translateY(0%)",
                        transitionTimingFunction: EASE,
                      }}
                    >
                      Menu
                    </span>
                    <span
                      className="absolute inset-0 block transition-transform duration-300"
                      style={{
                        transform: open ? "translateY(0%)" : "translateY(100%)",
                        transitionTimingFunction: EASE,
                      }}
                    >
                      Close
                    </span>
                  </span>
                  <div
                    className="flex items-center gap-1 transition-transform duration-400"
                    style={{
                      transform: open ? "rotate(270deg)" : "rotate(0deg)",
                      transitionTimingFunction: EASE,
                    }}
                    aria-hidden="true"
                  >
                    <span className="size-1 rounded-full bg-current block" />
                    <span className="size-1 rounded-full bg-current block" />
                  </div>
                </div>
              </button>

              {/* Feature 3 & Mobile Opt 1: Desktop-only "Let's talk" CTA with 24/7 Live Beacon Pulse */}
              <a
                ref={ctaRef}
                id="header-right-talk-btn"
                href="#contact"
                onClick={(e) => {
                  setOpen(false);
                  smoothScrollTo("#contact", e);
                }}
                className={`group relative hidden lg:flex h-11 items-center overflow-hidden rounded-full px-6 pr-4 text-sm font-medium uppercase tracking-wider transition-colors duration-300 border-none shadow-none cursor-pointer ${
                  isDarkTheme
                    ? "bg-accent text-primary hover:bg-primary hover:text-accent"
                    : "bg-primary text-background hover:bg-accent hover:text-primary"
                }`}
              >
                {/* Sliding arrow on hover */}
                <span
                  className="absolute left-4 top-1/2 -translate-y-1/2 -translate-x-9 transition-transform duration-300 group-hover:translate-x-0 text-current"
                  style={{ transitionTimingFunction: EASE }}
                  aria-hidden="true"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="none"
                    viewBox="0 0 16 16"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M2.343 8h11.314m0 0-4.984 4.984M13.657 8 8.673 3.016"
                    />
                  </svg>
                </span>

                <span
                  className="transition-transform duration-300 group-hover:translate-x-4"
                  style={{ transitionTimingFunction: EASE }}
                >
                  Let&rsquo;s talk
                </span>

                {/* Feature 3: Dynamic 24/7 Live Operations Beacon Pulse matching button theme */}
                <span
                  className="relative ml-2.5 flex size-1.5 items-center justify-center transition-transform duration-200 group-hover:scale-0"
                  style={{ transitionTimingFunction: EASE }}
                  aria-label="24/7 Live Support"
                >
                  <span
                    className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 transition-colors duration-300 [animation-duration:700ms] ${
                      isDarkTheme
                        ? "bg-primary group-hover:bg-accent"
                        : "bg-accent group-hover:bg-primary"
                    }`}
                  />
                  <span
                    className={`relative inline-flex size-1.5 rounded-full transition-colors duration-300 ${
                      isDarkTheme
                        ? "bg-primary group-hover:bg-accent"
                        : "bg-accent group-hover:bg-primary"
                    }`}
                  />
                </span>
              </a>
            </div>
          </div>

          {/* Mobile Option 1: Mobile Drawer with Navigation, Full CTA & Direct Support */}
          <div
            ref={menuRef}
            id="header-menu"
            className={`absolute top-16 right-0 w-[min(calc(100vw-2.5rem),21rem)] z-50 lg:hidden ${
              open ? "pointer-events-auto" : "pointer-events-none"
            }`}
          >
            <div
              id="header-menu-links"
              className="bg-surface text-foreground border border-line rounded-2xl p-4 sm:p-5 shadow-2xl origin-bottom-right space-y-4"
              style={{
                transition: `transform 0.5s ${EASE}, opacity 0.5s ${EASE}`,
                transform: open
                  ? "translate3d(0px, 0px, 0px) rotate(0deg)"
                  : "translate3d(0px, 5.5em, 0px) rotate(4deg)",
                opacity: open ? 1 : 0,
                willChange: "transform, opacity",
              }}
            >
              {/* Navigation Links with Cascade delay */}
              <div className="space-y-1">
                {NAV_LINKS.map((link, lIdx) => (
                  <a
                    key={link.label}
                    href={link.href}
                    tabIndex={open ? 0 : -1}
                    onClick={(e) => {
                      setOpen(false);
                      smoothScrollTo(link.href, e);
                    }}
                    className="group relative flex items-center justify-between rounded-xl px-4 py-2.5 text-foreground transition-all duration-300 hover:bg-accent/15 cursor-pointer"
                    style={{
                      transitionDelay: open ? `${lIdx * 35}ms` : "0ms",
                    }}
                  >
                    <div className="relative block h-7 overflow-hidden whitespace-nowrap">
                      <span
                        className="block text-xl leading-7 font-medium uppercase tracking-tight text-foreground whitespace-nowrap transition-transform duration-400 group-hover:-translate-y-full"
                        style={{ transitionTimingFunction: EASE }}
                      >
                        {link.label}
                      </span>
                      <span
                        className="absolute top-0 left-0 block text-xl leading-7 font-medium uppercase tracking-tight text-primary whitespace-nowrap transition-transform duration-400 translate-y-full group-hover:translate-y-0"
                        style={{ transitionTimingFunction: EASE }}
                        aria-hidden="true"
                      >
                        {link.label}
                      </span>
                    </div>
                    <svg
                      className="size-5 transition-transform duration-300 group-hover:translate-x-1 text-muted group-hover:text-primary shrink-0"
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="none"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3.515 12h16.97m0 0L13.01 4.525M20.485 12l-7.475 7.476"
                      />
                    </svg>
                  </a>
                ))}
              </div>

              {/* Mobile Drawer Bottom: Full-Width Prominent "Let's talk" CTA + Support */}
              <div className="border-t border-line/30 pt-3.5 space-y-2.5">
                <a
                  href="#contact"
                  tabIndex={open ? 0 : -1}
                  onClick={(e) => {
                    setOpen(false);
                    smoothScrollTo("#contact", e);
                  }}
                  className="group relative flex w-full h-11 items-center justify-between rounded-full bg-accent px-5 text-sm font-bold uppercase tracking-wider text-primary transition-all duration-300 hover:bg-accent-hover shadow-md cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <span className="relative flex size-1.5 items-center justify-center">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75 [animation-duration:700ms]" />
                      <span className="relative inline-flex size-1.5 rounded-full bg-primary" />
                    </span>
                    Let&rsquo;s talk
                  </span>

                  <span className="grid size-7 place-items-center rounded-full bg-primary text-accent transition-transform duration-300 group-hover:rotate-45">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      fill="none"
                      viewBox="0 0 16 16"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M2.343 8h11.314m0 0-4.984 4.984M13.657 8 8.673 3.016"
                      />
                    </svg>
                  </span>
                </a>

                {/* 24/7 Operations Support Contact */}
                <div className="flex items-center justify-between px-2 text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-muted">
                  <span>24/7 Operations</span>
                  <a
                    href="tel:+18005927489"
                    className="hover:text-primary transition-colors duration-200"
                  >
                    +1 (800) 592-7489
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
export { Header as SiteHeader };
