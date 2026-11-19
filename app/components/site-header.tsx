"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMagnetic } from "../lib/use-magnetic";

const EASE = "cubic-bezier(0.8, 0, 0.3, 1)";

const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Process", href: "#work" },
  { label: "Why us", href: "#metrics" },
  { label: "Infrastructure", href: "#infrastructure" },
  { label: "FAQ", href: "#faq" },
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
        cls.includes("bg-paper") ||
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

export default function Header() {
  const [open, setOpen] = useState(false);
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
            className="flex items-center justify-between gap-6"
          >
            {/* Logo — far left */}
            <Link
              ref={logoRef}
              id="header-logo"
              href="/"
              aria-label="Spectra — Home"
              className="group flex shrink-0 items-center gap-2.5 transition-opacity duration-300 hover:opacity-85 z-1"
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
                  isDarkTheme ? "text-paper drop-shadow-md" : "text-foreground"
                }`}
              >
                SPECTRA
              </span>
            </Link>

            {/* Inline nav — desktop only, centered between logo and CTA */}
            <nav
              id="header-nav"
              aria-label="Primary"
              className="hidden lg:flex items-center gap-1 rounded-full border border-line/40 bg-surface/90 backdrop-blur-md p-1 shadow-md"
            >
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => smoothScrollTo(link.href, e)}
                  className="group relative flex h-9 items-center rounded-full px-4 text-xs font-medium uppercase tracking-wider text-foreground transition-colors duration-300 hover:bg-accent/25 hover:text-primary"
                  style={{ transitionTimingFunction: EASE }}
                >
                  <span className="relative block h-4 overflow-hidden">
                    <span
                      className="block leading-4 transition-transform duration-400 group-hover:-translate-y-full"
                      style={{ transitionTimingFunction: EASE }}
                    >
                      {link.label}
                    </span>
                    <span
                      className="absolute top-0 left-0 block leading-4 translate-y-full transition-transform duration-400 group-hover:translate-y-0 text-primary font-bold"
                      style={{ transitionTimingFunction: EASE }}
                      aria-hidden="true"
                    >
                      {link.label}
                    </span>
                  </span>
                </a>
              ))}
            </nav>

            {/* Right controls — CTA always far right */}
            <div
              ref={rightRef}
              id="header-right"
              className="flex shrink-0 items-center gap-3"
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
                  isDarkTheme ? "cta-button-dark" : "cta-button-light"
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

              {/* "Let's talk" CTA with original Spectra UI and magnetic cursor effect */}
              <a
                ref={ctaRef}
                id="header-right-talk-btn"
                href="#contact"
                onClick={(e) => {
                  setOpen(false);
                  smoothScrollTo("#contact", e);
                }}
                className={`group relative flex h-11 items-center overflow-hidden rounded-full px-6 pr-4 text-sm font-medium uppercase tracking-wider transition-colors duration-300 border-none shadow-none cursor-pointer ${
                  isDarkTheme ? "cta-button-dark" : "cta-button-light"
                }`}
              >
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
                <span
                  className="relative ml-3 flex size-1.5 items-center justify-center transition-transform duration-200 group-hover:scale-0"
                  style={{ transitionTimingFunction: EASE }}
                  aria-hidden="true"
                >
                  <span className="size-1 rounded-full bg-current block" />
                </span>
              </a>
            </div>
          </div>

          {/* Mobile drawer — links only */}
          <div
            ref={menuRef}
            id="header-menu"
            className={`absolute top-16 right-0 w-72 sm:w-80 z-50 lg:hidden ${
              open ? "pointer-events-auto" : "pointer-events-none"
            }`}
          >
            <div
              id="header-menu-links"
              className="bg-surface text-foreground border border-line rounded-xl p-3 shadow-2xl origin-bottom-right"
              style={{
                transition: `transform 0.5s ${EASE}, opacity 0.5s ${EASE}`,
                transform: open
                  ? "translate3d(0px, 0px, 0px) rotate(0deg)"
                  : "translate3d(0px, 5.5em, 0px) rotate(4deg)",
                opacity: open ? 1 : 0,
                willChange: "transform, opacity",
              }}
            >
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  tabIndex={open ? 0 : -1}
                  onClick={(e) => {
                    setOpen(false);
                    smoothScrollTo(link.href, e);
                  }}
                  className="group relative block overflow-hidden w-full px-6 py-3 text-foreground cursor-pointer"
                >
                  <div
                    className="absolute inset-0 opacity-0 scale-90 rounded-full bg-accent/20 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100"
                    style={{ transitionTimingFunction: EASE }}
                  />
                  <div className="relative flex items-center justify-between overflow-hidden">
                    <div className="relative block h-7 overflow-hidden">
                      <span
                        className="block text-2xl leading-7 font-medium uppercase tracking-tight text-foreground transition-transform duration-400 group-hover:-translate-y-full"
                        style={{ transitionTimingFunction: EASE }}
                      >
                        {link.label}
                      </span>
                      <span
                        className="absolute top-0 left-0 block text-2xl leading-7 font-medium uppercase tracking-tight text-primary transition-transform duration-400 translate-y-full group-hover:translate-y-0"
                        style={{ transitionTimingFunction: EASE }}
                        aria-hidden="true"
                      >
                        {link.label}
                      </span>
                    </div>
                    <svg
                      className="size-6 transition-transform duration-200 scale-0 group-hover:scale-100 text-foreground group-hover:text-primary shrink-0"
                      style={{ transitionTimingFunction: EASE }}
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
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
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export { Header as SiteHeader };
