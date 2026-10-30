/** Textos das linhas de serviço. Fonte: documento da Vittori (seções 6.3 e 7). Não inventar. */

export type Faq = { q: string; a: string };
export type Bloco = { eyebrow?: string; titulo: string; texto?: string; lista?: string[]; para?: string; grupos?: { titulo: string; texto: string }[] };
export type Card = { titulo: string; texto: string };
export type Plano = { nome: string; detalhe?: string; resumo?: string; publicacoes?: number; reels?: number; duracaoReelSegundos?: number; quantidadeCaptacoes?: number; horasPorCaptacao?: number; directsPorDiaUtil?: number; captacoes?: string; diferenciais?: string[]; destaque?: boolean };

export type Linha = {
  slug: "presenca" | "performance" | "estudio" | "digital" | "identidade" | "campanha";
  cta?: string;
  linha: string;
  titulo: string;
  curta: string;
  descricao: string;
  muda?: string[];
  incluso?: string[];
  planos?: Plano[];
  blocos?: Bloco[];
  cards?: { titulo: string; texto: string; itens: Card[] };
  extra?: Bloco;
  comoFunciona?: string[];
  paraQuem?: string;
  paraQuemNao?: string;
  apoio?: string;
  faq: Faq[];
};

export const LINHAS: Linha[] = [
  {
    slug: "presenca",
    linha: "Vittori Presença",
    titulo: "Sua marca merece mais do que publicações improvisadas.",
    curta: "Planejamento, conteúdo e produção audiovisual para uma presença profissional e consistente.",
    descricao: "Planejamos, produzimos e gerenciamos sua presença nas redes sociais, unindo estratégia, direção criativa e produção audiovisual para que sua comunicação acompanhe a qualidade do seu trabalho.",
    muda: [
      "Um perfil organizado e alinhado à qualidade do seu negócio.",
      "Conteúdo planejado com direção criativa e constância.",
      "Mais tempo para cuidar do seu trabalho enquanto a comunicação acontece.",
    ],
    incluso: [
      "Diagnóstico, organização inicial da bio e do link do perfil",
      "Organização dos destaques e criação ou padronização das capas",
      "Planejamento editorial, calendário e aprovação de pautas",
      "Roteiros, legendas e direção de arte",
      "Produção e edição dos formatos previstos no plano, incluindo capas dos Reels",
      "Publicação do conteúdo e relatório mensal de métricas",
      "Stories planejados conforme a estratégia, o calendário e os materiais disponíveis",
    ],
    planos: [
      { nome: "Essencial", resumo: "Sua marca presente, organizada e consistente.", detalhe: "Para uma comunicação profissional com produção audiovisual enxuta.", publicacoes: 12, reels: 2, duracaoReelSegundos: 60, quantidadeCaptacoes: 1, horasPorCaptacao: 2, directsPorDiaUtil: 0, captacoes: "1 captação de até 2h", diferenciais: ["Reunião mensal", "Organização inicial do perfil incluída"] },
      { nome: "Assinatura", resumo: "Mais conteúdo. Mais vídeo. Mais presença.", detalhe: "Para ampliar a frequência de publicações e a capacidade de produção audiovisual.", publicacoes: 16, reels: 4, duracaoReelSegundos: 60, quantidadeCaptacoes: 1, horasPorCaptacao: 5, directsPorDiaUtil: 0, captacoes: "1 captação de até 5h", diferenciais: ["Reunião mensal", "Organização inicial do perfil incluída"], destaque: true },
      { nome: "Legado", resumo: "Da produção ao relacionamento com seu público.", detalhe: "Maior volume audiovisual, duas sessões de captação e atendimento inicial por Direct.", publicacoes: 22, reels: 8, duracaoReelSegundos: 60, quantidadeCaptacoes: 2, horasPorCaptacao: 5, directsPorDiaUtil: 2, captacoes: "2 captações de até 5h cada", diferenciais: ["Reunião quinzenal", "Gestão de Directs: duas verificações por dia útil", "Organização inicial do perfil incluída"] },
    ],
    comoFunciona: [
      "Diagnóstico e organização inicial do perfil.",
      "Planejamento editorial e calendário para sua aprovação.",
      "Captação, criação, edição e publicação do conteúdo contratado.",
      "Relatório e ajustes conforme o planejamento.",
    ],
    faq: [
      { q: "Os Reels estão incluídos nas publicações?", a: "Sim. Os limites de Reels fazem parte do total mensal de 12, 16 ou 22 publicações. Cada Reel tem até 60 segundos, com capa incluída. Os demais formatos são distribuídos conforme o calendário aprovado." },
      { q: "Preciso aparecer nos vídeos?", a: "Não. A captação pode envolver produtos, espaços, equipe e outros formatos adequados ao seu negócio. Apresentadores e modelos podem ser orçados à parte quando necessários." },
      { q: "Como funcionam os Stories?", a: "São planejados conforme a estratégia e os materiais disponíveis. O escopo aprovado não inclui produção ilimitada sob demanda, e o atendimento de Directs é um serviço separado." },
      { q: "As captações podem ser acumuladas?", a: "Não. Cada captação vale para o mês contratado, dentro da duração do plano. No Legado são duas sessões independentes, não uma diária de dez horas. Não podem ser transferidas ou utilizadas para eventos, cursos e outros projetos fora do conteúdo dos canais contratados." },
      { q: "Vocês respondem o Direct?", a: "A Gestão de Directs está incluída somente no Legado: duas verificações por dia útil, em horários definidos. Respondemos dúvidas iniciais conforme roteiro aprovado e encaminhamos negociações, fechamento de vendas, reclamações complexas e demais demandas à sua equipe. Não é atendimento em tempo real." },
    ],
  },
  {
    slug: "performance",
    linha: "Vittori Performance",
    titulo: "Sua estrutura pronta. Suas campanhas sob direção.",
    curta: "Implementação técnica e gestão de Meta Ads e Google Ads, com estratégia e mensuração.",
    descricao: "Organizamos a estrutura necessária para anunciar e desenvolvemos campanhas com planejamento, mensuração e acompanhamento. Cada decisão parte dos objetivos e das necessidades reais do seu negócio.",
    blocos: [
      { eyebrow: "Serviço pontual · Implementação de Tráfego", titulo: "Antes de investir em anúncios, prepare a estrutura.", texto: "Organizamos as contas, os acessos e as ferramentas técnicas necessárias para anunciar no Meta Ads e/ou Google Ads, conforme a necessidade do projeto. Uma entrega pontual para deixar a operação preparada, com configurações verificadas e documentação do trabalho realizado.", para: "Pagamento único. Não inclui gestão recorrente de campanhas.", grupos: [
        { titulo: "Contas", texto: "Organização ou configuração das contas contratadas." },
        { titulo: "Acessos", texto: "Permissões, vínculos e verificações pertinentes, incluindo domínio quando necessário." },
        { titulo: "Mensuração", texto: "Meta Pixel, Google tag, Tag Manager, GA4 e ferramentas aplicáveis conforme o projeto." },
        { titulo: "Rastreamento", texto: "Eventos relevantes, como contatos, formulários, compras e agendamentos, quando viáveis." },
        { titulo: "Públicos", texto: "Estruturação inicial de públicos e remarketing quando pertinente." },
        { titulo: "Campanhas", texto: "Preparação da estrutura inicial para ativação." },
        { titulo: "Validação", texto: "Testes técnicos das configurações e dos eventos quando aplicáveis." },
        { titulo: "Entrega", texto: "Resumo documentado das configurações e eventuais pendências." },
      ]},
      { eyebrow: "Serviço recorrente · Gestão de Tráfego Pago", titulo: "Campanhas com direção. Investimento com estratégia.", texto: "Planejamos, configuramos, acompanhamos e otimizamos campanhas no Meta Ads e/ou Google Ads, com objetivos definidos, análise de indicadores e ajustes recorrentes.", para: "Serviço recorrente. A implementação técnica inicial necessária ao escopo contratado já está incluída.", lista: [
        "Diagnóstico e definição de objetivos",
        "Planejamento estratégico",
        "Implementação inicial necessária",
        "Criação e gestão de campanhas",
        "Testes de anúncios e públicos",
        "Otimização recorrente",
        "Análise de resultados",
        "Relatório mensal",
      ]},
    ],
    planos: [
      { nome: "Gestão Direcionada", resumo: "Uma plataforma. Uma estratégia bem direcionada.", detalhe: "Gestão recorrente em Meta Ads ou Google Ads. Inclui as entregas comuns, com acompanhamento e análise da plataforma contratada." },
      { nome: "Gestão Integrada", resumo: "Dois canais. Uma estratégia coordenada.", detalhe: "Gestão recorrente em Meta Ads e Google Ads, com planejamento coordenado e leitura integrada dos resultados. Inclui as entregas comuns, aplicadas às duas plataformas contratadas." },
    ],
    extra: { eyebrow: "Observação comercial", titulo: "Condições da contratação.", texto: "A implementação inicial necessária está incluída na Gestão contratada. A verba de mídia é paga diretamente pelo cliente às plataformas. Sites, produções audiovisuais e integrações extraordinárias possuem escopo e orçamento próprios." },
    comoFunciona: ["Diagnóstico do negócio e definição do objetivo.", "Configuração ou validação da estrutura de anúncios.", "Ativação e acompanhamento das campanhas contratadas.", "Análise de indicadores e otimizações conforme os dados."],
    faq: [
      { q: "Posso contratar somente a implementação?", a: "Sim. É um projeto pontual de organização e preparação técnica. Não inclui a gestão recorrente das campanhas." },
      { q: "A implementação está incluída na gestão?", a: "Sim. A implementação inicial necessária às plataformas e campanhas previstas na gestão contratada está inclusa. Desenvolvimento de sites, integrações extraordinárias e produção audiovisual complexa têm escopo próprio." },
      { q: "Quanto preciso investir em anúncios?", a: "Depende dos objetivos, segmento e capacidade de atendimento. Definimos a verba recomendada durante o diagnóstico. O investimento é pago diretamente à plataforma e não integra os honorários da agência." },
      { q: "Vocês garantem vendas?", a: "Não. Planejamos, acompanhamos e otimizamos campanhas, mas os resultados dependem também da oferta, do mercado, do site e do atendimento da empresa." },
      { q: "A conta fica no meu nome?", a: "Sim. As contas e os dados permanecem sob a titularidade do cliente, conforme as permissões acordadas." },
    ],
  },
  {
    slug: "estudio",
    linha: "Vittori Estúdio",
    titulo: "Vídeo com roteiro, direção e acabamento.",
    curta: "Produções, cobertura de eventos em tempo real e gravação de cursos.",
    descricao:
      "Da ideia à entrega final, criamos vídeos com roteiro, direção, captação e edição. Produção de conteúdo, cobertura de eventos e cursos com planejamento e acabamento profissional.",
    blocos: [
      {
        eyebrow: "Produção",
        titulo: "Vídeo com roteiro, direção e acabamento.",
        texto:
          "Da ideia à entrega final, criamos vídeos com roteiro, direção, captação e edição. Produção de conteúdo, cobertura de eventos e cursos com planejamento e acabamento profissional.",
        lista: [
          "Roteiros alinhados ao seu objetivo",
          "Direção na hora da gravação",
          "Captação com equipamento profissional de vídeo e áudio",
          "Edição com legendas, trilha e correção de cor",
          "Reels prontos e, na versão Completa, um vídeo horizontal",
        ],
      },
      {
        eyebrow: "Cobertura de eventos e Real Time",
        titulo: "Seu evento acontecendo também no digital.",
        texto:
          "Captamos os momentos mais importantes e produzimos conteúdo durante o evento conforme o escopo contratado. Formatos e prazos de entrega são definidos no planejamento.",
        lista: [
          "Captação com videomaker",
          "Storymaker publicando em tempo real",
          "Teaser conforme o cronograma contratado",
          "Aftermovie editado",
          "Reels de melhores momentos",
        ],
        para: "Lançamentos, inaugurações, palestras, congressos, shows, eventos corporativos e agendas de campanha.",
      },
      {
        eyebrow: "Cursos",
        titulo: "Seu conhecimento em aulas com cara de curso de verdade.",
        texto:
          "Planejamos a estrutura das aulas, organizamos a captação e cuidamos da edição e padronização visual. O número de diárias e o cronograma são definidos conforme a dimensão do curso.",
        lista: [
          "Planejamento da sequência de aulas",
          "Diária de gravação com direção",
          "Edição com cortes, legendas, vinheta e padrão visual",
          "Edição de aulas que você já gravou",
        ],
        para: "Especialistas, mentores, clínicas e empresas que querem vender ou treinar com cursos gravados.",
      },
    ],
    comoFunciona: [
      "Briefing e roteiro.",
      "Ordem do dia aprovada.",
      "Gravação com direção.",
      "Entrega nos prazos combinados.",
    ],
    faq: [
      { q: "Vocês gravam fora de Brasília?", a: "Sim, com deslocamento à parte." },
      {
        q: "Em quanto tempo recebo?",
        a: "Formatos, número de peças e prazos são definidos de acordo com a dimensão da produção e registrados na proposta.",
      },
      {
        q: "O vídeo bruto é meu?",
        a: "Você recebe todos os vídeos finais. Material bruto pode ser contratado à parte.",
      },
    ],
  },
  {
    slug: "digital",
    linha: "Vittori Digital",
    titulo: "Um site que trabalha enquanto você atende.",
    curta: "Sites e landing pages rápidos, bonitos no celular e feitos para gerar contato.",
    descricao:
      "Rápido, bonito no celular e feito para transformar visita em contato. Texto, design e estrutura pensados juntos.",
    muda: [
      "Uma estrutura mais preparada para ser encontrada nos buscadores.",
      "O anúncio tem para onde levar.",
      "O cliente entende o que você faz em 5 segundos.",
    ],
    incluso: [
      "Estrutura e textos orientados à conversão",
      "Design alinhado à sua marca",
      "Botões de WhatsApp e formulários conectados",
      "Configuração de domínio, SEO básico e Analytics",
      "Treinamento rápido para você editar o essencial",
      "Cuidado Mensal opcional (atualizações, backup e ajustes)",
    ],
    planos: [
      { nome: "Landing Page" },
      { nome: "Site Essencial", detalhe: "Até 5 páginas" },
      { nome: "Site Institucional", detalhe: "Até 10 páginas, blog e SEO básico" },
      { nome: "Sistemas e aplicativos", detalhe: "Desenvolvimento de soluções sob medida, mediante avaliação do projeto" },
    ],
    paraQuem:
      "Quem ainda depende só do Instagram, quem tem um site antigo que não traz contato e quem vai anunciar e precisa de uma página que converta.",
    faq: [
      { q: "Eu consigo editar depois?", a: "Sim, o essencial. A gente ensina." },
      { q: "O domínio fica no meu nome?", a: "Sempre." },
      {
        q: "E depois que o site fica pronto?",
        a: "O Cuidado Mensal mantém tudo atualizado, seguro e com backup.",
      },
    ],
  },
  {
    slug: "identidade",
    linha: "Vittori Identidade",
    titulo: "A primeira impressão é a marca.",
    curta: "Logo, identidade visual completa, rebranding e perfil organizado.",
    descricao:
      "Antes de ler uma palavra, o cliente já decidiu se você parece caro, confiável ou amador. A gente cria a marca que mostra o tamanho do seu trabalho, com estratégia antes do desenho.",
    muda: [
      "Uma marca que passa confiança antes da primeira conversa",
      "Tudo com a mesma cara, do Instagram ao cartão",
      "Você para de improvisar arte",
    ],
    cards: {
      titulo: "Opções",
      texto: "Do perfil organizado ao rebranding completo.",
      itens: [
        { titulo: "Kit Perfil", texto: "Para quem já tem marca e quer o perfil organizado. Bio, orientação de foto, capas de destaques e templates de post e stories." },
        { titulo: "Logo", texto: "Logo principal e variações, em PNG, PDF e vetor." },
        { titulo: "Identidade Visual", texto: "Logo e variações, paleta de cores, tipografia, guia de marca e kit para redes sociais." },
        { titulo: "Identidade Completa", texto: "O rebranding. Diagnóstico da marca atual, pesquisa de concorrência, dois conceitos, manual completo e papelaria digital." },
      ],
    },
    comoFunciona: [
      "Questionário de marca e referências",
      "Conceito apresentado em reunião",
      "Até duas rodadas de ajuste",
      "Arquivos finais entregues",
    ],
    paraQuem:
      "Quem está abrindo o negócio, quem cresceu e a marca ficou pequena, quem vai começar a anunciar e precisa parecer à altura.",
    paraQuemNao: "Quem quer um logo pronto em um dia ou uma cópia da marca de outra empresa.",
    apoio: "Marca nova pede perfil novo. Combine com a Vittori Presença e lance a marca já com conteúdo.",
    cta: "Quero uma marca à altura",
    faq: [
      { q: "Os arquivos são meus?", a: "Sim. Depois da quitação, você recebe os arquivos finais e os direitos de uso." },
      { q: "Vocês registram a marca no INPI?", a: "O registro não está incluso, mas orientamos o caminho e recomendamos fazer a pesquisa antes." },
      { q: "Em quanto tempo fica pronto?", a: "Kit Perfil em até 7 dias úteis, logo em até 10 e identidade visual de 15 a 20 dias úteis." },
    ],
  },
  {
    slug: "campanha",
    linha: "Vittori Campanha",
    titulo: "Campanha com estratégia, conteúdo e imprensa num só time.",
    curta: "Da pré-campanha ao dia da eleição, com agenda acompanhada na rua.",
    descricao:
      "Planejamento de narrativa, comunicação e conteúdo para pré-campanhas, campanhas e mandatos. A equipe, o acompanhamento de agenda e a produção são definidos conforme o projeto contratado.",
    incluso: [
      "Estratégia, posicionamento e calendário político",
      "Social media diário, com volume e prazos de entrega definidos conforme o tamanho da equipe contratada",
      "Storymaker acompanhando as agendas",
      "Produções com roteiro",
      "Editor de vídeo dedicado (Campanha Completa)",
      "Assessoria de imprensa (releases, relação com veículos e agenda de entrevistas)",
      "Site ou página do candidato",
      "Gestão de impulsionamento e monitoramento de menções",
    ],
    planos: [
      { nome: "Pré-campanha e Mandato" },
      { nome: "Campanha Essencial" },
      { nome: "Campanha Completa" },
    ],
    paraQuem:
      "Pré-candidaturas, campanhas e mandatos que precisam de comunicação planejada e produção estruturada.",
    apoio: "Campanha começa antes da campanha. Quem chega em agosto sem base, chega atrasado.",
    paraQuemNao:
      "O escopo, as entregas e os procedimentos são definidos conforme a legislação aplicável e as responsabilidades de cada parte.",
    faq: [],
  },
];

