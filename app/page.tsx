'use client';

import React, { useState } from 'react';
import Hero from '@/components/Hero';
import ChatInterface from '@/components/ChatInterface';
import ResponseGenerator from '@/components/ResponseGenerator';
import HowItWorksSection from '@/components/HowItWorksSection';
import PersonalitiesSection from '@/components/PersonalitiesSection';
import ViralPreviewSection from '@/components/ViralPreviewSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import FaqSection from '@/components/FaqSection';
import CtaSection from '@/components/CtaSection';
import OnboardingModal from '@/components/OnboardingModal';
import { PersonalityId } from '@/lib/types';
import { MessageCircleHeart, Flame, Sparkles, Users, HelpCircle, ArrowDown } from 'lucide-react';

export default function HomePage() {
  const [selectedPersonality, setSelectedPersonality] = useState<PersonalityId>('debochado');

  const handleStartChat = () => {
    const el = document.getElementById('chat');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectPersonality = (id: PersonalityId) => {
    setSelectedPersonality(id);
    const el = document.getElementById('chat');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <OnboardingModal onStartChat={handleStartChat} />
      
      {/* 1. SEÇÃO PRINCIPAL (HERO) */}
      <Hero />

      {/* BARRA DE ATALHOS RÁPIDOS NA MESMA PÁGINA */}
      <div className="w-full max-w-5xl mx-auto px-4 -mt-6 mb-8 relative z-20">
        <div className="glass-panel rounded-2xl p-2.5 sm:p-3 shadow-pink border border-pink-300 flex items-center justify-between sm:justify-center gap-1.5 sm:gap-3 overflow-x-auto scrollbar-none">
          <a
            href="#chat"
            className="flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-pink-500 to-rose-600 text-white shadow-xs shrink-0 hover:scale-105 transition-all"
          >
            <MessageCircleHeart className="w-4 h-4" />
            <span>Chat com Ex</span>
          </a>

          <a
            href="#gerador"
            className="flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-pink-100 hover:bg-pink-200 text-pink-700 transition-colors shrink-0"
          >
            <Flame className="w-4 h-4 text-red-500" />
            <span>O Que Responderia?</span>
          </a>

          <a
            href="#personalidades"
            className="flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-pink-50 hover:bg-pink-100 text-[#21131B] transition-colors shrink-0"
          >
            <Users className="w-4 h-4 text-pink-500" />
            <span>7 Personalidades</span>
          </a>

          <a
            href="#como-funciona"
            className="flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-pink-50 hover:bg-pink-100 text-[#21131B] transition-colors shrink-0 hidden md:flex"
          >
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Como Funciona</span>
          </a>

          <a
            href="#faq"
            className="flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-pink-50 hover:bg-pink-100 text-[#21131B] transition-colors shrink-0 hidden lg:flex"
          >
            <HelpCircle className="w-4 h-4 text-pink-500" />
            <span>FAQ</span>
          </a>
        </div>
      </div>

      {/* 2. CHAT INTERATIVO AO VIVO */}
      <section id="chat" className="py-10 sm:py-16 relative">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-8 px-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-pink-100 text-pink-700 mb-3 border border-pink-200">
              <Sparkles className="w-3.5 h-3.5 text-pink-500" /> Chat com Inteligência Artificial
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#21131B] tracking-tight">
              Converse com seu <span className="gradient-text">Ex Virtual</span>
            </h2>
            <p className="text-sm sm:text-base text-brand-gray font-medium mt-2">
              Mande uma mensagem agora e receba respostas debochadas, irônicas e cheias de indiretas com IA.
            </p>
          </div>

          <ChatInterface initialPersonalityId={selectedPersonality} />
        </div>
      </section>

      {/* 3. GERADOR DE 3 RESPOSTAS (O QUE MEU EX RESPONDERIA) */}
      <section id="gerador" className="py-16 sm:py-20 relative bg-gradient-to-b from-transparent via-pink-100/30 to-transparent border-t border-b border-pink-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-pink-100 text-pink-700 mb-3 border border-pink-200">
              <Flame className="w-3.5 h-3.5 text-red-500" /> Ferramenta Viral
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#21131B] tracking-tight">
              O Que Meu Ex <span className="gradient-text">Responderia?</span>
            </h2>
            <p className="text-sm sm:text-base text-brand-gray font-medium mt-3">
              Cole uma mensagem recebida e receba 3 respostas afiadas prontas: Debochada, Venenosa e Elegante.
            </p>
          </div>

          <ResponseGenerator />
        </div>
      </section>

      {/* 4. SELETOR DAS 7 PERSONALIDADES */}
      <PersonalitiesSection onSelectPersonality={handleSelectPersonality} />

      {/* 5. COMO FUNCIONA */}
      <HowItWorksSection />

      {/* 6. CARDS VIRAIS PARA REDES */}
      <ViralPreviewSection />

      {/* 7. DEPOIMENTOS */}
      <TestimonialsSection />

      {/* 8. FAQ */}
      <FaqSection />

      {/* 9. CTA FINAL */}
      <CtaSection />
    </div>
  );
}
