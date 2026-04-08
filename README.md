# Vila Sônia Analytics 📊

Aplicação de análise socioeconômica focada na região da Vila Sônia e no município de São Paulo, integrando dados reais do **IBGE (SIDRA)** e indicadores da **Rede Nossa São Paulo**.

## 🚀 Tecnologias

- **Frontend**: React 18, Vite, Tailwind CSS.
- **Gráficos**: Recharts.
- **Backend / API**: tRPC (Type-safe), React Query.
- **Banco de Dados**: Drizzle ORM (MySQL).
- **Dados**: Integração direta com a API SIDRA (IBGE - Censo 2022).

## 🛠️ Funcionalidades

- **Dashboard Socioeconômico**: Visualização de indicadores de raça, renda e vulnerabilidade.
- **Integração SIDRA**: Motor de busca de agregados (Tabela 9605) para dados demográficos reais.
- **Cálculo de Vulnerabilidade**: Algoritmo que cruza equipamentos culturais com perfil populacional.
- **Relatórios**: Tabela sintética consolidando todos os KPIs da região.

## 📦 Como Rodar

1. Instale as dependências:
   ```bash
   npm install
   ```

2. Rode em modo de desenvolvimento:
   ```bash
   npm run dev
   ```

3. Acesse em `http://localhost:5173`.

## 📂 Estrutura de Pastas

- `/src/services`: Motores de integração com APIs externas (SIDRA).
- `/src/components`: Componentes de UI e Gráficos.
- `/src/contexts`: Gerenciamento de estado e dados globais.
- `/geosjon`: Repositório de geometrias (Setores Censitários 2022).

---
*Desenvolvido para análise de impacto social e planejamento urbano.*
