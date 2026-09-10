import React, { useState } from 'react';
import { useParallax } from '@/contexts/ParallaxContext';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  AVAILABLE_TEXT_MODELS, 
  AVAILABLE_IMAGE_MODELS 
} from '@/services/modelCatalog';
import { 
  Cpu, 
  Check, 
  Clock, 
  Coins, 
  ShieldCheck, 
  Zap, 
  Sparkles, 
  Layers, 
  KeyRound,
  ExternalLink 
} from 'lucide-react';
import { toast } from 'sonner';

interface ModelHubModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ModelHubModal: React.FC<ModelHubModalProps> = ({ open, onOpenChange }) => {
  const { 
    selectedTextModelIds, 
    toggleTextModel, 
    selectedImageModelIds, 
    toggleImageModel,
    isDemoMode,
    setIsDemoMode
  } = useParallax();

  const [providerTab, setProviderTab] = useState<'text' | 'image' | 'providers'>('text');

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[calc(100%-2rem)] md:max-w-4xl max-h-[88dvh] overflow-y-auto bg-card border-border p-4 md:p-6">
        <DialogHeader className="space-y-1">
          <div className="flex items-center gap-2">
            <Cpu className="w-5 h-5 text-accent" />
            <DialogTitle className="font-serif text-lg md:text-xl font-bold">
              PARALLAX Model Intelligence Hub
            </DialogTitle>
          </div>
          <DialogDescription className="text-xs md:text-sm text-muted-foreground">
            Configure participating foundation models and generative engines. PARALLAX dispatches simultaneous requests and synthesizes cross-model intelligence.
          </DialogDescription>
        </DialogHeader>

        <Tabs value={providerTab} onValueChange={(v) => setProviderTab(v as any)} className="w-full mt-2">
          <TabsList className="grid grid-cols-3 w-full bg-muted/60 p-1 mb-4">
            <TabsTrigger value="text" className="text-xs">
              Reasoning & Text ({selectedTextModelIds.length}/{AVAILABLE_TEXT_MODELS.length})
            </TabsTrigger>
            <TabsTrigger value="image" className="text-xs">
              Visual & Image Lab ({selectedImageModelIds.length}/{AVAILABLE_IMAGE_MODELS.length})
            </TabsTrigger>
            <TabsTrigger value="providers" className="text-xs">
              Provider Abstraction & Keys
            </TabsTrigger>
          </TabsList>

