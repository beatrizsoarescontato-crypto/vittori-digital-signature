import { useCallback, useEffect, useState, type PointerEvent, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight, Camera, ChartNoAxesCombined, Globe, Megaphone, MessagesSquare, PenTool, Sparkles, type LucideIcon } from "lucide-react";
import { LINHAS, LINHA_INTELIGENCIA } from "@/content/servicos";
import { Button } from "@/components/ui/button";
import { Line } from "@/components/site/Lines";

const CARDS = [...LINHAS.map((l) => ({ ...l, key: l.slug as string, href: `/servicos/${l.slug}` })), { ...LINHA_INTELIGENCIA, key: "inteligencia", href: "/" }];
const ICONES: Record<string, LucideIcon> = { presenca: MessagesSquare, performance: ChartNoAxesCombined, estudio: Camera, digital: Globe, identidade: PenTool, campanha: Megaphone, inteligencia: Sparkles };

const S = "currentColor";
/** Ornamento próprio de cada frente: composição distinta, traço fino e discreto. */
const ORNAMENTOS: Record<string, ReactNode> = {
  presenca: (
    <svg viewBox="0 0 200 200" className="svc-orn -right-16 -top-16 size-64 text-dourado/25" fill="none" stroke={S} strokeWidth="0.6">
      <circle cx="100" cy="100" r="40" /><circle cx="100" cy="100" r="64" /><circle cx="100" cy="100" r="88" strokeDasharray="2 5" />
      <circle cx="164" cy="100" r="2.5" fill={S} />
    </svg>
  ),
  performance: (
    <svg viewBox="0 0 200 120" className="svc-orn bottom-24 left-0 right-0 h-28 w-full text-dourado/25" fill="none" stroke={S} strokeWidth="0.7" preserveAspectRatio="none">
      {[20, 34, 30, 52, 46, 70, 66, 92].map((h, i) => <line key={i} x1={14 + i * 24} x2={14 + i * 24} y1={120} y2={120 - h} />)}
      <polyline points="14,96 38,84 62,88 86,66 110,72 134,48 158,52 182,26" strokeWidth="1" />
    </svg>
  ),
  estudio: (
    <svg viewBox="0 0 200 200" className="svc-orn right-6 top-1/2 size-56 -translate-y-1/2 text-dourado/20" fill="none" stroke={S} strokeWidth="0.6">
      <circle cx="100" cy="100" r="80" />
      {[0, 60, 120, 180, 240, 300].map((a) => <line key={a} x1="100" y1="100" x2={100 + 80 * Math.cos((a * Math.PI) / 180)} y2={100 + 80 * Math.sin((a * Math.PI) / 180)} transform={`rotate(18 100 100)`} />)}
      <circle cx="100" cy="100" r="26" />
    </svg>
  ),
  digital: (
    <svg viewBox="0 0 200 200" className="svc-orn inset-0 size-full text-dourado/12" fill="none" stroke={S} strokeWidth="0.4" preserveAspectRatio="none">
      {Array.from({ length: 9 }, (_, i) => <line key={`v${i}`} x1={i * 25} x2={i * 25} y1="0" y2="200" />)}
      {Array.from({ length: 9 }, (_, i) => <line key={`h${i}`} y1={i * 25} y2={i * 25} x1="0" x2="200" />)}
    </svg>
  ),
  identidade: (
    <span className="svc-orn -bottom-10 -right-2 font-serif text-[15rem] font-light leading-none text-transparent [-webkit-text-stroke:1px_color-mix(in_oklab,var(--dourado)_28%,transparent)]">V</span>
  ),
  campanha: (
    <svg viewBox="0 0 200 200" className="svc-orn -left-10 -top-10 size-72 text-dourado/18" fill="none" stroke={S} strokeWidth="0.5">
      {Array.from({ length: 9 }, (_, i) => <line key={i} x1="0" y1="0" x2={200} y2={i * 25} />)}
    </svg>
  ),
  inteligencia: (
    <>
      <span className="svc-orn inset-0 bg-[radial-gradient(70%_60%_at_80%_10%,color-mix(in_oklab,var(--dourado)_18%,transparent),transparent_70%)]" />
      <svg viewBox="0 0 200 200" className="svc-orn right-4 top-16 size-48 text-dourado/45" fill={S}>
        {[[30, 40], [80, 20], [130, 60], [170, 30], [110, 120], [60, 100]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="1.6" />)}
      </svg>
    </>
  ),
};

