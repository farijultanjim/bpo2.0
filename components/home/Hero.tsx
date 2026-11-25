"use client";

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MOTION, prefersReducedMotion, registerMotionEasings } from "@/app/lib/motion";
import { CtaButton } from "@/components/ui/CtaButton";

const storyMoments = [
  {
    number: "01",
    kicker: "Seamless & Cost-Effective",
    title: "An extension of your core team.",
    copy: "Skip bonuses, healthcare, and hiring lag—saving up to 72% per FTE while our specialists work US hours directly inside your own processes and tools.",
    position: "items-center text-center",
  },
];

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [reduced, setReduced] = useState(false);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    registerMotionEasings();

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
        .timeline({ paused: true, defaults: { ease: MOTION.signature.gsap } })
        .fromTo(
          video,
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 1.8, ease: MOTION.signature.gsap },
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
        ease: MOTION.exit.gsap,
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "26% top",
          scrub: true,
        },
      });

      const storyTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "32% top",
          end: "92% top",
          scrub: 0.8,
        },
      });

      gsap.utils
        .toArray<HTMLElement>("[data-story-moment]")
        .forEach((moment) => {
          storyTimeline
            .fromTo(
              moment,
              { y: 60, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.45, ease: MOTION.signature.gsap },
            )
            .to(
              moment,
              { y: -40, opacity: 0, duration: 0.35, ease: MOTION.exit.gsap },
              "+=0.35",
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
        className={`relative bg-primary ${reduced ? "h-svh" : "h-[235svh]"}`}
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

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-primary/55 via-primary/30 to-primary/90" />

          <div className="absolute inset-0 flex flex-col px-5 py-5 text-background sm:px-8 sm:py-7 lg:px-12 lg:py-9">
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

              <div className="lg:col-span-1 flex flex-col items-start gap-5 rounded-2xl bg-primary/40 p-5 backdrop-blur-sm lg:mb-7 lg:p-6">
                <p
                  data-hero-detail
                  className="invisible max-w-md text-sm font-medium leading-relaxed text-background/90 sm:text-base"
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
                  <span className="mb-5 text-xs font-extrabold uppercase tracking-widest text-accent">
                    {moment.kicker}
                  </span>
                  <h2 className="max-w-4xl font-bricolage text-4xl sm:text-6xl lg:text-7xl font-semibold uppercase leading-tight tracking-tighter text-background drop-shadow-2xl">
                    {moment.title}
                  </h2>
                  <p className="mt-6 max-w-lg text-sm font-semibold leading-relaxed text-background/80 drop-shadow-lg sm:text-base">
                    {moment.copy}
                  </p>
                </div>
              ))}
            </div>
          )}

          <div
            data-hero-detail
            className="invisible absolute right-8 top-1/2 hidden origin-right -translate-y-1/2 rotate-90 items-center gap-3 text-background xl:flex"
          >
            <span className="h-px w-12 bg-background/50" />
            <span className="text-xs font-bold uppercase tracking-widest">
              Scroll to explore
            </span>
          </div>
        </div>
      </section>

      {reduced && (
        <section className="bg-primary px-5 py-24 text-background sm:px-8 lg:px-12">
          <div className="mx-auto max-w-3xl text-center">
            {storyMoments.map((moment) => (
              <div key={moment.number} className="flex flex-col items-center">
                <span className="mb-5 text-xs font-extrabold uppercase tracking-widest text-accent">
                  {moment.kicker}
                </span>
                <h2 className="font-bricolage text-3xl font-semibold uppercase leading-tight tracking-tight">
                  {moment.title}
                </h2>
                <p className="mt-5 max-w-xl text-sm font-medium leading-relaxed text-background/70">
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
