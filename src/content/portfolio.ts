import bsb from "@/assets/portfolio/bsb-limpeza.jpg.asset.json";
import ods from "@/assets/portfolio/conferencia-ods.jpg.asset.json";
import valor from "@/assets/portfolio/valor-ambiental.jpg.asset.json";
import cactus from "@/assets/portfolio/curaca-cactus.jpg.asset.json";
import coruja from "@/assets/portfolio/curaca-coruja.jpg.asset.json";
import container from "@/assets/portfolio/valor-container.mp4.asset.json";
import caminhao from "@/assets/portfolio/valor-caminhao.mp4.asset.json";
import homenagem from "@/assets/portfolio/guilherme-feliciano.mp4.asset.json";
import containerWebm from "@/assets/portfolio/valor-container.webm.asset.json";
import caminhaoWebm from "@/assets/portfolio/valor-caminhao.webm.asset.json";
import homenagemWebm from "@/assets/portfolio/guilherme-feliciano.webm.asset.json";
import containerPoster from "@/assets/portfolio/valor-container-poster.jpg.asset.json";
import caminhaoPoster from "@/assets/portfolio/valor-caminhao-poster.jpg.asset.json";
import homenagemPoster from "@/assets/portfolio/guilherme-poster.jpg.asset.json";

export type Projeto = {
  nome: string;
  tipo: string;
  resumo: string;
  imagem?: string;
  midias?: { tipo: "foto" | "video"; src: string; alternativa?: string; alt: string; poster?: string }[];
};

/** Só projetos reais feitos pela Vittori. Sem números ou resultados inventados. */
export const PROJETOS: Projeto[] = [
  {
    nome: "BSB Limpeza",
    tipo: "Site de conversão",
    resumo: "Higienização de estofados em Brasília. Pedido montado no site e enviado pronto para o WhatsApp.",
    imagem: bsb.url,
  },
  {
    nome: "Roberta Acioly",
    tipo: "Página de campanha",
    resumo: "Pré-candidatura a Deputada Federal por Roraima. A força que cuida.",
  },
  {
    nome: "Professora Dayane Pimentel",
    tipo: "Página pessoal",
    resumo: "Coragem e trabalho pela Bahia. Página de apresentação da Professora Dayane Pimentel.",
  },
  {
    nome: "1º Conferência Nacional ODS",
    tipo: "Fotografia",
    resumo: "",
    imagem: ods.url,
    midias: [{ tipo: "foto", src: ods.url, alt: "Participantes da 1º Conferência Nacional ODS" }],
  },
  {
    nome: "Valor Ambiental",
    tipo: "Fotografia e produção audiovisual",
    resumo: "Limpeza urbana e gestão de resíduos sólidos em Brasília.",
    imagem: valor.url,
    midias: [
      { tipo: "foto", src: valor.url, alt: "Colaboradora da Valor Ambiental em Brasília" },
      { tipo: "video", src: container.url, alternativa: containerWebm.url, alt: "Produção Valor Ambiental: gestão de resíduos", poster: containerPoster.url },
      { tipo: "video", src: caminhao.url, alternativa: caminhaoWebm.url, alt: "Produção Valor Ambiental: limpeza urbana", poster: caminhaoPoster.url },
    ],
  },
  {
    nome: "Reintrodução da ararinha-azul",
    tipo: "Fotografia",
    resumo: "Curaçá, Bahia.",
    imagem: coruja.url,
    midias: [
      { tipo: "foto", src: coruja.url, alt: "Coruja fotografada no projeto em Curaçá" },
      { tipo: "foto", src: cactus.url, alt: "Cactus fotografado no projeto em Curaçá" },
    ],
  },
  {
    nome: "Homenagem a Guilherme Feliciano",
    tipo: "Produção audiovisual",
    resumo: "Vídeo em homenagem ao conselheiro Guilherme Feliciano.",
    imagem: homenagemPoster.url,
    midias: [{ tipo: "video", src: homenagem.url, alternativa: homenagemWebm.url, alt: "Homenagem ao conselheiro Guilherme Feliciano", poster: homenagemPoster.url }],
  },
];
