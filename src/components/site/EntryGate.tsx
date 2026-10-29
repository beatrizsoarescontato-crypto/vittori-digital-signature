import { useEffect, useState } from "react";
import { setSound } from "@/lib/ambientAudio";
import { onPhase, skipPortal, stageScroll, startDive } from "@/components/three/stageScroll";

const KEY = "vittori-entrada";

/**
 * Controles do portal. Não desenha nenhum nome nem cortina: o VITTORI é o 3D
 * da cena única atrás. Só os dois botões e uma linha discreta ficam por cima.
 */
export function EntryGate() {
  const [visivel, setVisivel] = useState(false);
  const [pronto, setPronto] = useState(false);
  const [saindo, setSaindo] = useState(false);

  useEffect(() => {
    const reduz = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (sessionStorage.getItem(KEY) || reduz) {
      skipPortal();
      document.documentElement.dataset.phase = "inside";
      return;
    }
    document.documentElement.dataset.phase = "portal";
    document.documentElement.style.overflow = "hidden";
    window.scrollTo(0, 0);
    setVisivel(true);
    const id = window.setTimeout(() => setPronto(true), 2200);
    const off = onPhase(() => {
      if (stageScroll.phase === "inside") {
        document.documentElement.dataset.phase = "inside";
        document.documentElement.style.overflow = "";
        setVisivel(false);
      }
    });
    return () => {
      window.clearTimeout(id);
      off();
      document.documentElement.style.overflow = "";
    };
  }, []);

  const entrar = (som: boolean) => {
    if (saindo) return;
    sessionStorage.setItem(KEY, "1");
    if (som) void setSound(true);
    setSaindo(true);
    document.documentElement.dataset.phase = "diving";
    startDive();
  };

  if (!visivel) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Entrada do site Vittori Creative House"
      className="portal-ui pointer-events-none fixed inset-0 z-[100] flex flex-col items-center justify-end px-6 pb-[12svh] md:pb-[11vh]"
      data-saindo={saindo || undefined}
    >
      <h1 className="sr-only">Vittori Creative House</h1>
      <p className="portal-line font-serif text-lg italic text-marfim/85 md:text-2xl">Mais que uma agência. Uma assinatura.</p>
      <div className={`portal-actions mt-8 flex flex-col gap-3 sm:flex-row ${pronto ? "is-ready" : ""}`}>
        <button type="button" onClick={() => entrar(true)} className="portal-btn portal-btn--primary pointer-events-auto">
          <span aria-hidden>✦</span> Entrar com som
        </button>
        <button type="button" onClick={() => entrar(false)} className="portal-btn pointer-events-auto">
          Entrar em silêncio
        </button>
      </div>
      <p className="label-mono mt-6 text-marfim/60">Melhor com fones de ouvido</p>
    </div>
  );
}