function tilt(e: PointerEvent<HTMLElement>) {
  if (e.pointerType !== "mouse") return;
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  const x = (e.clientX - r.left) / r.width;
  const y = (e.clientY - r.top) / r.height;
  el.style.setProperty("--mx", `${x * 100}%`);
  el.style.setProperty("--my", `${y * 100}%`);
  el.style.setProperty("--ry", `${(x - 0.5) * 4}deg`);
  el.style.setProperty("--rx", `${(0.5 - y) * 4}deg`);
}
function reset(e: PointerEvent<HTMLElement>) {
  e.currentTarget.style.setProperty("--rx", "0deg");
  e.currentTarget.style.setProperty("--ry", "0deg");
}

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
    <section data-stage-section="wide" id="servicos" className="relative section-seam py-14 md:py-20 reading-veil">
      <div className="mx-auto w-full max-w-[1440px] px-6 md:px-12">
        <div className="flex items-end justify-between gap-5">
          <div>
            <p className="t-label mb-6">Serviços</p>
            <h2 data-lines className="title-2 text-marfim">
              <Line>Sete frentes.</Line>
              <Line><em className="italic text-dourado">Um time só.</em></Line>
            </h2>
          </div>
          <div className="flex shrink-0 gap-3">
            <Button type="button" variant="ghost" className="vicon" disabled={!canPrev} onClick={() => api?.scrollPrev()} aria-label="Serviços anteriores" title="Serviços anteriores"><ArrowLeft className="size-5" strokeWidth={1.5} /></Button>
            <Button type="button" variant="ghost" className="vicon" disabled={!canNext} onClick={() => api?.scrollNext()} aria-label="Próximos serviços" title="Próximos serviços"><ArrowRight className="size-5" strokeWidth={1.5} /></Button>
          </div>
        </div>
        <div ref={viewportRef} className="-mx-2 mt-7 overflow-hidden px-2 py-4" role="region" aria-label="Serviços da Vittori" tabIndex={0} onKeyDown={(e) => { if (e.key === "ArrowRight") { e.preventDefault(); api?.scrollNext(); } if (e.key === "ArrowLeft") { e.preventDefault(); api?.scrollPrev(); } }}>
          <div className="flex touch-pan-y gap-5 cursor-grab active:cursor-grabbing">
            {CARDS.map((c, i) => {
              const Icon = ICONES[c.key] ?? Sparkles;
              const ia = c.key === "inteligencia";
              return (
                <Link
                  key={c.key}
                  to={c.href}
                  {...(ia ? { hash: "inteligencia" } : {})}
                  draggable={false}
                  onPointerMove={tilt}
                  onPointerLeave={reset}
                  data-service={c.key}
                  className={`svc-card glow-edge group relative grid min-w-0 shrink-0 basis-[86%] overflow-hidden p-7 sm:basis-[62%] md:p-8 lg:basis-[calc((100%-2.5rem)/3)] ${ia ? "glass glass--bordo" : "glass"}`}
                >
                  {ORNAMENTOS[c.key]}
                  <div className="relative z-10 flex h-20 items-center justify-between gap-4">
                    <span className="svc-num text-7xl" aria-hidden="true">0{i + 1}</span>
                    <span className="flex size-14 shrink-0 items-center justify-center rounded-full border border-dourado/35">
                      <Icon className="size-6 text-dourado" strokeWidth={1.25} aria-hidden="true" />
                    </span>
                  </div>
                  <div className="svc-copy pt-6">
                    <p className="service-name">{c.linha}</p>
                    <h3 className="t-title">{c.titulo}</h3>
                    <span aria-hidden className="mt-6 block h-px w-12 bg-dourado/50 transition-all duration-700 group-hover:w-24" />
                    <p className="t-body mt-5">{c.curta}</p>
                    <span className="vlink mt-6">Conhecer <ArrowRight className="size-4" aria-hidden="true" /></span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
