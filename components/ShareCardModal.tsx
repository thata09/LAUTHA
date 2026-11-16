'use client';

import React, { useRef, useState } from 'react';
import { toPng } from 'html-to-image';
import confetti from 'canvas-confetti';
import BrokenHeartIcon from './BrokenHeartIcon';
import {
  Download,
  Share2,
  Copy,
  Check,
  X,
  Smartphone,
  Square,
  Sparkles,
  Heart,
  MessageCircle,
  Flame,
  ThumbsUp
} from 'lucide-react';
import { ShareCardData } from '@/lib/types';

interface ShareCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: ShareCardData | null;
  onToneTweak?: (tone: 'venenosa' | 'debochada') => void;
}

export default function ShareCardModal({
  isOpen,
  onClose,
  data,
  onToneTweak
}: ShareCardModalProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [format, setFormat] = useState<'stories' | 'feed'>('stories');
  const [downloading, setDownloading] = useState(false);
  const [copiedText, setCopiedText] = useState(false);
  const [reactionSelected, setReactionSelected] = useState<string | null>(null);

  if (!isOpen || !data) return null;

  const handleCopyText = async () => {
    try {
      await navigator.clipboard.writeText(
        `"${data.exResponse}"\n\n— Meu ex virtual no ExGPT.app 💔💅`
      );
      setCopiedText(true);
      setTimeout(() => setCopiedText(false), 2500);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDownloadImage = async () => {
    if (!cardRef.current) return;
    try {
      setDownloading(true);
      const dataUrl = await toPng(cardRef.current, {
        quality: 0.98,
        pixelRatio: 2,
        cacheBust: true,
      });

      const link = document.createElement('a');
      link.download = `ExGPT-${data.personalityName.replace(/\s+/g, '-')}-${format}.png`;
      link.href = dataUrl;
      link.click();

      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#FF4F9A', '#FF2E88', '#FFE4EF']
      });
    } catch (error) {
      console.error('Erro ao gerar imagem:', error);
      alert('Não foi possível gerar a imagem diretamente. Você pode copiar o texto da resposta!');
    } finally {
      setDownloading(false);
    }
  };

  const handleNativeShare = async () => {
    if (!cardRef.current) return;
    try {
      if (navigator.share) {
        setDownloading(true);
        const dataUrl = await toPng(cardRef.current, { pixelRatio: 2 });
        const blob = await (await fetch(dataUrl)).blob();
        const file = new File([blob], `exgpt-${format}.png`, { type: 'image/png' });

        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          await navigator.share({
            files: [file],
            title: 'ExGPT — Meu Ex agora é uma IA',
            text: 'Olha o que meu ex virtual respondeu no ExGPT 💅😭'
          });
          return;
        }

        await navigator.share({
          title: 'ExGPT — Meu Ex agora é uma IA',
          text: `"${data.exResponse}"\n\nVeja no ExGPT: https://exgpt.app`,
        });
      } else {
        handleDownloadImage();
      }
    } catch (err) {
      console.warn('Compartilhamento cancelado ou não suportado:', err);
    } finally {
      setDownloading(false);
    }
  };

  const handleReaction = (reaction: string) => {
    setReactionSelected(reaction);
    confetti({
      particleCount: 35,
      spread: 50,
      origin: { y: 0.6 },
      colors: ['#FF4F9A', '#FF2E88', '#FFFFFF']
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto">
      <div className="relative w-full max-w-xl glass-card rounded-3xl p-5 sm:p-7 shadow-2xl border border-pink-300 my-auto">
        {/* HEADER MODAL */}
        <div className="flex items-center justify-between pb-4 border-b border-pink-200">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-pink-500 text-white flex items-center justify-center shadow-pink">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-[#21131B]">
                Compartilhe o Deboche
              </h3>
              <p className="text-xs text-brand-gray font-medium">
                Pronto para postar no Instagram Stories, Feed ou WhatsApp
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-pink-100 text-brand-gray hover:text-brand-dark transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* CONTROLES DE FORMATO */}
        <div className="flex items-center justify-between gap-2 my-4 p-1.5 bg-pink-100/60 rounded-2xl border border-pink-200">
          <button
            onClick={() => setFormat('stories')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              format === 'stories'
                ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-pink'
                : 'text-brand-gray hover:text-brand-dark'
            }`}
          >
            <Smartphone className="w-4 h-4" />
            <span>Stories (9:16)</span>
          </button>

          <button
            onClick={() => setFormat('feed')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              format === 'feed'
                ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-pink'
                : 'text-brand-gray hover:text-brand-dark'
            }`}
          >
            <Square className="w-4 h-4" />
            <span>Feed / Quadrado (1:1)</span>
          </button>
        </div>

        {/* PRÉVIA DO CARD VIRAL */}
        <div className="flex justify-center my-3 overflow-hidden">
          <div
            ref={cardRef}
            className={`relative w-full rounded-3xl p-6 sm:p-8 flex flex-col justify-between text-white shadow-2xl transition-all duration-300 ${
              format === 'stories'
                ? 'max-w-[340px] aspect-[9/16] bg-gradient-to-br from-[#FF2E88] via-[#FF4F9A] to-[#880e4f]'
                : 'max-w-[360px] aspect-square bg-gradient-to-br from-[#FF2E88] via-[#FF4F9A] to-[#a81c5f]'
            }`}
            style={{
              backgroundImage:
                'radial-gradient(circle at top right, rgba(255,255,255,0.25), transparent 60%), radial-gradient(circle at bottom left, rgba(0,0,0,0.2), transparent 50%)',
            }}
          >
            {/* CARD TOP: BRANDING */}
            <div className="flex items-center justify-between relative z-10">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 shadow-sm">
                  <BrokenHeartIcon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-sm font-black tracking-wider uppercase text-white drop-shadow-sm">
                    ExGPT
                  </div>
                  <div className="text-[10px] text-pink-100 font-medium opacity-90">
                    Seu ex com IA
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-[11px] font-bold border border-white/30">
                <span>{data.personalityEmoji}</span>
                <span>{data.personalityName}</span>
              </div>
            </div>

            {/* CARD MIDDLE: BALÕES DE CHAT */}
            <div className="my-auto py-4 space-y-3 relative z-10">
              {data.userMessage && (
                <div className="flex justify-end">
                  <div className="max-w-[85%] bg-white/20 backdrop-blur-md text-white text-xs sm:text-sm font-medium px-4 py-2.5 rounded-2xl rounded-tr-none border border-white/25 shadow-sm">
                    <p className="opacity-75 text-[10px] uppercase font-bold mb-0.5">Você:</p>
                    <p className="italic">&quot;{data.userMessage}&quot;</p>
                  </div>
                </div>
              )}

              <div className="flex justify-start">
                <div className="max-w-[95%] bg-white text-[#21131B] text-sm sm:text-base font-bold p-4 sm:p-5 rounded-3xl rounded-tl-none shadow-2xl relative">
                  <div className="flex items-center gap-1.5 text-[11px] font-extrabold text-pink-600 mb-1.5 uppercase tracking-wide">
                    <span>{data.personalityEmoji}</span>
                    <span>Resposta do Ex:</span>
                  </div>
                  <p className="leading-snug text-[#21131B]">
                    &quot;{data.exResponse}&quot;
                  </p>
                  <div className="mt-2.5 pt-2 border-t border-pink-100 flex items-center justify-between text-[10px] text-brand-gray font-semibold">
                    <span>Visualizado e respondido</span>
                    <span>03:14 AM</span>
                  </div>
                </div>
              </div>
            </div>

            {/* CARD BOTTOM: ASSINATURA VIRAL */}
            <div className="pt-3 border-t border-white/20 flex items-center justify-between text-xs text-white/90 relative z-10">
              <div className="flex items-center gap-1.5 font-bold">
                <Heart className="w-3.5 h-3.5 fill-white text-white" />
                <span>Meu ex agora é uma IA</span>
              </div>
              <div className="text-[11px] font-mono font-semibold opacity-90">
                exgpt.app
              </div>
            </div>
          </div>
        </div>

        {/* BOTÕES DE REAÇÃO RÁPIDA (CONFORME REQUISITO 7) */}
        <div className="mt-3 pt-3 border-t border-pink-200">
          <p className="text-xs font-bold text-brand-gray mb-2 text-center">
            Reaja a esse deboche:
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
            <button
              onClick={() => handleReaction('Essa resposta foi perfeita')}
              className={`p-2 rounded-xl text-xs font-bold transition-all text-center border ${
                reactionSelected === 'Essa resposta foi perfeita'
                  ? 'bg-pink-500 text-white border-pink-500 shadow-pink'
                  : 'bg-white hover:bg-pink-50 text-brand-dark border-pink-200'
              }`}
            >
              🔥 Perfeita
            </button>

            <button
              onClick={() => {
                handleReaction('Mais venenosa');
                onToneTweak?.('venenosa');
              }}
              className="p-2 rounded-xl text-xs font-bold bg-white hover:bg-pink-50 text-brand-dark border border-pink-200 transition-all text-center"
            >
              🐍 Mais venenosa
            </button>

            <button
              onClick={() => {
                handleReaction('Mais debochada');
                onToneTweak?.('debochada');
              }}
              className="p-2 rounded-xl text-xs font-bold bg-white hover:bg-pink-50 text-brand-dark border border-pink-200 transition-all text-center"
            >
              💅 Mais debochada
            </button>

            <button
              onClick={() => handleReaction('Meu ex seria assim')}
              className={`p-2 rounded-xl text-xs font-bold transition-all text-center border ${
                reactionSelected === 'Meu ex seria assim'
                  ? 'bg-rose-500 text-white border-rose-500 shadow-pink'
                  : 'bg-white hover:bg-pink-50 text-brand-dark border-pink-200'
              }`}
            >
              😭 Meu ex todinho
            </button>
          </div>
        </div>

        {/* BOTÕES PRINCIPAIS DE AÇÃO */}
        <div className="mt-4 flex flex-col sm:flex-row gap-2">
          <button
            onClick={handleDownloadImage}
            disabled={downloading}
            className="flex-1 py-3 px-4 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-600 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-pink hover:shadow-neon transition-all active:scale-95 disabled:opacity-60"
          >
            <Download className="w-4 h-4" />
            <span>{downloading ? 'Gerando imagem...' : 'Baixar Imagem'}</span>
          </button>

          <button
            onClick={handleNativeShare}
            className="flex-1 py-3 px-4 rounded-2xl bg-pink-100 hover:bg-pink-200 text-pink-800 font-bold text-sm flex items-center justify-center gap-2 border border-pink-300 transition-all active:scale-95"
          >
            <Share2 className="w-4 h-4 text-pink-600" />
            <span>Compartilhar</span>
          </button>

          <button
            onClick={handleCopyText}
            className="py-3 px-4 rounded-2xl bg-white hover:bg-pink-50 text-brand-dark font-bold text-sm flex items-center justify-center gap-1.5 border border-pink-200 transition-all"
            title="Copiar texto da resposta"
          >
            {copiedText ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span className="text-emerald-700">Copiado!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-brand-gray" />
                <span>Copiar texto</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
