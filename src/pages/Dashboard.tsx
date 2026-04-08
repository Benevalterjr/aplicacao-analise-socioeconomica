import { useState, useMemo } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { fetchAllIndicators } from "@/ibge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, RefreshCw, Users, TrendingUp, Heart, Palette, Landmark, BadgeCheck } from "lucide-react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import variablePie from "highcharts/modules/variable-pie";

// Initialize Highcharts modules
if (typeof variablePie === 'function') {
  (variablePie as any)(Highcharts);
} else if (variablePie && (variablePie as any).default) {
  (variablePie as any).default(Highcharts);
}

export default function Dashboard() {
  const [isUpdating, setIsUpdating] = useState(false);

  const { data: indicators, isLoading: indicatorsLoading, refetch } = useQuery({
    queryKey: ['indicators'],
    queryFn: () => fetchAllIndicators(),
  });

  const updateIndicators = useMutation({
    mutationFn: () => fetchAllIndicators(),
  });

  const handleUpdateData = async () => {
    setIsUpdating(true);
    try {
      await updateIndicators.mutateAsync();
      refetch();
    } catch (error) {
      console.error("Erro ao atualizar dados:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  // Pastel Color Palette
  const colors = {
    blue: "#A7C7E7",
    lavender: "#E6E6FA",
    mint: "#B2F2BB",
    peach: "#FFDAB9",
    rose: "#FFC0CB",
    sky: "#B0E0E6",
    sage: "#C3D9A5"
  };

  const raceChartOptions = useMemo(() => ({
    chart: {
      type: 'variablepie',
      backgroundColor: 'transparent',
      height: 350
    },
    title: { text: null },
    tooltip: {
      headerFormat: '',
      pointFormat: '<span style="color:{point.color}">\u25CF</span> <b> {point.name}</b><br/>' +
        'População: <b>{point.y}</b><br/>' +
        'Representatividade: <b>{point.z}%</b>'
    },
    plotOptions: {
      variablepie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '{point.name}',
          distance: 20,
          style: {
            fontSize: '12px',
            fontWeight: 'normal',
            textOutline: 'none',
            color: '#475569'
          }
        },
        borderWidth: 2,
        borderColor: '#ffffff'
      }
    },
    series: [{
      minPointSize: 10,
      innerSize: '40%',
      zMin: 0,
      name: 'Etnias',
      data: [
        { name: 'Branca', y: indicators?.populationWhite || 0, z: 100, color: colors.blue },
        { name: 'Preta', y: indicators?.populationBlack || 0, z: 80, color: colors.rose },
        { name: 'Parda', y: indicators?.populationPardo || 0, z: 90, color: colors.lavender },
        { name: 'Amarela', y: indicators?.populationYellow || 0, z: 60, color: colors.peach },
        { name: 'Indígena', y: indicators?.populationIndigenous || 0, z: 50, color: colors.mint }
      ]
    }],
    credits: { enabled: false }
  }), [indicators, colors]);

  const economicChartOptions = useMemo(() => ({
    chart: {
      type: 'areaspline',
      backgroundColor: 'transparent',
      height: 250
    },
    title: { text: null },
    xAxis: {
      categories: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
      lineColor: '#e2e8f0',
      tickColor: '#e2e8f0',
      labels: { style: { color: '#64748b' } }
    },
    yAxis: {
      title: { text: null },
      gridLineColor: '#f1f5f9',
      labels: { style: { color: '#64748b' } }
    },
    tooltip: {
      shared: true,
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      borderRadius: 12,
      borderWidth: 0,
      shadow: true
    },
    plotOptions: {
      areaspline: {
        fillOpacity: 0.2,
        color: colors.sky,
        lineWidth: 3,
        marker: {
          enabled: false,
          states: { hover: { enabled: true } }
        }
      }
    },
    series: [{
      name: 'IDH-M Projeção',
      data: [0.85, 0.86, 0.88, 0.87, 0.89, indicators?.idhM || 0.902]
    }],
    credits: { enabled: false }
  }), [indicators, colors]);

  if (indicatorsLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50">
        <div className="text-center">
          <Loader2 className="animate-spin w-12 h-12 text-primary mx-auto mb-4" />
          <p className="text-slate-500 font-medium animate-pulse">Carregando inteligência analítica...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pastel-gradient p-4 md:p-8 animate-in fade-in duration-700">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Top Bar / Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 glass-card p-6 rounded-3xl">
          <div>
            <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Socioeconomic Analytics</h1>
            <p className="text-slate-500 font-medium">Monitoramento Pro Max &bull; Censo 2022</p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              onClick={handleUpdateData}
              disabled={isUpdating}
              variant="outline"
              className="rounded-2xl border-white/40 bg-white/20 hover:bg-white/40 transition-all duration-300 gap-2 font-semibold text-slate-700"
            >
              {isUpdating ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4 text-slate-500" />}
              Sincronizar SIDRA
            </Button>
            <div className="w-10 h-10 rounded-full bg-slate-200 border-2 border-white shadow-sm flex items-center justify-center overflow-hidden">
               <BadgeCheck className="text-blue-400 w-6 h-6" />
            </div>
          </div>
        </header>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 grid-rows-none md:grid-rows-2 gap-6">
          
          {/* Main Stat Card - Spans 2 cols */}
          <Card className="md:col-span-2 glass-card hover:translate-y-[-4px] transition-transform duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-bold text-slate-500 uppercase tracking-wider">População Residente</CardTitle>
              <Users className="h-5 w-5 text-blue-300" />
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-black text-slate-800 leading-none py-4">
                {indicators?.populationTotal?.toLocaleString("pt-BR") || "—"}
              </div>
              <div className="flex items-center gap-2 mt-2">
                 <span className="px-2 py-1 bg-blue-100/50 text-blue-600 text-[10px] font-bold rounded-full uppercase">Censo Oficial</span>
              </div>
            </CardContent>
          </Card>

          {/* Social Impact Card */}
          <Card className="md:col-span-2 glass-card hover:translate-y-[-4px] transition-transform duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-bold text-slate-500 uppercase tracking-wider">Impacto Cultural</CardTitle>
              <Palette className="h-5 w-5 text-rose-300" />
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-black text-slate-800 leading-none py-4">
                {indicators?.culturalVulnerability?.toFixed(1)}
              </div>
              <p className="text-xs text-slate-500 font-medium">Índice de Vulnerabilidade Regional</p>
            </CardContent>
          </Card>

          {/* Small Feature Card - Sparkline */}
          <Card className="md:col-span-2 lg:col-span-2 glass-card overflow-hidden">
             <CardContent className="p-0">
                <div className="px-6 pt-6">
                   <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider">Evolução do IDH-M</h3>
                   <div className="text-2xl font-black text-slate-800">
                      {indicators?.idhM?.toFixed(3)}
                   </div>
                </div>
                <div className="h-40 -mt-8">
                   <HighchartsReact highcharts={Highcharts} options={economicChartOptions} />
                </div>
             </CardContent>
          </Card>

          {/* Large Creative Chart - Spans multiple rows/cols */}
          <Card className="md:col-span-4 lg:col-span-4 lg:row-span-1 glass-card overflow-hidden">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-slate-700">
                <Landmark className="w-5 h-5 text-lavender-400" />
                Diversidade Étnica (Variable Pie)
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
               <HighchartsReact highcharts={Highcharts} options={raceChartOptions} />
            </CardContent>
          </Card>

          {/* Secondary Stats - Bento Style */}
          <div className="md:col-span-6 lg:col-span-2 grid grid-cols-2 gap-4">
             <div className="glass-card p-6 rounded-3xl flex flex-col justify-center">
                <Heart className="w-6 h-6 text-rose-300 mb-2" />
                <div className="text-sm font-bold text-slate-500">Idade Média Morte</div>
                <div className="text-2xl font-black text-slate-800">{indicators?.averageDeathAge?.toFixed(1)} <span className="text-sm font-medium">anos</span></div>
             </div>
             <div className="glass-card p-6 rounded-3xl flex flex-col justify-center">
                <TrendingUp className="w-6 h-6 text-mint-400 mb-2" />
                <div className="text-sm font-bold text-slate-500">Renda Capita</div>
                <div className="text-xl font-black text-slate-800">R$ {indicators?.incomePerCapita?.toLocaleString("pt-BR")}</div>
             </div>
          </div>

        </div>

        {/* Footer info/attribution */}
        <footer className="text-center py-8">
           <p className="text-slate-400 text-sm font-medium">
             Dados processados via SIDRA API &bull; Desenvolvido com Antigravity UI/UX Pro Max
           </p>
        </footer>

      </div>
    </div>
  );
}
