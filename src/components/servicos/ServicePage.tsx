import type { ReactNode } from "react";
import type { Linha } from "@/content/servicos";
import { Line } from "@/components/site/Lines";
import { Check, Crown, Gem, Layers, Sparkles, Star } from "lucide-react";
import { Btn, Faq } from "@/components/site/ui";
import { VoltarContexto } from "@/components/site/Navegacao";
import { whatsappLink } from "@/lib/contato";

const PLANO_ICONES = [Star, Layers, Gem, Crown];

export function PageHero({ eyebrow, titulo, texto, children }: { eyebrow: string; titulo: string; texto: string; children?: ReactNode }) {
  return (
    <section data-stage-section="left" className="internal-page relative reading-veil pb-24 pt-28 md:pb-32 md:pt-32">
      <div data-stage-zone="reading" className="mx-auto max-w-[1440px] px-6 md:px-12">
        <VoltarContexto />
        <p className="t-label mb-8">✦ {eyebrow}</p>
        <h1 data-lines className="internal-title max-w-5xl text-marfim">
          <Line>{titulo}</Line>
        </h1>
        <p data-reveal className="mt-10 max-w-2xl">
          <span className="reveal-item block text-base font-normal leading-loose text-marfim/90 md:text-lg">{texto}</span>
        </p>
        {children && <div className="mt-12 flex flex-col gap-4 sm:flex-row">{children}</div>}
      </div>
    </section>
  );
}

export function Bloco({ eyebrow, titulo, children, tom = "preto", layout = "lista", id }: { eyebrow?: string | undefined; titulo: string; children: ReactNode; tom?: "preto" | "marrom" | "bordo"; layout?: "explicacao" | "lista" | "comparativo" | "faq" | "demo"; id?: string }) {
  const bg = { preto: "", marrom: "", bordo: "finale-glow" }[tom];
  const lateral = layout === "explicacao" || layout === "demo";
  return (
    <section id={id} data-stage-section="wide" className={`internal-page relative section-seam reading-veil py-20 md:py-24 ${bg}`}>
      <div className={`mx-auto grid max-w-[1440px] gap-10 px-6 md:px-12 ${lateral ? "lg:grid-cols-12" : ""}`}>
        <div data-stage-zone="reading" className={lateral ? "lg:col-span-4" : "max-w-4xl"}>
          {eyebrow && <p className="t-label mb-5">{eyebrow}</p>}
          <h2 className="font-serif text-4xl font-light leading-tight text-marfim md:text-5xl">{titulo}</h2>
        </div>
        <div data-stage-zone={layout === "demo" ? "demo" : "reading"} data-reveal className={`min-w-0 ${lateral ? "lg:col-span-7 lg:col-start-6" : layout === "faq" ? "max-w-4xl" : layout === "comparativo" ? "grid gap-8 md:grid-cols-2" : "max-w-5xl"}`}>{children}</div>
      </div>
    </section>
  );
}

export function Lista({ itens }: { itens: string[] }) {
  return (
    <ul>
      {itens.map((i) => (
        <li key={i} className="reveal-item t-body flex gap-4 border-t border-border/60 py-4">
          <Check aria-hidden="true" className="mt-1.5 size-4 shrink-0 text-dourado" strokeWidth={1.5} />
          {i}
        </li>
      ))}
    </ul>
  );
}

export function Passos({ itens }: { itens: string[] }) {
  return (
    <ol className="relative grid gap-8 md:grid-cols-2">
      {itens.map((p, i) => (
        <li key={p} className="reveal-item border-l border-dourado/40 pl-6">
          <span className="font-serif text-4xl font-light text-dourado">0{i + 1}</span>
          <p className="t-body mt-3">{p}</p>
        </li>
      ))}
    </ol>
  );
}

