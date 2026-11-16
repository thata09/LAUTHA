# ExGPT — Seu Ex Virtual com Inteligência Artificial 💔💅

> **Slogan principal:** "Seu ex nunca superou. Agora ele tem IA."  
> **Slogan secundário:** "Porque superar é opcional. Dar indireta é obrigatório."

O **ExGPT** é uma aplicação web completa que simula conversas com um ex-namorado ou ex-namorada virtual. Com uma personalidade sarcástica, irônica, debochada e passivo-agressiva repleta de humor, o produto foi projetado com estética **Pink Aesthetic** moderna e arquitetura pensada para viralização no TikTok, Instagram e WhatsApp.

---

## ✨ Funcionalidades Principais

1. **Chat Interativo com IA Contextual:**
   - Respostas geradas por IA dinamicamente.
   - 7 personalidades tóxicas e divertidas para escolher e alternar em tempo real:
     - 💅 **Ex Debochado:** Sarcástico, irônico e especialista em indiretas.
     - 👀 **Ex Ciumento:** Finge não se importar, mas quer saber de tudo.
     - 🥺 **Ex Sofrido:** Diz que superou, mas ainda lembra de cada detalhe.
     - 🧊 **Ex Frio:** Responde com poucas palavras e indiferença calculada.
     - 🔥 **Ex Ressentido:** Tem uma resposta atravessada para qualquer situação.
     - 💔 **Ex Arrependido:** Finge que está bem, mas deixa escapar que sente falta.
     - 😎 **Ex Narcisista (Modo Paródia):** Acha que todo mundo ainda está pensando nele.
   - Indicador animado de digitação ("ExGPT está digitando...").
   - Efeitos sonoros sutis estilo mensageiro com opção de silenciar.
   - Copiar resposta em 1 clique e histórico persistido no navegador.

2. **Ferramenta "O Que Meu Ex Responderia?" (`/gerador`):**
   - Cole uma mensagem recebida e receba 3 respostas afiadas:
     - 💅 **Debochada:** Engraçada e sarcástica.
     - 🐍 **Venonosa:** Indiretas inteligentes que doem no ego.
     - 🍸 **Elegante:** Fria, sofisticada e irônica.
   - Sistema de favoritos e geração rápida com sugestões prontas.

3. **Compartilhe o Deboche (Cards Virais para Redes):**
   - Transforma qualquer resposta em um card gráfico estilizado.
   - Formatos suportados:
     - 📱 **Instagram Stories:** 9:16 (1080x1920)
     - 🔲 **Instagram Feed / WhatsApp:** 1:1 (1080x1080)
   - Baixar em alta resolução (PNG) com confetti e animação.
   - Compartilhamento nativo via Web Share API.
   - Reações rápidas: *"Essa resposta foi perfeita"*, *"Mais venenosa"*, *"Mais debochada"*, *"Meu ex seria assim"*.

4. **Experiência do Usuário (UX):**
   - Onboarding interativo no primeiro acesso: *"Aqui ninguém superou ninguém. Só melhoramos as respostas."*
   - Sem cadastro obrigatório para experimentar.
   - Limite diário gratuito com contador visual amigável.
   - Modal cômico do plano *Ex VIP Ultra* (paródia de planos premium).

5. **Design Pink Aesthetic & Mobile-First:**
   - Paleta de cores oficial:
     - Rosa principal: `#FF4F9A`
     - Rosa neon: `#FF2E88`
     - Rosa claro: `#FFE4EF`
     - Rosa pastel: `#FFF0F6`
     - Branco: `#FFFFFF`
     - Preto suave: `#21131B`
     - Cinza: `#8B7883`
   - Glassmorphism, sombras suaves e microinterações com Framer Motion e Tailwind CSS.

---

## 🛠️ Tecnologias Utilizadas

- **Framework:** Next.js 14 (App Router)
- **Linguagem:** TypeScript
- **Estilização:** Tailwind CSS + Animações personalizadas
- **Ícones:** Lucide React + BrokenHeartIcon SVG personalizado
- **Motor de IA:** API flexível compatível com Google Gemini, OpenAI, Groq e motor dinâmico contextual local integrado
- **Exportação de Imagens:** `html-to-image`
- **Efeitos de Celebração:** `canvas-confetti`

---

## 🚀 Como Executar Localmente

### 1. Clonar ou Acessar a Pasta do Projeto
Certifique-se de estar na pasta do projeto:
```bash
cd "c:\Users\Aluno\Documents\THALITA E LAURA"
```

### 2. Instalar as Dependências
Caso ainda não tenha instalado:
```bash
npm install
```

### 3. Configurar Chaves de IA (Opcional)
Crie um arquivo `.env.local` na raiz do projeto (ou copie de `.env.example`):
```env
# Google Gemini API (Recomendado):
GEMINI_API_KEY=sua_chave_do_gemini_aqui

# Ou OpenAI:
# OPENAI_API_KEY=sua_chave_openai_aqui
```
> **Nota:** Se você não configurar nenhuma chave de API, o ExGPT utiliza automaticamente o seu **motor contextual local inteligente**, gerando respostas sarcásticas hilárias para todas as 7 personalidades sem quebrar!

### 4. Iniciar o Servidor de Desenvolvimento
```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

### 5. Build de Produção
Para testar a compilação de produção:
```bash
npm run build
npm start
```

---

## 🔒 Segurança e Boas Práticas

- As chaves de API são consumidas estritamente no backend (`/app/api/chat` e `/app/api/gerador`), nunca expostas no frontend.
- Prompt de sistema com salvaguardas rigorosas contra conteúdo abusivo, discriminatório, perseguição ou ameaças.
- Validação e higienização de payload em todas as rotas.
