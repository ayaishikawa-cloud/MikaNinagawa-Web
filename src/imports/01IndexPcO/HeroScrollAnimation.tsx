import { useEffect, RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const HERO_DESIGN_HEIGHT = 1750;
const FOLLOW_DESIGN_HEIGHT = 854;
const DESIGN_WIDTH = 1280;

export default function HeroScrollAnimation({ containerRef }: { containerRef: RefObject<HTMLElement | null> }) {
  useEffect(() => {
    const hero = containerRef.current;
    if (!hero) return;

    const follow = hero.querySelector<HTMLElement>("[data-hero-follow]");
    const video = hero.querySelector<HTMLVideoElement>("video[data-hero-video]");
    const decor = hero.querySelectorAll<HTMLElement>('[data-hero="decor"]');
    const title = hero.querySelector<HTMLElement>('[data-hero="title"]');
    const cta = hero.querySelector<HTMLElement>('[data-hero="cta"]');

    decor.forEach((el) => {
      el.style.willChange = "transform, opacity";
    });
    if (title) title.style.willChange = "transform, opacity";
    if (cta) cta.style.willChange = "transform, opacity";
    if (video) video.style.willChange = "transform";

    // ---- JS-driven pin -------------------------------------------------------
    // CSS position: sticky does not work inside the App's scaled design canvas
    // (transform: scale ancestor establishes the containing block for sticky,
    // and that ancestor doesn't scroll), so we manually translateY the follow
    // wrapper by the scroll amount expressed in design pixels.
    const updatePin = () => {
      if (!follow) return;
      const sectionRect = hero.getBoundingClientRect();
      const scaleApprox = window.innerWidth / DESIGN_WIDTH;
      if (scaleApprox <= 0) return;
      const desired = -sectionRect.top / scaleApprox;
      const max = HERO_DESIGN_HEIGHT - FOLLOW_DESIGN_HEIGHT;
      const clamped = Math.max(0, Math.min(max, desired));
      follow.style.transform = `translateY(${clamped}px)`;
    };

    // ---- Video scrub --------------------------------------------------------
    const updateVideo = () => {
      if (!video) return;
      const dur = video.duration;
      if (!dur || !isFinite(dur)) return;
      const sectionRect = hero.getBoundingClientRect();
      const scaleApprox = window.innerWidth / DESIGN_WIDTH;
      const totalDesign = HERO_DESIGN_HEIGHT - FOLLOW_DESIGN_HEIGHT;
      if (totalDesign <= 0 || scaleApprox <= 0) return;
      const traveledDesign = -sectionRect.top / scaleApprox;
      const progress = Math.max(0, Math.min(1, traveledDesign / totalDesign));
      video.currentTime = progress * dur;
    };

    const tick = () => {
      updatePin();
      updateVideo();
    };

    tick();
    window.addEventListener("scroll", tick, { passive: true });
    window.addEventListener("resize", tick);

    if (video) {
      const onLoaded = () => tick();
      if (video.readyState >= 1) onLoaded();
      else video.addEventListener("loadedmetadata", onLoaded, { once: true });
    }

    // ---- Decoration / CTA fade-out via ScrollTrigger ------------------------
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "+=900",
          scrub: 0.6,
        },
      });

      decor.forEach((el, i) => {
        const dx = (i % 2 === 0 ? -1 : 1) * (220 + i * 60);
        const dy = (i % 3 === 0 ? -1 : 1) * (160 + i * 40);
        const sc = 1.6 + i * 0.35;
        tl.to(el, { x: dx, y: dy, scale: sc, opacity: 0 }, 0);
      });

      if (title) tl.to(title, { scale: 2.6, opacity: 0 }, 0);
      if (cta) tl.to(cta, { scale: 1.4, opacity: 0 }, 0);
    }, hero);

    return () => {
      window.removeEventListener("scroll", tick);
      window.removeEventListener("resize", tick);
      ctx.revert();
    };
  }, [containerRef]);

  return null;
}
