# Narração da apresentação (versão EDA)

Texto lido pela voz no modo narrado, um bloco por slide. É a fonte da narração: depois de o alterar, volte a gerar o áudio com `node apresentacao/ferramentas/gerar-narracao.mjs`.

As marcas entre parênteses retos duplos, como `[[pontes]]`, não são lidas. Indicam o momento em que a apresentação executa uma ação, no início da palavra seguinte. Marcas disponíveis: `pontes`, `flip`, `agente`, `pergunta`, `pedido1` a `pedido5`, `historico`.

## 1 · Abertura

Hoje, grande parte do que sabemos sobre as nossas aplicações está na cabeça das pessoas. Esta proposta muda isso: a documentação passa a ser tratada como código. Vive num único repositório GitLab, é escrita em Markdown, e é lida por pessoas e por inteligência artificial. Começamos por uma prova de conceito no SAP for Utilities.

## 2 · Hoje

Onde está hoje o conhecimento? Em cinco sítios que não comunicam entre si. Na cabeça das pessoas. No RCD. No SharePoint dos projetos, parado no dia em que o projeto fecha. No EasyVista, espalhado por milhares de tickets. E em ficheiros Word, PDF e Excel, difíceis de pesquisar. São ilhas sem pontes. [[pontes]] A proposta é ligá-las a um repositório comum, para que a resposta deixe de depender de encontrar a pessoa certa.

## 3 · A mudança

Porquê Markdown? Porque a documentação vai ser escrita e lida sobretudo por inteligência artificial, e o Markdown é o formato que os modelos leem e escrevem melhor. O GitLab passa a ser a fonte de verdade: cada alteração entra por merge request, com autor, data e revisor. E quem precisar de um documento formal continua a tê-lo. [[flip]] O PDF é gerado automaticamente a partir do mesmo ficheiro. Ninguém o edita à mão.

## 4 · Prova de conceito

A prova de conceito aplica isto ao SAP for Utilities, com quatro fontes. O código ABAP, exportado com o abapGit, diz-nos o quê. As ordens de transporte dizem quando e quem. As evolutivas do EasyVista explicam porquê. E a documentação dos projetos no SharePoint dá o contexto. [[agente]] Um agente de inteligência artificial lê as quatro fontes, cruza-as e escreve a documentação. O resultado entra por merge request, para ser revisto por quem conhece o sistema.

## 5 · Resultado

Este é o resultado. Um ficheiro por objeto, em que cada secção indica de onde veio a informação: do código, de uma ordem de transporte, de uma evolutiva ou de um documento de projeto. E, como está em Markdown, pode ser consultado por inteligência artificial. [[pergunta]] Antes de uma evolutiva, basta perguntar o que é afetado. A resposta vem com as fontes.

## 6 · Plano

O plano tem oito semanas. Nas duas primeiras, escolhemos o processo e validamos a segurança. Nas seguintes, extraímos as fontes e geramos a documentação, comparando duas ferramentas de inteligência artificial. Nas últimas duas, os key users reveem o resultado e medimos. Os principais riscos estão identificados: confidencialidade, qualidade e rastreabilidade, cada um com a sua mitigação.

## 7 · Decisão

Para arrancar, precisamos de cinco coisas. [[pedido1]] A aprovação da prova de conceito. [[pedido2]] Acessos de leitura aos sistemas. [[pedido3]] Ferramentas de inteligência artificial em regime empresarial. [[pedido4]] Algum tempo dos key users. [[pedido5]] E o parecer de segurança e de proteção de dados. Se resultar no SAP for Utilities, o mesmo modelo aplica-se às restantes aplicações da Eletricidade dos Açores.

## 8 · Bastidores

Uma última nota. Esta apresentação é, ela própria, documentação como código. É um ficheiro num repositório Git, com o guião em Markdown. Foi feita com o Claude Code, a partir de pedidos em português, e o 3D, a animação, o som e esta narração foram gerados por código e por inteligência artificial. [[historico]] Cada versão ficou registada. Até a que foi revertida.

## 9 · Perguntas

Obrigado pela vossa atenção. Ficamos disponíveis para as vossas perguntas.
