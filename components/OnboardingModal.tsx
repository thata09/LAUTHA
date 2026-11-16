'use client';

import React, { useEffect, useState } from 'react';
import BrokenHeartIcon from './BrokenHeartIcon';
import { Sparkles, MessageCircleHeart, HeartCrack, Flame, Check } from 'lucide-react';
import confetti from 'canvas-confetti';

interface OnboardingModalProps {
  onStartChat: () => void;
}

export default function OnboardingModal({ onStartChat }: OnboardingModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Checa se o usuário já viu o onboarding
    const hasSeen = localStorage.getItem('exgpt_onboarding_seen');
    if (!hasSeen) {
      setIsOpen(true);
    }
  }, []);

  const handleStart = () => {
    localStorage.setItem('exgpt_onboarding_seen', 'true');
    setIsOpen(false);
    confetti({
      particleCount: 40,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FF4F9A', '#FF2E88', '#FFE4EF']
    });
    onStartChat();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-300">
      <div className="relative w-full max-w-md glass-card rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-pink-300 text-center animate-in zoom-in-95 duration-200">
        {/* AVATAR COM GLOW */}
        <div className="relative mx-auto w-20 h-20 mb-5">
          <div className="absolute inset-0 rounded-3xl bg-pink-400 blur-xl opacity-60 animate-pulse"></div>
          <div className="relative w-20 h-20 rounded-3xl bg-gradient-to-br from-pink-500 via-rose-500 to-pink-600 flex items-center justify-center shadow-pink">
            <BrokenHeartIcon className="w-10 h-10" />
          </div>
          <span className="absolute -bottom-1 -right-1 text-2xl">💅</span>
        </div>

        {/* TÍTULO & SLOGAN SOLICITADOS NA SEÇÃO 8 */}
        <h2 className="text-2xl sm:text-3xl font-black text-[#21131B] tracking-tight">
          Bem-vindo ao Ex<span className="gradient-text">GPT</span> 💗
        </h2>

        <div className="my-4 p-4 rounded-2xl bg-pink-100/70 border border-pink-200">
          <p className="text-base sm:text-lg font-bold text-pink-700 leading-snug">
            &quot;Aqui ninguém superou ninguém. Só melhoramos as respostas.&quot;
          </p>
        </div>

        <p className="text-sm text-brand-gray font-medium leading-relaxed mb-6">
          Escolha entre 7 personalidades tóxicas, sarcásticas e hilárias do seu ex com IA e transforme qualquer mensagem em um deboche viral.
        </p>

        {/* BENEFÍCIOS RÁPIDOS */}
        <div className="space-y-2 mb-6 text-left text-xs font-semibold text-brand-dark bg-white/70 p-3.5 rounded-2xl border border-pink-200">
          <div className="flex items-center gap-2 text-pink-700">
            <Check className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>Sem cadastro obrigatório: teste instantaneamente</span>
          </div>
          <div className="flex items-center gap-2 text-pink-700">
            <Check className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>7 personalidades ácidas e inteligentes</span>
          </div>
          <div className="flex items-center gap-2 text-pink-700">
            <Check className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>Gerador de cards para Stories e WhatsApp</span>
          </div>
        </div>

        {/* BOTÃO COMEÇAR A CONVERSAR */}
        <button
          onClick={handleStart}
          className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#FF4F9A] to-[#FF2E88] text-white font-extrabold text-base shadow-pink hover:shadow-neon hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
        >
          <MessageCircleHeart className="w-5 h-5" />
          <span>Começar a conversar</span>
        </button>

        <p className="text-[11px] text-brand-gray mt-3 font-medium">
          Totalmente anônimo e seguro. Seu ex de verdade nem vai sonhar.
        </p>
      </div>
    </div>
  );
}
