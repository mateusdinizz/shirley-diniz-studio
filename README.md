# Shirley Diniz Studio

Landing page do **Shirley Diniz Studio**, salão de beleza em Boa Viagem, Recife (PE). Site estático em HTML, CSS e JavaScript puros, sem dependências nem etapa de build.

O objetivo da página é levar a cliente ao agendamento pelo WhatsApp: mostrar o trabalho, o espaço, os serviços com preços e a localização.

## Estrutura

```
shirley-diniz-studio/
├── index.html          # Estrutura e conteúdo da página
├── css/
│   └── style.css       # Estilos (cores e fontes em variáveis no :root)
├── js/
│   └── main.js         # Carrossel, animações ao rolar, menu ativo e botão flutuante
├── assets/
│   ├── images/         # Fotos e textura de fundo
│   └── icons/          # Logo, monograma e favicon (SVG)
├── .gitignore
└── README.md
```

Os ícones dos cartões de serviço ficam **inline** no `index.html` de propósito: eles usam `currentColor` e a animação de traço, o que não funciona com arquivos `<img>`.

## Como rodar localmente

Abra o `index.html` no navegador, ou, para simular um servidor:

```bash
python3 -m http.server 8000
# acesse http://localhost:8000
```

## Onde editar

| Quero mudar | Onde |
|---|---|
| Textos, seções e ordem | `index.html` |
| Serviços (categorias e itens) | `index.html`, seção `#servicos` |
| Número do WhatsApp | `index.html`: procure por `wa.me/` (aparece em vários botões e no endereço da seção `#visite`) |
| Depoimentos e links do Google | `index.html`, seção `#avaliacoes` |
| Cores e fontes | `css/style.css`, bloco `:root` |
| Velocidade do carrossel | `js/main.js`, função `play()` |
| Fotos | `assets/images/` (mantenha o formato 4:5 em pé) |

## Identidade visual

Fontes (Google Fonts): **Jost** nos títulos, **Open Sans** no texto e **Cormorant Garamond** itálico no slogan e nas avaliações.

| Variável | Valor |
|---|---|
| `--bg` | `#e1d9de` |
| `--panel` | `#ece5e9` |
| `--ink` | `#1a1a1a` |
| `--muted` | `#5f555b` |
| `--bar` | `#b697aa` |
| `--bar-ink` | `#1f1a1d` |
| `--line` | `#1a1a1a` |

## Imagens

- `assets/images/espaco-01.jpg`
- `assets/images/espaco-02.jpg`
- `assets/images/espaco-03.jpg`
- `assets/images/espaco-04.jpg`
- `assets/images/espaco-05.jpg`
- `assets/images/espaco-06.jpg`
- `assets/images/shirley-diniz.jpg`
- `assets/images/textura-fundo.jpg`
- `assets/images/trabalho-01.jpg`
- `assets/images/trabalho-02.jpg`
- `assets/images/trabalho-03.jpg`
- `assets/images/trabalho-04.jpg`

Ícones: `assets/icons/logo-shirley-diniz-studio.svg`, `assets/icons/monograma.svg`

Antes de adicionar fotos novas, comprima-as (largura até ~1000px, JPEG com qualidade ~80). Guarde os originais em `assets/originals/`, que o `.gitignore` ignora.

## Publicar no GitHub Pages

1. No repositório, abra **Settings → Pages**.
2. Em **Source**, escolha **Deploy from a branch**, branch `main` e pasta `/ (root)`.
3. Salve. O endereço será `https://SEU-USUARIO.github.io/NOME-DO-REPOSITORIO/`.

## Pendências antes do lançamento

- [ ] Adicionar `og:image` com URL absoluta (depois de publicar), para a prévia do link no WhatsApp.
- [ ] Conferir se o pin do mapa (seção `#visite`) está na Galeria Centro Sul.
- [ ] Confirmar com a dona do studio a legenda da foto da Shirley no início da página.
- [ ] Confirmar autorização de uso das fotos das clientes.
- [ ] Testar o site em celular (iOS e Android) e em desktop.

## Créditos

Site criado por Mateus Diniz.