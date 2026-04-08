# PRD: Aplicação de Análise Socioeconômica (Vila Sônia Analytics)

## 1. Visão Geral
O projeto **Vila Sônia Analytics** é uma plataforma de Business Intelligence (BI) de impacto social. O objetivo é consolidar dados demográficos do IBGE e indicadores socioeconômicos da Rede Nossa São Paulo para fornecer uma visão clara das desigualdades e demandas na região da Vila Sônia, subdistrito de São Paulo.

## 2. O Problema
Dados públicos do IBGE são granulares e ricos (Censo 2022), mas de difícil acesso para tomadores de decisão locais que não possuem conhecimento técnico em R ou Python. Além disso, indicadores de vulnerabilidade cultural raramente são cruzados com dados raciais e de renda no mesmo dashboard.

## 3. Público-Alvo
- Planejadores urbanos e gestores públicos.
- Organizações não governamentais (ONGs).
- Pesquisadores socioeconômicos.
- Lideranças comunitárias da região da Vila Sônia.

## 4. Requisitos Funcionais (Core)

### RF01: Integração com SIDRA (IBGE)
A aplicação deve ser capaz de realizar consultas dinâmicas na API REST do SIDRA (Agregados), especificamente nas tabelas do Censo 2022, para extrair população total e distribuição por cor/raça no nível municipal (N6).

### RF02: Cálculo de Vulnerabilidade Cultural
Deverá existir um algoritmo que calcule o índice de "gap cultural", cruzando a presença de equipamentos públicos com a densidade populacional e perfil econômico.

### RF03: Dashboard de Visualização
Exibição de cards de KPI (Renda, Idade Mediana, IDH-M) e gráficos comparativos (Barras e Pizza) para análise de distribuição racial e vulnerabilidade.

### RF04: Gestão de Dados Geográficos
Suporte para leitura de arquivos GeoJSON contendo a malha de setores censitários para futuras análises espaciais (Choropleth).

## 5. Requisitos Não Funcionais

### RNF01: Performance
O dashboard deve carregar os dados em menos de 2 segundos. Para isso, deve-se implementar uma estratégia de cache para os dados da API SIDRA.

### RNF02: Tipagem e Segurança
O projeto deve ser 100% desenvolvido em TypeScript com comunicação type-safe via tRPC entre o backend e o frontend.

## 6. Arquitetura de Dados
- **API SIDRA (IBGE)**: Fonte primária para demografia (2022).
- **Rede Nossa São Paulo**: Fonte para indicadores de óbito precoce e renda per capita.
- **Drizzle ORM**: Camada de persistência para armazenar cache e dados estáticos de referência.

## 7. Roadmap Futuro (Granularidade)
- **V2**: Implementar o "Match" entre a geometria dos 27.000 setores censitários do GeoJSON e os agregados demográficos locais.
- **V3**: Inclusão de dados de mobilidade urbana e acesso a transporte público via GTFS.
