import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Wallet, LogOut, User, ShieldCheck, ArrowRight } from 'lucide-react';

export default function Navbar() {
  const { signed, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link to={signed ? "/dashboard" : "/"} className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-800 to-brand-600 flex items-center justify-center text-white shadow-md shadow-brand-500/20 group-hover:scale-105 transition">
            <Wallet className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xl font-black tracking-tight text-slate-900 flex items-center gap-1">
              E-PAY <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-brand-100 text-brand-800 tracking-normal">BANK</span>
            </span>
          </div>
        </Link>

        {/* Public or Auth Navigation */}
        <nav className="flex items-center gap-4">
          {!signed ? (
            <>
              <Link
                to="/"
                className="hidden md:inline-flex text-sm font-medium text-slate-600 hover:text-brand-800 transition"
              >
                Início
              </Link>
              <a
                href="#solucoes"
                className="hidden md:inline-flex text-sm font-medium text-slate-600 hover:text-brand-800 transition"
              >
                Soluções
              </a>
              <a
                href="#investimentos"
                className="hidden md:inline-flex text-sm font-medium text-slate-600 hover:text-brand-800 transition"
              >
                Investimentos
              </a>
              <div className="h-4 w-px bg-slate-200 hidden md:block" />
              <Link
                to="/login"
                className="text-sm font-semibold text-slate-700 hover:text-brand-700 px-3 py-2 rounded-lg transition"
              >
                Acessar Conta
              </Link>
              <Link
                to="/cadastro"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-white bg-brand-700 hover:bg-brand-800 px-4 py-2 rounded-xl shadow-sm hover:shadow transition transform hover:-translate-y-0.5"
              >
                Abrir Conta <ArrowRight className="w-4 h-4" />
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 text-xs font-semibold text-slate-700 border border-slate-200">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Sessão Protegida</span>
              </div>
              <div className="flex items-center gap-2 pl-2">
                <div className="w-9 h-9 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-800 flex items-center justify-center font-bold text-sm">
                  {user?.nome ? user.nome.charAt(0).toUpperCase() : 'U'}
                </div>
                <div className="hidden md:block text-left text-xs">
                  <p className="font-bold text-slate-800 leading-none">{user?.nome}</p>
                  <p className="text-slate-500">{user?.email}</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                title="Encerrar Sessão"
                className="p-2 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          )}
        </nav>

      </div>
    </header>
  );
}
