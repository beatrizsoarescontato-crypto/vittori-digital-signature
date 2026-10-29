import { useCallback, useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight, Camera, ChartNoAxesCombined, Globe, Megaphone, MessagesSquare, PenTool, Sparkles, type LucideIcon } from "lucide-react";
import { LINHAS, LINHA_INTELIGENCIA } from "@/content/servicos";
import { Line } from "@/components/site/Lines";
import { Button } from "@/components/ui/button";

const CARDS = [...LINHAS.map((l) => ({ ...l, href: `/servicos/${l.slug}` })), { ...LINHA_INTELIGENCIA, href: "/servicos/inteligencia" }];
const ICONES: Record<string, LucideIcon> = { presenca: MessagesSquare, performance: ChartNoAxesCombined, estudio: Camera, digital: Globe, identidade: PenTool, campanha: Megaphone };

/** Native vertical page flow with a draggable, keyboard-accessible services carousel. */
export function ServicosHome() {
  const [viewportRef, api] = useEmblaCarousel({ align: "start", containScroll: "trimSnaps", dragFree: true });
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const update = useCallback(() => {
    if (!api) return;
    setCanPrev(api.canScrollPrev());
    setCanNext(api.canScrollNext());
  }, [api]);
  useEffect(() => {
    if (!api) return;
    update();
    api.on("select", update).on("scroll", update).on("reInit", update);
    return () => { api.off("select", update).off("scroll", update).off("reInit", update); };
  }, [api, update]);

  return (
    <section id="servicos" className="relative border-t border-border/50 bg-preto/35 py-24 md:py-32">
      <div className="mx-auto w-full max-w-[1440px] px-6 md:px-12">
        <div className="flex items-end justify-between gap-5">
          <div>
            <p className="label-mono mb-6 text-dourado">Serviços</p>
            <h2 data-lines className="title-2 text-marfim">
              <Line>Sete frentes.</Line>
              <Line><em className="title-shimmer italic text-dourado">Um time só.</em></Line>
            </h2>
          </div>
          <div className="flex shrink-0 gap-2">
            <Button variant="outline" size="icon" className="size-12 border-dourado/60 bg-transparent text-dourado" disabled={!canPrev} onClick={() => api?.scrollPrev()} aria-label="Serviços anteriores" title="Serviços anteriores"><ArrowLeft /></Button>
            <Button variant="outline" size="icon" className="size-12 border-dourado/60 bg-transparent text-dourado" disabled={!canNext} onClick={() => api?.scrollNext()} aria-label="Próximos serviços" title="Próximos serviços"><ArrowRight /></Button>
          </div>
        </div>
        <div ref={viewportRef} className="mt-14 overflow-hidden" role="region" aria-label="Serviços da Vittori" tabIndex={0} onKeyDown={(e) => { if (e.key === "ArrowRight") { e.preventDefault(); api?.scrollNext(); } if (e.key === "ArrowLeft") { e.preventDefault(); api?.scrollPrev(); } }}>
          <div className="flex touch-pan-y gap-5 cursor-grab active:cursor-grabbing">
            {CARDS.map((c, i) => {
              const Icon = ("slug" in c ? ICONES[c.slug] : undefined) ?? Sparkles;
              const ia = c.href === "/servicos/inteligencia";
              return (
                <Link key={c.linha} to={c.href} draggable={false} className={`group flex min-w-0 shrink-0 basis-[88%] flex-col justify-between border border-border/60 p-7 transition-colors duration-500 hover:border-dourado/70 sm:basis-[62%] md:p-9 lg:basis-[calc((100%-2.5rem)/3)] ${ia ? "bg-bordo/90" : i % 2 ? "bg-marrom/80" : "bg-preto/75"}`}>
                  <div>
                    <div className="flex items-center justify-between gap-3"><span className="label-mono text-dourado">{c.linha}</span><Icon className="size-6 shrink-0 text-dourado" strokeWidth={1.5} aria-hidden="true" /></div>
                    <h3 className="mt-10 font-serif text-3xl font-medium leading-tight text-marfim md:text-4xl">{c.titulo}</h3>
                    <p className="mt-6 text-sm font-normal leading-loose text-marfim/90">{c.curta}</p>
                  </div>
                  <span className="label-mono mt-10 inline-flex items-center gap-3 text-dourado">Conhecer <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" /></span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
