import type { Metadata, Viewport } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingHeartsBackground from '@/components/FloatingHeartsBackground';

export const metadata: Metadata = {
  title: 'ExGPT — Converse com seu ex virtual | Seu ex nunca superou. Agora ele tem IA.',
  description: 'O ExGPT transforma qualquer mensagem em respostas afiadas, sarcásticas e passivo-agressivas como só um ex sabe dar. Experimente o chat de IA mais divertido e viral da internet.',
  keywords: ['ExGPT', 'ex virtual', 'inteligência artificial', 'humor', 'indiretas', 'deboche', 'chat IA', 'tiktok viral'],
  authors: [{ name: 'ExGPT Team' }],
  openGraph: {
    title: 'ExGPT — Seu ex nunca superou. Agora ele tem IA.',
    description: 'Transforme qualquer mensagem em uma resposta cheia de indiretas, sarcasmo e aquele deboche clássico. Porque superar é opcional, dar indireta é obrigatório.',
    url: 'https://exgpt.app',
    siteName: 'ExGPT',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=1200&auto=format&fit=crop&q=80',
        width: 1200,
        height: 630,
        alt: 'ExGPT - Seu Ex Virtual com Inteligência Artificial'
      }
    ],
    locale: 'pt_BR',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ExGPT — Seu ex nunca superou. Agora ele tem IA.',
    description: 'Converse com 7 personalidades do seu ex virtual com IA sarcástica e crie cards virais para Stories!',
  },
  icons: {
    icon: '/favicon.ico',
  }
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#FF4F9A',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen flex flex-col bg-[#FFF0F6] text-[#21131B] selection:bg-[#FF4F9A] selection:text-white relative">
        <FloatingHeartsBackground />
        <Header />
        <main className="flex-1 flex flex-col relative z-10">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