export function ServicePage({ l }: { l: Linha }) {
  return (
    <>
      <PageHero eyebrow={l.linha} titulo={l.titulo} texto={l.descricao}>
        <Btn to="/comece">{l.cta ?? "Agendar uma conversa"}</Btn>
      </PageHero>

      {l.muda && (
        <Bloco titulo="O que muda para você" tom="marrom">
          <ul>
            {l.muda.map((m) => (
              <li key={m} className="reveal-item border-t border-border/60 py-6 font-serif text-2xl font-light text-marfim md:text-3xl">
                {m}
              </li>
            ))}
          </ul>
        </Bloco>
      )}

      {l.incluso && (
        <Bloco titulo="O que está incluso">
          <Lista itens={l.incluso} />
        </Bloco>
      )}

      {l.blocos?.map((b, i) => (
        <Bloco key={b.titulo + i} eyebrow={b.eyebrow} titulo={b.titulo} layout={b.lista ? "lista" : "explicacao"} tom={i % 2 ? "preto" : "marrom"}>
          {b.texto && <p className="reveal-item measure t-body mb-8">{b.texto}</p>}
          {b.lista && <Lista itens={b.lista} />}
          {b.para && (
            <p className="reveal-item t-body mt-8">
              <span className="t-label mr-3">Para</span>
              {b.para}
            </p>
          )}
        </Bloco>
      ))}

      {l.cards && (
        <section data-stage-section="wide" className="internal-page relative section-seam reading-veil finale-glow py-24 md:py-32">
          <div data-stage-zone="reading" className="mx-auto max-w-[1440px] px-6 md:px-12">
            <h2 className="title-2 max-w-3xl text-marfim">{l.cards.titulo}</h2>
            <p className="measure t-body mt-8">{l.cards.texto}</p>
            <div data-reveal className={`mt-16 grid gap-4 sm:grid-cols-2 ${l.cards.itens.length === 4 ? "lg:grid-cols-4" : "lg:grid-cols-5"}`}>
              {l.cards.itens.map((c) => (
                <div key={c.titulo} className="reveal-item glass glow-edge p-7">
                  <h3 className="t-title !text-2xl text-dourado-claro">{c.titulo}</h3>
                  <p className="t-meta mt-4">{c.texto}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {l.extra && (
        <Bloco eyebrow={l.extra.eyebrow} titulo={l.extra.titulo} tom="marrom">
          {l.extra.lista && <Lista itens={l.extra.lista} />}
          {l.extra.texto && <p className="reveal-item mt-8 font-serif text-xl italic text-marfim/80">{l.extra.texto}</p>}
        </Bloco>
      )}

      {l.planos && (
        <section data-stage-section="wide" className="internal-page reading-veil section-seam py-20 md:py-24">
          <div data-stage-zone="reading" className="mx-auto max-w-[1440px] px-6 md:px-12">
          <h2 className="internal-title mb-12">{l.slug === "digital" ? "Opções" : "Planos"}</h2>
          <ul data-reveal className={`grid items-stretch gap-6 ${l.planos.length === 3 ? "lg:grid-cols-3" : "lg:grid-cols-2"}`}>
            {l.planos.map((p, i) => {
              const Icon = PLANO_ICONES[i % PLANO_ICONES.length] ?? Sparkles;
              return (
                <li key={p.nome} className="plan-option reveal-item flex min-w-0 flex-col items-start gap-5 border-t border-dourado/40 px-2 py-8">
                  <span className="flex size-12 items-center justify-center rounded-full border border-dourado/35"><Icon aria-hidden="true" className="size-5 text-dourado" strokeWidth={1.25} /></span>
                  <h3 className="font-serif text-3xl font-medium text-marfim">{p.nome}</h3>
                  {p.detalhe && <p className="t-body">{p.detalhe}</p>}
                  <div className="mt-auto pt-6">
                    {l.slug === "digital" && p.nome === "Sistemas e apps" ? <Btn to="/servicos/inteligencia" variant="link">Ver Vittori Inteligência</Btn> : <Btn href={whatsappLink(`Olá! Vim pelo site da Vittori e quero conversar sobre ${l.linha}, opção ${p.nome}.`)} variant="link">Conversar sobre {p.nome}</Btn>}
                  </div>
                </li>
              );
            })}
          </ul>
          </div>
        </section>
      )}

      {l.comoFunciona && (
        <Bloco titulo="Como funciona" tom="marrom">
          <Passos itens={l.comoFunciona} />
        </Bloco>
      )}

      {(l.paraQuem || l.paraQuemNao) && (
        <section data-stage-section="wide" className="internal-page relative section-seam reading-veil py-24 md:py-32">
          <div data-stage-zone="reading" data-reveal className="mx-auto grid max-w-[1440px] gap-16 px-6 md:grid-cols-2 md:px-12">
            {l.paraQuem && (
              <div className="reveal-item">
                <p className="t-label mb-6">Para quem é</p>
                <p className="font-serif text-2xl font-light leading-snug text-marfim md:text-3xl">{l.paraQuem}</p>
              </div>
            )}
            {l.paraQuemNao && (
              <div className="reveal-item">
                <p className="t-label mb-6 !text-marfim/85">Para quem não é</p>
                <p className="font-serif text-2xl font-light leading-snug text-marfim/90 md:text-3xl">{l.paraQuemNao}</p>
              </div>
            )}
          </div>
          {l.apoio && (
            <p className="mx-auto mt-16 max-w-[1440px] px-6 font-serif text-xl italic text-dourado md:px-12">{l.apoio}</p>
          )}
        </section>
      )}

      {l.faq.length > 0 && (
        <Bloco titulo="Perguntas frequentes" layout="faq">
          <Faq itens={l.faq} />
        </Bloco>
      )}

      <section data-stage-section="wide" className="internal-page relative section-seam reading-veil finale-glow py-28 md:py-36">
        <div data-stage-zone="reading" className="mx-auto max-w-[1440px] px-6 md:px-12">
          <h2 className="title-2 max-w-3xl text-marfim">Conte o que você está construindo.</h2>
          <div className="mt-12">
            <Btn to="/comece">{l.cta ?? "Agendar uma conversa"}</Btn>
          </div>
        </div>
      </section>
    </>
  );
}
