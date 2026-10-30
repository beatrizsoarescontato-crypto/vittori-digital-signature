import type { ReactNode } from "react";
import { SiteShell } from "./SiteShell";
import { VoltarContexto } from "./Navegacao";

export function PaginaSimples({ eyebrow, titulo, children }: { eyebrow: string; titulo: string; children: ReactNode }) {
  return (
    <SiteShell>
      <section data-stage-section="wide" className="reading-veil min-h-[70vh] pb-28 pt-28 md:pt-32">
        <div data-stage-zone="reading" className="mx-auto max-w-3xl px-6">
          <VoltarContexto />
          <p className="t-label mb-8">✦ {eyebrow}</p>
          <h1 className="internal-title text-marfim">{titulo}</h1>
          <div className="t-body mt-10 space-y-6">{children}</div>
        </div>
      </section>
    </SiteShell>
  );
}
