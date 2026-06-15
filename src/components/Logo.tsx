import React from 'react';

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export default function Logo({ className = '', iconOnly = false, size = 'md' }: LogoProps) {
  const iconSize = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-16 h-16'
  }[size];

  const textSize = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-4xl'
  }[size];

  return (
    <div className={`flex items-center gap-3 select-none ${className}`} id="socialforge-logo">
      {/* Flame Icon SVG */}
      <svg 
        className={`${iconSize} drop-shadow-[0_0_8px_rgba(245,158,11,0.4)] transition-transform hover:scale-105 duration-300`} 
        viewBox="0 0 100 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="flameGrad" x1="20" y1="90" x2="80" y2="10">
            <stop offset="0%" stopColor="#D82A00" />
            <stop offset="50%" stopColor="#FF5E00" />
            <stop offset="100%" stopColor="#FFAE00" />
          </linearGradient>
          <linearGradient id="silverGrad" x1="10" y1="50" x2="90" y2="50">
            <stop offset="0%" stopColor="#94A3B8" />
            <stop offset="50%" stopColor="#F1F5F9" />
            <stop offset="100%" stopColor="#475569" />
          </linearGradient>
          <linearGradient id="copperGrad" x1="30" y1="95" x2="70" y2="40">
            <stop offset="0%" stopColor="#451A03" />
            <stop offset="50%" stopColor="#B45309" />
            <stop offset="100%" stopColor="#F59E0B" />
          </linearGradient>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Outer Fire Gradient Backing */}
        <path 
          d="M50 5C53 18 57 30 65 35C73 40 82 45 81 58C80 72 65 92 50 95C33 92 18 72 17 58C16 45 25 40 33 35C41 30 45 18 50 5Z" 
          fill="url(#flameGrad)" 
        />
        
        {/* Deep Inner Ember Shadow */}
        <path 
          d="M50 25C51.5 33 54 40 59 43C64 46 69.5 49 69 57C68.5 65.5 59 78 50 80C41 78 31.5 65.5 31 57C30.5 49 36 46 41 43C46 40 48.5 33 50 25Z" 
          fill="url(#copperGrad)" 
          opacity="0.8"
        />

        {/* Elite Curved Silver S/F Blade (The Metallic Intersecting swoop) */}
        <path 
          d="M50 35C55 45 61 52 50 68C42 58 43 50 50 45C52 43 55 40 54 36C53 32 46 38 41 43C36 48 34 56 36 65C38 72 44 77 50 78C58 75 66 65 67 55C68 45 62 38 50 35Z" 
          fill="url(#silverGrad)" 
          filter="url(#glow)"
        />

        {/* Sparkling High Ground Accent */}
        <circle cx="50" cy="35" r="3" fill="#FFFFFF" opacity="0.9" />
        <circle cx="50" cy="78" r="2" fill="#FFAE00" />
      </svg>

      {/* Font Logo text */}
      {!iconOnly && (
        <span className={`${textSize} font-display font-bold uppercase tracking-tight`}>
          <span className="text-white">Social</span>
          <span className="text-primary-orange">Forge</span>
        </span>
      )}
    </div>
  );
}
