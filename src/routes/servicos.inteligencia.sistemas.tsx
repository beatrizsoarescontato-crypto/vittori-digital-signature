import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";
import { Bloco, Lista, Passos, PageHero } from "@/components/servicos/ServicePage";
import { Calculadora, brl, fmt } from "@/components/servicos/Calculadora";
import { Btn, Faq } from "@/components/site/ui";
import { henriqueLink } from "@/lib/contato";

const T = "Sistemas e Painéis · Vittori Inteligência";
const D =
  "Juntamos o que está espalhado em planilhas, CRM, anúncios, loja e sistema de gestão num painel feito para o seu negócio. Atualiza sozinho.";

export const Route = createFileRoute("/servicos/inteligencia/sistemas")({
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
      <PageHero eyebrow="Sistemas e Painéis" titulo="Os números da sua empresa num lugar só." texto={D}>
        <Btn href={henriqueLink("Sistemas e Painéis")}>Falar com o Henrique</Btn>
      </PageHero>

      <section className="border-b border-border/50 bg-marrom py-24 md:py-32">
        <ul data-reveal className="mx-auto max-w-[1440px] px-6 md:px-12">
          {[
            "Toda segunda alguém passa horas montando relatório.",
            "Cada setor tem um número diferente para a mesma coisa.",
            "Você decide investimento sem saber de onde vem o cliente que dá lucro.",
          ].map((d) => (
            <li key={d} className="reveal-item border-t border-border/60 py-8 font-serif text-2xl font-light text-marfim md:text-4xl">
              {d}
            </li>
          ))}
        </ul>
      </section>

      <section className="border-b border-border/50 py-24 md:py-32">
        <div className="mx-auto max-w-3xl px-6">
          <Calculadora
            titulo="O custo do relatório feito à mão"
            campos={[
              { id: "p", label: "Pessoas que montam relatório", inicial: 2 },
              { id: "h", label: "Horas por semana de cada uma", inicial: 4 },
              { id: "c", label: "Custo da hora (R$)", inicial: 40 },
            ]}
            resultado={(v) => {
              const horas = (v.p ?? 0) * (v.h ?? 0) * 4.3;
              return (
                <>
                  <p>Horas por mês: <span className="text-dourado">{fmt(horas)}</span></p>
                  <p className="mt-3">Custo por mês: <span className="text-dourado">{brl(horas * (v.c ?? 0))}</span></p>
                </>
              );
            }}
            nota="E isso sem contar a decisão tomada com número desatualizado."
          />
        </div>
      </section>

      <section className="border-b border-border/50 bg-bordo-dark py-24 md:py-32">
        <div className="mx-auto max-w-[1440px] px-6 md:px-12">
          <h2 className="title-2 text-marfim">O que você passa a enxergar</h2>
          <div data-reveal className="mt-14 grid gap-px bg-marfim/10 sm:grid-cols-2 lg:grid-cols-4">
            {[
              "De onde vem cada cliente e quanto ele custa.",
              "Quem vende mais e em que etapa as vendas travam.",
              "Estoque, margem e produtos que dão lucro.",
              "Metas da equipe em tempo real.",
            ].map((c) => (
              <p key={c} className="reveal-item bg-bordo-dark p-8 font-serif text-2xl font-light text-marfim">{c}</p>
            ))}
          </div>
        </div>
      </section>

      <Bloco titulo="Todo sistema tem">
        <Lista
          itens={[
            "Atualização direto da fonte",
            "Número conferido antes de ir ao ar",
            "Login por perfil (cada pessoa vê o que precisa)",
            "Abre no navegador, sem instalar nada",
          ]}
        />
      </Bloco>

      <Bloco titulo="Exemplos de projeto" tom="marrom">
        <Lista
          itens={[
            "Painel comercial de indústria",
            "Portal de imóveis com CRM de corretores",
            "Portal de representantes de distribuidora",
            "Painel de vendas, estoque e margem de loja",
            "Ranking de equipe",
          ]}
        />
      </Bloco>

      <Bloco titulo="Como é construído">
        <Passos
          itens={[
            "Entendemos as decisões que você precisa tomar.",
            "Especificação aprovada por você.",
            "Protótipo das telas.",
            "Desenvolvimento com demonstrações a cada duas semanas.",
            "No ar, com garantia de 90 dias e manutenção mensal.",
          ]}
        />
      </Bloco>

      <Bloco titulo="Perguntas frequentes" tom="marrom">
        <Faq
          itens={[
            { q: "Preciso trocar o sistema que já uso?", a: "Não. A gente se conecta ao que você já tem." },
            { q: "Meus dados ficam seguros?", a: "Acesso por login e perfil, conexão criptografada e cópias de segurança." },
            { q: "Quem é dono do sistema?", a: "Definido em contrato: licença de uso ou entrega do código depois da quitação." },
            { q: "E depois que fica pronto?", a: "Manutenção mensal com ajustes, atualizações e suporte." },
          ]}
        />
      </Bloco>

      <section className="bg-bordo py-28 md:py-36">
        <div className="mx-auto max-w-[1440px] px-6 md:px-12">
          <h2 className="title-2 max-w-3xl text-marfim">Quer ver com o jeito do seu negócio?</h2>
          <div className="mt-12">
            <Btn
              href={henriqueLink(undefined, "Olá, Henrique! Vim pelo site da Vittori e quero conversar sobre o meu painel.")}
              variant="light"
            >
              Quero conversar sobre o meu painel
            </Btn>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
