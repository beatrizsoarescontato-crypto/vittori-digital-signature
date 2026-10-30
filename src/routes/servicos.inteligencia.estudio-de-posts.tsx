import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";
import { Bloco, Passos, PageHero } from "@/components/servicos/ServicePage";
import { Calculadora, fmt } from "@/components/servicos/Calculadora";
import { Btn, Faq } from "@/components/site/ui";
import { henriqueLink } from "@/lib/contato";

const T = "Estúdio de Posts Modelados · Vittori Inteligência";
const D =
  "Pegamos a estrutura dos posts que mais dão resultado no seu mercado, aqui e lá fora, e refazemos com a sua marca, os seus textos e os seus exemplos.";

export const Route = createFileRoute("/servicos/inteligencia/estudio-de-posts")({
  head: () => ({
    meta: [
      { title: T },
      { name: "description", content: D },
      { property: "og:title", content: T },
      { property: "og:description", content: D },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <SiteShell>
      <PageHero eyebrow="Estúdio de Posts Modelados" titulo="O que já funciona, com a cara da sua marca." texto={D}>
        <Btn href={henriqueLink("Estúdio de Posts")}>Falar com o Henrique</Btn>
      </PageHero>

      <section data-stage-section="wide" className="internal-page reading-veil border-b border-border/50 py-24 md:py-32">
        <ul data-stage-zone="reading" data-reveal className="mx-auto max-w-[1440px] px-6 md:px-12">
          {[
            "Você posta, mas não sabe o que funciona.",
            "Criar do zero toda semana cansa e sai genérico.",
            "Comentário vira curtida, não vira contato.",
          ].map((d) => (
            <li key={d} className="reveal-item border-t border-border/60 py-8 font-serif text-2xl font-light text-marfim md:text-4xl">
              {d}
            </li>
          ))}
        </ul>
      </section>

      <Bloco titulo="Como funciona">
        <Passos
          itens={[
            "Garimpamos os formatos que mais performam no seu nicho.",
            "Refazemos na sua identidade, com os seus argumentos.",
            "Você aprova. Nada vai ao ar sem você.",
            "Medimos em 7 dias e repetimos o que deu certo.",
          ]}
        />
      </Bloco>

      <section data-stage-section="wide" className="internal-page reading-veil border-b border-border/50 py-24 md:py-32">
        <div data-stage-zone="reading" className="mx-auto max-w-[1440px] px-6 md:px-12">
          <h2 className="title-2 text-marfim">
            Modelar <em className="italic text-dourado">não é copiar.</em>
          </h2>
          <p className="measure mt-8 text-base leading-loose text-marfim/80">
            Usamos a estrutura que provou resultado. Arte, texto e exemplos são seus.
          </p>
        </div>
      </section>

      <section data-stage-section="wide" className="internal-page reading-veil border-b border-border/50 py-24 md:py-32">
        <div data-stage-zone="reading" className="mx-auto grid max-w-[1440px] gap-12 px-6 md:px-12 lg:grid-cols-2">
          <div>
            <p className="t-label mb-6 text-dourado">Comente e receba</p>
            <p className="font-serif text-3xl font-light leading-snug text-marfim">
              Quem comenta a palavra-chave recebe o material no direct na hora e vira contato.
            </p>
          </div>
          <Calculadora
            titulo="Comentários que viram conversa"
            campos={[
              { id: "c", label: "Comentários por post", inicial: 30 },
              { id: "p", label: "Posts por mês", inicial: 8 },
              { id: "x", label: "% que vira conversa", inicial: 40 },
            ]}
            resultado={(v) => (
              <p>
                Cerca de <span className="text-dourado">{fmt(v.c * v.p * (v.x / 100))}</span> conversas
                novas por mês a partir dos comentários.
              </p>
            )}
          />
        </div>
      </section>

      <Bloco titulo="Modos" tom="marrom">
        <ul>
          {[
            ["Peça", ""],
            ["Lote", ""],
            ["Mensal", "12 peças + automação + medição"],
          ].map(([n, d]) => (
            <li key={n} className="reveal-item grid gap-2 border-t border-border/60 py-6 md:grid-cols-2">
              <span className="font-serif text-3xl font-light text-marfim">{n}</span>
              {d && <span className="text-sm text-marfim/65">{d}</span>}
            </li>
          ))}
        </ul>
      </Bloco>

      <Bloco titulo="Perguntas frequentes" layout="faq">
        <Faq
          itens={[
            { q: "Vocês publicam?", a: "O Estúdio entrega as peças prontas. A publicação e a gestão do perfil fazem parte da Vittori Presença." },
            { q: "A automação é permitida pelo Instagram?", a: "Usamos ferramentas compatíveis com as regras da Meta." },
            { q: "Em quanto tempo recebo?", a: "Peça em até 7 dias úteis, lote em até 10." },
          ]}
        />
      </Bloco>

      <section data-stage-section="wide" className="internal-page reading-veil finale-glow py-28 md:py-36">
        <div data-stage-zone="reading" className="mx-auto max-w-[1440px] px-6 md:px-12">
          <h2 className="title-2 max-w-3xl text-marfim">Quer ver com o jeito do seu negócio?</h2>
          <div className="mt-12">
            <Btn
              href={henriqueLink(undefined, "Olá, Henrique! Vim pelo site da Vittori e quero posts que funcionam.")}
              variant="light"
            >
              Quero posts que funcionam
            </Btn>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
