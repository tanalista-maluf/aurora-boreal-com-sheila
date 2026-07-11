# Aurora Boreal com Sheila Mello — Landing Page

Site estático (HTML + CSS + JS puro), sem dependências de build. Pronto para publicar
em qualquer hospedagem estática (domínio próprio, Netlify, Vercel, S3, cPanel, etc.).

## Estrutura
```
site/
├── index.html          → a página inteira
├── css/styles.css      → estilos (paleta da identidade visual)
├── js/main.js          → configuração + interações
└── assets/
    ├── brand/          → logo e cronograma oficial
    └── img/            → fotos otimizadas (nomeadas por destino)
```

## Ver localmente
No terminal, dentro da pasta `site`:
```
python3 -m http.server 8080
```
Depois abra http://localhost:8080

## ⚠️ O QUE FALTA PREENCHER (placeholders)
Tudo está centralizado — procure pelos comentários `PLACEHOLDER` / `TROCAR`.

1. **WhatsApp** — `js/main.js`, campo `SITE.whatsapp` (número real, só dígitos, ex.: `5511999999999`)
   e `SITE.whatsappMsg` (mensagem pré-preenchida).
2. **Preço e condições** — `index.html`, seção `#investimento` (bloco `.price-card`):
   substituir `R$ 00.000`, `00x` e remover o aviso amarelo `.ph`.
3. **Vídeo do hero** — `js/main.js`, campo `SITE.heroVideoId`.
   Enquanto vazio, o hero mostra a imagem `godafoss-aurora.jpg`. Basta colar o ID do
   vídeo do YouTube (parte depois de `watch?v=`) para ativá-lo.
   Remover também a nota amarela "Vídeo do hero é provisório" no `index.html`.
4. **Foto da Sheila Mello** — em uso: `assets/img/sheila-mello.webp` (seção `#sheila`).
   Para trocar, substitua esse arquivo ou o `src` do `<img>` na seção.
5. **E-mail / redes** — `js/main.js`, campo `SITE.email`.
6. **Textos oficiais** — descrições de destinos/atividades/inclusos podem ser ajustadas
   para bater exatamente com o material da operadora (30ºS / Escandinávia Boreal).

## Conteúdo do roteiro
O roteiro dia a dia é gerado a partir do array `ROTEIRO` em `js/main.js`, fiel ao
`cronograma.jpg` (13 a 27 de novembro de 2026).
