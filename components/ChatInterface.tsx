'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Personality, Message, PersonalityId, ShareCardData } from '@/lib/types';
import { PERSONALITIES, getPersonalityById } from '@/lib/personalities';
import MessageBubble from './MessageBubble';
import PersonalitySelectorModal from './PersonalitySelectorModal';
import ShareCardModal from './ShareCardModal';
import PremiumModal from './PremiumModal';
import ApiKeyModal from './ApiKeyModal';
import BrokenHeartIcon from './BrokenHeartIcon';
import { playMessageSound, formatTimeNow } from '@/lib/utils';
import {
  Send,
  Trash2,
  Sparkles,
  Volume2,
  VolumeX,
  RefreshCw,
  Crown,
  ChevronDown,
  AlertCircle,
  Key
} from 'lucide-react';

interface ChatInterfaceProps {
  initialPersonalityId?: PersonalityId;
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: 'initial-1',
    sender: 'user',
    text: 'Oi, tudo bem? Sumido...',
    timestamp: 'Ontem 22:45',
    personalityId: 'debochado'
  },
  {
    id: 'initial-2',
    sender: 'ex',
    text: 'Olha só quem apareceu! Achei que tinha perdido meu contato junto com a memória das nossas conversas. Mas estou bem, viu? Obrigado por perguntar. Depois de tudo, até que aprendi a gostar da paz.',
    timestamp: 'Hoje 00:02',
    personalityId: 'debochado'
  }
];

