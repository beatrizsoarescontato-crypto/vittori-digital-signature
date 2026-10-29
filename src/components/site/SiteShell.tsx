import type { ReactNode } from "react";
import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { Cursor } from "./Cursor";
import { WhatsAppFab } from "./WhatsAppFab";
import { SoundToggle } from "./SoundToggle";
import { EntryGate } from "./EntryGate";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { ClientStage } from "@/components/ClientCanvas";
import { DepthHud } from "./DepthHud";

/** Moldura comum a todas as páginas públicas. */
export function SiteShell({ children, fab = true }: { children: ReactNode; fab?: boolean }) {
  useScrollReveal();
  return (
    <div className="grain relative min-h-screen bg-preto">
      <div aria-hidden="true" className="stage-fallback pointer-events-none fixed inset-0 z-0">
        <ClientStage />
      </div>
      <div className="site-layer">
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