          {/* Text Models Tab */}
          <TabsContent value="text" className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {AVAILABLE_TEXT_MODELS.map((model) => {
                const isSelected = selectedTextModelIds.includes(model.id);
                return (
                  <div
                    key={model.id}
                    onClick={() => toggleTextModel(model.id)}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected 
                        ? 'border-accent/80 bg-accent/5 shadow-sm' 
                        : 'border-border bg-card hover:border-border/80 opacity-75'
                    }`}
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-1.5">
                        <div className="flex items-center gap-2">
                          <span 
                            className="w-2.5 h-2.5 rounded-full" 
                            style={{ backgroundColor: model.accentColor || 'hsl(var(--accent))' }}
                          />
                          <div>
                            <div className="font-semibold text-xs md:text-sm text-foreground">
                              {model.name}
                            </div>
                            <div className="text-[10px] font-mono text-muted-foreground">
                              {model.provider} · v{model.version}
                            </div>
                          </div>
                        </div>

                        <div className={`w-5 h-5 rounded flex items-center justify-center border ${
                          isSelected ? 'bg-primary text-primary-foreground border-primary' : 'border-border'
                        }`}>
                          {isSelected && <Check className="w-3 h-3" />}
                        </div>
                      </div>

                      <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                        {model.description}
                      </p>

                      <div className="flex flex-wrap gap-1 mb-3">
                        {model.capabilities.map(cap => (
                          <span key={cap} className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-muted text-muted-foreground border border-border/40">
                            {cap}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-2.5 border-t border-border/60 flex items-center justify-between text-[11px] font-mono text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {model.latencyEstimateMs}ms
                      </span>
                      <span className="flex items-center gap-1">
                        <Coins className="w-3 h-3" /> {model.costPer1kTokens}
                      </span>
                      <span>{model.contextWindow}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </TabsContent>

          {/* Image Models Tab */}
          <TabsContent value="image" className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {AVAILABLE_IMAGE_MODELS.map((model) => {
                const isSelected = selectedImageModelIds.includes(model.id);
                return (
                  <div
                    key={model.id}
                    onClick={() => toggleImageModel(model.id)}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected 
                        ? 'border-accent/80 bg-accent/5 shadow-sm' 
                        : 'border-border bg-card hover:border-border/80 opacity-75'
                    }`}
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-1.5">
                        <div className="flex items-center gap-2">
                          <span 
                            className="w-2.5 h-2.5 rounded-full" 
                            style={{ backgroundColor: model.accentColor || 'hsl(var(--accent))' }}
                          />
                          <div>
                            <div className="font-semibold text-xs md:text-sm text-foreground">
                              {model.name}
                            </div>
                            <div className="text-[10px] font-mono text-muted-foreground">
                              {model.provider} · v{model.version}
                            </div>
                          </div>
                        </div>

                        <div className={`w-5 h-5 rounded flex items-center justify-center border ${
                          isSelected ? 'bg-primary text-primary-foreground border-primary' : 'border-border'
                        }`}>
                          {isSelected && <Check className="w-3 h-3" />}
                        </div>
                      </div>

                      <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                        {model.description}
                      </p>

                      <div className="flex flex-wrap gap-1 mb-3">
                        {model.capabilities.map(cap => (
                          <span key={cap} className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-muted text-muted-foreground border border-border/40">
                            {cap}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-2.5 border-t border-border/60 flex items-center justify-between text-[11px] font-mono text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {model.latencyEstimateMs}ms
                      </span>
                      <span className="flex items-center gap-1">
                        <Coins className="w-3 h-3" /> {model.costPer1kTokens}
                      </span>
                      <span className="text-accent font-medium">Generative Visual</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </TabsContent>

          {/* Providers & Key Architecture */}
          <TabsContent value="providers" className="space-y-4">
            <div className="p-4 rounded-xl border border-border bg-muted/20 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-sm">Server-Side Provider Abstraction Architecture</h4>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    PARALLAX connects directly to official foundation provider endpoints via server-side Edge Functions.
                  </p>
                </div>
                <Badge variant={isDemoMode ? 'outline' : 'default'} className="font-mono text-xs">
                  {isDemoMode ? 'DEMO SIMULATION' : 'LIVE API ACTIVE'}
                </Badge>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5 pt-2">
                {[
                  { name: 'OpenAI (GPT-4o, DALL·E)', status: 'Connected / Isolated', protocol: 'REST / SSE' },
                  { name: 'Anthropic (Claude 3.7)', status: 'Connected / Isolated', protocol: 'REST / SSE' },
                  { name: 'Google (Gemini 2.5 Pro)', status: 'Connected / Grounding', protocol: 'REST' },
                  { name: 'DeepSeek (R1 Thinking)', status: 'Connected / Verified', protocol: 'REST / CoT' },
                  { name: 'Kling AI (Omni-Image)', status: 'Connected / Visual', protocol: 'Async Polling' },
                  { name: 'Black Forest (Flux.1 Pro)', status: 'Connected / Flow', protocol: 'REST' },
                  { name: 'Meta AI (Llama 3.3)', status: 'Connected / Fast', protocol: 'REST' },
                  { name: 'Midjourney (v6.1)', status: 'Connected / Concept', protocol: 'REST' },
                ].map((prov) => (
                  <div key={prov.name} className="p-2.5 rounded-lg border border-border bg-card text-xs space-y-1">
                    <div className="font-medium text-foreground">{prov.name}</div>
                    <div className="flex items-center justify-between text-[10px] font-mono text-muted-foreground">
                      <span>{prov.protocol}</span>
                      <span className="text-emerald-500">{prov.status}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-3 rounded-lg bg-background border border-border flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span className="text-xs text-muted-foreground">
                    Zero client credential leakage: All API keys are securely stored server-side in Supabase Vault.
                  </span>
                </div>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => {
                    setIsDemoMode(!isDemoMode);
                    toast.success(isDemoMode ? 'Switched to Live API gateway mode' : 'Switched to Demo simulated mode');
                  }}
                  className="text-xs h-7"
                >
                  Toggle Demo/Live
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter className="pt-3 border-t border-border flex sm:justify-between items-center gap-2">
          <div className="text-xs text-muted-foreground font-mono">
            {selectedTextModelIds.length} Text + {selectedImageModelIds.length} Image engines selected
          </div>
          <Button onClick={() => onOpenChange(false)} className="text-xs">
            Save & Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
