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
  // Celular: ao rolar para baixo (lendo) os controles somem; reaparecem ao subir, no topo ou no fim da página.
  useEffect(() => {
    const root = document.documentElement;
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      const nearEnd = y + window.innerHeight > document.documentElement.scrollHeight - 160;
      if (y < 120 || nearEnd || y < last - 6) delete root.dataset["dockHidden"];
      else if (y > last + 6) root.dataset["dockHidden"] = "";
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); delete root.dataset["dockHidden"]; };
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
      <div aria-hidden className="grain-layer fixed z-[60]" />
    </div>
  );
}
