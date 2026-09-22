import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import CardVirtual from '../components/CardVirtual';
import api from '../services/api';
import { CreditCard, Sliders, Shield, Lock, CheckCircle2, Loader2, Plus } from 'lucide-react';

export default function Cartoes() {
  const [cartoes, setCartoes] = useState([]);
  const [cartaoSelecionado, setCartaoSelecionado] = useState(null);
  const [novoLimite, setNovoLimite] = useState(5000);
  const [loading, setLoading] = useState(true);
  const [salvandoLimite, setSalvandoLimite] = useState(false);
  const [mensagemSucesso, setMensagemSucesso] = useState('');

  useEffect(() => {
    carregarCartoes();
  }, []);

  const carregarCartoes = async () => {
    setLoading(true);
    try {
      const res = await api.get('/cartoes');
      setCartoes(res.data);
      if (res.data.length > 0) {
        setCartaoSelecionado(res.data[0]);
        setNovoLimite(res.data[0].limiteTotal);
      }
    } catch (err) {
      console.error('Erro ao carregar cartões:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleStatus = async (id) => {
    try {
      const res = await api.patch(`/cartoes/${id}/status`);
      setCartoes(cartoes.map((c) => (c.id === id ? res.data : c)));
      if (cartaoSelecionado?.id === id) {
        setCartaoSelecionado(res.data);
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Erro ao alterar status.');
    }
  };

  const handleSalvarLimite = async () => {
    if (!cartaoSelecionado) return;
    setSalvandoLimite(true);
    setMensagemSucesso('');

    try {
      const res = await api.patch(`/cartoes/${cartaoSelecionado.id}/limite`, {
        novoLimite: parseFloat(novoLimite),
      });

      setCartoes(cartoes.map((c) => (c.id === cartaoSelecionado.id ? res.data : c)));
      setCartaoSelecionado(res.data);
      setMensagemSucesso('Limite atualizado com sucesso!');

      setTimeout(() => setMensagemSucesso(''), 3000);
    } catch (err) {
      alert(err.response?.data?.message || 'Erro ao atualizar limite.');
    } finally {
      setSalvandoLimite(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <div className="flex-1 max-w-7xl w-full mx-auto flex flex-col md:flex-row">
        <Sidebar />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6">
          
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              <CreditCard className="w-6 h-6 text-brand-700" />
              Gestão de Cartões
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Visualize seu cartão virtual de alta segurança, ajuste limites e proteja suas compras
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-start">
            
            {/* DISPLAY DO CARTÃO (5 colunas) */}
            <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
              <h3 className="text-sm font-bold text-slate-900">Seu Cartão Virtual</h3>

              {cartaoSelecionado ? (
                <CardVirtual
                  cartao={cartaoSelecionado}
                  onToggleStatus={handleToggleStatus}
                />
              ) : (
                <div className="py-12 text-center text-slate-400 text-xs">
                  {loading ? 'Carregando cartão...' : 'Nenhum cartão cadastrado.'}
                </div>
              )}

              {/* Informações de Fatura */}
              {cartaoSelecionado && (
                <div className="pt-4 border-t border-slate-100 space-y-3 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Limite Total:</span>
                    <strong className="text-slate-900">
                      R$ {Number(cartaoSelecionado.limiteTotal).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Fatura Atual (Utilizado):</span>
                    <strong className="text-rose-600">
                      R$ {Number(cartaoSelecionado.limiteUtilizado).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Limite Disponível:</span>
                    <strong className="text-emerald-600">
                      R$ {Number(cartaoSelecionado.limiteDisponivel).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </strong>
                  </div>
                </div>
              )}
            </div>

            {/* CONTROLES DO CARTÃO (7 colunas) */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-brand-100 text-brand-700 flex items-center justify-center">
                  <Sliders className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Ajuste de Limite de Crédito</h3>
                  <p className="text-xs text-slate-500">Altere o teto de gastos do seu cartão em tempo real</p>
                </div>
              </div>

              {mensagemSucesso && (
                <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>{mensagemSucesso}</span>
                </div>
              )}

              {/* Slider de Limite */}
              <div className="space-y-4 pt-2">
                <div className="flex justify-between items-baseline">
                  <span className="text-xs font-bold text-slate-600">Novo Limite Escolhido</span>
                  <span className="text-2xl font-black text-brand-800">
                    R$ {Number(novoLimite).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </span>
                </div>

                <input
                  type="range"
                  min="500"
                  max="20000"
                  step="100"
                  value={novoLimite}
                  onChange={(e) => setNovoLimite(e.target.value)}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-700"
                />

                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>Mínimo: R$ 500,00</span>
                  <span>Máximo: R$ 20.000,00</span>
                </div>

                <button
                  onClick={handleSalvarLimite}
                  disabled={salvandoLimite || Number(novoLimite) === Number(cartaoSelecionado?.limiteTotal)}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-brand-700 hover:bg-brand-800 text-white font-bold text-xs shadow-sm transition disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {salvandoLimite ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Salvando...
                    </>
                  ) : (
                    'Confirmar Novo Limite'
                  )}
                </button>
              </div>

              {/* Dicas de Segurança do Cartão */}
              <div className="pt-6 border-t border-slate-100 space-y-3">
                <h4 className="text-xs font-bold text-slate-800 flex items-center gap-2">
                  <Shield className="w-4 h-4 text-emerald-600" />
                  Recursos de Segurança E-Pay
                </h4>
                <ul className="text-xs text-slate-500 space-y-2 list-disc list-inside">
                  <li>O CVV dinâmico protege suas compras contra vazamentos de dados na internet.</li>
                  <li>Você pode bloquear temporariamente o cartão antes de dormir e reativar quando quiser.</li>
                  <li>Notificações push imediatas a cada compra autorizada.</li>
                </ul>
              </div>

            </div>

          </div>

        </main>
      </div>
    </div>
  );
}
