import React from 'react';

interface QuantumParticlesProps {
  className?: string;
  density?: 'low' | 'medium' | 'high';
}

export const QuantumParticles: React.FC<QuantumParticlesProps> = ({
  className = '',
  density = 'medium',
}) => {
  const particleCount = density === 'low' ? 15 : density === 'high' ? 40 : 25;

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {/* Cybernetic Quantum Background Grid */}
      <div 
        className="absolute inset-0 opacity-[0.035] dark:opacity-[0.06]"
        style={{
          backgroundImage: `radial-gradient(#06b6d4 1px, transparent 1px), radial-gradient(#8b5cf6 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
          backgroundPosition: '0 0, 20px 20px'
        }}
      />

      {/* Futuristic Radial Energy Wells */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none animate-pulse duration-[8000ms]" />
      <div className="absolute top-1/2 -right-40 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-3xl pointer-events-none animate-pulse duration-[10000ms]" />
      <div className="absolute -bottom-40 left-1/3 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none animate-pulse duration-[7000ms]" />

      {/* Floating Animated Quantum Shimmer Motes */}
      <div className="relative w-full h-full">
        {Array.from({ length: particleCount }).map((_, i) => {
          const top = `${(i * 17 + 7) % 96}%`;
          const left = `${(i * 23 + 11) % 98}%`;
          const size = (i % 3) + 1.5;
          const duration = 4 + (i % 6);
          const delay = (i % 5) * 0.8;
          const isCyan = i % 2 === 0;

          return (
            <span
              key={i}
              className={`absolute rounded-full pointer-events-none ${
                isCyan 
                  ? 'bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.8)]' 
                  : 'bg-purple-400 shadow-[0_0_8px_rgba(168,85,247,0.8)]'
              }`}
              style={{
                top,
                left,
                width: `${size}px`,
                height: `${size}px`,
                opacity: 0.35 + (i % 4) * 0.15,
                animation: `floatQuantum ${duration}s ease-in-out ${delay}s infinite alternate`,
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export const QuantumBeam: React.FC<{ className?: string; orientation?: 'horizontal' | 'vertical' }> = ({
  className = '',
  orientation = 'horizontal',
}) => {
  if (orientation === 'vertical') {
    return (
      <div className={`relative w-[1px] h-full bg-gradient-to-b from-transparent via-cyan-500/40 to-transparent overflow-hidden ${className}`}>
        <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-transparent via-cyan-300 to-transparent animate-[quantumBeamDown_3s_ease-in-out_infinite]" />
      </div>
    );
  }

  return (
    <div className={`relative h-[1px] w-full bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent overflow-hidden ${className}`}>
      <div className="absolute top-0 left-0 h-full w-1/3 bg-gradient-to-r from-transparent via-cyan-300 to-transparent animate-[quantumBeamRight_3s_ease-in-out_infinite]" />
    </div>
  );
};
