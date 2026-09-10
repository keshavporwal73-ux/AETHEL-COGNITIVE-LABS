import React, { useState } from 'react';
import { useParallax } from '@/contexts/ParallaxContext';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  HelpCircle, 
  AlertCircle, 
  ShieldAlert, 
  Search, 
  ArrowRight, 
  Sparkles,
  ExternalLink,
  Cpu
} from 'lucide-react';
import { UncertaintyItem } from '@/types/parallax';

export const UncertaintyMapView: React.FC = () => {
  const { uncertaintyMapData, runPrompt, isGenerating, goToStage } = useParallax();
  const [selectedSeverity, setSelectedSeverity] = useState<string>('all');

  if (!uncertaintyMapData) {
    return (
      <div className="p-8 text-center border border-dashed border-border rounded-xl">
        <HelpCircle className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-40" />
        <h3 className="font-serif text-lg font-bold mb-2">No Uncertainty Map Generated</h3>
        <p className="text-sm text-muted-foreground max-w-md mx-auto mb-4">
          Identify empirical unknowns, model divergences, weak evidence, and fragile assumptions across your active inquiry.
        </p>
        <Button onClick={() => runPrompt()} disabled={isGenerating}>
          <Sparkles className="w-4 h-4 mr-2" />
          Map Epistemic Uncertainty
        </Button>
      </div>
    );
  }

  const filteredItems = selectedSeverity === 'all'
    ? uncertaintyMapData.items
    : uncertaintyMapData.items.filter(i => i.severity.toLowerCase() === selectedSeverity.toLowerCase());

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-300">
      {/* Header Assessment */}
      <div className="p-4 rounded-xl bg-card border border-border flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="outline" className="font-mono text-xs uppercase bg-amber-500/10 text-amber-400 border-amber-500/30">
              Epistemic Uncertainty Audit
            </Badge>
            <span className="text-xs text-muted-foreground">Weak Evidence & Fragile Assumptions</span>
          </div>
          <h2 className="font-serif text-xl md:text-2xl font-bold tracking-tight text-foreground">
            Overall Uncertainty: {uncertaintyMapData.overallUncertaintyLevel}
          </h2>
          <p className="text-sm text-muted-foreground mt-1 max-w-2xl">
            {uncertaintyMapData.mitigationStrategy}
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="text-right px-3 py-1.5 rounded-lg bg-muted/40 border border-border">
            <span className="text-xs font-mono text-muted-foreground block">Certainty Composite</span>
            <span className="text-base font-bold font-mono text-primary">{uncertaintyMapData.compositeScore} / 100</span>
          </div>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => goToStage('stress-test')}
            className="hidden md:flex items-center gap-1.5 text-xs"
          >
            <span>Stress Test Assumptions</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>

      {/* Severity Filter */}
      <div className="flex items-center gap-2">
        <span className="text-xs font-mono text-muted-foreground">Filter by Severity:</span>
        {(['all', 'high', 'medium', 'low'] as const).map(sev => (
          <Button
            key={sev}
            variant={selectedSeverity === sev ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setSelectedSeverity(sev)}
            className="h-7 text-xs uppercase font-mono"
          >
            {sev}
          </Button>
        ))}
      </div>

      {/* Uncertainty Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredItems.map(item => (
          <Card key={item.id} className="border-border flex flex-col justify-between">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <Badge variant={item.severity === 'High' ? 'destructive' : 'outline'} className="font-mono text-[10px]">
                  {item.severity} Severity
                </Badge>
                <Badge variant="secondary" className="font-mono text-[10px]">
                  {item.uncertaintyType}
                </Badge>
                <span className="text-[10px] font-mono text-muted-foreground ml-auto">
                  Scope: {item.scope}
                </span>
              </div>
              <CardTitle className="text-base font-serif font-bold">
                {item.area}
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-3 text-xs">
              <div>
                <strong className="text-muted-foreground block mb-1">Affected Conclusions & Claims:</strong>
                <ul className="list-disc list-inside space-y-0.5 text-foreground/90">
                  {item.affectedClaims.map((claim, idx) => (
                    <li key={idx} className="line-clamp-1">{claim}</li>
                  ))}
                </ul>
              </div>

              {/* Model Acknowledgments */}
              <div className="p-2.5 rounded bg-muted/30 border border-border/60 space-y-1.5">
                <span className="font-semibold text-muted-foreground block font-mono text-[11px]">
                  Model Divergence & Disclaimers:
                </span>
                {item.modelPositions.map((pos, pIdx) => (
                  <div key={pIdx} className="flex items-start gap-1.5">
                    <Badge variant="outline" className="font-mono text-[9px] shrink-0 mt-0.5">
                      <Cpu className="w-2.5 h-2.5 mr-1" />
                      {pos.model}
                    </Badge>
                    <span className="text-muted-foreground">{pos.acknowledgment}</span>
                  </div>
                ))}
              </div>

              {/* Recommended Investigation */}
              <div className="p-2.5 rounded bg-primary/5 border border-primary/20 text-foreground">
                <strong className="text-primary block mb-0.5">Recommended Empirical Verification:</strong>
                <p className="text-muted-foreground">{item.recommendedInvestigation}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
