import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import api from '../services/api';
import {
  ArrowLeftRight, ArrowDownLeft, ArrowUpRight, Search, Filter,
  Calendar, Download, RefreshCw
} from 'lucide-react';

export default function Extrato() {
  const [transacoes, setTransacoes] = useState([]);
  const [filtroTipo, setFiltroTipo] = useState('TODOS');
  const [busca, setBusca] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregarExtrato();
  }, []);

  const carregarExtrato = async () => {
    setLoading(true);
    try {
      const res = await api.get('/transacoes/extrato');
      setTransacoes(res.data);
    } catch (err) {
      console.error('Erro ao carregar extrato:', err);
    } finally {
      setLoading(false);
    }
  };

  // Filtragem combinada por busca de texto e tipo
  const transacoesFiltradas = transacoes.filter((t) => {
    const matchTipo =
      filtroTipo === 'TODOS' ||
      (filtroTipo === 'ENTRADAS' && t.entrada) ||
      (filtroTipo === 'SAIDAS' && !t.entrada) ||
      t.tipo === filtroTipo;

    const textoDesc = (t.descricao || '').toLowerCase();
    const textoOrigem = (t.nomeOrigem || '').toLowerCase();
    const textoDestino = (t.nomeDestino || '').toLowerCase();
    const termo = busca.toLowerCase();

    const matchBusca =
      !busca ||
      textoDesc.includes(termo) ||
      textoOrigem.includes(termo) ||
      textoDestino.includes(termo);

    return matchTipo && matchBusca;
  });

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <div className="flex-1 max-w-7xl w-full mx-auto flex flex-col md:flex-row">
        <Sidebar />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                <ArrowLeftRight className="w-6 h-6 text-brand-700" />
                Extrato da Conta
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                Consulte todas as suas movimentações financeiras detalhadas
              </p>
            </div>

            <button
              onClick={carregarExtrato}
              disabled={loading}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-100 transition"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              Atualizar Extrato
            </button>
          </div>

          {/* BARRA DE FILTROS E BUSCA */}
          <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Buscar por descrição, nome ou favorecido..."
                  value={busca}
                  onChange={(e) => setBusca(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-brand-600"
                />
              </div>

              {/* Pílulas de Filtro */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
                {[
                  { id: 'TODOS', label: 'Todas' },
                  { id: 'ENTRADAS', label: 'Entradas (+)' },
                  { id: 'SAIDAS', label: 'Saídas (-)' },
                  { id: 'PIX', label: 'Pix' },
                  { id: 'DEPOSITO', label: 'Depósitos' },
                ].map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setFiltroTipo(f.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                      filtroTipo === f.id
                        ? 'bg-brand-700 text-white shadow-sm'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* LISTA DE TRANSAÇÕES */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
            {loading ? (
              <div className="py-12 text-center text-slate-400 text-xs">
                Carregando histórico financeiro...
              </div>
            ) : transacoesFiltradas.length === 0 ? (
              <div className="py-12 text-center text-slate-400 text-xs">
                Nenhuma transação encontrada para os filtros selecionados.
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {transacoesFiltradas.map((t) => (
                  <div
                    key={t.id}
                    className="py-3.5 flex items-center justify-between hover:bg-slate-50/50 px-2 rounded-xl transition"
                  >
                    <div className="flex items-center gap-3.5">
                      <div
                        className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${
                          t.entrada
                            ? 'bg-emerald-100 text-emerald-700'
                            : 'bg-rose-100 text-rose-700'
                        }`}
                      >
                        {t.entrada ? <ArrowDownLeft className="w-5 h-5" /> : <ArrowUpRight className="w-5 h-5" />}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-900">
                          {t.descricao || (t.entrada ? `Recebido de ${t.nomeOrigem}` : `Envio para ${t.nomeDestino}`)}
                        </p>
                        <p className="text-[11px] text-slate-400">
                          {t.tipo} • {new Date(t.dataHora).toLocaleString('pt-BR', { dateStyle: 'long', timeStyle: 'short' })}
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <p
                        className={`text-sm font-black ${
                          t.entrada ? 'text-emerald-600' : 'text-rose-600'
                        }`}
                      >
                        {t.entrada ? '+' : '-'} R$ {Number(t.valor).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </p>
                      <span className="text-[10px] font-bold text-slate-400">
                        {t.entrada ? `De: ${t.nomeOrigem}` : `Para: ${t.nomeDestino}`}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </main>
      </div>
    </div>
  );
}
