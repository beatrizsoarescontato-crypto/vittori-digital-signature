import { Search, ClipboardList, Clapperboard, ChartNoAxesCombined, Check, X } from "lucide-react";
import { Line } from "@/components/site/Lines";
import { Btn, Faq } from "@/components/site/ui";
import { SHOW_BACKSTAGE_VIDEO, whatsappLink } from "@/lib/contato";

export function Metodo() {
  const etapas = [
    ["Diagnóstico", "Reunião de onboarding, leitura do perfil, do site e da concorrência."],
    ["Plano", "Calendário, roteiros e metas do mês, aprovados por você."],
    ["Produção", "Gravação, design, edição e campanhas no ar."],
    ["Leitura", "Relatório, reunião e ajuste do próximo mês."],
  ];
  return (
    <section id="metodo" className="relative border-t border-border/50 bg-preto/40 py-28 text-marfim backdrop-blur-[2px] md:py-40">
      <div className="mx-auto max-w-[1440px] px-6 md:px-12">
        <p className="label-mono mb-6 text-dourado">Como trabalhamos</p>
        <h2 data-lines className="title-1">
          <Line>
            Método <em className="italic text-dourado">Vittori.</em>
          </Line>
        </h2>
        <div className="relative mt-20">
          <span aria-hidden className="absolute left-0 top-0 hidden h-px w-full bg-marfim/15 md:block" />
          <span aria-hidden data-draw className="absolute left-0 top-0 hidden h-px w-full origin-left bg-dourado md:block" />
          <ol className="grid gap-12 md:grid-cols-4 md:gap-8">
            {etapas.map(([t, d], i) => {
              const Icon = [Search, ClipboardList, Clapperboard, ChartNoAxesCombined][i] ?? Search;
              return (
              <li key={t} className="border-l border-dourado/40 pl-6 md:border-l-0 md:pl-0 md:pt-10">
                <div className="flex items-center justify-between gap-4"><span className="font-serif text-5xl font-medium text-dourado">0{i + 1}</span><Icon aria-hidden="true" className="size-6 text-dourado" strokeWidth={1.5} /></div>
                <h3 className="mt-4 font-serif text-3xl font-semibold">{t}</h3>
                <p className="mt-3 text-sm font-medium leading-loose text-marfim/90">{d}</p>
              </li>
            ); })}
          </ol>
        </div>
        <p className="mt-20 font-serif text-2xl font-medium italic text-marfim md:text-3xl">
          <strong className="font-semibold">Contrato, prazos e entregas escritos.</strong> Sem surpresa.
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
    <section id="pilares" className="relative border-t border-border/50 bg-preto/45 py-24 md:py-32">
      <ul data-reveal className="mx-auto max-w-[1440px] px-6 md:px-12">
        {p.map(([t, d], i) => (
          <li key={t} className="reveal-item grid items-baseline gap-2 border-t border-border/60 py-8 md:grid-cols-12">
            <span className="label-mono text-dourado/70 md:col-span-1">{["I", "II", "III", "IV"][i]}</span>
            <span className="font-serif text-4xl font-light text-marfim md:col-span-5 md:text-6xl">{t}</span>
            <span className="font-serif text-xl italic text-marfim/85 md:col-span-6 md:text-2xl">{d}</span>
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
    <section className="relative border-t border-border/50 bg-marrom/55 py-28 md:py-40">
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
              <p className={`label-mono mb-6 ${cor}`}>{t as string}</p>
              <ul>
                {(itens as string[]).map((i) => (
                  <li key={i} className="reveal-item flex items-start gap-3 border-t border-border/60 py-5 text-base font-normal leading-relaxed text-marfim/90">
                    {t === "É para você se" ? <Check aria-hidden="true" className="mt-1 size-4 shrink-0 text-dourado" /> : <X aria-hidden="true" className="mt-1 size-4 shrink-0 text-marfim/80" />}<span>{i}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-16 font-serif text-2xl italic text-marfim/80">
          Preferimos poucos clientes bem atendidos a muitos frustrados.
        </p>
      </div>
    </section>
  );
}

export function OQueEsperar() {
  const marcos = [
    ["Mês 1", "Diagnóstico, perfil arrumado, estrutura pronta e primeiro lote de conteúdo."],
    ["Mês 2", "Constância no ar e primeiros dados reais."],
    ["Mês 3", "Ajustes com base no que funcionou. É aqui que o resultado começa a ficar consistente."],
    ["Meses 4 a 6", "Escala do que dá certo."],
  ];
  return (
    <section className="relative border-t border-border/50 bg-preto/45 py-28 md:py-40">
      <div className="mx-auto max-w-[1440px] px-6 md:px-12">
        <h2 data-lines className="title-2 max-w-3xl text-marfim">
          <Line>O que acontece</Line>
          <Line>
            <em className="title-shimmer italic text-dourado">depois que você fecha.</em>
          </Line>
        </h2>
        <div className="relative mt-20">
          <ol data-reveal className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {marcos.map(([t, d], i) => (
              <li key={t} className="reveal-item month-card" style={{ animationDelay: `${i * -2.5}s` }}>
                <span aria-hidden className="month-card-glow" style={{ animationDelay: `${i * -2.5}s` }} />
                <span className="relative label-mono text-dourado">✦ {t}</span>
                <p className="relative mt-5 text-sm leading-loose text-marfim/85">{d}</p>
                <span aria-hidden className="relative mt-8 block font-serif text-6xl font-light text-dourado/25">0{i + 1}</span>
              </li>
            ))}
          </ol>
        </div>
        <p className="measure mt-16 text-sm font-normal leading-loose text-marfim/85">
          Trabalhamos sempre com <strong className="font-semibold text-marfim">um mês de antecedência.</strong> O conteúdo de dezembro fica pronto em novembro.
          <strong className="font-semibold text-marfim">Nada é feito às pressas.</strong>
        </p>
      </div>
    </section>
  );
}

export function Bastidores() {
  return (
    <section className="relative overflow-hidden border-t border-border/50 bg-marrom/55 py-36 md:py-56">
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
    a: "O primeiro mês é de estrutura. Os primeiros sinais aparecem no segundo mês e o resultado fica consistente a partir do terceiro. Quem promete resultado em uma semana está vendendo sorte.",
  },
  {
    q: "Vocês garantem resultado?",
    a: "Garantimos método, qualidade, prazo e transparência. Resultado depende também da sua oferta, do seu atendimento e do mercado, e a gente mostra tudo isso nos números todo mês.",
  },
  {
    q: "Por que vocês trabalham com um mês de antecedência?",
    a: "Para nada sair às pressas. Em novembro publicamos o que foi produzido em outubro e já preparamos dezembro. Você aprova com calma e o conteúdo nunca para.",
  },
  { q: "Quem paga os anúncios?", a: "Você, direto na plataforma. A Vittori cuida da estratégia e da gestão." },
  { q: "Tem contrato?", a: "Sim, com escopo, prazos, entregas e responsabilidades dos dois lados por escrito." },
  {
    q: "Qual o prazo do contrato?",
    a: "6 ou 12 meses. É o tempo que o marketing precisa para sair da fase de teste e virar resultado.",
  },
  {
    q: "Vocês atendem fora de Brasília?",
    a: "Sim. Atendemos todo o Brasil e o exterior. Gravações fora do DF têm deslocamento à parte.",
  },
  { q: "Posso contratar só um vídeo, um site ou um logo?", a: "Sim. Estúdio, Digital e Identidade são vendidos por projeto." },
];

export function Perguntas() {
  return (
    <section className="relative border-t border-border/50 bg-preto/45 py-28 md:py-40">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-6 md:grid-cols-12 md:px-12">
        <div className="md:col-span-4">
          <p className="label-mono mb-6 text-dourado">Perguntas frequentes</p>
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
    <section id="contato" className="relative overflow-hidden border-t border-border/50 bg-bordo/80 py-32 md:py-48">
      <div className="mx-auto max-w-[1440px] px-6 md:px-12">
        <span className="font-serif text-3xl text-dourado">✦</span>
        <h2 data-lines className="title-1 mt-8 max-w-5xl text-marfim">
          <Line>Conte o que você</Line>
          <Line>
            <em className="italic">está construindo.</em>
          </Line>
        </h2>
        <p className="measure mt-10 text-base leading-loose text-marfim/80">
          Uma conversa de <strong className="font-semibold text-marfim">até 40 minutos</strong> para entender o seu momento e mostrar por onde começar.
        </p>
        <div className="mt-12 flex flex-col gap-4 sm:flex-row">
          <Btn to="/comece" variant="light">Agendar uma conversa</Btn>
          <Btn href={whatsappLink()} variant="ghostLight">
            WhatsApp com Beatriz Soares
          </Btn>
        </div>
      </div>
    </section>
  );
}
