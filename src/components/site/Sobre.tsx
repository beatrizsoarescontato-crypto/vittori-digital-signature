export function Sobre() {
  return (
    <section
      id="sobre"
      className="relative overflow-hidden border-t border-border/60 py-32 md:py-48"
      style={{ background: "linear-gradient(180deg, #0D0D0D 0%, #281C15 100%)" }}
    >
      <span
        data-watermark
        aria-hidden
        className="pointer-events-none absolute -right-10 top-1/2 -translate-y-1/2 font-serif text-[46vw] leading-none font-semibold text-dourado opacity-[0.05] select-none md:text-[34vw]"
      >
        V
      </span>

      <div
        data-reveal
        className="relative mx-auto grid max-w-[1400px] gap-16 px-6 md:grid-cols-12 md:px-12"
      >
        <div className="reveal-item md:col-span-4">
          <span className="eyebrow">✦ Manifesto</span>
          <div className="rule-gold mt-6 w-20" />
        </div>

        <div className="md:col-span-8 md:pl-8">
          <h2 className="reveal-item font-serif text-[clamp(2.2rem,5vw,4.4rem)] leading-[1.02] font-light text-marfim">
            Uma <em className="italic text-dourado">assinatura</em>,
            <br />
            não uma agência
          </h2>
          <div className="mt-12 grid gap-10 md:grid-cols-2">
            <p className="reveal-item text-sm leading-loose text-marfim/80">
              Nascemos em Brasília para atender marcas que não competem por atenção — competem
              por permanência. Cada projeto começa em silêncio: escuta, contexto, ambição.
              Depois vem a forma.
            </p>
            <p className="reveal-item text-sm leading-loose text-muted-foreground">
              Trabalhamos em camadas: estratégia que sustenta, design que traduz, conteúdo que
              conduz. O resultado não é um pacote de entregáveis, é a sensação de que a marca
              sempre foi assim.
            </p>
          </div>
          <p className="reveal-item mt-16 max-w-xl font-serif text-2xl leading-snug font-light text-dourado-claro md:text-3xl">
            “Presença não se compra. Se constrói — com decisão, repetição e bom gosto.”
          </p>
        </div>
      </div>
    </section>
  );
}
