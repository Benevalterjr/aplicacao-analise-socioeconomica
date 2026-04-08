import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center p-4">
      <div className="text-center max-w-2xl">
        <h1 className="text-5xl font-bold text-slate-900 mb-4">Vila Sônia Analytics</h1>
        <p className="text-xl text-slate-600 mb-8">
          Dashboard de Indicadores Socioeconômicos
        </p>
        <p className="text-slate-600 mb-12">
          Análise completa de dados demográficos, econômicos e sociais da Vila Sônia, São Paulo.
          Integração com dados reais do IBGE Censo 2022 e Rede Nossa São Paulo 2024.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/dashboard">
            <Button className="gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg">
              Acessar Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
