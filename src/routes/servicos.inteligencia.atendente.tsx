import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteShell } from "@/components/site/SiteShell";
import { Bloco, Lista, Passos, PageHero } from "@/components/servicos/ServicePage";
import { Calculadora, brl, fmt } from "@/components/servicos/Calculadora";
import { ConversaIlustrativa } from "@/components/home/InteligenciaDestaque";
import { Btn, Faq } from "@/components/site/ui";
import { henriqueLink } from "@/lib/contato";

const T = "Atendente de IA no WhatsApp · Vittori Inteligência";
const D =
  "Uma atendente de inteligência artificial no WhatsApp da sua empresa. Responde na hora, organiza cada pedido e chama o seu time na hora de fechar.";

export const Route = createFileRoute("/servicos/inteligencia/atendente")({
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

const ABAS = [
  ["Conversas", "Todo o WhatsApp da empresa numa lista, com quem está respondendo e há quanto tempo o cliente espera."],
  ["Ficha do cliente", "O que ele pediu, de onde veio e em que etapa está, sem precisar reler a conversa."],
  ["Funil", "Quem pediu orçamento, quem está em retorno, quem agendou e quem fechou. Quem não respondeu aparece para ser chamado de novo."],
  ["Agenda", "O horário marcado com o resumo do atendimento ao lado."],
  ["Painel do mês", "Quantos contatos chegaram, quantos fecharam e de onde vieram (anúncio, Instagram, indicação)."],
];

const NICHOS = [
  ["Clínicas e consultórios", "Procedimento, convênio ou particular, melhor dia e horário."],
  ["Estética e harmonização", "Procedimento de interesse, se já fez antes, disponibilidade para avaliação."],
  ["Odontologia", "Tratamento, urgência, convênio."],
  ["Estúdios de tatuagem", "Estilo, tamanho, região do corpo, referência e sinal."],
  ["Salões, barbearias e beleza", "Serviço, profissional preferido, horário."],
  ["Imobiliárias", "Compra ou aluguel, região, faixa de valor, número de quartos."],
  ["Lojas e e-commerce", "Produto, tamanho ou modelo, cidade para frete, forma de pagamento."],
  ["Restaurantes e delivery", "Cardápio, reservas, horário de funcionamento."],
  ["Escolas, cursos e academias", "Modalidade, horário, aula experimental."],
  ["Advocacia e contabilidade", "Área do caso, urgência, agendamento de consulta."],
  ["Prestadores de serviço", "Limpeza, reforma, eventos: tipo de serviço, tamanho, endereço, data."],
];

const DEMO = henriqueLink(undefined, "Olá, Henrique! Vim pelo site da Vittori e quero uma demonstração da Atendente de IA.");

function Abas() {
  const [a, setA] = useState(0);
  return (
    <div>
      <div role="tablist" className="flex flex-wrap gap-2">
        {ABAS.map(([t], i) => (
          <button
            key={t}
            role="tab"
            aria-selected={a === i}
            onClick={() => setA(i)}
            className={`t-label min-h-11 border px-4 py-3 transition-colors ${a === i ? "border-dourado bg-dourado text-preto" : "border-border text-marfim/70 hover:text-dourado"}`}
          >
            {t}
          </button>
        ))}
      </div>
      <div data-stage-zone="demo" role="tabpanel" className="demo-surface mt-6 border border-border/60 p-8">
        <p className="font-serif text-2xl font-light text-marfim">{(ABAS[a]?.[0] ?? "")}</p>
        <p className="mt-4 text-sm leading-loose text-marfim/75">{(ABAS[a]?.[1] ?? "")}</p>
        <p className="t-meta mt-8">Dados de demonstração</p>
      </div>
      <p className="mt-4 text-xs text-marfim/85">Ficha, funil, agenda e painel fazem parte do plano Completa.</p>
    </div>
  );
}

function Page() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Atendente de IA no WhatsApp"
        titulo="Enquanto você trabalha, nenhum cliente fica esperando."
        texto="Uma atendente de inteligência artificial no WhatsApp da sua empresa. Responde na hora, organiza cada pedido e chama o seu time na hora de fechar."
      >
        <Btn to="/servicos/inteligencia/atendente" hash="como-funciona" variant="ghost">Ver como funciona</Btn>
        <Btn href={henriqueLink("Atendente de IA")}>Falar com o Henrique</Btn>
      </PageHero>

      <section data-stage-section="wide" className="internal-page reading-veil border-b border-border/50 py-24 md:py-32">
        <ul data-stage-zone="reading" data-reveal className="mx-auto max-w-[1440px] px-6 md:px-12">
          {[
            "O cliente manda mensagem às 23h. No dia seguinte você responde, e ele já fechou com outro.",
            "Sete conversas abertas e ninguém sabe quem respondeu quem.",
            "Quem pediu orçamento e sumiu nunca mais é chamado.",
          ].map((d) => (
            <li key={d} className="reveal-item border-t border-border/60 py-8 font-serif text-2xl font-light text-marfim md:text-4xl">
              {d}
            </li>
          ))}
        </ul>
      </section>

      <section data-stage-section="wide" className="internal-page reading-veil border-b border-border/50 py-24 md:py-32">
        <div data-stage-zone="reading" className="mx-auto grid max-w-[1440px] gap-8 px-6 md:px-12 lg:grid-cols-2">
          <Calculadora
            titulo="Quanto a demora custa"
            campos={[
              { id: "m", label: "Mensagens novas por dia", inicial: 20 },
              { id: "f", label: "Chegam fora do horário ou esperam mais de 1 hora (%)", inicial: 30 },
              { id: "p", label: "Desses, quantos você acha que perde (%)", inicial: 50 },
              { id: "t", label: "Clientes que fecham a cada 100 conversas atendidas a tempo", inicial: 10 },
              { id: "v", label: "Valor médio de uma venda (R$)", inicial: 500 },
            ]}
            resultado={(v) => {
              const conv = v.m * 30 * (v.f / 100) * (v.p / 100);
              const vendas = conv * (v.t / 100);
              return (
                <>
                  <p>Conversas que esfriam por mês: <span className="text-dourado">{fmt(conv)}</span></p>
                  <p className="mt-3">Vendas que podem estar ficando pelo caminho: <span className="text-dourado">{fmt(vendas)}</span></p>
                  <p className="mt-3">Em valor: cerca de <span className="text-dourado">{brl(vendas * v.v)}</span> por mês.</p>
                </>
              );
            }}
            nota="Quem responde primeiro costuma levar a venda. A atendente responde em segundos, de dia, de noite e no fim de semana."
          />
          <Calculadora
            titulo="Atendente contratada × atendente de IA"
            campos={[
              { id: "s", label: "Salário de uma atendente (R$)", inicial: 1898 },
              { id: "h", label: "Horas por semana de atendimento", inicial: 44 },
            ]}
            resultado={(v) => (
              <>
                <p>Custo mensal estimado com encargos: <span className="text-dourado">{brl(v.s * 1.44)}</span></p>
                <p className="mt-3">Horas cobertas por semana: <span className="text-dourado">{fmt(v.h)}</span> de 168.</p>
              </>
            )}
            nota={
              <>
                <p>A atendente de IA cobre as 168 horas da semana, não tira férias e passa para o seu time só o que precisa de gente.</p>
                <p className="mt-4 text-xs text-marfim/85">
                  Salário inicial: média nacional de recepcionista. Encargos estimados em 44% do salário para empresas do Simples Nacional. Consulte o seu contador.
                </p>
              </>
            }
          />
        </div>
      </section>

      <Bloco id="como-funciona" titulo="Como funciona" tom="marrom">
        <Passos
          itens={[
            "O contato chega: a conversa entra pelo WhatsApp oficial, no mesmo número da sua empresa.",
            "A atendente organiza: pergunta o que o seu negócio precisa saber e registra tudo numa ficha.",
            "O seu time assume: na hora de negociar ou fechar, ela chama a pessoa certa com o resumo pronto.",
            "O horário entra: agendamento, confirmação, lembrete e remarcação sem ninguém copiar e colar.",
          ]}
        />
        <div className="reveal-item mt-12">
          <ConversaIlustrativa />
        </div>
      </Bloco>

      <Bloco titulo="Tudo numa tela só." layout="demo">
        <Abas />
      </Bloco>

      <Bloco titulo="O que ela faz" tom="marrom">
        <Lista
          itens={[
            "Responde na hora, 24 horas, inclusive à noite, no fim de semana e no feriado.",
            "Conversa no tom da sua marca, como gente.",
            "Entende áudio e foto e não pede de novo o que o cliente já mandou.",
            "Lembra o que cada cliente já perguntou e retoma do ponto certo.",
            "Usa só a informação que você aprovou: preço, horário, frete, políticas. O que ela não sabe, passa para uma pessoa.",
            "Você escolhe se ela informa os preços da sua tabela ou se chama alguém na hora do orçamento.",
            "Reativa quem não fechou e envia orientações depois do atendimento.",
          ]}
        />
      </Bloco>

      <section data-stage-section="wide" className="internal-page reading-veil border-b border-border/50 py-24 md:py-32">
        <div data-stage-zone="reading" className="mx-auto max-w-[1440px] px-6 md:px-12">
          <h2 className="title-2 max-w-4xl text-marfim">
            Atendimento rápido. <em className="italic text-dourado">Fechamento humano.</em>
          </h2>
          <p className="measure mt-8 text-base leading-loose text-marfim/80">
            Ela tira o repetitivo, não a conversa que fecha a venda. Você define o que ela pergunta, quando ela para e
            em que momento alguém do seu time assume. E pode pausar quando quiser.
          </p>
        </div>
      </section>

      <section data-stage-section="wide" className="internal-page reading-veil border-b border-border/50 py-24 md:py-32">
        <div data-stage-zone="reading" className="mx-auto max-w-[1440px] px-6 md:px-12">
          <p className="t-label mb-6 text-dourado">Para quem é</p>
          <div data-reveal className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {NICHOS.map(([n, q]) => (
              <div key={n} className="reveal-item border-t border-border p-7">
                <h3 className="font-serif text-2xl text-marfim">{n}</h3>
                <p className="mt-3 text-sm leading-relaxed text-marfim/65">{q}</p>
              </div>
            ))}
          </div>
          <p className="mt-10 font-serif text-xl italic text-marfim/80">
            Serve para qualquer negócio que vende ou agenda pelo WhatsApp.
          </p>
        </div>
      </section>

      <Bloco titulo="Perguntas frequentes" layout="faq" tom="marrom">
        <Faq
          itens={[
            { q: "O cliente vai perceber que é robô?", a: "A conversa é natural e no tom da sua marca. Se alguém perguntar, ela diz que é assistente virtual e chama uma pessoa." },
            { q: "E se ela errar?", a: "Ela só usa o que está na base que você aprovou. O que não sabe, passa para o seu time." },
            { q: "Preciso mudar o meu jeito de atender?", a: "Não. A implantação parte do atendimento que você já faz. Você decide o que ela pergunta e quando para." },
            { q: "Serve para quem trabalha sozinho?", a: "Sim, principalmente quando as mensagens já tomam o tempo do seu trabalho e alguns retornos começam a se perder." },
            { q: "Uso o meu número de sempre?", a: "Sim, conectado pela API oficial do WhatsApp." },
            { q: "Quanto tempo para começar?", a: "De 15 a 20 dias úteis depois de recebermos as informações do seu atendimento." },
            { q: "E os dados dos meus clientes?", a: "Tratados conforme a LGPD, usados só para o seu atendimento." },
          ]}
        />
      </Bloco>

      <section data-stage-section="wide" className="internal-page reading-veil finale-glow py-28 md:py-36">
        <div data-stage-zone="reading" className="mx-auto max-w-[1440px] px-6 md:px-12">
          <h2 className="title-2 max-w-3xl text-marfim">Quer ver com o jeito do seu negócio?</h2>
          <p className="measure mt-8 text-base leading-loose text-marfim/85">
            Em 30 minutos, o Henrique mostra as telas, entende como você atende hoje e diz onde a atendente pode ajudar.
          </p>
          <div className="mt-12">
            <Btn href={DEMO} variant="light">Quero uma demonstração</Btn>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
