import type { ReactNode } from "react";
import type { Linha } from "@/content/servicos";
import { Check, Gem, Layers, Star, MonitorCog, ChartNoAxesCombined, Sparkles, Crosshair, GitMerge, Fingerprint, PenTool, Palette, BookOpen } from "lucide-react";
import { Line } from "@/components/site/Lines";
import { Btn, Faq } from "@/components/site/ui";
import { VoltarContexto } from "@/components/site/Navegacao";
import { whatsappLink } from "@/lib/contato";

export function PageHero({ eyebrow, titulo, texto, children }: { eyebrow: string; titulo: string; texto: string; children?: ReactNode }) {
  return (
    <section data-stage-section="left" className="internal-page reading-veil relative pb-12 pt-28 md:pb-16 md:pt-32">
      <div data-stage-zone="reading" className="mx-auto max-w-[1440px] px-6 md:px-12">
        <VoltarContexto />
        <p className="t-label mb-4">✦ {eyebrow}</p>
        <h1 data-lines className="internal-title max-w-5xl text-marfim"><Line>{titulo}</Line></h1>
        <p data-reveal className="mt-6 max-w-2xl"><span className="reveal-item block t-body">{texto}</span></p>
        {children && <div className="mt-7 flex flex-wrap gap-3">{children}</div>}
      </div>
    </section>
  );
}

export function Bloco({ eyebrow, titulo, children, tom = "preto", layout = "lista", id }: { eyebrow?: string | undefined; titulo: string; children: ReactNode; tom?: "preto" | "marrom" | "bordo"; layout?: "explicacao" | "lista" | "comparativo" | "faq" | "demo"; id?: string }) {
  const split = layout === "explicacao" || layout === "demo";
  return (
    <section id={id} data-stage-section="wide" className={`internal-page reading-veil relative section-seam py-12 md:py-16 ${tom === "bordo" ? "finale-glow" : ""}`}>
      <div className={`mx-auto grid max-w-[1440px] gap-6 px-6 md:gap-10 md:px-12 ${split ? "lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]" : ""}`}>
        <div data-stage-zone="reading" className="max-w-4xl">
          {eyebrow && <p className="t-label mb-3">{eyebrow}</p>}
          <h2 className="section-heading font-serif font-normal text-marfim">{titulo}</h2>
        </div>
        <div data-stage-zone={layout === "demo" ? "demo" : "reading"} data-reveal className="min-w-0 max-w-6xl">{children}</div>
      </div>
    </section>
  );
}

export function Lista({ itens, colunas = false }: { itens: string[]; colunas?: boolean }) {
  return (
    <ul className={colunas ? "grid gap-x-8 md:grid-cols-2" : ""}>
      {itens.map(i => <li key={i} className="reveal-item t-body flex gap-3 border-t border-border/50 py-3.5">
        <Check aria-hidden="true" className="mt-1.5 size-4 shrink-0 text-dourado-claro" strokeWidth={1.7} />
        <span>{i}</span>
      </li>)}
    </ul>
  );
}

export function Passos({ itens }: { itens: string[] }) {
  return <ol className="grid gap-6 md:grid-cols-2">
    {itens.map((p, i) => <li key={p} className="reveal-item border-l border-dourado/50 pl-5">
      <span className="font-serif text-3xl text-dourado-claro">0{i + 1}</span>
      <p className="t-body mt-2">{p}</p>
    </li>)}
  </ol>;
}


