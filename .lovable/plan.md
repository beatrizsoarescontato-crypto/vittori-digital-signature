# Universo Imersivo Vittori (Eclipse de Luxo)

O site todo vira um único espaço 3D contínuo, como o Junk Branding: o visitante não "rola uma página", ele viaja por um cosmos bordô infinito, e os textos flutuam dentro dele.

## 1. Entrada monumental
- Tela de entrada com contador e botões "Entrar com som" / "Entrar em silêncio" (mantida).
- Ao entrar: a palavra **VITTORI em 3D real** (metal bordô escovado, aresta dourada polida) ocupa cerca de 80% da largura da tela no computador e 90% no celular, levemente inclinada, com luz suave passando.
- Transição: o VITTORI se **dissolve em partículas douradas** (as letras se desfazem em poeira de luz) e a câmera mergulha através dessa poeira.

## 2. O monograma V
- Do mergulho surge o **V grande em 3D**, mesmo material (bordô metálico e aresta dourada).
- Uma **faixa de luz atravessa o V** (efeito de luz de vitrine de joalheria), como no site referência.
- Com o scroll, o V se **transforma em um V de partículas douradas** que respiram e reagem ao cursor/toque, e volta a ficar sólido no final do site.

## 3. Fundo infinito (espaço bordô)
- Profundidade real: do preto quase absoluto ao bordô aveludado, com névoa que some no horizonte.
- Três camadas de partículas a distâncias diferentes, que se movem em velocidades diferentes (sensação de viajar pelo espaço).
- Estrelas ✦ pequenas cintilando e **constelações finas** em linhas douradas muito sutis.
- **Estrelas cadentes**: filamentos ultrafinos dourado-marfim, diagonais, raros (a cada 8 a 15 segundos) e às vezes ao rolar rápido. Nada grosso ou de videogame.
- Luz dourada suave que segue o cursor (no celular, segue o toque).

## 4. Seções flutuando no espaço
- Fim dos blocos/caixas sólidas: títulos grandes em Cormorant e textos em Montserrat flutuam sobre o cosmos, com vidro escuro translúcido só onde a leitura precisa.
- **Transição entre seções**: o texto que sai se desfaz com desfoque e o próximo chega do fundo para frente, enquanto a câmera muda de ângulo ao redor do V.
- Coreografia: Abertura (VITTORI) > Sobre (V sólido com luz) > Serviços (V vira partículas, cards em arraste horizontal) > Método/Pilares (V gira de lado) > Portfólio (V recua e desfoca, projetos reais em destaque) > Final (V volta sólido ao centro com a estrela ✦).
- Todos os textos com contraste legível, incluindo os que hoje estão apagados.

## 5. Som
- Nova trilha sintetizada épica e triunfante (inspiração grega: graves cheios, acordes maiores, cordas e metais suaves), nunca triste. Liga só pelo clique e pode ser desligada.

## 6. Celular, velocidade e acessibilidade
- Menos partículas e menos detalhe no celular; tudo encaixa em qualquer tela.
- Quem pede menos movimento no aparelho vê a versão estática e elegante.
- Conteúdo, contatos, portfólio e as sete linhas de serviço continuam os mesmos (nada inventado).

## Detalhes técnicos
- `StageCanvas.tsx`: cena por fases dirigida por `stageScroll.p`; morph do texto/V para pontos via shader (posições amostradas da geometria, uniform `uMorph`); faixa de luz por uniform no material (sweep); estrelas cadentes em pool de linhas com fade; constelações em `LineSegments`.
- `EntryGate.tsx`: sinaliza fim da entrada para disparar a dissolução do VITTORI.
- `ambientAudio.ts`: nova composição em tom maior.
- Seções: remover fundos opacos, adicionar classes de transição com desfoque/profundidade em `useScrollReveal`.
- Verificação: capturas Playwright em desktop e celular em cada fase; checar erros e legibilidade.

## O que não consigo garantir aqui
- A fluidez real, o som e o brilho na sua placa de vídeo: o ambiente de teste não tem GPU nem som. Você vai conferir no preview.