export default function ChatInterface({ initialPersonalityId = 'debochado' }: ChatInterfaceProps) {
  const [personality, setPersonality] = useState<Personality>(() => getPersonalityById(initialPersonalityId));
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [messageCount, setMessageCount] = useState(2);
  const maxFreeMessages = 9999;

  const [selectorOpen, setSelectorOpen] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [premiumModalOpen, setPremiumModalOpen] = useState(false);
  const [apiKeyModalOpen, setApiKeyModalOpen] = useState(false);
  const [hasCustomKey, setHasCustomKey] = useState(false);
  const [shareData, setShareData] = useState<ShareCardData | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll para a última mensagem
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  // Recupera histórico local se houver
  useEffect(() => {
    try {
      const storedKey = localStorage.getItem('exgpt_custom_api_key');
      setHasCustomKey(!!storedKey);

      const savedMessages = localStorage.getItem(`exgpt_chat_${personality.id}`);
      if (savedMessages) {
        const parsed = JSON.parse(savedMessages);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setMessages(parsed);
        }
      }
    } catch (e) {
      console.error(e);
    }
  }, [personality.id]);

  // Atualiza personalidade se a prop mudar
  useEffect(() => {
    if (initialPersonalityId) {
      setPersonality(getPersonalityById(initialPersonalityId));
    }
  }, [initialPersonalityId]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const text = inputText.trim();
    if (!text || loading) return;

    if (messageCount >= maxFreeMessages) {
      setPremiumModalOpen(true);
      return;
    }

    const time = formatTimeNow();
    const userMsg: Message = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: time,
      personalityId: personality.id
    };

    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInputText('');
    setLoading(true);
    setMessageCount((prev) => prev + 1);

    if (soundEnabled) {
      playMessageSound('sent');
    }

    try {
      const customKey = localStorage.getItem('exgpt_custom_api_key') || undefined;
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          personalityId: personality.id,
          apiKey: customKey,
          history: newMessages.slice(-16).map((m) => ({
            role: m.sender === 'user' ? 'user' : 'assistant',
            content: m.text
          }))
        })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Erro ao obter resposta do seu ex.');
      }

      const exMsg: Message = {
        id: `ex-${Date.now()}`,
        sender: 'ex',
        text: data.text,
        timestamp: formatTimeNow(),
        personalityId: personality.id
      };

      const updated = [...newMessages, exMsg];
      setMessages(updated);
      try {
        localStorage.setItem(`exgpt_chat_${personality.id}`, JSON.stringify(updated));
      } catch (err) {
        console.error(err);
      }

      if (soundEnabled) {
        playMessageSound('received');
      }
    } catch (err) {
      console.error(err);
      const errorMsg: Message = {
        id: `err-${Date.now()}`,
        sender: 'ex',
        text: 'Visualizei sua mensagem mas fiquei sem sinal na terapia. Tenta de novo já já! 💅',
        timestamp: formatTimeNow(),
        personalityId: personality.id
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  const handleClearChat = () => {
    if (window.confirm('Tem certeza que quer apagar as mensagens com esse ex? (Assim como na vida real, não tem volta)')) {
      setMessages([]);
      localStorage.removeItem(`exgpt_chat_${personality.id}`);
    }
  };

  const handleOpenShare = (exText: string, userText?: string) => {
    setShareData({
      exResponse: exText,
      userMessage: userText,
      personalityName: personality.name,
      personalityEmoji: personality.emoji,
      format: 'stories'
    });
    setShareModalOpen(true);
  };

  const handleReaction = (messageId: string, emoji: string) => {
    setMessages((prev) =>
      prev.map((m) => (m.id === messageId ? { ...m, reaction: emoji } : m))
    );
  };

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col h-[calc(100vh-8.5rem)] sm:h-[820px] glass-chat rounded-3xl shadow-2xl border border-pink-300 overflow-hidden relative">
      {/* 1. CABEÇALHO DO CHAT */}
      <div className="px-4 py-3 sm:px-6 sm:py-4 bg-white/80 border-b border-pink-200/80 flex items-center justify-between shrink-0">
        {/* AVATAR + INFOS DO EX */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <div
              className={`w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br ${personality.avatarBg} flex items-center justify-center text-2xl shadow-pink`}
            >
              {personality.emoji}
            </div>
            <span
              className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white shadow-xs"
              title="Online agora"
            />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-black text-[#21131B]">
                {personality.name}
              </h2>
              <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                Online
              </span>
            </div>
            <p className="text-xs font-semibold text-pink-600 flex items-center gap-1">
              <span>{loading ? personality.statusText : personality.tagline}</span>
            </p>
          </div>
        </div>

        {/* AÇÕES DE CABEÇALHO */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* SELETOR RÁPIDO DE PERSONALIDADE */}
          <button
            onClick={() => setSelectorOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-pink-100/80 hover:bg-pink-200/90 text-pink-700 text-xs font-bold border border-pink-200 transition-colors shadow-xs"
            title="Trocar personalidade"
          >
            <span>{personality.emoji}</span>
            <span className="hidden sm:inline">Trocar Ex</span>
            <ChevronDown className="w-3.5 h-3.5" />
          </button>

          {/* TOGGLE SOUND */}
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-2 rounded-xl text-brand-gray hover:text-pink-600 hover:bg-pink-100/60 transition-colors"
            title={soundEnabled ? 'Silenciar sons' : 'Ativar sons'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-pink-500" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* CONFIGURAR CHAVE IA */}
          <button
            onClick={() => setApiKeyModalOpen(true)}
            className={`p-2 rounded-xl transition-colors relative ${
              hasCustomKey
                ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                : 'text-brand-gray hover:text-pink-600 hover:bg-pink-100/60'
            }`}
            title="Configurar Chave de IA (Gemini/OpenAI)"
          >
            <Key className="w-4 h-4" />
            {hasCustomKey && (
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            )}
          </button>

          {/* LIMPAR CHAT */}
          <button
            onClick={handleClearChat}
            className="p-2 rounded-xl text-brand-gray hover:text-rose-600 hover:bg-rose-50 transition-colors"
            title="Limpar conversa"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* BARRA INFORMATIVA DE LIMITE / PERSONALIDADE */}
      <div className="px-4 py-1.5 bg-pink-50/70 border-b border-pink-200/50 flex items-center justify-between text-[11px] font-semibold text-brand-gray shrink-0">
        <div className="flex items-center gap-1.5">
          <Sparkles className="w-3 h-3 text-pink-500" />
          <span>
            Personalidade: <strong className="text-pink-600">{personality.name}</strong>
          </span>
        </div>

        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold border border-emerald-200">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
          <span>IA Contínua com Memória Ativa</span>
        </div>
      </div>

      {/* 2. ÁREA DE MENSAGENS COM SCROLL */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-2">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-6 text-brand-gray">
            <div className="w-16 h-16 rounded-3xl bg-pink-100 flex items-center justify-center text-3xl mb-3 shadow-inner">
              {personality.emoji}
            </div>
            <h3 className="text-base font-extrabold text-[#21131B]">
              Conversa limpa com {personality.name}
            </h3>
            <p className="text-xs max-w-sm mt-1">
              Envie uma mensagem abaixo para ver a reação debochada e sarcástica gerada pela IA.
            </p>
            <div className="flex flex-wrap gap-2 justify-center mt-4">
              {['Oi, sumido...', 'Podemos conversar?', 'Você ainda lembra de mim?'].map((sug) => (
                <button
                  key={sug}
                  onClick={() => {
                    setInputText(sug);
                    inputRef.current?.focus();
                  }}
                  className="px-3 py-1.5 rounded-full bg-white text-xs font-semibold text-pink-600 border border-pink-200 hover:bg-pink-50 transition-colors"
                >
                  &quot;{sug}&quot;
                </button>
              ))}
            </div>
          </div>
        ) : (
          messages.map((msg, index) => {
            // Pega mensagem de usuário anterior como contexto para o card
            const previousUserMsg =
              msg.sender === 'ex' && index > 0 && messages[index - 1]?.sender === 'user'
                ? messages[index - 1]?.text
                : undefined;

            return (
              <MessageBubble
                key={msg.id}
                message={msg}
                personality={personality}
                userMessageContext={previousUserMsg}
                onOpenShareModal={(exText, userText) => handleOpenShare(exText, userText)}
                onReaction={handleReaction}
              />
            );
          })
        )}

        {/* INDICADOR DE DIGITAÇÃO ANIMADO ("ExGPT está digitando...") */}
        {loading && (
          <div className="flex items-center gap-2.5 animate-in fade-in duration-200 pt-2">
            <div
              className={`w-8 h-8 rounded-2xl bg-gradient-to-br ${personality.avatarBg} flex items-center justify-center text-sm shadow-sm`}
            >
              {personality.emoji}
            </div>
            <div className="px-4 py-3 rounded-2xl rounded-tl-sm bg-white border border-pink-200 shadow-pink flex items-center gap-2">
              <span className="text-xs font-bold text-pink-600">
                {personality.name} está digitando
              </span>
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-pink-500 typing-dot" />
                <span className="w-1.5 h-1.5 rounded-full bg-pink-500 typing-dot" />
                <span className="w-1.5 h-1.5 rounded-full bg-pink-500 typing-dot" />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* 3. CAIXA DE TEXTO FIXA NA PARTE INFERIOR */}
      <form
        onSubmit={handleSendMessage}
        className="p-3 sm:p-4 bg-white/95 border-t border-pink-200/80 flex items-center gap-2 shrink-0 shadow-lg"
      >
        <div className="relative flex-1">
          <input
            ref={inputRef}
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Digite uma mensagem para seu ex responder..."
            disabled={loading}
            maxLength={300}
            className="w-full py-3.5 pl-4 pr-12 rounded-2xl bg-pink-50/70 border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:bg-white text-sm font-medium placeholder:text-brand-gray/70 transition-all"
          />
          {inputText.length > 0 && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-mono text-brand-gray">
              {inputText.length}/300
            </span>
          )}
        </div>

        <button
          type="submit"
          disabled={!inputText.trim() || loading}
          className="h-12 w-12 sm:w-auto sm:px-5 rounded-2xl bg-gradient-to-r from-[#FF4F9A] to-[#FF2E88] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-pink hover:shadow-neon transition-all active:scale-95 disabled:opacity-40 disabled:hover:shadow-none"
        >
          <Send className="w-4 h-4" />
          <span className="hidden sm:inline">Enviar</span>
        </button>
      </form>

      {/* MODAIS INTEGRADOS */}
      <PersonalitySelectorModal
        isOpen={selectorOpen}
        onClose={() => setSelectorOpen(false)}
        selectedId={personality.id}
        onSelect={(newP) => setPersonality(newP)}
      />

      <ShareCardModal
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        data={shareData}
      />

      <PremiumModal
        isOpen={premiumModalOpen}
        onClose={() => setPremiumModalOpen(false)}
      />

      <ApiKeyModal
        isOpen={apiKeyModalOpen}
        onClose={() => setApiKeyModalOpen(false)}
        onSaved={() => {
          if (typeof window !== 'undefined') {
            setHasCustomKey(!!localStorage.getItem('exgpt_custom_api_key'));
          }
        }}
      />
    </div>
  );
}
