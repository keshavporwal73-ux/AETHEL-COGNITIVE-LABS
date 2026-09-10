import React from 'react';

interface AethelLogoProps {
  size?: number | string;
  className?: string;
  showWordmark?: boolean;
  showTagline?: boolean;
  isAnimated?: boolean;
  variant?: 'default' | 'accent' | 'cyan' | 'violet' | 'monochrome';
}

export const AethelLogo: React.FC<AethelLogoProps> = ({
  size = 32,
  className = '',
  showWordmark = false,
  showTagline = false,
  isAnimated = true,
  variant = 'default',
}) => {
  const numSize = typeof size === 'number' ? size : parseInt(size as string, 10) || 32;

  // Colors based on variant
  const getGlowFilter = () => {
    switch (variant) {
      case 'cyan': return 'drop-shadow(0 0 10px rgba(6,182,212,0.65))';
      case 'violet': return 'drop-shadow(0 0 10px rgba(168,85,247,0.65))';
      case 'accent': return 'drop-shadow(0 0 10px rgba(244,63,94,0.65))';
      default: return 'drop-shadow(0 0 12px rgba(6,182,212,0.5)) drop-shadow(0 0 20px rgba(139,92,246,0.35))';
    }
  };

  return (
    <div className={`inline-flex items-center gap-3 select-none group ${className}`}>
      {/* Futuristic Holographic Quantum Mark */}
      <div 
        className="relative flex items-center justify-center shrink-0 cursor-pointer"
        style={{ width: numSize, height: numSize, filter: getGlowFilter() }}
      >
        <svg
          viewBox="0 0 120 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`w-full h-full transform transition-all duration-700 group-hover:scale-105`}
        >
          <defs>
            {/* Holographic Gradients */}
            <linearGradient id="aethelCyanViolet" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="50%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>

            <linearGradient id="aethelCoreGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="40%" stopColor="#a855f7" />
              <stop offset="100%" stopColor="#f43f5e" />
            </linearGradient>

            <linearGradient id="aethelNeonBeam" x1="0%" y1="50%" x2="100%" y2="50%">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#ffffff" stopOpacity="1" />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.8" />
            </linearGradient>

            <radialGradient id="aethelHyperGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.8" />
              <stop offset="45%" stopColor="#8b5cf6" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#0f172a" stopOpacity="0" />
            </radialGradient>

            {/* Glowing filter definition */}
            <filter id="quantumAura" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Core Ambient Glow Orb */}
          <circle cx="60" cy="60" r="42" fill="url(#aethelHyperGlow)" />

          {/* Outer Cybernetic Ring - Slow Rotation */}
          <g className={isAnimated ? 'animate-[spin_20s_linear_infinite]' : ''} style={{ transformOrigin: '60px 60px' }}>
            <circle
              cx="60"
              cy="60"
              r="52"
              stroke="#06b6d4"
              strokeWidth="1.2"
              strokeOpacity="0.4"
              strokeDasharray="4 8 16 8"
            />
            {/* Outer Cardinal Node Pips */}
            <circle cx="60" cy="8" r="2.5" fill="#06b6d4" />
            <circle cx="112" cy="60" r="2.5" fill="#8b5cf6" />
            <circle cx="60" cy="112" r="2.5" fill="#ec4899" />
            <circle cx="8" cy="60" r="2.5" fill="#38bdf8" />
          </g>

          {/* Middle Counter-Rotating Quantum Ring */}
          <g className={isAnimated ? 'animate-[spin_12s_linear_infinite_reverse]' : ''} style={{ transformOrigin: '60px 60px' }}>
            <circle
              cx="60"
              cy="60"
              r="40"
              stroke="#8b5cf6"
              strokeWidth="1.5"
              strokeOpacity="0.6"
              strokeDasharray="12 10 2 6"
            />
            {/* Diagonal Orbit Satellites */}
            <circle cx="32" cy="32" r="2" fill="#06b6d4" />
            <circle cx="88" cy="88" r="2" fill="#ec4899" />
            <circle cx="88" cy="32" r="2" fill="#38bdf8" />
            <circle cx="32" cy="88" r="2" fill="#a855f7" />
          </g>

          {/* Interlocking Quantum Rhombus / Hex Core Geometry */}
          <g filter="url(#quantumAura)">
            {/* Primary Diamond Facet (Top-Right / Bottom-Left Synthesis) */}
            <polygon
              points="60,18 96,60 60,102 24,60"
              stroke="url(#aethelCyanViolet)"
              strokeWidth="2"
              fill="none"
              strokeLinejoin="round"
              className="opacity-90"
            />

            {/* Inner Precision Hex Nexus */}
            <polygon
              points="60,32 84,46 84,74 60,88 36,74 36,46"
              stroke="#ffffff"
              strokeWidth="1"
              strokeOpacity="0.6"
              fill="#090d16"
              fillOpacity="0.75"
            />

            {/* 4 Convergent Laser Beams (Multi-Model Perspective Streams) */}
            <line x1="18" y1="18" x2="52" y2="52" stroke="url(#aethelNeonBeam)" strokeWidth="1.8" strokeLinecap="round" />
            <line x1="102" y1="18" x2="68" y2="52" stroke="url(#aethelNeonBeam)" strokeWidth="1.8" strokeLinecap="round" />
            <line x1="102" y1="102" x2="68" y2="68" stroke="url(#aethelNeonBeam)" strokeWidth="1.8" strokeLinecap="round" />
            <line x1="18" y1="102" x2="52" y2="68" stroke="url(#aethelNeonBeam)" strokeWidth="1.8" strokeLinecap="round" />

            {/* Central Hyper-Dense Singularity / Core Diamond */}
            <polygon
              points="60,45 75,60 60,75 45,60"
              fill="url(#aethelCoreGrad)"
              className={isAnimated ? 'animate-pulse' : ''}
            />

            {/* Central Sparkle Micro-Core */}
            <circle cx="60" cy="60" r="3.5" fill="#ffffff" />
            <circle cx="60" cy="60" r="7" stroke="#ffffff" strokeWidth="0.8" strokeOpacity="0.8" />
          </g>

          {/* High-Tech HUD Crosshair Overlay */}
          <line x1="60" y1="14" x2="60" y2="24" stroke="#06b6d4" strokeWidth="1.5" />
          <line x1="60" y1="96" x2="60" y2="106" stroke="#06b6d4" strokeWidth="1.5" />
          <line x1="14" y1="60" x2="24" y2="60" stroke="#06b6d4" strokeWidth="1.5" />
          <line x1="96" y1="60" x2="106" y2="60" stroke="#06b6d4" strokeWidth="1.5" />
        </svg>

        {/* Ambient Pulsing Holographic Ring Particle */}
        <span className="absolute inset-0 rounded-full bg-cyan-500/10 animate-ping pointer-events-none -z-10" />
      </div>

      {/* Wordmark & Futuristic Sub-brand */}
      {showWordmark && (
        <div className="flex flex-col leading-none">
          <div className="flex items-center gap-1.5">
            <span className="font-mono font-black text-base md:text-lg tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-violet-400">
              AETHEL
            </span>
            <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold tracking-widest uppercase bg-cyan-950/70 text-cyan-300 border border-cyan-500/30 shadow-[0_0_10px_rgba(6,182,212,0.2)]">
              LABS
            </span>
          </div>
          {showTagline && (
            <span className="text-[10px] font-mono tracking-widest text-muted-foreground uppercase opacity-80 mt-0.5">
              Cognitive Intelligence
            </span>
          )}
        </div>
      )}
    </div>
  );
};
