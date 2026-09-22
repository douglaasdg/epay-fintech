import React from 'react';
import { Wifi, Lock, Unlock, CreditCard } from 'lucide-react';

export default function CardVirtual({ cartao, onToggleStatus }) {
  const isBloqueado = cartao?.status === 'BLOQUEADO';

  return (
    <div className="space-y-4">
      {/* Visual do Cartão */}
      <div
        className={`relative w-full aspect-[1.586/1] max-w-sm rounded-3xl p-6 text-white shadow-2xl transition-all duration-300 transform hover:scale-[1.02] ${
          isBloqueado
            ? 'bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 opacity-90'
            : 'bg-gradient-to-br from-emerald-600 via-teal-700 to-slate-900 shadow-emerald-600/25'
        }`}
      >
        {/* Glow overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent_70%)] rounded-3xl pointer-events-none" />

        <div className="relative h-full flex flex-col justify-between">
          {/* Linha Superior: Logo + Contactless */}
          <div className="flex items-center justify-between">
            <span className="text-lg font-black tracking-wider flex items-center gap-1.5">
              E-PAY <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-white/20 uppercase tracking-normal">BLACK</span>
            </span>
            <div className="flex items-center gap-3">
              <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${
                isBloqueado
                  ? 'bg-rose-500/20 text-rose-200 border-rose-400/30'
                  : 'bg-emerald-400/20 text-emerald-200 border-emerald-300/30'
              }`}>
                {isBloqueado ? 'BLOQUEADO' : 'ATIVO'}
              </span>
              <Wifi className="w-5 h-5 rotate-90 text-white/80" />
            </div>
          </div>

          {/* Chip do Cartão */}
          <div className="my-auto flex items-center gap-4">
            <div className="w-11 h-8 rounded-md bg-gradient-to-tr from-amber-300 to-amber-100 border border-amber-400 shadow-inner flex items-center justify-center">
              <div className="w-7 h-5 border border-amber-500/40 rounded-sm grid grid-cols-2" />
            </div>
            {cartao?.tipo === 'VIRTUAL' && (
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-white/10 text-white/90">
                Cartão Virtual
              </span>
            )}
          </div>

          {/* Número Mascarado */}
          <div>
            <p className="font-mono text-lg sm:text-xl tracking-[0.2em] font-semibold text-white/95">
              {cartao?.numeroMascarado || '•••• •••• •••• ••••'}
            </p>
          </div>

          {/* Linha Inferior: Titular + Validade + Bandeira */}
          <div className="flex items-end justify-between text-xs">
            <div>
              <p className="text-[10px] uppercase tracking-wider text-white/60">Titular</p>
              <p className="font-bold tracking-wide uppercase">{cartao?.nomeTitular || 'CLIENTE VIP'}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-white/60">Validade</p>
              <p className="font-semibold">{cartao?.validade || '12/30'}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-white/60">CVV</p>
              <p className="font-mono font-semibold">{cartao?.cvv || '•••'}</p>
            </div>
            {/* Logo de Bandeira fictícia */}
            <div className="flex -space-x-2">
              <div className="w-6 h-6 rounded-full bg-rose-500/90" />
              <div className="w-6 h-6 rounded-full bg-amber-400/90" />
            </div>
          </div>
        </div>
      </div>

      {/* Botão de Ação Rápida: Bloquear / Desbloquear */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => onToggleStatus && onToggleStatus(cartao?.id)}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl font-semibold text-xs transition shadow-sm ${
            isBloqueado
              ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/20'
              : 'bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200'
          }`}
        >
          {isBloqueado ? (
            <>
              <Unlock className="w-4 h-4" />
              Desbloquear Cartão
            </>
          ) : (
            <>
              <Lock className="w-4 h-4" />
              Bloquear Temporariamente
            </>
          )}
        </button>
      </div>
    </div>
  );
}
