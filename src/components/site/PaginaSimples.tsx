import type { ReactNode } from "react";
import { SiteShell } from "./SiteShell";

export function PaginaSimples({ eyebrow, titulo, children }: { eyebrow: string; titulo: string; children: ReactNode }) {
  return (
    <SiteShell>
      <section className="min-h-[70vh] pb-28 pt-14 md:pt-20">
        <div className="mx-auto max-w-3xl px-6">
          <p className="label-mono mb-8 text-dourado">✦ {eyebrow}</p>
          <h1 className="title-2 text-marfim">{titulo}</h1>
          <div className="mt-10 space-y-6 text-sm leading-loose text-marfim/75">{children}</div>
        </div>
      </section>
    </SiteShell>
  );
}
