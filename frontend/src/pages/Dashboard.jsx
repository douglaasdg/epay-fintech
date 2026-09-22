import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import CardVirtual from '../components/CardVirtual';
import ModalDeposito from '../components/ModalDeposito';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import {
  Eye, EyeOff, PlusCircle, Send, ArrowUpRight, ArrowDownLeft,
  CreditCard, TrendingUp, RefreshCw, AlertCircle, ArrowRight
} from 'lucide-react';

export default function Dashboard() {
  const { user, conta, atualizarDadosConta } = useAuth();
  const [showBalance, setShowBalance] = useState(true);
  const [transacoes, setTransacoes] = useState([]);
  const [cartoes, setCartoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDepositOpen, setIsDepositOpen] = useState(false);

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    setLoading(true);
    try {
      await atualizarDadosConta();
      const [resTrans, resCartoes] = await Promise.all([
        api.get('/transacoes/extrato'),
        api.get('/cartoes'),
      ]);
      setTransacoes(resTrans.data.slice(0, 5)); // Pega as 5 mais recentes
      setCartoes(resCartoes.data);
    } catch (err) {
      console.error('Erro ao carregar dados do dashboard:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleCardStatus = async (cartaoId) => {
    try {
      const res = await api.patch(`/cartoes/${cartaoId}/status`);
      setCartoes(cartoes.map((c) => (c.id === cartaoId ? res.data : c)));
    } catch (err) {
      alert(err.response?.data?.message || 'Erro ao alterar status do cartão.');
    }
  };

  // Cálculos de Entradas e Saídas do Mês
  const totalEntradas = transacoes
    .filter((t) => t.entrada)
    .reduce((acc, cur) => acc + cur.valor, 0);

  const totalSaidas = transacoes
    .filter((t) => !t.entrada)
    .reduce((acc, cur) => acc + cur.valor, 0);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <div className="flex-1 max-w-7xl w-full mx-auto flex flex-col md:flex-row">
        <Sidebar />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6">
          
          {/* Header de Boas-Vindas */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                Olá, {user?.nome?.split(' ')[0] || 'Cliente'} 👋
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                Agência: <strong className="text-slate-700">{conta?.agencia || '0001'}</strong> • Conta: <strong className="text-slate-700">{conta?.numeroConta}</strong> • Chave Pix: <strong className="text-slate-700">{conta?.chavePix}</strong>
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={carregarDados}
                disabled={loading}
                title="Atualizar dados"
                className="p-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-slate-600 transition"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              </button>
              <button
                onClick={() => setIsDepositOpen(true)}
                className="inline-flex items-center gap-1.5 py-2 px-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm hover:shadow transition"
              >
                <PlusCircle className="w-4 h-4" />
                Depositar Dinheiro
              </button>
            </div>
          </div>

          {/* CARD DE SALDO & ATALHOS RÁPIDOS */}
          <div className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-brand-950 text-white p-6 sm:p-8 shadow-xl relative overflow-hidden">
            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              
              {/* Informação de Saldo */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  <span>Saldo em Conta Corrente</span>
                  <button
                    onClick={() => setShowBalance(!showBalance)}
                    className="text-slate-400 hover:text-white transition"
                  >
                    {showBalance ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                <div className="flex items-baseline gap-2">
                  <span className="text-sm font-bold text-brand-400">R$</span>
                  <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
                    {showBalance
                      ? Number(conta?.saldo || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                      : '••••••••'}
                  </h2>
                </div>

                <p className="text-xs text-slate-400">
                  Rendendo <strong className="text-emerald-400">100% do CDI</strong> com liquidez diária
                </p>
              </div>

              {/* Botões de Ação Rápida */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <Link
                  to="/pix"
                  className="flex flex-col items-center justify-center p-3 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/10 transition backdrop-blur text-center group"
                >
                  <div className="w-9 h-9 rounded-xl bg-brand-500/30 text-brand-300 flex items-center justify-center mb-1.5 group-hover:scale-110 transition">
                    <Send className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-white">Fazer Pix</span>
                </Link>

                <button
                  onClick={() => setIsDepositOpen(true)}
                  className="flex flex-col items-center justify-center p-3 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/10 transition backdrop-blur text-center group"
                >
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/30 text-emerald-300 flex items-center justify-center mb-1.5 group-hover:scale-110 transition">
                    <PlusCircle className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-white">Depositar</span>
                </button>

                <Link
                  to="/cartoes"
                  className="flex flex-col items-center justify-center p-3 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/10 transition backdrop-blur text-center group"
                >
                  <div className="w-9 h-9 rounded-xl bg-amber-500/30 text-amber-300 flex items-center justify-center mb-1.5 group-hover:scale-110 transition">
                    <CreditCard className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-white">Cartões</span>
                </Link>

                <Link
                  to="/investimentos"
                  className="flex flex-col items-center justify-center p-3 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/10 transition backdrop-blur text-center group"
                >
                  <div className="w-9 h-9 rounded-xl bg-teal-500/30 text-teal-300 flex items-center justify-center mb-1.5 group-hover:scale-110 transition">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-white">Investir</span>
                </Link>
              </div>

            </div>
          </div>

          {/* GRID: ESTATÍSTICAS DO MÊS */}
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                <ArrowDownLeft className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-medium">Entradas Recentes</p>
                <p className="text-lg font-black text-emerald-600">
                  +R$ {totalEntradas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center shrink-0">
                <ArrowUpRight className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-medium">Saídas Recentes</p>
                <p className="text-lg font-black text-rose-600">
                  -R$ {totalSaidas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-100 text-brand-700 flex items-center justify-center shrink-0">
                <CreditCard className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-medium">Limite do Cartão</p>
                <p className="text-lg font-black text-slate-900">
                  R$ {cartoes[0] ? Number(cartoes[0].limiteDisponivel).toLocaleString('pt-BR', { minimumFractionDigits: 2 }) : '5.000,00'}
                </p>
              </div>
            </div>
          </div>

          {/* GRID PRINCIPAL: ÚLTIMAS TRANSAÇÕES + CARTÃO VIRTUAL */}
          <div className="grid lg:grid-cols-12 gap-6">
            
            {/* Histórico Recente (8 colunas) */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-slate-900">Últimas Transações</h3>
                <Link to="/extrato" className="text-xs font-bold text-brand-700 hover:text-brand-800 flex items-center gap-1">
                  Ver extrato completo <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {transacoes.length === 0 ? (
                <div className="py-12 text-center text-slate-400 space-y-2">
                  <AlertCircle className="w-8 h-8 mx-auto text-slate-300" />
                  <p className="text-xs font-medium">Nenhuma transação registrada ainda.</p>
                </div>
              ) : (
                <div className="divide-y divide-slate-100">
                  {transacoes.map((t) => (
                    <div key={t.id} className="py-3 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                            t.entrada
                              ? 'bg-emerald-100 text-emerald-700'
                              : 'bg-rose-100 text-rose-700'
                          }`}
                        >
                          {t.entrada ? <ArrowDownLeft className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-800">
                            {t.descricao || (t.entrada ? `Recebido de ${t.nomeOrigem}` : `Envio para ${t.nomeDestino}`)}
                          </p>
                          <p className="text-[11px] text-slate-400">
                            {t.tipo} • {new Date(t.dataHora).toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' })}
                          </p>
                        </div>
                      </div>

                      <div className="text-right">
                        <p
                          className={`text-xs font-black ${
                            t.entrada ? 'text-emerald-600' : 'text-rose-600'
                          }`}
                        >
                          {t.entrada ? '+' : '-'} R$ {Number(t.valor).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </p>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-semibold">
                          Concluído
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Cartão Virtual Preview (5 colunas) */}
            <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-slate-900">Cartão Virtual</h3>
                <Link to="/cartoes" className="text-xs font-bold text-brand-700 hover:text-brand-800">
                  Gerenciar
                </Link>
              </div>

              {cartoes.length > 0 ? (
                <CardVirtual cartao={cartoes[0]} onToggleStatus={handleToggleCardStatus} />
              ) : (
                <div className="py-8 text-center text-slate-400 text-xs">
                  Carregando cartão...
                </div>
              )}

              <p className="text-[11px] text-slate-400 text-center">
                Use este cartão para compras na internet com segurança reforçada.
              </p>
            </div>

          </div>

        </main>
      </div>

      <ModalDeposito
        isOpen={isDepositOpen}
        onClose={() => setIsDepositOpen(false)}
        onSuccess={carregarDados}
      />
    </div>
  );
}
