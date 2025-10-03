# Requisitos

## Introdução

App React mobile-first para CRUD de pessoas via API REST. Interface moderna e responsiva usando HTML/CSS puro com Tailwind CSS, sem dependência do Bootstrap.

## Requisitos

### Requisito 1

**História:** Como usuário, quero interface mobile responsiva sem Bootstrap, para gerenciar pessoas via API REST com design moderno.

#### Critérios de Aceitação

1. WHEN acessa mobile THEN sistema SHALL exibir interface responsiva usando Tailwind CSS
2. WHEN carrega THEN sistema SHALL consumir API REST
3. WHEN interage THEN sistema SHALL responder sem reload
4. WHEN visualiza THEN sistema SHALL usar apenas HTML/CSS customizado e Tailwind CSS
5. IF Bootstrap THEN sistema SHALL NOT usar nenhuma classe ou componente Bootstrap

### Requisito 2

**História:** Como usuário, quero operações CRUD completas, para gerenciar dados de pessoas.

#### Critérios de Aceitação

1. WHEN lista THEN sistema SHALL fazer GET e exibir dados
2. WHEN cria THEN sistema SHALL fazer POST
3. WHEN edita THEN sistema SHALL fazer PUT
4. WHEN exclui THEN sistema SHALL fazer DELETE
5. IF falha THEN sistema SHALL exibir erro

### Requisito 3

**História:** Como usuário, quero formulário com validação e design customizado, para cadastrar dados corretos sem usar Bootstrap.

#### Critérios de Aceitação

1. WHEN acessa formulário THEN sistema SHALL exibir: nome, email, telefone, gênero, data nascimento
2. WHEN preenche nome THEN sistema SHALL validar 2-100 caracteres
3. WHEN preenche email THEN sistema SHALL validar formato
4. WHEN preenche telefone THEN sistema SHALL aplicar máscara (XX) XXXXX-XXXX
5. WHEN seleciona gênero THEN sistema SHALL oferecer: Masculino, Feminino, Não Informado
6. IF campo vazio THEN sistema SHALL exibir erro
7. WHEN estiliza formulário THEN sistema SHALL usar apenas Tailwind CSS e CSS customizado
8. IF componente de formulário THEN sistema SHALL NOT usar classes Bootstrap

### Requisito 4

**História:** Como desenvolvedor, quero build otimizado para produção, para máximo desempenho e menor bundle.

#### Critérios de Aceitação

1. WHEN build produção THEN sistema SHALL minificar JS/CSS/HTML
2. WHEN build produção THEN sistema SHALL aplicar tree-shaking
3. WHEN build produção THEN sistema SHALL comprimir assets
4. WHEN build produção THEN sistema SHALL otimizar imagens
5. WHEN build produção THEN sistema SHALL gerar source maps
6. WHEN carrega THEN sistema SHALL usar lazy loading
7. WHEN carrega THEN sistema SHALL aplicar code splitting
8. IF bundle THEN sistema SHALL ter tamanho < 500KB gzipped