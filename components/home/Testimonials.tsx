"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Quote, Star } from "lucide-react";
import { MOTION, prefersReducedMotion, registerMotionEasings } from "@/app/lib/motion";

type Testimonial = {
  id: string;
  quote: string;
  name: string;
  project: string;
  initials: string;
  image?: string;
  fan: {
    /** Multiplier relative to card width/height so fanned deck scales with screen size */
    xFactor: number;
    yFactor: number;
    rotate: number;
    zIndex: number;
  };
};

const testimonials: Testimonial[] = [
  {
    id: "payglobal",
    quote:
      "Spectra transitioned our entire night-shift tracking team in less than three weeks. Accuracy is up 18% and FTE cost dropped by over 60%.",
    name: "Elena Rostova",
    project: "VP of Operations, PayGlobal",
    initials: "ER",
    image: "/images/people/elena-reed.webp",
    fan: { xFactor: -0.62, yFactor: -0.06, rotate: -7.5, zIndex: 2 },
  },
  {
    id: "strata",
    quote:
      "Our local dispatchers were burning out handling overnight carrier calls. NexG stepped in seamlessly and integrated directly with our McLeod TMS.",
    name: "Marcus Vance",
    project: "Director of Logistics, Strata",
    initials: "MV",
    image: "/images/people/daniel-cho.webp",
    fan: { xFactor: 0, yFactor: -0.15, rotate: -1.5, zIndex: 1 },
  },
  {
    id: "carepulse",
    quote:
      "The data security protocols and ISO-compliant offshore setup gave our compliance board total confidence. Their documentation standards are immaculate.",
    name: "Dr. Aris Thorne",
    project: "COO, CarePulse Logistics",
    initials: "AT",
    image: "/images/people/maya-thompson.webp",
    fan: { xFactor: 0.62, yFactor: -0.08, rotate: 6.5, zIndex: 2 },
  },
  {
    id: "livespot",
    quote:
      "We scaled from 4 to 28 dedicated ocean import specialists during peak shipping season without any hiring lag or internal overhead.",
    name: "Sarah Jenkins",
    project: "Head of Freight, LiveSpot",
    initials: "SJ",
    image: "/images/people/grace-lim.webp",
    fan: { xFactor: -0.3, yFactor: 0.22, rotate: 3.5, zIndex: 4 },
  },
  {
    id: "omnicorp",
    quote:
      "Aligned to our local time zone with zero communication friction. They operate directly in our tools and feel like our own core team sitting next to us.",
    name: "David Chen",
    project: "Managing Director, OmniCorp",
    initials: "DC",
    image: "/images/people/tom-brennan.webp",
    fan: { xFactor: 0.3, yFactor: 0.25, rotate: -4, zIndex: 5 },
  },
];

/** Computes responsive card size and 3+2 grid coordinates so all 5 cards fit any desktop viewport without clipping or overlapping header. */
function getResponsiveDeckLayout(stageW: number, stageH: number) {
  const safeH = Math.max(360, stageH - 28);
  const gapX = Math.max(16, Math.min(28, stageW * 0.022));
  const gapY = Math.max(12, Math.min(24, safeH * 0.04));

  const cardH = Math.min(295, Math.max(170, (safeH - gapY) / 2));
  const cardW = Math.min(370, Math.max(260, (stageW - gapX * 2 - 24) / 3));

  const rowTopY = -(cardH / 2 + gapY / 2);
  const rowBottomY = cardH / 2 + gapY / 2;

  const gridPositions = [
    { x: -(cardW + gapX), y: rowTopY },
    { x: 0, y: rowTopY },
    { x: cardW + gapX, y: rowTopY },
    { x: -(cardW / 2 + gapX / 2), y: rowBottomY },
    { x: cardW / 2 + gapX / 2, y: rowBottomY },
  ];

  return { cardW, cardH, gridPositions };
}

