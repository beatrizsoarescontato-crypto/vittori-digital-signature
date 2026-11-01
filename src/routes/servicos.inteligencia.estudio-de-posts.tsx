import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";
import { Bloco, Lista, Passos, PageHero } from "@/components/servicos/ServicePage";
import { Btn, Faq } from "@/components/site/ui";
import { demonstracaoLink } from "@/content/inteligencia";
import { ContratacaoInteligencia } from "@/components/servicos/InteligenciaProduto";

const T = "Estúdio de Posts Modelados · Vittori Inteligência";
const D = "Um sistema que analisa referências e gera conteúdos adaptados à identidade da sua marca, permitindo criar publicações sem contratação individual por peça.";
export const Route = createFileRoute("/servicos/inteligencia/estudio-de-posts")({
  head:()=>({meta:[{title:T},{name:"description",content:D},{property:"og:title",content:T},{property:"og:description",content:D},{property:"og:type",content:"website"},{name:"twitter:card",content:"summary_large_image"}]}),
  component:Page,
});
function Page(){return <SiteShell>
  <PageHero eyebrow="Vittori Inteligência · Estúdio de Posts Modelados" titulo="Referências relevantes. Conteúdo com a sua identidade." texto={D}/>
  <Bloco titulo="Como funciona"><ol className="grid gap-6 md:grid-cols-2">{[
    { titulo: "Análise de referências", texto: "O sistema analisa referências, formatos e estruturas de conteúdo relevantes para o mercado configurado." },
    { titulo: "Adaptação à marca", texto: "O sistema considera a identidade, a linguagem, o público e as informações do negócio para adaptar as propostas de conteúdo." },
    { titulo: "Geração de conteúdos", texto: "O sistema gera conteúdos conforme as funcionalidades configuradas, permitindo criar publicações sem contratação individual por peça." },
    { titulo: "Análise e evolução", texto: "Quando conectado aos indicadores previstos no projeto, o sistema pode utilizar essas informações para orientar novas sugestões e aprimoramentos." },
  ].map((item, i) => <li key={item.titulo} className="reveal-item border-l border-dourado/50 pl-5"><span className="font-serif text-3xl text-dourado-claro">0{i + 1}</span><h3 className="mt-2 font-serif text-2xl text-marfim">{item.titulo}</h3><p className="t-body mt-2">{item.texto}</p></li>)}</ol></Bloco>
  <Bloco titulo="Formatos e possibilidades"><Lista colunas itens={[
    "Artes estáticas e carrosséis",
    "Roteiros e conteúdos para vídeos curtos",
    "Geração de artes, conteúdos e formatos personalizados conforme as funcionalidades configuradas",
    "Automação de respostas a comentários quando tecnicamente viável e contratada",
    "Adaptação integral da linguagem e dos materiais à identidade do cliente",
    "Acompanhamento de desempenho conforme o escopo contratado",
  ]}/></Bloco>
  <Bloco titulo="Perguntas frequentes" layout="faq"><Faq itens={[
    {q:"Modelar é copiar outro conteúdo?",a:"Não. As referências orientam formatos e estrutura; arte, texto e abordagem são desenvolvidos para a sua marca, respeitando os direitos de terceiros."},
    {q:"O Estúdio de Posts é vendido por quantidade de publicações?",a:"Não. A contratação é do sistema, que permite gerar conteúdos sem cobrança por peça. A configuração, as funcionalidades e a modalidade de acompanhamento são definidas no projeto."},
    {q:"Os posts vão ao ar automaticamente?",a:"A publicação depende das aprovações e das permissões acordadas para o projeto."},
  ]}/></Bloco>
  <ContratacaoInteligencia slug="estudio-de-posts"/>
  <section data-stage-section="left" className="internal-page reading-veil finale-glow py-14 md:py-20"><div data-stage-zone="reading" className="mx-auto max-w-[1440px] px-6 md:px-12"><h2 className="section-heading mb-6">Vamos planejar o seu conteúdo?</h2><Btn href={demonstracaoLink("estudio-de-posts")}>Agendar uma demonstração</Btn></div></section>
</SiteShell>}
