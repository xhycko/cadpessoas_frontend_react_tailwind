# CRUD React Tailwind

Projeto educacional demonstrando arquitetura REST com interface React e Tailwind CSS.

## Objetivo

Demonstrar como uma aplicação React consome uma API REST de forma desacoplada.

## Tecnologias

- **React 19** - Framework JavaScript
- **Vite** - Build tool e dev server
- **React Router DOM** - Roteamento
- **Tailwind CSS** - Framework CSS
- **Heroicons** - Ícones
- **Axios** - Cliente HTTP para API

## Características

- **Mobile-First**: Interface otimizada para dispositivos móveis
- **Responsivo**: Adapta-se a diferentes tamanhos de tela
- **Design Moderno**: Sistema de cores com tema escuro
- **Arquitetura REST**: Consome API REST existente
- **Componentização**: Componentes reutilizáveis e modulares

## Estrutura do Projeto

```
src/
├── components/
│   ├── common/          # Componentes compartilhados
│   ├── forms/           # Componentes de formulário
│   ├── layout/          # Componentes de layout
│   └── ui/              # Componentes de interface
├── contexts/            # Contextos React
├── pages/               # Páginas da aplicação
├── services/            # Serviços de API
├── hooks/               # Custom hooks
├── utils/               # Utilitários
├── models/              # Modelos de dados
└── styles/              # Estilos globais
```

## Configuração

### Pré-requisitos

- Node.js 18+
- npm
- API REST rodando em `http://localhost:8080`

### Instalação

1. Clone o repositório
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Configure a URL da API no arquivo `.env`:
   ```
   VITE_API_BASE_URL=http://localhost:8080/api
   ```

### Executar em Desenvolvimento

```bash
npm run dev
```

Aplicação disponível em `http://localhost:5173`

### Build para Produção

```bash
npm run build
```

## Funcionalidades

### Concluído

- [x] Estrutura base React com Vite
- [x] Sistema de roteamento React Router
- [x] Layout responsivo com header e footer
- [x] Sistema de cores e design moderno
- [x] Componentes compartilhados (Loading, Error, Toast, Dialog)
- [x] Serviço de API com tratamento de erros
- [x] Modelos de dados e validação
- [x] Página inicial com apresentação do projeto
- [x] Componentes de pessoa (PersonCard e PersonForm)
- [x] Páginas CRUD completas (Listar, Adicionar, Editar)
- [x] Página de monitoramento da API com auto-refresh
- [x] Integração completa com a API REST
- [x] Cards em formato de lista vertical compacta
- [x] Formulários com campos maiores e confortáveis
- [x] Tailwind CSS implementado
- [x] Context API para tema
- [x] Heroicons para ícones

## Design System

Sistema de design moderno com:

- **Cores**: Paleta inspirada no Discord/GitHub
- **Tipografia**: Fonte Inter para melhor legibilidade
- **Componentes**: Tailwind CSS customizado com tema escuro
- **Animações**: Transições suaves e micro-interações
- **Layout**: Lista vertical compacta
- **Formulários**: Campos grandes e confortáveis

## API REST

Endpoints consumidos:

- `GET /api/pessoas` - Listar pessoas
- `GET /api/pessoas/{id}` - Buscar pessoa por ID
- `POST /api/pessoas` - Criar pessoa
- `PUT /api/pessoas/{id}` - Atualizar pessoa
- `DELETE /api/pessoas/{id}` - Remover pessoa
- `GET /api/health` - Status da API

## Vantagens da Arquitetura REST

1. **Desacoplamento**: Frontend e backend independentes
2. **Reutilização**: API serve múltiplos clientes
3. **Escalabilidade**: Escale cada camada separadamente
4. **Flexibilidade**: Use diferentes tecnologias
5. **Testabilidade**: Teste cada camada isoladamente
6. **Manutenibilidade**: Código organizado e modular
