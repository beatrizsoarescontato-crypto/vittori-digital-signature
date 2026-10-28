import bsb from "@/assets/portfolio/bsb-limpeza.jpg.asset.json";

export type Projeto = {
  nome: string;
  tipo: string;
  resumo: string;
  url?: string;
  imagem?: string;
  status?: string;
};

/** Só projetos reais feitos pela Vittori. Sem números ou resultados inventados. */
export const PROJETOS: Projeto[] = [
  {
    nome: "BSB Limpeza",
    tipo: "Site de conversão",
    resumo: "Higienização de estofados em Brasília. Pedido montado no site e enviado pronto para o WhatsApp.",
    url: "https://shine-bright-site-81.lovable.app",
    imagem: bsb.url,
  },
  {
    nome: "Roberta Acioly",
    tipo: "Página de campanha",
    resumo: "Pré-candidatura a Deputada Federal por Roraima. A força que cuida.",
    url: "https://roberta-cuida-roraima.lovable.app",
    status: "Em breve no ar",
  },
  {
    nome: "Professora Adayane Pimentel",
    tipo: "Página pessoal",
    resumo: "Página de apresentação com contato direto pelo WhatsApp.",
    status: "Em publicação",
  },
];
