import { Line } from "./Lines";

const PILARES = [
  {
    n: "I",
    titulo: "Excelência",
    texto:
      "Nada entregue no automático. Revisão, acabamento e critério em cada camada — inclusive nas que ninguém vê.",
  },
  {
    n: "II",
    titulo: "Estratégia",
    texto:
      "Antes da estética, a decisão. Posicionamento define o que a marca diz e, principalmente, o que se recusa a dizer.",
  },
  {
    n: "III",
    titulo: "Criatividade",
    texto:
      "Ideia com direção. Procuramos o gesto certo, não o efeito fácil: o que soa novo e continua verdadeiro em cinco anos.",
  },
  {
    n: "IV",
    titulo: "Presença",
    texto:
      "Consistência ao longo do tempo. Presença é o que sobra quando a campanha termina.",
  },
];

/** Capítulo em bloco de cor cheia: bordô. */
export function Pilares() {
  return (
    <section
      id="pilares"
      className="relative isolate overflow-hidden py-28 md:py-44"
      style={{
        background:
          "radial-gradient(120% 100% at 15% 0%, #8B0F1A 0%, #5C0A12 45%, #2A0709 100%)",
      }}
    >
      <div aria-hidden className="grain-layer opacity-[0.09]" />

      <div className="relative mx-auto max-w-[1440px] px-6 md:px-12">
        <div className="grid grid-cols-12 items-end gap-y-10">
          <div className="col-span-12 lg:col-span-7">
            <p className="label-mono mb-6 text-dourado-claro/80">02 · Os quatro pilares</p>
            <h2 data-lines className="title-1 text-marfim">
              <Line>O que sustenta</Line>
              <Line>
                <em className="italic text-dourado-claro">tudo.</em>
              </Line>
            </h2>
          </div>
          <p
            data-reveal
            className="col-span-12 lg:col-span-4 lg:col-start-9"
          >
            <span className="reveal-item block text-sm leading-loose text-marfim/70">
              Nenhum pilar funciona sozinho. É a combinação — e a ordem — que separa marca de
              logotipo.
            </span>
          </p>
        </div>

        <div data-reveal className="mt-20 grid gap-px border border-marfim/12 md:grid-cols-2">
          {PILARES.map((p) => (
            <article
              key={p.n}
              className="reveal-item group relative overflow-hidden bg-preto/25 p-8 transition-colors duration-700 hover:bg-preto/55 md:p-12"
            >
              <span className="absolute right-6 top-6 font-serif text-5xl font-light text-marfim/10 transition-colors duration-700 group-hover:text-dourado/40">
                {p.n}
              </span>
              <span className="text-dourado">✦</span>
              <h3 className="mt-6 font-serif text-3xl font-light text-marfim md:text-[2.6rem]">
                {p.titulo}
              </h3>
              <p className="mt-5 max-w-md text-sm leading-loose text-marfim/65">{p.texto}</p>
              <span className="mt-8 block h-px w-10 bg-dourado/60 transition-all duration-700 group-hover:w-24" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
