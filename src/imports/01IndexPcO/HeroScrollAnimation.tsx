import { useEffect, RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HeroScrollAnimation({ containerRef }: { containerRef: RefObject<HTMLElement | null> }) {
  useEffect(() => {
    const hero = containerRef.current;
    if (!hero) return;

    const bg = hero.querySelector<HTMLElement>('[data-hero="bg"]');
    const decor = hero.querySelectorAll<HTMLElement>('[data-hero="decor"]');
    const title = hero.querySelector<HTMLElement>('[data-hero="title"]');
    const cta = hero.querySelector<HTMLElement>('[data-hero="cta"]');

    if (!bg) return;

    bg.style.transformOrigin = "60% 65%";
    bg.style.willChange = "transform, opacity";
    decor.forEach((el) => {
      el.style.willChange = "transform, opacity";
    });
    if (title) title.style.willChange = "transform, opacity";
    if (cta) cta.style.willChange = "transform, opacity";

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: bg,
          start: "top top",
          end: "bottom top",
          scrub: 0.6,
        },
      });

      tl.to(bg, { scale: 15 }, 0);

      decor.forEach((el, i) => {
        const dx = (i % 2 === 0 ? -1 : 1) * (220 + i * 60);
        const dy = (i % 3 === 0 ? -1 : 1) * (160 + i * 40);
        const sc = 1.6 + i * 0.35;
        tl.to(el, { x: dx, y: dy, scale: sc, opacity: 0 }, 0);
      });

      if (title) {
        tl.to(title, { scale: 2.6, opacity: 0 }, 0);
      }

      if (cta) {
        tl.to(cta, { scale: 1.4, opacity: 0 }, 0);
      }
    }, hero);

    return () => {
      ctx.revert();
    };
  }, [containerRef]);

  return null;
}
