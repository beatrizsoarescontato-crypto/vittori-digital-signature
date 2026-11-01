import { Bloco } from "./ServicePage";
import { CONTRATACAO_IA, RECORRENCIA_IA, type ProdutoSlug } from "@/content/inteligencia";

export function ContratacaoInteligencia({ slug }: { slug: ProdutoSlug }) {
  return <Bloco titulo="Contratação" layout="comparativo">
    <dl className="grid gap-6 md:grid-cols-2">
      <div className="reveal-item border-t border-dourado/40 pt-5">
        <dt className="font-serif text-2xl text-marfim">Implantação do sistema</dt>
        <dd className="t-body mt-3">{CONTRATACAO_IA[slug].implantacao}</dd>
      </div>
      <div className="reveal-item border-t border-dourado/40 pt-5">
        <dt className="font-serif text-2xl text-marfim">Implantação + Recorrência</dt>
        <dd className="t-body mt-3">{RECORRENCIA_IA}</dd>
      </div>
    </dl>
    <p className="reveal-item t-meta mt-6">Personalizações são definidas conforme as necessidades do cliente, o escopo aprovado e a viabilidade técnica. Recursos, suporte, manutenção e melhorias dependem do contrato.</p>
    {slug === "estudio-de-posts" && <p className="reveal-item t-body mt-4">A recorrência refere-se ao acompanhamento do sistema, não à contratação mensal de posts produzidos manualmente pela Vittori.</p>}
  </Bloco>;
}

export function FuncionalidadesInteligencia({ itens }: { itens: { titulo: string; texto: string }[] }) {
  return <dl className="grid gap-x-8 md:grid-cols-2">
    {itens.map(item => <div key={item.titulo} className="reveal-item border-t border-border/50 py-4">
      <dt className="font-serif text-2xl text-dourado-claro">{item.titulo}</dt>
      <dd className="t-body mt-2">{item.texto}</dd>
    </div>)}
  </dl>;
}