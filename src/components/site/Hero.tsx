import { ClientHeroCanvas } from "../ClientCanvas";

export function Hero() {
  return (
    <section id="top" className="relative flex min-h-[100svh] items-center overflow-hidden">
      <div className="absolute inset-0 opacity-90">
        <ClientHeroCanvas />
      </div>
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 80% at 20% 30%, transparent 20%, rgba(13,13,13,0.82) 70%), linear-gradient(to bottom, transparent 55%, #0D0D0D 100%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-[1400px] px-6 pt-28 md:px-12">
        <span className="eyebrow block">Brasília ✦ Estratégia, Design e Conteúdo</span>
        <h1 className="mt-8 max-w-4xl font-serif text-[clamp(2.9rem,8.5vw,7.5rem)] leading-[0.94] font-light tracking-[-0.01em] text-marfim">
          Criamos <em className="text-dourado not-italic italic">presença</em>.
          <br />
          Você deixa <em className="italic text-dourado">legado</em>.
        </h1>
        <p className="mt-10 max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">
          Vittori é mais que uma agência. É uma assinatura — construída em estratégia,
          desenhada com intenção, sustentada por presença.
        </p>
        <div className="mt-12 flex flex-wrap items-center gap-8">
          <a
            href="#contato"
            className="group relative inline-flex items-center gap-4 border border-dourado/50 px-8 py-4 transition-colors duration-500 hover:border-dourado"
          >
            <span className="eyebrow text-marfim transition-colors group-hover:text-dourado">
              Iniciar conversa
            </span>
            <span className="h-px w-8 bg-dourado transition-all duration-500 group-hover:w-12" />
          </a>
          <a
            href="#portfolio"
            className="eyebrow text-muted-foreground transition-colors hover:text-dourado"
          >
            Ver trabalhos
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 md:flex">
        <span className="text-[0.6rem] tracking-[0.4em] text-muted-foreground uppercase">
          Role
        </span>
        <span className="h-14 w-px bg-gradient-to-b from-dourado to-transparent" />
      </div>
    </section>
  );
}
