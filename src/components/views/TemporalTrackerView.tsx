import React, { useState, useEffect } from 'react';
import { useParallax } from '@/contexts/ParallaxContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Clock, RefreshCw, Sparkles, TrendingUp, TrendingDown, 
  Minus, BarChart3, AlertTriangle, CheckCircle2, ChevronRight, Download
} from 'lucide-react';
import { toast } from 'sonner';

interface TemporalDataPoint {
  date: string;
  label: string;
  consensusScore: number; // 0-100
  uncertaintyScore: number;
  conflictCount: number;
  modelAgreement: number; // 0-100
  majorEvent?: string;
  shift: 'positive' | 'negative' | 'neutral';
}

interface ModelTemporalTrace {
  modelId: string;
  modelName: string;
  color: string;
  dataPoints: { date: string; confidenceScore: number; stanceLabel: string }[];
}

const DEMO_TEMPORAL_DATA: TemporalDataPoint[] = [
  { date: '2025 Q1', label: 'Jan–Mar 2025', consensusScore: 48, uncertaintyScore: 68, conflictCount: 7, modelAgreement: 41, majorEvent: 'BIS Project Agorá Phase 1 Launch', shift: 'neutral' },
  { date: '2025 Q2', label: 'Apr–Jun 2025', consensusScore: 54, uncertaintyScore: 62, conflictCount: 5, modelAgreement: 53, majorEvent: 'FedNow cross-border pilot announced', shift: 'positive' },
  { date: '2025 Q3', label: 'Jul–Sep 2025', consensusScore: 47, uncertaintyScore: 74, conflictCount: 9, modelAgreement: 39, majorEvent: 'EU DLT Pilot Regime concerns raised', shift: 'negative' },
  { date: '2025 Q4', label: 'Oct–Dec 2025', consensusScore: 61, uncertaintyScore: 55, conflictCount: 4, modelAgreement: 66, majorEvent: 'ISO 20022 global migration completes', shift: 'positive' },
  { date: '2026 Q1', label: 'Jan–Mar 2026', consensusScore: 67, uncertaintyScore: 48, conflictCount: 3, modelAgreement: 71, majorEvent: 'Agorá Phase 2 results published (+64% speed)', shift: 'positive' },
  { date: '2026 Q2', label: 'Apr–Jun 2026', consensusScore: 72, uncertaintyScore: 42, conflictCount: 2, modelAgreement: 78, shift: 'positive' },
  { date: '2026 Q3', label: 'Jul–Sep 2026', consensusScore: 69, uncertaintyScore: 50, conflictCount: 4, modelAgreement: 73, majorEvent: 'US strategic DLT reserve debate begins', shift: 'negative' },
];

