import { Line } from "./Lines";

export function Sobre() {
  return (
    <section
      id="sobre"
      className="relative overflow-hidden border-t border-border/50 py-28 md:py-44"
    >
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{ background: "linear-gradient(180deg, rgba(13,13,13,0.94) 0%, rgba(40,28,21,0.9) 100%)" }}
      />
      <span
        data-watermark
        aria-hidden
        className="pointer-events-none absolute -right-16 top-1/2 -translate-y-1/2 font-serif text-[52vw] leading-none font-semibold text-dourado opacity-[0.04] select-none md:text-[30vw]"
      >
        V
      </span>

      <div className="relative mx-auto max-w-[1440px] px-6 md:px-12">
        <div className="grid grid-cols-12 gap-y-14">
          <div data-reveal className="col-span-12 md:col-span-3">
            <p className="reveal-item font-serif text-6xl font-light text-marfim/12 md:text-7xl">
              01
            </p>
            <p className="reveal-item label-mono mt-4 text-dourado">Manifesto</p>
          </div>

          <div className="col-span-12 md:col-span-9 md:pl-6 lg:pl-16">
            <h2 data-lines className="title-1 text-marfim">
              <Line>Uma assinatura,</Line>
              <Line>
                <span className="text-marfim/40">não uma agência.</span>
              </Line>
            </h2>

            <div data-reveal className="mt-16 grid gap-x-16 gap-y-10 md:grid-cols-2">
              <p className="reveal-item measure text-sm leading-loose text-marfim/75">
                Nascemos em Brasília, entre concreto e luz. Cada projeto começa em silêncio:
                escuta, contexto, ambição. Só depois vem a forma — e ela vem com critério.
              </p>
              <p className="reveal-item measure text-sm leading-loose text-marfim/55">
                Trabalhamos em camadas. Estratégia sustenta, design traduz, conteúdo conduz. O
                resultado não é um pacote de entregáveis: é a sensação de que a marca sempre foi
                assim.
              </p>
            </div>

            <figure data-reveal className="mt-20 border-t border-dourado/25 pt-10">
              <blockquote className="reveal-item font-serif text-[clamp(1.6rem,3vw,2.9rem)] leading-[1.15] font-light text-dourado-claro">
                <span className="mr-3 text-dourado/50">✦</span>
                Presença não se compra. Se constrói — com decisão, repetição e bom gosto.
              </blockquote>
              <figcaption className="reveal-item caption mt-6">
                Vittori Creative House · princípio fundador
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
