import React from 'react';

interface BrokenHeartIconProps {
  className?: string;
  size?: number;
}

export default function BrokenHeartIcon({ className = 'w-6 h-6', size }: BrokenHeartIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={size ? { width: size, height: size } : undefined}
    >
      <defs>
        <linearGradient id="heartPinkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF4F9A" />
          <stop offset="100%" stopColor="#FF2E88" />
        </linearGradient>
      </defs>
      {/* Broken Heart Path */}
      <path
        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
        fill="url(#heartPinkGrad)"
      />
      {/* Crack line in heart */}
      <path
        d="M11.5 5.5L13.5 9.5L10 13L13.5 16.5L11.5 20.5"
        stroke="#FFF0F6"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
