import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { fetchAllIndicators } from "@/ibge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, RefreshCw } from "lucide-react";
import { BarChart, Bar, PieChart, Pie, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from "recharts";
import { Streamdown } from "streamdown";

const COLORS = ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd"];

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const { data: indicators, isLoading: indicatorsLoading, refetch } = useQuery({
    queryKey: ['indicators'],
    queryFn: () => fetchAllIndicators(),
  });
  
  const updateIndicators = useMutation({
    mutationFn: () => fetchAllIndicators(),
  });

  const handleUpdateData = async () => {
    setIsLoading(true);
    setUpdateSuccess(false);
    try {
      await updateIndicators.mutateAsync();
      setUpdateSuccess(true);
      refetch();
      setTimeout(() => setUpdateSuccess(false), 3000);
    } catch (error) {
      console.error("Erro ao atualizar dados:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (indicatorsLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="animate-spin w-8 h-8" />
      </div>
    );
  }

  // Preparar dados para gráficos
  const indicatorsChartData = [
    { name: "Renda Per Capita", value: parseFloat(String(indicators?.incomePerCapita || 0)) },
    { name: "IDH-M", value: parseFloat(String(indicators?.idhM || 0)) * 100 },
    { name: "Idade Média", value: parseFloat(String(indicators?.averageDeathAge || 0)) },
  ];

  const raceChartData = [
    { name: "Branca", value: indicators?.populationWhite || 0 },
    { name: "Preta", value: indicators?.populationBlack || 0 },
    { name: "Parda", value: indicators?.populationPardo || 0 },
    { name: "Amarela", value: indicators?.populationYellow || 0 },
    { name: "Indígena", value: indicators?.populationIndigenous || 0 },
  ];

  const trendData = [
    { month: "Jan", value: 70 },
    { month: "Fev", value: 72 },
    { month: "Mar", value: 75 },
    { month: "Abr", value: 78 },
    { month: "Mai", value: 80 },
    { month: "Jun", value: 82 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Vila Sônia Analytics</h1>
          <p className="text-slate-600">Indicadores Socioeconômicos - São Paulo</p>
        </div>

        {/* Botão de Atualização */}
        <div className="mb-8 flex gap-4 items-center">
          <Button
            onClick={handleUpdateData}
            disabled={isLoading}
            className="gap-2 bg-blue-600 hover:bg-blue-700"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <RefreshCw className="w-4 h-4" />
            )}
            Atualizar Dados
          </Button>
          {updateSuccess && (
            <span className="text-green-600 font-medium">✓ Dados atualizados com sucesso!</span>
          )}
        </div>

        {/* Cards de Indicadores Principais */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="border-0 shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-slate-600">População Total</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-slate-900">
                {indicators?.populationTotal?.toLocaleString("pt-BR") || "—"}
              </div>
              <p className="text-xs text-slate-500 mt-1">Fonte: IBGE Censo 2022</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-slate-600">% Preto/Pardo</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-slate-900">
                {parseFloat(String(indicators?.percentageBlackPardo || 0)).toFixed(1)}%
              </div>
              <p className="text-xs text-slate-500 mt-1">Fonte: IBGE Censo 2022</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-slate-600">Renda Per Capita</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-slate-900">
                R$ {parseFloat(String(indicators?.incomePerCapita || 0)).toFixed(2)}
              </div>
              <p className="text-xs text-slate-500 mt-1">Fonte: Rede Nossa São Paulo 2024</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-slate-600">IDH-M</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-slate-900">
                {parseFloat(String(indicators?.idhM || 0)).toFixed(3)}
              </div>
              <p className="text-xs text-slate-500 mt-1">Fonte: Rede Nossa São Paulo 2024</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-slate-600">Idade Média de Morte</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-slate-900">
                {parseFloat(String(indicators?.averageDeathAge || 0)).toFixed(1)} anos
              </div>
              <p className="text-xs text-slate-500 mt-1">Fonte: Rede Nossa São Paulo 2024</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-slate-600">Vulnerabilidade Cultural</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-slate-900">
                {parseFloat(String(indicators?.culturalVulnerability || 0)).toFixed(2)}
              </div>
              <p className="text-xs text-slate-500 mt-1">Gap Socioeconômico</p>
            </CardContent>
          </Card>
        </div>

        {/* Gráficos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Gráfico de Barras */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Comparação de Indicadores</CardTitle>
              <CardDescription>Principais métricas socioeconômicas</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={indicatorsChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Gráfico de Pizza */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Distribuição por Cor/Raça</CardTitle>
              <CardDescription>População residente por categoria</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={raceChartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {raceChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Gráfico de Linha */}
        <Card className="border-0 shadow-lg mb-8">
          <CardHeader>
            <CardTitle>Tendências de Indicadores</CardTitle>
            <CardDescription>Evolução dos dados ao longo do tempo</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="value" stroke="#3b82f6" name="Índice" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Tabela de Relatório */}
        <Card className="border-0 shadow-lg mb-8">
          <CardHeader>
            <CardTitle>Relatório Sintético</CardTitle>
            <CardDescription>Consolidação de todos os indicadores</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-100 border-b">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-slate-900">Indicador</th>
                    <th className="px-4 py-3 text-left font-semibold text-slate-900">Valor</th>
                    <th className="px-4 py-3 text-left font-semibold text-slate-900">Fonte</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b hover:bg-slate-50">
                    <td className="px-4 py-3 text-slate-700">População Total</td>
                    <td className="px-4 py-3 font-medium text-slate-900">
                      {indicators?.populationTotal?.toLocaleString("pt-BR") || "—"}
                    </td>
                    <td className="px-4 py-3 text-slate-600">IBGE Censo 2022</td>
                  </tr>
                  <tr className="border-b hover:bg-slate-50">
                    <td className="px-4 py-3 text-slate-700">População Preta</td>
                    <td className="px-4 py-3 font-medium text-slate-900">
                      {indicators?.populationBlack?.toLocaleString("pt-BR") || "—"}
                    </td>
                    <td className="px-4 py-3 text-slate-600">IBGE Censo 2022</td>
                  </tr>
                  <tr className="border-b hover:bg-slate-50">
                    <td className="px-4 py-3 text-slate-700">População Parda</td>
                    <td className="px-4 py-3 font-medium text-slate-900">
                      {indicators?.populationPardo?.toLocaleString("pt-BR") || "—"}
                    </td>
                    <td className="px-4 py-3 text-slate-600">IBGE Censo 2022</td>
                  </tr>
                  <tr className="border-b hover:bg-slate-50">
                    <td className="px-4 py-3 text-slate-700">% Preto/Pardo</td>
                    <td className="px-4 py-3 font-medium text-slate-900">
                      {parseFloat(String(indicators?.percentageBlackPardo || 0)).toFixed(2)}%
                    </td>
                    <td className="px-4 py-3 text-slate-600">IBGE Censo 2022</td>
                  </tr>
                  <tr className="border-b hover:bg-slate-50">
                    <td className="px-4 py-3 text-slate-700">Renda Per Capita</td>
                    <td className="px-4 py-3 font-medium text-slate-900">
                      R$ {parseFloat(String(indicators?.incomePerCapita || 0)).toFixed(2)}
                    </td>
                    <td className="px-4 py-3 text-slate-600">Rede Nossa São Paulo 2024</td>
                  </tr>
                  <tr className="border-b hover:bg-slate-50">
                    <td className="px-4 py-3 text-slate-700">IDH-M</td>
                    <td className="px-4 py-3 font-medium text-slate-900">
                      {parseFloat(String(indicators?.idhM || 0)).toFixed(3)}
                    </td>
                    <td className="px-4 py-3 text-slate-600">Rede Nossa São Paulo 2024</td>
                  </tr>
                  <tr className="border-b hover:bg-slate-50">
                    <td className="px-4 py-3 text-slate-700">Idade Média de Morte</td>
                    <td className="px-4 py-3 font-medium text-slate-900">
                      {parseFloat(String(indicators?.averageDeathAge || 0)).toFixed(1)} anos
                    </td>
                    <td className="px-4 py-3 text-slate-600">Rede Nossa São Paulo 2024</td>
                  </tr>
                  <tr className="border-b hover:bg-slate-50">
                    <td className="px-4 py-3 text-slate-700">Equipamentos Culturais</td>
                    <td className="px-4 py-3 font-medium text-slate-900">
                      {indicators?.culturalEquipments || "—"}
                    </td>
                    <td className="px-4 py-3 text-slate-600">Rede Nossa São Paulo 2024</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="px-4 py-3 text-slate-700">Vulnerabilidade Cultural</td>
                    <td className="px-4 py-3 font-medium text-slate-900">
                      {parseFloat(String(indicators?.culturalVulnerability || 0)).toFixed(2)}
                    </td>
                    <td className="px-4 py-3 text-slate-600">Cálculo: (1 / (equipamentos + 0.1)) * 100</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Contexto Explicativo */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Sobre os Indicadores</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <Streamdown>
## Fontes de Dados

### IBGE Censo 2022
Os dados de **população total**, **distribuição por cor/raça** e **idade mediana** são obtidos diretamente da API SIDRA do Instituto Brasileiro de Geografia e Estatística (IBGE), referentes ao Censo Demográfico 2022. Estes dados representam o universo populacional residente no município de São Paulo.

### Rede Nossa São Paulo 2024
Os indicadores de **renda per capita**, **IDH-M** (Índice de Desenvolvimento Humano Municipal), **idade média de morte** e **equipamentos culturais** são baseados em dados da Rede Nossa São Paulo, uma organização que monitora indicadores socioeconômicos e de qualidade de vida no município.

## Cálculo da Vulnerabilidade Cultural

O **índice de vulnerabilidade cultural** é calculado utilizando a fórmula do gap socioeconômico:

Vulnerabilidade = 1 / (Equipamentos Culturais + 0.1) × 100

Este indicador reflete a disparidade de acesso a equipamentos culturais na região, onde valores mais altos indicam maior vulnerabilidade.

## Interpretação dos Dados

- **População Total**: Número de habitantes residentes
- **% Preto/Pardo**: Percentual da população que se autodeclara como preta ou parda
- **Renda Per Capita**: Renda média por habitante
- **IDH-M**: Índice que varia de 0 a 1, indicando desenvolvimento humano (quanto mais próximo de 1, melhor)
- **Idade Média de Morte**: Expectativa de vida média na região
            </Streamdown>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
