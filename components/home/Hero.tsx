"use client";

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/app/lib/motion";
import { CtaButton } from "@/components/ui/CtaButton";

const storyMoments = [
  {
    number: "01",
    kicker: "Scalable solutions",
    title: "Expand as your business grows.",
    copy: "Add FTEs, shifts or processes based on your expansion plans or volume surges, without the hiring lag.",
    position: "items-start text-left",
  },
  {
    number: "02",
    kicker: "Cost reduction",
    title: "No overhead or benefits costs.",
    copy: "Extend your team overseas and skip bonuses, healthcare and 401K for every added employee. Up to 72% lower salary cost per FTE.",
    position: "items-end text-right",
  },
  {
    number: "03",
    kicker: "Seamless transition",
    title: "An extension of your core team.",
    copy: "We work US hours, meet the KPIs and milestones you set, and integrate directly into your processes and tools.",
    position: "items-center text-center",
  },
];

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [reduced, setReduced] = useState(false);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger, CustomEase);
    CustomEase.create("roofReveal", "M0,0 C0.16,1 0.3,1 1,1");

    const section = sectionRef.current;
    const video = videoRef.current;
    const content = contentRef.current;
    if (!section || !video || !content) return;

    const isReduced = prefersReducedMotion();
    setReduced(isReduced);

    let introStarted = false;
    let introTimeline: gsap.core.Timeline | null = null;
    let readyTimer = 0;

    const startIntro = () => {
      if (introStarted) return;
      introStarted = true;
      window.clearTimeout(readyTimer);
      document.documentElement.dataset.ridgeIntroReady = "true";
      window.dispatchEvent(new CustomEvent("ridge:intro-ready"));
      introTimeline?.play();
      ScrollTrigger.refresh();
    };

    const scope = gsap.context(() => {
      if (isReduced) {
        gsap.set([video, "[data-hero-line] > span", "[data-hero-detail]"], {
          autoAlpha: 1,
          scale: 1,
          y: 0,
          yPercent: 0,
          visibility: "visible",
        });
        return;
      }

      introTimeline = gsap
        .timeline({ paused: true, defaults: { ease: "roofReveal" } })
        .fromTo(
          video,
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 1.8, ease: "power2.out" },
          0,
        )
        .fromTo(
          "[data-hero-line] > span",
          { yPercent: 110, autoAlpha: 0 },
          { yPercent: 0, autoAlpha: 1, duration: 1.85, stagger: 0.16 },
          0.18,
        )
        .fromTo(
          "[data-hero-detail]",
          { y: 28, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 1.5, stagger: 0.14 },
          0.82,
        );

      gsap.to(content, {
        yPercent: -18,
        opacity: 0,
        ease: "power2.in",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "18% top",
          scrub: true,
        },
      });

      const storyTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "18% top",
          end: "92% top",
          scrub: 1,
        },
      });

      gsap.utils
        .toArray<HTMLElement>("[data-story-moment]")
        .forEach((moment, index) => {
          const position = index * 2;

          storyTimeline
            .fromTo(
              moment,
              { y: 70, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.72, ease: "power3.out" },
              position,
            )
            .to(
              moment,
              { y: -55, opacity: 0, duration: 0.72, ease: "power2.in" },
              position + 1.15,
            );
        });
    }, section);

    if (video.readyState >= 2) {
      startIntro();
    } else {
      video.addEventListener("loadeddata", startIntro, { once: true });
    }

    readyTimer = window.setTimeout(startIntro, 600);

    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize);

    return () => {
      window.clearTimeout(readyTimer);
      window.removeEventListener("resize", onResize);
      video.removeEventListener("loadeddata", startIntro);
      delete document.documentElement.dataset.ridgeIntroReady;
      scope.revert();
    };
  }, []);

  return (
    <>
      <section
        ref={sectionRef}
        className={`relative bg-ink ${reduced ? "h-svh" : "scroll-track-hero"}`}
      >
        <div className="sticky top-0 h-svh overflow-hidden">
          <video
            ref={videoRef}
            src="/intro.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 block h-full w-full object-cover scale-105 opacity-0"
            aria-hidden="true"
          />

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink/55 via-ink/30 to-ink/90" />

          <div className="absolute inset-0 flex flex-col px-5 py-5 text-paper sm:px-8 sm:py-7 lg:px-12 lg:py-9">
            <div
              ref={contentRef}
              className="mt-auto grid items-end gap-7 pb-3 lg:grid-cols-3 lg:gap-16 lg:pb-5"
            >
              <h1 className="lg:col-span-2 font-bricolage text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-semibold uppercase leading-none tracking-tighter">
                <span data-hero-line className="block overflow-hidden py-1">
                  <span className="invisible block">Outsourcing with</span>
                </span>
                <span data-hero-line className="block overflow-hidden py-1">
                  <span className="invisible block text-accent">savings.</span>
                </span>
              </h1>

              <div className="lg:col-span-1 flex flex-col items-start gap-5 rounded-2xl bg-ink/40 p-5 backdrop-blur-sm lg:mb-7 lg:p-6">
                <p
                  data-hero-detail
                  className="invisible max-w-md text-sm font-medium leading-relaxed text-paper/90 sm:text-base"
                >
                  Your offshore partner for freight forwarding and logistics
                  operations. 500+ domain experts working US hours with 24/7
                  support and up to 72% lower cost per FTE.
                </p>
                <CtaButton
                  data-hero-detail
                  href="#services"
                  className="pointer-events-auto invisible"
                >
                  Explore services
                </CtaButton>
              </div>
            </div>
          </div>

          {!reduced && (
            <div className="pointer-events-none absolute inset-0 z-10 px-5 sm:px-8 lg:px-12">
              {storyMoments.map((moment) => (
                <div
                  data-story-moment
                  key={moment.number}
                  className={`absolute inset-x-5 top-1/2 flex -translate-y-1/2 flex-col opacity-0 sm:inset-x-8 lg:inset-x-12 ${moment.position}`}
                >
                  <div className="mb-5 flex items-center gap-3 text-accent">
                    <span className="h-px w-10 bg-accent" />
                    <span className="text-xs font-extrabold uppercase tracking-widest">
                      {moment.number} / {moment.kicker}
                    </span>
                  </div>
                  <h2 className="max-w-4xl font-bricolage text-4xl sm:text-6xl lg:text-7xl font-semibold uppercase leading-tight tracking-tighter text-paper drop-shadow-2xl">
                    {moment.title}
                  </h2>
                  <p className="mt-6 max-w-lg text-sm font-semibold leading-relaxed text-paper/80 drop-shadow-lg sm:text-base">
                    {moment.copy}
                  </p>
                </div>
              ))}
            </div>
          )}

          <div
            data-hero-detail
            className="invisible absolute right-8 top-1/2 hidden origin-right -translate-y-1/2 rotate-90 items-center gap-3 text-paper xl:flex"
          >
            <span className="h-px w-12 bg-paper/50" />
            <span className="text-xs font-bold uppercase tracking-widest">
              Scroll to explore
            </span>
          </div>
        </div>
      </section>

      {reduced && (
        <section className="bg-ink px-5 py-24 text-paper sm:px-8 lg:px-12">
          <div className="mx-auto grid max-w-site gap-14 lg:grid-cols-3">
            {storyMoments.map((moment) => (
              <div key={moment.number}>
                <div className="mb-5 flex items-center gap-3 text-accent">
                  <span className="h-px w-10 bg-accent" />
                  <span className="text-xs font-extrabold uppercase tracking-widest">
                    {moment.number} / {moment.kicker}
                  </span>
                </div>
                <h2 className="font-bricolage text-3xl font-semibold uppercase leading-tight tracking-tight">
                  {moment.title}
                </h2>
                <p className="mt-5 text-sm font-medium leading-relaxed text-paper/70">
                  {moment.copy}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  );
}

export default Hero;
export { Hero as HeroSection };
