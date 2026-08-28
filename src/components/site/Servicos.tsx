import { useState } from "react";

const SERVICOS = [
  {
    titulo: "Estratégia de Marca",
    desc: "Diagnóstico, posicionamento, arquitetura de marca, território verbal e plano de presença.",
  },
  {
    titulo: "Identidade Visual",
    desc: "Símbolo, monograma, sistema tipográfico, paleta e manual — identidade construída para durar décadas.",
  },
  {
    titulo: "Design & Direção de Arte",
    desc: "Direção fotográfica, materiais impressos, embalagens, ambientação e curadoria estética contínua.",
  },
  {
    titulo: "Conteúdo & Copy",
    desc: "Narrativa, tom de voz, roteiros e textos que carregam a autoridade da marca em cada linha.",
  },
  {
    titulo: "Presença Digital",
    desc: "Sites autorais, social com direção de arte, lançamentos e experiências digitais sob medida.",
  },
];

export function Servicos() {
  const [ativo, setAtivo] = useState(0);

  return (
    <section
      id="servicos"
      className="relative border-t border-border/60 py-28 md:py-40"
      style={{ background: "linear-gradient(180deg, #281C15 0%, #0D0D0D 100%)" }}
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        <div data-reveal className="flex flex-wrap items-end justify-between gap-8">
          <h2 className="reveal-item max-w-xl font-serif text-[clamp(2rem,4.6vw,4rem)] leading-tight font-light text-marfim">
            Serviços com <em className="italic text-dourado">intenção</em>
          </h2>
          <p className="reveal-item max-w-xs text-sm leading-loose text-muted-foreground">
            Cinco frentes que operam juntas. Nunca vendemos peça isolada sem estratégia por
            baixo.
          </p>
        </div>

        <ul data-reveal className="mt-20">
          {SERVICOS.map((s, i) => (
            <li key={s.titulo} className="reveal-item border-t border-border/70">
              <button
                type="button"
                onMouseEnter={() => setAtivo(i)}
                onFocus={() => setAtivo(i)}
                onClick={() => setAtivo(i)}
                className="group flex w-full items-center justify-between gap-6 py-8 text-left md:py-10"
              >
                <span className="flex items-baseline gap-6 md:gap-12">
                  <span className="text-[0.65rem] tracking-[0.3em] text-dourado/60">
                    0{i + 1}
                  </span>
                  <span
                    className={`font-serif text-2xl font-light transition-colors duration-400 md:text-[2.6rem] ${
                      ativo === i ? "text-dourado" : "text-marfim"
                    }`}
                  >
                    {s.titulo}
                  </span>
                </span>
                <span
                  className={`hidden h-px shrink-0 bg-dourado transition-all duration-500 md:block ${ativo === i ? "w-20" : "w-6"}`}
                />
              </button>
              <div
                className={`grid overflow-hidden transition-all duration-500 ease-out ${
                  ativo === i ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <p className="max-w-2xl pb-10 text-sm leading-loose text-marfim/70 md:pl-[7.5rem]">
                  {s.desc}
                </p>
              </div>
            </li>
          ))}
          <li className="border-t border-border/70" />
        </ul>
      </div>
    </section>
  );
}
