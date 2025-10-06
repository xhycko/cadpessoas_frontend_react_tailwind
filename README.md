# CRUD React Tailwind

Projeto educacional demonstrando arquitetura REST com interface React e Tailwind CSS.

## Objetivo
Demonstrar como aplicação React consome API REST de forma desacoplada.

## Tecnologias
- **React 19** - Framework JavaScript
- **Vite** - Build tool
- **React Router DOM** - Roteamento
- **Tailwind CSS** - Framework CSS
- **Heroicons** - Ícones
- **Axios** - Cliente HTTP

## Características
- **Mobile-First**: Interface otimizada para móveis
- **Responsivo**: Adapta-se a diferentes telas
- **Design Moderno**: Sistema de cores tema escuro
- **Arquitetura REST**: Consome API REST existente
- **Componentização**: Componentes reutilizáveis

## Estrutura
```
src/
├── components/
│   ├── common/          # Compartilhados
│   ├── forms/           # Formulários
│   ├── layout/          # Layout
│   └── ui/              # Interface
├── contexts/            # Contextos React
├── pages/               # Páginas
├── services/            # API
├── hooks/               # Custom hooks
├── utils/               # Utilitários
├── models/              # Modelos
└── styles/              # Estilos
```

## Configuração

### Pré-requisitos
- Node.js 18+
- npm
- API REST em `http://localhost:8080`

### Instalação
```bash
npm rebuild
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

### Configurar API
```
VITE_API_BASE_URL=http://localhost:8080/api
```

### Executar
```bash
npm run dev
```
Acesso: `http://localhost:5173`

### Build
```bash
npm run build
```

## Funcionalidades
- [x] Estrutura React com Vite
- [x] Roteamento React Router
- [x] Layout responsivo
- [x] Sistema de cores moderno
- [x] Componentes compartilhados (Loading, Error, Toast, Dialog)
- [x] Serviço API com tratamento de erros
- [x] Modelos de dados e validação
- [x] Página inicial
- [x] Componentes pessoa (PersonCard, PersonForm)
- [x] Páginas CRUD completas
- [x] Monitoramento API com auto-refresh
- [x] Integração completa API REST
- [x] Cards em lista vertical compacta
- [x] Formulários com campos maiores
- [x] Tailwind CSS implementado
- [x] Context API para tema
- [x] Heroicons para ícones

## Design System
- **Cores**: Paleta Discord/GitHub
- **Tipografia**: Fonte Inter
- **Componentes**: Tailwind CSS tema escuro
- **Animações**: Transições suaves
- **Layout**: Lista vertical compacta
- **Formulários**: Campos grandes e confortáveis

## API REST
- `GET /api/pessoas` - Listar pessoas
- `GET /api/pessoas/{id}` - Buscar por ID
- `POST /api/pessoas` - Criar pessoa
- `PUT /api/pessoas/{id}` - Atualizar pessoa
- `DELETE /api/pessoas/{id}` - Remover pessoa
- `GET /api/health` - Status da API

## Vantagens Arquitetura REST
1. **Desacoplamento**: Frontend e backend independentes
2. **Reutilização**: API serve múltiplos clientes
3. **Escalabilidade**: Escale cada camada separadamente
4. **Flexibilidade**: Use diferentes tecnologias
5. **Testabilidade**: Teste cada camada isoladamente
6. **Manutenibilidade**: Código organizado e modular
