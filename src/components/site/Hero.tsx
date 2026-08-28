import { Line } from "./Lines";

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden pb-10"
    >
      {/* Vinheta sobre a parede bordô da cena 3D */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(110% 75% at 22% 34%, rgba(13,13,13,0.1) 0%, rgba(13,13,13,0.74) 58%, rgba(13,13,13,0.94) 100%), linear-gradient(to bottom, transparent 45%, #0D0D0D 100%)",
        }}
      />
      <div aria-hidden className="grain-layer" />

      <div className="relative mx-auto w-full max-w-[1440px] grow px-6 pt-32 md:px-12">
        <div className="grid h-full grid-cols-12 items-end gap-y-12">
          <div className="col-span-12 lg:col-span-8">
            <div className="flex items-center gap-4">
              <span className="h-px w-10 bg-dourado" />
              <span className="label-mono text-dourado">Brasília · Agência boutique</span>
            </div>

            <h1
              data-lines
              className="display mt-8 text-marfim"
              style={{ textWrap: "balance" }}
            >
              <Line>Criamos</Line>
              <Line>
                <em className="pr-2 italic text-dourado">presença</em>
              </Line>
              <Line>
                <span className="text-marfim/45">você deixa legado.</span>
              </Line>
            </h1>
          </div>

          <div
            data-reveal
            className="col-span-12 flex flex-col gap-9 md:col-span-8 lg:col-span-6"
          >

            <p className="reveal-item lead border-l border-dourado/30 pl-6 text-marfim/70">
              Estratégia, design e conteúdo para marcas que não competem por atenção — competem
              por permanência.
            </p>

            <div className="reveal-item flex flex-wrap items-center gap-x-8 gap-y-4">
              <a
                href="#contato"
                className="group relative inline-flex items-center gap-4 overflow-hidden border border-dourado/60 px-8 py-4"
              >
                <span className="absolute inset-0 -translate-y-full bg-dourado transition-transform duration-500 ease-out group-hover:translate-y-0" />
                <span className="label-mono relative text-marfim transition-colors duration-500 group-hover:text-preto">
                  Iniciar projeto
                </span>
                <span className="relative text-dourado transition-colors duration-500 group-hover:text-preto">
                  ✦
                </span>
              </a>
              <a
                href="#portfolio"
                className="label-mono text-marfim/60 underline decoration-dourado/40 decoration-1 underline-offset-8 transition-colors hover:text-dourado"
              >
                Ver trabalhos
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Régua de prova social */}
      <div className="relative mx-auto mt-16 w-full max-w-[1440px] px-6 md:px-12">
        <div className="rule-gold w-full" />
        <dl className="grid grid-cols-2 gap-y-8 pt-7 md:grid-cols-4">
          {[
            { k: "Marcas atendidas", v: "40", suf: "+" },
            { k: "Anos de estrada", v: "9", suf: "" },
            { k: "Projetos por trimestre", v: "4", suf: " no máx." },
            { k: "Cidades", v: "12", suf: "" },
          ].map((s) => (
            <div key={s.k} className="min-w-0">
              <dd className="font-serif text-4xl font-light text-marfim md:text-5xl">
                <span data-counter={s.v}>0</span>
                <span className="text-dourado">{s.suf}</span>
              </dd>
              <dt className="caption mt-2">{s.k}</dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
