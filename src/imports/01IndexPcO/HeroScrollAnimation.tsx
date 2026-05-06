import { useEffect, RefObject } from "react";

const HERO_DESIGN_HEIGHT = 1750;
const FOLLOW_DESIGN_HEIGHT = 854;
const DESIGN_WIDTH = 1280;

export default function HeroScrollAnimation({ containerRef }: { containerRef: RefObject<HTMLElement | null> }) {
  useEffect(() => {
    const hero = containerRef.current;
    if (!hero) return;

    const follow = hero.querySelector<HTMLElement>("[data-hero-follow]");
    const video = hero.querySelector<HTMLVideoElement>("video[data-hero-video]");

    if (video) video.style.willChange = "transform";

    // CSS position: sticky does not work inside the App's scaled design canvas
    // (transform: scale ancestor establishes the containing block for sticky,
    // and that ancestor doesn't scroll), so we manually translateY the follow
    // wrapper by the scroll amount expressed in design pixels. The video's
    // currentTime is scrubbed against the same scroll progress.
    const tick = () => {
      const sectionRect = hero.getBoundingClientRect();
      const scaleApprox = window.innerWidth / DESIGN_WIDTH;
      if (scaleApprox <= 0) return;

      const totalDesign = HERO_DESIGN_HEIGHT - FOLLOW_DESIGN_HEIGHT;
      const traveledDesign = -sectionRect.top / scaleApprox;
      const progress = totalDesign > 0 ? Math.max(0, Math.min(1, traveledDesign / totalDesign)) : 0;

      if (follow) {
        follow.style.transform = `translateY(${progress * totalDesign}px)`;
      }

      if (video) {
        const dur = video.duration;
        if (dur && isFinite(dur)) video.currentTime = progress * dur;
      }
    };

    tick();
    window.addEventListener("scroll", tick, { passive: true });
    window.addEventListener("resize", tick);

    if (video) {
      const onLoaded = () => tick();
      if (video.readyState >= 1) onLoaded();
      else video.addEventListener("loadedmetadata", onLoaded, { once: true });
    }

    return () => {
      window.removeEventListener("scroll", tick);
      window.removeEventListener("resize", tick);
    };
  }, [containerRef]);

  return null;
}
