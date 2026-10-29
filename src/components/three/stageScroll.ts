import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Fonte única de verdade do movimento da cena 3D.
 * `p` é o progresso suavizado (inércia de luxo, não o scroll cru),
 * `vel` é a velocidade normalizada — usada para dar aceleração ao monograma.
 */
export const stageScroll = {
  p: 0,
  raw: 0,
  vel: 0,
  /** true quando o visitante atravessou a entrada (dispara a revelação do VITTORI). */
  entered: false,
};

let started = false;

export function startStageScroll(): () => void {
  if (typeof window === "undefined") return () => {};
  if (started) return () => {};
  started = true;

  gsap.registerPlugin(ScrollTrigger);

  const trigger = ScrollTrigger.create({
    trigger: document.documentElement,
    start: 0,
    end: () => ScrollTrigger.maxScroll(window),
    invalidateOnRefresh: true,
    onUpdate: (self) => {
      stageScroll.raw = self.progress;

      // Velocidade em px/s → faixa -1..1 (aceleração do giro).
      const v = self.getVelocity() / 2600;
      stageScroll.vel = Math.max(-1.4, Math.min(1.4, v));

      // Easing "expo.out": arranca rápido, assenta devagar. Assinatura de luxo.
      gsap.to(stageScroll, {
        p: self.progress,
        duration: 1.35,
        ease: "expo.out",
        overwrite: "auto",
      });
    },
  });

  return () => {
    trigger.kill();
    started = false;
  };
}
