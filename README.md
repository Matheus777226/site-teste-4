# Pherface Blumenau

Site editorial responsivo em português, com escultura tridimensional procedural, tratamentos expansíveis e questionário que personaliza o contato pelo WhatsApp.

## Desenvolvimento

Requer Node.js 22 ou superior. Sem dependências externas de execução.

```sh
npm run dev
npm test
npm run build
```

Servidor na porta 3000, configurável por `PORT`. Para conferir a saída de produção: `SERVE_DIST=1 npm start`. A pasta `dist` também pode ser hospedada em qualquer serviço estático.

## Deploy na Vercel

O arquivo `vercel.json` configura um deploy estático: `npm run build` gera `dist`, sem função Node em produção. O servidor `server.mjs` é usado apenas para desenvolvimento e validação local.

Na Vercel, use a raiz do repositório como Root Directory, Framework Preset **Other**, Build Command **npm run build** e Output Directory **dist**. Remova overrides antigos conflitantes e faça um novo deploy do último commit da branch `main`.

## Antes de publicar

- Confirmar telefone, endereço, profissionais, procedimentos disponíveis e informações comerciais com a clínica.
- Fotografias reais da unidade e avaliações verificadas não foram fornecidas. Nenhum depoimento, profissional ou ambiente real foi inventado; a arte é abstrata. A nota e contagem de avaliações do briefing foram omitidas até verificação.
- Definir o domínio oficial para adicionar canonical, URL de Open Graph e sitemap. Não foi inventado um domínio.
- O mapa só se conecta ao Google após solicitação do visitante. As fontes usam Google Fonts, com alternativas locais. Não há rastreadores, formulário de coleta ou armazenamento de respostas; a seleção é encaminhada apenas quando o visitante abre o WhatsApp.
- A composição é renderizada em Canvas 2D com geometria 3D, sem depender de WebGL. Animação pausada fora da tela; movimento reduzido respeitado.

## Conteúdo

Textos e estrutura em `index.html`; tratamentos, intenções e mensagens em `src/data.js`; identidade visual em `src/style.css`.

## Questionário de qualificação

Três etapas com avanço após 400 ms, navegação de volta, revisão e reinício. As respostas ficam apenas na memória da página até recarregar; não há cadastro, cookies ou persistência em disco. A tela final resume interesse, prioridade e objetivo da conversa, sem recomendar procedimentos. O link do WhatsApp contém as três respostas organizadas e só abre após clique explícito.

Perguntas e textos condicionais: `src/quiz-data.js`. Interface: `src/quiz.js` e `src/quiz.css`. Eventos `quiz_started`, `quiz_step_1_completed`, `quiz_step_2_completed`, `quiz_completed` e `quiz_whatsapp_clicked` são emitidos por `CustomEvent` no canal `pherface:quiz`. Se `window.dataLayer` já existir, recebem também os eventos e os IDs das respostas selecionadas. Não há SDK ou envio de analytics instalado. Integrações futuras devem configurar seu próprio tratamento de consentimento. Revisar uma resposta emite novamente o evento da etapa; recomeçar inicia uma nova sequência.
