import React from 'react';
import { useParallax } from '@/contexts/ParallaxContext';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  EyeOff, 
  AlertOctagon, 
  Sparkles, 
  ArrowRight, 
  Lightbulb,
  Send,
  HelpCircle
} from 'lucide-react';

export const BlindSpotView: React.FC = () => {
  const { blindSpotReport, runPrompt, isGenerating, setCurrentPrompt, goToStage } = useParallax();

  if (!blindSpotReport) {
    return (
      <div className="p-8 text-center border border-dashed border-border rounded-xl">
        <EyeOff className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-40" />
        <h3 className="font-serif text-lg font-bold mb-2">No Blind-Spot Analysis Generated</h3>
        <p className="text-sm text-muted-foreground max-w-md mx-auto mb-4">
          Surface hidden variables, overlooked second-order consequences, and asymmetric tail risks that models missed.
        </p>
        <Button onClick={() => runPrompt()} disabled={isGenerating}>
          <Sparkles className="w-4 h-4 mr-2" />
          Detect Blind Spots
        </Button>
      </div>
    );
  }

  const handleRunSuggestedPrompt = (suggested: string) => {
    setCurrentPrompt(suggested);
    runPrompt(suggested);
  };

  const getImpactBadge = (impact: 'Catastrophic' | 'High' | 'Moderate') => {
    switch (impact) {
      case 'Catastrophic': return <Badge variant="destructive" className="font-mono text-[10px]">Catastrophic Impact</Badge>;
      case 'High': return <Badge variant="outline" className="font-mono text-[10px] text-rose-400 border-rose-500/40">High Impact</Badge>;
      case 'Moderate': return <Badge variant="secondary" className="font-mono text-[10px]">Moderate Impact</Badge>;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-300">
      {/* Header */}
      <div className="p-4 rounded-xl bg-card border border-border flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="outline" className="font-mono text-xs uppercase bg-purple-500/10 text-purple-400 border-purple-500/30">
              Blind-Spot Detection Engine
            </Badge>
            <span className="text-xs text-muted-foreground">What the Models Overlooked</span>
          </div>
          <h2 className="font-serif text-xl md:text-2xl font-bold tracking-tight text-foreground">
            Holistic Risk & Blind-Spot Assessment
          </h2>
          <p className="text-sm text-muted-foreground mt-1 max-w-2xl">
            {blindSpotReport.holisticAssessment}
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="text-right px-3 py-1.5 rounded-lg bg-muted/40 border border-border">
            <span className="text-xs font-mono text-muted-foreground block">Detection Confidence</span>
            <span className="text-base font-bold font-mono text-primary">{blindSpotReport.detectionConfidence}%</span>
          </div>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => goToStage('stress-test')}
            className="hidden md:flex items-center gap-1.5 text-xs"
          >
            <span>Proceed to Red Team</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>

      {/* Blind-Spot Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {blindSpotReport.blindSpots.map(spot => (
          <Card key={spot.id} className="border-border flex flex-col justify-between">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between gap-2 mb-1.5">
                {getImpactBadge(spot.potentialImpact)}
                <Badge variant="secondary" className="font-mono text-[10px]">
                  {spot.category}
                </Badge>
              </div>
              <CardTitle className="text-base font-serif font-bold">
                {spot.title}
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-3 text-xs">
              <div className="p-2.5 rounded bg-muted/30 border border-border/60">
                <strong className="text-foreground block mb-1">Why Models Missed This:</strong>
                <p className="text-muted-foreground">{spot.whyMissed}</p>
              </div>

              <div className="p-2.5 rounded bg-emerald-950/20 border border-emerald-600/30">
                <strong className="text-emerald-400 block mb-1">Recommended Remedy / Mitigation:</strong>
                <p className="text-muted-foreground">{spot.mitigationOrRemedy}</p>
              </div>
            </CardContent>

            <CardFooter className="pt-0 border-t border-border/40 p-3 bg-muted/10 flex items-center justify-between gap-2">
              <span className="text-[11px] text-muted-foreground font-mono truncate flex items-center gap-1">
                <Lightbulb className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                Suggested prompt probe available
              </span>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => handleRunSuggestedPrompt(spot.suggestedPrompt)}
                className="h-7 text-xs shrink-0"
              >
                <Send className="w-3 h-3 mr-1.5" />
                Probe Blind-Spot
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};
