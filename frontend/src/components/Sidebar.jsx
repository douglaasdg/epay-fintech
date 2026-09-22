import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, ArrowLeftRight, Send, CreditCard, TrendingUp } from 'lucide-react';

export default function Sidebar() {
  const navItems = [
    { to: '/dashboard', label: 'Visão Geral', icon: LayoutDashboard },
    { to: '/extrato', label: 'Extrato & Histórico', icon: ArrowLeftRight },
    { to: '/pix', label: 'Área Pix', icon: Send },
    { to: '/cartoes', label: 'Meus Cartões', icon: CreditCard },
    { to: '/investimentos', label: 'Investimentos', icon: TrendingUp },
  ];

  return (
    <aside className="w-full md:w-64 bg-white border-r border-slate-200 shrink-0 p-4">
      <div className="space-y-1">
        <p className="px-3 text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
          Menu Principal
        </p>
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-sm transition ${
                  isActive
                    ? 'bg-brand-50 text-brand-800 font-semibold border-l-4 border-brand-700 shadow-sm'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`
              }
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </div>

      {/* Box de Ajuda / Suporte */}
      <div className="mt-8 p-4 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white shadow-sm">
        <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-brand-500 text-slate-950 mb-2">
          Suporte 24h
        </span>
        <h4 className="text-xs font-bold text-slate-100">Precisa de ajuda com sua conta?</h4>
        <p className="text-[11px] text-slate-400 mt-1">
          Nossa equipe financeira está disponível via chat e e-mail.
        </p>
        <a
          href="mailto:crisfer_012@outlook.com"
          className="mt-3 block text-center py-1.5 px-3 rounded-lg text-xs font-semibold bg-white/10 hover:bg-white/20 transition text-white"
        >
          Falar com Especialista
        </a>
      </div>
    </aside>
  );
}
