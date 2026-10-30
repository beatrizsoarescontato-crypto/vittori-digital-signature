import { useEffect, useRef, type ReactNode } from "react";
import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { Cursor } from "./Cursor";
import { WhatsAppFab } from "./WhatsAppFab";
import { SoundToggle } from "./SoundToggle";
import { EntryGate } from "./EntryGate";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { ClientStage } from "@/components/ClientCanvas";
import { DepthHud } from "./DepthHud";
import { useNavegacaoContextual } from "./Navegacao";

/** Moldura comum a todas as páginas públicas. */
export function SiteShell({ children, fab = true }: { children: ReactNode; fab?: boolean }) {
  useScrollReveal();
  useNavegacaoContextual();
  const layer = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const sync = () => { if (layer.current) layer.current.inert = document.documentElement.dataset["phase"] !== "inside"; };
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-phase"] });
    return () => observer.disconnect();
  }, []);
  // Detecta colisões reais; controles reservam espaço lateral no layout.
  useEffect(() => {
    const root = document.documentElement;
    let frame = 0;
    const check = () => {
      frame = 0;
      const controls = Array.from(document.querySelectorAll<HTMLElement>(".float-ctl"));
      const content = Array.from(document.querySelectorAll<HTMLElement>("main :is(h1,h2,h3,p,li,a,button,input,video),footer :is(a,p)"));
      for (const control of controls) {
        const c = control.getBoundingClientRect();
        const collision = content.some(el => {
          const r = el.getBoundingClientRect();
          return r.width > 0 && r.height > 0 && r.bottom > c.top - 8 && r.top < c.bottom + 8 && r.right > c.left - 8 && r.left < c.right + 8;
        });
        control.dataset["blocked"] = collision ? "true" : "false";
      }
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(check); };
    const resize = new ResizeObserver(schedule);
    if (layer.current) resize.observe(layer.current);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    schedule();
    return () => { resize.disconnect(); cancelAnimationFrame(frame); window.removeEventListener("scroll", schedule); window.removeEventListener("resize", schedule); delete root.dataset["dockHidden"]; };
  }, []);
  return (
    <div className="grain relative min-h-screen bg-preto">
      <div aria-hidden="true" className="stage-fallback pointer-events-none fixed inset-0 z-0">
        <ClientStage />
      </div>
       <div ref={layer} className="site-layer">
      <Nav />
      <DepthHud />
      <Cursor />
       <main className="relative z-10">
         <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-20 overflow-hidden">
           <span className="signature-sparkle text-2xl">✦</span>
           <span className="signature-sparkle text-lg">✦</span>
           <span className="signature-sparkle text-xl">✦</span>
         </div>
         {children}
       </main>
      <Footer />
      {fab && <WhatsAppFab />}
      <SoundToggle />
      </div>
      <EntryGate />
      <div aria-hidden className="grain-layer pointer-events-none fixed z-[60]" />
    </div>
  );
}
