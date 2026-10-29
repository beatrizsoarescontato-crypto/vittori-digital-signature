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
    <div ref={ref} className="border border-border/60 bg-preto">
      <div className="flex items-center gap-3 border-b border-border/60 px-5 py-4">
        <span className="h-2 w-2 rounded-full bg-dourado" />
        <span className="label-mono text-marfim/80">WhatsApp da sua empresa</span>
      </div>
      <div className="flex min-h-[480px] sm:min-h-[380px] flex-col gap-3 p-5" aria-live="polite">
        {CONVERSA.slice(0, n).map((m, i) => (
          <div
            key={i}
            className={`max-w-[85%] animate-in fade-in slide-in-from-bottom-2 px-4 py-3 text-sm leading-relaxed duration-500 ${
              m.de === "cliente" ? "self-end bg-marrom text-marfim" : "self-start border border-dourado/30 text-marfim/90"
            }`}
          >
            {m.audio ? (
              <span className="flex items-center gap-3">
                <span className="text-dourado">▶</span>
                <span className="h-px w-24 bg-marfim/40" />
                <span className="caption">{m.texto}</span>
              </span>
            ) : (
              m.texto
            )}
          </div>
        ))}
      </div>
      <p className="caption border-t border-border/60 px-5 py-3">Conversa ilustrativa</p>
    </div>
  );
}

export function InteligenciaDestaque() {
  return (
    <section id="inteligencia" className="relative border-t border-border/50 bg-bordo-dark py-28 md:py-40">
      <div className="mx-auto max-w-[1440px] px-6 md:px-12">
        <p className="label-mono mb-6 text-dourado">Vittori Inteligência</p>
        <h2 data-lines className="title-2 max-w-4xl text-marfim">
          <Line>Nenhum cliente sem resposta.</Line>
          <Line>
            <em className="italic text-dourado">Nenhuma decisão no escuro.</em>
          </Line>
        </h2>

        <div className="mt-20">
          {PRODUTOS_IA.map((p, i) => {
            const Icon = [Bot, LayoutDashboard, PanelsTopLeft][i] ?? Bot;
            return (
              <div key={p.slug} className="grid items-start gap-10 border-t border-marfim/25 py-12 lg:grid-cols-12 lg:gap-16">
                <div className="lg:col-span-7">
                  <p className="label-mono flex items-center gap-3 text-dourado"><Icon aria-hidden="true" className="size-5" strokeWidth={1.5} />{p.nome}</p>
                  <h3 className="mt-4 font-serif text-3xl font-medium text-marfim">{p.titulo}</h3>
                  <p className="measure mt-4 text-sm font-normal leading-loose text-marfim/90">{p.resumo}</p>
                  <Link to={p.to} className="label-mono mt-6 inline-flex min-h-11 items-center gap-3 text-dourado">Saiba mais <ArrowUpRight aria-hidden="true" className="size-4" /></Link>
                </div>
                {i === 0 && <div className="min-w-0 lg:col-span-5"><ConversaIlustrativa /></div>}
              </div>
            );
          })}
        </div>

        <div className="mt-16">
          <Btn href={henriqueLink()} variant="ghost">
            Falar com o Henrique, Consultor de Novos Projetos
          </Btn>
        </div>
      </div>
    </section>
  );
}
