import { useEffect } from "react";

/** Revelação por camadas + parallax leve, com GSAP ScrollTrigger. */
export function useScrollReveal() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let ctx: { revert: () => void } | undefined;

    (async () => {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
          const children = el.querySelectorAll<HTMLElement>(".reveal-item");
          const targets = children.length ? children : [el];
          gsap.to(targets, {
            opacity: 1,
            y: 0,
            duration: 1.1,
            ease: "power3.out",
            stagger: 0.12,
            scrollTrigger: { trigger: el, start: "top 82%" },
          });
        });

        gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
          const amount = Number(el.dataset["parallax"] ?? 60);
          gsap.to(el, {
            y: -amount,
            ease: "none",
            scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
          });
        });

        const watermark = document.querySelector<HTMLElement>("[data-watermark]");
        if (watermark) {
          gsap.to(watermark, {
            scale: 1.35,
            rotate: 8,
            opacity: 0.14,
            ease: "none",
            scrollTrigger: {
              trigger: watermark.closest("section"),
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          });
        }
      });

      ScrollTrigger.refresh();
    })();

    return () => ctx?.revert();
  }, []);
}
