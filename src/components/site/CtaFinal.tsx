import atmosfera from "@/assets/atmosphere.jpg";

export function CtaFinal() {
  return (
    <section
      id="contato"
      className="relative isolate overflow-hidden border-t border-border/60 py-32 md:py-48"
      style={{ background: "linear-gradient(160deg, #5C0A12 0%, #281C15 60%, #0D0D0D 100%)" }}
    >
      <img
        src={atmosfera}
        alt=""
        aria-hidden
        loading="lazy"
        width={1600}
        height={1008}
        data-parallax="70"
        className="absolute inset-0 -z-10 h-[130%] w-full object-cover opacity-25 mix-blend-soft-light"
      />

      <div data-reveal className="mx-auto max-w-[1400px] px-6 md:px-12">
        <span className="reveal-item eyebrow block">Brasília ✦ Atendimento nacional</span>
        <h2 className="reveal-item mt-8 max-w-4xl font-serif text-[clamp(2.4rem,6.5vw,6rem)] leading-[0.98] font-light text-marfim">
          Pronto para <em className="italic text-dourado-claro">criar presença</em>?
        </h2>
        <p className="reveal-item mt-10 max-w-md text-sm leading-loose text-marfim/70">
          Atendemos poucos projetos por trimestre, para que cada um receba profundidade real.
          Conte o que está construindo.
        </p>

        <div className="reveal-item mt-14 flex flex-col gap-8 md:flex-row md:items-center md:gap-14">
          <a
            href="mailto:contato@vittori.house"
            className="group inline-flex items-center gap-5 border border-dourado/60 px-9 py-5 transition-colors duration-500 hover:bg-dourado"
          >
            <span className="eyebrow text-marfim transition-colors group-hover:text-preto">
              contato@vittori.house
            </span>
          </a>
          <a
            href="https://wa.me/5561999999999"
            className="eyebrow text-marfim/70 transition-colors hover:text-dourado"
          >
            WhatsApp — +55 61 99999-9999
          </a>
        </div>
      </div>
    </section>
  );
}
