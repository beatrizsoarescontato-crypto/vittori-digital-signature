import { Line } from "@/components/site/Lines";
import { Btn } from "@/components/site/ui";
import { whatsappLink } from "@/lib/contato";

export function Abertura() {
  return (
    <section id="top" className="relative flex min-h-[100svh] items-end overflow-hidden pb-16 pt-36 md:pb-32">
      <div aria-hidden className="vignette pointer-events-none absolute inset-0 z-0" />

      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 md:px-12">
        <div className="max-w-3xl">
          <p data-reveal className="mb-6">
            <span className="reveal-item t-label inline-flex items-center gap-3">
              <span>✦</span> Vittori Creative House
            </span>
          </p>
          <h1 data-lines className="title-1 text-marfim">
            <Line>
              Criamos <em className="italic text-dourado">presença.</em>
            </Line>
          </h1>
          <div data-reveal className="mt-6 max-w-xl">
            <p className="reveal-item text-base leading-relaxed text-marfim/90 md:text-lg">
              Estratégia, conteúdo, audiovisual, performance e tecnologia para marcas que querem comunicar seu valor com clareza, consistência e personalidade.
            </p>
            <div className="reveal-item mt-8 flex flex-col gap-4 sm:flex-row">
              <Btn href={whatsappLink()}>Conversar sobre meu projeto</Btn>
              <Btn to="/" hash="servicos" variant="secondary">
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
  return (
    <section data-stage-section="left" className="relative section-seam reading-veil py-16 md:py-24">
      <div className="mx-auto grid max-w-[1440px] items-center gap-8 px-6 md:grid-cols-12 md:gap-12 md:px-12">
        <h2 data-lines className="title-2 text-marfim md:col-span-7">
          <Line>Você sabe o valor do seu trabalho.</Line>
          <Line><em className="italic text-dourado">Sua marca precisa mostrar isso.</em></Line>
        </h2>
        <p className="t-body max-w-prose md:col-span-5">Não basta estar nas redes. É preciso transmitir confiança, comunicar com clareza e construir uma presença que faça sentido para quem você quer alcançar.</p>
      </div>
    </section>
  );
}
