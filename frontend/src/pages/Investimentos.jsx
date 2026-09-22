import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import api from '../services/api';
import { TrendingUp, Coins, PiggyBank, Sparkles, ArrowUpRight, Calculator, Loader2 } from 'lucide-react';

export default function Investimentos() {
  const [valor, setValor] = useState(5000);
  const [meses, setMeses] = useState(12);
  const [resultado, setResultado] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    calcularRendimento();
  }, [valor, meses]);

  const calcularRendimento = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/investimentos/simulacao?valor=${valor}&meses=${meses}`);
      setResultado(res.data);
    } catch (err) {
      console.error('Erro na simulação de investimentos:', err);
    } finally {
      setLoading(false);
    }
  };

  const ganhoPoupanca = resultado ? resultado.rendimentoPoupanca - valor : 0;
  const ganhoCdi = resultado ? resultado.rendimentoCdi - valor : 0;
  const ganhoCripto = resultado ? resultado.rendimentoCripto - valor : 0;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <div className="flex-1 max-w-7xl w-full mx-auto flex flex-col md:flex-row">
        <Sidebar />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6">
          
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-brand-700" />
              Simulador de Investimentos & Cripto
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Compare a rentabilidade projetada do seu dinheiro no E-Pay em relação a aplicações tradicionais
            </p>
          </div>

          {/* PAINEL DE CONTROLE DE SIMULAÇÃO */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="grid md:grid-cols-2 gap-8">
              
              {/* Valor a Investir */}
              <div className="space-y-3">
                <div className="flex justify-between items-baseline">
                  <label className="text-xs font-bold text-slate-700">Valor Inicial Aplicado</label>
                  <span className="text-xl font-black text-brand-800">
                    R$ {Number(valor).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </span>
                </div>
                <input
                  type="range"
                  min="500"
                  max="50000"
                  step="500"
                  value={valor}
                  onChange={(e) => setValor(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-700"
                />
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>R$ 500</span>
                  <span>R$ 50.000</span>
                </div>
              </div>

              {/* Prazo em Meses */}
              <div className="space-y-3">
                <div className="flex justify-between items-baseline">
                  <label className="text-xs font-bold text-slate-700">Prazo de Aplicação</label>
                  <span className="text-xl font-black text-brand-800">
                    {meses} {meses === 1 ? 'mês' : 'meses'} ({ (meses / 12).toFixed(1) } anos)
                  </span>
                </div>
                <input
                  type="range"
                  min="3"
                  max="60"
                  step="3"
                  value={meses}
                  onChange={(e) => setMeses(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-700"
                />
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>3 meses</span>
                  <span>60 meses (5 anos)</span>
                </div>
              </div>

            </div>
          </div>

          {/* CARDS COMPARATIVOS DE RENTABILIDADE */}
          <div className="grid md:grid-cols-3 gap-6">
            
            {/* 1. Poupança */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center">
                  <PiggyBank className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Poupança Tradicional</h3>
                  <span className="text-[10px] text-slate-400 font-semibold">Taxa de ~6% ao ano</span>
                </div>
              </div>

              <div className="pt-2">
                <span className="text-[11px] text-slate-500 block font-medium">Total Acumulado:</span>
                <p className="text-2xl font-black text-slate-800">
                  R$ {resultado ? Number(resultado.rendimentoPoupanca).toLocaleString('pt-BR', { minimumFractionDigits: 2 }) : '0,00'}
                </p>
                <p className="text-xs font-bold text-amber-600 mt-1">
                  +R$ {ganhoPoupanca.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} de juros
                </p>
              </div>
            </div>

            {/* 2. E-Pay 100% CDI */}
            <div className="bg-gradient-to-br from-brand-900 to-emerald-900 text-white rounded-3xl p-6 shadow-xl space-y-4 border border-brand-500/30 relative overflow-hidden">
              <div className="absolute top-3 right-3">
                <span className="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-400 text-emerald-950">
                  Recomendado
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-white/20 text-emerald-300 flex items-center justify-center backdrop-blur">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">E-Pay 100% CDI</h3>
                  <span className="text-[10px] text-emerald-300 font-semibold">Liquidez diária garantida</span>
                </div>
              </div>

              <div className="pt-2">
                <span className="text-[11px] text-emerald-200 block font-medium">Total Acumulado:</span>
                <p className="text-3xl font-black text-white">
                  R$ {resultado ? Number(resultado.rendimentoCdi).toLocaleString('pt-BR', { minimumFractionDigits: 2 }) : '0,00'}
                </p>
                <p className="text-xs font-bold text-emerald-300 mt-1">
                  +R$ {ganhoCdi.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} (+{(ganhoCdi - ganhoPoupanca).toLocaleString('pt-BR', { minimumFractionDigits: 2 })} a mais que a poupança)
                </p>
              </div>
            </div>

            {/* 3. Cesta Cripto & Ativos Tech */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-teal-100 text-teal-700 flex items-center justify-center">
                  <Coins className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Cesta Cripto & Web3</h3>
                  <span className="text-[10px] text-teal-600 font-semibold">BTC, ETH & Ativos Tech</span>
                </div>
              </div>

              <div className="pt-2">
                <span className="text-[11px] text-slate-500 block font-medium">Projeção Estimada:</span>
                <p className="text-2xl font-black text-slate-900">
                  R$ {resultado ? Number(resultado.rendimentoCripto).toLocaleString('pt-BR', { minimumFractionDigits: 2 }) : '0,00'}
                </p>
                <p className="text-xs font-bold text-teal-600 mt-1">
                  +R$ {ganhoCripto.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} de potencial
                </p>
              </div>
            </div>

          </div>

          {/* EXPLICAÇÃO DIDÁTICA DO ALGORITMO */}
          <div className="p-6 rounded-3xl bg-slate-100 border border-slate-200 text-xs text-slate-600 space-y-2">
            <h4 className="font-bold text-slate-800 flex items-center gap-2">
              <Calculator className="w-4 h-4 text-brand-700" />
              Como a API Java Spring Boot calcula estes rendimentos?
            </h4>
            <p className="leading-relaxed">
              O endpoint <code>/api/investimentos/simulacao</code> aplica o cálculo de juros compostos com precisão financeira:
              <br />
              <code className="bg-white px-2 py-0.5 rounded border border-slate-200 font-mono text-[11px] inline-block my-1">
                M = C × (1 + i)^t
              </code>
              <br />
              Onde <strong>C</strong> é o capital inicial, <strong>i</strong> é a taxa mensal ponderada (0,5% a.m. na poupança e 0,85% a.m. no CDI) e <strong>t</strong> é o número de meses, arredondando com <code>BigDecimal.setScale(2, RoundingMode.HALF_EVEN)</code> para evitar dízimas flutuantes de moedas.
            </p>
          </div>

        </main>
      </div>
    </div>
  );
}
