const PILARES = [
  {
    n: "01",
    titulo: "Excelência",
    texto:
      "Nenhum detalhe entregue no automático. Revisão, acabamento e critério em cada camada.",
  },
  {
    n: "02",
    titulo: "Estratégia",
    texto:
      "Antes da estética, a decisão. Posicionamento claro define o que a marca diz — e o que se recusa a dizer.",
  },
  {
    n: "03",
    titulo: "Criatividade",
    texto:
      "Ideia com direção. Buscamos o gesto certo, não o efeito fácil: o que soa novo e continua verdadeiro.",
  },
  {
    n: "04",
    titulo: "Presença",
    texto:
      "Consistência ao longo do tempo. Presença é o que sobra quando a campanha termina.",
  },
];

export function Pilares() {
  return (
    <section
      id="pilares"
      className="relative border-t border-border/60 bg-marrom py-28 md:py-40"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        <div data-reveal className="max-w-2xl">
          <span className="reveal-item eyebrow block">Os quatro pilares</span>
          <h2 className="reveal-item mt-6 font-serif text-[clamp(2rem,4.6vw,4rem)] leading-tight font-light text-marfim">
            O que sustenta <em className="italic text-dourado">tudo</em>
          </h2>
        </div>

        <div data-reveal className="mt-20 flex flex-col">
          {PILARES.map((p) => (
            <article
              key={p.n}
              className="reveal-item group grid items-baseline gap-4 border-t border-border/70 py-10 transition-colors duration-500 hover:border-dourado/60 md:grid-cols-12 md:gap-10 md:py-14"
            >
              <span className="font-serif text-lg text-dourado/70 transition-colors group-hover:text-dourado md:col-span-2">
                {p.n}
              </span>
              <h3 className="font-serif text-3xl font-light text-marfim md:col-span-4 md:text-4xl">
                {p.titulo}
              </h3>
              <p className="max-w-lg text-sm leading-loose text-marfim/65 md:col-span-6">
                {p.texto}
              </p>
            </article>
          ))}
          <div className="border-t border-border/70" />
        </div>
      </div>
    </section>
  );
}
