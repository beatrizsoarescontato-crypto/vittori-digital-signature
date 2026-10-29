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
  /** true quando o visitante clicou para entrar. */
  entered: false,
  /** "portal": VITTORI monumental; "inside": site. A cena é a mesma nas duas fases. */
  phase: "portal" as "portal" | "inside",
  /** 0..1 progresso do mergulho cinematográfico disparado pelo clique. */
  dive: 0,
  /** true quando a sessão pulou o portal (já entrou antes). */
  skipped: false,
  /** Top of the HTML phrase, measured on resize, in CSS pixels. */
  portalSafeTop: 0,
  /** R3F clock origin established only after shader preparation and warm frames. */
  portalStartedAt: null as number | null,
  portalStep: 0,
};

type PhaseListener = () => void;
const phaseListeners = new Set<PhaseListener>();
export function onPhase(l: PhaseListener) {
  phaseListeners.add(l);
  return () => {
    phaseListeners.delete(l);
  };
}
export function setPhase(next: "portal" | "inside") {
  stageScroll.phase = next;
  phaseListeners.forEach((l) => l());
}

/** Dispara o mergulho: a cena dissolve o VITTORI e revela o site ao final. */
export function startDive(duration = 3.4) {
  stageScroll.entered = true;
  gsap.killTweensOf(stageScroll, "dive");
  gsap.to(stageScroll, {
    dive: 1,
    duration,
    ease: "power2.inOut",
    onUpdate: () => {
      if (stageScroll.dive >= 0.999 && stageScroll.phase === "portal") setPhase("inside");
    },
    onComplete: () => setPhase("inside"),
  });
}

export function skipPortal() {
  stageScroll.entered = true;
  stageScroll.skipped = true;
  stageScroll.dive = 1;
  setPhase("inside");
}

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
