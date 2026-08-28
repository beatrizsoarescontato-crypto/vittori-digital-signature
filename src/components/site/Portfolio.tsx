import { useRef, type PointerEvent } from "react";
import p1 from "@/assets/portfolio-1.jpg";
import p2 from "@/assets/portfolio-2.jpg";
import p3 from "@/assets/portfolio-3.jpg";
import p4 from "@/assets/portfolio-4.jpg";

const PROJETOS = [
  {
    img: p1,
    nome: "Casa Bramante",
    seg: "Arquitetura de interiores",
    escopo: "Identidade visual · Direção de arte",
    span: "md:col-span-7",
  },
  {
    img: p2,
    nome: "Ateliê Vestígio",
    seg: "Marcenaria autoral",
    escopo: "Estratégia de marca · Conteúdo",
    span: "md:col-span-5 md:mt-24",
  },
  {
    img: p3,
    nome: "Maison Aurelle",
    seg: "Alta joalheria",
    escopo: "Identidade · Presença digital",
    span: "md:col-span-5",
  },
  {
    img: p4,
    nome: "Instituto Serrano",
    seg: "Gestão patrimonial",
    escopo: "Posicionamento · Copy",
    span: "md:col-span-7 md:mt-16",
  },
];

function TiltCard({ projeto }: { projeto: (typeof PROJETOS)[number] }) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || e.pointerType === "touch") return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(1100px) rotateY(${x * 11}deg) rotateX(${-y * 11}deg) translateZ(24px)`;
  };

  const onLeave = () => {
    const el = ref.current;
    if (el) el.style.transform = "perspective(1100px) rotateY(0deg) rotateX(0deg)";
  };

  return (
    <article className={`reveal-item ${projeto.span}`} style={{ perspective: "1100px" }}>
      <div
        ref={ref}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        className="group relative overflow-hidden border border-border/70 transition-transform duration-500 ease-out will-change-transform"
      >
        <img
          src={projeto.img}
          alt={`${projeto.nome} — ${projeto.seg}`}
          loading="lazy"
          width={1200}
          height={1504}
          className="aspect-4/5 w-full object-cover brightness-[0.82] transition-all duration-700 group-hover:scale-[1.04] group-hover:brightness-100"
        />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: "linear-gradient(to top, rgba(13,13,13,0.92) 8%, transparent 60%)",
          }}
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 p-7 md:p-9"
          style={{ transform: "translateZ(50px)" }}
        >
          <span className="eyebrow text-dourado/80">{projeto.seg}</span>
          <h3 className="mt-3 font-serif text-3xl font-light text-marfim md:text-4xl">
            {projeto.nome}
          </h3>
          <p className="mt-3 text-xs tracking-[0.12em] text-marfim/55 uppercase">
            {projeto.escopo}
          </p>
        </div>
      </div>
    </article>
  );
}

export function Portfolio() {
  return (
    <section id="portfolio" className="relative border-t border-border/60 bg-preto py-28 md:py-40">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        <div data-reveal className="max-w-2xl">
          <span className="reveal-item eyebrow block">✦ Seleção</span>
          <h2 className="reveal-item mt-6 font-serif text-[clamp(2rem,4.6vw,4rem)] leading-tight font-light text-marfim">
            Marcas que <em className="italic text-dourado">permanecem</em>
          </h2>
        </div>

        <div data-reveal className="mt-20 grid gap-10 md:grid-cols-12 md:gap-14">
          {PROJETOS.map((p) => (
            <TiltCard key={p.nome} projeto={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
