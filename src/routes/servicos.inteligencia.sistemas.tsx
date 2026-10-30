import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";
import { Bloco, Lista, Passos, PageHero } from "@/components/servicos/ServicePage";
import { Btn, Faq } from "@/components/site/ui";
import { henriqueLink, whatsappLink } from "@/lib/contato";

const T = "Sistemas e Painéis · Vittori Inteligência";
const D = "Sistema integrado de gestão para centralizar conversas, fichas de clientes, funil, agenda e indicadores em um só lugar.";
export const Route = createFileRoute("/servicos/inteligencia/sistemas")({
  head: () => ({meta:[{title:T},{name:"description",content:D},{property:"og:title",content:T},{property:"og:description",content:D},{property:"og:type",content:"website"},{name:"twitter:card",content:"summary_large_image"}]}),
  component: Page,
});
function Page() {
  return <SiteShell>
    <PageHero eyebrow="Vittori Inteligência · Sistemas e Painéis" titulo="Sua operação organizada em uma tela só." texto={D}/>
    <Bloco titulo="O que faz parte do sistema integrado"><Lista colunas itens={[
      "Conversas organizadas e visualização do atendimento",
      "Ficha do cliente com informações relevantes",
      "Funil comercial e acompanhamento de etapas",
      "Agenda e organização de compromissos",
      "Indicadores e painel de acompanhamento da operação",
      "Permissões e integrações conforme o escopo e a viabilidade técnica",
    ]}/></Bloco>
    <Bloco titulo="Como funciona"><Passos itens={[
      "Entendemos sua operação e definimos o escopo da implantação.",
      "Organizamos acessos, informações e fluxos relevantes.",
      "Configuramos os módulos previstos e validamos com sua equipe.",
      "Orientamos o uso e definimos os próximos passos de suporte conforme a proposta.",
    ]}/></Bloco>
    <Bloco eyebrow="Outro serviço · Projeto personalizado" titulo="Também desenvolvemos sistemas e aplicativos sob medida.">
      <p className="t-body max-w-4xl">O Sistema Integrado de Gestão é uma solução definida da Vittori. Se sua empresa precisa de outro sistema, um aplicativo ou uma integração específica, avaliamos a necessidade, as funcionalidades e a viabilidade antes de apresentar a proposta.</p>
      <div className="mt-5"><Btn href={whatsappLink("Olá! Vim pelo site da Vittori e gostaria de avaliar o desenvolvimento de um sistema ou aplicativo sob medida.")} variant="secondary">Solicitar avaliação do projeto</Btn></div>
    </Bloco>
    <Bloco titulo="Perguntas frequentes" layout="faq"><Faq itens={[
      {q:"Preciso substituir todos os sistemas que uso?",a:"Não necessariamente. A possibilidade de integração com ferramentas existentes é verificada durante a avaliação técnica."},
      {q:"Posso solicitar módulos adicionais?",a:"Sim. Funcionalidades adicionais podem ser avaliadas e orçadas conforme a necessidade."},
      {q:"O sistema e a personalização têm o mesmo preço?",a:"Não presumimos um preço único. O escopo e o investimento são apresentados após entendermos o projeto."},
    ]}/></Bloco>
    <section data-stage-section="left" className="internal-page reading-veil finale-glow py-14 md:py-20"><div data-stage-zone="reading" className="mx-auto max-w-[1440px] px-6 md:px-12"><h2 className="section-heading mb-6">Vamos organizar a sua operação?</h2><Btn href={henriqueLink("Sistemas e Painéis")}>Conversar sobre Sistemas e Painéis</Btn></div></section>
  </SiteShell>;
}
