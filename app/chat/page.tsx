'use client';

import { useEffect } from 'react';

export default function ChatRedirect() {
  useEffect(() => {
    window.location.replace('/#chat');
  }, []);

  return (
    <div className="flex-1 flex items-center justify-center p-12">
      <div className="text-center space-y-3">
        <div className="w-12 h-12 mx-auto rounded-2xl bg-pink-500 animate-spin flex items-center justify-center text-white text-xl">
          💅
        </div>
        <p className="text-sm font-bold text-pink-600">
          Redirecionando para o Chat no link único...
        </p>
      </div>
    </div>
  );
}
