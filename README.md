# Makari — site institucional

React + TypeScript + Tailwind CSS 4, com Vite. Site estático, sem backend, coleta de dados ou deploy automático.

## Desenvolvimento

Node.js 22.12+ (validado com 24.22.2).

As dependências desta sessão foram recuperadas do cache local, pois a rede está restrita. Não há lockfile distribuído: o cache não contém metadados completos das dependências opcionais de outras plataformas. Execute `npm install` com rede habilitada para gerar o `package-lock.json` completo e versioná-lo antes da publicação.

```sh
npm install
npm run dev
```

Acesse http://localhost:5173. Para produção:

```sh
npm run build
npm run preview
```

A pasta `dist/` contém o resultado da compilação. Nenhum deploy foi realizado.

## Conteúdo e identidade

- `src/business.ts`: contatos, mensagens do WhatsApp, endereço, horário, Maps e supermercados. Campos não confirmados permanecem nulos/vazios.
- `src/App.tsx`: textos e seções.
- `src/styles.css`: direção de arte, responsividade e animações CSS. Rolagem nativa, foco visível, link de pular conteúdo e suporte a movimento reduzido.
- `public/images/`: fotografias gastronômicas **ilustrativas geradas por IA**, convertidas para WebP. Não representam produtos preparados ou fotografados pela Makari. Não há embalagens simuladas.
- `public/images/logo-makari.png`: logotipo oficial fornecido pela marca.
- `public/images/compartilhamento.jpg`: imagem social 1200 × 630. Título, descrição e Open Graph em `index.html`.

## Antes da publicação

1. Aprovar textos e direção visual com o dono; confirmar nome comercial completo.
2. Receber fotografias oficiais das massas, embalagens e fábrica, se disponíveis.
3. Confirmar endereço, horários e link correto do Google Maps. O botão de rota só aparece com endereço e Maps preenchidos.
4. Confirmar pontos de venda e links dos supermercados; adicionar em `business.retailers`.
5. Confirmar condições comerciais com a equipe. Não foram publicados preços, pesos, pedido mínimo, certificações ou depoimentos.
6. Escolher domínio; substituir `og:image` pelo URL absoluto no domínio final, adicionar `og:url` e canonical. Validar o cartão social no domínio publicado.
7. Executar revisão visual real em desktop e celular, navegação completa por teclado, menu móvel e modo de movimento reduzido.

## Validação desta entrega

- TypeScript e build Vite: aprovados.
- Verificação por renderização estática: 19 links válidos estruturalmente, 9 links de WhatsApp com o número solicitado, mensagem comercial exata, destinos das âncoras e imagens locais presentes.
- CSS inclui modo reduzido sem animações/transições e rolagem automática; conteúdo não depende de opacidade zero ou tela de carregamento.
- **Limitações do ambiente:** navegador de automação indisponível; servidor local bloqueado com `listen EPERM`; portanto inspeção visual desktop/celular e interação real por teclado/WhatsApp não foram executadas.
- **Versionamento bloqueado:** `.git` somente leitura; repositório remoto consultado e vazio, sem branches. Git por rede indisponível e integração GitHub retornou 403 na criação de arquivo. Nenhuma branch ou commit foi enviado. Branch prevista: `codex/site-makari`.

## Envio após liberar Git

Como o remoto estava vazio durante a inspeção, confirme novamente o estado antes de iniciar. Com a pasta `.git` liberada e acesso ao GitHub:

```sh
git init -b codex/site-makari
git remote add origin https://github.com/gustavosergio/makari-massas.git
git add .gitignore README.md package.json index.html tsconfig.json vite.config.ts src public
git commit -m "feat: cria site institucional Makari com direção editorial e contato comercial"
git push -u origin codex/site-makari
```

Se o remoto passar a conter histórico, integre-o antes do envio; não use force push.
