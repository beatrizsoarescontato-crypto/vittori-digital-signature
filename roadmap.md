# Correções da cena 3D (05/11, rodada V/halo)
- [x] V não some mais na hero: a proteção de leitura só atua com seção ativa (`side === "none"` retorna inativo antes de qualquer lógica de limites); teste de regressão adicionado.
- [x] Eclipse separado do V: grupo próprio (`eclGroup`), com escala/posição independentes; o espaço vazio medido dimensiona só o eclipse, nunca o V.
- [x] Halo mais difuso: disco menor e de borda suave, coroa larga dourada no pico da dispersão (referência EclipseGlow), sem efeito de bola escura.
- [x] Janela de dispersão alargada (p 0,18–0,66) para o efeito ser perceptível descendo e subindo.
- [x] Entrada sem âncora abre sempre em "Criamos presença" (rolagem zerada ao fim do mergulho).
- [x] Validação: 71 testes, build OK, capturas computador/celular mostram V formado na hero, dispersão com poeira, eclipse amplo e luminoso em espaço livre e recuo suave sobre os textos; sem erros JS novos (aviso pré-existente de hidratação no SVG dos cards de Serviços permanece, fora do escopo).
- [ ] Aprovação visual da dona nesta rodada e fluidez em aparelho real (o sandbox renderiza por software).

# Inteligência e halo (01/11)
- [x] Atualizados apenas os três produtos e cards da Inteligência conforme o documento, com modalidades e demonstrações via Henrique; desenvolvimento sob medida preservado.
- [x] Halo (04/11): em vez de sumir perto de textos, o eclipse encolhe para caber no espaço livre medido e só se apaga sem espaço. Capturas no computador (1280 px) mostram halo luminoso com partículas em áreas vazias em três pontos da rolagem, sem cobrir textos ou cards.
- [ ] Halo no celular (502 px): os textos ocupam quase toda a tela, então o halo aparece apenas como brilho na borda. Aguarda avaliação da proprietária e teste em aparelho real.
- [x] Produtos: navegação dos três cards, retorno, duas modalidades, demonstração contextual de Henrique e FAQ do Estúdio verificados no computador/celular; 65 testes passaram. Aparência final aguarda proprietária.

# Intervenção nos 4 pendentes (30/10, 06h)
- [x] Arraste dos serviços (rodada 3 itens): mouse/caneta agora por Pointer Events com captura; toque continua no Embla. Testado arraste rápido e lento em 1280 px e 502 px, setas, clique no card e toque no celular. Aguarda confirmação da usuária na prévia.
- [ ] Halo com partículas: no pico da dispersão o eclipse vai para o maior espaço vazio medido (cards, textos e rodapé protegidos) e cresce até ele. Visível nas capturas de computador e celular. Aguarda avaliação visual e fluidez em aparelho real.
- [x] Emenda entre primeira e segunda seção: borda inferior da vinheta suavizada. Aguarda avaliação visual.
- [x] Rodapé compacto (133 px no computador, altura mantida) e integrado ao cosmos: sem faixa, bordô escurecendo até a base. Aguarda avaliação visual.

# Refinamento visual com preservação de textos (30/10)
- [x] Textos autorizados: Método Vittori (4 etapas novas), Vittori Performance (Implementação pontual + Gestão recorrente com Direcionada/Integrada), descritivos de Digital (3 opções) e de Identidade (4 modalidades). Nenhum outro texto alterado.
- [x] Estrutura: portfólio oculto da home e fora da navegação (rota e conteúdo preservados); FAQ geral fora da home; FAQs das seis páginas convencionais removidas da exibição; FAQs dos produtos de Inteligência preservadas; ordem dos serviços com Inteligência primeiro e Identidade por último.
- [x] Visual: títulos dourados com mais contraste, fundo cósmico mais bordô, hierarquia e espaços compactos, cards de Digital/Identidade com personalidade, Método mais elegante, rodapé compacto.
- [x] Funcional: arraste horizontal dos Serviços no computador (405 px no teste), desfoque persistente removido (nenhuma seção com blur ao subir), emenda hero/seção suavizada, dispersão do V com halo mais presente sem cobrir textos.
- [x] Conferência: 46 testes passando, build OK, capturas computador/celular verificadas; textos alterados só nas quatro áreas autorizadas.
- [ ] Aprovação visual desta rodada: aguarda avaliação da dona na prévia (aparência não marcada como aprovada).

