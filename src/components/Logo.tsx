import React, { useState, useEffect } from 'react';

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export default function Logo({ className = '', iconOnly = false, size = 'md' }: LogoProps) {
  const [logoSrc, setLogoSrc] = useState<string | null>(null);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    const handleUpdate = () => {
      const customLocal = localStorage.getItem('social_forge_custom_logo');
      const faviconLinks = document.querySelectorAll("link[rel*='icon']");
      if (customLocal) {
        setLogoSrc(customLocal);
        setLoadError(false);
        faviconLinks.forEach(link => {
          link.setAttribute('href', customLocal);
          if (customLocal.startsWith('data:image/png')) {
            link.setAttribute('type', 'image/png');
          } else if (customLocal.startsWith('data:image/jpeg') || customLocal.startsWith('data:image/jpg')) {
            link.setAttribute('type', 'image/jpeg');
          }
        });
      } else {
        // Default to loading from local path. We also query /logo.jpg, /logo.png, etc.
        setLogoSrc('/logo.jpg');
        setLoadError(false);
        faviconLinks.forEach(link => {
          link.setAttribute('href', '/logo.jpg');
          link.setAttribute('type', 'image/jpeg');
        });
      }
    };

    handleUpdate();

    window.addEventListener('social_forge_logo_updated', handleUpdate);
    return () => {
      window.removeEventListener('social_forge_logo_updated', handleUpdate);
    };
  }, []);

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
      {/* Dynamic Logo Loader: tries custom image, falls back to vector SVG */}
      {logoSrc && !loadError ? (
        <img 
          src={logoSrc} 
          onError={() => {
            const faviconLinks = document.querySelectorAll("link[rel*='icon']");
            // Fallback to local logo.png if /logo.jpg failed, else fall back to SVG
            if (logoSrc === '/logo.jpg') {
              setLogoSrc('/logo.png');
              faviconLinks.forEach(link => {
                link.setAttribute('href', '/logo.png');
                link.setAttribute('type', 'image/png');
              });
            } else if (logoSrc === '/logo.png') {
              setLogoSrc('/logo.jpeg');
              faviconLinks.forEach(link => {
                link.setAttribute('href', '/logo.jpeg');
                link.setAttribute('type', 'image/jpeg');
              });
            } else {
              setLoadError(true);
              faviconLinks.forEach(link => {
                link.setAttribute('href', '/favicon.svg');
                link.setAttribute('type', 'image/svg+xml');
              });
            }
          }} 
          className={`${iconSize} object-contain rounded-lg drop-shadow-[0_0_8px_rgba(249,115,22,0.25)] transition-transform hover:scale-105 duration-300`} 
          alt="Social Forge"
          id="brand-logo-img"
          referrerPolicy="no-referrer"
        />
      ) : (
        /* Precision Hand-Vectorized Brand Flame SVG */
        <svg 
          className={`${iconSize} drop-shadow-[0_0_12px_rgba(249,115,22,0.35)] transition-transform hover:scale-105 duration-500`} 
          viewBox="0 0 100 125" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          id="socialforge-logo-svg"
        >
          <defs>
            {/* Top Yellow/Orange Flame Gradient */}
            <linearGradient id="yellowFlameGrad" x1="40" y1="60" x2="65" y2="10" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFA800" />
              <stop offset="50%" stopColor="#FFC800" />
              <stop offset="100%" stopColor="#FFE600" />
            </linearGradient>

            {/* Middle Vibrant Flame Gradient */}
            <linearGradient id="orangeFlameGrad" x1="25" y1="75" x2="70" y2="25" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FF2A00" />
              <stop offset="45%" stopColor="#FF6B00" />
              <stop offset="100%" stopColor="#FFB800" />
            </linearGradient>

            {/* Under Deep Flame Gradient */}
            <linearGradient id="redFlameGrad" x1="15" y1="80" x2="60" y2="15" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#9E0000" />
              <stop offset="50%" stopColor="#E52100" />
              <stop offset="100%" stopColor="#FF5500" />
            </linearGradient>

            {/* Luxury 3D Chrome Silver Metallic Gradient */}
            <linearGradient id="chromeGrad" x1="25" y1="55" x2="80" y2="120" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="15%" stopColor="#E2E8F0" />
              <stop offset="35%" stopColor="#94A3B8" />
              <stop offset="50%" stopColor="#475569" />
              <stop offset="68%" stopColor="#0F172A" />
              <stop offset="85%" stopColor="#475569" />
              <stop offset="100%" stopColor="#E2E8F0" />
            </linearGradient>

            {/* 3D Highlight Bevel Gradient */}
            <linearGradient id="chromeBevel" x1="30" y1="60" x2="60" y2="115" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
              <stop offset="40%" stopColor="#94A3B8" stopOpacity="0.3" />
              <stop offset="80%" stopColor="#0F172A" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#000000" stopOpacity="1" />
            </linearGradient>

            {/* Glow filter to emphasize ambient lighting of flames */}
            <filter id="flameGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Background Flame Glow */}
          <g filter="url(#flameGlow)">
            {/* Flame Swoosh 1: Deep Red-Orange Outer Branch */}
            <path 
              d="M 22 84 C 9 60 16 33 34 20 C 48 10 58 6 58 6 C 58 6 50 15 46 24 C 40 36 40 49 49 59 C 58 69 52 81 43 87 C 35 92 28 89 22 84 Z" 
              fill="url(#redFlameGrad)" 
              opacity="0.9"
            />

            {/* Flame Swoosh 2: Vibrant Mid-Orange Branch */}
            <path 
              d="M 29 74 C 20 52 25 33 41 22 C 54 12 68 13 68 13 C 68 13 58 20 54 29 C 49 41 52 52 61 60 C 68 67 63 78 54 83 C 45 87 36 82 29 74 Z" 
              fill="url(#orangeFlameGrad)" 
            />

            {/* Flame Swoosh 3: Bright Yellow Inner Branch */}
            <path 
              d="M 37 66 C 31 49 36 34 49 26 C 60 19 72 22 72 22 C 72 22 63 26 60 34 C 57 44 61 53 69 59 C 76 65 72 74 63 78 C 55 82 45 76 37 66 Z" 
              fill="url(#yellowFlameGrad)" 
            />
          </g>

          {/* 3D Chrome Silver Metallic 'F' Shape / Sword Blade */}
          <path 
            d="M 35 60 C 42 61 58 58 66 54 C 74 50 82 45 82 45 C 82 45 74 52 66 58 C 58 64 54 68 53 73 C 51 80 50 88 47 98 C 45 106 43 115 43 115 C 43 115 48 103 50 93 C 53 82 60 72 73 66 C 81 62 84 62 84 62 C 84 62 76 66 69 73 C 61 82 59 93 57 105 C 55 117 44 122 41 122 C 38 122 34 117 33 111 C 31 100 32 88 33 77 C 34 68 31 63 28 60 C 26 58 31 59 35 60 Z" 
            fill="url(#chromeGrad)" 
            stroke="#0a0a0a" 
            strokeWidth="0.5"
          />

          {/* 3D Highlight Bevel Sweep for metallic volume */}
          <path 
            d="M 33 77 C 34 68 31 63 28 60 C 31 59 35 60 42 61 C 58 58 66 54 74 50 C 70 54 62 58 54 62 C 48 65 44 70 43 75 C 41 85 41 95 39 105 C 38 111 36 117 35 120 C 37 114 38 108 38 100 C 39 88 37 80 33 77 Z" 
            fill="url(#chromeBevel)" 
            opacity="0.85"
            />

          {/* Sparkling Glint highlight */}
          <circle cx="53" cy="73" r="1.5" fill="#FFFFFF" opacity="0.95" />
        </svg>
      )}

      {/* Font Logo text */}
      {!iconOnly && (
        <span className={`${textSize} font-display font-bold uppercase tracking-tight`}>
          <span className="text-white">Social</span>
          <span className="text-amber-500">Forge</span>
        </span>
      )}
    </div>
  );
}
