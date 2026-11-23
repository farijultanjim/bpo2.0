"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Quote, Star } from "lucide-react";
import { prefersReducedMotion } from "@/app/lib/motion";

type Testimonial = {
  quote: string;
  name: string;
  project: string;
  initials: string;
  image?: string;
};

const testimonials: Testimonial[] = [
  {
    quote:
      "Spectra transitioned our entire night-shift tracking team in less than three weeks. Accuracy is up 18% and FTE cost dropped by over 60%.",
    name: "Elena Rostova",
    project: "VP of Operations, PayGlobal",
    initials: "ER",
    image: "/images/people/elena-reed.webp",
  },
  {
    quote:
      "Our domestic dispatchers were burning out handling overnight carrier calls. Spectra stepped in seamlessly and integrated directly with our McLeod TMS.",
    name: "Marcus Vance",
    project: "Director of Logistics, Strata",
    initials: "MV",
    image: "/images/people/daniel-cho.webp",
  },
  {
    quote:
      "The data security protocols and ISO-compliant offshore setup gave our compliance board total confidence. Their documentation standards are immaculate.",
    name: "Dr. Aris Thorne",
    project: "COO, CarePulse Logistics",
    initials: "AT",
    image: "/images/people/maya-thompson.webp",
  },
  {
    quote:
      "We scaled from 4 to 28 dedicated ocean import specialists during peak shipping season without any hiring lag or internal overhead.",
    name: "Sarah Jenkins",
    project: "Head of Freight, LiveSpot",
    initials: "SJ",
    image: "/images/people/grace-lim.webp",
  },
  {
    quote:
      "Working US hours with zero communication friction. They operate directly in our tools and feel like our own core team sitting next to us.",
    name: "David Chen",
    project: "Managing Director, OmniCorp",
    initials: "DC",
    image: "/images/people/tom-brennan.webp",
  },
];

export function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!section || !viewport || !track) return;
    if (prefersReducedMotion()) return;

    const context = gsap.context(() => {
      gsap.from("[data-testimonial-intro]", {
        y: 55,
        opacity: 0,
        duration: 1,
        stagger: 0.08,
        ease: "power4.out",
        scrollTrigger: {
          trigger: section,
          start: "top 72%",
        },
      });

      gsap.to(track, {
        x: () => -(track.scrollWidth - viewport.clientWidth),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      });

      gsap.from("[data-testimonial-card]", {
        y: 70,
        opacity: 0,
        stagger: 0.12,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 62%",
        },
      });
    }, section);

    return () => context.revert();
  }, []);

  return (
    <section
      id="stories"
      ref={sectionRef}
      className="relative h-[500svh] bg-primary text-background"
    >
      <div className="sticky top-0 flex h-svh flex-col justify-between overflow-hidden px-5 pb-20 pt-20 sm:px-8 sm:pb-24 sm:pt-24 lg:px-12 lg:pb-28 lg:pt-28">
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

        <div className="relative mx-auto flex w-full max-w-site items-end justify-between gap-8">
          <div>
            <div data-testimonial-intro className="mb-5 flex items-center gap-3">
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

          <div
            data-testimonial-intro
            className="hidden items-center gap-3 pb-1 lg:flex"
          >
            <span className="h-px w-16 bg-background/40" />
            <p className="text-xs font-extrabold uppercase tracking-widest">
              Scroll to read
            </p>
          </div>
        </div>

        <div
          ref={viewportRef}
          className="relative mx-auto mt-8 max-h-96 sm:max-h-128 min-h-0 w-full max-w-site flex-1 lg:mt-10"
        >
          <div
            ref={trackRef}
            className="absolute inset-y-0 left-0 flex w-max items-stretch gap-5 lg:gap-7"
          >
            {testimonials.map((testimonial, index) => (
              <article
                data-testimonial-card
                key={testimonial.name}
                className="w-[85vw] sm:w-[68vw] lg:w-[46vw] group flex max-w-2xl shrink-0 flex-col justify-between rounded-3xl bg-background p-6 text-primary transition-transform duration-500 hover:-translate-y-2 sm:p-8 lg:p-8"
              >
                <div className="flex items-center justify-between">
                  <Quote className="text-primary/25" size={34} strokeWidth={1.5} />
                  <div
                    className="flex gap-1 text-primary"
                    aria-label="Five-star review"
                  >
                    {Array.from({ length: 5 }).map((_, star) => (
                      <Star
                        key={star}
                        size={13}
                        fill="currentColor"
                        strokeWidth={1.5}
                      />
                    ))}
                  </div>
                </div>

                <blockquote className="font-bricolage text-xl sm:text-2xl lg:text-3xl font-medium leading-snug tracking-tight">
                  “{testimonial.quote}”
                </blockquote>

                <div className="flex items-center gap-4 border-t border-primary/20 pt-5">
                  <span className="relative grid size-12 shrink-0 place-items-center overflow-hidden rounded-full bg-accent text-xs font-extrabold text-primary ring-1 ring-ink/10">
                    {testimonial.image ? (
                      <Image
                        src={testimonial.image}
                        alt=""
                        fill
                        sizes="48px"
                        loading="eager"
                        className="object-cover"
                      />
                    ) : (
                      testimonial.initials
                    )}
                  </span>
                  <div>
                    <p className="text-sm font-bold">{testimonial.name}</p>
                    <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-primary/60">
                      {testimonial.project}
                    </p>
                  </div>
                  <p className="ml-auto text-xs font-bold tracking-wider text-primary/55">
                    0{index + 1}
                  </p>
                </div>
              </article>
            ))}

            <div className="w-32 shrink-0 sm:w-48 lg:w-64" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
export { Testimonials as TestimonialsSection };
