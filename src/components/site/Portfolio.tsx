import { useRef, type PointerEvent } from "react";
import p1 from "@/assets/portfolio-1.jpg";
import p2 from "@/assets/portfolio-2.jpg";
import p3 from "@/assets/portfolio-3.jpg";
import p4 from "@/assets/portfolio-4.jpg";
import { Line } from "./Lines";

const PROJETOS = [
  {
    img: p1,
    nome: "Casa Bramante",
    seg: "Arquitetura de interiores",
    escopo: "Identidade visual · Direção de arte",
    desafio: "Escritório premiado, percebido como caro sem parecer desejável.",
    resultado: "Ticket médio 2,4× maior em 8 meses; fila de espera de 3 meses.",
    span: "md:col-span-7",
  },
  {
    img: p2,
    nome: "Ateliê Vestígio",
    seg: "Marcenaria autoral",
    escopo: "Estratégia de marca · Conteúdo",
    desafio: "Peças de autor competindo por preço com marcenaria comum.",
    resultado: "Saiu da comparação por preço e passou a vender por assinatura de autor.",
    span: "md:col-span-5 md:mt-28",
  },
  {
    img: p3,
    nome: "Maison Aurelle",
    seg: "Alta joalheria",
    escopo: "Identidade · Presença digital",
    desafio: "Herança de 40 anos sem linguagem contemporânea.",
    resultado: "Presença digital que sustentou a primeira coleção internacional.",
    span: "md:col-span-5",
  },
  {
    img: p4,
    nome: "Instituto Serrano",
    seg: "Gestão patrimonial",
    escopo: "Posicionamento · Copy",
    desafio: "Discurso técnico afastava herdeiros de segunda geração.",
    resultado: "Nova narrativa reduziu o ciclo de decisão de 6 para 2 reuniões.",
    span: "md:col-span-7 md:mt-20",
  },
];

function TiltCard({ projeto }: { projeto: (typeof PROJETOS)[number] }) {
  const ref = useRef<HTMLDivElement>(null);
  const media = useRef<HTMLImageElement>(null);

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || e.pointerType === "touch") return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(1200px) rotateY(${x * 9}deg) rotateX(${-y * 9}deg) translateZ(20px)`;
    if (media.current) {
      media.current.style.transform = `scale(1.08) translate(${-x * 18}px, ${-y * 18}px)`;
    }
  };

  const onLeave = () => {
    if (ref.current) ref.current.style.transform = "perspective(1200px) rotateY(0) rotateX(0)";
    if (media.current) media.current.style.transform = "scale(1.02)";
  };

  return (
    <article className={`reveal-item ${projeto.span}`} style={{ perspective: "1200px" }}>
      <div
        ref={ref}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        data-cursor="ver"
        className="group relative overflow-hidden border border-border/60 transition-transform duration-700 ease-out will-change-transform"
      >
        <div className="overflow-hidden">
          <img
            ref={media}
            src={projeto.img}
            alt={`${projeto.nome} — ${projeto.seg}`}
            loading="lazy"
            decoding="async"
            width={1200}
            height={1504}
            className="aspect-4/5 w-full scale-[1.02] object-cover brightness-[0.78] transition-all duration-[900ms] ease-out group-hover:brightness-100"
          />
        </div>

        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background: "linear-gradient(to top, rgba(13,13,13,0.94) 6%, transparent 58%)",
          }}
        />

        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 p-7 md:p-10"
          style={{ transform: "translateZ(50px)" }}
        >
          <span className="label-mono text-dourado/80">{projeto.seg}</span>
          <h3 className="mt-3 font-serif text-3xl font-light text-marfim md:text-[2.7rem]">
            {projeto.nome}
          </h3>
          <p className="caption mt-3">{projeto.escopo}</p>

          <div className="mt-6 max-h-0 overflow-hidden opacity-0 transition-all duration-700 ease-out group-hover:max-h-40 group-hover:opacity-100">
            <div className="rule-gold mb-5 w-full" />
            <p className="text-xs leading-loose text-marfim/60">
              <span className="text-dourado/80">Desafio · </span>
              {projeto.desafio}
            </p>
            <p className="mt-2 text-xs leading-loose text-marfim/85">
              <span className="text-dourado/80">Resultado · </span>
              {projeto.resultado}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}

export function Portfolio() {
  return (
    <section id="portfolio" className="relative overflow-hidden border-t border-border/50 py-28 md:py-44">
      <div aria-hidden className="absolute inset-0 -z-10 bg-preto/93" />
      <div className="mx-auto max-w-[1440px] px-6 md:px-12">
        <div className="grid grid-cols-12 items-end gap-y-10">
          <div className="col-span-12 lg:col-span-7">
            <p className="label-mono mb-6 text-dourado">04 · Seleção</p>
            <h2 data-lines className="title-1 text-marfim">
              <Line>Marcas que</Line>
              <Line>
                <em className="italic text-dourado">permanecem.</em>
              </Line>
            </h2>
          </div>
          <p data-reveal className="col-span-12 lg:col-span-4 lg:col-start-9">
            <span className="reveal-item block text-sm leading-loose text-muted-foreground">
              Quatro casos, quatro pontos de partida diferentes. Passe o cursor para ver desafio e
              resultado.
            </span>
          </p>
        </div>

        <div data-reveal className="mt-20 grid gap-10 md:grid-cols-12 md:gap-16">
          {PROJETOS.map((p) => (
            <TiltCard key={p.nome} projeto={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
