import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";
import { Bloco, Lista, Passos, PageHero } from "@/components/servicos/ServicePage";
import { Btn, Faq } from "@/components/site/ui";
import { whatsappLink } from "@/lib/contato";
import { demonstracaoLink } from "@/content/inteligencia";
import { ContratacaoInteligencia, FuncionalidadesInteligencia } from "@/components/servicos/InteligenciaProduto";

const T = "Sistemas e Painéis · Vittori Inteligência";
const D = "O Sistemas e Painéis reúne em um único ambiente as informações essenciais para acompanhar e gerenciar seu negócio. Visualize atendimentos, conversas do WhatsApp, dados de clientes, funil comercial, agendas, indicadores de tráfego pago e outras áreas da operação, com informações atualizadas conforme as integrações configuradas.";
export const Route = createFileRoute("/servicos/inteligencia/sistemas")({
  head: () => ({meta:[{title:T},{name:"description",content:D},{property:"og:title",content:T},{property:"og:description",content:D},{property:"og:type",content:"website"},{name:"twitter:card",content:"summary_large_image"}]}),
  component: Page,
});
function Page() {
  return <SiteShell>
    <PageHero eyebrow="Vittori Inteligência · Sistemas e Painéis" titulo="Sua operação inteira. Uma visão unificada." texto={D}>
      <p className="t-body max-w-2xl">Mais visibilidade sobre o que acontece, menos ferramentas desconectadas e uma gestão orientada por informações acessíveis em um só lugar.</p>
    </PageHero>
    <Bloco titulo="O que faz parte do sistema integrado"><FuncionalidadesInteligencia itens={[
      { titulo: "Atendimentos e conversas", texto: "Acompanhe em tempo real as conversas e o andamento dos atendimentos do WhatsApp da empresa, por meio da integração habilitada." },
      { titulo: "Clientes e contatos", texto: "Consulte fichas de clientes, históricos, informações relevantes e registros de relacionamento." },
      { titulo: "Funil comercial", texto: "Visualize oportunidades, etapas de negociação e movimentações do processo comercial." },
      { titulo: "Agendas e compromissos", texto: "Acompanhe agendamentos, atividades e informações relacionadas à rotina da operação." },
      { titulo: "Tráfego pago e marketing", texto: "Acompanhe indicadores das campanhas de mídia paga, resultados e métricas disponibilizadas pelas plataformas integradas, reunidos em painéis de gestão." },
      { titulo: "Indicadores e visão gerencial", texto: "Visualize informações de diferentes áreas do negócio por meio de dashboards, relatórios e painéis configurados conforme a necessidade da empresa." },
      { titulo: "Personalização", texto: "A solução pode ser adaptada com campos, módulos, visualizações, funcionalidades e integrações específicas, de acordo com o projeto contratado." },
    ]}/></Bloco>
    <Bloco titulo="Acompanhamento unificado em tempo real" layout="explicacao">
      <p className="reveal-item t-body">Uma visão centralizada e atualizada da operação. A atualização de cada indicador depende dos recursos e da frequência de sincronização disponibilizados pela respectiva plataforma integrada. As métricas não têm atualização instantânea quando o provedor dos dados não permite isso.</p>
    </Bloco>
    <Bloco titulo="Como funciona"><Passos itens={[
      "Entendemos sua operação e definimos o escopo da implantação.",
      "Organizamos acessos, informações e fluxos relevantes.",
      "Configuramos os módulos previstos e validamos com sua equipe.",
      "Orientamos o uso e definimos os próximos passos de suporte conforme a proposta.",
    ]}/></Bloco>
    <ContratacaoInteligencia slug="sistemas"/>
    <Bloco eyebrow="Outro serviço · Projeto personalizado" titulo="Também desenvolvemos sistemas e aplicativos sob medida.">
      <p className="t-body max-w-4xl">O Sistema Integrado de Gestão é uma solução definida da Vittori. Se sua empresa precisa de outro sistema, um aplicativo ou uma integração específica, avaliamos a necessidade, as funcionalidades e a viabilidade antes de apresentar a proposta.</p>
      <div className="mt-5"><Btn href={whatsappLink("Olá! Vim pelo site da Vittori e gostaria de avaliar o desenvolvimento de um sistema ou aplicativo sob medida.")} variant="secondary">Solicitar avaliação do projeto</Btn></div>
    </Bloco>
    <Bloco titulo="Perguntas frequentes" layout="faq"><Faq itens={[
      {q:"Preciso substituir todos os sistemas que uso?",a:"Não necessariamente. A possibilidade de integração com ferramentas existentes é verificada durante a avaliação técnica."},
      {q:"Posso solicitar módulos adicionais?",a:"Sim. Funcionalidades adicionais podem ser avaliadas e orçadas conforme a necessidade."},
      {q:"O sistema e a personalização têm o mesmo preço?",a:"Não presumimos um preço único. O escopo e o investimento são apresentados após entendermos o projeto."},
    ]}/></Bloco>
    <section data-stage-section="left" className="internal-page reading-veil finale-glow py-14 md:py-20"><div data-stage-zone="reading" className="mx-auto max-w-[1440px] px-6 md:px-12"><h2 className="section-heading mb-6">Vamos organizar a sua operação?</h2><Btn href={demonstracaoLink("sistemas")}>Agendar uma demonstração</Btn></div></section>
  </SiteShell>;
}
