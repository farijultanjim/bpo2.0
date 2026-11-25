"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUp, Download, ShieldCheck } from "lucide-react";
import { MOTION, prefersReducedMotion, registerMotionEasings } from "@/app/lib/motion";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "About us", href: "/about" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

const SERVICES_LINKS = [
  { label: "Freight Forwarding", href: "/services" },
  { label: "Global Control Tower", href: "/services" },
  { label: "24/7 Customer Service", href: "/services" },
  { label: "Carrier Sourcing & Dispatch", href: "/services" },
  { label: "Fleet & Truckload Tracking", href: "/services" },
  { label: "Freight Billing & Audit", href: "/services" },
  { label: "Marketing & Growth", href: "/services" },
  { label: "Dedicated Logistics Staffing", href: "/services" },
];

const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/#infrastructure" },
  { label: "Terms of Service", href: "/#infrastructure" },
  { label: "ISO 27001 & SOC 2", href: "/#infrastructure" },
];

const GLOBAL_OFFICES = [
  {
    city: "New York",
    address: "47 Macdonough St, Apt 01, Brooklyn, NY 11216",
    phone: "+1 (800) 592-7489",
    iconPath: "/images/cities/new-york.svg",
  },
  {
    city: "Dubai",
    address: "B1906 East Wing, Latifa Towers, Sheikh Zayed Rd",
    phone: "+971 50 196 6827",
    iconPath: "/images/cities/dubai.svg",
  },
  {
    city: "Dhaka",
    address: "Gulshan Avenue, Level-06, Dhaka - 1212, Bangladesh",
    phone: "+880 1880 858701",
    iconPath: "/images/cities/dhaka.svg",
  },
];

