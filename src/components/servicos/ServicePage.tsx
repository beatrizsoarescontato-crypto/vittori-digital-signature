import type { ReactNode } from "react";
import type { Linha } from "@/content/servicos";
import { Line } from "@/components/site/Lines";
import { Btn, Faq } from "@/components/site/ui";

export function PageHero({ eyebrow, titulo, texto, children }: { eyebrow: string; titulo: string; texto: string; children?: ReactNode }) {
  return (
    <section className="relative border-b border-border/50 pb-24 pt-40 md:pb-32 md:pt-52">
      <div className="mx-auto max-w-[1440px] px-6 md:px-12">
        <p className="label-mono mb-8 text-dourado">✦ {eyebrow}</p>
        <h1 data-lines className="title-1 max-w-5xl text-marfim">
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

export function Bloco({ eyebrow, titulo, children, tom = "preto" }: { eyebrow?: string | undefined; titulo: string; children: ReactNode; tom?: "preto" | "marrom" | "bordo" }) {
  const bg = { preto: "bg-preto/45", marrom: "bg-marrom/55", bordo: "bg-bordo-dark/65" }[tom];
  return (
    <section className={`border-b border-border/50 py-24 md:py-32 ${bg}`}>
      <div className="mx-auto grid max-w-[1440px] gap-12 px-6 md:grid-cols-12 md:px-12">
        <div className="md:col-span-4">
          {eyebrow && <p className="label-mono mb-5 text-dourado">{eyebrow}</p>}
          <h2 className="font-serif text-4xl font-light leading-tight text-marfim md:text-5xl">{titulo}</h2>
        </div>
        <div data-reveal className="md:col-span-7 md:col-start-6">{children}</div>
      </div>
    </section>
  );
}

export function Lista({ itens }: { itens: string[] }) {
  return (
    <ul>
      {itens.map((i) => (
        <li key={i} className="reveal-item flex gap-4 border-t border-border/60 py-4 text-sm leading-relaxed text-marfim/85">
          <span className="text-dourado/70">✦</span>
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
          <p className="mt-3 text-sm leading-loose text-marfim/80">{p}</p>
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
        <Bloco key={b.titulo + i} eyebrow={b.eyebrow} titulo={b.titulo} tom={i % 2 ? "preto" : "marrom"}>
          {b.texto && <p className="reveal-item measure mb-8 text-sm font-normal leading-loose text-marfim/90">{b.texto}</p>}
          {b.lista && <Lista itens={b.lista} />}
          {b.para && (
            <p className="reveal-item mt-8 text-sm font-normal leading-loose text-marfim/85">
              <span className="label-mono mr-3 text-dourado">Para</span>
              {b.para}
            </p>
          )}
        </Bloco>
      ))}

      {l.cards && (
        <section className="border-b border-border/50 bg-bordo-dark/65 py-24 md:py-32">
          <div className="mx-auto max-w-[1440px] px-6 md:px-12">
            <h2 className="title-2 max-w-3xl text-marfim">{l.cards.titulo}</h2>
            <p className="measure mt-8 text-sm leading-loose text-marfim/90">{l.cards.texto}</p>
            <div data-reveal className={`mt-16 grid gap-px bg-marfim/10 sm:grid-cols-2 ${l.cards.itens.length === 4 ? "lg:grid-cols-4" : "lg:grid-cols-5"}`}>
              {l.cards.itens.map((c) => (
                <div key={c.titulo} className="reveal-item bg-bordo-dark/80 p-7">
                  <h3 className="font-serif text-2xl text-dourado">{c.titulo}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-marfim/90">{c.texto}</p>
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
        <Bloco titulo={l.slug === "digital" ? "Opções" : "Planos"}>
          <ul>
            {l.planos.map((p) => (
              <li key={p.nome} className="reveal-item grid gap-2 border-t border-border/60 py-6 md:grid-cols-2">
                <span className="font-serif text-3xl font-light text-marfim">{p.nome}</span>
                {p.detalhe && <span className="text-sm font-normal leading-relaxed text-marfim/85">{p.detalhe}</span>}
              </li>
            ))}
          </ul>
        </Bloco>
      )}

      {l.comoFunciona && (
        <Bloco titulo="Como funciona" tom="marrom">
          <Passos itens={l.comoFunciona} />
        </Bloco>
      )}

      {(l.paraQuem || l.paraQuemNao) && (
        <section className="border-b border-border/50 py-24 md:py-32">
          <div data-reveal className="mx-auto grid max-w-[1440px] gap-16 px-6 md:grid-cols-2 md:px-12">
            {l.paraQuem && (
              <div className="reveal-item">
                <p className="label-mono mb-6 text-dourado">Para quem é</p>
                <p className="font-serif text-2xl font-light leading-snug text-marfim md:text-3xl">{l.paraQuem}</p>
              </div>
            )}
            {l.paraQuemNao && (
              <div className="reveal-item">
                <p className="label-mono mb-6 text-marfim/80">Para quem não é</p>
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
        <Bloco titulo="Perguntas frequentes">
          <Faq itens={l.faq} />
        </Bloco>
      )}

      <section className="bg-bordo/85 py-28 md:py-36">
        <div className="mx-auto max-w-[1440px] px-6 md:px-12">
          <h2 className="title-2 max-w-3xl text-marfim">Conte o que você está construindo.</h2>
          <div className="mt-12">
            <Btn to="/comece" variant="light">{l.cta ?? "Agendar uma conversa"}</Btn>
          </div>
        </div>
      </section>
    </>
  );
}
