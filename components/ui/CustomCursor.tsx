"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { MOTION } from "@/app/lib/motion";

/**
 * Cuberto-style magnetic inverted cursor follower.
 *
 * Capabilities:
 *  - Uses GSAP `quickTo` on x/y for 120fps hardware-accelerated tracking without React render overhead.
 *  - Uses `mix-blend-mode: difference` with solid white (#ffffff) fill to create Cuberto's signature
 *    contrast invert effect (e.g., white text becomes pitch black under the cursor, black text becomes white).
 *  - Expands into a crisp inverted circle (size-14) over interactive elements (a, button, etc.).
 *  - Supports `data-cursor-text="VIEW"` to morph into an interactive text badge with normal blend.
 *  - Supports `data-cursor-stick` for magnetic snapping to element centers.
 *  - Automatically disappears on touch/coarse pointers and when pointer leaves viewport.
 *  - Gated by `prefers-reduced-motion`.
 */
export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [cursorText, setCursorText] = useState<string>("");
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isTextBadge, setIsTextBadge] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    // Only run on non-touch devices with fine pointers and no reduced motion preference
    const media = window.matchMedia(
      "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
    );
    if (!media.matches || !cursorRef.current) return;

    const cursor = cursorRef.current;

    // Direct transform setters via GSAP quickTo for 120fps tracking
    const xTo = gsap.quickTo(cursor, "x", { duration: 0.35, ease: MOTION.micro.gsap });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.35, ease: MOTION.micro.gsap });

    let isStuck = false;
    let stuckTarget: HTMLElement | null = null;

    const onPointerMove = (e: PointerEvent) => {
      setIsVisible(true);

      if (isStuck && stuckTarget) {
        const rect = stuckTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        // Magnetic pull: 65% towards center of element, 35% towards mouse
        const magnetX = centerX + (e.clientX - centerX) * 0.35;
        const magnetY = centerY + (e.clientY - centerY) * 0.35;
        xTo(magnetX);
        yTo(magnetY);
        return;
      }

      xTo(e.clientX);
      yTo(e.clientY);
    };

    const onPointerOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement | null)?.closest<HTMLElement>(
        "a, button, [data-cursor-text], [data-cursor-pointer], [data-cursor-stick], input, textarea, select, [role='button']",
      );

      if (!target) {
        setIsHovered(false);
        setIsTextBadge(false);
        setCursorText("");
        isStuck = false;
        stuckTarget = null;
        return;
      }

      const customText = target.getAttribute("data-cursor-text");
      const hasStick = target.hasAttribute("data-cursor-stick");

      if (customText) {
        setCursorText(customText);
        setIsTextBadge(true);
        setIsHovered(false);
      } else {
        setCursorText("");
        setIsTextBadge(false);
        setIsHovered(true);
      }

      if (hasStick) {
        isStuck = true;
        stuckTarget = target;
      } else {
        isStuck = false;
        stuckTarget = null;
      }
    };

    const onPointerLeave = () => {
      setIsVisible(false);
      isStuck = false;
      stuckTarget = null;
    };

    window.addEventListener("pointermove", onPointerMove);
    document.addEventListener("mouseover", onPointerOver);
    document.addEventListener("mouseleave", onPointerLeave);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("mouseover", onPointerOver);
      document.removeEventListener("mouseleave", onPointerLeave);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className={`pointer-events-none fixed top-0 left-0 z-[9999] -translate-x-1/2 -translate-y-1/2 select-none hidden md:block ${
        isTextBadge ? "" : "mix-blend-difference"
      }`}
      style={{
        opacity: isVisible ? 1 : 0,
        transition: `opacity 0.25s ${MOTION.micro.css}`,
      }}
    >
      <div
        className={`flex items-center justify-center rounded-full text-center transition-all duration-300 ease-[var(--ease-micro)] ${
          isTextBadge
            ? "size-24 bg-accent text-primary scale-100 font-semibold shadow-xl text-[13px] tracking-wider uppercase"
            : isHovered
              ? "size-14 bg-white scale-100"
              : "size-3 bg-white scale-100"
        }`}
      >
        {isTextBadge && (
          <span ref={textRef} className="animate-in fade-in zoom-in-75 duration-200">
            {cursorText}
          </span>
        )}
      </div>
    </div>
  );
}

export default CustomCursor;
