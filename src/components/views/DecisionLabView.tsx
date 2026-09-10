import React, { useState } from 'react';
import { useParallax } from '@/contexts/ParallaxContext';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  SlidersHorizontal, 
  Sparkles, 
  Award, 
  Plus, 
  Trash2, 
  ArrowRight,
  TrendingUp,
  Cpu,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

export const DecisionLabView: React.FC = () => {
  const { 
    decisionLabData, 
    updateDecisionFactorWeight, 
    addDecisionOption, 
    removeDecisionOption,
    runPrompt, 
    isGenerating,
    goToStage
  } = useParallax();

  const [newOptionName, setNewOptionName] = useState('');
  const [newOptionDesc, setNewOptionDesc] = useState('');
  const [isAddingOption, setIsAddingOption] = useState(false);

  if (!decisionLabData) {
    return (
      <div className="p-8 text-center border border-dashed border-border rounded-xl">
        <SlidersHorizontal className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-40" />
        <h3 className="font-serif text-lg font-bold mb-2">No Decision Matrix Available</h3>
        <p className="text-sm text-muted-foreground max-w-md mx-auto mb-4">
          Convert qualitative model opinions into an objective, weighted multi-criteria decision laboratory.
        </p>
        <Button onClick={() => runPrompt()} disabled={isGenerating}>
          <Sparkles className="w-4 h-4 mr-2" />
          Initialize Decision Lab
        </Button>
      </div>
    );
  }

  // Calculate weighted scores for each option
  const totalWeight = decisionLabData.factors.reduce((acc, f) => acc + f.weight, 0);

  const calculateOptionScore = (optionId: string) => {
    const opt = decisionLabData.options.find(o => o.id === optionId);
    if (!opt) return 0;

    let totalWeightedScore = 0;
    const modelKeys = Object.keys(opt.modelScores);

    decisionLabData.factors.forEach(factor => {
      // Average score across models for this factor
      let factorSum = 0;
      let count = 0;
      modelKeys.forEach(mKey => {
        const s = opt.modelScores[mKey]?.[factor.id];
        if (s !== undefined) {
          factorSum += s;
          count += 1;
        }
      });
      const avgFactorScore = count > 0 ? factorSum / count : 75;
      totalWeightedScore += (avgFactorScore * (factor.weight / 100));
    });

    return Number(totalWeightedScore.toFixed(1));
  };

  const rankedOptions = [...decisionLabData.options].map(opt => ({
    ...opt,
    calculatedScore: calculateOptionScore(opt.id)
  })).sort((a, b) => b.calculatedScore - a.calculatedScore);

  const handleAddOptionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newOptionName.trim()) return;
    addDecisionOption(newOptionName, newOptionDesc || 'User defined custom candidate option.');
    setNewOptionName('');
    setNewOptionDesc('');
    setIsAddingOption(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-300">
      {/* Overview */}
      <div className="p-4 rounded-xl bg-card border border-border flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="outline" className="font-mono text-xs uppercase bg-primary/10 text-primary border-primary/30">
              Stage 7: Multi-Criteria Decision Lab
            </Badge>
            <span className="text-xs text-muted-foreground">Transparent Weighted Tradeoff Matrix</span>
          </div>
          <h2 className="font-serif text-xl md:text-2xl font-bold tracking-tight text-foreground">
            {decisionLabData.decisionTitle}
          </h2>
          <p className="text-sm text-muted-foreground mt-1 max-w-2xl">
            {decisionLabData.sensitivityAnalysis}
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="text-right px-3 py-1.5 rounded-lg bg-muted/40 border border-border">
            <span className="text-xs font-mono text-muted-foreground block">Leading Candidate</span>
            <span className="text-sm font-bold font-serif text-primary truncate max-w-[180px] block">
              {rankedOptions[0]?.name.split(':')[1] || rankedOptions[0]?.name}
            </span>
          </div>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => goToStage('question')}
            className="hidden md:flex items-center gap-1.5 text-xs"
          >
            <span>Generate Final Report</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>

      {/* Factor Weights Control Panel */}
      <Card className="border-border">
        <CardHeader className="pb-3 flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-base font-serif">Evaluation Criteria & Weight Allocation</CardTitle>
            <CardDescription className="text-xs">
              Adjust factor importance sliders. Weights dynamically recalculate overall candidate rankings across all models.
            </CardDescription>
          </div>
          <Badge variant={totalWeight === 100 ? 'outline' : 'destructive'} className="font-mono text-xs">
            Sum: {totalWeight}% {totalWeight !== 100 && '(Adjust to 100%)'}
          </Badge>
        </CardHeader>

        <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {decisionLabData.factors.map(factor => (
            <div key={factor.id} className="p-3 rounded-lg bg-muted/20 border border-border space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-medium text-foreground">{factor.name}</span>
                <span className="font-mono font-bold text-primary">{factor.weight}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                step="5"
                value={factor.weight}
                onChange={(e) => updateDecisionFactorWeight(factor.id, Number(e.target.value))}
                className="w-full accent-primary cursor-pointer h-1.5 bg-muted rounded-lg"
              />
              <p className="text-[11px] text-muted-foreground line-clamp-2">
                {factor.description}
              </p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Ranked Candidate Options */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-serif text-lg font-bold">Ranked Strategic Options</h3>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsAddingOption(!isAddingOption)}
            className="text-xs"
          >
            <Plus className="w-3.5 h-3.5 mr-1" />
            Add Custom Option
          </Button>
        </div>

        {/* Custom Option Creator */}
        {isAddingOption && (
          <form onSubmit={handleAddOptionSubmit} className="p-4 rounded-xl bg-card border border-primary/40 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider font-mono text-primary">New Decision Candidate</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Input
                placeholder="Option Title (e.g. Option D: Local Edge Model + Cloud Gateway)"
                value={newOptionName}
                onChange={(e) => setNewOptionName(e.target.value)}
                className="text-xs"
                required
              />
              <Input
                placeholder="Description of architectural premise"
                value={newOptionDesc}
                onChange={(e) => setNewOptionDesc(e.target.value)}
                className="text-xs"
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button type="button" variant="ghost" size="sm" onClick={() => setIsAddingOption(false)} className="text-xs">
                Cancel
              </Button>
              <Button type="submit" size="sm" className="text-xs">
                Add to Matrix
              </Button>
            </div>
          </form>
        )}

        <div className="grid grid-cols-1 gap-4">
          {rankedOptions.map((opt, rankIdx) => {
            const isWinner = rankIdx === 0;
            return (
              <Card key={opt.id} className={`border transition-all ${isWinner ? 'border-primary/60 bg-primary/[0.02] shadow-md' : 'border-border'}`}>
                <CardHeader className="pb-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center font-mono text-xs font-bold ${
                        isWinner ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                      }`}>
                        #{rankIdx + 1}
                      </div>
                      <CardTitle className="text-base font-serif font-bold">
                        {opt.name}
                      </CardTitle>
                      {isWinner && (
                        <Badge className="bg-primary text-primary-foreground font-mono text-[10px] uppercase">
                          <Award className="w-3 h-3 mr-1" />
                          Top Ranked Strategy
                        </Badge>
                      )}
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <span className="text-[10px] font-mono text-muted-foreground block">Weighted Score</span>
                        <span className="text-lg font-mono font-bold text-primary">{opt.calculatedScore} / 100</span>
                      </div>
                      {decisionLabData.options.length > 2 && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeDecisionOption(opt.id)}
                          className="h-8 w-8 text-muted-foreground hover:text-destructive"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      )}
                    </div>
                  </div>

                  <CardDescription className="text-xs mt-1">
                    {opt.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-3 text-xs pt-0">
                  {/* Factor Breakdown Chips */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-2.5 rounded-lg bg-muted/20 border border-border/50">
                    {decisionLabData.factors.map(f => {
                      // Calc avg for this factor
                      const scores = Object.values(opt.modelScores).map(ms => ms[f.id]).filter(v => v !== undefined);
                      const avg = scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 80;
                      return (
                        <div key={f.id} className="text-center p-1.5 rounded bg-background/50">
                          <span className="text-[10px] text-muted-foreground block truncate">{f.name}</span>
                          <span className="font-mono font-bold text-xs">{avg} / 100</span>
                        </div>
                      );
                    })}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <span className="font-semibold text-emerald-400 flex items-center gap-1 font-mono text-[11px]">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                        Key Advantages:
                      </span>
                      <ul className="list-disc list-inside text-muted-foreground space-y-0.5">
                        {opt.pros.map((p, idx) => <li key={idx}>{p}</li>)}
                      </ul>
                    </div>

                    <div className="space-y-1">
                      <span className="font-semibold text-rose-400 flex items-center gap-1 font-mono text-[11px]">
                        <AlertTriangle className="w-3 h-3 text-rose-400" />
                        Primary Risk & Tradeoff:
                      </span>
                      <p className="text-muted-foreground">{opt.keyRisk}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};
