'use client';

import React from 'react';
import { PERSONALITIES } from '@/lib/personalities';
import { PersonalityId } from '@/lib/types';
import PersonalityCard from './PersonalityCard';
import { Sparkles, ArrowRight } from 'lucide-react';

interface PersonalitiesSectionProps {
  onSelectPersonality?: (id: PersonalityId) => void;
}

export default function PersonalitiesSection({ onSelectPersonality }: PersonalitiesSectionProps) {
  const handleSelect = (p: typeof PERSONALITIES[0]) => {
    if (onSelectPersonality) {
      onSelectPersonality(p.id);
    }
    const chatEl = document.getElementById('chat');
    if (chatEl) {
      chatEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="personalidades" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-pink-100 text-pink-700 mb-3 border border-pink-200">
              <Sparkles className="w-3.5 h-3.5 text-pink-500" /> O Elenco do Trauma
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#21131B] tracking-tight">
              Escolha a personalidade do seu{' '}
              <span className="gradient-text">Ex Virtual</span>
            </h2>
            <p className="text-sm sm:text-base text-brand-gray font-medium mt-3">
              Cada perfil foi treinado com milhares de indiretas, prints de término e respostas passivo-agressivas de alta precisão.
            </p>
          </div>

          <a
            href="#chat"
            className="inline-flex items-center gap-2 text-sm font-bold text-pink-600 hover:text-pink-800 transition-colors"
          >
            <span>Testar no chat agora</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PERSONALITIES.map((p) => (
            <PersonalityCard
              key={p.id}
              personality={p}
              onSelect={handleSelect}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
