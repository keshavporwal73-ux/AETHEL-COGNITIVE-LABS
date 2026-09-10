import React from 'react';
import { ParallaxLogo } from '@/components/common/ParallaxLogo';
import { AIModel } from '@/types/parallax';
import { getModelById } from '@/services/modelCatalog';
import { Check, Loader2, Sparkles, Cpu } from 'lucide-react';

interface MultiModelLoadingStateProps {
  modelIds: string[];
  mode?: string;
}

export const MultiModelLoadingState: React.FC<MultiModelLoadingStateProps> = ({
  modelIds,
  mode = 'compare'
}) => {
  const models = modelIds.map(id => getModelById(id)).filter(Boolean) as AIModel[];

  return (
    <div className="w-full my-6 p-6 md:p-8 rounded-2xl border border-border bg-card/80 backdrop-blur-md text-center space-y-6">
      <div className="flex flex-col items-center justify-center space-y-3">
        <ParallaxLogo size={44} isAnimated={true} variant="accent" />
        <div className="space-y-1">
          <div className="font-serif tracking-widest text-sm font-bold uppercase text-foreground">
            PARALLAX IS THINKING
          </div>
          <p className="text-xs text-muted-foreground font-mono">
            Orchestrating {models.length} independent AI architectures in parallel...
          </p>
        </div>
      </div>

      {/* Progressive Model Checkpoints */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5 max-w-2xl mx-auto text-left text-xs">
        {models.map((model, idx) => (
          <div 
            key={model.id} 
            className="p-3 rounded-lg border border-border bg-muted/20 flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <span 
                className="w-2 h-2 rounded-full" 
                style={{ backgroundColor: model.accentColor || 'hsl(var(--accent))' }}
              />
              <div>
                <div className="font-medium text-foreground">{model.name}</div>
                <div className="text-[10px] text-muted-foreground">{model.provider}</div>
              </div>
            </div>

            {idx === 0 ? (
              <span className="flex items-center gap-1 text-[10px] font-mono text-emerald-500">
                <Check className="w-3 h-3" /> Responding
              </span>
            ) : idx === 1 ? (
              <span className="flex items-center gap-1 text-[10px] font-mono text-blue-500">
                <Loader2 className="w-3 h-3 animate-spin" /> Thinking
              </span>
            ) : (
              <span className="text-[10px] font-mono text-muted-foreground opacity-60">
                Waiting...
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Synthesis Flow Arrow */}
      <div className="flex items-center justify-center gap-2 text-[11px] font-mono text-muted-foreground">
        <span>Responses Collected</span>
        <span>→</span>
        <span className="text-accent font-medium">Cross-Model Analysis</span>
        <span>→</span>
        <span className="text-foreground font-medium">Synthesis Engine</span>
      </div>
    </div>
  );
};