function PresencaPlanos({ l }: { l: Linha }) {
  return <>
    <section data-stage-section="wide" className="internal-page reading-veil relative section-seam py-14 md:py-20">
      <div data-stage-zone="reading" className="mx-auto max-w-[1440px] px-6 md:px-12">
        <p className="t-label mb-3">Escolha sua intensidade de presença</p>
        <h2 className="section-heading mb-8">Três planos. Entregas claras.</h2>
        <div className="grid gap-4 lg:grid-cols-3">
          {l.planos?.map((p, i) => {
            const Icon = [Star, Layers, Gem][i] ?? Sparkles;
            return <article key={p.nome} className={`offer-card glass glow-edge relative flex min-w-0 flex-col gap-5 rounded-md p-6 md:p-8 ${p.destaque ? "offer-card--featured" : ""}`}>
              <div className="flex items-center justify-between gap-3">
                <span className="inline-flex size-12 items-center justify-center rounded-full border border-dourado/50"><Icon aria-hidden="true" className="size-6 text-dourado-claro" strokeWidth={1.5}/></span>
                <span className="t-label">0{i + 1}</span>
              </div>
              <div><h3 className="font-serif text-4xl leading-tight text-marfim">{p.nome}</h3><p className="mt-2 font-serif text-xl italic text-dourado-claro">{p.resumo}</p><p className="t-meta mt-3">{p.detalhe}</p></div>
              <div className="border-y border-dourado/25 py-5">
                <p className="text-5xl font-serif text-marfim">{p.publicacoes}<span className="ml-2 text-base font-sans text-marfim/75">publicações/mês</span></p>
                <p className="t-body mt-2">Até {p.reels} Reels de até {p.duracaoReelSegundos} segundos, <strong>já incluídos no total mensal</strong>.</p>
              </div>
              <ul className="flex-1 space-y-3 t-meta">
                <li className="flex gap-2"><Check className="mt-1 size-4 shrink-0 text-dourado-claro"/>{p.captacoes}</li>
                {p.diferenciais?.filter(d => !d.toLowerCase().includes("organização inicial")).map(d => <li key={d} className="flex gap-2"><Check className="mt-1 size-4 shrink-0 text-dourado-claro"/>{d}</li>)}
              </ul>
              <Btn href={whatsappLink(`Olá! Vim pelo site da Vittori e gostaria de conversar sobre o plano ${p.nome} da Vittori Presença.`)} variant="secondary">Conversar sobre {p.nome}</Btn>
            </article>;
          })}
        </div>
      </div>
    </section>
    <Bloco eyebrow="Base incluída" titulo="O que todos os planos recebem"><Lista itens={l.incluso ?? []} colunas /></Bloco>
    <Bloco eyebrow="Condições de produção" titulo="Captações com propósito e escopo definido.">
      <p className="t-body max-w-4xl">Cada captação é destinada exclusivamente à produção de conteúdo para os perfis e canais previstos no contrato. As sessões não são cumulativas, não passam para o mês seguinte e não podem ser somadas para formar uma diária maior. Projetos externos ao escopo, como eventos e cursos, são orçados separadamente.</p>
      <p className="t-body mt-4 max-w-4xl">No Legado, a Gestão de Directs contempla duas verificações por dia útil, em horários combinados, para dúvidas frequentes e encaminhamento de mensagens. Não inclui atendimento em tempo real, negociações, fechamento de vendas ou suporte complexo.</p>
    </Bloco>
  </>;
}

