'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import BrokenHeartIcon from './BrokenHeartIcon';
import { PersonalityId } from '@/lib/types';
import { PERSONALITIES, getPersonalityById } from '@/lib/personalities';
import { Sparkles, Send, ArrowRight, MessageCircle } from 'lucide-react';

export default function InteractiveDemoSection() {
  const [selectedPid, setSelectedPid] = useState<PersonalityId>('debochado');
  const [userMsg, setUserMsg] = useState('Oi, tudo bem? Sumido...');
  const [loading, setLoading] = useState(false);
  const [reply, setReply] = useState<string>(
    'Olha só quem apareceu! Achei que tinha perdido meu contato junto com a memória das nossas conversas. Mas estou bem, viu? Depois de tudo, até que aprendi a gostar da paz. 💅'
  );

  const personality = getPersonalityById(selectedPid);

  const handleTest = async () => {
    if (!userMsg.trim() || loading) return;
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMsg,
          personalityId: selectedPid
        })
      });

      const data = await res.json();
      if (res.ok && data.text) {
        setReply(data.text);
      }
    } catch {
      // fallback
    } finally {
      setLoading(false);
    }
  };

  const sampleMessages = [
    'Oi, tudo bem? Sumido...',
    'Sonhei com você essa noite',
    'Ainda guarda rancor de mim?',
    'A gente podia se ver um dia desse'
  ];

  return (
    <section className="py-20 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-pink-100 text-pink-700 mb-3 border border-pink-200">
            <Sparkles className="w-3.5 h-3.5 text-pink-500" /> Demonstração Ao Vivo
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#21131B] tracking-tight">
            Teste uma resposta <span className="gradient-text">agora mesmo</span>
          </h2>
          <p className="text-sm text-brand-gray font-medium mt-2">
            Escolha um perfil abaixo e veja o deboche acontecendo em tempo real.
          </p>
        </div>

        {/* CONTAINER DO DEMO */}
        <div className="glass-card rounded-3xl p-6 sm:p-8 border-2 border-pink-300 shadow-xl">
          {/* SELETOR DE PERSONALIDADE TABS */}
          <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none">
            {PERSONALITIES.map((p) => (
              <button
                key={p.id}
                onClick={() => setSelectedPid(p.id)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-2xl text-xs font-bold shrink-0 transition-all ${
                  selectedPid === p.id
                    ? 'bg-gradient-to-r from-pink-500 to-rose-600 text-white shadow-pink scale-105'
                    : 'bg-white text-brand-dark hover:bg-pink-100 border border-pink-200'
                }`}
              >
                <span>{p.emoji}</span>
                <span>{p.name}</span>
              </button>
            ))}
          </div>

          {/* ÁREA DE CHAT PREVIEW */}
          <div className="bg-pink-50/80 rounded-2xl p-4 sm:p-6 mb-6 space-y-4 border border-pink-200/80">
            {/* MENSAGEM DO USUÁRIO */}
            <div className="flex justify-end">
              <div className="bg-gradient-to-r from-pink-500 to-rose-600 text-white p-3.5 px-4 rounded-2xl rounded-tr-none text-xs sm:text-sm font-medium shadow-sm max-w-[85%]">
                <span className="text-[10px] uppercase font-bold opacity-80 block mb-0.5">Você:</span>
                <span>&quot;{userMsg}&quot;</span>
              </div>
            </div>

            {/* RESPOSTA DO EX */}
            <div className="flex justify-start items-start gap-2.5">
              <div
                className={`w-9 h-9 rounded-2xl bg-gradient-to-br ${personality.avatarBg} flex items-center justify-center text-base shrink-0 shadow-sm`}
              >
                {personality.emoji}
              </div>
              <div className="bg-white p-4 rounded-2xl rounded-tl-none text-xs sm:text-sm font-bold text-[#21131B] shadow-md border border-pink-200 max-w-[90%]">
                <div className="flex items-center gap-1 text-[11px] font-black text-pink-600 mb-1">
                  <span>{personality.emoji} {personality.name}:</span>
                </div>
                {loading ? (
                  <div className="flex items-center gap-2 py-1 text-pink-600">
                    <span className="text-xs">Formulando deboche...</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-pink-500 typing-dot" />
                    <span className="w-1.5 h-1.5 rounded-full bg-pink-500 typing-dot" />
                    <span className="w-1.5 h-1.5 rounded-full bg-pink-500 typing-dot" />
                  </div>
                ) : (
                  <p className="leading-snug">&quot;{reply}&quot;</p>
                )}
              </div>
            </div>
          </div>

          {/* MENSAGENS SUGERIDAS */}
          <div className="flex flex-wrap items-center gap-1.5 mb-4">
            <span className="text-xs font-bold text-brand-gray mr-1">Tente enviar:</span>
            {sampleMessages.map((msg) => (
              <button
                key={msg}
                onClick={() => setUserMsg(msg)}
                className="px-2.5 py-1 rounded-full bg-white text-[11px] font-semibold text-pink-700 border border-pink-200 hover:bg-pink-50 transition-colors"
              >
                &quot;{msg}&quot;
              </button>
            ))}
          </div>

          {/* INPUT BAR DO DEMO */}
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={userMsg}
              onChange={(e) => setUserMsg(e.target.value)}
              placeholder="Digite outra mensagem para testar..."
              className="flex-1 py-3 px-4 rounded-xl bg-white border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-500 text-xs sm:text-sm font-medium"
            />
            <button
              onClick={handleTest}
              disabled={loading}
              className="py-3 px-5 rounded-xl bg-pink-600 text-white font-bold text-xs sm:text-sm hover:bg-pink-700 transition-colors flex items-center gap-1.5 shadow-pink shrink-0"
            >
              <Send className="w-4 h-4" />
              <span>Testar</span>
            </button>
          </div>

          {/* CTA PARA CHAT COMPLETO */}
          <div className="mt-6 pt-5 border-t border-pink-200 flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="text-xs font-semibold text-brand-gray">
              Quer uma conversa completa sem limites e com histórico?
            </span>
            <Link
              href={`/chat?p=${selectedPid}`}
              className="inline-flex items-center gap-1.5 text-xs font-extrabold text-pink-600 hover:text-pink-800 transition-colors"
            >
              <span>Abrir chat completo com {personality.name}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
