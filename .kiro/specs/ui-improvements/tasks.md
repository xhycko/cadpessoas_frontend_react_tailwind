# Plano de Implementação

- [x] 1. Criar componente PersonTable

  - Implementar tabela responsiva com colunas: avatar, nome, email, telefone, gênero, data, ações
  - Adicionar estados hover e loading por linha
  - Implementar responsividade para mobile (cards horizontais)
  - _Requisitos: Listagem em Tabela 1, 2, 4_

- [x] 2. Compactar PersonForm

  - Reduzir espaçamentos verticais de space-y-8 para space-y-4
  - Diminuir padding dos campos de py-4 para py-3
  - Simplificar header do formulário
  - Organizar todos os campos em grid 2 colunas quando possível
  - _Requisitos: Formulários Compactos 1, 2_

- [x] 3. Atualizar ListPessoas para usar tabela

  - Substituir grid de PersonCard por PersonTable
  - Manter funcionalidades de editar e excluir
  - Preservar estados de loading e error handling
  - _Requisitos: Listagem em Tabela 3, 5_

- [x] 4. Adicionar classes CSS para tabela

  - Criar classes utilitárias para tabela no design-system.css
  - Implementar estilos responsivos
  - Manter consistência com design system existente
  - _Requisitos: Consistência Visual 1, 3_

- [x] 5. Testar responsividade

  - Verificar layout em desktop, tablet e mobile
  - Validar funcionalidades em diferentes tamanhos de tela
  - Testar modo escuro
  - _Requisitos: Formulários Compactos 4, Listagem em Tabela 4, Consistência Visual 4_