const DEMO_MODEL_TRACES: ModelTemporalTrace[] = [
  {
    modelId: 'gpt4o',
    modelName: 'GPT-4o',
    color: '#10b981',
    dataPoints: [
      { date: '2025 Q1', confidenceScore: 55, stanceLabel: 'Cautiously optimistic on hybrid model' },
      { date: '2025 Q2', confidenceScore: 63, stanceLabel: 'Supports phased ISO 20022 approach' },
      { date: '2025 Q3', confidenceScore: 52, stanceLabel: 'Flags EU regulatory headwinds' },
      { date: '2025 Q4', confidenceScore: 74, stanceLabel: 'High confidence on ISO completion benefits' },
      { date: '2026 Q1', confidenceScore: 81, stanceLabel: 'Strongly supports Agorá Phase 2 expansion' },
      { date: '2026 Q2', confidenceScore: 85, stanceLabel: 'Consensus leader — DLT + clearing hybrid optimal' },
      { date: '2026 Q3', confidenceScore: 78, stanceLabel: 'Moderate caution on US political uncertainty' },
    ],
  },
  {
    modelId: 'claude37',
    modelName: 'Claude 3.7',
    color: '#8b5cf6',
    dataPoints: [
      { date: '2025 Q1', confidenceScore: 42, stanceLabel: 'Skeptical of governance readiness' },
      { date: '2025 Q2', confidenceScore: 48, stanceLabel: 'Notes counterparty risk gaps' },
      { date: '2025 Q3', confidenceScore: 38, stanceLabel: 'Emphasizes jurisdiction asymmetry' },
      { date: '2025 Q4', confidenceScore: 56, stanceLabel: 'Partial update after ISO progress' },
      { date: '2026 Q1', confidenceScore: 65, stanceLabel: 'Aligns with hybrid consensus' },
      { date: '2026 Q2', confidenceScore: 70, stanceLabel: 'Strong evidence base now available' },
      { date: '2026 Q3', confidenceScore: 66, stanceLabel: 'Maintains geopolitical fragmentation risk' },
    ],
  },
  {
    modelId: 'deepseek',
    modelName: 'DeepSeek R1',
    color: '#f43f5e',
    dataPoints: [
      { date: '2025 Q1', confidenceScore: 39, stanceLabel: 'Mathematical model favors centralized RTGS' },
      { date: '2025 Q2', confidenceScore: 44, stanceLabel: 'Lattency calculus still inconclusive' },
      { date: '2025 Q3', confidenceScore: 51, stanceLabel: 'Byzantine fault analysis updated' },
      { date: '2025 Q4', confidenceScore: 59, stanceLabel: 'ISO completion changes the equation' },
      { date: '2026 Q1', confidenceScore: 71, stanceLabel: 'Atomic swap finality metrics favorable' },
      { date: '2026 Q2', confidenceScore: 76, stanceLabel: 'High confidence: hybrid model provably optimal' },
      { date: '2026 Q3', confidenceScore: 72, stanceLabel: 'Stable — no new disconfirming data' },
    ],
  },
  {
    modelId: 'gemini25',
    modelName: 'Gemini 2.5',
    color: '#f59e0b',
    dataPoints: [
      { date: '2025 Q1', confidenceScore: 58, stanceLabel: 'Cross-references BIS Agorá launch data' },
      { date: '2025 Q2', confidenceScore: 61, stanceLabel: 'Positive on CBDC wholesale pilots' },
      { date: '2025 Q3', confidenceScore: 49, stanceLabel: 'Geopolitical fragmentation risk rises' },
      { date: '2025 Q4', confidenceScore: 68, stanceLabel: 'ISO milestone reached — updates model' },
      { date: '2026 Q1', confidenceScore: 79, stanceLabel: 'Agorá Phase 2 is transformative evidence' },
      { date: '2026 Q2', confidenceScore: 82, stanceLabel: 'Highest confidence across all models' },
      { date: '2026 Q3', confidenceScore: 75, stanceLabel: 'US reserve debate introduces uncertainty' },
    ],
  },
];

const MAX_BAR_HEIGHT = 80;

