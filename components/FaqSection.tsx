'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Sparkles } from 'lucide-react';

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'O que é o ExGPT?',
      a: 'O ExGPT é uma inteligência artificial criada com uma personalidade sarcástica, irônica e passivo-agressiva que responde mensagens simulando um ex-namorado ou ex-namorada. É uma sátira digital divertida pensada para rir, desabafar e viralizar nas redes sociais.'
    },
    {
      q: 'As respostas são geradas por inteligência artificial de verdade?',
      a: 'Sim! As respostas são geradas de forma dinâmica e contextual por modelos modernos de IA. Ela analisa a mensagem que você enviou e o tom da personalidade escolhida para criar um deboche único e imprevisível.'
    },
    {
      q: 'Meu ex de verdade vai saber que usei o app?',
      a: 'Não! O ExGPT é 100% anônimo. Não guardamos seus dados pessoais e seu ex de verdade não tem como saber — a menos que você baixe o card e poste marcando ele nos Stories (por sua conta e risco!).'
    },
    {
      q: 'Preciso pagar ou fazer cadastro para usar?',
      a: 'Não é obrigatório cadastro! Você pode começar a conversar imediatamente de forma gratuita. O app possui um limite generoso de mensagens diárias gratuitas para todo mundo se divertir.'
    },
    {
      q: 'Como funciona a ferramenta "O Que Meu Ex Responderia?"',
      a: 'Basta colar uma mensagem que você recebeu e a IA gera na hora três respostas afiadas em três tons diferentes: Debochada, Venenosa e Elegante. Você pode copiar ou gerar um card para o Instagram em 1 clique.'
    },
    {
      q: 'Posso trocar de personalidade no meio da conversa?',
      a: 'Com certeza! Você pode alternar entre as 7 personalidades (Debochado, Ciumento, Sofrido, Frio, Ressentido, Arrependido e Narcisista) a qualquer momento clicando no botão "Trocar Ex" no topo do chat.'
    }
  ];

  return (
    <section id="faq" className="py-20 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-14">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-pink-100 text-pink-700 mb-3 border border-pink-200">
            <HelpCircle className="w-3.5 h-3.5 text-pink-500" /> Dúvidas Frequentes
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#21131B] tracking-tight">
            Perguntas &{' '}
            <span className="gradient-text">Respostas Sinceras</span>
          </h2>
          <p className="text-sm text-brand-gray font-medium mt-3">
            Tudo o que você precisa saber antes de mandar mensagem para o seu ex virtual.
          </p>
        </div>

        <div className="space-y-3.5">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="glass-card rounded-2xl border border-pink-200/80 overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-extrabold text-[#21131B] hover:text-pink-600 transition-colors"
                >
                  <span className="text-sm sm:text-base">{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-pink-500 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-brand-gray font-medium leading-relaxed border-t border-pink-100 animate-in fade-in duration-150">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
