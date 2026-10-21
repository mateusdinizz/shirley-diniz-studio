# Shirley Diniz Studio

Landing page do **Shirley Diniz Studio**, salão de beleza em Boa Viagem, Recife (PE). Site estático em HTML, CSS e JavaScript puros, sem dependências nem etapa de build. O objetivo é levar a cliente ao agendamento pelo WhatsApp: mostrar o trabalho, o espaço, os serviços, as avaliações e a localização.

## Estrutura

```
shirley-diniz-studio/
├── index.html
├── privacidade.html
├── robots.txt
├── sitemap.xml
├── css/style.css
├── js/main.js
├── assets/
│   ├── images/   fotos em WebP (até 300 KB cada) + og-image.jpg (prévia de links)
│   ├── icons/    logo, monograma (SVG), favicon.ico, favicon-32.png, apple-touch-icon.png
│   └── fonts/    fontes auto-hospedadas (woff2): Open Sans, Jost, Cormorant Garamond
├── .gitignore
└── README.md
```

Os ícones dos cartões de serviço ficam **inline** no `index.html`, porque usam `currentColor` e a animação de traço.

## Como rodar localmente

```bash
python3 -m http.server 8000
# acesse http://localhost:8000
```

## Onde editar

| Quero mudar | Onde |
|---|---|
| Textos, seções e ordem | `index.html` |
| Serviços (categorias e itens) | `index.html`, seção `#servicos` |
| Número do WhatsApp | `index.html`: procure por `wa.me/` |
| Depoimentos e links do Google | `index.html`, seção `#avaliacoes` |
| Horário, endereço e dados para o Google | `index.html` (seção `#visite`) e o bloco `application/ld+json` no `<head>` |
| Cores e fontes | `css/style.css` (bloco `:root` e `@font-face`) |
| Velocidade do carrossel de "Nosso espaço" | `js/main.js`, função `play()` |
| Política de privacidade | `privacidade.html` (campos entre colchetes em destaque) |
| Perguntas frequentes | `index.html`, seção `#faq` (e o bloco `FAQPage` no `<head>`, que deve ter o mesmo texto) |
| Fotos | `assets/images/` |

## Identidade visual

Fontes (auto-hospedadas, licença OFL): **Jost** nos títulos, **Open Sans** no texto e **Cormorant Garamond** itálico no slogan e nas avaliações.

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

- `assets/images/espaco-01.webp`
- `assets/images/espaco-02.webp`
- `assets/images/espaco-03.webp`
- `assets/images/espaco-04.webp`
- `assets/images/espaco-05.webp`
- `assets/images/espaco-06.webp`
- `assets/images/shirley-01.webp`
- `assets/images/shirley-02.webp`
- `assets/images/shirley-03.webp`
- `assets/images/shirley-04.webp`
- `assets/images/shirley-05.webp`
- `assets/images/shirley-06.webp`
- `assets/images/og-image.jpg`
- `assets/images/shirley-diniz.webp`
- `assets/images/textura-fundo.webp`
- `assets/images/trabalho-01.webp`
- `assets/images/trabalho-02.webp`
- `assets/images/trabalho-03.webp`
- `assets/images/trabalho-04.webp`
- `assets/images/trabalho-05.webp`
- `assets/images/trabalho-06.webp`

**Regras:** formato WebP, no máximo 300 KB por imagem (exceto `og-image.jpg`, que fica em JPEG por compatibilidade com WhatsApp e redes sociais). Fotos de "Nosso espaço" já estão recortadas em 4:5.

Para converter uma foto nova (Python + Pillow):

```bash
python3 -c "from PIL import Image; im=Image.open('foto.jpg').convert('RGB'); im.thumbnail((1300,1625)); im.save('foto.webp','WEBP',quality=88,method=6)"
```

Confira o tamanho (`ls -l`) e reduza a qualidade até ficar abaixo de 300 KB. Guarde os originais em `assets/originals/`, que o `.gitignore` ignora.

## SEO e acessibilidade já implementados

- `h1` (oculto visualmente), `title`, `description`, canonical, Open Graph e Twitter Card.
- Dados estruturados `HairSalon` (JSON-LD), `robots.txt` e `sitemap.xml`.
- Link "Pular para o conteúdo", foco visível com contraste, botão de pausar os carrosséis, alvos de toque de 44 px em telas de toque e aviso de "abre em nova aba".
- Nenhuma requisição a terceiros no carregamento: fontes locais e mapa do Google carregado só ao clique.

## Publicar no GitHub Pages

1. **Settings → Pages**, *Deploy from a branch*, `main` e `/ (root)`.
2. Em **Custom domain**, informe o domínio e marque **Enforce HTTPS**.
3. O GitHub Pages gratuito exige repositório público. As fotos mostram clientes: confirme a autorização de uso antes.

## Pendências

- [ ] Trocar o placeholder `https://SEU-DOMINIO.com.br` pelo domínio real nestes pontos: `index.html:14`, `index.html:19`, `index.html:21`, `index.html:29`, `index.html:39`, `index.html:40`, `privacidade.html:17`, `robots.txt:4`, `sitemap.xml:4`, `sitemap.xml:7`.
- [ ] Publicar com domínio próprio e HTTPS forçado, e confirmar o certificado válido.
- [ ] Depois de publicar, testar a prévia do link no WhatsApp e validar o JSON-LD no Teste de Resultados Rich do Google.
- [ ] Rodar PageSpeed Insights e testar em celulares e tablets reais.
- [x] Reescrever os textos genéricos de "Nosso trabalho", "Nosso espaço" e da legenda da Shirley com fatos reais, e comprovar a frase "mais de 20 anos".
- [x] Preencher os campos em destaque entre colchetes de `privacidade.html` (razão social ou nome, CNPJ ou CPF) e pedir a revisão de um advogado ou contador antes de publicar. Confirme também que a frase "Não vendemos seus dados" e o prazo de guarda descrevem a prática real do Studio.
- [x] FAQ criado (seção `#faq`, com dados estruturados `FAQPage`). Uma descrição curta por serviço continua opcional.
- [x] Autorização de uso das fotos das clientes confirmada pela dona. Guarde o registro (mensagem ou termo) e retire a foto se alguém pedir.
- [x] Conferir o pin do mapa e o horário "terça a sábado, das 7h30 às 19h".

## Créditos

Site criado por Mateus Diniz.