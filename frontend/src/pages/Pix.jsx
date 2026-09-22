import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { Send, CheckCircle2, AlertCircle, Loader2, Sparkles, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function Pix() {
  const { conta, atualizarDadosConta } = useAuth();
  const [chaveDestino, setChaveDestino] = useState('');
  const [valor, setValor] = useState('');
  const [descricao, setDescricao] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [recibo, setRecibo] = useState(null);

  const contatosFrequentes = [
    { nome: 'Maria Silva', chave: 'maria@epay.com.br', tipo: 'E-mail' },
    { nome: 'Douglas Cristian', chave: 'douglas@epay.com.br', tipo: 'E-mail' },
  ];

  const handleTransferir = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const numValor = parseFloat(valor.replace(',', '.'));
      if (isNaN(numValor) || numValor <= 0) {
        throw new Error('Informe um valor válido para transferência.');
      }

      const res = await api.post('/transacoes/pix', {
        chaveDestino: chaveDestino.trim(),
        valor: numValor,
        descricao: descricao || 'Transferência Pix via E-Pay App',
      });

      await atualizarDadosConta();
      setRecibo(res.data);
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Erro ao processar transferência Pix.');
    } finally {
      setLoading(false);
    }
  };

  const novaTransferencia = () => {
    setRecibo(null);
    setChaveDestino('');
    setValor('');
    setDescricao('');
    setError('');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <div className="flex-1 max-w-7xl w-full mx-auto flex flex-col md:flex-row">
        <Sidebar />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6">
          
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              <Send className="w-6 h-6 text-brand-700" />
              Área Pix
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Transfira dinheiro instantaneamente para qualquer chave Pix cadastrada
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-6">
            
            {/* FORMULÁRIO DE ENVIO PIX (7 colunas) */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
              
              {recibo ? (
                /* RECIBO DE CONFIRMAÇÃO */
                <div className="text-center space-y-6 animate-scaleUp py-4">
                  <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
                      Pix Enviado com Sucesso!
                    </span>
                    <h2 className="text-3xl font-black text-slate-900 mt-3">
                      R$ {Number(recibo.valor).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </h2>
                    <p className="text-xs text-slate-500 mt-1">
                      Destinatário: <strong className="text-slate-800">{recibo.nomeDestino}</strong>
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-left text-xs space-y-2 max-w-sm mx-auto">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Tipo:</span>
                      <span className="font-bold text-slate-700">{recibo.tipo}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Origem:</span>
                      <span className="font-bold text-slate-700">{recibo.nomeOrigem}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Descrição:</span>
                      <span className="font-bold text-slate-700">{recibo.descricao}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Data/Hora:</span>
                      <span className="font-bold text-slate-700">
                        {new Date(recibo.dataHora).toLocaleString('pt-BR')}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={novaTransferencia}
                    className="py-3 px-6 rounded-xl bg-brand-700 hover:bg-brand-800 text-white font-bold text-xs shadow-md transition"
                  >
                    Realizar Outro Pix
                  </button>
                </div>
              ) : (
                /* FORMULÁRIO PIX */
                <form onSubmit={handleTransferir} className="space-y-5">
                  
                  {/* Card de Saldo Disponível */}
                  <div className="p-4 rounded-2xl bg-slate-900 text-white flex justify-between items-center">
                    <div>
                      <p className="text-[11px] uppercase tracking-wider text-slate-400">Saldo Disponível</p>
                      <p className="text-xl font-black text-white">
                        R$ {Number(conta?.saldo || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </p>
                    </div>
                    <span className="text-[11px] font-bold text-brand-400 bg-brand-500/20 px-2.5 py-1 rounded-full">
                      Pix 24/7 sem taxas
                    </span>
                  </div>

                  {error && (
                    <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{error}</span>
                    </div>
                  )}

                  {/* Chave Pix */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Chave Pix ou Número da Conta de Destino
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="E-mail, CPF ou número da conta (ex.: maria@epay.com.br)"
                      value={chaveDestino}
                      onChange={(e) => setChaveDestino(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-brand-600"
                    />
                  </div>

                  {/* Sugestão de Contatos de Teste */}
                  <div>
                    <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                      Contatos Rápidos para Demonstração:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {contatosFrequentes.map((c, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setChaveDestino(c.chave)}
                          className="text-left p-2.5 rounded-xl border border-slate-200 hover:border-brand-500 hover:bg-brand-50/50 transition flex items-center gap-2"
                        >
                          <div className="w-7 h-7 rounded-full bg-brand-100 text-brand-800 flex items-center justify-center text-xs font-bold shrink-0">
                            {c.nome.charAt(0)}
                          </div>
                          <div className="truncate text-xs">
                            <p className="font-bold text-slate-800 leading-tight">{c.nome}</p>
                            <p className="text-[10px] text-slate-400 truncate">{c.chave}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Valor do Pix */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Valor a transferir (R$)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-400">
                        R$
                      </span>
                      <input
                        type="number"
                        step="0.01"
                        min="0.01"
                        required
                        placeholder="0,00"
                        value={valor}
                        onChange={(e) => setValor(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-slate-900 font-bold text-sm focus:outline-none focus:ring-2 focus:ring-brand-600"
                      />
                    </div>
                  </div>

                  {/* Descrição opcional */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Descrição / Mensagem (opcional)
                    </label>
                    <input
                      type="text"
                      placeholder="Ex.: Almoço, pagamento de serviço..."
                      value={descricao}
                      onChange={(e) => setDescricao(e.target.value)}
                      className="w-full px-4 py-2 rounded-xl border border-slate-200 text-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-brand-600"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 px-4 rounded-xl bg-brand-700 hover:bg-brand-800 text-white font-bold text-sm shadow-md hover:shadow-lg transition flex items-center justify-center gap-2 disabled:opacity-50 mt-4"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Validando e transferindo...
                      </>
                    ) : (
                      <>
                        Confirmar e Enviar Pix <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                </form>
              )}

            </div>

            {/* CARD LATERAL INFORMATIVO (5 colunas) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-brand-600" />
                  Sua Chave Pix Cadastrada
                </h3>
                <div className="p-3.5 rounded-2xl bg-brand-50 border border-brand-200">
                  <span className="text-[10px] uppercase tracking-wider text-brand-800 font-bold block mb-1">
                    Chave Ativa
                  </span>
                  <p className="font-mono text-xs font-bold text-brand-950 truncate">
                    {conta?.chavePix || 'Não cadastrada'}
                  </p>
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Pessoas e empresas podem enviar transferências diretamente para esta chave ou informando a Agência <strong>{conta?.agencia}</strong> e Conta <strong>{conta?.numeroConta}</strong>.
                </p>
              </div>

              <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-3xl p-6 shadow-sm space-y-2">
                <h4 className="text-xs font-bold text-slate-200">Garantia ACID & Transação Atômica</h4>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  O backend Java Spring Boot utiliza anotações <code>@Transactional</code> para assegurar que se houver qualquer instabilidade durante o débito ou crédito, a operação sofrerá Rollback automático no banco Oracle SQL.
                </p>
              </div>
            </div>

          </div>

        </main>
      </div>
    </div>
  );
}
