import { Line } from "./Lines";

const PASSOS = [
  {
    n: "01",
    titulo: "Escuta",
    prazo: "Semana 1",
    texto: "Conversa de diagnóstico, leitura de contexto e definição do que está em jogo.",
  },
  {
    n: "02",
    titulo: "Estratégia",
    prazo: "Semanas 2–3",
    texto: "Posicionamento, território verbal e o mapa do que será construído — e por quê.",
  },
  {
    n: "03",
    titulo: "Criação",
    prazo: "Semanas 4–7",
    texto: "Identidade, direção de arte e conteúdo desenvolvidos em rodadas com você dentro.",
  },
  {
    n: "04",
    titulo: "Presença",
    prazo: "Contínuo",
    texto: "Implantação, manual e acompanhamento para a marca não perder o fio.",
  },
];

/** Capítulo claro: marfim. Quebra a monotonia do site escuro. */
export function Processo() {
  return (
    <section id="processo" className="relative overflow-hidden bg-marfim py-28 md:py-40">
      <div aria-hidden className="grain-layer opacity-[0.07]" />
      <div className="relative mx-auto max-w-[1440px] px-6 md:px-12">
        <div className="grid grid-cols-12 items-end gap-y-10">
          <div className="col-span-12 lg:col-span-7">
            <p className="label-mono mb-6 text-bordo">05 · Como trabalhamos</p>
            <h2 data-lines className="title-1 text-preto">
              <Line>Processo curto,</Line>
              <Line>
                <span className="text-preto/40">decisão longa.</span>
              </Line>
            </h2>
          </div>
          <p data-reveal className="col-span-12 lg:col-span-4 lg:col-start-9">
            <span className="reveal-item block text-sm leading-loose text-preto/65">
              Oito semanas do primeiro café à marca no ar. Escopo fechado, prazos escritos, sem
              surpresa no orçamento.
            </span>
          </p>
        </div>

        <ol data-reveal className="mt-20 grid gap-px bg-preto/12 md:grid-cols-4">
          {PASSOS.map((p) => (
            <li key={p.n} className="reveal-item bg-marfim p-8 md:p-9">
              <span className="label-mono text-bordo">{p.n}</span>
              <h3 className="mt-6 font-serif text-3xl font-light text-preto">{p.titulo}</h3>
              <p className="caption mt-2 text-preto/45">{p.prazo}</p>
              <p className="mt-5 text-sm leading-loose text-preto/70">{p.texto}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