export const TemporalTrackerView: React.FC = () => {
  const { runPrompt, isGenerating } = useParallax();
  const [selectedPeriod, setSelectedPeriod] = useState<TemporalDataPoint | null>(DEMO_TEMPORAL_DATA[6]);
  const [activeModels, setActiveModels] = useState<string[]>(['gpt4o', 'claude37', 'deepseek', 'gemini25']);
  const [animFrame, setAnimFrame] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setAnimFrame(f => (f + 1) % 60), 100);
    return () => clearInterval(t);
  }, []);

  const toggleModel = (id: string) => {
    setActiveModels(prev => prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]);
  };

  const getShiftIcon = (shift: string) => {
    if (shift === 'positive') return <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />;
    if (shift === 'negative') return <TrendingDown className="w-3.5 h-3.5 text-rose-400" />;
    return <Minus className="w-3.5 h-3.5 text-muted-foreground" />;
  };

  const handleExport = () => {
    const csv = ['Period,Consensus Score,Uncertainty,Conflicts,Model Agreement',
      ...DEMO_TEMPORAL_DATA.map(d => `${d.date},${d.consensusScore},${d.uncertaintyScore},${d.conflictCount},${d.modelAgreement}`)
    ].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'aethel-temporal-track.csv'; a.click();
    toast.success('Temporal track exported as CSV');
  };

  const visibleTraces = DEMO_MODEL_TRACES.filter(t => activeModels.includes(t.modelId));

  return (
    <div className="w-full space-y-4">
      {/* Header */}
      <div className="p-4 rounded-xl bg-card border border-border flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-amber-600/30 to-rose-600/20 border border-amber-500/30 flex items-center justify-center">
            <Clock className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <h2 className="font-serif text-base font-bold flex items-center gap-2">
              Temporal Intelligence Tracker
              <Badge variant="outline" className="text-[10px] font-mono border-amber-500/30 text-amber-400 bg-amber-950/30">
                CONSENSUS DRIFT ANALYSIS
              </Badge>
            </h2>
            <p className="text-[11px] text-muted-foreground font-mono">Track how model consensus evolves across time · {DEMO_TEMPORAL_DATA.length} periods mapped</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline" onClick={handleExport} className="h-8 text-xs border-border">
            <Download className="w-3.5 h-3.5 mr-1.5" />Export CSV
          </Button>
          <Button
            size="sm"
            onClick={() => runPrompt()}
            disabled={isGenerating}
            className="h-8 px-3 text-xs bg-gradient-to-r from-amber-600 to-rose-600 hover:from-amber-500 hover:to-rose-500 text-white border-0"
          >
            {isGenerating ? <RefreshCw className="w-3.5 h-3.5 mr-1.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5 mr-1.5" />}
            Refresh Track
          </Button>
        </div>
      </div>

      {/* Model Legend + Toggles */}
      <div className="flex flex-wrap gap-2">
        {DEMO_MODEL_TRACES.map(trace => (
          <button
            key={trace.modelId}
            onClick={() => toggleModel(trace.modelId)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-mono transition-all ${
              activeModels.includes(trace.modelId)
                ? 'bg-card border-border text-foreground'
                : 'bg-muted/20 border-border/50 text-muted-foreground opacity-50'
            }`}
          >
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: trace.color }} />
            {trace.modelName}
          </button>
        ))}
      </div>

      {/* Main Temporal Chart */}
      <div className="p-4 rounded-xl border border-border bg-card space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <BarChart3 className="w-4 h-4 text-amber-400" />
          <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">Consensus Score Over Time</span>
          <span className="text-[10px] text-muted-foreground ml-auto">Click a period to inspect</span>
        </div>

        {/* Bar Chart Timeline */}
        <div className="w-full overflow-x-auto">
          <div className="flex items-end gap-2 min-w-max pb-2" style={{ height: MAX_BAR_HEIGHT + 60 }}>
            {DEMO_TEMPORAL_DATA.map((point, idx) => {
              const isSelected = selectedPeriod?.date === point.date;
              const barH = (point.consensusScore / 100) * MAX_BAR_HEIGHT;
              const uncH = (point.uncertaintyScore / 100) * MAX_BAR_HEIGHT;
              return (
                <button
                  key={point.date}
                  onClick={() => setSelectedPeriod(isSelected ? null : point)}
                  className="flex flex-col items-center gap-1 group"
                  style={{ minWidth: 64 }}
                >
                  {/* Event indicator */}
                  <div className="h-4 flex items-center">
                    {point.majorEvent && (
                      <AlertTriangle className="w-3 h-3 text-amber-400 animate-pulse" />
                    )}
                  </div>
                  {/* Stacked bar */}
                  <div
                    className="relative flex flex-col-reverse items-center rounded-t-lg overflow-hidden transition-all duration-300"
                    style={{ width: 42, height: MAX_BAR_HEIGHT }}
                  >
                    {/* Uncertainty overlay */}
                    <div
                      className="w-full bg-rose-500/20 border-t border-rose-500/30"
                      style={{ height: uncH / 4 }}
                    />
                    {/* Consensus fill */}
                    <div
                      className={`w-full transition-all duration-500 ${
                        isSelected
                          ? 'bg-gradient-to-t from-amber-500 to-amber-400'
                          : 'bg-gradient-to-t from-cyan-600/70 to-violet-600/50 group-hover:from-cyan-500/80 group-hover:to-violet-500/60'
                      }`}
                      style={{ height: barH }}
                    />
                    {isSelected && (
                      <div className="absolute inset-0 border-2 border-amber-400 rounded-t-lg pointer-events-none" />
                    )}
                  </div>
                  {/* Date label */}
                  <div className={`text-[10px] font-mono text-center leading-tight ${isSelected ? 'text-amber-400 font-bold' : 'text-muted-foreground'}`}>
                    {point.date}
                  </div>
                  {/* Score */}
                  <div className={`text-[10px] font-mono font-bold ${isSelected ? 'text-amber-400' : 'text-muted-foreground'}`}>
                    {point.consensusScore}%
                  </div>
                  {/* Shift arrow */}
                  <div className="flex items-center justify-center">{getShiftIcon(point.shift)}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Model Confidence Traces (Line chart via SVG) */}
        <div>
          <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider mb-2">Model Confidence Trajectories</div>
          <div className="w-full overflow-x-auto">
            <svg width="100%" height="100" viewBox={`0 0 ${DEMO_TEMPORAL_DATA.length * 90} 100`} preserveAspectRatio="none">
              {visibleTraces.map(trace => {
                const pts = trace.dataPoints.map((p, i) => `${i * 90 + 45},${100 - p.confidenceScore}`).join(' ');
                return (
                  <g key={trace.modelId}>
                    <polyline
                      points={pts}
                      fill="none"
                      stroke={trace.color}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      opacity={0.8}
                    />
                    {trace.dataPoints.map((p, i) => (
                      <circle key={i} cx={i * 90 + 45} cy={100 - p.confidenceScore} r="3" fill={trace.color} opacity={0.9} />
                    ))}
                  </g>
                );
              })}
            </svg>
          </div>
        </div>
      </div>

      {/* Selected Period Inspector */}
      {selectedPeriod && (
        <div className="p-4 rounded-xl border border-amber-500/30 bg-amber-950/10 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-400" />
              <span className="text-sm font-bold text-amber-400">{selectedPeriod.label}</span>
              {selectedPeriod.majorEvent && (
                <Badge variant="outline" className="text-[10px] border-amber-500/30 text-amber-400">
                  <AlertTriangle className="w-2.5 h-2.5 mr-1" />{selectedPeriod.majorEvent}
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              {getShiftIcon(selectedPeriod.shift)}
              <span className="font-mono capitalize">{selectedPeriod.shift} shift</span>
            </div>
          </div>

          {/* Metric Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: 'Consensus Score', value: `${selectedPeriod.consensusScore}%`, bar: selectedPeriod.consensusScore, color: 'from-cyan-500 to-violet-500', textColor: 'text-cyan-300' },
              { label: 'Uncertainty Level', value: `${selectedPeriod.uncertaintyScore}%`, bar: selectedPeriod.uncertaintyScore, color: 'from-rose-500 to-amber-500', textColor: 'text-rose-300' },
              { label: 'Active Conflicts', value: `${selectedPeriod.conflictCount}`, bar: selectedPeriod.conflictCount * 10, color: 'from-rose-600 to-rose-400', textColor: 'text-rose-400' },
              { label: 'Model Agreement', value: `${selectedPeriod.modelAgreement}%`, bar: selectedPeriod.modelAgreement, color: 'from-emerald-500 to-teal-500', textColor: 'text-emerald-300' },
            ].map(metric => (
              <div key={metric.label} className="p-3 rounded-lg bg-card border border-border">
                <div className="text-[10px] text-muted-foreground font-mono mb-1">{metric.label}</div>
                <div className={`text-xl font-bold font-mono ${metric.textColor}`}>{metric.value}</div>
                <div className="mt-2 h-1 bg-muted rounded-full overflow-hidden">
                  <div className={`h-full rounded-full bg-gradient-to-r ${metric.color} transition-all duration-700`} style={{ width: `${Math.min(100, metric.bar)}%` }} />
                </div>
              </div>
            ))}
          </div>

          {/* Per-model stance in this period */}
          <div>
            <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider mb-2">Model Stances in {selectedPeriod.date}</div>
            <div className="space-y-2">
              {visibleTraces.map(trace => {
                const pt = trace.dataPoints.find(p => p.date === selectedPeriod.date);
                if (!pt) return null;
                return (
                  <div key={trace.modelId} className="flex items-center gap-3 p-2.5 rounded-lg bg-muted/20 border border-border/60">
                    <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: trace.color }} />
                    <span className="text-[11px] font-mono font-medium shrink-0" style={{ color: trace.color }}>{trace.modelName}</span>
                    <ChevronRight className="w-3 h-3 text-muted-foreground shrink-0" />
                    <span className="text-xs text-muted-foreground flex-1 min-w-0 truncate">{pt.stanceLabel}</span>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <div className="w-16 h-1 bg-muted rounded-full overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${pt.confidenceScore}%`, backgroundColor: trace.color }} />
                      </div>
                      <span className="text-[10px] font-mono" style={{ color: trace.color }}>{pt.confidenceScore}%</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {[
          {
            label: 'Consensus Trend',
            value: '+24%',
            desc: 'From Q1 2025 to Q3 2026',
            icon: <TrendingUp className="w-5 h-5" />,
            color: 'text-emerald-400',
            bg: 'bg-emerald-950/30 border-emerald-500/20',
          },
          {
            label: 'Peak Uncertainty',
            value: 'Q3 2025',
            desc: 'EU DLT regulatory concerns triggered 74% peak',
            icon: <AlertTriangle className="w-5 h-5" />,
            color: 'text-rose-400',
            bg: 'bg-rose-950/30 border-rose-500/20',
          },
          {
            label: 'Consensus Achieved',
            value: 'Q2 2026',
            desc: '78% model agreement — highest on record',
            icon: <CheckCircle2 className="w-5 h-5" />,
            color: 'text-cyan-400',
            bg: 'bg-cyan-950/30 border-cyan-500/20',
          },
        ].map(stat => (
          <div key={stat.label} className={`p-3 rounded-lg border flex items-start gap-3 ${stat.bg}`}>
            <span className={`shrink-0 mt-0.5 ${stat.color}`}>{stat.icon}</span>
            <div>
              <div className={`text-base font-bold font-mono ${stat.color}`}>{stat.value}</div>
              <div className="text-[10px] text-muted-foreground font-medium mb-0.5">{stat.label}</div>
              <div className="text-[10px] text-muted-foreground">{stat.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemporalTrackerView;
