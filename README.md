# Shirley Diniz Studio — Landing page

Site institucional de um salão de beleza em Boa Viagem, Recife (PE), com o objetivo de converter visitas em agendamentos pelo WhatsApp. Projeto real, em produção para um cliente.

**Site:** https://shirleydinizstudio.com.br

![HTML5](https://img.shields.io/badge/HTML5-semântico-e34f26) ![CSS3](https://img.shields.io/badge/CSS3-custom%20properties%20%2B%20grid-1572b6) ![JavaScript](https://img.shields.io/badge/JavaScript-vanilla-f7df1e) ![Build](https://img.shields.io/badge/build-nenhum-lightgrey) ![Deploy](https://img.shields.io/badge/deploy-GitHub%20Pages-222)

## Resumo técnico

| | |
|---|---|
| **Stack** | HTML5, CSS3 e JavaScript puros. Sem framework, sem bundler, sem dependências de runtime |
| **Hospedagem** | GitHub Pages, domínio próprio (`.com.br`) com DNS no Registro.br (registros A + CNAME) e HTTPS forçado |
| **Meta de produto** | Levar o visitante ao WhatsApp com poucos cliques, principalmente no celular |
| **Foco técnico** | Performance, acessibilidade, SEO local, privacidade (LGPD) e manutenção simples por uma pessoa só |

## Decisões de projeto

**Site estático sem build.** O conteúdo muda pouco e quem mantém o site precisa conseguir editar um arquivo e publicar. Evitar framework e bundler remove toda a cadeia de dependências, deixa o deploy em um `git push` e mantém o carregamento leve.

**Fontes auto-hospedadas (woff2).** Open Sans, Jost e Cormorant Garamond ficam em `assets/fonts/`, em subconjuntos `latin` e `latin-ext`. Isso elimina a requisição a servidores de fontes de terceiros (privacidade e desempenho) e permite `preload` apenas das duas fontes usadas na primeira dobra.

**Imagens em WebP com limite de peso.** Todas as fotos são convertidas para WebP com teto de 300 KB; as miniaturas da galeria são recortadas em 3:4 (480×640) e ficam em dezenas de KB. Atributos `width` e `height` explícitos evitam deslocamento de layout (CLS), e `loading="lazy"` com `decoding="async"` adia o que está fora da tela. A imagem de prévia de links (`og-image.jpg`, 1200×630) fica em JPEG por compatibilidade com WhatsApp e redes sociais.

**Mapa sob demanda.** O iframe do Google Maps só é criado quando a seção se aproxima da tela (`IntersectionObserver` com margem de 400 px). Quem não chega ao fim da página não faz nenhuma requisição ao Google, e o carregamento inicial fica sem terceiros. Existe fallback com link para o Google Maps, e a política de privacidade descreve esse comportamento.

**Design tokens em CSS.** Cores vivem em custom properties no `:root`, o que mantém a paleta consistente e a troca de tema em um único lugar.

| Token | Valor | Uso |
|---|---|---|
| `--bg` | `#e1d9de` | Fundo |
| `--panel` | `#ece5e9` | Painéis |
| `--ink` | `#1a1a1a` | Texto |
| `--muted` | `#5f555b` | Texto secundário |
| `--bar` | `#b697aa` | Destaques e botões |
| `--bar-ink` | `#1f1a1d` | Texto sobre destaque |

**Layout responsivo com CSS Grid.** A galeria de trabalhos usa 6 colunas no desktop, 3 até 1180 px e 2 até 560 px, sempre com proporção 3:4 fixa. Tamanhos de fonte em `rem`, para respeitar a preferência de texto do usuário.

## Funcionalidades

- **Carrosséis** (espaço e fotos da profissional) em JavaScript puro: avanço automático a cada 3 s, botão de pausar, gesto de deslizar no toque e avanço automático desligado quando o usuário tem `prefers-reduced-motion`.
- **Animação de entrada ao rolar** com `IntersectionObserver` (classe `.rv`), também desligada com movimento reduzido.
- **Menu com seção ativa** destacada conforme a rolagem e **botão flutuante de WhatsApp**.
- **Catálogo de serviços** em painéis por categoria, com links diretos para o WhatsApp.
- **Perguntas frequentes** com `<details>`/`<summary>` nativos.
- **Página de privacidade** própria (`privacidade.html`).

## Acessibilidade

- HTML semântico com hierarquia de títulos e um `h1` visualmente oculto.
- Link "Pular para o conteúdo" e foco visível com contraste adequado.
- Alvos de toque de pelo menos 44 px em telas de toque (`pointer: coarse`).
- Controle para pausar os carrosséis e respeito a `prefers-reduced-motion`.
- Links que abrem em nova aba avisam leitores de tela com texto oculto "(abre em nova aba)" e usam `rel="noopener noreferrer"`.
- Texto alternativo descritivo em todas as fotos.

## SEO e dados estruturados

- `title`, `meta description`, `canonical`, Open Graph e Twitter Card.
- **JSON-LD** `HairSalon` (endereço, horário, telefone) para SEO local e o Perfil da Empresa no Google.
- **JSON-LD** `FAQPage`, espelhando o texto exato da seção de perguntas frequentes.
- `robots.txt` e `sitemap.xml`.

## Privacidade e LGPD

- Nenhuma requisição a terceiros no carregamento inicial: fontes locais, sem analytics e sem cookies de rastreamento.
- Mapa do Google carregado só quando necessário, com o comportamento descrito na política de privacidade.
- Fotos de clientes usadas com autorização da proprietária do estabelecimento; os depoimentos apontam para as avaliações públicas originais no Google.

## Estrutura do repositório

```
shirley-diniz-studio/
├── index.html            página principal (seções + JSON-LD)
├── privacidade.html      política de privacidade
├── robots.txt
├── sitemap.xml
├── CNAME                 domínio próprio para o GitHub Pages
├── css/style.css         tokens, layout, componentes e responsividade
├── js/main.js            carrosséis, mapa sob demanda, reveal e menu ativo
├── assets/
│   ├── images/           fotos em WebP + og-image.jpg
│   ├── icons/            logo e monograma (SVG), favicons
│   └── fonts/            woff2 auto-hospedados
├── .gitignore
└── README.md
```

Os ícones dos cartões de serviço ficam inline no HTML porque usam `currentColor` e animação de traço.

## Como rodar localmente

```bash
git clone https://github.com/mateusdinizz/shirley-diniz-studio.git
cd shirley-diniz-studio
python3 -m http.server 8000
# abra http://localhost:8000
```

Não há instalação de pacotes nem build.

## Fluxo de imagens

```bash
python3 -c "from PIL import Image, ImageOps; im=Image.open('foto.jpg').convert('RGB'); \
ImageOps.fit(im,(480,640),centering=(.5,.35)).save('foto.webp','WEBP',quality=86,method=6)"
```

Regras: WebP, máximo de 300 KB por arquivo e recorte na proporção do componente que a usa. Originais ficam em `assets/originals/`, ignorado pelo `.gitignore`.

## Deploy

1. GitHub Pages, branch `main`, pasta raiz, com o arquivo `CNAME` na raiz.
2. DNS no Registro.br: quatro registros `A` (`185.199.108.153` a `185.199.111.153`) para a raiz e um `CNAME` de `www` para `mateusdinizz.github.io`.
3. **Enforce HTTPS** ativado após a emissão do certificado.

Cada `git push` na `main` publica automaticamente.

## Qualidade e verificação

Durante o desenvolvimento, o HTML foi validado com `html-validate` e o comportamento foi conferido com Chromium headless (Puppeteer) em larguras de 390 a 1920 px: overflow horizontal, quebra do menu, galeria, carrosséis e movimento reduzido. Esses scripts não fazem parte do repositório.

Métricas de desempenho (preencher após medir no PageSpeed Insights, com a data):

| Métrica | Mobile | Desktop |
|---|---|---|
| Performance | 94 | 100 |
| Acessibilidade | 96 | 96 |
| Boas práticas | 100 | 100 |
| SEO | 100 | 100 |

## Possíveis evoluções

- CI no GitHub Actions para validar HTML e peso das imagens a cada push.
- Geração automática de WebP e miniaturas.
- Versões `srcset` das fotos para telas de alta densidade.
- Testes de regressão visual.

## Autor

Mateus Diniz — [GitHub](https://github.com/mateusdinizz)
