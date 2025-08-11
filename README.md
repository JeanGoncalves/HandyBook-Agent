# 🚀 HandyBook-Agent

**Concierge de serviços para profissionais** - Uma plataforma inteligente que conecta clientes com profissionais qualificados.

## ✨ Funcionalidades

- 🔍 **Busca de profissionais** por localização, preço e avaliação
- 📅 **Consulta de agendas** e disponibilidade
- 📝 **Gestão de reservas** (criar, editar, cancelar)
- 💰 **Solicitação de orçamentos**
- ⭐ **Sistema de avaliações** e reviews
- 🎯 **Filtros inteligentes** por categoria de serviço

## 🧩 Requisito para o agente (Gemini)

Para o chat do agente funcionar com a IA, é necessário configurar a chave de API do Google Gemini.

1. Obtenha sua chave em: https://ai.google.dev/
2. Crie o arquivo `backend/.env` com o conteúdo (use o modelo `backend/.env.example`):

```
GOOGLE_API_KEY=SEU_TOKEN_GEMINI
# (opcional) GEMINI_API_KEY=SEU_TOKEN_GEMINI
```

Com isso, o backend usará o Gemini via LangChain.

## 🚀 Início Rápido

### Pré-requisitos

- Node.js 18+ 
- npm ou yarn

### Instalação

```bash
# Clone o repositório
git clone https://github.com/JeanGoncalves/HandyBook-Agent.git

# Entre na pasta
cd HandyBook-Agent

# Instale as dependências
npm install
```

### Desenvolvimento

```bash
# Executar em modo desenvolvimento (frontend + backend)
npm run dev:back
npm run dev:front

# Executar com hot-reload do app Node base (se aplicável)
npm run watch

# Build do projeto
npm run build:back
npm run build:front

# Executar build
npm start
```

## 🏗️ Estrutura do Projeto

```
src/
├── index.ts          # Ponto de entrada da aplicação
├── controllers/      # Controladores das rotas
├── services/         # Lógica de negócio
├── models/           # Modelos de dados
├── utils/            # Funções utilitárias
└── types/            # Definições de tipos TypeScript
```

## 🔧 Tecnologias

- **TypeScript** - Linguagem principal
- **Node.js** - Runtime JavaScript
- **Express** - Framework web (futuro)
- **Zod** - Validação de dados (futuro)

## 📱 API Endpoints (Futuro)

### Profissionais
- `GET /professionals` - Listar profissionais
- `GET /professionals/:id` - Detalhes do profissional
- `GET /professionals/search/nearby` - Busca por proximidade
- `GET /professionals/service/:category` - Por categoria

### Reservas
- `POST /bookings` - Criar reserva
- `PUT /bookings/:id` - Atualizar reserva
- `DELETE /bookings/:id` - Cancelar reserva

### Avaliações
- `POST /reviews` - Criar avaliação
- `GET /professionals/:id/reviews` - Listar avaliações

## 🧪 Testes

```bash
# Executar testes (futuro)
npm test

# Testes com coverage (futuro)
npm run test:coverage
```

## 📦 Scripts Disponíveis

- `npm run build` - Compila o TypeScript
- `npm run dev` - Executa em modo desenvolvimento
- `npm run watch` - Executa com hot-reload
- `npm start` - Executa o build compilado
- `npm run clean` - Remove pasta dist

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença ISC. Veja o arquivo `LICENSE` para mais detalhes.

## 👨‍💻 Autor

**Jean Gonçalves**
- GitHub: [@JeanGoncalves](https://github.com/JeanGoncalves)

## 🙏 Agradecimentos

- Mock API para desenvolvimento e testes
- Comunidade TypeScript
- Profissionais que inspiram este projeto

---

**HandyBook-Agent** - Conectando profissionais e clientes de forma inteligente! 🎯
