import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
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
  const [simplificado, setSimplificado] = useState(false);
  const [sequence, setSequence] = useState(0);
  const controls = useRef<HTMLDivElement>(null);
  const dialog = useRef<HTMLDivElement>(null);
  const firstAction = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const reduz = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let stored = false;
    try { stored = Boolean(sessionStorage.getItem(KEY)); } catch { /* Storage may be blocked. */ }
    if (stored || reduz) {
      skipPortal();
      document.documentElement.dataset["phase"] = "inside";
      return;
    }
    document.documentElement.dataset["phase"] = "portal";
    document.documentElement.style.overflow = "hidden";
    window.scrollTo(0, 0);
    setVisivel(true);
    const progress = () => {
      setSequence(stageScroll.portalStep);
      if (stageScroll.portalStep >= 5) setPronto(true);
    };
    const ready = () => progress();
    const unavailable = () => { setSimplificado(true); setSequence(5); setPronto(true); };
    window.addEventListener("vittori-scene-ready", ready);
    window.addEventListener("vittori-portal-progress", progress);
    window.addEventListener("vittori-scene-unavailable", unavailable);
    if (document.querySelector("[data-scene-ready]")) ready();
    const off = onPhase(() => {
      if (stageScroll.phase === "inside") {
        document.documentElement.dataset["phase"] = "inside";
        document.documentElement.style.overflow = "";
        setVisivel(false);
      }
    });
    return () => {
      window.removeEventListener("vittori-scene-ready", ready);
      window.removeEventListener("vittori-portal-progress", progress);
      window.removeEventListener("vittori-scene-unavailable", unavailable);
      off();
      document.documentElement.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (!visivel || !controls.current) return;
    const measure = () => { if (controls.current) stageScroll.portalSafeTop = controls.current.getBoundingClientRect().top; };
    const observer = new ResizeObserver(measure);
    observer.observe(controls.current);
    window.addEventListener("resize", measure);
    measure();
    document.fonts.ready.then(measure);
    return () => { observer.disconnect(); window.removeEventListener("resize", measure); };
  }, [visivel]);
  useEffect(() => { if (pronto && visivel) firstAction.current?.focus({ preventScroll: true }); }, [pronto, visivel]);

  const entrar = (som: boolean) => {
    if (saindo || !pronto) return;
    try { sessionStorage.setItem(KEY, "1"); } catch { /* Entry still works without storage. */ }
    if (som) void setSound(true);
    setSaindo(true);
    document.documentElement.dataset["phase"] = "diving";
    if (simplificado) { skipPortal(); document.documentElement.dataset["phase"] = "inside"; }
    else startDive();
  };

  if (!visivel) return null;

  return (
    <div
      ref={dialog}
      role="dialog"
      aria-modal="true"
      aria-label="Entrada do site Vittori Creative House"
      className="portal-ui pointer-events-none fixed inset-0 z-[100]"
      data-saindo={saindo || undefined}
      data-sequence={sequence}
      onKeyDown={(event) => {
        if (event.key !== "Tab" || !pronto) return;
        const buttons = dialog.current?.querySelectorAll<HTMLButtonElement>("button:not(:disabled)");
        const first = buttons?.[0];
        const last = buttons?.[buttons.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
      }}
    >
      <h1 className="sr-only">Vittori Creative House</h1>
      {simplificado && <div className="portal-static-brand font-serif text-dourado" aria-hidden>VITTORI<span>✦</span></div>}
      <div ref={controls} className="portal-controls">
      <p className="portal-line font-serif italic text-marfim">Mais que uma agência. Uma assinatura.</p>
      <div className={`portal-actions ${pronto ? "is-ready" : ""}`}>
        <Button ref={firstAction} variant="ghost" disabled={!pronto || saindo} type="button" onClick={() => entrar(true)} className="portal-btn portal-btn--primary pointer-events-auto">
          <span aria-hidden>✦</span> Entrar com som
        </Button>
        <Button variant="ghost" disabled={!pronto || saindo} type="button" onClick={() => entrar(false)} className="portal-btn pointer-events-auto">
          Entrar em silêncio
        </Button>
      </div>
       <p className="portal-headphones label-mono mt-6 text-marfim/60">Melhor com fones de ouvido</p>
      </div>
    </div>
  );
}
