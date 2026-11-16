'use client';

import React from 'react';
import BrokenHeartIcon from './BrokenHeartIcon';
import { X, Sparkles, Check, Zap, Crown, Flame } from 'lucide-react';
import confetti from 'canvas-confetti';

interface PremiumModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PremiumModal({ isOpen, onClose }: PremiumModalProps) {
  if (!isOpen) return null;

  const handleFakeUpgrade = () => {
    confetti({
      particleCount: 50,
      spread: 80,
      origin: { y: 0.5 },
      colors: ['#FF4F9A', '#FFD700', '#FF2E88']
    });
    alert('🎉 Modo VIP ativado! Suas mensagens gratuitas foram resetadas para o infinito!');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md glass-card rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-pink-400 text-center animate-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-pink-100 text-brand-gray transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-16 h-16 mx-auto rounded-3xl bg-gradient-to-tr from-amber-400 via-pink-500 to-rose-600 flex items-center justify-center shadow-pink mb-4 text-white">
          <Crown className="w-8 h-8" />
        </div>

        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-black bg-amber-100 text-amber-800 border border-amber-300 mb-2">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" /> PLANO EX VIP ULTRA
        </span>

        <h3 className="text-2xl font-black text-[#21131B] tracking-tight">
          Supere com Classe & Luxo
        </h3>
        <p className="text-xs text-brand-gray font-medium mt-1 mb-5">
          Para quem não quer limite de indiretas e deboches diários
        </p>

        <div className="space-y-2.5 text-left text-xs font-semibold text-brand-dark bg-pink-50/70 p-4 rounded-2xl border border-pink-200 mb-6">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Mensagens e deboches 100% ilimitados</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Acesso a todas as 7 personalidades tóxicas</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Exportação de cards em Ultra HD (4K) para Stories</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Modo Fantasma: O ex nunca saberá que você usou IA</span>
          </div>
          <div className="flex items-center gap-2 opacity-80">
            <Check className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Áudios falsos de 4 minutos às 3h da manhã (Em breve)</span>
          </div>
        </div>

        <div className="mb-5">
          <div className="text-3xl font-black text-pink-600">
            R$ 0,00 <span className="text-xs font-normal text-brand-gray">/ por enquanto</span>
          </div>
          <p className="text-[11px] text-pink-500 font-bold">
            Porque cobrar de quem já sofreu por amor seria crueldade!
          </p>
        </div>

        <button
          onClick={handleFakeUpgrade}
          className="w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-amber-500 via-pink-500 to-rose-600 text-white font-extrabold text-sm shadow-pink hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
        >
          <Zap className="w-4 h-4 fill-white" />
          <span>Desbloquear Modo VIP Grátis</span>
        </button>
      </div>
    </div>
  );
}
