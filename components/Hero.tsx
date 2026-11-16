'use client';

import React from 'react';
import Link from 'next/link';
import BrokenHeartIcon from './BrokenHeartIcon';
import {
  MessageCircleHeart,
  Sparkles,
  Zap,
  Users,
  Share2,
  ArrowRight,
  ShieldCheck,
  Flame,
  Heart
} from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative pt-8 pb-16 sm:pt-14 sm:pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* TEXTO HERO (COLUNA ESQUERDA) */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* BADGE DE TOPO */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-pink-300 shadow-sm animate-pulse-glow">
              <span className="w-2 h-2 rounded-full bg-pink-500 animate-ping"></span>
              <span className="text-xs sm:text-sm font-extrabold text-pink-700">
                A IA mais tóxica, divertida e viral do Brasil 💅
              </span>
            </div>

            {/* TÍTULO PRINCIPAL */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#21131B] tracking-tight leading-[1.12]">
              Seu ex nunca superou.{' '}
              <span className="gradient-text block sm:inline">
                Agora ele tem IA.
              </span>
            </h1>

            {/* SUBTÍTULO */}
            <p className="text-base sm:text-lg lg:text-xl text-brand-gray font-medium leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Transforme qualquer mensagem em uma resposta cheia de indiretas, sarcasmo e aquele deboche que você conhece muito bem. Porque superar é opcional. Dar indireta é obrigatório.
            </p>

            {/* BOTÕES DE CTA */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2">
              <Link
                href="/chat"
                className="w-full sm:w-auto py-4 px-8 rounded-2xl bg-gradient-to-r from-[#FF4F9A] via-[#FF2E88] to-rose-600 text-white font-extrabold text-base shadow-pink hover:shadow-neon hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2.5 group"
              >
                <MessageCircleHeart className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                <span>Conversar com meu ex</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <a
                href="#como-funciona"
                className="w-full sm:w-auto py-4 px-7 rounded-2xl glass-card hover:bg-white text-[#21131B] font-bold text-base border border-pink-200 shadow-sm hover:shadow-pink transition-all flex items-center justify-center gap-2"
              >
                <span>Ver como funciona</span>
              </a>
            </div>

            {/* INDICADORES ESPECIFICADOS NO REQUISITO 2 */}
            <div className="grid grid-cols-3 gap-3 pt-6 border-t border-pink-200/60 max-w-lg mx-auto lg:mx-0">
              <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                <div className="flex items-center gap-1.5 text-pink-600 font-black text-sm sm:text-base">
                  <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
                  <span>Instantâneo</span>
                </div>
                <span className="text-xs text-brand-gray font-medium">Respostas por IA</span>
              </div>

              <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                <div className="flex items-center gap-1.5 text-pink-600 font-black text-sm sm:text-base">
                  <Users className="w-4 h-4 text-pink-500" />
                  <span>7 Tons</span>
                </div>
                <span className="text-xs text-brand-gray font-medium">Personalidades</span>
              </div>

              <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                <div className="flex items-center gap-1.5 text-pink-600 font-black text-sm sm:text-base">
                  <Share2 className="w-4 h-4 text-rose-500" />
                  <span>1-Clique</span>
                </div>
                <span className="text-xs text-brand-gray font-medium">Stories & WhatsApp</span>
              </div>
            </div>
          </div>

          {/* ILUSTRAÇÃO CENTRAL DO CORAÇÃO ROSA 3D PARTIDO COM CHAT FLUTUANDO (COLUNA DIREITA) */}
          <div className="lg:col-span-5 flex justify-center relative">
            <div className="relative w-full max-w-[420px] aspect-square flex items-center justify-center">
              {/* GLOW DE FUNDO */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-pink-400/40 via-rose-400/30 to-purple-400/20 blur-3xl" />

              {/* CÍRCULO CENTRAL ESTILIZADO */}
              <div className="relative w-72 h-72 sm:w-80 sm:h-80 rounded-full glass-card border-2 border-pink-300/80 shadow-2xl flex items-center justify-center p-6 animate-float">
                {/* CORAÇÃO 3D PARTIDO */}
                <div className="relative">
                  <div className="w-40 h-40 rounded-full bg-gradient-to-tr from-pink-600 via-rose-500 to-pink-400 flex items-center justify-center shadow-neon animate-pulse-glow">
                    <BrokenHeartIcon className="w-24 h-24 text-white drop-shadow-lg" />
                  </div>
                  <span className="absolute -top-3 -right-3 text-3xl animate-bounce">💅</span>
                </div>
              </div>

              {/* BALÃO FLUTUANTE 1: MENSAGEM DO USUÁRIO (TOPO DIREITA) */}
              <div className="absolute -top-2 -right-2 sm:right-2 glass-card px-4 py-2.5 rounded-2xl rounded-tr-none shadow-pink border border-pink-300 text-xs sm:text-sm font-semibold text-[#21131B] animate-float max-w-[210px]">
                <p className="text-[10px] text-pink-600 font-bold uppercase">Você:</p>
                <p className="italic">&quot;Oi sumido, tava pensando em você...&quot;</p>
              </div>

              {/* BALÃO FLUTUANTE 2: RESPOSTA SARCÁSTICA DO EX (INFERIOR ESQUERDA) */}
              <div className="absolute -bottom-4 -left-2 sm:left-0 bg-white/95 p-4 rounded-3xl rounded-tl-none shadow-neon border-2 border-pink-300 text-xs sm:text-sm font-bold text-[#21131B] animate-float-slow max-w-[270px]">
                <div className="flex items-center gap-1.5 text-pink-600 text-[11px] mb-1 font-black">
                  <span>💅 Ex Debochado:</span>
                </div>
                <p className="leading-snug">
                  &quot;Que bom! Eu tava pensando em como minha paz voltou depois do término.&quot;
                </p>
                <div className="mt-2 flex items-center justify-between text-[10px] text-brand-gray">
                  <span>Visualizado 03:14</span>
                  <span>✨ 100% IA</span>
                </div>
              </div>

              {/* BADGE FLUTUANTE 3 (INFERIOR DIREITA) */}
              <div className="absolute bottom-6 right-0 glass-card px-3 py-1.5 rounded-xl border border-pink-200 text-xs font-bold text-pink-700 shadow-sm flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-red-500 fill-red-500" />
                <span>Nível de veneno: 10/10</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
