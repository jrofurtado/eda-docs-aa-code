# EDA · Documentação como código

Iniciativa para consolidar o conhecimento sobre as aplicações da EDA num repositório GitLab, em Markdown, escrito e lido por pessoas e por IA. Os PDF para leitura humana são gerados a partir do Markdown.

## Conteúdo

| Caminho | O que é |
| --- | --- |
| `apresentacao/index.html` | Apresentação interativa para a direção (7 slides, cena 3D com Three.js). Abrir num browser. |
| `apresentacao/versao-eda.html` | A mesma apresentação com a identidade da EDA: Montserrat, amarelo #ffd200 e cinzentos #878787 e #ededed. Tem tema claro e escuro (tecla `T`), intro animada de 25 segundos em cinco atos (tecla `I` para rever), som sintetizado por código (tecla `M` para silenciar) e um slide 8 de bastidores sobre como a apresentação foi feita. |
| `apresentacao/guiao.md` | Conteúdo e notas do orador de cada slide, em Markdown. |
| `apresentacao/narracao.md` | Texto da narração, um bloco por slide. É a fonte do modo narrado. |
| `apresentacao/narracao.js` | Gerado a partir de `narracao.md`: texto, tempos de cada palavra e ações. Não editar à mão. |
| `apresentacao/ferramentas/gerar-narracao.mjs` | Gera o áudio da narração com o ElevenLabs e o `narracao.js`. |

## Navegação na apresentação

- `←` `→`, `Page Up`/`Page Down` ou deslizar no telemóvel para mudar de slide
- `N` mostra as notas do orador
- `#s4` no fim do endereço abre diretamente o slide 4
- Arrastar com o rato roda a cena 3D nos slides 1, 2 e 7
- Cada slide tem uma interação: pontes entre fontes (2), cartão Markdown/PDF (3), execução simulada do agente (4), perguntas ao repositório (5), fases da linha do tempo (6) e lista de decisão (7)

A apresentação carrega fontes (Google Fonts) e o Three.js (cdnjs) da internet. Sem ligação, o conteúdo continua legível mas sem a cena 3D.

## Prova de conceito proposta

Reverse engineering de um processo do SAP IS-U com IA (Codex ou Claude Code), cruzando quatro fontes:

1. Código ABAP exportado com abapGit (o quê)
2. Ordens de transporte, tabelas E070 e E071 (quando e quem)
3. Pedidos de evolutiva no EasyVista (porquê)
4. Documentação de projeto no SharePoint (contexto funcional)

O resultado é um repositório `sap-isu-docs` com um ficheiro Markdown por processo e por objeto Z, revisto por merge request.

## Narração (versão EDA)

A tecla `A`, o botão "Narrar" ou "Iniciar com narração" ativam o modo narrado. Em cada slide, a voz lê o texto de `narracao.md` com legendas palavra a palavra e dispara as interações no momento certo (pontes, cartão PDF, agente, pergunta, lista de decisão, histórico). No fim de cada slide a narração para e espera por `→`, para haver espaço para perguntas. Clicar na legenda pausa ou continua.

Para gerar o áudio (Node 18 ou mais recente):

```
ELEVENLABS_API_KEY=... ELEVENLABS_VOICE_ID=... node apresentacao/ferramentas/gerar-narracao.mjs
```

- Grava `apresentacao/audio/s1.mp3` a `s8.mp3` e atualiza `narracao.js` com os tempos reais de cada palavra.
- Use uma voz em português europeu da Voice Library do ElevenLabs.
- Só volta a pedir áudio para os slides cujo texto mudou (`--forcar` gera tudo, `--slides 2,5` só alguns).
- Sem chave, `--sem-audio` gera só as legendas com tempos estimados.
- Em ambientes que injetam a chave no cabeçalho `xi-api-key` (credencial para `api.elevenlabs.io`), use `--chave-no-proxy --voz <voice_id>` em vez de `ELEVENLABS_API_KEY`.

O áudio é gerado uma vez e fica no repositório. A apresentação não chama o ElevenLabs e funciona sem internet nem conta, desde que a pasta `audio/` acompanhe o HTML.
