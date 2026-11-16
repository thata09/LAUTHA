'use client';

import React, { useState } from 'react';
import { GeneratedOption, ShareCardData } from '@/lib/types';
import ShareCardModal from './ShareCardModal';
import BrokenHeartIcon from './BrokenHeartIcon';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  Copy,
  Check,
  Share2,
  RefreshCw,
  Heart,
  Flame,
  Send,
  Zap,
  Bookmark,
  BookmarkCheck
} from 'lucide-react';

export default function ResponseGenerator() {
  const [inputMessage, setInputMessage] = useState('Oi, estava pensando em você.');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<{
    debochada: string;
    venenosa: string;
    elegante: string;
  } | null>({
    debochada: 'Que bom! Eu estava pensando em como minha vida ficou tranquila e com a conta de luz mais barata. 💅',
    venenosa: 'Engraçado como algumas pessoas só lembram da gente quando o passado bate na porta e o presente tá deserto. 🐍',
    elegante: 'Que interessante. Espero sinceramente que seus pensamentos estejam sendo produtivos. Passar bem.'
  });

  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [shareData, setShareData] = useState<ShareCardData | null>(null);
  const [shareModalOpen, setShareModalOpen] = useState(false);

  const presets = [
    'Oi, estava pensando em você.',
    'Vi uma foto sua e lembrei da gente...',
    'Será que a gente pode conversar?',
    'Ainda guarda rancor de mim?',
    'Sonhei com você essa noite...'
  ];

  const handleGenerate = async (msgToUse?: string) => {
    const text = (msgToUse || inputMessage).trim();
    if (!text || loading) return;

    setLoading(true);
    try {
      const res = await fetch('/api/gerador', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Erro ao gerar as respostas.');
      }

      setResults(data.responses);

      confetti({
        particleCount: 30,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#FF4F9A', '#FF2E88', '#FFB3D4']
      });
    } catch (err) {
      console.error(err);
      alert('Não foi possível gerar no momento. Tente novamente!');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async (key: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  const toggleFavorite = (text: string) => {
    setFavorites((prev) =>
      prev.includes(text) ? prev.filter((t) => t !== text) : [...prev, text]
    );
  };

  const handleShare = (text: string, styleTitle: string, emoji: string) => {
    setShareData({
      exResponse: text,
      userMessage: inputMessage,
      personalityName: `Ex (${styleTitle})`,
      personalityEmoji: emoji,
      format: 'stories'
    });
    setShareModalOpen(true);
  };

  const optionsMeta: {
    key: 'debochada' | 'venenosa' | 'elegante';
    title: string;
    emoji: string;
    badge: string;
    border: string;
    gradient: string;
    desc: string;
  }[] = [
    {
      key: 'debochada',
      title: 'Resposta Debochada',
      emoji: '💅',
      badge: 'Engraçada & Sarcástica',
      border: 'border-pink-300',
      gradient: 'from-pink-500 to-rose-500',
      desc: 'Para fazer rir e mostrar que você tá vivendo a melhor fase.'
    },
    {
      key: 'venenosa',
      title: 'Resposta Venenosa',
      emoji: '🐍',
      badge: 'Indiretas Inteligentes',
      border: 'border-fuchsia-300',
      gradient: 'from-fuchsia-600 to-pink-600',
      desc: 'Mortalmente afiada. Aquela que faz o ego da pessoa cair no chão.'
    },
    {
      key: 'elegante',
      title: 'Resposta Elegante',
      emoji: '🍸',
      badge: 'Fria, Sofisticada & Irônica',
      border: 'border-purple-300',
      gradient: 'from-purple-600 to-indigo-500',
      desc: 'Polida e impecável, mas com uma indiferença calculada de milhões.'
    }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* CARD PRINCIPAL DO INPUT */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 shadow-xl border border-pink-300">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-pink-500 to-rose-600 text-white flex items-center justify-center shadow-pink">
            <Flame className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-[#21131B]">
              O Que Meu Ex Responderia?
            </h2>
            <p className="text-xs sm:text-sm text-brand-gray font-medium">
              Cole a mensagem que você recebeu e a IA gera 3 alternativas mortais
            </p>
          </div>
        </div>

        {/* INPUT AREA */}
        <div className="space-y-3">
          <label className="block text-xs font-bold text-pink-700 uppercase tracking-wider">
            Mensagem que você recebeu (ou quer testar):
          </label>
          <div className="relative">
            <textarea
              rows={3}
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Cole aqui a mensagem... (ex: 'Oi, sumido, vi sua foto e lembrei de você')"
              maxLength={400}
              className="w-full p-4 rounded-2xl bg-pink-50/70 border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:bg-white text-sm font-medium placeholder:text-brand-gray/60 resize-none transition-all"
            />
            <span className="absolute right-3 bottom-3 text-[10px] font-mono text-brand-gray">
              {inputMessage.length}/400
            </span>
          </div>

          {/* SUGESTÕES RÁPIDAS */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            <span className="text-[11px] font-bold text-brand-gray mr-1">Exemplos:</span>
            {presets.map((preset) => (
              <button
                key={preset}
                onClick={() => {
                  setInputMessage(preset);
                  handleGenerate(preset);
                }}
                className="px-2.5 py-1 rounded-full bg-pink-100 hover:bg-pink-200 text-pink-700 text-[11px] font-semibold transition-colors"
              >
                &quot;{preset}&quot;
              </button>
            ))}
          </div>

          {/* BOTÃO GERAR */}
          <div className="pt-2">
            <button
              onClick={() => handleGenerate()}
              disabled={!inputMessage.trim() || loading}
              className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#FF4F9A] via-[#FF2E88] to-rose-600 text-white font-extrabold text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-pink hover:shadow-neon hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-50"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  <span>Gerando 3 deboches com inteligência artificial...</span>
                </>
              ) : (
                <>
                  <Zap className="w-5 h-5 fill-white" />
                  <span>Gerar 3 Respostas Afiadas</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* RESULTADOS: 3 CARDS (DEBOCHADA, VENENOSA, ELEGANTE) */}
      {results && (
        <div className="space-y-4">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-lg font-black text-[#21131B] flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-pink-500" />
              <span>3 Alternativas de Resposta</span>
            </h3>
            <button
              onClick={() => handleGenerate()}
              disabled={loading}
              className="text-xs font-bold text-pink-600 hover:text-pink-800 flex items-center gap-1 transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>Gerar novamente</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {optionsMeta.map((opt) => {
              const text = results[opt.key];
              const isFav = favorites.includes(text);
              const isCopied = copiedKey === opt.key;

              return (
                <div
                  key={opt.key}
                  className={`glass-card rounded-3xl p-5 sm:p-6 flex flex-col justify-between border-2 ${opt.border} shadow-lg hover:shadow-pink transition-all duration-300 relative group`}
                >
                  <div>
                    {/* TOPO DO CARD */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{opt.emoji}</span>
                        <div>
                          <h4 className="text-sm font-black text-[#21131B] uppercase tracking-wide">
                            {opt.title}
                          </h4>
                          <span className="text-[10px] font-bold text-pink-600 block">
                            {opt.badge}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => toggleFavorite(text)}
                        className="p-1.5 rounded-full hover:bg-pink-100 text-brand-gray transition-colors"
                        title={isFav ? 'Remover dos favoritos' : 'Favoritar esta resposta'}
                      >
                        {isFav ? (
                          <BookmarkCheck className="w-4 h-4 text-pink-600 fill-pink-600" />
                        ) : (
                          <Bookmark className="w-4 h-4" />
                        )}
                      </button>
                    </div>

                    <p className="text-[11px] text-brand-gray font-medium mb-4">
                      {opt.desc}
                    </p>

                    {/* TEXTO DA RESPOSTA */}
                    <div className="p-4 rounded-2xl bg-white text-[#21131B] text-sm font-bold border border-pink-200/80 shadow-sm leading-relaxed mb-4">
                      &quot;{text}&quot;
                    </div>
                  </div>

                  {/* AÇÕES (COPIAR, COMPARTILHAR) */}
                  <div className="pt-2 flex items-center gap-2">
                    <button
                      onClick={() => handleCopy(opt.key, text)}
                      className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                        isCopied
                          ? 'bg-emerald-500 text-white'
                          : 'bg-pink-100 hover:bg-pink-200 text-pink-700'
                      }`}
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Copiado!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copiar</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => handleShare(text, opt.title, opt.emoji)}
                      className="py-2 px-3 rounded-xl bg-gradient-to-r from-pink-500 to-rose-600 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-pink hover:scale-105 transition-transform"
                      title="Criar card visual para Stories"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                      <span>Card</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* MODAL DE COMPARTILHAMENTO DE CARD */}
      <ShareCardModal
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        data={shareData}
      />
    </div>
  );
}
