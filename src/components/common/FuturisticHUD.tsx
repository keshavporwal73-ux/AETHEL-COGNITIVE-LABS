import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Activity, Cpu, Radio, ShieldCheck, Zap } from 'lucide-react';

interface FuturisticHUDProps {
  className?: string;
  activeModelsCount?: number;
  quantumStatus?: string;
  latencyMs?: number;
}

export const FuturisticHUD: React.FC<FuturisticHUDProps> = ({
  className = '',
  activeModelsCount = 4,
  quantumStatus = 'COGNITIVE MATRIX ONLINE',
  latencyMs = 184,
}) => {
  return (
    <div className={`flex items-center gap-2 font-mono text-[11px] select-none ${className}`}>
      {/* Real-time Status Beacon */}
      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 shadow-[0_0_12px_rgba(6,182,212,0.15)] backdrop-blur-md">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
        </span>
        <span className="font-semibold tracking-wider uppercase text-[10px]">{quantumStatus}</span>
      </div>

      {/* Neural Node Count */}
      <div className="hidden sm:flex items-center gap-1 px-2 py-1 rounded-md bg-violet-950/40 border border-violet-500/30 text-violet-300 backdrop-blur-md">
        <Cpu className="w-3 h-3 text-violet-400 animate-pulse" />
        <span className="text-[10px] tracking-wide">{activeModelsCount} NEURAL CORES</span>
      </div>

      {/* Quantum Telemetry Latency */}
      <div className="hidden md:flex items-center gap-1 px-2 py-1 rounded-md bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 backdrop-blur-md">
        <Activity className="w-3 h-3 text-emerald-400" />
        <span className="text-[10px] tracking-wide">{latencyMs}ms LATENCY</span>
      </div>
    </div>
  );
};