export function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [activeCardId, setActiveCardId] = useState<string | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    registerMotionEasings();

    const section = sectionRef.current;
    if (!section) return;

    const setupDesktop = () => {
      const stage = stageRef.current;
      const cards = gsap.utils.toArray<HTMLElement>("[data-deck-card-desktop]");
      if (!stage || !cards.length) return null;

      return getResponsiveDeckLayout(stage.clientWidth, stage.clientHeight);
    };

    const context = gsap.context(() => {
      if (prefersReducedMotion()) {
        const layout = setupDesktop();
        if (layout) {
          const cards = gsap.utils.toArray<HTMLElement>("[data-deck-card-desktop]");
          cards.forEach((card, i) => {
            const pos = layout.gridPositions[i];
            gsap.set(card, {
              width: layout.cardW,
              height: layout.cardH,
              x: pos.x,
              y: pos.y,
              rotate: 0,
              opacity: 1,
              visibility: "visible",
            });
          });
        }
        return;
      }

      gsap.from("[data-testimonial-intro]", {
        y: 40,
        opacity: 0,
        duration: 0.9,
        stagger: 0.08,
        ease: MOTION.signature.gsap,
        scrollTrigger: {
          trigger: section,
          start: "top 78%",
        },
      });

      const mm = gsap.matchMedia();

      // Desktop (>= 1024px): Pinned fanned-deck -> 3+2 grid unstacking scaled to exact viewport
      mm.add("(min-width: 1024px)", () => {
        const cards = gsap.utils.toArray<HTMLElement>("[data-deck-card-desktop]");
        const stage = stageRef.current;
        if (!cards.length || !stage || !sectionRef.current) return;

        const applyFanPositions = () => {
          const layout = getResponsiveDeckLayout(stage.clientWidth, stage.clientHeight);
          cards.forEach((card, i) => {
            const { xFactor, yFactor, rotate } = testimonials[i].fan;
            gsap.set(card, {
              width: layout.cardW,
              height: layout.cardH,
              x: xFactor * layout.cardW,
              y: yFactor * layout.cardH,
              rotate,
              opacity: 1,
              visibility: "visible",
            });
          });
        };

        applyFanPositions();

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            pin: sectionRef.current,
            start: "top top",
            end: "+=550",
            scrub: 0.7,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onRefreshInit: applyFanPositions,
          },
        });

        cards.forEach((card, i) => {
          tl.to(
            card,
            {
              x: () => {
                const { gridPositions } = getResponsiveDeckLayout(
                  stage.clientWidth,
                  stage.clientHeight,
                );
                return gridPositions[i].x;
              },
              y: () => {
                const { gridPositions } = getResponsiveDeckLayout(
                  stage.clientWidth,
                  stage.clientHeight,
                );
                return gridPositions[i].y;
              },
              rotate: 0,
              duration: 1,
              ease: MOTION.scrub.gsap,
            },
            0,
          );
        });
      });

      // Mobile / Tablet (< 1024px): Smooth staggered card entrance
      mm.add("(max-width: 1023px)", () => {
        const cards = gsap.utils.toArray<HTMLElement>("[data-deck-card-mobile]");
        if (!cards.length) return;

        gsap.fromTo(
          cards,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            stagger: 0.08,
            ease: MOTION.signature.gsap,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              once: true,
            },
          },
        );
      });

      return () => mm.revert();
    }, section);

    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      context.revert();
    };
  }, []);

  return (
    <section
      id="stories"
      ref={sectionRef}
      className="relative overflow-hidden bg-primary text-background"
    >
      {/* Subtle architectural watermark */}
      <svg
        aria-hidden="true"
        viewBox="0 0 900 600"
        fill="none"
        className="pointer-events-none absolute -right-40 -top-28 w-full max-w-2xl text-background opacity-10"
      >
        <path
          d="M42 558 446 72l412 486M132 558 446 181l321 377M222 558l224-268 229 268"
          stroke="currentColor"
          strokeWidth="2"
        />
      </svg>

      {/* Desktop View: Exact 100svh Pinned Stage — fits 14" laptops to 30" monitors cleanly */}
      <div className="hidden lg:flex h-svh flex-col justify-between px-8 xl:px-12 pb-5 pt-16 xl:pt-20">
        <div className="relative mx-auto flex w-full max-w-site shrink-0 items-end justify-between gap-8 pb-2">
          <div>
            <div data-testimonial-intro className="mb-2 flex items-center gap-3">
              <span className="size-2 rounded-full bg-accent" />
              <p className="text-xs font-bold uppercase tracking-widest">
                Client stories
              </p>
            </div>
            <h2
              data-testimonial-intro
              className="font-bricolage text-4xl xl:text-5xl 2xl:text-6xl font-semibold uppercase leading-[0.88] tracking-tighter"
            >
              Confidence,
              <br />
              in their words.
            </h2>
          </div>

          <div
            data-testimonial-intro
            className="flex items-center gap-3 pb-1"
          >
            <span className="h-px w-16 bg-background/40" />
            <p className="text-xs font-extrabold uppercase tracking-widest">
              Scroll to spread
            </p>
          </div>
        </div>

        {/* Central Responsive Card Stage */}
        <div
          ref={stageRef}
          className="relative mx-auto mt-2 flex min-h-0 w-full max-w-site flex-1 items-center justify-center select-none"
        >
          {testimonials.map((testimonial, index) => {
            const isHovered = activeCardId === testimonial.id;
            const hasHoveredCard = activeCardId !== null;

            return (
              <div
                key={testimonial.id}
                data-deck-card-desktop
                onMouseEnter={() => setActiveCardId(testimonial.id)}
                onMouseLeave={() => setActiveCardId(null)}
                style={{
                  zIndex: isHovered ? 50 : testimonial.fan.zIndex,
                }}
                className={`absolute h-[230px] w-[290px] cursor-pointer transition-opacity duration-300 ease-[var(--ease-micro)] ${
                  hasHoveredCard && !isHovered ? "opacity-60" : "opacity-100"
                }`}
              >
                <article
                  className={`flex h-full w-full flex-col justify-between rounded-3xl bg-background p-4 xl:p-5 text-primary shadow-2xl ring-1 transition-all duration-300 ease-[var(--ease-micro)] ${
                    isHovered
                      ? "scale-[1.03] ring-accent"
                      : "scale-100 ring-white/10"
                  }`}
                >
                  <div className="flex items-center justify-between shrink-0">
                    <Quote className="text-primary/25" size={20} strokeWidth={1.6} />
                    <div
                      className="flex gap-1 text-primary"
                      aria-label="Five-star review"
                    >
                      {Array.from({ length: 5 }).map((_, star) => (
                        <Star
                          key={star}
                          size={11}
                          fill="currentColor"
                          strokeWidth={1.5}
                        />
                      ))}
                    </div>
                  </div>

                  <blockquote className="font-bricolage text-[12.5px] xl:text-[13.5px] 2xl:text-[15px] font-medium leading-snug tracking-tight text-primary line-clamp-4 xl:line-clamp-5">
                    “{testimonial.quote}”
                  </blockquote>

                  <div className="flex items-center gap-2.5 border-t border-primary/15 pt-2.5 shrink-0">
                    <span className="relative grid size-9 xl:size-10 shrink-0 place-items-center overflow-hidden rounded-full bg-accent text-[11px] font-extrabold text-primary ring-1 ring-primary/10">
                      {testimonial.image ? (
                        <Image
                          src={testimonial.image}
                          alt=""
                          fill
                          sizes="40px"
                          loading="eager"
                          className="object-cover"
                        />
                      ) : (
                        testimonial.initials
                      )}
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-xs font-bold text-primary">
                        {testimonial.name}
                      </p>
                      <p className="mt-0.5 truncate text-[10px] font-semibold uppercase tracking-wider text-primary/60">
                        {testimonial.project}
                      </p>
                    </div>
                    <p className="ml-auto shrink-0 text-[11px] font-bold tracking-wider text-primary/50">
                      0{index + 1}
                    </p>
                  </div>
                </article>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile / Tablet (< 1024px): Clean Horizontal Snap Carousel */}
      <div className="lg:hidden px-5 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto w-full max-w-site">
          <div className="mb-10">
            <div data-testimonial-intro className="mb-4 flex items-center gap-3">
              <span className="size-2 rounded-full bg-accent" />
              <p className="text-xs font-bold uppercase tracking-widest">
                Client stories
              </p>
            </div>
            <h2 data-testimonial-intro className="section-heading">
              Confidence,
              <br />
              in their words.
            </h2>
          </div>

          <div className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 sm:-mx-8 sm:px-8">
            {testimonials.map((testimonial, index) => (
              <article
                key={testimonial.id}
                data-deck-card-mobile
                className="flex w-[84vw] max-w-sm shrink-0 snap-center flex-col justify-between rounded-3xl bg-background p-6 text-primary shadow-xl"
              >
                <div className="flex items-center justify-between">
                  <Quote className="text-primary/25" size={28} strokeWidth={1.5} />
                  <div
                    className="flex gap-1 text-primary"
                    aria-label="Five-star review"
                  >
                    {Array.from({ length: 5 }).map((_, star) => (
                      <Star
                        key={star}
                        size={12}
                        fill="currentColor"
                        strokeWidth={1.5}
                      />
                    ))}
                  </div>
                </div>

                <blockquote className="my-5 font-bricolage text-lg font-medium leading-snug tracking-tight">
                  “{testimonial.quote}”
                </blockquote>

                <div className="flex items-center gap-3 border-t border-primary/15 pt-4">
                  <span className="relative grid size-11 shrink-0 place-items-center overflow-hidden rounded-full bg-accent text-xs font-extrabold text-primary ring-1 ring-primary/10">
                    {testimonial.image ? (
                      <Image
                        src={testimonial.image}
                        alt=""
                        fill
                        sizes="44px"
                        loading="eager"
                        className="object-cover"
                      />
                    ) : (
                      testimonial.initials
                    )}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold">{testimonial.name}</p>
                    <p className="mt-0.5 truncate text-[11px] font-semibold uppercase tracking-wider text-primary/60">
                      {testimonial.project}
                    </p>
                  </div>
                  <p className="ml-auto shrink-0 text-xs font-bold tracking-wider text-primary/55">
                    0{index + 1}
                  </p>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-4 text-center text-xs font-mono uppercase tracking-wider text-background/60">
            ← Swipe to explore client stories →
          </div>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
export { Testimonials as TestimonialsSection };
