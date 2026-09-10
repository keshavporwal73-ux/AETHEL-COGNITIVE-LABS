import React from 'react';
import { useParallax } from '@/contexts/ParallaxContext';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  CheckSquare, 
  AlertTriangle, 
  Sparkles, 
  ArrowRight, 
  Activity,
  CheckCircle2,
  XCircle,
  HelpCircle
} from 'lucide-react';

export const AssumptionAuditView: React.FC = () => {
  const { assumptionAuditReport, updateAssumptionStatus, runPrompt, isGenerating, goToStage } = useParallax();

  if (!assumptionAuditReport) {
    return (
      <div className="p-8 text-center border border-dashed border-border rounded-xl">
        <CheckSquare className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-40" />
        <h3 className="font-serif text-lg font-bold mb-2">No Assumption Audit Available</h3>
        <p className="text-sm text-muted-foreground max-w-md mx-auto mb-4">
          Expose the hidden foundational assumptions behind major model conclusions, and test their fragility under real-world stress.
        </p>
        <Button onClick={() => runPrompt()} disabled={isGenerating}>
          <Sparkles className="w-4 h-4 mr-2" />
          Audit Assumptions
        </Button>
      </div>
    );
  }

  const getStatusBadge = (status: 'Accepted' | 'Contested' | 'Requires Investigation') => {
    switch (status) {
      case 'Accepted': return <Badge className="bg-emerald-600/20 text-emerald-300 border-emerald-500/30 font-mono text-[10px]">Accepted Premise</Badge>;
      case 'Contested': return <Badge variant="destructive" className="font-mono text-[10px]">Contested Assumption</Badge>;
      case 'Requires Investigation': return <Badge className="bg-amber-600/20 text-amber-300 border-amber-500/30 font-mono text-[10px]">Requires Proof</Badge>;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-300">
      {/* Overview */}
      <div className="p-4 rounded-xl bg-card border border-border flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="outline" className="font-mono text-xs uppercase bg-amber-500/10 text-amber-400 border-amber-500/30">
              Assumption Audit Matrix
            </Badge>
            <span className="text-xs text-muted-foreground">Fragility & Sensitivity Testing</span>
          </div>
          <h2 className="font-serif text-xl md:text-2xl font-bold tracking-tight text-foreground">
            {assumptionAuditReport.assumptions.length} Core Hypotheses Audited
          </h2>
          <p className="text-sm text-muted-foreground mt-1 max-w-2xl">
            {assumptionAuditReport.auditSummary}
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="text-right px-3 py-1.5 rounded-lg bg-muted/40 border border-border">
            <span className="text-xs font-mono text-muted-foreground block">Fragility Index</span>
            <span className="text-base font-bold font-mono text-amber-400">{assumptionAuditReport.compositeFragilityScore} / 100</span>
          </div>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => goToStage('decide')}
            className="hidden md:flex items-center gap-1.5 text-xs"
          >
            <span>Proceed to Decision Lab</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>

      {/* Assumptions List */}
      <div className="grid grid-cols-1 gap-4">
        {assumptionAuditReport.assumptions.map(asm => (
          <Card key={asm.id} className="border-border">
            <CardHeader className="pb-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  {getStatusBadge(asm.status)}
                  <Badge variant="secondary" className="font-mono text-[10px]">
                    {asm.category}
                  </Badge>
                </div>
                
                {/* Interactive Status Toggles */}
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-mono text-muted-foreground mr-1">Mark:</span>
                  <Button
                    variant={asm.status === 'Accepted' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => updateAssumptionStatus(asm.id, 'Accepted')}
                    className="h-6 text-[11px] px-2"
                  >
                    <CheckCircle2 className="w-3 h-3 mr-1" />
                    Accept
                  </Button>
                  <Button
                    variant={asm.status === 'Contested' ? 'destructive' : 'outline'}
                    size="sm"
                    onClick={() => updateAssumptionStatus(asm.id, 'Contested')}
                    className="h-6 text-[11px] px-2"
                  >
                    <XCircle className="w-3 h-3 mr-1" />
                    Contest
                  </Button>
                  <Button
                    variant={asm.status === 'Requires Investigation' ? 'secondary' : 'outline'}
                    size="sm"
                    onClick={() => updateAssumptionStatus(asm.id, 'Requires Investigation')}
                    className="h-6 text-[11px] px-2"
                  >
                    <HelpCircle className="w-3 h-3 mr-1" />
                    Probe
                  </Button>
                </div>
              </div>

              <CardTitle className="text-base font-serif font-bold mt-2">
                "{asm.statement}"
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-3 text-xs">
              {/* Fragility & Sensitivity Meters */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 rounded-lg bg-muted/20 border border-border">
                <div>
                  <div className="flex justify-between text-[11px] font-mono mb-1">
                    <span className="text-muted-foreground">Fragility (Ease of breaking):</span>
                    <span className={`font-bold ${asm.fragilityScore > 60 ? 'text-rose-400' : 'text-emerald-400'}`}>{asm.fragilityScore}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${asm.fragilityScore > 60 ? 'bg-rose-500' : 'bg-emerald-500'}`} 
                      style={{ width: `${asm.fragilityScore}%` }} 
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[11px] font-mono mb-1">
                    <span className="text-muted-foreground">Sensitivity (Conclusion impact):</span>
                    <span className="font-bold text-primary">{asm.sensitivityScore}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: `${asm.sensitivityScore}%` }} />
                  </div>
                </div>
              </div>

              <p className="text-muted-foreground">
                <strong className="text-foreground">Vulnerability Analysis:</strong> {asm.vulnerabilityExplanation}
              </p>

              <div className="p-2.5 rounded bg-black/20 border border-border/50 text-foreground font-mono text-[11px]">
                <strong className="text-primary block mb-0.5">Stress-Test Condition:</strong>
                <p className="text-muted-foreground">{asm.stressTestCondition}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
