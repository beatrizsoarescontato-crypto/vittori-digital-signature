import { Link } from "@tanstack/react-router";
import { PROJETOS } from "@/content/portfolio";
import { SectionTitle } from "@/components/site/ui";

export function PortfolioGrid() {
  return (
    <div className="grid gap-px bg-border/50 md:grid-cols-3">
      {PROJETOS.map((p) => {
        const corpo = (
          <>
            <div className="relative aspect-[16/10] overflow-hidden bg-marrom">
              {p.imagem ? (
                <img
                  src={p.imagem}
                  alt={`Site ${p.nome}`}
                  loading="lazy"
                  className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
              ) : (
                <div className="flex h-full items-center justify-center p-8 text-center">
                  <span className="font-display text-3xl italic text-dourado">{p.nome}</span>
                </div>
              )}
            </div>
            <div className="p-8">
              <p className="label-mono text-dourado">
                {p.tipo}
                {p.status ? ` · ${p.status}` : ""}
              </p>
              <h3 className="mt-3 font-display text-3xl text-marfim">{p.nome}</h3>
              <p className="mt-3 text-sm leading-relaxed text-marfim/70">{p.resumo}</p>
              {p.url && !p.status && <p className="label-mono mt-6 text-marfim">Ver site ✦</p>}
            </div>
          </>
        );
        return p.url && !p.status ? (
          <a key={p.nome} href={p.url} target="_blank" rel="noopener noreferrer" className="group block bg-preto">
            {corpo}
          </a>
        ) : (
          <div key={p.nome} className="group bg-preto">{corpo}</div>
        );
      })}
    </div>
  );
}

export function PortfolioHome() {
  return (
    <section id="portfolio" className="border-t border-border/50 bg-preto py-28 md:py-40">
      <div className="mx-auto max-w-[1440px] px-6 md:px-12">
        <div className="mb-16 flex flex-wrap items-end justify-between gap-8">
          <SectionTitle eyebrow="Portfólio" lines={["Alguns projetos", <em key="e" className="italic text-dourado">que assinamos.</em>]} />
          <Link to="/portfolio" className="label-mono text-dourado hover:text-marfim">Visão geral ✦</Link>
        </div>
        <PortfolioGrid />
      </div>
    </section>
  );
}