# Ajustes solicitados
- [x] Integrado seletivamente o pacote de 30/10: escopos comerciais, home compacta, produtos sem simuladores públicos, WhatsApp direto, retornos e três trabalhos na home; 46 testes e fluxos computador/celular passaram, mídias e portal preservados.
- [x] Pulso de dispersão e halo do pacote de 30/10 conferidos: captura com efeitos no celular mostrou interferência em títulos. Revertidos somente StageCanvas, experienceRules e seus testes à versão anterior protegida, conforme guia. Conteúdo novo mantido.
- [x] Intervenção direcionada: A/B de partículas, Bloom, compileAsync e desenho de aquecimento; corrigidos smoothsteps invertidos e aquecida a variante do eclipse fora da tela. Compilações durante o primeiro mergulho: 4 antes, 0 depois nas comparações finais. Reflexos pontuais adicionados com intensidade independente; halo, fundo, câmera e Bloom preservados.
- [x] Fluidez confirmada pela dona na prévia interativa; preservar as otimizações sem novos testes A/B.
- [x] Rodada pontual: sequência sincronizada após prontidão, reflexos locais ajustados; dez testes passaram e gravações contínuas computador/celular confirmaram entrada sem erros JS. Câmera, V, eclipse, halo, Bloom, nebulosa e otimizações preservados.
- [ ] Aprovação visual da abertura sincronizada e dos reflexos: aguarda avaliação da dona na prévia em sessão nova; não confundir validação local com aparência na GPU real.
- [x] Fotos inteiras e centralizadas; BSB conferida sem domínio ou link externo na captura atual.
- [x] Beatriz Soares identificada no contato de Brasília.
- [x] Serviços com arraste e setas sem travar rolagem; exemplo apenas no produto Atendente.
- [x] Contraste, negritos, ícones e detalhes sutis de estrelas/títulos reforçados.
- [x] BSB abre visualização interna; removidos links aos domínios e avisos de publicação de todos os projetos.
- [x] Visualização real de Dayane capturada a partir do projeto original, com imagens originais.
- [ ] Visualização de Roberta: imagem original protegida retornou 403; aguarda captura completa ou liberação no projeto de origem.
- [x] Quatro fotos e três vídeos identificados exibidos por projeto, sem legendas individuais; reprodução verificada em computador e celular.
- [ ] Quarto vídeo: aguarda identificação do projeto da mulher falando em reunião e autorização dos titulares para uso das mídias.
- [x] Revisados os textos legais e as contas da tabela interna, sem publicar valores confidenciais; correções comunicadas.
- [x] Lista de pendências entregue em português e visualização interna verificada.- [x] Abertura cinematográfica com escolha de som, trilha ambiente e VITTORI em partículas sobre fundo bordô.
- [x] Rodapé sem Henrique, com "Telefone"; cards animados nos meses; calculadoras com barras de arrastar.

# Universo imersivo (plano aprovado 29/10)
- [ ] Etapas 1 e 2: aprovação visual da dona após refinamento e novas provas de movimento.
- [x] Refinamento desta rodada: composição portal em cinco tamanhos, varredura procedural, espaço escuro/orgânico, halo discreto na formação e pico independente na dispersão; requer aprovação estética.
- [x] Refinamento desta rodada: proteção desde o primeiro paint, preparação dos recursos, diagnóstico de frames, teclado, movimento reduzido e fallback WebGL; oito testes passaram.
- [x] Provas desta rodada: antes/depois, vídeos da abertura e transição, sessão nova/reentrada e leitura dos Pilares salvos nos Arquivos; sem erros JS no teste local.
- [ ] Som ouvido: depende de avaliação no aparelho da dona; fluidez da transição já confirmada por ela.
- [x] Etapa 3: evolução visual aprovada pela dona (sem blocos opacos, V se afasta dos textos). Itens abaixo seguem em aberto.
- [ ] Etapa 4 implementada (aguarda aprovação visual da dona): botões, dourado com acabamento, escala tipográfica em todas as seções, cards com personalidade por serviço, Método, Inteligência, páginas/planos, controles flutuantes funcionais no celular, textos da auditoria. Aguarda aprovação visual.
- [x] Navegação contextual: voltar à seção de origem por link discreto no conteúdo, sem breadcrumbs, links do cabeçalho com âncora, voltar/avançar do navegador.
- [ ] Etapa 4.1 (antes da Etapa 5): legibilidade nas páginas internas, sobreposição do eclipse, padronização dos cards, apresentação dos planos, Vittori Inteligência, paleta de cores, botões e controles flutuantes.
- [x] Lote A implementado: retorno integrado, medição das áreas de leitura/demonstração, escala legível, sete cards alinhados, controles com detecção de colisão e sem rótulos flutuantes sobre conteúdo. Navegação, histórico e rotas verificados em computador/celular.
- [x] Lote B implementado: planos em seção própria (3 colunas desktop, 1 mobile), CTA por opção, variações editoriais compartilhadas, nomes reais de Inteligência, painéis integrados, bordô mais avermelhado e narrativa universal. FAQ de senhas e dois números preservados.
- [x] Validação direcionada: 28 testes; entrada nova, menu mobile, seis serviços, nove outras páginas, abas Agenda e calculadora com 40 mensagens resultando em 180 conversas/18 vendas/R$9.000; sem erros JS, build OK. Capturas computador/celular revisadas. Corrigida revelação que não reinicializava ao trocar de página.
- [ ] Aprovação final 4.1: avaliar leitura durante rolagem contínua e afastamento do eclipse na prévia da dona; captura local mostra composição protegida, mas não comprova ausência de sobreposição em todo instante/dispositivo. Não marcar a etapa inteira aprovada.
- [x] Exportar arquivo com o código completo do site atual.
- [ ] Etapa 5 (depois da 4.1): portfólio editorial e rodapé refinado.
- [ ] Etapa 5: proporções variadas, nomes compactos, prévias por mídia, modal refinado e tratamento sem imagem real; preservar mídias e créditos, sem inventar a captura da Roberta.

# Pendências para a rodada de refinamento (não corrigir antes)
- [ ] Etapa 3: movimentos de câmera específicos por seção.
- [ ] Etapa 3: mudança de atmosfera e nebulosa entre seções.
- [ ] Etapa 3: gravações completas de validação rolando o site.
- [ ] Etapa 3: emenda visual entre a hero e a seção seguinte.
- [ ] Etapas 1 e 2: recuperar reflexos cintilantes sobre o metal do VITTORI como na versão anterior.
- [ ] Etapas 1 e 2: avaliar reduzir os cerca de 2 s de espera antes do cenário aparecer, sem prejudicar a fluidez.
