import { useState } from "react";
import { Line } from "./Lines";

const SERVICOS = [
  {
    titulo: "Estratégia de Marca",
    desc: "Diagnóstico, posicionamento, arquitetura de marca, território verbal e plano de presença.",
    entregas: ["Diagnóstico", "Posicionamento", "Território verbal", "Plano de presença"],
  },
  {
    titulo: "Identidade Visual",
    desc: "Símbolo, monograma, sistema tipográfico, paleta e manual — identidade construída para durar décadas.",
    entregas: ["Símbolo & monograma", "Sistema tipográfico", "Paleta", "Manual de marca"],
  },
  {
    titulo: "Design & Direção de Arte",
    desc: "Direção fotográfica, materiais impressos, embalagens, ambientação e curadoria estética contínua.",
    entregas: ["Direção fotográfica", "Impressos", "Embalagem", "Ambientação"],
  },
  {
    titulo: "Conteúdo & Copy",
    desc: "Narrativa, tom de voz, roteiros e textos que carregam a autoridade da marca em cada linha.",
    entregas: ["Narrativa", "Tom de voz", "Roteiros", "Copy institucional"],
  },
  {
    titulo: "Presença Digital",
    desc: "Sites autorais, social com direção de arte, lançamentos e experiências digitais sob medida.",
    entregas: ["Site autoral", "Social com DA", "Lançamentos", "Experiências 3D"],
  },
];

export function Servicos() {
  const [ativo, setAtivo] = useState(0);

  return (
    <section id="servicos" className="relative overflow-hidden border-t border-border/50 py-28 md:py-44">
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{ background: "linear-gradient(180deg, rgba(40,28,21,0.92) 0%, rgba(13,13,13,0.95) 100%)" }}
      />
      <div className="mx-auto max-w-[1440px] px-6 md:px-12">
        <div className="grid grid-cols-12 items-end gap-y-10">
          <div className="col-span-12 lg:col-span-7">
            <p className="label-mono mb-6 text-dourado">03 · Serviços</p>
            <h2 data-lines className="title-1 text-marfim">
              <Line>Cinco frentes,</Line>
              <Line>
                <span className="text-marfim/40">um só sistema.</span>
              </Line>
            </h2>
          </div>
          <p data-reveal className="col-span-12 lg:col-span-4 lg:col-start-9">
            <span className="reveal-item block text-sm leading-loose text-muted-foreground">
              Nunca vendemos peça isolada sem estratégia por baixo. Se a base não existe, começamos
              por ela.
            </span>
          </p>
        </div>

        <ul data-reveal className="mt-20">
          {SERVICOS.map((s, i) => (
            <li key={s.titulo} className="reveal-item border-t border-border/60">
              <button
                type="button"
                aria-expanded={ativo === i}
                onMouseEnter={() => setAtivo(i)}
                onFocus={() => setAtivo(i)}
                onClick={() => setAtivo(i)}
                className="group flex min-h-11 w-full items-center justify-between gap-6 py-7 text-left md:py-10"
              >
                <span className="flex min-w-0 items-baseline gap-6 md:gap-14">
                  <span className="label-mono shrink-0 text-dourado/60">0{i + 1}</span>
                  <span
                    className={`font-serif text-[1.7rem] leading-none font-light transition-colors duration-500 md:text-[2.9rem] ${
                      ativo === i ? "text-dourado" : "text-marfim"
                    }`}
                  >
                    {s.titulo}
                  </span>
                </span>
                <span
                  className={`hidden h-px shrink-0 bg-dourado transition-all duration-700 md:block ${
                    ativo === i ? "w-24" : "w-6"
                  }`}
                />
              </button>
              <div
                className={`grid overflow-hidden transition-all duration-700 ease-out ${
                  ativo === i ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="pb-10 md:pl-[8.5rem]">
                  <p className="measure text-sm leading-loose text-marfim/70">{s.desc}</p>
                  <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-3">
                    {s.entregas.map((e) => (
                      <li key={e} className="caption flex items-center gap-2">
                        <span className="text-dourado/70">✦</span>
                        {e}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </li>
          ))}
          <li className="border-t border-border/60" />
        </ul>
      </div>
    </section>
  );
}
