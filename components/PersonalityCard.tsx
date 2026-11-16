'use client';

import React from 'react';
import { Personality } from '@/lib/types';
import { Check, Sparkles, MessageSquare } from 'lucide-react';

interface PersonalityCardProps {
  personality: Personality;
  isSelected?: boolean;
  onSelect: (personality: Personality) => void;
}

export default function PersonalityCard({
  personality,
  isSelected,
  onSelect,
}: PersonalityCardProps) {
  return (
    <div
      onClick={() => onSelect(personality)}
      className={`group relative glass-card rounded-3xl p-5 sm:p-6 transition-all duration-300 cursor-pointer flex flex-col justify-between ${
        isSelected
          ? 'ring-2 ring-pink-500 shadow-neon bg-white/95 scale-[1.02]'
          : 'hover:border-pink-400 hover:shadow-pink hover:-translate-y-1'
      }`}
    >
      {/* BADGE SUPERIOR */}
      <div className="flex items-center justify-between mb-4">
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-pink-100 text-pink-700 border border-pink-200">
          <Sparkles className="w-3 h-3 text-pink-500" />
          {personality.badge}
        </span>

        {isSelected && (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700 border border-emerald-300">
            <Check className="w-3.5 h-3.5" />
            Ativo
          </span>
        )}
      </div>

      {/* CABEÇALHO DO CARD */}
      <div className="flex items-center gap-3.5 mb-3">
        <div
          className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${personality.avatarBg} flex items-center justify-center text-2xl shadow-md group-hover:scale-110 transition-transform`}
        >
          {personality.emoji}
        </div>
        <div>
          <h3 className="text-lg font-black text-[#21131B] group-hover:text-pink-600 transition-colors">
            {personality.name}
          </h3>
          <p className="text-xs font-semibold text-pink-600">
            {personality.tagline}
          </p>
        </div>
      </div>

      {/* DESCRIÇÃO */}
      <p className="text-xs text-brand-gray font-medium leading-relaxed mb-4">
        {personality.description}
      </p>

      {/* EXEMPLO DE RESPOSTA REAL */}
      <div className="p-3.5 rounded-2xl bg-pink-50/80 border border-pink-200/80 mb-5 space-y-2 text-xs">
        <div className="flex items-start gap-1.5 text-brand-gray font-medium">
          <span className="font-bold text-[#21131B]">Você:</span>
          <span className="italic">&quot;{personality.exampleUser}&quot;</span>
        </div>
        <div className="flex items-start gap-1.5 text-pink-900 font-semibold bg-white p-2.5 rounded-xl shadow-xs border border-pink-100">
          <span className="text-pink-600 shrink-0 font-bold">{personality.emoji} Ex:</span>
          <span>&quot;{personality.exampleAi}&quot;</span>
        </div>
      </div>

      {/* BOTÃO ESCOLHER */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onSelect(personality);
        }}
        className={`w-full py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all ${
          isSelected
            ? 'bg-gradient-to-r from-pink-500 to-rose-600 text-white shadow-pink'
            : 'bg-pink-100 hover:bg-pink-200 text-pink-700'
        }`}
      >
        <MessageSquare className="w-4 h-4" />
        <span>{isSelected ? 'Personalidade Selecionada' : 'Escolher Personalidade'}</span>
      </button>
    </div>
  );
}
