# Vittori: plano de correção (versão 2)

## O que o seu documento muda no site atual

Hoje o site tem coisas inventadas que o documento proíbe:

- Números falsos nos contadores do topo.
- Depoimentos falsos.
- Portfólio fictício com imagens geradas por IA (será trocado pelas suas fotos reais).
- E-mail, telefone e domínio falsos (vittori.house).
- Serviços errados: o correto são as 6 linhas Presença, Performance, Estúdio, Digital, Campanha e Inteligência.
- Textos com travessão e frases genéricas.
- O "V" 3D deve ser bordô com aresta dourada, só na abertura.

## Decisões já tomadas

- **Localização**: "Brasília/DF. Atendemos todo o Brasil e o exterior."
- **Domínio**: vittoricreativehouse.com.br (já é seu).
- **Henrique (Inteligência)**: sem agenda online. Todo lead de Inteligência vai direto para o WhatsApp dele, com a mensagem pronta do produto.
- **Agendas da Vittori**: em vez do Cal.com, usar a **Agenda de horários do Google Calendar** (grátis com uma conta Google, gera o link do Google Meet automaticamente). Três links:
  - Diagnóstico Vittori, 40 min: faixa A, campanha política, serviços misturados
  - Conversa inicial, 20 min: faixa B
  - Conversa de projeto, 20 min: só projetos (site, vídeo, evento, identidade)
  - Faixa C: página de obrigado, você responde depois pelo WhatsApp.
- **Área interna**: é um painel com login só seu (e de quem você der acesso de administrador) para ver as triagens, os briefings e os dados de contratação que os clientes enviarem. Clientes não entram nele.
- **Material de estudo**: textos das seções 7.1 a 7.7 do documento (todas as 6 linhas). Os arquivos 07 (Playbook), 11 (Apresentação Inteligência) e 12 (One-pagers) não vieram no pacote.
- **Enquanto faltar algo**: uso espaços reservados discretos (logo em texto, sem Instagram, sem Pixel). Nada inventado.

## Etapas

1. **Site e serviços**: home nova com os textos exatos, 6 páginas de serviço, 3 páginas dos produtos de Inteligência, botões de WhatsApp da Vittori e do Henrique, portfólio com suas fotos reais.
2. **Triagem /comece**: 9 telas, pontuação no servidor (usando os mínimos da sua tabela de preços), PDF por e-mail, direcionamento para a agenda certa ou para o WhatsApp do Henrique.
3. **Contratação e briefing**: CNPJ e CEP automáticos, envio de arquivos, senhas guardadas criptografadas, PDF do briefing.
4. **Segurança e legal**: Privacidade, Cookies e Termos, banner de cookies, proteção anti-robô, painel interno com login, teste em todos os tamanhos de tela.

## O que ainda falta você mandar

- [ ] **Fotos do portfólio**: não chegaram neste envio (só vieram o pacote zip, o brandbook em PDF e um HTML). Pode reenviar, 10 por vez.
- [ ] **Tabela de preços**: também não chegou. Preciso dela para os valores mínimos da triagem (ela não aparece no site).
- [ ] Arquivos 07, 11 e 12 (opcional, para aprofundar os textos).
- [ ] Os 3 links da Agenda de horários do Google (te passo o passo a passo quando chegar na etapa 2).
- [ ] Depois: e-mail oficial, @ do Instagram, logo e monograma em SVG, IDs do Pixel e do GA4, e-mail de acesso do Google Ads e ID do Gerenciador de Negócios.

**Sobre o painel do domínio**: não me mande e-mail e senha. Quando for publicar, você conecta o domínio nas configurações do projeto (o próprio Lovable mostra os registros e, na maioria das vezes, configura sozinho). Para os e-mails não caírem no spam, eu te passo os registros prontos para colar.

## Detalhes técnicos

- Rotas por arquivo em `src/routes/` (servicos/*, comece, contratacao, briefing, privacidade, cookies, termos, admin).
- Lovable Cloud para banco, arquivos privados, login do painel e e-mails; server functions no lugar das Edge Functions; RLS e papel de admin em tabela separada.
- Anti-robô: honeypot + limite por IP (Turnstile opcional depois).
- Links de agenda como configuração pública; Pixel/GA4 só após consentimento.
- Remover `src/assets/portfolio-*.jpg`, `atmosphere.jpg` e o JSON-LD falso.

## Ordem

Começo pela etapa 1 assim que aprovar. As fotos entram quando você reenviar.
