import React from 'react';
import Link from 'next/link';
import BrokenHeartIcon from './BrokenHeartIcon';
import { MessageCircleHeart, ArrowRight, Sparkles, Heart } from 'lucide-react';

export default function CtaSection() {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl p-8 sm:p-14 bg-gradient-to-r from-[#FF2E88] via-[#FF4F9A] to-[#d81b60] text-white shadow-2xl overflow-hidden text-center">
          {/* BACKGROUND DECORATION */}
          <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-white/10 blur-2xl pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-black/10 blur-2xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-5">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 shadow-lg">
              <BrokenHeartIcon className="w-8 h-8 text-white" />
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
              Pronto para mandar aquela mensagem?
            </h2>

            <p className="text-base sm:text-lg text-pink-100 font-medium">
              &quot;Porque superar é opcional. Dar indireta é obrigatório.&quot; Experimente agora de graça e descubra o que seu ex virtual tem a dizer.
            </p>

            <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/chat"
                className="w-full sm:w-auto py-4 px-8 rounded-2xl bg-white text-pink-700 font-extrabold text-base shadow-xl hover:bg-pink-50 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <MessageCircleHeart className="w-5 h-5" />
                <span>Conversar com meu ex agora</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/gerador"
                className="w-full sm:w-auto py-4 px-7 rounded-2xl bg-white/20 hover:bg-white/30 text-white font-bold text-base backdrop-blur-md border border-white/30 transition-all flex items-center justify-center gap-2"
              >
                <span>Gerador de 3 Respostas</span>
              </Link>
            </div>

            <p className="text-xs text-pink-200 font-semibold pt-2">
              ✨ Sem necessidade de cartão de crédito • 100% gratuito e anônimo
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
