import { useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";
import { LINHAS, LINHA_INTELIGENCIA } from "@/content/servicos";
import { Line } from "@/components/site/Lines";

const CARDS = [
  ...LINHAS.map((l) => ({ ...l, href: `/servicos/${l.slug}` })),
  { ...LINHA_INTELIGENCIA, href: "/servicos/inteligencia" },
];

/** Rolagem horizontal fixada no desktop; carrossel com swipe no celular. */
export function ServicosHome() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.innerWidth < 1024) return;
    let ctx: { revert: () => void } | undefined;
    (async () => {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      gsap.registerPlugin(ScrollTrigger);
      const el = track.current;
      if (!el || !section.current) return;
      ctx = gsap.context(() => {
        const dist = () => el.scrollWidth - window.innerWidth + 96;
        gsap.to(el, {
          x: () => -dist(),
          ease: "none",
          scrollTrigger: {
            trigger: section.current,
            start: "top top",
            end: () => `+=${dist()}`,
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        });
      });
    })();
    return () => ctx?.revert();
  }, []);

  return (
    <section ref={section} id="servicos" className="relative overflow-hidden border-t border-border/50 bg-preto py-24 lg:flex lg:h-screen lg:flex-col lg:justify-center lg:py-0">
      <div className="mx-auto w-full max-w-[1440px] px-6 md:px-12">
        <p className="label-mono mb-6 text-dourado">Serviços</p>
        <h2 data-lines className="title-2 text-marfim">
          <Line>Seis frentes.</Line>
          <Line>
            <em className="italic text-dourado">Um time só.</em>
          </Line>
        </h2>
      </div>

      <div
        ref={track}
        className="mt-14 flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-6 md:px-12 lg:snap-none lg:overflow-visible lg:pb-0"
      >
        {CARDS.map((c, i) => (
          <Link
            key={c.linha}
            to={c.href}
            className={`group flex w-[84vw] shrink-0 snap-start flex-col justify-between border border-border/60 p-8 transition-colors duration-500 hover:border-dourado/70 sm:w-[60vw] md:p-10 lg:h-[56vh] lg:w-[30vw] ${
              i === 5 ? "bg-bordo" : i % 2 ? "bg-marrom" : "bg-preto"
            }`}
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="label-mono text-dourado">{c.linha}</span>
                <span className="font-serif text-lg text-dourado/60">0{i + 1}</span>
              </div>
              <h3 className="mt-10 font-serif text-3xl font-light leading-tight text-marfim md:text-4xl">
                {c.titulo}
              </h3>
              <p className="mt-6 text-sm leading-loose text-marfim/70">{c.curta}</p>
            </div>
            <span className="label-mono mt-10 inline-flex items-center gap-3 text-dourado">
              Conhecer
              <span className="h-px w-8 bg-dourado transition-all duration-500 group-hover:w-16" />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
