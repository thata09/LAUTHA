'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import ChatInterface from '@/components/ChatInterface';
import { PersonalityId } from '@/lib/types';
import Link from 'next/link';
import { Flame, Sparkles, ArrowLeft } from 'lucide-react';

function ChatContent() {
  const searchParams = useSearchParams();
  const personalityParam = (searchParams.get('p') || 'debochado') as PersonalityId;

  return (
    <div className="w-full max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-3 sm:py-6 flex flex-col flex-1">
      {/* BARRA SUPERIOR DE NAVEGAÇÃO E ATALHO */}
      <div className="flex items-center justify-between mb-3 px-2">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-gray hover:text-pink-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Voltar para início</span>
        </Link>

        <div className="flex items-center gap-2">
          <Link
            href="/gerador"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-pink-100 hover:bg-pink-200 text-pink-700 text-xs font-bold transition-colors border border-pink-200"
          >
            <Flame className="w-3.5 h-3.5 text-red-500" />
            <span>O Que Responderia? (3 Opções)</span>
          </Link>
        </div>
      </div>

      <ChatInterface initialPersonalityId={personalityParam} />
    </div>
  );
}

export default function ChatPage() {
  return (
    <Suspense
      fallback={
        <div className="flex-1 flex items-center justify-center p-12">
          <div className="text-center space-y-3">
            <div className="w-12 h-12 mx-auto rounded-2xl bg-pink-500 animate-spin flex items-center justify-center text-white">
              💅
            </div>
            <p className="text-sm font-bold text-pink-600">
              Conectando com seu ex virtual...
            </p>
          </div>
        </div>
      }
    >
      <ChatContent />
    </Suspense>
  );
}
