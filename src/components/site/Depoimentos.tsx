const DEPOIMENTOS = [
  {
    texto:
      "Chegamos pedindo um logo. Saímos com uma marca que finalmente parece do tamanho do nosso trabalho.",
    nome: "Helena Bramante",
    cargo: "Sócia-fundadora, Casa Bramante",
  },
  {
    texto:
      "A Vittori decidiu com a gente o que não fazer. Isso mudou o negócio mais do que qualquer campanha.",
    nome: "Rodrigo Serrano",
    cargo: "Diretor, Instituto Serrano",
  },
];

export function Depoimentos() {
  return (
    <section
      className="relative overflow-hidden border-t border-border/40 py-24 md:py-36"
      style={{ background: "linear-gradient(180deg, #281C15 0%, #17100C 100%)" }}
    >
      <div aria-hidden className="grain-layer opacity-[0.08]" />
      <div className="relative mx-auto max-w-[1440px] px-6 md:px-12">
        <p className="label-mono mb-14 text-dourado">06 · Quem já assinou com a gente</p>
        <div data-reveal className="grid gap-14 md:grid-cols-2 md:gap-20">
          {DEPOIMENTOS.map((d) => (
            <figure key={d.nome} className="reveal-item">
              <span aria-hidden className="block font-serif text-7xl leading-none text-dourado/25">
                “
              </span>
              <blockquote className="-mt-6 font-serif text-[clamp(1.4rem,2.4vw,2.2rem)] leading-[1.25] font-light text-marfim/90">
                {d.texto}
              </blockquote>
              <figcaption className="mt-8 flex items-center gap-4">
                <span className="h-px w-8 bg-dourado/60" />
                <span className="caption text-marfim/70">
                  {d.nome} · {d.cargo}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
