import React, { useState } from 'react';
import { useParallax } from '@/contexts/ParallaxContext';
import { ArenaCategory } from '@/types/parallax';
import { AVAILABLE_TEXT_MODELS, getModelById } from '@/services/modelCatalog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { 
  Trophy, 
  Swords, 
  Sparkles, 
  Play, 
  RotateCcw, 
  Download, 
  Copy, 
  Check, 
  Zap, 
  Layers, 
  Sliders, 
  Activity, 
  ShieldCheck, 
  ChevronRight,
  BarChart3,
  Award,
  Clock,
  ArrowUpRight,
  Flame,
  Info
} from 'lucide-react';
import { toast } from 'sonner';

const CATEGORIES: { id: ArenaCategory; label: string; desc: string; icon: string }[] = [
  { id: 'Reasoning', label: 'Deductive Reasoning', desc: 'Complex multi-step logic, edge case invariants & proofs', icon: '🧠' },
  { id: 'Coding', label: 'Algorithmic Coding', desc: 'Efficiency, defensive error handling & syntax rigor', icon: '💻' },
  { id: 'Creative', label: 'Creative & Conceptual', desc: 'Stylistic texture, novel synthesis & flow', icon: '✨' },
  { id: 'Factual Recall', label: 'Factual Precision', desc: 'Citation density, zero-hallucination verification', icon: '📚' },
  { id: 'Instruction Following', label: 'Strict Schema & Format', desc: 'Negative constraints, structured JSON output', icon: '🎯' },
  { id: 'Custom', label: 'Custom Rubric Arena', desc: 'User-specified prompt and evaluation criteria', icon: '⚡' }
];

const PRESET_BENCHMARK_PROMPTS: Record<ArenaCategory, string> = {
  Reasoning: 'Prove the convergence rate of decentralized consensus under Byzantine fault tolerance with 33% adversarial partition. Detail all mathematical invariants.',
  Coding: 'Write a zero-allocation concurrent ring-buffer in TypeScript with lock-free atomics and graceful backpressure drain mechanics.',
  Creative: 'Write a speculative philosophical dialogue between an 18th-century cartographer and an artificial superintelligence observing high-dimensional manifold space.',
  'Factual Recall': 'Detail the exact historical progression of the Basel III capital adequacy framework from 2010 to 2024, citing all tier-1 leverage ratio revisions.',
  'Instruction Following': 'Generate a strict YAML schema with 4 nested layers, exactly 3 UUID v4 fields, no quotes around numbers, and maximum line length 80 characters.',
  Custom: 'Analyze the second-order economic fallout of quantum cryptography breakthroughs on sovereign treasury bond yields.'
};

