import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import {
  Wallet, Shield, Zap, TrendingUp, ArrowRight, CheckCircle2,
  Lock, Sparkles, Building2, Gift, LineChart, ChevronRight
} from 'lucide-react';

export default function LandingPage() {
  const [perfilAtivo, setPerfilAtivo] = useState(null);

  const perfis = [
    {
      tipo: 'Conservador',
      desc: 'Prioridade absoluta para preservação de capital e liquidez diária.',
      alocacao: '80% Renda Fixa (CDI / Tesouro), 15% Fundos DI, 5% Cripto Blue Chips',
      rendimento: '~11,5% ao ano',
      cor: 'border-emerald-500 bg-emerald-50/50 text-emerald-800'
    },
    {
      tipo: 'Moderado',
      desc: 'Equilíbrio entre segurança e busca por rentabilidades superiores.',
      alocacao: '50% Renda Fixa, 30% Fundos Multimercado, 20% Criptoativos (BTC/ETH)',
      rendimento: '~16,8% ao ano',
      cor: 'border-brand-500 bg-brand-50/50 text-brand-800'
    },
    {
      tipo: 'Arrojado',
      desc: 'Foco no longo prazo e alta tolerância a oscilações para maximizar ganhos.',
      alocacao: '20% Renda Fixa, 40% Ações & Fundos Globais, 40% Cripto & Web3',
      rendimento: '~24,5%+ ao ano',
      cor: 'border-teal-500 bg-teal-50/50 text-teal-800'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-32 bg-gradient-to-b from-white via-slate-50 to-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-100/80 border border-brand-200 text-brand-800 text-xs font-bold tracking-wide">
                <Sparkles className="w-4 h-4 text-brand-700" />
                <span>A NOVA ERA DOS SERVIÇOS FINANCEIROS</span>
              </div>

              <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight leading-[1.1]">
                Investimentos & Soluções Bancárias em <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-700 to-emerald-500">uma só conta.</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                O <strong>E-Pay</strong> une a segurança do padrão bancário com a velocidade do Pix e o potencial dos investimentos e criptomoedas. Tenha controle absoluto das suas finanças com tecnologia de ponta.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  to="/cadastro"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl bg-brand-700 hover:bg-brand-800 text-white font-bold text-base shadow-lg shadow-brand-600/30 hover:shadow-xl transition transform hover:-translate-y-0.5"
                >
                  Abrir Conta Gratuita <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  to="/login"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 font-bold text-base shadow-sm transition"
                >
                  Acessar Demonstração
                </Link>
              </div>

              {/* Badges de Confiança */}
              <div className="pt-6 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs font-semibold text-slate-500">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Conta Digital com Bônus</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-emerald-600" />
                  <span>Segurança Bancária JWT</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-emerald-600" />
                  <span>Pix Instantâneo 24/7</span>
                </div>
              </div>
            </div>

            {/* Mockup Interativo do Cartão & Dashboard */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-slate-200/80 space-y-6 relative">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div>
                    <span className="text-xs text-slate-400 font-medium">Saldo Disponível</span>
                    <h3 className="text-2xl font-black text-slate-900">R$ 5.420,50</h3>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                    +12,4% este mês
                  </span>
                </div>

                {/* Cartão Visual Preview */}
                <div className="rounded-2xl bg-gradient-to-tr from-slate-900 via-slate-800 to-brand-900 p-5 text-white shadow-lg space-y-4">
                  <div className="flex justify-between items-center text-xs font-bold">
                    <span>E-PAY BLACK</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-white/10">VIRTUAL</span>
                  </div>
                  <div className="pt-2 font-mono text-base tracking-widest text-slate-200">
                    5520 •••• •••• 8492
                  </div>
                  <div className="flex justify-between text-[11px] text-slate-400 pt-1">
                    <span>DOUGLAS C FERREIRA</span>
                    <span>VAL: 08/31</span>
                  </div>
                </div>

                {/* Ações Rápidas no Card */}
                <div className="grid grid-cols-3 gap-2 text-center text-xs font-semibold text-slate-600">
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 hover:bg-brand-50 hover:text-brand-800 transition">
                    Pix Rápido
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 hover:bg-brand-50 hover:text-brand-800 transition">
                    Extrato
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 hover:bg-brand-50 hover:text-brand-800 transition">
                    Investir
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SEÇÃO ORIGINAL E-PAY: ANÁLISE DE PERFIL DE INVESTIDOR */}
      <section id="investimentos" className="py-20 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <span className="px-3.5 py-1 rounded-full bg-brand-100 text-brand-800 font-bold text-xs">
              TECNOLOGIA FINANCEIRA INTELIGENTE
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Análise de Perfil de Investidor
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Muitas pessoas não sabem onde aplicar seu patrimônio. Nossa inteligência financeira ajuda você a descobrir exatamente a melhor estratégia com segurança e rentabilidade.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {perfis.map((p, idx) => (
              <div
                key={idx}
                onClick={() => setPerfilAtivo(p)}
                className={`cursor-pointer p-6 rounded-3xl border-2 transition duration-300 hover:shadow-xl ${
                  perfilAtivo?.tipo === p.tipo
                    ? p.cor + ' shadow-lg scale-105'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-xl font-bold text-slate-900">{p.tipo}</h3>
                  <span className="text-xs font-extrabold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
                    {p.rendimento}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mb-4">{p.desc}</p>
                <div className="p-3 rounded-xl bg-white border border-slate-100 text-xs font-medium text-slate-700 space-y-1">
                  <span className="text-[10px] uppercase tracking-wider text-slate-400 block font-bold">
                    Alocação Sugerida
                  </span>
                  <p>{p.alocacao}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEÇÃO ORIGINAL E-PAY: PILARES (LOCALIZAÇÃO, PACOTES & HOME BROKER) */}
      <section id="solucoes" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Tudo o que você precisa no seu dia a dia
            </h2>
            <p className="text-slate-500 text-sm mt-2">
              Soluções integradas com arquitetura segura em Spring Boot e banco Oracle SQL.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition">
              <div className="w-12 h-12 rounded-2xl bg-brand-100 text-brand-700 flex items-center justify-center mb-5">
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Imóveis & Ativos Reais</h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                Acesse oportunidades selecionadas de investimentos imobiliários com contratos auditados e taxas exclusivas.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-5">
                <Gift className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Pacotes & Benefícios</h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                Tarifa zero em transferências Pix, cartão virtual com cashback e bônus de boas-vindas na abertura de conta.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition">
              <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-700 flex items-center justify-center mb-5">
                <LineChart className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Home Broker Integrado</h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                Acompanhe ativos em tempo real, simule juros compostos no CDI e aloque em criptoativos de forma simplificada.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="mt-auto bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="flex items-center justify-center gap-2 text-white font-black text-lg">
            <Wallet className="w-5 h-5 text-brand-500" />
            <span>E-PAY FINTECH</span>
          </div>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Projeto Full-Stack desenvolvido por <strong>Douglas Cristian Ferreira</strong> com React, Java Spring Boot e Oracle SQL.
          </p>
          <p className="text-xs text-slate-600">
            &copy; {new Date().getFullYear()} E-Pay. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
