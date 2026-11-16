'use client';

import React, { useEffect, useState } from 'react';

interface Particle {
  id: number;
  left: number;
  top: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

export default function FloatingHeartsBackground() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Gerar posições fixas após montagem no cliente para evitar hydration mismatch
    const items: Particle[] = Array.from({ length: 14 }).map((_, i) => ({
      id: i,
      left: Math.random() * 95,
      top: Math.random() * 95,
      size: 14 + Math.random() * 22,
      duration: 6 + Math.random() * 8,
      delay: Math.random() * 5,
      opacity: 0.12 + Math.random() * 0.18
    }));
    setParticles(items);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      {/* Glow radial rosa sutil de fundo */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-pink-300/25 blur-3xl" />
      <div className="absolute top-1/2 -right-32 w-[30rem] h-[30rem] rounded-full bg-rose-300/20 blur-3xl" />
      <div className="absolute -bottom-32 left-1/4 w-96 h-96 rounded-full bg-pink-400/15 blur-3xl" />

      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute text-brand-pink transition-transform duration-1000"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            fontSize: `${p.size}px`,
            opacity: p.opacity,
            animation: `floatParticle ${p.duration}s ease-in-out ${p.delay}s infinite`,
          }}
        >
          {p.id % 3 === 0 ? '💔' : p.id % 2 === 0 ? '💗' : '✨'}
        </div>
      ))}
    </div>
  );
}
