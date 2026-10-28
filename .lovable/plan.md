# Vittori: análise do material e plano de correção

## O que o seu documento muda no site atual

Hoje o site tem várias coisas inventadas que o seu documento proíbe:

- **Números falsos**: contadores do topo (anos, marcas, cidades).
- **Depoimentos falsos**: a seção inteira.
- **Portfólio falso**: 4 projetos fictícios com imagens geradas por IA (o documento proíbe imagem de IA e de banco).
- **Contatos falsos**: e-mail "contato@vittori.house", telefone (61) 99999-9999, domínio vittori.house.
- **Serviços errados**: hoje são "Estratégia de Marca, Identidade Visual..."; o correto são as 6 linhas: Presença, Performance, Estúdio, Digital, Campanha e Inteligência.
- **Textos com travessão (—)** e frases genéricas.
- **3D**: o documento pede o "V" em metal **bordô com aresta dourada**, só na abertura. Hoje ele é latão dourado e atravessa a página toda.

## O que vou construir (em 4 etapas, igual ao seu documento)

1. **Site e serviços**: home nova com os textos exatos do documento (abertura, o que a gente resolve, 6 serviços com rolagem horizontal, destaque Inteligência com conversa de WhatsApp ilustrativa, Método Vittori, pilares, para quem é); 6 páginas de serviço + 3 páginas dos produtos de Inteligência; botões de WhatsApp da Vittori e do Henrique com as mensagens prontas; prova social escondida até existir prova real.
2. **Página /comece (triagem)**: formulário em 9 telas com salvamento automático, pontuação no servidor, PDF da triagem por e-mail e agendamento pelo Cal.com.
3. **Páginas /contratacao e /briefing**: busca de CNPJ e CEP automática, envio de arquivos, senhas de acesso guardadas criptografadas, PDF do briefing por e-mail.
4. **Segurança, legal e teste final**: páginas de Privacidade, Cookies e Termos (com os seus textos), banner de cookies, proteção anti-robô, área interna da Vittori com login, testes em todos os tamanhos de tela.

Banco de dados, e-mails e área interna vão rodar no Lovable Cloud (não precisa criar conta de Supabase).

## Lista do que você precisa me mandar

**Marca**
- [ ] Logo VITTORI em SVG
- [ ] Monograma V em SVG
- [ ] Selo em SVG (se existir)

**Contato e redes**
- [ ] E-mail oficial (@vittoricreativehouse.com.br) que aparece no site
- [ ] E-mail que recebe triagens e briefings (pode ser o mesmo)
- [ ] @ do Instagram (e LinkedIn, se tiver)
- [ ] Endereço ou só "Brasília/DF"?
- [ ] Confirmar que o domínio vittoricreativehouse.com.br já é seu

**Agendamento (Cal.com)**
- [ ] Link do Henrique: "Diagnóstico Vittori Inteligência, 30 min"
- [ ] Link da Vittori: "Diagnóstico Vittori, 40 min"
- [ ] Link da Vittori: "Conversa de projeto, 20 min"
- [ ] Link usado como `VITE_CAL_INICIAL` (qual reunião é essa?)

**Anúncios e medição**
- [ ] ID do Pixel da Meta
- [ ] ID do Google Analytics 4
- [ ] ID do Gerenciador de Negócios (BM) da Vittori, para o briefing
- [ ] E-mail de acessos para o Google Ads (ou ID da conta MCC)

**E-mails**
- [ ] Acesso ao painel do domínio (registro.br/Cloudflare) para eu passar os registros que evitam spam

**Conteúdo**
- [ ] Fotos e vídeos reais da Vittori (bastidores, gravações, equipe, trabalhos). Sem isso, o site fica só com tipografia e o 3D, sem imagens.
- [ ] Cases reais, depoimentos e números reais (opcional; ficam escondidos até você mandar)
- [ ] Valores mínimos de investimento por serviço, usados na pontuação da triagem (o documento cita "mínimo de [serviço]" mas não diz quanto)
- [ ] Confirmar se o "material de estudo" sobre os produtos é o texto que já está no documento (seções 7.6 e 7.7) ou se existe outro arquivo

**Decisões**
- [ ] Quem acessa a área interna (e-mails das pessoas)
- [ ] Manter o "V" atravessando a página toda ou só na abertura, como o documento pede?

## Detalhes técnicos

- TanStack Start com rotas por arquivo em `src/routes/` (servicos/*, comece, contratacao, briefing, privacidade, cookies, termos); as "Edge Functions" do documento viram server functions; Supabase vira Lovable Cloud com RLS.
- Turnstile exige conta Cloudflare (chave secreta guardada como secret); alternativa sem conta: honeypot + limite por IP.
- Resend substituído pelo envio de e-mail do Lovable, se o domínio for verificado.
- Lenis + GSAP já cabem na stack; Three.js carregado só na abertura, com imagem estática de fallback.
- Remover `src/assets/portfolio-*.jpg` e `atmosphere.jpg` (gerados por IA) e o JSON-LD com dados falsos.

## Ordem

Começo pela etapa 1 assim que aprovar (dá para fazer quase tudo com os textos do documento, usando espaços reservados para logo e fotos). As etapas 2 a 4 dependem dos itens da lista acima.
