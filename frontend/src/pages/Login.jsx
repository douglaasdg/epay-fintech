import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Wallet, Lock, Mail, Eye, EyeOff, Loader2, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email.trim(), senha.trim());
      navigate('/dashboard');
    } catch (err) {
      if (!err.response) {
        setError('Não foi possível conectar ao servidor. Verifique se o backend está ativo.');
      } else if (err.response.status === 401) {
        setError('E-mail ou senha incorretos.');
      } else {
        setError(err.response?.data?.message || 'Erro ao efetuar login. Tente novamente.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Login rápido de teste com 1 clique (para recrutadores / avaliação)
  const preencherDemo = (demoEmail) => {
    setEmail(demoEmail);
    setSenha('123456');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-slate-100 to-emerald-50/40 p-4">
      <div className="w-full max-w-md">
        
        {/* Header com Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2.5 mb-3 group">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-800 to-brand-600 flex items-center justify-center text-white shadow-lg shadow-brand-600/30 group-hover:scale-105 transition">
              <Wallet className="w-6 h-6" />
            </div>
            <span className="text-2xl font-black tracking-tight text-slate-900">
              E-PAY <span className="text-xs px-2 py-0.5 rounded-full bg-brand-100 text-brand-800">BANK</span>
            </span>
          </Link>
          <h2 className="text-2xl font-black text-slate-900">Acesse sua Conta</h2>
          <p className="text-xs text-slate-500 mt-1">
            Informe suas credenciais ou use o acesso rápido para teste
          </p>
        </div>

        {/* Card do Formulário */}
        <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-200/80">
          
          {/* Card de Teste Rápido (Recrutadores) */}
          <div className="mb-6 p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200">
            <p className="text-[11px] font-bold text-emerald-900 mb-2 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Contas de Demonstração (1 Clique):
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => preencherDemo('douglas@epay.com.br')}
                className="flex-1 py-1.5 px-2 rounded-xl bg-white border border-emerald-300 text-emerald-900 text-xs font-semibold hover:bg-emerald-100 transition text-center shadow-xs"
              >
                👤 Douglas (Titular)
              </button>
              <button
                type="button"
                onClick={() => preencherDemo('maria@epay.com.br')}
                className="flex-1 py-1.5 px-2 rounded-xl bg-white border border-emerald-300 text-emerald-900 text-xs font-semibold hover:bg-emerald-100 transition text-center shadow-xs"
              >
                👤 Maria (Contato Pix)
              </button>
            </div>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                E-mail
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-brand-600"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-xs font-bold text-slate-700">
                  Senha de Acesso
                </label>
                <span className="text-[11px] text-slate-400">Padrão demo: 123456</span>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-brand-600"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-xl bg-brand-700 hover:bg-brand-800 text-white font-bold text-sm shadow-md hover:shadow-lg transition flex items-center justify-center gap-2 disabled:opacity-50 mt-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Autenticando...
                </>
              ) : (
                <>
                  Entrar no Internet Banking <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center text-xs text-slate-500">
            Ainda não tem conta no E-Pay?{' '}
            <Link to="/cadastro" className="font-bold text-brand-700 hover:underline">
              Abra sua conta agora
            </Link>
          </div>
        </div>

        <div className="text-center mt-6 text-xs text-slate-400">
          <Link to="/" className="hover:underline">
            ← Voltar para a Página Inicial
          </Link>
        </div>

      </div>
    </div>
  );
}
