import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";
import { Bloco, Lista, Passos, PageHero } from "@/components/servicos/ServicePage";
import { ConversaIlustrativa } from "@/components/home/InteligenciaDestaque";
import { Btn, Faq } from "@/components/site/ui";
import { henriqueLink } from "@/lib/contato";

const T = "Vittori Inteligência · Nenhum cliente sem resposta";
const D =
  "Atendente de IA no WhatsApp, sistemas e painéis sob medida e estúdio de posts modelados para negócios que querem responder rápido e decidir com clareza.";

export const Route = createFileRoute("/servicos/inteligencia/")({
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

function SaibaMais({ to }: { to: string }) {
  return (
    <Link to={to} className="label-mono mt-8 inline-flex min-h-11 items-center gap-3 text-dourado">
      Saiba mais <span className="h-px w-8 bg-dourado" />
    </Link>
  );
}

function Page() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Vittori Inteligência"
        titulo="Nenhum cliente sem resposta. Nenhuma decisão no escuro."
        texto="Atendente de IA no WhatsApp, sistemas e painéis sob medida e estúdio de posts."
      >
        <Btn href={henriqueLink()}>Falar com o Henrique</Btn>
      </PageHero>

      <Bloco eyebrow="Atendente de IA no WhatsApp" titulo="Nenhum cliente sem resposta." tom="marrom">
        <p className="reveal-item measure mb-8 text-sm leading-loose text-marfim/80">
          É uma atendente no WhatsApp da sua empresa que responde na hora, com a sua tabela e as suas regras,
          conversa como gente, descobre o que o cliente quer e passa para o vendedor já com o resumo. Quando o
          vendedor entra, ela sai.
        </p>
        <Lista
          itens={[
            "Atendimento imediato, 24 horas, inclusive à noite, fim de semana e feriado",
            "Conversa humanizada, no tom da sua marca",
            "Entende áudio e foto e não pede de novo o que o cliente já mandou",
            "Memória da conversa: lembra o que cada cliente já perguntou e retoma do ponto certo",
            "Consulta horários e marca na agenda, confirma, lembra e reagenda",
            "Usa só informação oficial (preço, horário, frete, políticas). O que não sabe, passa para uma pessoa",
            "Preço atualizado na hora, sem mexer no sistema",
            "Qualifica em poucas perguntas",
            "Avisa o vendedor no WhatsApp com o resumo e registra no CRM",
            "Sai da conversa quando alguém do time assume",
            "Reativa quem não fechou e manda orientações depois do atendimento",
          ]}
        />
        <div className="reveal-item mt-12">
          <ConversaIlustrativa />
        </div>
        <h3 className="mt-14 font-serif text-3xl font-light text-marfim">Como entra na sua empresa</h3>
        <div className="mt-8">
          <Passos
            itens={[
              "Entendemos o seu atendimento.",
              "Montamos a base e o jeito de falar.",
              "Testamos com conversas reais.",
              "Vai ao ar e seguimos ajustando.",
            ]}
          />
        </div>
        <p className="reveal-item mt-10 text-sm text-marfim/60">
          Serve para: clínica, imobiliária, loja, escola, restaurante e prestador de serviço.
        </p>
        <div className="reveal-item mt-10 border-l border-dourado pl-6">
          <p className="label-mono mb-3 text-dourado">Faça a conta</p>
          <p className="text-sm leading-loose text-marfim/80">
            Quantas mensagens chegam fora do horário? Quantas esperam mais de uma hora? Cada uma é um cliente que
            pode estar falando com o concorrente. Uma pessoa a mais no atendimento custa muito mais por mês do que a
            atendente, e não trabalha à noite nem no domingo.
          </p>
        </div>
        <div className="mt-12">
          <Faq
            itens={[
              { q: "O cliente vai perceber?", a: "A conversa é natural e humanizada. Se alguém perguntar diretamente, ela diz que é assistente virtual e chama uma pessoa." },
              { q: "E se ela errar?", a: "Ela só usa o que está na base; o resto, passa para uma pessoa." },
              { q: "Vou perder o controle?", a: "Não. O vendedor entra quando quiser." },
              { q: "Ela fecha a venda?", a: "Ela deixa o cliente pronto. Quem negocia e fecha continua sendo gente." },
            ]}
          />
        </div>
        <SaibaMais to="/servicos/inteligencia/atendente" />
      </Bloco>

      <Bloco eyebrow="Sistemas e Painéis" titulo="Os números da sua empresa num lugar só.">
        <p className="reveal-item measure mb-8 text-sm leading-loose text-marfim/80">
          A gente junta os dados que estão espalhados, no CRM, nos anúncios, na loja e no ERP, num sistema feito
          para o seu negócio. Atualiza sozinho e mostra de onde vem o cliente, quanto ele custa, quem vende e onde
          está a margem.
        </p>
        <p className="label-mono mb-2 mt-10 text-dourado">Todo sistema tem</p>
        <Lista
          itens={[
            "Atualiza sozinho, direto da fonte",
            "Número conferido antes de ir ao ar",
            "Login por perfil",
            "Abre no navegador, sem instalar nada",
          ]}
        />
        <p className="label-mono mb-2 mt-10 text-dourado">Exemplos</p>
        <Lista
          itens={[
            "Painel comercial de indústria",
            "Portal de imóveis com CRM de corretores",
            "Portal de representantes de distribuidora",
            "Painel de vendas, estoque e margem de loja de moda",
            "Ranking de equipe de agência de creators",
          ]}
        />
        <p className="reveal-item mt-6 text-sm text-marfim/60">Também criamos sistemas e apps sob encomenda.</p>
        <SaibaMais to="/servicos/inteligencia/sistemas" />
      </Bloco>

      <Bloco eyebrow="Estúdio de Posts Modelados" titulo="O que já funciona, com a cara da sua marca." tom="marrom">
        <p className="reveal-item measure mb-8 text-sm leading-loose text-marfim/80">
          A gente pega os posts que mais dão resultado no seu mercado, aqui e lá fora, e refaz com a sua marca. Sai
          reels, carrossel e estático prontos, com a automação de quem comenta e um placar do que funcionou.
        </p>
        <Lista
          itens={[
            "Modelar não é copiar: usamos a estrutura que provou resultado; arte, texto e exemplos são seus",
            "Modo peça ou modo lote",
            "Comentário vira contato (\"comente a palavra e receba\")",
            "Nada vai ao ar sem a sua aprovação",
            "Resultado medido em 7 dias",
          ]}
        />
        <SaibaMais to="/servicos/inteligencia/estudio-de-posts" />
      </Bloco>

      <section className="bg-bordo py-28">
        <div className="mx-auto max-w-[1440px] px-6 md:px-12">
          <h2 className="title-2 max-w-3xl text-marfim">Quer ver com o jeito do seu negócio?</h2>
          <div className="mt-12">
            <Btn href={henriqueLink()} variant="light">
              Falar com o Henrique, Consultor de Novos Projetos
            </Btn>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
