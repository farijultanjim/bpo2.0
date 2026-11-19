"use client";

import React, { forwardRef, useEffect, useRef, type ReactNode } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ArrowUpRight } from "lucide-react";
import { prefersReducedMotion } from "@/app/lib/motion";

export interface CtaButtonProps {
  children?: ReactNode;
  label?: string;
  href?: string;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  variant?: "accent" | "dark" | "outline";
  magnetic?: boolean;
  magneticStrength?: number;
  className?: string;
  icon?: ReactNode;
  showIcon?: boolean;
  target?: string;
  rel?: string;
  type?: "button" | "submit" | "reset";
  "aria-label"?: string;
  fullWidth?: boolean;
  [key: string]: unknown;
}

export const CtaButton = forwardRef<HTMLElement, CtaButtonProps>(
  (
    {
      children,
      label,
      href,
      onClick,
      variant = "accent",
      magnetic = true,
      magneticStrength = 0.3,
      className = "",
      icon,
      showIcon = true,
      target,
      rel,
      type = "button",
      "aria-label": ariaLabel,
      fullWidth = false,
      ...rest
    },
    externalRef,
  ) => {
    const innerRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
      if (!magnetic) return;
      const element = innerRef.current;
      if (!element) return;
      if (prefersReducedMotion()) return;
      if (typeof window === "undefined") return;

      const moveX = gsap.quickTo(element, "x", { duration: 0.4, ease: "power3.out" });
      const moveY = gsap.quickTo(element, "y", { duration: 0.4, ease: "power3.out" });

      const onMove = (event: PointerEvent) => {
        const bounds = element.getBoundingClientRect();
        const relX = event.clientX - (bounds.left + bounds.width / 2);
        const relY = event.clientY - (bounds.top + bounds.height / 2);
        moveX(relX * magneticStrength);
        moveY(relY * magneticStrength);
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
    }, [magnetic, magneticStrength]);

    const setRefs = (node: HTMLElement | null) => {
      innerRef.current = node;
      if (typeof externalRef === "function") {
        externalRef(node);
      } else if (externalRef) {
        (externalRef as React.MutableRefObject<HTMLElement | null>).current = node;
      }
    };

    const content = label || children;

    // Base container styles per variant - NO transition-transform or hover:scale so GSAP's magnetic tracking is 100% fluid
    const variantClasses = {
      accent:
        "button-accent group inline-flex items-center gap-5 rounded-full py-2 pl-5 pr-2 text-sm font-bold cursor-pointer",
      dark:
        "button-dark group inline-flex items-center gap-5 rounded-full py-2 pl-6 pr-2 text-sm font-bold cursor-pointer",
      outline:
        "group inline-flex items-center gap-3 rounded-full border border-paper/25 px-5 py-2.5 text-sm font-bold text-paper transition-colors duration-300 hover:bg-paper hover:text-ink cursor-pointer",
    };

    // Inner icon disc styles per variant
    const discClasses = {
      accent:
        "grid size-10 place-items-center rounded-full bg-ink text-paper transition-transform duration-500 ease-out group-hover:rotate-45 shrink-0",
      dark:
        "grid size-10 place-items-center rounded-full bg-paper text-ink transition-transform duration-500 ease-out group-hover:rotate-45 shrink-0",
      outline:
        "grid size-7 place-items-center rounded-full bg-paper/10 text-paper transition-transform duration-500 ease-out group-hover:rotate-45 shrink-0",
    };

    const combinedClassName = `${variantClasses[variant]} ${
      fullWidth ? "w-full justify-between" : ""
    } ${className}`.trim();

    const renderedIcon = icon || <ArrowUpRight size={18} strokeWidth={2} />;

    const innerContent = (
      <>
        <span className={fullWidth ? "truncate" : ""}>{content}</span>
        {showIcon && (
          <span className={discClasses[variant]}>
            {renderedIcon}
          </span>
        )}
      </>
    );

    // If href is present, render as Link or anchor
    if (href) {
      const isInternalAnchor = href.startsWith("#");

      if (isInternalAnchor) {
        return (
          <a
            ref={setRefs}
            href={href}
            onClick={onClick}
            target={target}
            rel={rel}
            aria-label={ariaLabel}
            className={combinedClassName}
            {...rest}
          >
            {innerContent}
          </a>
        );
      }

      return (
        <Link
          ref={setRefs}
          href={href}
          onClick={onClick}
          target={target}
          rel={rel}
          aria-label={ariaLabel}
          className={combinedClassName}
          {...rest}
        >
          {innerContent}
        </Link>
      );
    }

    return (
      <button
        ref={setRefs}
        type={type}
        onClick={onClick}
        aria-label={ariaLabel}
        className={combinedClassName}
        {...rest}
      >
        {innerContent}
      </button>
    );
  },
);

CtaButton.displayName = "CtaButton";
export default CtaButton;
