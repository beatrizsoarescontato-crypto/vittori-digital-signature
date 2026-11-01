import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";
import { Bloco, Lista, Passos, PageHero } from "@/components/servicos/ServicePage";
import { Btn, Faq } from "@/components/site/ui";
import { demonstracaoLink } from "@/content/inteligencia";
import { ContratacaoInteligencia, FuncionalidadesInteligencia } from "@/components/servicos/InteligenciaProduto";

const T = "Atendente de IA no WhatsApp · Vittori Inteligência";
const D = "Atendimento automatizado configurado com as informações e regras do seu negócio, para organizar conversas e encaminhar demandas à equipe.";
export const Route = createFileRoute("/servicos/inteligencia/atendente")({
  head: () => ({ meta: [{ title:T }, { name:"description", content:D }, { property:"og:title", content:T }, { property:"og:description", content:D }, { property:"og:type", content:"website" }, { name:"twitter:card", content:"summary_large_image" }] }),
  component: Page,
});
function Page() {
  return <SiteShell>
    <PageHero eyebrow="Vittori Inteligência · Atendente de IA" titulo="Atendimento organizado, sem perder o toque humano." texto={D}/>
    <Bloco titulo="Um atendimento tão natural que surpreende." layout="explicacao">
      <p className="reveal-item t-body">A Atendente de IA pode conversar de maneira fluida, compreender o contexto e adaptar sua linguagem ao negócio. Em uma experiência real de implantação, um consumidor chegou a procurar pessoalmente pela atendente no estabelecimento depois de conversar com ela pelo WhatsApp.</p>
      <p className="reveal-item t-body mt-4">É uma demonstração de como a tecnologia pode oferecer uma experiência de atendimento surpreendentemente natural, mantendo a organização e a disponibilidade de uma solução automatizada.</p>
    </Bloco>
    <Bloco titulo="Como funciona"><Passos itens={[
      "O cliente envia uma mensagem ao WhatsApp da empresa.",
      "A assistente responde dentro das regras e informações fornecidas pelo negócio.",
      "A conversa é organizada e, quando necessário, encaminhada com o contexto ao responsável.",
      "A equipe assume as negociações, decisões e situações que dependem de atendimento humano.",
    ]}/></Bloco>
    <Bloco titulo="Funcionalidades e possibilidades de personalização">
      <FuncionalidadesInteligencia itens={[
        { titulo: "Voz natural", texto: "Envio de mensagens de áudio com fala humanizada e possibilidade de seleção entre vozes disponíveis." },
        { titulo: "Memória contextual", texto: "Continuidade das conversas considerando informações anteriores, conforme as configurações." },
        { titulo: "Linguagem informal", texto: "Interpretação de expressões, brincadeiras, perguntas e diferentes maneiras de se comunicar." },
        { titulo: "Análise de imagens e vídeos", texto: "Capacidade de interpretar materiais recebidos quando os recursos correspondentes estiverem habilitados." },
        { titulo: "Personalização", texto: "Linguagem, tom, fluxos, regras de atendimento e funcionalidades configuradas de acordo com o negócio." },
        { titulo: "Encaminhamento", texto: "Transferência de situações específicas para a equipe humana quando necessário." },
      ]}/>
      <p className="reveal-item t-meta mt-4">Os recursos dependem da configuração e do escopo contratado. As possibilidades não estão automaticamente incluídas em qualquer implantação.</p>
    </Bloco>
    <ContratacaoInteligencia slug="atendente"/>
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
    <section data-stage-section="left" className="internal-page reading-veil finale-glow py-14 md:py-20"><div data-stage-zone="reading" className="mx-auto max-w-[1440px] px-6 md:px-12"><h2 className="section-heading mb-6">Vamos entender seu atendimento?</h2><Btn href={demonstracaoLink("atendente")}>Agendar uma demonstração</Btn></div></section>
  </SiteShell>;
}
