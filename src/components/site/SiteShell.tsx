import type { ReactNode } from "react";
import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { Cursor } from "./Cursor";
import { WhatsAppFab } from "./WhatsAppFab";
import { useScrollReveal } from "@/hooks/useScrollReveal";

/** Moldura comum a todas as páginas públicas. */
export function SiteShell({ children, fab = true }: { children: ReactNode; fab?: boolean }) {
  useScrollReveal();
  return (
    <div className="grain relative min-h-screen bg-preto">
      <Nav />
      <Cursor />
      <main className="relative z-10">{children}</main>
      <Footer />
      {fab && <WhatsAppFab />}
      <div aria-hidden className="grain-layer fixed z-[60]" />
    </div>
  );
}
