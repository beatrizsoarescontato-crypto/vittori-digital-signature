import { Bot, LayoutTemplate, PanelsTopLeft, Code2 } from "lucide-react";
import { PRODUTOS_IA } from "@/content/servicos";
import { henriqueLink, whatsappLink } from "@/lib/contato";
import { Btn } from "@/components/site/ui";
import { Line } from "@/components/site/Lines";

const ICONES = [Bot, PanelsTopLeft, LayoutTemplate];

/** Três produtos definidos e uma oferta separada de desenvolvimento por projeto. */
export function InteligenciaDestaque() {
  return <section id="inteligencia" data-stage-section="wide" className="relative reading-veil section-seam py-16 md:py-24">
    <div className="mx-auto max-w-[1440px] px-6 md:px-12">
      <p className="t-label mb-4">Tecnologia aplicada ao seu negócio</p>
      <h2 data-lines className="title-2 max-w-5xl text-marfim"><Line>Vittori <em className="italic text-dourado">Inteligência.</em></Line></h2>
      <p className="t-body mt-5 max-w-3xl">Automação de atendimento, sistemas integrados e produção de conteúdo para simplificar processos, organizar informações e ampliar a capacidade da sua operação.</p>
      <div className="mt-9 grid gap-4 lg:grid-cols-3">
        {PRODUTOS_IA.map((p,i)=>{
          const Icon=ICONES[i]??Bot;
          return <article key={p.slug} className="glass glow-edge flex flex-col rounded-md p-6 md:p-7">
            <Icon aria-hidden="true" className="size-6 text-dourado-claro" strokeWidth={1.35}/>
            <h3 className="mt-4 font-serif text-3xl font-medium leading-tight text-marfim">{p.nome}</h3>
            <span aria-hidden="true" className="my-4 block h-px w-10 bg-dourado/70"/>
            <p className="font-serif text-xl italic text-dourado-claro">{p.titulo}</p>
            <p className="t-meta mt-3 flex-1 font-sans">{p.resumo}</p>
            <div className="mt-5"><Btn to={p.to} variant="link">Conhecer solução</Btn></div>
          </article>;
        })}
      </div>
      <aside className="mt-5 flex flex-col gap-5 rounded-md border border-dourado/30 bg-preto/20 p-6 md:flex-row md:items-center md:justify-between md:p-8">
        <div className="flex max-w-3xl gap-4"><Code2 aria-hidden="true" className="mt-1 size-7 shrink-0 text-dourado-claro" strokeWidth={1.5}/>
          <div><h3 className="font-serif text-2xl text-marfim md:text-3xl">Desenvolvimento sob medida</h3>
            <p className="t-body mt-2">Além do sistema integrado, desenvolvemos outros sistemas, aplicativos e ferramentas digitais personalizados. Funcionalidades e integrações são definidas após análise da necessidade e viabilidade técnica.</p></div>
        </div>
        <Btn href={whatsappLink("Olá! Vim pelo site da Vittori e gostaria de avaliar um projeto de desenvolvimento de sistema ou aplicativo.")} variant="secondary">Avaliar meu projeto</Btn>
      </aside>
      <div className="mt-7"><Btn href={henriqueLink()} variant="link">Conversar sobre as soluções da Inteligência</Btn></div>
    </div>
  </section>;
}
