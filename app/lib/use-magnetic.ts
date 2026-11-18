"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { prefersReducedMotion } from "./motion";

/**
 * Pulls an element a few pixels toward the cursor while hovered.
 * Pointer-precision only — it is noise on touch, and skipped for reduced motion.
 */
export function useMagnetic<T extends HTMLElement>(strength = 0.35) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (prefersReducedMotion()) return;
    if (typeof window === "undefined") return;

    const moveX = gsap.quickTo(element, "x", { duration: 0.4, ease: "power3.out" });
    const moveY = gsap.quickTo(element, "y", { duration: 0.4, ease: "power3.out" });

    const onMove = (event: PointerEvent) => {
      const bounds = element.getBoundingClientRect();
      const relX = event.clientX - (bounds.left + bounds.width / 2);
      const relY = event.clientY - (bounds.top + bounds.height / 2);
      moveX(relX * strength);
      moveY(relY * strength);
    };

    const onLeave = () => {
      moveX(0);
      moveY(0);
    };

    element.addEventListener("pointermove", onMove);
    element.addEventListener("pointerleave", onLeave);

    return () => {
      element.removeEventListener("pointermove", onMove);
      element.removeEventListener("pointerleave", onLeave);
      gsap.set(element, { x: 0, y: 0 });
    };
  }, [strength]);

  return ref;
}
