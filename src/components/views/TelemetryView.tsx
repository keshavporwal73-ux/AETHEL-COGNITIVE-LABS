import React, { useState, useEffect } from 'react';
import { useParallax } from '@/contexts/ParallaxContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Activity, 
  Cpu, 
  Zap, 
  ShieldAlert, 
  TrendingDown, 
  TrendingUp, 
  RefreshCw, 
  Radio, 
  Layers, 
  Clock, 
  DollarSign, 
  CheckCircle2,
  AlertTriangle,
  Flame,
  FileCode
} from 'lucide-react';
import { toast } from 'sonner';

export const TelemetryView: React.FC = () => {
  const { 
    liveTelemetryData, 
    setLiveTelemetryData, 
    selectedTextModelIds, 
    currentSessionId 
  } = useParallax();

  const [isStreaming, setIsStreaming] = useState(true);

  // Live telemetry pulse simulation
  useEffect(() => {
    if (!isStreaming || !liveTelemetryData) return;

    const interval = setInterval(() => {
      setLiveTelemetryData({
        ...liveTelemetryData,
        totalTokensProcessed: liveTelemetryData.totalTokensProcessed + Math.floor(Math.random() * 80 + 20),
        accumulatedCost: Number((liveTelemetryData.accumulatedCost + 0.0002).toFixed(5)),
        averageLatencyMs: Math.floor(420 + Math.random() * 40 - 20),
        modelSnapshots: liveTelemetryData.modelSnapshots.map(m => ({
          ...m,
          tokensPerSec: Math.floor(50 + Math.random() * 30),
          latencyMs: m.latencyMs + Math.floor(Math.random() * 20 - 10)
        }))
      });
    }, 2500);

    return () => clearInterval(interval);
  }, [isStreaming, liveTelemetryData]);

  if (!liveTelemetryData) {
    return (
      <div className="p-8 text-center space-y-4">
        <Activity className="w-12 h-12 mx-auto text-muted-foreground opacity-50" />
        <h3 className="font-serif font-bold text-lg text-foreground">Telemetry Stream Offline</h3>
        <p className="text-xs text-muted-foreground">Initiate a multi-model prompt to activate real-time telemetry telemetry feeds.</p>
      </div>
    );
  }

  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(liveTelemetryData, null, 2));
    const link = document.createElement('a');
    link.setAttribute('href', dataStr);
    link.setAttribute('download', `telemetry_stream_${Date.now()}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Live telemetry stream exported to JSON format');
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Header Banner */}
      <div className="p-5 md:p-6 rounded-2xl bg-card border border-border space-y-4 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-500 shadow-sm">
              <Radio className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif font-bold text-lg md:text-xl text-foreground">
                  Real-Time Intelligence Telemetry Suite
                </h1>
                <Badge variant="outline" className="text-[10px] font-mono border-cyan-500/40 text-cyan-500 bg-cyan-500/5">
                  Live Signal Ingestion
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground font-mono">
                Real-time monitoring of inference latency, token throughput, confidence drift, and emergent conflict signals
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsStreaming(!isStreaming)}
              className={`text-xs h-8 gap-1.5 border-border ${isStreaming ? 'text-emerald-500' : 'text-muted-foreground'}`}
            >
              <span className={`w-2 h-2 rounded-full ${isStreaming ? 'bg-emerald-500 animate-ping' : 'bg-muted-foreground'}`} />
              <span>{isStreaming ? 'Live Stream Active' : 'Stream Paused'}</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleExportJSON}
              className="text-xs h-8 gap-1.5 border-border bg-background hover:bg-muted"
            >
              <FileCode className="w-3.5 h-3.5" />
              <span>Export Stream</span>
            </Button>
          </div>
        </div>

        {/* Global Telemetry Vitals */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 border-t border-border/50 text-xs font-mono">
          <div className="p-3 rounded-xl bg-muted/20 border border-border space-y-1">
            <div className="text-[10px] text-muted-foreground uppercase flex items-center gap-1">
              <Cpu className="w-3 h-3 text-cyan-500" /> Total Tokens Streamed
            </div>
            <div className="text-base md:text-lg font-bold text-foreground">
              {liveTelemetryData.totalTokensProcessed.toLocaleString()}
            </div>
          </div>

          <div className="p-3 rounded-xl bg-muted/20 border border-border space-y-1">
            <div className="text-[10px] text-muted-foreground uppercase flex items-center gap-1">
              <Clock className="w-3 h-3 text-amber-500" /> Mean Inference Latency
            </div>
            <div className="text-base md:text-lg font-bold text-foreground">
              {liveTelemetryData.averageLatencyMs}ms
            </div>
          </div>

          <div className="p-3 rounded-xl bg-muted/20 border border-border space-y-1">
            <div className="text-[10px] text-muted-foreground uppercase flex items-center gap-1">
              <Zap className="w-3 h-3 text-emerald-500" /> Confidence Index
            </div>
            <div className="text-base md:text-lg font-bold text-emerald-500">
              {liveTelemetryData.currentConfidenceAvg}%
            </div>
          </div>

          <div className="p-3 rounded-xl bg-muted/20 border border-border space-y-1">
            <div className="text-[10px] text-muted-foreground uppercase flex items-center gap-1">
              <DollarSign className="w-3 h-3 text-violet-500" /> Session Incurred Cost
            </div>
            <div className="text-base md:text-lg font-bold text-foreground">
              ${liveTelemetryData.accumulatedCost.toFixed(4)}
            </div>
          </div>
        </div>
      </div>

      {/* Grid of Telemetry Subsystems */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Model Throughput & Latency Matrix */}
        <div className="p-5 rounded-2xl bg-card border border-border space-y-4 shadow-sm">
          <div className="flex items-center justify-between pb-3 border-b border-border">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-cyan-500" />
              <h2 className="font-serif font-bold text-sm text-foreground">Model Performance & Speed Benchmarks</h2>
            </div>
            <span className="text-[10px] font-mono text-muted-foreground">Tokens / Second</span>
          </div>

          <div className="space-y-3">
            {liveTelemetryData.modelSnapshots.map(m => (
              <div key={m.modelId} className="p-3 rounded-xl bg-muted/15 border border-border space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <div className="font-bold text-foreground flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-cyan-500" />
                    <span>{m.modelName}</span>
                  </div>
                  <div className="text-muted-foreground">
                    {m.tokensPerSec} t/s · {m.latencyMs}ms
                  </div>
                </div>

                <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                  <div 
                    className="h-full rounded-full bg-cyan-500 transition-all duration-500"
                    style={{ width: `${Math.min(100, (m.tokensPerSec / 80) * 100)}%` }}
                  />
                </div>

                <div className="flex justify-between items-center text-[10px] font-mono text-muted-foreground">
                  <span>Confidence: {m.confidenceScore}%</span>
                  <span>Est. Cost: ${m.costEstimate.toFixed(4)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Conflict Emergence Live Feed */}
        <div className="p-5 rounded-2xl bg-card border border-border space-y-4 shadow-sm">
          <div className="flex items-center justify-between pb-3 border-b border-border">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-amber-500" />
              <h2 className="font-serif font-bold text-sm text-foreground">Conflict Emergence Radar Feed</h2>
            </div>
            <span className="text-[10px] font-mono text-amber-500 font-bold">Real-time Stream</span>
          </div>

          <div className="space-y-3">
            {liveTelemetryData.conflictEvents.map(evt => (
              <div key={evt.id} className="p-3.5 rounded-xl bg-amber-500/5 border border-amber-500/20 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="font-bold text-foreground">{evt.topic}</span>
                  <span className="text-[10px] text-muted-foreground">{evt.timestamp}</span>
                </div>

                <p className="text-xs text-foreground/90 italic leading-relaxed">
                  "{evt.snippet}"
                </p>

                <div className="flex items-center justify-between text-[10px] font-mono">
                  <span className="text-muted-foreground">Divergence: {evt.divergingModels.join(' vs ')}</span>
                  <span className="px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-500 font-bold">{evt.severity}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Uncertainty Drift Horizon */}
      <div className="p-5 rounded-2xl bg-card border border-border space-y-4 shadow-sm">
        <div className="flex items-center justify-between pb-3 border-b border-border">
          <div className="flex items-center gap-2">
            <TrendingDown className="w-4 h-4 text-emerald-500" />
            <h2 className="font-serif font-bold text-sm text-foreground">Cognitive Uncertainty Decay Timeline</h2>
          </div>
          <span className="text-[10px] font-mono text-muted-foreground">Sequential Invariant Proof Steps</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
          {liveTelemetryData.uncertaintyDrift.map((step, idx) => (
            <div key={idx} className="p-3 rounded-xl bg-muted/20 border border-border space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-accent font-bold">{step.timeStep}</span>
                <span className="text-emerald-500 font-bold">{step.certaintyScore}% Certain</span>
              </div>
              <div className="h-2 rounded-full bg-muted overflow-hidden flex">
                <div className="bg-emerald-500 h-full" style={{ width: `${step.certaintyScore}%` }} />
                <div className="bg-amber-500 h-full" style={{ width: `${step.uncertaintyScore}%` }} />
              </div>
              <div className="text-[10px] text-muted-foreground font-mono truncate">
                {step.contributingFactor}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};