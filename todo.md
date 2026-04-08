# Vila Sônia Analytics - TODO

## Backend - Integração IBGE

- [x] Implementar função para buscar dados de população do SIDRA (tabela 9605)
- [x] Implementar função para buscar dados de cor/raça do SIDRA (tabela 9606)
- [x] Implementar função para buscar idade mediana do SIDRA (tabela 9756)
- [x] Criar cache de dados para evitar requisições repetidas
- [x] Implementar função para processar dados do Rede Nossa São Paulo (mock)
- [x] Implementar cálculo de vulnerabilidade cultural (gap socioeconômico)
- [x] Criar endpoint tRPC para obter indicadores consolidados
- [x] Criar endpoint tRPC para atualizar dados manualmente

## Frontend - Dashboard

- [x] Criar layout principal do dashboard com cards de indicadores
- [x] Implementar seção de indicadores principais (cards com números)
- [x] Implementar gráfico de barras para comparação de indicadores
- [x] Implementar gráfico de pizza para distribuição racial
- [x] Implementar gráfico de linha para tendências
- [x] Criar tabela de relatório sintético com todos os indicadores
- [x] Implementar botão "Atualizar Dados" com loading e feedback visual
- [x] Criar seção de contexto explicativo com fontes de dados
- [x] Implementar responsividade e design elegante
- [x] Criar página Home com link para dashboard

## Testes

- [x] Testar cálculos de vulnerabilidade cultural (vitest)
- [x] Testar dados da Rede Nossa São Paulo (vitest)
- [ ] Testar integração com API SIDRA (requer mock/stub)
- [ ] Testar endpoints tRPC (requer contexto de teste)
- [ ] Testar UI do dashboard (requer teste visual/E2E)

## Deploy

- [x] Revisar todos os indicadores e cálculos
- [x] Validar design visual
- [x] Criar checkpoint final


## Bugs Reportados

- [x] Dashboard não carrega - usuário volta para tela inicial ao acessar /dashboard
