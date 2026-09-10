import React from 'react';
import { useParallax } from '@/contexts/ParallaxContext';
import { IntelligenceStage } from '@/types/parallax';
import { Badge } from '@/components/ui/badge';
import { 
  HelpCircle, 
  Search, 
  Swords, 
  Network, 
  ShieldAlert, 
  Sparkles, 
  SlidersHorizontal,
  ChevronRight
} from 'lucide-react';

const STAGES: {
  id: IntelligenceStage;
  num: number;
  label: string;
  sub: string;
  icon: React.ReactNode;
}[] = [
  { id: 'question', num: 1, label: 'Question', sub: 'Multi-Prompt', icon: <HelpCircle className="w-3.5 h-3.5" /> },
  { id: 'investigate', num: 2, label: 'Investigate', sub: 'Deep Research', icon: <Search className="w-3.5 h-3.5" /> },
  { id: 'cross-examine', num: 3, label: 'Cross-Examine', sub: 'Adversarial Debate', icon: <Swords className="w-3.5 h-3.5" /> },
  { id: 'map', num: 4, label: 'Map', sub: 'Evidence & Conflicts', icon: <Network className="w-3.5 h-3.5" /> },
  { id: 'stress-test', num: 5, label: 'Stress-Test', sub: 'Red Team Attack', icon: <ShieldAlert className="w-3.5 h-3.5" /> },
  { id: 'synthesize', num: 6, label: 'Synthesize', sub: 'Consensus Verdict', icon: <Sparkles className="w-3.5 h-3.5" /> },
  { id: 'decide', num: 7, label: 'Decide', sub: 'Weighted Matrix', icon: <SlidersHorizontal className="w-3.5 h-3.5" /> },
];

export const WorkflowStepper: React.FC = () => {
  const { currentWorkflowStage, goToStage } = useParallax();

  return (
    <div className="w-full bg-card/60 backdrop-blur border-b border-border py-2 px-4 md:px-8 overflow-x-auto select-none">
      <div className="max-w-6xl mx-auto flex items-center justify-between min-w-[700px] gap-1">
        {STAGES.map((st, idx) => {
          const isActive = currentWorkflowStage === st.id;
          const isPast = STAGES.findIndex(s => s.id === currentWorkflowStage) > idx;

          return (
            <React.Fragment key={st.id}>
              <button
                onClick={() => goToStage(st.id)}
                className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-left transition-all group ${
                  isActive 
                    ? 'bg-primary text-primary-foreground shadow-sm scale-105' 
                    : isPast 
                      ? 'bg-muted/40 text-foreground hover:bg-muted/70' 
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/30'
                }`}
              >
                <div className={`w-5 h-5 rounded-full flex items-center justify-center font-mono text-[10px] font-bold shrink-0 ${
                  isActive 
                    ? 'bg-primary-foreground text-primary' 
                    : isPast
                      ? 'bg-emerald-500/20 text-emerald-400'
                      : 'bg-muted text-muted-foreground'
                }`}>
                  {st.num}
                </div>

                <div className="leading-none">
                  <span className="text-xs font-semibold block tracking-tight">
                    {st.label}
                  </span>
                  <span className={`text-[9px] font-mono ${isActive ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>
                    {st.sub}
                  </span>
                </div>
              </button>

              {idx < STAGES.length - 1 && (
                <ChevronRight className={`w-3.5 h-3.5 shrink-0 ${isPast ? 'text-emerald-500/60' : 'text-muted-foreground/40'}`} />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
