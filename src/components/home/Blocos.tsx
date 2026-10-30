import { Search, ClipboardList, Clapperboard, ChartNoAxesCombined, Check, X } from "lucide-react";
import { Line } from "@/components/site/Lines";
import { Btn, Faq } from "@/components/site/ui";
import { SHOW_BACKSTAGE_VIDEO, whatsappLink } from "@/lib/contato";

export function Metodo() {
  const etapas = [
    ["Entendimento", "Conhecemos seu negócio, seus objetivos e o cenário em que sua marca está inserida. Antes de propor, entendemos o que precisa ser resolvido."],
    ["Direção", "Definimos a estratégia, o escopo, as entregas e o caminho de execução. Cada projeto recebe um planejamento compatível com sua necessidade."],
    ["Realização", "Transformamos a direção em trabalho concreto: criação, produção, desenvolvimento ou implementação, conforme o serviço contratado."],
    ["Evolução", "Apresentamos as entregas, avaliamos os indicadores aplicáveis e definimos os próximos passos. Projetos pontuais e serviços contínuos têm acompanhamentos próprios."],
  ];
  return (
    <section data-stage-section="wide" id="metodo" className="relative section-seam py-20 text-marfim md:py-28 reading-veil">
      <div className="mx-auto max-w-[1440px] px-6 md:px-12">
        <p className="t-label mb-6">Como trabalhamos</p>
        <h2 data-lines className="title-1">
          <Line>
            Método <em className="italic text-dourado">Vittori.</em>
          </Line>
        </h2>
        <div className="relative mt-14">
          {/* fio contínuo: horizontal no computador, vertical no celular */}
          <span aria-hidden className="absolute left-[7px] top-0 h-full w-px bg-marfim/15 md:left-0 md:top-[7px] md:h-px md:w-full" />
          <span aria-hidden data-draw className="absolute left-0 top-[7px] hidden h-px w-full origin-left bg-gradient-to-r from-dourado/80 via-dourado to-dourado/20 md:block" />
          <ol className="relative grid gap-10 md:grid-cols-4 md:gap-8">
            {etapas.map(([t, d], i) => {
              const Icon = [Search, ClipboardList, Clapperboard, ChartNoAxesCombined][i] ?? Search;
              return (
                <li key={t} className="group relative pl-10 md:pl-0 md:pt-12">
                  <span aria-hidden className="metodo-node absolute left-0 top-1 md:top-0" />
                  <div className="flex items-end gap-4">
                    <span className="title-shimmer font-serif text-6xl font-light leading-none md:text-7xl">0{i + 1}</span>
                    <span className="mb-1.5 flex size-10 items-center justify-center rounded-full border border-dourado/35"><Icon aria-hidden="true" className="size-[18px] text-dourado" strokeWidth={1.25} /></span>
                  </div>
                  <p className="t-label mt-6">Etapa {i + 1}</p>
                  <h3 className="mt-2 font-serif text-3xl font-medium">{t}</h3>
                  <p className="t-body mt-3 max-w-[32ch]">{d}</p>
                </li>
              );
            })}
          </ol>
        </div>
        <p className="mt-14 font-serif text-2xl font-medium italic text-marfim md:text-3xl">
          <strong className="font-semibold">Estratégia clara. Entregas definidas.</strong> Cada detalhe com direção.
        </p>
      </div>
    </section>
  );
}

