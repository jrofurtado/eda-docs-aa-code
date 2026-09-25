# EDA · Documentação como código

Iniciativa para consolidar o conhecimento sobre as aplicações da EDA num repositório GitLab, em Markdown, escrito e lido por pessoas e por IA. Os PDF para leitura humana são gerados a partir do Markdown.

## Conteúdo

| Caminho | O que é |
| --- | --- |
| `apresentacao/index.html` | Apresentação interativa para a direção (7 slides, cena 3D com Three.js). Abrir num browser. |
| `apresentacao/guiao.md` | Conteúdo e notas do orador de cada slide, em Markdown. |

## Navegação na apresentação

- `←` `→`, `Page Up`/`Page Down` ou deslizar no telemóvel para mudar de slide
- `N` mostra as notas do orador
- `#s4` no fim do endereço abre diretamente o slide 4

A apresentação carrega fontes (Google Fonts) e o Three.js (cdnjs) da internet. Sem ligação, o conteúdo continua legível mas sem a cena 3D.

## Prova de conceito proposta

Reverse engineering de um processo do SAP IS-U com IA (Codex ou Claude Code), cruzando quatro fontes:

1. Código ABAP exportado com abapGit (o quê)
2. Ordens de transporte, tabelas E070 e E071 (quando e quem)
3. Pedidos de evolutiva no EasyVista (porquê)
4. Documentação de projeto no SharePoint (contexto funcional)

O resultado é um repositório `sap-isu-docs` com um ficheiro Markdown por processo e por objeto Z, revisto por merge request.
