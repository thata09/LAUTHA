'use client';

import React, { useState } from 'react';
import { Message, Personality } from '@/lib/types';
import { Copy, Check, Share2, Sparkles, HeartCrack } from 'lucide-react';

interface MessageBubbleProps {
  message: Message;
  personality: Personality;
  userMessageContext?: string;
  onOpenShareModal: (exText: string, userText?: string) => void;
  onReaction?: (messageId: string, emoji: string) => void;
}

export default function MessageBubble({
  message,
  personality,
  userMessageContext,
  onOpenShareModal,
  onReaction,
}: MessageBubbleProps) {
  const [copied, setCopied] = useState(false);
  const isEx = message.sender === 'ex';

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div
      className={`flex w-full mb-4 animate-in fade-in slide-in-from-bottom-2 duration-200 ${
        isEx ? 'justify-start' : 'justify-end'
      }`}
    >
      <div className={`flex items-end gap-2.5 max-w-[88%] sm:max-w-[78%] ${isEx ? 'flex-row' : 'flex-row-reverse'}`}>
        {/* AVATAR DO EX */}
        {isEx && (
          <div
            className={`w-9 h-9 rounded-2xl bg-gradient-to-br ${personality.avatarBg} shrink-0 flex items-center justify-center text-base shadow-sm border border-pink-200`}
            title={personality.name}
          >
            {personality.emoji}
          </div>
        )}

        <div className="flex flex-col">
          {/* IDENTIFICAÇÃO DO REMETENTE */}
          <div className={`flex items-center gap-1.5 mb-1 px-1 text-[11px] font-bold ${isEx ? 'text-pink-600' : 'text-right justify-end text-brand-gray'}`}>
            <span>{isEx ? `${personality.name}` : 'Você'}</span>
            <span className="text-[10px] font-normal text-brand-gray/80">• {message.timestamp}</span>
          </div>

          {/* BALÃO DA MENSAGEM */}
          <div
            className={`relative p-4 rounded-3xl text-sm leading-relaxed transition-all shadow-sm ${
              isEx
                ? 'bg-white/95 text-[#21131B] rounded-tl-sm border border-pink-200/90 shadow-pink'
                : 'bg-gradient-to-r from-pink-500 to-rose-600 text-white rounded-tr-sm shadow-pink font-medium'
            }`}
          >
            <p className="whitespace-pre-wrap">{message.text}</p>

            {/* REAÇÃO FIXADA */}
            {message.reaction && (
              <span className="absolute -bottom-2 right-3 px-2 py-0.5 rounded-full bg-white text-xs shadow-md border border-pink-200 animate-in zoom-in-75">
                {message.reaction}
              </span>
            )}
          </div>

          {/* BARRA DE AÇÕES PARA O EX */}
          {isEx && (
            <div className="flex items-center gap-1.5 mt-1.5 px-1">
              <button
                onClick={handleCopy}
                className="p-1 px-2 rounded-lg bg-white/70 hover:bg-pink-100 text-brand-gray hover:text-pink-700 text-xs font-semibold flex items-center gap-1 border border-pink-200/60 transition-colors"
                title="Copiar resposta"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                <span className="text-[10px]">{copied ? 'Copiado!' : 'Copiar'}</span>
              </button>

              <button
                onClick={() => onOpenShareModal(message.text, userMessageContext)}
                className="p-1 px-2 rounded-lg bg-pink-100 hover:bg-pink-200 text-pink-700 text-xs font-semibold flex items-center gap-1 border border-pink-200 transition-colors"
                title="Gerar card para Stories e WhatsApp"
              >
                <Share2 className="w-3 h-3 text-pink-600" />
                <span className="text-[10px]">Card Stories</span>
              </button>

              {/* REAÇÕES RÁPIDAS COM EMOJIS */}
              <div className="flex items-center gap-0.5 ml-auto">
                {['💅', '🔥', '💀', '😭'].map((emo) => (
                  <button
                    key={emo}
                    onClick={() => onReaction?.(message.id, emo)}
                    className="hover:scale-125 transition-transform p-0.5 text-xs opacity-70 hover:opacity-100"
                    title={`Reagir com ${emo}`}
                  >
                    {emo}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