const SOCIAL_LINKS = [
  {
    name: "Facebook",
    href: "https://facebook.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-4" aria-hidden="true">
        <path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7v4h3V22h4v-8.5z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-4" aria-hidden="true">
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
      </svg>
    ),
  },
  {
    name: "YouTube",
    href: "https://youtube.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-4" aria-hidden="true">
        <path d="M21.58 7.19a2.75 2.75 0 0 0-1.94-1.95C17.93 4.78 12 4.78 12 4.78s-5.93 0-7.64.46a2.75 2.75 0 0 0-1.94 1.95A28.7 28.7 0 0 0 2 12a28.7 28.7 0 0 0 .42 4.81 2.75 2.75 0 0 0 1.94 1.95c1.71.46 7.64.46 7.64.46s5.93 0 7.64-.46a2.75 2.75 0 0 0 1.94-1.95A28.7 28.7 0 0 0 22 12a28.7 28.7 0 0 0-.42-4.81zM10 15.1V8.9l5.2 3.1-5.2 3.1z" />
      </svg>
    ),
  },
  {
    name: "X",
    href: "https://x.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-3.5" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "https://instagram.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4" aria-hidden="true">
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
      </svg>
    ),
  },
];

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    registerMotionEasings();

    const footer = footerRef.current;
    if (!footer) return;
    if (prefersReducedMotion()) return;

    const context = gsap.context(() => {
      // 1. Background blueprint SVG draws itself smoothly on scroll
      gsap.fromTo(
        "[data-footer-svg]",
        { strokeDashoffset: 1 },
        {
          strokeDashoffset: 0,
          ease: MOTION.scrub.gsap,
          scrollTrigger: {
            trigger: footer,
            start: "top 85%",
            end: "bottom bottom",
            scrub: 1,
          },
        },
      );

      // 2. Main choreographed entrance timeline when Footer enters viewport
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: footer,
          start: "top 78%",
          once: true,
        },
      });

      tl.fromTo(
        "[data-footer-desc]",
        { y: 32, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.75,
          stagger: 0.08,
          ease: MOTION.signature.gsap,
        },
        0,
      )
        .fromTo(
          "[data-footer-brand]",
          { yPercent: 105, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.9,
            ease: MOTION.signature.gsap,
          },
          0.08,
        )
        .fromTo(
          "[data-footer-top-btn]",
          { scale: 0.7, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.65,
            ease: MOTION.signature.gsap,
          },
          0.22,
        )
        .fromTo(
          "[data-footer-nav-col]",
          { y: 28, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.09,
            ease: MOTION.signature.gsap,
          },
          0.16,
        )
        .fromTo(
          "[data-footer-locations-card]",
          { y: 36, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: MOTION.signature.gsap,
          },
          0.2,
        )
        .fromTo(
          "[data-footer-office]",
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.65,
            stagger: 0.1,
            ease: MOTION.signature.gsap,
          },
          0.32,
        )
        .fromTo(
          "[data-footer-bottom]",
          { y: 18, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.65,
            ease: MOTION.signature.gsap,
          },
          0.38,
        );
    }, footer);

    return () => context.revert();
  }, []);

  const scrollToTop = () => {
    const lenis = (
      window as unknown as {
        __lenis?: { scrollTo: (y: number, opts?: { duration?: number }) => void };
      }
    ).__lenis;

    if (lenis) {
      lenis.scrollTo(0, { duration: 1.1 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer
      ref={footerRef}
      className="relative z-10 overflow-hidden border-t border-white/10 bg-primary px-5 pb-10 pt-14 text-background sm:px-8 sm:pt-18 lg:px-12 lg:pt-20"
    >
      {/* Architectural Background SVG Watermark (Draws on scroll) */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1440 620"
        fill="none"
        className="pointer-events-none absolute inset-x-0 bottom-0 w-full text-background opacity-[0.07]"
      >
        <path
          data-footer-svg
          pathLength="1"
          strokeDasharray="1"
          d="M-50 590 360 185l230 225L844 42l646 548M360 185v405M844 42v548"
          stroke="currentColor"
          strokeWidth="2"
        />
      </svg>

      <div className="relative mx-auto w-full max-w-site space-y-12 lg:space-y-14">
        {/* ROW 1: 50/50 — Description & Contact (Left) | Giant NEXG + Back-to-Top Arrow (Right) */}
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-12">
          {/* Left 50%: Description, Direct Contact & Trust Pills */}
          <div className="space-y-5">
            <p
              data-footer-desc
              className="font-mono text-xs font-bold uppercase tracking-widest text-accent"
            >
              Outsourcing with savings
            </p>
            <p
              data-footer-desc
              className="max-w-lg text-base font-medium leading-relaxed text-background/80"
            >
              A dedicated logistics &amp; BPO operations partner bringing domain
              expertise, US-hours execution, and up to 72% cost savings
              together.
            </p>

            <div
              data-footer-desc
              className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm"
            >
              <a
                href="mailto:contact@nexg.com"
                className="font-semibold text-background transition-colors duration-200 hover:text-accent"
              >
                contact@nexg.com
              </a>
              <span className="text-white/20">•</span>
              <a
                href="tel:+18005927489"
                className="font-mono text-background/80 transition-colors duration-200 hover:text-accent"
              >
                +1 (800) 592-7489
              </a>
            </div>

            <div data-footer-desc className="flex flex-wrap items-center gap-2 pt-1">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.04] px-3 py-1 text-xs font-semibold text-background/90">
                <ShieldCheck size={13} className="text-accent" />
                ISO 27001 Aligned
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.04] px-3 py-1 text-xs font-semibold text-background/90">
                <span className="size-1.5 rounded-full bg-accent" />
                SOC 2 Ready
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.04] px-3 py-1 text-xs font-semibold text-background/90">
                99.98% Uptime SLA
              </span>
            </div>
          </div>

          {/* Right 50%: Giant NEXG Brand Text (Masked Reveal) + Circular Back-to-Top Button */}
          <div className="flex items-center justify-between gap-6 lg:justify-end">
            <div className="overflow-hidden py-1">
              <p
                data-footer-brand
                className="select-none font-bricolage text-[17vw] sm:text-[13vw] lg:text-[8.5rem] xl:text-[10.5rem] font-extrabold uppercase leading-[0.82] tracking-tighter text-accent"
              >
                NEXG
              </p>
            </div>

            <button
              data-footer-top-btn
              type="button"
              onClick={scrollToTop}
              aria-label="Back to top"
              className="group grid size-14 shrink-0 cursor-pointer place-items-center rounded-full border border-white/20 bg-white/[0.05] text-background transition-all duration-300 ease-[var(--ease-micro)] hover:border-accent hover:bg-accent hover:text-primary sm:size-16"
            >
              <ArrowUp
                size={22}
                strokeWidth={1.8}
                className="transition-transform duration-300 ease-[var(--ease-micro)] group-hover:-translate-y-1"
              />
            </button>
          </div>
        </div>

        {/* ROW 2: Equal 50/50 — Nav Links (Left) | Elevated Locations Card (Right) */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-stretch lg:gap-12">
          {/* Left 50%: Navigation, Services, Legal Columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:py-2">
            <div data-footer-nav-col>
              <h3 className="mb-4 font-mono text-xs font-bold uppercase tracking-widest text-accent">
                Navigation
              </h3>
              <ul className="space-y-2.5 text-sm">
                {NAV_LINKS.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-background/75 transition-colors duration-200 hover:text-background"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div data-footer-nav-col>
              <h3 className="mb-4 font-mono text-xs font-bold uppercase tracking-widest text-accent">
                Services
              </h3>
              <ul className="space-y-2.5 text-sm">
                {SERVICES_LINKS.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-background/75 transition-colors duration-200 hover:text-background"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div data-footer-nav-col>
              <h3 className="mb-4 font-mono text-xs font-bold uppercase tracking-widest text-accent">
                Legal &amp; Trust
              </h3>
              <ul className="space-y-2.5 text-sm">
                {LEGAL_LINKS.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-background/75 transition-colors duration-200 hover:text-background"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right 50%: Elevated Locations Card with exact Musemind SVGs in accent color */}
          <div
            data-footer-locations-card
            className="flex items-center rounded-xl border border-white/10 bg-primary-hover/95 p-6 shadow-2xl backdrop-blur-md sm:p-8"
          >
            <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-3">
              {GLOBAL_OFFICES.map((office) => (
                <div key={office.city} data-footer-office className="space-y-2.5">
                  <div
                    className="h-8 w-14 bg-accent"
                    style={{
                      WebkitMaskImage: `url(${office.iconPath})`,
                      maskImage: `url(${office.iconPath})`,
                      WebkitMaskSize: "contain",
                      maskSize: "contain",
                      WebkitMaskRepeat: "no-repeat",
                      maskRepeat: "no-repeat",
                      WebkitMaskPosition: "left center",
                      maskPosition: "left center",
                    }}
                    aria-hidden="true"
                  />
                  <h3 className="font-bricolage text-lg font-bold tracking-tight text-background">
                    {office.city}
                  </h3>
                  <p className="text-xs leading-relaxed text-background/65">
                    {office.address}
                  </p>
                  <a
                    href={`tel:${office.phone.replace(/[^+\d]/g, "")}`}
                    className="inline-block text-sm font-medium text-background/90 transition-colors duration-200 hover:text-accent"
                  >
                    {office.phone}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ROW 3: Bottom Strip — Company Deck | Copyright | Social Icons */}
        <div
          data-footer-bottom
          className="flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-8 md:flex-row"
        >
          <a
            href="#contact"
            className="group inline-flex items-center gap-3.5 transition-opacity duration-200 hover:opacity-90"
          >
            <span className="grid size-11 shrink-0 place-items-center rounded-full bg-accent text-primary shadow-md transition-transform duration-300 ease-[var(--ease-micro)] group-hover:scale-105">
              <Download size={17} strokeWidth={2.2} />
            </span>
            <div>
              <p className="font-bricolage text-sm font-bold leading-tight text-background">
                Company Deck
              </p>
              <p className="mt-0.5 font-mono text-[11px] text-background/60">
                PDF, 3 MB
              </p>
            </div>
          </a>

          <p className="text-center text-xs font-medium text-background/70">
            &copy; 2026, NexG Operations | All Rights Reserved.
          </p>

          <div className="flex items-center gap-2.5">
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                title={social.name}
                className="flex size-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.08] text-background/85 transition-all duration-200 ease-[var(--ease-micro)] hover:border-accent hover:bg-accent hover:text-primary"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
export { Footer as SiteFooter };
