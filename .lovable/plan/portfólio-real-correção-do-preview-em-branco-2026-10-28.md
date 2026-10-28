# Portfólio real + correção do preview em branco

## 1. Preview em branco
- Abrir o site no navegador de teste (celular e computador), ler os erros da página e corrigir a causa.
- Conferir todas as páginas (início, serviços, Inteligência, contato, legais) até nenhuma ficar em branco.

## 2. Portfólio "Visão geral" com sites reais
Nova seção na página inicial e página própria `/portfolio`, com cartões de projetos que você criou:
- **BSB Limpeza** — shine-bright-site-81.lovable.app
- **Roberta Acioly** (Deputada Federal, RR) — roberta-cuida-roraima.lovable.app
- **Professora Adayane Pimentel** — professor-adayanepimentel-landing.lovable.app
- Opcionais (só se você aprovar): Caldas Consultoria, Arnone Reforma Tributária, Vastos Rosa.

Cada cartão: captura de tela real do site, nome, tipo de projeto (ex.: site institucional, página de campanha), link "Ver site". Sem números, resultados ou depoimentos inventados.

## 3. Fotos e vídeos enviados agora
- Usar as 4 fotos e os 4 vídeos onde fizerem sentido (portfólio de Estúdio/Campanha), depois de eu ver cada um. Vídeos com carregamento leve (só tocam quando aparecem na tela, sem som).
- Vou confirmar com você a legenda de cada um (de qual cliente/projeto é) antes de publicar.

## 4. O que ainda falta você me enviar
1. Legenda de cada foto/vídeo enviado (cliente e o que foi feito) e se o cliente autoriza mostrar.
2. Autorização para exibir BSB Limpeza, Roberta Acioly e Adayane (e quais dos opcionais entram).
3. Tabela de preços (valores mínimos da triagem).
4. Três links de agenda do Google Calendar (Diagnóstico 40 min, conversa inicial 20 min, conversa de projeto 20 min).
5. E-mail oficial e @ do Instagram.
6. Logo, monograma V e selo em SVG.
7. Arquivos de estudo 07, 11 e 12 citados no manual.
8. IDs do Meta Pixel, GA4, Business Manager e acesso ao Google Ads.
9. Textos finais de Privacidade, Cookies e Termos (ou aprovação para eu redigir com base na LGPD).

## Detalhes técnicos
- Projetos ficam em `src/content/portfolio.ts`; capturas geradas via Playwright dos sites publicados e enviadas como assets CDN; mídias enviadas também via lovable-assets.
- Rota `src/routes/portfolio.tsx` com head() própria; link na navegação e rodapé.
- Flag em `src/lib/contato.ts` para esconder itens não autorizados.
