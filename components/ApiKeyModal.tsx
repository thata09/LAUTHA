'use client';

import React, { useState, useEffect } from 'react';
import { Key, Check, X, Sparkles, ExternalLink } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaved: () => void;
}

export default function ApiKeyModal({ isOpen, onClose, onSaved }: ApiKeyModalProps) {
  const [apiKey, setApiKey] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('exgpt_custom_api_key') || '';
      setApiKey(stored);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSave = () => {
    if (typeof window !== 'undefined') {
      if (apiKey.trim()) {
        localStorage.setItem('exgpt_custom_api_key', apiKey.trim());
      } else {
        localStorage.removeItem('exgpt_custom_api_key');
      }
      setSaved(true);
      confetti({
        particleCount: 30,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#FF4F9A', '#FF2E88', '#FFE4EF']
      });
      setTimeout(() => {
        setSaved(false);
        onSaved();
        onClose();
      }, 1000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md glass-card rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-pink-300 animate-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-pink-100 text-brand-gray transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-pink-500 to-rose-600 text-white flex items-center justify-center shadow-pink mb-4">
          <Key className="w-6 h-6" />
        </div>

        <h3 className="text-xl font-black text-[#21131B] mb-1">
          Chave de IA (Opcional)
        </h3>
        <p className="text-xs text-brand-gray font-medium mb-4 leading-relaxed">
          O ExGPT já responde a <strong>qualquer mensagem</strong> com o motor contextual inteligente. Se você tiver uma chave gratuita do Google Gemini, pode colar aqui para usar o modelo LLM online em tempo real!
        </p>

        <div className="space-y-3 mb-5">
          <label className="block text-xs font-bold text-pink-700 uppercase tracking-wider">
            Google Gemini API Key:
          </label>
          <input
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="AIzaSy..."
            className="w-full py-3 px-4 rounded-xl bg-pink-50 border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-500 text-xs sm:text-sm font-mono"
          />
          <a
            href="https://aistudio.google.com/app/apikey"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[11px] font-bold text-pink-600 hover:text-pink-800 underline"
          >
            <span>Obter chave gratuita no Google AI Studio</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleSave}
            className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-pink-500 to-rose-600 text-white font-bold text-xs sm:text-sm shadow-pink hover:scale-102 transition-all flex items-center justify-center gap-1.5"
          >
            {saved ? (
              <>
                <Check className="w-4 h-4" />
                <span>Salvo com sucesso!</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Salvar Configuração</span>
              </>
            )}
          </button>

          {apiKey && (
            <button
              onClick={() => {
                setApiKey('');
                localStorage.removeItem('exgpt_custom_api_key');
                onSaved();
                onClose();
              }}
              className="py-3 px-3 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs border border-rose-200"
            >
              Remover
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
