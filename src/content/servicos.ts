/** Textos das linhas de serviço. Fonte: documento da Vittori (seções 6.3 e 7). Não inventar. */

export type Faq = { q: string; a: string };
export type Bloco = { eyebrow?: string; titulo: string; texto?: string; lista?: string[]; para?: string };
export type Card = { titulo: string; texto: string };

export type Linha = {
  slug: "presenca" | "performance" | "estudio" | "digital" | "campanha";
  linha: string;
  titulo: string;
  curta: string;
  descricao: string;
  muda?: string[];
  incluso?: string[];
  planos?: { nome: string; detalhe?: string }[];
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
    titulo: "Sua marca no ar, todo mês, do jeito certo.",
    curta:
      "A gente planeja, grava, edita, desenha e publica. Você aprova e volta a cuidar do seu negócio.",
    descricao:
      "A gente planeja, grava, edita, desenha e publica. Você aprova e volta a cuidar do seu negócio. Sem post feito às pressas, sem sumir por semanas.",
    muda: [
      "Um perfil que passa confiança antes da primeira conversa.",
      "Constância sem você pensar em post.",
      "Tempo de volta para cuidar do negócio.",
    ],
    incluso: [
      "Reunião de onboarding e diagnóstico do seu perfil",
      "Planejamento mensal com calendário de publicações",
      "Reels editados, carrosséis e posts com direção de arte",
      "Roteiro e artes para stories",
      "Captação audiovisual no mês, com a nossa equipe",
      "Relatório de métricas e leitura do que funcionou",
      "Benchmark de concorrentes e referências",
    ],
    planos: [
      { nome: "Essencial", detalhe: "3 publicações por semana, 1 captação de até 3h" },
      {
        nome: "Assinatura",
        detalhe: "Publicação dia sim, dia não, 1 captação de até 5h, roteiro diário de stories",
      },
      { nome: "Legado", detalhe: "22 publicações por mês, 2 captações, reunião quinzenal" },
    ],
    comoFunciona: [
      "Diagnóstico e perfil reformulado.",
      "Pautas do mês para você aprovar em 24h.",
      "Captação com direção.",
      "Tudo aprovado e agendado com um mês de antecedência.",
    ],
    paraQuem:
      "Para quem já é bom no que faz e sente que o Instagram não mostra isso. Profissionais liberais, clínicas, restaurantes, lojas, artistas e marcas locais que querem aparecer com constância e qualidade.",
    paraQuemNao:
      "Quem não pode gravar ao menos uma vez por mês, quem não consegue aprovar em até 48h ou quem quer seguidor comprado.",
    faq: [
      {
        q: "Preciso aparecer nos vídeos?",
        a: "Não é obrigatório, mas marca com rosto cresce mais rápido. A gente dirige e deixa você à vontade.",
      },
      { q: "Quanto tempo vou gastar?", a: "Uma gravação por mês e alguns minutos para aprovar." },
      {
        q: "Vocês respondem o direct?",
        a: "A gente interage com a comunidade. Dúvida de venda vai para o seu time, que conhece o cliente.",
      },
    ],
  },
  {
    slug: "performance",
    linha: "Vittori Performance",
    titulo: "Anúncio que traz cliente, não só curtida.",
    curta:
      "Campanhas no Meta Ads e no Google Ads para gerar conversa, agendamento, visita ou venda.",
    descricao:
      "Campanhas no Meta Ads e no Google Ads pensadas para gerar conversa no WhatsApp, agendamento, visita ou venda. Você acompanha cada real investido.",
    incluso: [
      "Estratégia de campanhas por objetivo",
      "Criação e testes de anúncios",
      "Otimização contínua de públicos, criativos e verba",
      "Relatório mensal com custo por contato e por venda",
      "Google Meu Negócio (no plano Completo)",
      "Acesso total às suas contas, os dados são seus",
    ],
    blocos: [
      {
        eyebrow: "Implementação de tráfego",
        titulo: "A base que faz o anúncio funcionar.",
        texto:
          "Antes de investir em anúncio, a estrutura precisa medir tudo. Muita agência cobra isso escondido na mensalidade ou deixa de fazer. A gente faz, documenta e entrega funcionando.",
        lista: [
          "Criação ou organização do Gerenciador de Negócios da Meta e da conta do Google Ads",
          "Verificação de domínio e configuração de pagamento",
          "Instalação do Pixel da Meta e da API de Conversões",
          "Instalação do Google Tag Manager, Google Analytics 4 e tag do Google Ads",
          "Configuração das conversões que importam (clique no WhatsApp, formulário, compra ou agendamento)",
          "Conversões aprimoradas do Google (versão Completa)",
          "Públicos salvos e de remarketing",
          "Padrão de nomes e UTMs",
          "Estrutura inicial de campanhas",
          "Teste de tudo antes do primeiro real investido e documento com o que foi feito",
        ],
      },
    ],
    cards: {
      titulo: "O anúncio é uma parte da venda.",
      texto:
        "O anúncio traz a pessoa. Quem vende é a sua oferta, o seu atendimento e a sua página. Antes de começar, a gente olha tudo isso com você.",
      itens: [
        {
          titulo: "Verba",
          texto:
            "Abaixo de R$ 30 por dia, a plataforma aprende devagar. A gente mostra o valor certo para o seu objetivo.",
        },
        {
          titulo: "Testes",
          texto:
            "As primeiras semanas são de aprendizado. É assim que se descobre o público e o criativo que vendem.",
        },
        {
          titulo: "Velocidade de resposta",
          texto:
            "Quem responde em minutos vende muito mais do que quem responde em horas. O lead esfria rápido.",
        },
        {
          titulo: "Discurso de venda",
          texto:
            "Um bom contato mal atendido vira um contato perdido. A gente ajuda a ajustar a primeira mensagem.",
        },
        {
          titulo: "Remarketing",
          texto:
            "A maioria não compra na primeira visita. Falar de novo com quem já te viu é parte da estratégia.",
        },
      ],
    },
    extra: {
      eyebrow: "Para lojas online",
      titulo: "Na loja online, o anúncio leva até a porta.",
      lista: [
        "Velocidade do site no celular",
        "Frete e prazo claros antes do checkout",
        "Compra sem cadastro obrigatório",
        "Carrinho abandonado recuperado por e-mail e WhatsApp",
        "Upsell e e-mail marketing para quem já comprou",
      ],
      texto: "Se algum desses pontos falhar, a gente avisa antes de investir.",
    },
    paraQuem:
      "Negócios que já têm uma oferta clara e querem previsibilidade de clientes novos todo mês. A implementação é para quem vai começar a anunciar, quem já anunciou sem saber o que deu resultado ou quem está trocando de agência.",
    paraQuemNao:
      "Quem quer começar com menos de R$ 1.500 por mês de anúncio, quem não tem quem responda os contatos no mesmo dia ou quem espera venda garantida na primeira semana.",
    faq: [
      {
        q: "Quanto preciso investir em anúncio?",
        a: "Depende do objetivo e do custo da sua venda. Na conversa, a gente calcula com você.",
      },
      {
        q: "Em quanto tempo funciona?",
        a: "As primeiras semanas são de teste. A partir do segundo mês, a gente escala o que deu certo.",
      },
      { q: "A conta fica no meu nome?", a: "Sempre. Cartão, contas e dados são seus." },
    ],
  },
  {
    slug: "estudio",
    linha: "Vittori Estúdio",
    titulo: "Vídeo com roteiro, direção e acabamento.",
    curta: "Produções, cobertura de eventos em tempo real e gravação de cursos.",
    descricao:
      "Do roteiro ao último corte. Você chega na gravação sabendo o que vai falar e sai com conteúdo para semanas.",
    blocos: [
      {
        eyebrow: "Produção",
        titulo: "Vídeo com roteiro, direção e acabamento.",
        texto:
          "Do roteiro ao último corte. Você chega na gravação sabendo o que vai falar e sai com conteúdo para semanas.",
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
          "Enquanto o evento acontece, ele já está nos stories. No dia seguinte, o teaser. Em poucos dias, o aftermovie que vai vender a próxima edição.",
        lista: [
          "Captação com videomaker",
          "Storymaker publicando em tempo real",
          "Teaser em até 24 horas",
          "Aftermovie editado",
          "Reels de melhores momentos",
        ],
        para: "Lançamentos, inaugurações, palestras, congressos, shows, eventos corporativos e agendas de campanha.",
      },
      {
        eyebrow: "Cursos",
        titulo: "Seu conhecimento em aulas com cara de curso de verdade.",
        texto:
          "A gente organiza o roteiro das aulas, grava num só dia e entrega tudo editado, padronizado e pronto para subir na plataforma.",
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
        a: "Teaser de evento em até 24h; produções e cursos em prazos definidos no contrato.",
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
      "O Google passa a te encontrar.",
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
      { nome: "Sistemas e apps", detalhe: "Ver Vittori Inteligência" },
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
    slug: "campanha",
    linha: "Vittori Campanha",
    titulo: "Campanha com estratégia, conteúdo e imprensa num só time.",
    curta: "Da pré-campanha ao dia da eleição, com agenda acompanhada na rua.",
    descricao:
      "Da pré-campanha ao dia da eleição, um time que pensa a narrativa, produz todos os dias e acompanha a agenda na rua. Você foca no eleitor.",
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
      "Pré-candidatos, candidatos e mandatos que querem presença profissional sem montar uma equipe do zero.",
    apoio: "Campanha começa antes da campanha. Quem chega em agosto sem base, chega atrasado.",
    paraQuemNao:
      "Quem quer começar a 30 dias da eleição esperando milagre, ou quem não aceita seguir a legislação eleitoral.",
    faq: [],
  },
];

export const linhaPorSlug = (slug: string) => LINHAS.find((l) => l.slug === slug);

/** Card da sexta linha (Inteligência) para a lista da home. */
export const LINHA_INTELIGENCIA = {
  linha: "Vittori Inteligência",
  titulo: "Nenhum cliente sem resposta.",
  curta: "Atendente de IA no WhatsApp, sistemas e painéis sob medida e estúdio de posts.",
};

export const PRODUTOS_IA = [
  {
    slug: "atendente",
    to: "/servicos/inteligencia/atendente" as const,
    produto: "Atendente de IA" as const,
    nome: "Atendente de IA no WhatsApp",
    titulo: "Nenhum cliente sem resposta.",
    resumo:
      "É uma atendente no WhatsApp da sua empresa que responde na hora, com a sua tabela e as suas regras, conversa como gente, descobre o que o cliente quer e passa para o vendedor já com o resumo. Quando o vendedor entra, ela sai.",
  },
  {
    slug: "sistemas",
    to: "/servicos/inteligencia/sistemas" as const,
    produto: "Sistemas e Painéis" as const,
    nome: "Sistemas e Painéis",
    titulo: "Os números da sua empresa num lugar só.",
    resumo:
      "A gente junta os dados que estão espalhados, no CRM, nos anúncios, na loja e no ERP, num sistema feito para o seu negócio. Atualiza sozinho e mostra de onde vem o cliente, quanto ele custa, quem vende e onde está a margem.",
  },
  {
    slug: "estudio-de-posts",
    to: "/servicos/inteligencia/estudio-de-posts" as const,
    produto: "Estúdio de Posts" as const,
    nome: "Estúdio de Posts Modelados",
    titulo: "O que já funciona, com a cara da sua marca.",
    resumo:
      "A gente pega os posts que mais dão resultado no seu mercado, aqui e lá fora, e refaz com a sua marca. Sai reels, carrossel e estático prontos, com a automação de quem comenta e um placar do que funcionou.",
  },
];
