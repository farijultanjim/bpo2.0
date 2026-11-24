import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";

/**
 * Centralized Awwwards-Level Motion Token System
 * Single source of truth across GSAP, Framer Motion, and CSS.
 */
export const MOTION = {
  /** Signature Expo-Out: explosive start with silky-smooth, zero-bounce landing (reveals & UI panels) */
  signature: {
    css: "cubic-bezier(0.16, 1, 0.3, 1)",
    framer: [0.16, 1, 0.3, 1] as const,
    gsap: "signature",
    path: "M0,0 C0.16,1 0.3,1 1,1",
  },
  /** Tactile Micro-Interaction: instant response for hovers, magnetic pulls, cursors, and tabs */
  micro: {
    css: "cubic-bezier(0.22, 1, 0.36, 1)",
    framer: [0.22, 1, 0.36, 1] as const,
    spring: { type: "spring" as const, stiffness: 450, damping: 32 },
    gsap: "power3.out",
  },
  /** Fast Exit: quick departure so users are never kept waiting */
  exit: {
    css: "cubic-bezier(0.4, 0, 1, 1)",
    framer: [0.4, 0, 1, 1] as const,
    gsap: "power2.in",
  },
  /** Linear 1:1 Scroll Sync: strictly for ScrollTrigger scrub / parallax */
  scrub: {
    css: "linear",
    gsap: "none",
  },
  /** Standardized durations in seconds */
  duration: {
    micro: 0.25,
    ui: 0.38,
    reveal: 0.75,
    exit: 0.3,
  },
} as const;

let registered = false;

/**
 * Registers the signature CustomEase with GSAP once per client session.
 */
export function registerMotionEasings() {
  if (typeof window === "undefined" || registered) return;
  gsap.registerPlugin(CustomEase);
  CustomEase.create(MOTION.signature.gsap, MOTION.signature.path);
  registered = true;
}

export function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
