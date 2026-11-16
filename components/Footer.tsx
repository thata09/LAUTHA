import React from 'react';
import Link from 'next/link';
import BrokenHeartIcon from './BrokenHeartIcon';
import { Heart, Sparkles, ShieldAlert, Instagram, MessageCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full glass-panel border-t border-pink-200 mt-auto pt-14 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* COLUNA 1: BRAND */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center shadow-pink">
                <BrokenHeartIcon className="w-5 h-5" />
              </div>
              <span className="text-2xl font-black text-[#21131B]">
                Ex<span className="gradient-text">GPT</span>
              </span>
            </div>

            <p className="text-lg font-bold text-pink-600">
              &quot;Seu ex nunca superou. Agora ele tem IA.&quot;
            </p>
            <p className="text-sm text-brand-gray font-medium leading-relaxed max-w-md">
              &quot;Porque superar é opcional. Dar indireta é obrigatório.&quot; Transforme qualquer mensagem em respostas afiadas, deboches refinados e compartilhe com os amigos no WhatsApp e Instagram.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-pink-100 text-pink-700">
                <Sparkles className="w-3.5 h-3.5 text-pink-500" />
                Criado para viralizar
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-100 text-rose-700">
                <Heart className="w-3.5 h-3.5 text-rose-500" />
                100% Pink Aesthetic
              </span>
            </div>
          </div>

          {/* COLUNA 2: RECURSOS */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#21131B] mb-4">
              Navegação
            </h4>
            <ul className="space-y-2.5 text-sm font-medium text-brand-gray">
              <li>
                <Link href="/chat" className="hover:text-pink-600 transition-colors">
                  Chat com Ex Virtual
                </Link>
              </li>
              <li>
                <Link href="/gerador" className="hover:text-pink-600 transition-colors">
                  O Que Meu Ex Responderia? (3 Opções)
                </Link>
              </li>
              <li>
                <Link href="/personalidades" className="hover:text-pink-600 transition-colors">
                  Todas as 7 Personalidades
                </Link>
              </li>
              <li>
                <Link href="/#como-funciona" className="hover:text-pink-600 transition-colors">
                  Como Funciona o ExGPT
                </Link>
              </li>
              <li>
                <Link href="/#faq" className="hover:text-pink-600 transition-colors">
                  Perguntas Frequentes
                </Link>
              </li>
            </ul>
          </div>

          {/* COLUNA 3: PERSONALIDADES DESTAQUE */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#21131B] mb-4">
              Mais Populares
            </h4>
            <ul className="space-y-2.5 text-sm font-medium text-brand-gray">
              <li>
                <Link href="/chat?p=debochado" className="hover:text-pink-600 transition-colors flex items-center gap-1.5">
                  <span>💅 Ex Debochado</span>
                </Link>
              </li>
              <li>
                <Link href="/chat?p=ciumento" className="hover:text-pink-600 transition-colors flex items-center gap-1.5">
                  <span>👀 Ex Ciumento</span>
                </Link>
              </li>
              <li>
                <Link href="/chat?p=sofrido" className="hover:text-pink-600 transition-colors flex items-center gap-1.5">
                  <span>🥺 Ex Sofrido</span>
                </Link>
              </li>
              <li>
                <Link href="/chat?p=narcisista" className="hover:text-pink-600 transition-colors flex items-center gap-1.5">
                  <span>😎 Ex Narcisista (Paródia)</span>
                </Link>
              </li>
              <li>
                <Link href="/chat?p=frio" className="hover:text-pink-600 transition-colors flex items-center gap-1.5">
                  <span>🧊 Ex Frio</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* DISCLAIMER DE HUMOR & COPYRIGHT */}
        <div className="pt-8 border-t border-pink-200/70 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-brand-gray">
          <div className="flex items-center gap-2 text-center md:text-left">
            <ShieldAlert className="w-4 h-4 text-pink-500 shrink-0" />
            <span>
              <strong>Aviso de Entretenimento:</strong> O ExGPT é uma ferramenta satírica e bem-humorada de ficção com inteligência artificial. Não incentive perseguição, ofensas ou assédio real.
            </span>
          </div>

          <div className="text-center md:text-right shrink-0">
            © {new Date().getFullYear()} ExGPT Inc. Todos os deboches reservados.
          </div>
        </div>
      </div>
    </footer>
  );
}
