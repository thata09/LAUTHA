import React from 'react';
import PersonalitiesSection from '@/components/PersonalitiesSection';
import Link from 'next/link';
import { ArrowLeft, MessageCircleHeart } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Personalidades do Ex — ExGPT',
  description: 'Conheça as 7 personalidades do ExGPT: Debochado, Ciumento, Sofrido, Frio, Ressentido, Arrependido e Narcisista.',
};

export default function PersonalidadesPage() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex flex-col flex-1">
      <div className="flex items-center justify-between mb-6">
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
          <span>Abrir Chat Geral</span>
        </Link>
      </div>

      <PersonalitiesSection />
    </div>
  );
}
