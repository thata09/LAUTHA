'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import BrokenHeartIcon from './BrokenHeartIcon';
import ShareCardModal from './ShareCardModal';
import { ShareCardData } from '@/lib/types';
import { Sparkles, Download, Share2, Instagram, MessageCircle, Heart, ArrowRight } from 'lucide-react';

export default function ViralPreviewSection() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState<ShareCardData | null>(null);

  const previewCards = [
    {
      user: 'Oi sumido... lembrei de você hoje',
      ex: 'Que bom! Eu estava pensando em como minha conta de luz e minha sanidade mental ficaram mais baratas. 💅',
      personality: 'Ex Debochado',
      emoji: '💅',
      likes: '42.8k'
    },
    {
      user: 'Vi que você começou a seguir aquela pessoa...',
      ex: 'Aham. E eu vi que você continua fiscalizando a vida dos outros em vez de cuidar da sua. 👀',
      personality: 'Ex Ciumento',
      emoji: '👀',
      likes: '68.1k'
    },
    {
      user: 'Espero que você esteja bem.',
      ex: 'Estou ótimo. Principalmente quando o passado fica no lugar dele: em silêncio. 🧊',
      personality: 'Ex Frio',
      emoji: '🧊',
      likes: '93.4k'
    }
  ];

  const handleOpenCard = (card: typeof previewCards[0]) => {
    setModalData({
      userMessage: card.user,
      exResponse: card.ex,
      personalityName: card.personality,
      personalityEmoji: card.emoji,
      format: 'stories'
    });
    setModalOpen(true);
  };

  return (
    <section className="py-20 relative bg-gradient-to-b from-transparent via-pink-100/40 to-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-pink-100 text-pink-700 mb-3 border border-pink-200">
            <Instagram className="w-3.5 h-3.5 text-pink-600" /> COMPARTILHE O DEBOCHE
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#21131B] tracking-tight">
            Pronto para os{' '}
            <span className="gradient-text">Stories & WhatsApp</span>
          </h2>
          <p className="text-sm sm:text-base text-brand-gray font-medium mt-3">
            Transforme qualquer resposta em um card estético nos formatos 9:16 (Stories) e 1:1 (Feed). Baixe a imagem em alta resolução ou compartilhe direto com os amigos.
          </p>
        </div>

        {/* CARDS VISUAIS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {previewCards.map((card, i) => (
            <div
              key={i}
              className="relative rounded-3xl p-6 sm:p-7 text-white shadow-xl flex flex-col justify-between overflow-hidden group hover:scale-[1.02] transition-transform duration-300"
              style={{
                background:
                  i === 0
                    ? 'linear-gradient(135deg, #FF2E88 0%, #FF4F9A 100%)'
                    : i === 1
                    ? 'linear-gradient(135deg, #880e4f 0%, #FF2E88 100%)'
                    : 'linear-gradient(135deg, #FF4F9A 0%, #4a148c 100%)'
              }}
            >
              {/* TOP */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center">
                    <BrokenHeartIcon className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-xs font-black uppercase tracking-wider">ExGPT</span>
                </div>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md">
                  {card.emoji} {card.personality}
                </span>
              </div>

              {/* MESSAGES */}
              <div className="space-y-3 mb-8">
                <div className="bg-white/20 backdrop-blur-md p-3 rounded-2xl rounded-tr-none text-xs text-white/95 max-w-[85%] ml-auto">
                  <p className="text-[10px] uppercase font-bold opacity-75">Você:</p>
                  <p className="italic">&quot;{card.user}&quot;</p>
                </div>

                <div className="bg-white p-4 rounded-2xl rounded-tl-none text-[#21131B] text-xs sm:text-sm font-bold shadow-lg">
                  <p className="text-[10px] uppercase font-black text-pink-600 mb-1">
                    {card.emoji} Resposta:
                  </p>
                  <p className="leading-snug">&quot;{card.ex}&quot;</p>
                </div>
              </div>

              {/* BOTTOM ACTIONS */}
              <div className="pt-3 border-t border-white/20 flex items-center justify-between">
                <div className="text-[10px] text-white/80 font-medium">
                  {card.likes} pessoas riram disso
                </div>
                <button
                  onClick={() => handleOpenCard(card)}
                  className="px-3 py-1.5 rounded-xl bg-white text-pink-700 text-xs font-bold hover:bg-pink-50 transition-colors shadow-sm flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Gerar Card</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/gerador"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white hover:bg-pink-50 text-pink-700 font-extrabold text-sm border-2 border-pink-300 shadow-sm transition-all"
          >
            <span>Experimentar gerador de 3 respostas</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      <ShareCardModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        data={modalData}
      />
    </section>
  );
}
