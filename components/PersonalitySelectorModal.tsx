'use client';

import React from 'react';
import { Personality } from '@/lib/types';
import { PERSONALITIES } from '@/lib/personalities';
import PersonalityCard from './PersonalityCard';
import { X, Sparkles } from 'lucide-react';

interface PersonalitySelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedId: string;
  onSelect: (personality: Personality) => void;
}

export default function PersonalitySelectorModal({
  isOpen,
  onClose,
  selectedId,
  onSelect,
}: PersonalitySelectorModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto">
      <div className="relative w-full max-w-4xl glass-card rounded-3xl p-5 sm:p-7 shadow-2xl border border-pink-300 my-auto max-h-[90vh] flex flex-col">
        {/* HEADER */}
        <div className="flex items-center justify-between pb-4 border-b border-pink-200 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-pink-500 text-white flex items-center justify-center shadow-pink">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-[#21131B]">
                Escolha a Personalidade do Ex
              </h3>
              <p className="text-xs text-brand-gray font-medium">
                Alterne o tom a qualquer momento durante a conversa
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-pink-100 text-brand-gray hover:text-brand-dark transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* LISTA EM GRID */}
        <div className="overflow-y-auto py-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pr-1">
          {PERSONALITIES.map((p) => (
            <PersonalityCard
              key={p.id}
              personality={p}
              isSelected={p.id === selectedId}
              onSelect={(item) => {
                onSelect(item);
                onClose();
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
