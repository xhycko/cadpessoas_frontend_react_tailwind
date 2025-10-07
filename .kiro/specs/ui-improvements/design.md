# Design

## Visão Geral

Redesign da interface para formulários compactos e listagem em tabela horizontal, mantendo o design system existente.

## Arquitetura

### Componentes Afetados
- `PersonForm.jsx` - Formulário compacto
- `PersonCard.jsx` - Substituído por `PersonTable.jsx`
- `ListPessoas.jsx` - Layout de tabela

### Design System
- Manter classes CSS existentes
- Usar espaçamentos menores (py-2, py-3 vs py-4, py-8)
- Preservar cores e tipografia

## Componentes e Interfaces

### PersonForm Compacto
```jsx
// Layout mais denso
- Reduzir espaçamentos verticais (space-y-4 vs space-y-8)
- Campos menores (py-3 vs py-4)
- Header simplificado
- Grid 2 colunas para todos os campos quando possível
```

### PersonTable
```jsx
// Nova tabela responsiva
- Colunas: Avatar, Nome, Email, Telefone, Gênero, Data, Ações
- Responsiva: stack em mobile
- Hover states
- Loading states por linha
- Ações inline (editar/excluir)
```

### Layout Responsivo
```css
// Desktop: tabela completa
// Tablet: tabela com scroll horizontal
// Mobile: cards empilhados horizontalmente
```

## Modelos de Dados

Sem alterações nos modelos existentes.

## Tratamento de Erros

Manter tratamento de erros existente:
- Validação em tempo real
- Estados de loading
- Mensagens de erro

## Estratégia de Testes

- Testes visuais de responsividade