function PerformanceModalidades({ l }: { l: Linha }) {
  const [implementacao, gestao] = l.blocos ?? [];
  return <>
    <section data-stage-section="wide" className="internal-page reading-veil relative section-seam py-14 md:py-20">
      <div data-stage-zone="reading" className="mx-auto max-w-[1440px] px-6 md:px-12">
        <p className="t-label mb-3">Implementação ou gestão</p>
        <h2 className="section-heading mb-8">Duas formas de contratar.</h2>
        <div className="grid gap-5 lg:grid-cols-2">
          {[implementacao, gestao].filter(Boolean).map((b, i) => <article key={b!.titulo} className="glass offer-card glow-edge flex flex-col rounded-md p-6 md:p-8">
            <span className="inline-flex size-12 items-center justify-center rounded-full border border-dourado/40 mb-5">{i===0?<MonitorCog className="size-6 text-dourado-claro"/>:<ChartNoAxesCombined className="size-6 text-dourado-claro"/>}</span>
            <p className="t-label mb-2">{b!.eyebrow}</p>
            <h3 className="font-serif text-3xl text-marfim">{b!.titulo}</h3>
            <p className="t-body mt-4">{b!.texto}</p>
            {b!.para && <p className="t-meta mt-4 border-l border-dourado/50 pl-4"><strong className="text-marfim">{b!.para}</strong></p>}
            <Btn href={whatsappLink(`Olá! Vim pelo site da Vittori e quero saber mais sobre ${i===0?"Implementação de Tráfego":"Gestão de Tráfego Pago"}.`)} variant="link" className="mt-auto pt-5">Conversar sobre {i===0?"implementação":"gestão"}</Btn>
          </article>)}
        </div>
      </div>
    </section>
    {implementacao?.grupos && <Bloco eyebrow="Escopo técnico" titulo="O que a implementação organiza.">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {implementacao.grupos.map(g => <div key={g.titulo} className="reveal-item border-t border-dourado/40 pt-4">
          <p className="service-name">{g.titulo}</p>
          <p className="t-meta mt-2">{g.texto}</p>
        </div>)}
      </div>
    </Bloco>}
    {gestao?.lista && <Bloco eyebrow="Entregas comuns" titulo="O que a gestão inclui."><Lista itens={gestao.lista} colunas /></Bloco>}
    {l.planos && <section data-stage-section="wide" className="internal-page reading-veil relative section-seam py-14 md:py-20">
      <div data-stage-zone="reading" className="mx-auto max-w-[1440px] px-6 md:px-12">
        <p className="t-label mb-3">Níveis de gestão</p>
        <h2 className="section-heading mb-8">Compare as opções.</h2>
        <div className="grid gap-5 md:grid-cols-2">
          {l.planos.map((p, i) => <article key={p.nome} className={`offer-card glass glow-edge flex flex-col gap-4 rounded-md p-6 md:p-8 ${i===1?"offer-card--featured":""}`}>
            <div className="flex items-center justify-between gap-3">
              <span className="inline-flex size-12 items-center justify-center rounded-full border border-dourado/50">{i===0?<Crosshair className="size-6 text-dourado-claro" strokeWidth={1.5}/>:<GitMerge className="size-6 text-dourado-claro" strokeWidth={1.5}/>}</span>
              <span className="t-label">0{i + 1}</span>
            </div>
            <h3 className="font-serif text-3xl text-marfim">{p.nome}</h3>
            <p className="font-serif text-xl italic text-dourado-claro">{p.resumo}</p>
            <p className="t-body flex-1">{p.detalhe}</p>
            <Btn href={whatsappLink(`Olá! Vim pelo site da Vittori e quero saber mais sobre a ${p.nome} da Vittori Performance.`)} variant="secondary">Conversar sobre {p.nome}</Btn>
          </article>)}
        </div>
      </div>
    </section>}
    {l.extra && <Bloco eyebrow={l.extra.eyebrow} titulo={l.extra.titulo}><p className="t-body max-w-4xl">{l.extra.texto}</p></Bloco>}
  </>;
}

function OutrosPlanos({ l }: { l: Linha }) {
  return <section data-stage-section="wide" className="internal-page reading-veil relative section-seam py-14 md:py-20">
    <div data-stage-zone="reading" className="mx-auto max-w-[1440px] px-6 md:px-12">
      <p className="t-label mb-3">{l.slug === "digital" ? "Soluções" : "Modalidades"}</p>
      <h2 className="section-heading mb-8">{l.slug === "digital" ? "Escolha a estrutura ideal." : "Conheça as opções."}</h2>
      <div className={`grid gap-5 ${l.planos?.length === 3 ? "lg:grid-cols-3" : "md:grid-cols-2"}`}>
        {l.planos?.map((p,i)=>{
          const Icon=[Star,Layers,Gem][i%3]??Star;
          const custom = l.slug === "digital" && p.nome.toLowerCase().includes("sistemas");
          return <article key={p.nome} className="offer-card glass flex flex-col gap-4 p-6 md:p-8">
            <Icon className="size-7 text-dourado-claro" strokeWidth={1.5} aria-hidden="true"/>
            <h3 className="font-serif text-3xl text-marfim">{p.nome}</h3>
            <p className="t-body flex-1">{p.detalhe || "Escopo e entregáveis definidos conforme a necessidade do projeto."}</p>
            <Btn href={whatsappLink(`Olá! Vim pelo site da Vittori e gostaria de saber mais sobre ${p.nome}.`)} variant="link">{custom?"Solicitar avaliação do projeto":"Conversar sobre esta opção"}</Btn>
          </article>;
        })}
      </div>
    </div>
  </section>;
}