export const linhaPorSlug = (slug: string) => LINHAS.find((l) => l.slug === slug);

/** Card da sexta linha (Inteligência) para a lista da home. */
export const LINHA_INTELIGENCIA = {
  linha: "Vittori Inteligência",
  titulo: "Atendimento que organiza conversas e encaminha oportunidades.",
  curta: "Atendente de IA no WhatsApp, um sistema integrado de gestão e estúdio de posts modelados.",
};

export const PRODUTOS_IA = [
  {
    slug: "atendente",
    to: "/servicos/inteligencia/atendente" as const,
    produto: "Atendente de IA" as const,
    nome: "Atendente de IA no WhatsApp",
    titulo: "Atendimento que organiza conversas e encaminha oportunidades.",
    resumo:
      "Uma atendente de IA configurada com informações e regras da sua empresa, capaz de responder dúvidas, organizar contatos e encaminhar conversas à equipe quando necessário.",
  },
  {
    slug: "sistemas",
    to: "/servicos/inteligencia/sistemas" as const,
    produto: "Sistemas e Painéis" as const,
    nome: "Sistemas e Painéis",
    titulo: "Sua operação organizada em um só lugar.",
    resumo:
      "Um sistema integrado para centralizar conversas, organizar fichas de clientes, acompanhar o funil comercial, visualizar agendas e consultar os principais indicadores da operação em uma única interface.",
  },
  {
    slug: "estudio-de-posts",
    to: "/servicos/inteligencia/estudio-de-posts" as const,
    produto: "Estúdio de Posts" as const,
    nome: "Estúdio de Posts Modelados",
    titulo: "Conteúdo modelado para a identidade da sua marca.",
    resumo:
      "Criamos conteúdos a partir de referências, formatos e estruturas relevantes para seu mercado, adaptando linguagem, design e abordagem aos objetivos da sua marca.",
  },
];
