import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { PRODUTOS_IA } from "@/content/servicos";
import { henriqueLink } from "@/lib/contato";
import { Line } from "@/components/site/Lines";
import { Bot, LayoutDashboard, PanelsTopLeft, ArrowUpRight } from "lucide-react";
import { Btn } from "@/components/site/ui";

type Msg = { de: "cliente" | "ia"; texto: string; audio?: boolean };

const CONVERSA: Msg[] = [
  { de: "cliente", texto: "Oi! Qual o preço do iPhone 15 de 128 GB?" },
  { de: "ia", texto: "Olá! O iPhone 15 128 GB está por R$ 4.799 à vista ou em até 12x. Você vai dar algum aparelho na troca?" },
  { de: "cliente", texto: "Áudio 0:14", audio: true },
  {
    de: "ia",
    texto:
      "Entendi: você quer trocar um iPhone 12 de 64 GB, com a bateria em 82%, e prefere pagar no cartão. Já passei tudo para um consultor, que vai te chamar em instantes.",
  },
];

/** Simulação de conversa (dados fictícios). */
export function ConversaIlustrativa() {
  const ref = useRef<HTMLDivElement>(null);
  const [n, setN] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setN(CONVERSA.length);
      return;
    }
    let timer: number | undefined;
    const io = new IntersectionObserver(([e]) => {
      if (!e?.isIntersecting) return;
      io.disconnect();
      let i = 0;
      const tick = () => {
        i++;
        setN(i);
        if (i < CONVERSA.length) timer = window.setTimeout(tick, 1500);
      };
      timer = window.setTimeout(tick, 400);
    }, { threshold: 0.4 });
    io.observe(el);
    return () => {
      io.disconnect();
      clearTimeout(timer);
    };
  }, []);

  return (
    <div data-stage-zone="demo" ref={ref} className="overflow-hidden rounded-[1.25rem] border border-dourado/30 bg-preto/80 shadow-[0_30px_80px_-30px_color-mix(in_oklab,var(--preto)_90%,transparent)]">
      <div className="flex items-center gap-3 border-b border-border/60 px-5 py-4">
        <span className="h-2 w-2 rounded-full bg-dourado" />
        <span className="t-label !text-marfim/85">WhatsApp da sua empresa</span>
      </div>
      <div className="flex min-h-[480px] sm:min-h-[380px] flex-col gap-3 p-5" aria-live="polite">
        {CONVERSA.slice(0, n).map((m, i) => (
          <div
            key={i}
            className={`max-w-[85%] animate-in fade-in slide-in-from-bottom-2 px-4 py-3 text-base leading-relaxed duration-500 ${
              m.de === "cliente" ? "self-end rounded-2xl rounded-br-sm bg-marrom text-marfim" : "self-start rounded-2xl rounded-bl-sm border border-dourado/30 bg-bordo-dark/40 text-marfim"
            }`}
          >
            {m.audio ? (
              <span className="flex items-center gap-3">
                <span className="text-dourado">▶</span>
                <span className="h-px w-24 bg-marfim/70" />
                <span className="t-meta">{m.texto}</span>
              </span>
            ) : (
              m.texto
            )}
          </div>
        ))}
      </div>
      <p className="t-meta border-t border-border/60 px-5 py-3">Conversa ilustrativa</p>
    </div>
  );
}

export function InteligenciaDestaque() {
  return (
    <section data-stage-section="wide" id="inteligencia" className="relative section-seam py-28 md:py-40 reading-veil">
      <div className="mx-auto max-w-[1440px] px-6 md:px-12">
        <p className="t-label mb-6">Vittori Inteligência</p>
        <h2 data-lines className="title-2 max-w-4xl text-marfim">
          <Line>Nenhum cliente sem resposta.</Line>
          <Line>
            <em className="italic text-dourado">Nenhuma decisão no escuro.</em>
          </Line>
        </h2>

        <div className="mt-20 grid gap-6">
          {PRODUTOS_IA.map((p, i) => {
            const Icon = [Bot, LayoutDashboard, PanelsTopLeft][i] ?? Bot;
            const demo = i === 0;
            return (
              <article key={p.slug} className={`glass glow-edge relative grid items-start gap-10 overflow-hidden p-7 md:p-12 lg:grid-cols-12 lg:gap-14 ${demo ? "glass--bordo" : ""}`}>
                <div className={demo ? "lg:col-span-6" : "lg:col-span-8"}>
                  <div className="flex items-center gap-4">
                    <span className="flex size-14 items-center justify-center rounded-full border border-dourado/40"><Icon aria-hidden="true" className="size-6 text-dourado" strokeWidth={1.25} /></span>
                    <span className="t-label">Produto 0{i + 1}</span>
                  </div>
                  <h3 className="mt-8 font-serif text-4xl font-medium leading-[1.05] text-marfim md:text-5xl">{p.nome}</h3>
                  <p className="mt-5 font-serif text-2xl italic text-dourado-claro md:text-[1.7rem]">{p.titulo}</p>
                  <p className="t-body measure mt-6">{p.resumo}</p>
                  <Link to={p.to} className="vlink mt-8">Conhecer o produto <ArrowUpRight aria-hidden="true" className="size-4" /></Link>
                </div>
                {demo && <div className="min-w-0 lg:col-span-6"><ConversaIlustrativa /></div>}
              </article>
            );
          })}
        </div>

        <div className="mt-16">
          <Btn href={henriqueLink()}>
            Falar com o Henrique, Consultor de Novos Projetos
          </Btn>
        </div>
      </div>
    </section>
  );
}
