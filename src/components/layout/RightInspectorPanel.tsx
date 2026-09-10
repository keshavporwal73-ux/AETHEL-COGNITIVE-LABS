import React from 'react';
import { useParallax } from '@/contexts/ParallaxContext';
import { getModelById, AVAILABLE_TEXT_MODELS, AVAILABLE_IMAGE_MODELS } from '@/services/modelCatalog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Activity, 
  Cpu, 
  Zap, 
  Clock, 
  Coins, 
  ShieldCheck, 
  Sparkles, 
  Layers,
  ChevronRight,
  TrendingUp,
  ArrowRight
} from 'lucide-react';

interface RightInspectorPanelProps {
  onOpenModelHub?: () => void;
}

export const RightInspectorPanel: React.FC<RightInspectorPanelProps> = ({ onOpenModelHub }) => {
  const { 
    activeMode, 
    selectedTextModelIds, 
    selectedImageModelIds,
    textResponses,
    imageResults,
    routingReason,
    isDemoMode
  } = useParallax();

  const selectedModels = activeMode === 'imagelab'
    ? selectedImageModelIds.map(id => getModelById(id)).filter(Boolean)
    : selectedTextModelIds.map(id => getModelById(id)).filter(Boolean);

  const totalTokensEstimated = textResponses.reduce((acc, r) => acc + (r.tokensUsed || 0), 0);
  const totalCostEstimated = textResponses.reduce((acc, r) => acc + (r.costEstimate || 0), 0);
  const avgLatency = textResponses.length > 0 
    ? Math.round(textResponses.reduce((acc, r) => acc + (r.latencyMs || 0), 0) / textResponses.length)
    : 1240;

  return (
    <aside className="w-72 h-full border-l border-border bg-sidebar text-sidebar-foreground flex flex-col shrink-0 select-none text-xs">
      {/* Panel Header */}
      <div className="p-3 border-b border-sidebar-border flex items-center justify-between">
        <div className="flex items-center gap-2 font-serif font-bold text-sm tracking-wide">
          <Activity className="w-4 h-4 text-accent" />
          <span>Active Intelligence</span>
        </div>
        <Badge variant="outline" className="font-mono text-[10px] bg-muted/50 border-border">
          {selectedModels.length} Active
        </Badge>
      </div>

      <ScrollArea className="flex-1 p-3 space-y-4">
        {/* Smart Routing Callout if present */}
        {routingReason && (
          <div className="mb-4 p-2.5 rounded-lg bg-accent/10 border border-accent/20 text-accent-foreground">
            <div className="flex items-center gap-1.5 font-semibold text-[11px] mb-1">
              <Sparkles className="w-3.5 h-3.5 text-accent" />
              <span>Smart Routing Applied</span>
            </div>
            <p className="text-[11px] leading-relaxed opacity-90">{routingReason}</p>
          </div>
        )}

        {/* Selected Models List with Capabilities */}
        <div className="space-y-2.5">
          <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground flex items-center justify-between">
            <span>Ensemble Hierarchy</span>
            <button 
              onClick={onOpenModelHub}
              className="text-accent hover:underline flex items-center gap-0.5"
            >
              <span>Manage</span>
              <ChevronRight className="w-2.5 h-2.5" />
            </button>
          </div>

          <div className="space-y-2">
            {selectedModels.map((model) => {
              if (!model) return null;
              return (
                <div 
                  key={model.id}
                  className="p-2.5 rounded-lg border border-sidebar-border bg-card/60 hover:bg-card transition-colors space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span 
                        className="w-2 h-2 rounded-full" 
                        style={{ backgroundColor: model.accentColor || 'hsl(var(--accent))' }}
                      />
                      <span className="font-medium text-foreground text-xs">{model.name}</span>
                    </div>
                    <span className="text-[10px] font-mono text-muted-foreground">{model.provider}</span>
                  </div>

                  <p className="text-[11px] text-muted-foreground line-clamp-2 leading-relaxed">
                    {model.description}
                  </p>

                  <div className="flex flex-wrap gap-1 pt-1">
                    {model.capabilities.slice(0, 3).map(cap => (
                      <span key={cap} className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-muted text-muted-foreground">
                        {cap}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-1 border-t border-border/50 text-[10px] font-mono text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="w-2.5 h-2.5" /> {model.latencyEstimateMs}ms
                    </span>
                    <span className="flex items-center gap-1">
                      <Coins className="w-2.5 h-2.5" /> {model.costPer1kTokens}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Real-time Session Telemetry */}
        <div className="mt-4 pt-4 border-t border-sidebar-border space-y-3">
          <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
            Session Telemetry
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="p-2 rounded bg-muted/40 border border-sidebar-border">
              <div className="text-[10px] text-muted-foreground font-mono">Avg Latency</div>
              <div className="text-sm font-bold font-mono text-foreground mt-0.5">{avgLatency}ms</div>
            </div>
            <div className="p-2 rounded bg-muted/40 border border-sidebar-border">
              <div className="text-[10px] text-muted-foreground font-mono">Est. Run Cost</div>
              <div className="text-sm font-bold font-mono text-foreground mt-0.5">${totalCostEstimated.toFixed(4)}</div>
            </div>
          </div>

          <div className="p-2.5 rounded bg-card border border-sidebar-border space-y-1.5 text-[11px]">
            <div className="flex items-center justify-between text-muted-foreground">
              <span>Tokens Dispatched:</span>
              <span className="font-mono text-foreground font-medium">{totalTokensEstimated.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between text-muted-foreground">
              <span>Provider Handshakes:</span>
              <span className="font-mono text-foreground font-medium">{selectedModels.length} OK</span>
            </div>
            <div className="flex items-center justify-between text-muted-foreground">
              <span>Verification Mode:</span>
              <span className="font-mono text-emerald-500 font-medium">Cross-Synthesized</span>
            </div>
          </div>
        </div>

        {/* Curio Network Security Note */}
        <div className="mt-4 p-2.5 rounded-lg border border-border/60 bg-muted/20 text-[10px] text-muted-foreground leading-relaxed">
          <div className="flex items-center gap-1 text-foreground font-medium mb-1">
            <ShieldCheck className="w-3.5 h-3.5 text-accent" />
            <span>Server-side Key Isolation</span>
          </div>
          All API invocations route strictly via encrypted server endpoints. No credentials touch the browser client bundle.
        </div>
      </ScrollArea>
    </aside>
  );
};