export const ArenaView: React.FC = () => {
  const { 
    arenaBenchmarkRun, 
    runArenaBenchmark, 
    isGenerating, 
    selectedTextModelIds, 
    toggleTextModel 
  } = useParallax();

  const [activeCategory, setActiveCategory] = useState<ArenaCategory>('Reasoning');
  const [taskPrompt, setTaskPrompt] = useState(PRESET_BENCHMARK_PROMPTS['Reasoning']);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCategoryChange = (cat: ArenaCategory) => {
    setActiveCategory(cat);
    setTaskPrompt(PRESET_BENCHMARK_PROMPTS[cat] || '');
  };

  const handleRun = () => {
    if (!taskPrompt.trim()) {
      toast.error('Please enter a benchmark task prompt');
      return;
    }
    if (selectedTextModelIds.length < 2) {
      toast.error('Select at least 2 models for head-to-head benchmarking');
      return;
    }
    runArenaBenchmark(activeCategory, taskPrompt, selectedTextModelIds);
  };

  const handleCopyReport = () => {
    if (!arenaBenchmarkRun) return;
    const reportText = `# PARALLAX AI BENCHMARK ARENA DOSSIER
Category: ${arenaBenchmarkRun.category}
Winner: ${arenaBenchmarkRun.consensusWinner}
Prompt: ${arenaBenchmarkRun.taskPrompt}

## RANKINGS
${arenaBenchmarkRun.rankings.map(r => `Rank #${r.rank} | ${r.modelName} (${r.overallScore}/100)
- Win Rate: ${r.winRate}% | Latency: ${r.latencyMs}ms | Tokens: ${r.tokenOutput}
- Verdict: ${r.verdictHighlight}
- Dimension Breakdown:
${r.dimensionScores.map(d => `  * ${d.dimension}: ${d.score}/100`).join('\n')}
`).join('\n\n')}
`;
    navigator.clipboard.writeText(reportText);
    toast.success('Benchmark dossier copied to clipboard in Markdown format');
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Header Banner */}
      <div className="p-5 md:p-6 rounded-2xl bg-card border border-border space-y-4 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 shadow-sm">
              <Swords className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif font-bold text-lg md:text-xl text-foreground">
                  AI Benchmark Arena · Head-to-Head Laboratory
                </h1>
                <Badge variant="outline" className="text-[10px] font-mono border-amber-500/40 text-amber-500 bg-amber-500/5">
                  Multi-Dimensional Rigor
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground font-mono">
                Pitting frontier foundation models against standardized and custom cognitive evaluation rubrics
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopyReport}
              disabled={!arenaBenchmarkRun}
              className="text-xs h-8 gap-1.5 border-border bg-background hover:bg-muted"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>Export Dossier</span>
            </Button>
            <Button
              size="sm"
              onClick={handleRun}
              disabled={isGenerating}
              className="text-xs h-8 gap-1.5 bg-primary text-primary-foreground font-semibold shadow-sm hover:opacity-90"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>{isGenerating ? 'Benchmarking...' : 'Execute Arena Run'}</span>
            </Button>
          </div>
        </div>

        {/* Category Selector Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 pt-2 border-t border-border/50">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => handleCategoryChange(cat.id)}
              className={`p-2.5 rounded-xl border text-left transition-all flex flex-col justify-between ${
                activeCategory === cat.id
                  ? 'bg-accent/10 border-accent text-foreground shadow-sm ring-1 ring-accent'
                  : 'bg-muted/20 border-border/60 text-muted-foreground hover:text-foreground hover:bg-muted/40'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-base">{cat.icon}</span>
                {activeCategory === cat.id && (
                  <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                )}
              </div>
              <div className="mt-2">
                <div className="font-serif font-bold text-xs truncate">{cat.label}</div>
                <div className="text-[10px] text-muted-foreground truncate">{cat.desc}</div>
              </div>
            </button>
          ))}
        </div>

        {/* Prompt Input & Model Chips */}
        <div className="space-y-2 pt-2">
          <div className="flex justify-between items-center text-xs font-mono">
            <span className="text-muted-foreground font-semibold uppercase text-[10px]">Benchmark Task Directive</span>
            <span className="text-muted-foreground">{selectedTextModelIds.length} Models Engaged</span>
          </div>
          <Textarea
            value={taskPrompt}
            onChange={(e) => setTaskPrompt(e.target.value)}
            rows={3}
            className="text-xs md:text-sm resize-none rounded-xl bg-muted/20 border-border focus:ring-accent"
            placeholder="Enter the challenge prompt or invariant proof to test across models..."
          />
        </div>

        {/* Participating Model Selectors */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="text-[10px] font-mono text-muted-foreground uppercase font-semibold">Participating Models:</span>
          {AVAILABLE_TEXT_MODELS.map(m => {
            const isSelected = selectedTextModelIds.includes(m.id);
            return (
              <button
                key={m.id}
                onClick={() => toggleTextModel(m.id)}
                className={`text-xs px-2.5 py-1 rounded-lg font-mono flex items-center gap-1.5 border transition-all ${
                  isSelected 
                    ? 'bg-muted border-accent/40 text-foreground font-medium'
                    : 'bg-background border-border text-muted-foreground opacity-50 hover:opacity-100'
                }`}
              >
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: isSelected ? m.accentColor : 'gray' }} />
                <span>{m.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Arena Results & Leaderboard */}
      {arenaBenchmarkRun && (
        <div className="space-y-6">
          {/* Winner Banner */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/15 via-accent/10 to-transparent border border-amber-500/30 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-500 text-black flex items-center justify-center font-bold text-xl shadow-lg">
                <Trophy className="w-6 h-6 fill-current" />
              </div>
              <div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-amber-500 font-bold">
                  Arena Champion · {arenaBenchmarkRun.category}
                </div>
                <div className="font-serif font-bold text-lg md:text-xl text-foreground">
                  {arenaBenchmarkRun.consensusWinner}
                </div>
                <p className="text-xs text-muted-foreground max-w-2xl">
                  {arenaBenchmarkRun.keyTakeaway}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 font-mono text-xs">
              <div className="p-2.5 rounded-xl bg-card border border-border text-center">
                <div className="text-[10px] text-muted-foreground">Top Score</div>
                <div className="text-base font-bold text-amber-500">{arenaBenchmarkRun.rankings[0]?.overallScore}/100</div>
              </div>
              <div className="p-2.5 rounded-xl bg-card border border-border text-center">
                <div className="text-[10px] text-muted-foreground">Win Rate</div>
                <div className="text-base font-bold text-emerald-500">{arenaBenchmarkRun.rankings[0]?.winRate}%</div>
              </div>
            </div>
          </div>

          {/* Leaderboard Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {arenaBenchmarkRun.rankings.map((rank) => {
              const model = getModelById(rank.modelId);
              const isFirst = rank.rank === 1;

              return (
                <div 
                  key={rank.modelId}
                  className={`rounded-2xl border bg-card p-4 space-y-4 transition-all ${
                    isFirst ? 'border-amber-500/40 shadow-md ring-1 ring-amber-500/20' : 'border-border'
                  }`}
                >
                  {/* Card Header */}
                  <div className="flex items-center justify-between pb-3 border-b border-border">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono font-bold text-xs ${
                        isFirst ? 'bg-amber-500 text-black' : 'bg-muted text-muted-foreground'
                      }`}>
                        #{rank.rank}
                      </div>
                      <div>
                        <div className="font-serif font-bold text-sm text-foreground flex items-center gap-1.5">
                          <span>{rank.modelName}</span>
                          {isFirst && <Award className="w-3.5 h-3.5 text-amber-500" />}
                        </div>
                        <div className="text-[10px] font-mono text-muted-foreground">
                          {rank.provider} · {rank.latencyMs}ms · {rank.tokenOutput} tokens
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-lg font-bold font-mono text-foreground">
                        {rank.overallScore}<span className="text-xs text-muted-foreground">/100</span>
                      </div>
                      <div className="text-[10px] font-mono text-emerald-500">
                        {rank.winRate}% Win Rate
                      </div>
                    </div>
                  </div>

                  {/* Verdict Highlight */}
                  <div className="p-2.5 rounded-xl bg-muted/20 border border-border text-xs text-foreground/90 italic">
                    "{rank.verdictHighlight}"
                  </div>

                  {/* Multi-Dimensional Scoring Bars */}
                  <div className="space-y-2">
                    <div className="text-[10px] font-mono uppercase text-muted-foreground font-semibold">
                      Evaluation Dimension Breakdown
                    </div>
                    {rank.dimensionScores.map((dim) => (
                      <div key={dim.dimension} className="space-y-1">
                        <div className="flex justify-between text-xs font-mono">
                          <span className="text-muted-foreground truncate max-w-[220px]">{dim.dimension}</span>
                          <span className="font-bold text-foreground">{dim.score}%</span>
                        </div>
                        <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                          <div 
                            className={`h-full rounded-full transition-all ${
                              dim.score >= 95 ? 'bg-emerald-500' : dim.score >= 90 ? 'bg-accent' : 'bg-amber-500'
                            }`}
                            style={{ width: `${dim.score}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Sample Snippet */}
                  <div className="pt-2 border-t border-border flex items-center justify-between text-xs">
                    <span className="text-muted-foreground font-mono text-[10px]">Evaluation Proof Logged</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        navigator.clipboard.writeText(rank.response);
                        toast.success(`Copied ${rank.modelName} evaluation benchmark`);
                      }}
                      className="h-6 px-2 text-[10px] gap-1 text-muted-foreground hover:text-foreground"
                    >
                      <Copy className="w-3 h-3" />
                      <span>Copy Proof</span>
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};