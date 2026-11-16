'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import BrokenHeartIcon from './BrokenHeartIcon';
import { MessageCircleHeart, Sparkles, Menu, X, ArrowRight, Flame } from 'lucide-react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: '/', label: 'Início' },
    { href: '/chat', label: 'Chat com Ex' },
    { href: '/gerador', label: 'O Que Meu Ex Responderia?' },
    { href: '/personalidades', label: 'Personalidades' },
    { href: '/#como-funciona', label: 'Como Funciona' },
    { href: '/#faq', label: 'FAQ' },
  ];

  const isActive = (path: string) => {
    if (path.startsWith('/#')) return false;
    return pathname === path;
  };

  return (
    <header className="sticky top-0 z-50 w-full glass-panel border-b border-pink-200/50 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-3 group focus:outline-none">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center shadow-pink group-hover:scale-105 transition-transform duration-300">
            <BrokenHeartIcon className="w-6 h-6" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="text-2xl font-extrabold tracking-tight text-[#21131B]">
                Ex<span className="gradient-text">GPT</span>
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-pink-100 text-pink-600 border border-pink-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                IA
              </span>
            </div>
            <span className="text-[10px] font-medium text-brand-gray -mt-1 hidden sm:block">
              Seu ex nunca superou
            </span>
          </div>
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-3 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                isActive(link.href)
                  ? 'bg-pink-100 text-pink-700 shadow-sm'
                  : 'text-[#21131B]/80 hover:text-pink-600 hover:bg-pink-50'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA BUTTON */}
        <div className="hidden sm:flex items-center gap-3">
          <Link
            href="/chat"
            className="group relative inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-[#FF4F9A] to-[#FF2E88] text-white text-sm font-bold shadow-pink hover:shadow-neon hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
          >
            <MessageCircleHeart className="w-4 h-4" />
            <span>Experimentar grátis</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* MOBILE MENU TOGGLE */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-xl bg-pink-100/70 text-[#21131B] hover:bg-pink-200/80 transition-colors"
          aria-label="Menu principal"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* MOBILE DROPDOWN */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-panel border-b border-pink-200 px-4 pt-3 pb-6 animate-in slide-in-from-top-3 duration-200">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-3 rounded-xl text-base font-semibold flex items-center justify-between ${
                  isActive(link.href)
                    ? 'bg-pink-100 text-pink-700'
                    : 'text-[#21131B] hover:bg-pink-50'
                }`}
              >
                <span>{link.label}</span>
                {link.href === '/gerador' && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-pink-200 text-pink-800 font-bold flex items-center gap-1">
                    <Flame className="w-3 h-3 text-red-500" /> 3 Opções
                  </span>
                )}
              </Link>
            ))}

            <Link
              href="/chat"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-3 w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#FF4F9A] to-[#FF2E88] text-white font-bold text-center flex items-center justify-center gap-2 shadow-pink"
            >
              <MessageCircleHeart className="w-5 h-5" />
              <span>Conversar com meu ex agora</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
