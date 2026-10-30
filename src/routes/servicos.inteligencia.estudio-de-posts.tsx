import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";
import { Bloco, Lista, Passos, PageHero } from "@/components/servicos/ServicePage";
import { Btn, Faq } from "@/components/site/ui";
import { henriqueLink } from "@/lib/contato";

const T = "Estúdio de Posts Modelados · Vittori Inteligência";
const D = "Criamos conteúdos a partir de referências e formatos relevantes para o seu mercado, com linguagem, design e abordagem próprios da sua marca.";
export const Route = createFileRoute("/servicos/inteligencia/estudio-de-posts")({
  head:()=>({meta:[{title:T},{name:"description",content:D},{property:"og:title",content:T},{property:"og:description",content:D},{property:"og:type",content:"website"},{name:"twitter:card",content:"summary_large_image"}]}),
  component:Page,
});
function Page(){return <SiteShell>
  <PageHero eyebrow="Vittori Inteligência · Estúdio de Posts Modelados" titulo="Referências relevantes. Conteúdo com a sua identidade." texto={D}/>
  <Bloco titulo="Como funciona"><Passos itens={[
    "Pesquisamos referências e estruturas de conteúdo relevantes para seu mercado.",
    "Adaptamos a abordagem à identidade, ao público e às informações do seu negócio.",
    "Criamos as peças e apresentamos para aprovação antes da publicação.",
    "Avaliamos os indicadores disponíveis para orientar os próximos conteúdos.",
  ]}/></Bloco>
  <Bloco titulo="Formatos e possibilidades"><Lista colunas itens={[
    "Artes estáticas e carrosséis",
    "Roteiros e conteúdos para vídeos curtos",
    "Produção por peça ou em lotes, de acordo com a proposta",
    "Automação de respostas a comentários quando tecnicamente viável e contratada",
    "Adaptação integral da linguagem e dos materiais à identidade do cliente",
    "Acompanhamento de desempenho conforme o escopo contratado",
  ]}/></Bloco>
  <Bloco titulo="Perguntas frequentes" layout="faq"><Faq itens={[
    {q:"Modelar é copiar outro conteúdo?",a:"Não. As referências orientam formatos e estrutura; arte, texto e abordagem são desenvolvidos para a sua marca, respeitando os direitos de terceiros."},
    {q:"Posso contratar somente algumas peças?",a:"Sim. A modalidade e o volume são definidos na proposta comercial."},
    {q:"Os posts vão ao ar automaticamente?",a:"A publicação depende das aprovações e das permissões acordadas para o projeto."},
  ]}/></Bloco>
  <section data-stage-section="left" className="internal-page reading-veil finale-glow py-14 md:py-20"><div data-stage-zone="reading" className="mx-auto max-w-[1440px] px-6 md:px-12"><h2 className="section-heading mb-6">Vamos planejar o seu conteúdo?</h2><Btn href={henriqueLink("Estúdio de Posts")}>Conversar sobre o Estúdio de Posts</Btn></div></section>
</SiteShell>}
