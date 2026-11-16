import React from 'react';
import { Star, MessageCircle, Sparkles } from 'lucide-react';

export default function TestimonialsSection() {
  const reviews = [
    {
      name: 'Camila R.',
      tag: '@camilatoxica',
      text: 'Mandei print do Ex Debochado no grupo das amigas e todo mundo achou que meu ex tinha me mandado mensagem de verdade! Tive que explicar que era uma IA kkkk viralizou!',
      rating: 5,
      avatar: '💅'
    },
    {
      name: 'Lucas M.',
      tag: '@lucas_dev',
      text: 'O Ex Frio respondeu com um "Ok. Passar bem" e doeu mais do que meu término de 3 anos. Nota 10 pro desenvolvedor dessa obra de arte.',
      rating: 5,
      avatar: '🧊'
    },
    {
      name: 'Beatriz S.',
      tag: '@biasouza',
      text: 'A ferramenta "O Que Meu Ex Responderia?" é minha nova religião. Uso toda vez que alguém do passado resolve me mandar mensagem querendo biscoito.',
      rating: 5,
      avatar: '🐍'
    }
  ];

  return (
    <section className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-14">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-pink-100 text-pink-700 mb-3 border border-pink-200">
            <Sparkles className="w-3.5 h-3.5 text-pink-500" /> Prova Social Sincera
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#21131B] tracking-tight">
            Quem testou, <span className="gradient-text">não superou</span>
          </h2>
          <p className="text-sm text-brand-gray font-medium mt-3">
            Milhares de pessoas usando o ExGPT para rir, desabafar e postar deboches no TikTok.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev, i) => (
            <div
              key={i}
              className="glass-card rounded-3xl p-6 sm:p-7 border border-pink-200 shadow-sm hover:shadow-pink transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 text-amber-400 mb-4">
                  {Array.from({ length: rev.rating }).map((_, idx) => (
                    <Star key={idx} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-[#21131B] font-semibold leading-relaxed mb-6 italic">
                  &quot;{rev.text}&quot;
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-pink-100">
                <div className="w-10 h-10 rounded-2xl bg-pink-100 flex items-center justify-center text-xl shadow-xs">
                  {rev.avatar}
                </div>
                <div>
                  <h4 className="text-sm font-black text-[#21131B]">{rev.name}</h4>
                  <span className="text-[11px] font-semibold text-pink-600">{rev.tag}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
