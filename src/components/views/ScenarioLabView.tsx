import React from 'react';
import { useParallax } from '@/contexts/ParallaxContext';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Compass, 
  Sparkles, 
  Play, 
  RotateCcw, 
  ArrowRight,
  Zap,
  TrendingUp,
  Cpu
} from 'lucide-react';

export const ScenarioLabView: React.FC = () => {
  const { 
    scenarioLabData, 
    updateScenarioVariableValue, 
    applyScenarioPreset,
    runPrompt, 
    isGenerating,
    goToStage
  } = useParallax();

  if (!scenarioLabData) {
    return (
      <div className="p-8 text-center border border-dashed border-border rounded-xl">
        <Compass className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-40" />
        <h3 className="font-serif text-lg font-bold mb-2">No Scenario Lab Active</h3>
        <p className="text-sm text-muted-foreground max-w-md mx-auto mb-4">
          Simulate what-if conditions by adjusting operational assumptions, query volumes, cost constraints, and regulatory strictness in real time.
        </p>
        <Button onClick={() => runPrompt()} disabled={isGenerating}>
          <Sparkles className="w-4 h-4 mr-2" />
          Initialize Scenario Lab
        </Button>
      </div>
    );
  }

  const outcome = scenarioLabData.calculatedOutcome;

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-300">
      {/* Header */}
      <div className="p-4 rounded-xl bg-card border border-border flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="outline" className="font-mono text-xs uppercase bg-primary/10 text-primary border-primary/30">
              Interactive What-If Simulation
            </Badge>
            <span className="text-xs text-muted-foreground">Dynamic Assumption Re-Evaluation</span>
          </div>
          <h2 className="font-serif text-xl md:text-2xl font-bold tracking-tight text-foreground">
            Scenario Lab: {scenarioLabData.activeScenarioName}
          </h2>
          <p className="text-sm text-muted-foreground mt-1 max-w-2xl">
            {scenarioLabData.baselineOutcome}
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => goToStage('decide')}
            className="hidden md:flex items-center gap-1.5 text-xs"
          >
            <span>View Decision Matrix</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>

      {/* Preset Scenarios */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <span className="text-xs font-mono text-muted-foreground whitespace-nowrap">Load Preset Scenario:</span>
        {scenarioLabData.savedScenarios.map(preset => (
          <Button
            key={preset.name}
            variant={scenarioLabData.activeScenarioName === preset.name ? 'default' : 'outline'}
            size="sm"
            onClick={() => applyScenarioPreset(preset.name)}
            className="h-7 text-xs whitespace-nowrap"
          >
            <Zap className="w-3 h-3 mr-1.5 text-amber-400" />
            {preset.name}
          </Button>
        ))}
      </div>

      {/* 2-Column: Variable Sliders on Left, Live Outcome on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Sliders (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          <Card className="border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-serif">Environmental Variables & Controls</CardTitle>
              <CardDescription className="text-xs">
                Move sliders to simulate external shocks, budget shifts, and scale jumps.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              {scenarioLabData.variables.map(variable => (
                <div key={variable.id} className="space-y-2 p-3.5 rounded-xl bg-muted/20 border border-border">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-foreground">{variable.name}</span>
                    <span className="font-mono font-bold text-primary">
                      {variable.currentValue} {variable.unit}
                    </span>
                  </div>

                  <input
                    type="range"
                    min={variable.min}
                    max={variable.max}
                    value={variable.currentValue}
                    onChange={(e) => updateScenarioVariableValue(variable.id, Number(e.target.value))}
                    className="w-full accent-primary cursor-pointer h-2 bg-muted rounded-lg"
                  />

                  <div className="flex justify-between items-center text-[10px] font-mono text-muted-foreground">
                    <span>Min: {variable.min} {variable.unit}</span>
                    <span>Max: {variable.max} {variable.unit}</span>
                  </div>

                  {variable.presets && (
                    <div className="flex gap-1.5 pt-1">
                      {variable.presets.map(p => (
                        <Button
                          key={p.label}
                          variant="ghost"
                          size="sm"
                          onClick={() => updateScenarioVariableValue(variable.id, p.value)}
                          className="h-6 text-[10px] px-2 font-mono bg-background/60 hover:bg-background"
                        >
                          {p.label}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Live Re-calculated Outcome (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <Card className="border-primary/50 bg-card shadow-lg sticky top-20">
            <CardHeader className="pb-3 border-b border-border bg-primary/5">
              <div className="flex items-center justify-between">
                <Badge className="bg-primary text-primary-foreground font-mono text-[10px]">
                  Real-time Simulation
                </Badge>
                <span className="text-xs font-mono text-primary font-bold">
                  {outcome.confidenceScore}% Confidence
                </span>
              </div>
              <CardTitle className="text-base font-serif font-bold mt-2">
                Leading Recommendation:
              </CardTitle>
              <div className="text-sm font-semibold text-primary">
                {outcome.leadingOption}
              </div>
            </CardHeader>

            <CardContent className="space-y-4 pt-4 text-xs">
              <p className="text-muted-foreground">
                {outcome.description}
              </p>

              <div>
                <strong className="text-foreground block mb-1.5 font-mono text-[11px] uppercase tracking-wider">
                  Key Strategic Consequences:
                </strong>
                <ul className="space-y-1.5">
                  {outcome.keyConsequences.map((c, idx) => (
                    <li key={idx} className="flex items-start gap-2 p-2 rounded bg-muted/30 border border-border/50 text-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-1.5" />
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-3 rounded-lg bg-black/20 border border-border/60 font-mono text-[11px]">
                <strong className="text-primary block mb-0.5">Model Consensus Shift:</strong>
                <p className="text-muted-foreground">{outcome.modelConsensusShift}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
