import { useEffect } from "react";
import { useLocation } from "@tanstack/react-router";

/**
 * Revelação editorial com GSAP ScrollTrigger:
 * - [data-lines] revela linha a linha por máscara (clip vertical)
 * - [data-reveal] > .reveal-item faz fade/slide em cascata
 * - [data-parallax] desloca no scroll
 * - [data-counter] conta até o valor final
 */
export function useScrollReveal() {
  const pathname = useLocation({ select: location => location.pathname });
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let ctx: { revert: () => void } | undefined;
    let cancelled = false;

    (async () => {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        gsap.utils.toArray<HTMLElement>("[data-lines]").forEach((el) => {
          const lines = el.querySelectorAll<HTMLElement>(".line-inner");
          gsap.to(lines, {
            y: "0%",
            duration: 1.25,
            ease: "expo.out",
            stagger: 0.11,
            scrollTrigger: { trigger: el, start: "top 85%" },
          });
        });

        gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
          const children = el.querySelectorAll<HTMLElement>(".reveal-item");
          const targets = children.length ? children : [el];
          gsap.to(targets, {
            opacity: 1,
            y: 0,
            duration: 1.1,
            ease: "power3.out",
            stagger: 0.1,
            scrollTrigger: { trigger: el, start: "top 84%" },
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

        // Linha que se desenha com o scroll
        gsap.utils.toArray<HTMLElement>("[data-draw]").forEach((el) => {
          const vertical = el.dataset["draw"] === "y";
          gsap.fromTo(
            el,
            vertical ? { scaleY: 0 } : { scaleX: 0 },
            {
              ...(vertical ? { scaleY: 1 } : { scaleX: 1 }),
              ease: "none",
              scrollTrigger: { trigger: el.parentElement, start: "top 75%", end: "bottom 60%", scrub: true },
            },
          );
        });

        gsap.utils.toArray<HTMLElement>("[data-counter]").forEach((el) => {
          const end = Number(el.dataset["counter"] ?? 0);
          const obj = { v: 0 };
          gsap.to(obj, {
            v: end,
            duration: 1.8,
            ease: "power2.out",
            onUpdate: () => {
              el.textContent = String(Math.round(obj.v));
            },
            scrollTrigger: { trigger: el, start: "top 92%" },
          });
        });

        // Mergulho entre seções: a próxima chega do fundo, a anterior se desfaz no desfoque.
        gsap.utils.toArray<HTMLElement>("main > section").forEach((sec, i) => {
          if (i === 0) return;
          gsap.fromTo(
            sec,
            { opacity: 0.15, scale: 0.94, filter: "blur(10px)" },
            {
              opacity: 1,
              scale: 1,
              filter: "blur(0px)",
              ease: "none",
              scrollTrigger: { trigger: sec, start: "top 100%", end: "top 55%", scrub: 0.6 },
            },
          );
          gsap.to(sec, {
            opacity: 0.25,
            filter: "blur(6px)",
            ease: "none",
            immediateRender: false,
            scrollTrigger: { trigger: sec, start: "bottom 35%", end: "bottom 0%", scrub: 0.6 },
          });
        });

        const watermark = document.querySelector<HTMLElement>("[data-watermark]");
        if (watermark) {
          gsap.to(watermark, {
            scale: 1.3,
            rotate: 6,
            opacity: 0.12,
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

    return () => { cancelled = true; ctx?.revert(); };
  }, [pathname]);
}
