import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Maximize2 } from "lucide-react";
import { PROJETOS } from "@/content/portfolio";
import { SectionTitle } from "@/components/site/ui";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";

export function PortfolioGrid() {
  const [aberto, setAberto] = useState<string | null>(null);
  const projeto = PROJETOS.find((p) => p.nome === aberto);
  return (
    <>
    <div className="grid gap-px bg-border/50 md:grid-cols-3">
      {PROJETOS.map((p) => {
        const corpo = (
          <>
            <div className="relative aspect-[16/10] overflow-hidden bg-marrom">
              {p.imagem ? (
                <img
                  src={p.imagem}
                  alt={`Projeto ${p.nome}`}
                  loading="lazy"
                  className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
              ) : (
                <div className="flex h-full items-center justify-center p-8 text-center">
                  <span className="font-serif text-3xl italic text-dourado">{p.nome}</span>
                </div>
              )}
            </div>
            <div className="p-8">
              <p className="label-mono text-dourado">{p.tipo}</p>
              <h3 className="mt-3 font-serif text-3xl text-marfim">{p.nome}</h3>
              <p className="mt-3 text-sm leading-relaxed text-marfim/70">{p.resumo}</p>
              {(p.imagem || p.midias?.length) ? <Button variant="ghost" className="mt-5 h-auto min-h-11 max-w-full justify-start whitespace-normal px-0 text-dourado hover:bg-transparent hover:text-marfim" onClick={() => setAberto(p.nome)} aria-label={`Visualizar projeto ${p.nome}`}>
                <Maximize2 aria-hidden="true" /> Visualizar projeto
              </Button> : null}
            </div>
          </>
        );
        return (
          <div key={p.nome} className="group bg-preto">{corpo}</div>
        );
      })}
    </div>
    <Dialog open={Boolean(projeto)} onOpenChange={(open) => { if (!open) setAberto(null); }}>
      <DialogContent className="max-h-[90dvh] w-[calc(100%-2rem)] max-w-5xl overflow-y-auto rounded-none border-border bg-preto p-5 md:p-8">
        <DialogTitle className="pr-8 font-serif text-3xl font-normal text-marfim">{projeto?.nome}</DialogTitle>
        <DialogDescription className="text-dourado">{projeto?.tipo}</DialogDescription>
        <div className="grid gap-5">
          {projeto?.midias ? projeto.midias.map((m) => m.tipo === "video" ? (
            <video key={m.src} poster={m.poster} controls playsInline preload="none" aria-label={m.alt} className="max-h-[65dvh] w-full bg-preto object-contain">
              {m.alternativa ? <source src={m.alternativa} type="video/webm" /> : null}
              <source src={m.src} type="video/mp4" />
            </video>
          ) : (
            <img key={m.src} src={m.src} alt={m.alt} className="max-h-[75dvh] w-full object-contain" />
          )) : projeto?.imagem ? (
            <img src={projeto.imagem} alt={`Visualização do site ${projeto.nome}`} className="w-full" />
          ) : null}
        </div>
      </DialogContent>
    </Dialog>
    </>
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
