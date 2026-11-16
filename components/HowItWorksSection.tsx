import React from 'react';
import { Sparkles, MessageCircle, Share2, Flame, Bot } from 'lucide-react';

export default function HowItWorksSection() {
  const steps = [
    {
      step: '01',
      title: 'Escolha a Personalidade',
      desc: 'Do Ex Debochado ao Ex Frio calculista. São 7 perfis tóxicos calibrados para o ápice do sarcasmo e humor.',
      icon: '💅',
      badge: '7 Estilos Únicos'
    },
    {
      step: '02',
      title: 'Mande Qualquer Mensagem',
      desc: 'Puxe assunto como "Oi sumido" ou use a ferramenta "O Que Meu Ex Responderia?" para analisar um print real.',
      icon: '💬',
      badge: 'IA Contextual'
    },
    {
      step: '03',
      title: 'Compartilhe o Deboche',
      desc: 'Gere cards visuais perfeitos em 1 clique para postar no Instagram Stories, status do WhatsApp e TikTok.',
      icon: '🔥',
      badge: 'Viral Instantâneo'
    }
  ];

  return (
    <section id="como-funciona" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-pink-100 text-pink-700 mb-3 border border-pink-200">
            <Sparkles className="w-3.5 h-3.5 text-pink-500" /> Como Funciona
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#21131B] tracking-tight">
            Superar é opcional.{' '}
            <span className="gradient-text">Dar indireta é ciência.</span>
          </h2>
          <p className="text-sm sm:text-base text-brand-gray font-medium mt-3">
            Veja como é simples colocar a inteligência artificial para falar tudo que você sempre quis ouvir (ou responder) do seu ex.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((s, idx) => (
            <div
              key={s.step}
              className="glass-card rounded-3xl p-8 relative overflow-hidden group hover:border-pink-400 hover:shadow-pink transition-all duration-300"
            >
              <div className="absolute top-4 right-4 text-4xl font-black text-pink-200/50 group-hover:text-pink-300/60 transition-colors">
                {s.step}
              </div>

              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-pink-500 to-rose-500 text-2xl flex items-center justify-center shadow-pink mb-6 group-hover:scale-110 transition-transform">
                {s.icon}
              </div>

              <span className="inline-block px-2.5 py-1 rounded-full text-[11px] font-bold bg-pink-50 text-pink-700 border border-pink-200 mb-3">
                {s.badge}
              </span>

              <h3 className="text-xl font-black text-[#21131B] mb-2 group-hover:text-pink-600 transition-colors">
                {s.title}
              </h3>

              <p className="text-sm text-brand-gray font-medium leading-relaxed">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
