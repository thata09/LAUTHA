import React from 'react';
import ResponseGenerator from '@/components/ResponseGenerator';
import Link from 'next/link';
import { ArrowLeft, MessageCircleHeart, Sparkles } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'O Que Meu Ex Responderia? — ExGPT',
  description: 'Cole uma mensagem e a IA gera 3 respostas afiadas: Debochada, Venenosa e Elegante.',
};

export default function GeradorPage() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex flex-col flex-1">
      {/* NAVEGAÇÃO DE TOPO */}
      <div className="flex items-center justify-between mb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-brand-gray hover:text-pink-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar ao início</span>
        </Link>

        <Link
          href="/chat"
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-pink-500 to-rose-600 text-white text-xs sm:text-sm font-bold shadow-pink hover:scale-105 transition-all"
        >
          <MessageCircleHeart className="w-4 h-4" />
          <span>Ir para o Chat com Ex</span>
        </Link>
      </div>

      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-pink-100 text-pink-700 mb-3 border border-pink-200">
          <Sparkles className="w-3.5 h-3.5 text-pink-500" /> Ferramenta Viral
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#21131B] tracking-tight">
          O Que Meu Ex <span className="gradient-text">Responderia?</span>
        </h1>
        <p className="text-sm sm:text-base text-brand-gray font-medium mt-3">
          Cole aquele print ou mensagem que você recebeu e receba na hora três alternativas prontas: uma debochada, uma venenosa e uma com elegância fria.
        </p>
      </div>

      <ResponseGenerator />
    </div>
  );
}