export function ServicePage({l}:{l:Linha}) {
  const presenca = l.slug === "presenca", performance = l.slug === "performance";
  return <>
    <PageHero eyebrow={l.linha} titulo={l.titulo} texto={l.descricao}/>
    {presenca ? <PresencaPlanos l={l}/> : performance ? <PerformanceModalidades l={l}/> : <>
      {l.muda && <Bloco titulo="O que muda para você"><ul className="grid gap-4 md:grid-cols-3">{l.muda.map((m)=><li key={m} className="t-body flex gap-3 border-t border-border/50 py-4"><Sparkles aria-hidden="true" className="mt-1.5 size-4 shrink-0 text-dourado-claro"/><span>{m}</span></li>)}</ul></Bloco>}
      {l.blocos?.map((b,i)=><Bloco key={b.titulo+i} eyebrow={b.eyebrow} titulo={b.titulo} layout={b.lista ? "lista" : "explicacao"}>
        {b.texto && <p className="t-body mb-5 max-w-3xl">{b.texto}</p>}
        {b.lista && <Lista itens={b.lista} colunas={b.lista.length>5}/>}
        {b.para && <p className="t-meta mt-5"><span className="t-label mr-2">Ideal para</span>{b.para}</p>}
      </Bloco>)}
      {l.cards && <Bloco titulo={l.cards.titulo}>
        <p className="t-body mb-6">{l.cards.texto}</p>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{l.cards.itens.map((c,ci)=>{
          const Icon=[Fingerprint,PenTool,Palette,BookOpen][ci%4]??Sparkles;
          return <article key={c.titulo} className="glass offer-card glow-edge reveal-item relative flex flex-col overflow-hidden p-6">
            <span aria-hidden className="svc-num absolute -right-2 -top-4 text-6xl opacity-40">0{ci+1}</span>
            <span className="inline-flex size-11 items-center justify-center rounded-full border border-dourado/40"><Icon aria-hidden="true" className="size-5 text-dourado-claro" strokeWidth={1.4}/></span>
            <h3 className="mt-4 font-serif text-2xl text-dourado-claro">{c.titulo}</h3>
            <p className="t-meta mt-3 flex-1">{c.texto}</p>
          </article>;})}
        </div>
      </Bloco>}
      {l.incluso && <Bloco titulo="O que está incluído"><Lista itens={l.incluso} colunas/></Bloco>}
      {l.planos && <OutrosPlanos l={l}/>}
      {l.extra && <Bloco eyebrow={l.extra.eyebrow} titulo={l.extra.titulo}>{l.extra.texto && <p className="t-body">{l.extra.texto}</p>}{l.extra.lista && <Lista itens={l.extra.lista} colunas/>}</Bloco>}
    </>}
    {l.comoFunciona && <Bloco titulo="Como funciona"><Passos itens={l.comoFunciona}/></Bloco>}
    <section data-stage-section="left" className="internal-page reading-veil finale-glow relative section-seam py-16 md:py-20">
      <div data-stage-zone="reading" className="mx-auto max-w-[1440px] px-6 md:px-12">
        <h2 className="section-heading max-w-3xl">Vamos conversar sobre seu projeto?</h2>
        <div className="mt-6"><Btn href={whatsappLink(`Olá! Vim pelo site da Vittori e gostaria de conversar sobre ${l.linha}.`)}>Conversar sobre {l.linha}</Btn></div>
      </div>
    </section>
  </>;
}
