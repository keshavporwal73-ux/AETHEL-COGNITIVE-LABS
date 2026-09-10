import React from 'react';
import { useParallax } from '@/contexts/ParallaxContext';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  ShieldAlert, 
  AlertTriangle, 
  Sparkles, 
  ArrowRight, 
  Flame, 
  CheckCircle2, 
  XOctagon,
  Cpu
} from 'lucide-react';

export const RedTeamView: React.FC = () => {
  const { redTeamDossier, runPrompt, isGenerating, goToStage } = useParallax();

  if (!redTeamDossier) {
    return (
      <div className="p-8 text-center border border-dashed border-border rounded-xl">
        <ShieldAlert className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-40" />
        <h3 className="font-serif text-lg font-bold mb-2">No Red Team Dossier Generated</h3>
        <p className="text-sm text-muted-foreground max-w-md mx-auto mb-4">
          Deploy adversarial AI models to attack consensus conclusions, generate counter-theses, simulate failure modes, and establish falsification criteria.
        </p>
        <Button onClick={() => runPrompt()} disabled={isGenerating}>
          <Sparkles className="w-4 h-4 mr-2" />
          Deploy Red Team
        </Button>
      </div>
    );
  }

  const getVerdictBadge = (verdict: string) => {
    switch (verdict) {
      case 'Robust': return <Badge className="bg-emerald-600/20 text-emerald-300 border-emerald-500/30 font-mono text-xs">Robust Consensus</Badge>;
      case 'Resilient with Caveats': return <Badge className="bg-amber-600/20 text-amber-300 border-amber-500/30 font-mono text-xs">Resilient with Caveats</Badge>;
      default: return <Badge variant="destructive" className="font-mono text-xs">Vulnerable to Disruption</Badge>;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-300">
      {/* Header Assessment */}
      <div className="p-4 rounded-xl bg-card border border-border flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="outline" className="font-mono text-xs uppercase bg-rose-500/10 text-rose-400 border-rose-500/30">
              Stage 5: Adversarial Red-Teaming
            </Badge>
            <span className="text-xs text-muted-foreground">Falsification & Worst-Case Stress Testing</span>
          </div>
          <h2 className="font-serif text-xl md:text-2xl font-bold tracking-tight text-foreground">
            Adversarial Verdict: {getVerdictBadge(redTeamDossier.adversarialVerdict)}
          </h2>
          <p className="text-sm text-muted-foreground mt-1 max-w-2xl">
            <strong className="text-foreground">Attacking Consensus:</strong> "{redTeamDossier.consensusAttacked}"
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="text-right px-3 py-1.5 rounded-lg bg-muted/40 border border-border">
            <span className="text-xs font-mono text-muted-foreground block">Resilience Index</span>
            <span className="text-base font-bold font-mono text-amber-400">{redTeamDossier.stressTestScore} / 100</span>
          </div>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => goToStage('synthesize')}
            className="hidden md:flex items-center gap-1.5 text-xs"
          >
            <span>Proceed to Synthesis</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>

      {/* Worst-Case Scenario Callout */}
      <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-600/40 space-y-1 text-xs">
        <span className="font-bold text-rose-400 flex items-center gap-1.5 uppercase font-mono tracking-wider">
          <Flame className="w-4 h-4 text-rose-500" />
          Simulated Worst-Case Failure Mode
        </span>
        <p className="text-foreground/90 leading-relaxed">{redTeamDossier.worstCaseScenario}</p>
      </div>

      {/* Counter-Theses Grid */}
      <div className="space-y-3">
        <h3 className="font-serif text-lg font-bold">Adversarial Counter-Theses</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {redTeamDossier.counterTheses.map((ct, idx) => (
            <Card key={idx} className="border-border flex flex-col justify-between">
              <CardHeader className="pb-3">
                <Badge variant="outline" className="font-mono text-[10px] w-fit mb-1 bg-background">
                  <Cpu className="w-2.5 h-2.5 mr-1" />
                  {ct.adversarialModel}
                </Badge>
                <CardTitle className="text-sm font-serif font-bold leading-snug">
                  {ct.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-xs space-y-2 pt-0">
                <p className="text-muted-foreground">{ct.argument}</p>
                <div className="p-2 rounded bg-muted/30 border border-border/50 text-[11px] font-mono">
                  <strong className="text-foreground block mb-0.5">Evidence / Precedent:</strong>
                  <ul className="list-disc list-inside text-muted-foreground space-y-0.5">
                    {ct.evidenceCited.map((ev, eIdx) => <li key={eIdx}>{ev}</li>)}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Failure Modes & Falsification Criteria 2-Col */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Failure Modes */}
        <Card className="border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-serif">Structural Failure Modes</CardTitle>
            <CardDescription className="text-xs">Triggers and prescribed defenses</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-xs">
            {redTeamDossier.failureModes.map((fm, idx) => (
              <div key={idx} className="p-3 rounded-lg bg-muted/20 border border-border space-y-1.5">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-foreground">{fm.name}</span>
                  <Badge variant={fm.impact === 'Critical' ? 'destructive' : 'secondary'} className="font-mono text-[9px]">
                    {fm.impact} Impact
                  </Badge>
                </div>
                <p className="text-muted-foreground"><strong className="text-foreground">Trigger:</strong> {fm.triggerEvent}</p>
                <div className="p-2 rounded bg-emerald-950/20 border border-emerald-600/30 text-emerald-300 text-[11px]">
                  <strong>Defense Strategy:</strong> {fm.defenseStrategy}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Falsification Criteria */}
        <Card className="border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-serif">Karl Popper Falsification Criteria</CardTitle>
            <CardDescription className="text-xs">Precise empirical thresholds that would disprove the thesis</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-xs">
            {redTeamDossier.falsificationCriteria.map((fc, idx) => (
              <div key={idx} className="p-3 rounded-lg bg-muted/20 border border-border space-y-1.5">
                <span className="font-semibold text-primary block font-mono text-[11px]">
                  Test {idx + 1}: {fc.testCondition}
                </span>
                <p className="text-foreground"><strong className="text-muted-foreground">Metric Threshold:</strong> {fc.metricThreshold}</p>
                <p className="text-muted-foreground"><strong className="text-foreground">Observable Signal:</strong> {fc.observableSignal}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