export function Pilares() {
  const p = [
    ["Excelência", "nada sai no automático."],
    ["Estratégia", "antes da estética, a decisão."],
    ["Criatividade", "ideia com direção."],
    ["Presença", "constância que vira lembrança."],
  ];
  return (
    <section data-stage-section="wide" id="pilares" className="relative section-seam py-24 md:py-32 reading-veil">
      <ul data-reveal className="mx-auto max-w-[1440px] px-6 md:px-12">
        {p.map(([t, d], i) => (
          <li key={t} className="reveal-item grid items-baseline gap-2 border-t border-border/60 py-8 md:grid-cols-12">
            <span className="font-serif text-2xl italic text-dourado md:col-span-1">{["I", "II", "III", "IV"][i]}</span>
            <span className="font-serif text-4xl font-light text-marfim md:col-span-5 md:text-6xl">{t}</span>
            <span className="font-serif text-2xl italic text-marfim/90 md:col-span-6 md:text-3xl">{d}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function ParaQuem() {
  const sim = [
    "Já é bom no que faz e quer que a marca mostre isso.",
    "Entende que constância gera resultado.",
    "Topa aprovar, gravar e responder nos prazos combinados.",
    "Quer números claros, não só curtidas.",
  ];
  const nao = [
    "Procura resultado garantido em uma semana.",
    "Quer o post mais barato da cidade.",
    "Não tem tempo para aprovar nem para gravar.",
    "Espera que o anúncio venda sozinho, sem atendimento.",
  ];
  return (
    <section data-stage-section="wide" className="relative section-seam py-28 md:py-40 reading-veil">
      <div className="mx-auto max-w-[1440px] px-6 md:px-12">
        <h2 data-lines className="title-2 max-w-4xl text-marfim">
          <Line>A Vittori é para quem pensa</Line>
          <Line>
            <em className="title-shimmer italic text-dourado">em meses, não em dias.</em>
          </Line>
        </h2>
        <div className="mt-20 grid gap-16 md:grid-cols-2">
          {[
            ["É para você se", sim, "text-dourado"],
            ["Não é para você se", nao, "text-marfim/85"],
          ].map(([t, itens, cor]) => (
            <div key={t as string} data-reveal>
              <p className={`t-label mb-6 !text-sm ${cor}`}>{t as string}</p>
              <ul>
                {(itens as string[]).map((i) => (
                  <li key={i} className="reveal-item flex items-start gap-3 border-t border-border/60 py-5 text-base font-normal leading-relaxed text-marfim md:text-lg">
                    {t === "É para você se" ? <Check aria-hidden="true" className="mt-1 size-4 shrink-0 text-dourado" /> : <X aria-hidden="true" className="mt-1 size-4 shrink-0 text-marfim/80" />}<span>{i}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-16 font-serif text-2xl italic text-marfim/90 md:text-3xl">
          Trabalhamos com escopo claro, direção criativa e acompanhamento.
        </p>
      </div>
    </section>
  );
}

export function OQueEsperar() {
  const marcos = [
    ["Entendimento e diagnóstico", "Uma conversa para entender o seu negócio, o momento da marca e o que precisa ser construído."],
    ["Estratégia e planejamento", "Direção, escopo e etapas definidos conforme o projeto."],
    ["Produção e implementação", "As ideias ganham forma com criação, desenvolvimento e entregas alinhadas ao planejamento."],
    ["Acompanhamento e evolução", "Leitura do que foi entregue e próximos passos de acordo com o serviço contratado."],
  ];
  return (
    <section data-stage-section="wide" className="relative section-seam py-28 md:py-40 reading-veil">
      <div className="mx-auto max-w-[1440px] px-6 md:px-12">
        <h2 data-lines className="title-2 max-w-3xl text-marfim">
          <Line>Da primeira conversa</Line>
          <Line>
            <em className="title-shimmer italic text-dourado">à entrega.</em>
          </Line>
        </h2>
        <div className="relative mt-20">
          <ol data-reveal className="delivery-steps grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {marcos.map(([t, d], i) => (
              <li key={t} className="reveal-item relative border-t border-dourado/40 pt-8">
                <span aria-hidden className="metodo-node absolute -top-2 left-0" />
                <span className="t-label">0{i + 1}</span>
                <h3 className="mt-4 min-h-20 font-serif text-3xl font-medium text-marfim">{t}</h3>
                <p className="t-body mt-5">{d}</p>
              </li>
            ))}
          </ol>
        </div>
        <p className="measure t-body mt-16">
          <strong className="font-semibold text-marfim">Escopo, prazos e entregas definidos para o seu projeto.</strong> Cada serviço tem seu próprio ritmo de produção e acompanhamento.
        </p>
      </div>
    </section>
  );
}

export function Bastidores() {
  return (
    <section data-stage-section="left" className="relative overflow-hidden section-seam py-36 md:py-56 reading-veil">
      {!SHOW_BACKSTAGE_VIDEO && (
        <div
          aria-hidden
          className="absolute inset-0 animate-pulse opacity-40 [animation-duration:6s]"
          style={{ background: "radial-gradient(60% 80% at 70% 50%, var(--color-bordo), transparent 70%)" }}
        />
      )}
      <h2 data-lines className="display relative mx-auto max-w-[1440px] px-6 text-marfim md:px-12">
        <Line>Uma diária,</Line>
        <Line>
          <em className="title-shimmer italic text-dourado">conteúdo para semanas.</em>
        </Line>
      </h2>
    </section>
  );
}

const FAQ = [
  {
    q: "Vocês pedem senha das minhas contas?",
    a: "Sempre que a plataforma permite, o acesso é por convite e a conta continua sua. Quando precisamos de senha, você informa no formulário de briefing, que só a nossa equipe acessa. Nunca por WhatsApp. No fim do contrato, removemos os acessos e apagamos as senhas em até 5 dias úteis.",
  },
  {
    q: "Em quanto tempo vejo resultado?",
    a: "O prazo depende do serviço, do ponto de partida e do mercado. Definimos as etapas e acompanhamos os resultados conforme o escopo contratado, sem prometer um mês fixo para todos os projetos.",
  },
  {
    q: "Vocês garantem resultado?",
    a: "Garantimos método, qualidade, prazo e transparência. Resultado depende também da sua oferta, do seu atendimento e do mercado, e a gente mostra tudo isso nos números todo mês.",
  },
  {
    q: "Por que vocês trabalham com um mês de antecedência?",
    a: "O planejamento antecipado ajuda a organizar pautas, captações e aprovações. O calendário é definido conforme cada projeto, sem prazos universais.",
  },
  { q: "Quem paga os anúncios?", a: "Você, direto na plataforma. A Vittori cuida da estratégia e da gestão." },
  { q: "Tem contrato?", a: "Sim, com escopo, prazos, entregas e responsabilidades dos dois lados por escrito." },
  {
    q: "Qual o prazo do contrato?",
    a: "Nos serviços contínuos, trabalhamos com contratos de 6 ou 12 meses. Projetos pontuais têm escopo e prazos próprios. O período de contrato não é uma garantia de resultado em um mês fixo.",
  },
  {
    q: "Vocês atendem fora de Brasília?",
    a: "Sim. Atendemos todo o Brasil e o exterior. Gravações fora do DF têm deslocamento à parte.",
  },
  { q: "Posso contratar só um vídeo, um site ou um logo?", a: "Sim. Estúdio, Digital e Identidade são vendidos por projeto." },
];

export function Perguntas() {
  return (
    <section data-stage-section="wide" className="relative section-seam py-28 md:py-40 reading-veil">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-6 md:grid-cols-12 md:px-12">
        <div className="md:col-span-4">
          <p className="t-label mb-6">Perguntas frequentes</p>
          <h2 data-lines className="title-2 text-marfim">
            <Line>Antes de</Line>
            <Line>
              <em className="title-shimmer italic text-dourado">conversar.</em>
            </Line>
          </h2>
        </div>
        <div className="md:col-span-7 md:col-start-6">
          <Faq itens={FAQ} />
        </div>
      </div>
    </section>
  );
}

export function ChamadaFinal() {
  return (
    <section data-stage-section="left" id="contato" className="relative overflow-hidden section-seam py-16 md:py-24 reading-veil finale-glow">
      <div className="mx-auto max-w-[1440px] px-6 md:px-12">
        <span className="font-serif text-3xl text-dourado">✦</span>
        <h2 data-lines className="title-1 mt-8 max-w-5xl text-marfim">
          <Line>Conte o que você</Line>
          <Line>
            <em className="italic text-dourado">está construindo.</em>
          </Line>
        </h2>
        <p className="measure t-body mt-10 md:text-lg">
          Vamos entender o momento da sua marca e encontrar o próximo passo.
        </p>
        <div className="mt-12 flex flex-col gap-4 sm:flex-row">
          <Btn href={whatsappLink()}>Conversar com a Vittori</Btn>
        </div>
      </div>
    </section>
  );
}
