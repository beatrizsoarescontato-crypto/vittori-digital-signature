import { Line } from "@/components/site/Lines";
import { Btn } from "@/components/site/ui";

export function Abertura() {
  return (
    <section id="top" className="relative flex min-h-[100svh] items-end overflow-hidden pb-16 pt-36 md:pb-20">
      <div aria-hidden className="vignette pointer-events-none absolute inset-0 z-0" />

      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 md:px-12">
        <div className="max-w-3xl">
          <p data-reveal className="mb-6">
            <span className="reveal-item label-mono inline-flex items-center gap-3 text-dourado">
              <span>✦</span> Vittori Creative House · Brasília
            </span>
          </p>
          <h1 data-lines className="title-1 text-marfim">
            <Line>
              Criamos <em className="italic text-dourado">presença.</em>
            </Line>
          </h1>
          <div data-reveal className="mt-6 max-w-xl">
            <p className="reveal-item text-base leading-relaxed text-marfim/90 md:text-lg">
              Social media, tráfego pago, audiovisual, sites e inteligência artificial para negócios
              que querem ser escolhidos pela qualidade.
            </p>
            <div className="reveal-item mt-8 flex flex-col gap-4 sm:flex-row">
              <Btn to="/comece">Quero uma conversa</Btn>
              <Btn to="/" hash="servicos" variant="ghost">
                Ver serviços
              </Btn>
            </div>
          </div>
        </div>
        <p aria-hidden className="label-mono absolute bottom-0 right-6 hidden items-center gap-3 text-dourado md:right-12 md:flex">
          Role para mergulhar <span className="scroll-cue inline-block">↓</span>
        </p>
      </div>
    </section>
  );
}

export function Resolve() {
  const linhas = [
    "Um Instagram que parece do tamanho do seu trabalho.",
    "Campanhas orientadas a oportunidades reais de negócio.",
    "Atendimento e números organizados para você decidir com clareza.",
  ];
  return (
    <section data-stage-section="wide" className="relative section-seam py-28 md:py-40 reading-veil">
      <div className="mx-auto grid max-w-[1440px] gap-16 px-6 md:grid-cols-12 md:px-12">
        <h2 data-lines className="title-2 text-marfim md:col-span-6">
          <Line>Você é bom no que faz.</Line>
          <Line>
            <em className="italic text-dourado">Sua marca precisa</em>
          </Line>
          <Line>
            <em className="italic text-dourado">mostrar isso.</em>
          </Line>
        </h2>
        <ul data-reveal className="md:col-span-5 md:col-start-8">
          {linhas.map((l, i) => (
            <li key={l} className="reveal-item flex gap-6 border-t border-border/60 py-8">
              <span className="label-mono pt-2 text-dourado/70">0{i + 1}</span>
              <span className="font-serif text-2xl font-light leading-snug text-marfim md:text-3xl">{l}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
