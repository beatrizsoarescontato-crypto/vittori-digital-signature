import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";
import { Bloco, Lista, Passos, PageHero } from "@/components/servicos/ServicePage";
import { Btn, Faq } from "@/components/site/ui";
import { henriqueLink } from "@/lib/contato";

const T = "Atendente de IA no WhatsApp · Vittori Inteligência";
const D = "Atendimento automatizado configurado com as informações e regras do seu negócio, para organizar conversas e encaminhar demandas à equipe.";
export const Route = createFileRoute("/servicos/inteligencia/atendente")({
  head: () => ({ meta: [{ title:T }, { name:"description", content:D }, { property:"og:title", content:T }, { property:"og:description", content:D }, { property:"og:type", content:"website" }, { name:"twitter:card", content:"summary_large_image" }] }),
  component: Page,
});
function Page() {
  return <SiteShell>
    <PageHero eyebrow="Vittori Inteligência · Atendente de IA" titulo="Atendimento organizado, sem perder o toque humano." texto={D}/>
    <Bloco titulo="Como funciona"><Passos itens={[
      "O cliente envia uma mensagem ao WhatsApp da empresa.",
      "A assistente responde dentro das regras e informações fornecidas pelo negócio.",
      "A conversa é organizada e, quando necessário, encaminhada com o contexto ao responsável.",
      "A equipe assume as negociações, decisões e situações que dependem de atendimento humano.",
    ]}/></Bloco>
    <Bloco titulo="O que a assistente pode fazer"><Lista colunas itens={[
      "Responder dúvidas frequentes e compartilhar informações autorizadas",
      "Organizar conversas e identificar necessidades do cliente",
      "Registrar dados relevantes para o atendimento, conforme a configuração",
      "Encaminhar conversas à equipe com um resumo da demanda",
      "Adequar linguagem, perguntas e regras ao negócio",
      "Integrar funcionalidades adicionais quando previstas e viáveis",
    ]}/></Bloco>
    <Bloco titulo="Perguntas frequentes" layout="faq"><Faq itens={[
      {q:"A IA fecha vendas sozinha?", a:"Ela presta atendimento inicial e organiza informações. Negociações, decisões comerciais e fechamento continuam sob responsabilidade da sua equipe."},
      {q:"O atendimento pode ser personalizado?", a:"Sim. Definimos linguagem, base de informações, limites da automação e situações de transferência no projeto."},
      {q:"Preciso trocar de número?", a:"A viabilidade de usar o número atual depende das condições e da configuração da plataforma do WhatsApp."},
      {q:"Como são tratados os dados?", a:"As regras de acesso, tratamento de dados e integrações devem ser definidas no projeto, observando as obrigações aplicáveis."},
    ]}/></Bloco>
    <section data-stage-section="left" className="internal-page reading-veil finale-glow py-14 md:py-20"><div data-stage-zone="reading" className="mx-auto max-w-[1440px] px-6 md:px-12"><h2 className="section-heading mb-6">Vamos entender seu atendimento?</h2><Btn href={henriqueLink("Atendente de IA")}>Conversar sobre a Atendente de IA</Btn></div></section>
  </SiteShell>;
}
