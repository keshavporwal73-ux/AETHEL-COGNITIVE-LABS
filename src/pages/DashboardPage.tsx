import React, { useState } from 'react';
import { useParallax } from '@/contexts/ParallaxContext';
import { Header } from '@/components/layout/Header';
import { QuantumParticles, QuantumBeam } from '@/components/common/QuantumParticles';
import { FuturisticHUD } from '@/components/common/FuturisticHUD';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart3, 
  Cpu, 
  Clock, 
  Coins, 
  Star, 
  TrendingUp, 
  CheckCircle2, 
  SplitSquareVertical, 
  Sparkles, 
  Image as ImageIcon, 
  Swords, 
  ArrowLeft,
  Download
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { ModelHubModal } from '@/components/modals/ModelHubModal';
import { AuthModal } from '@/components/modals/AuthModal';

export const DashboardPage: React.FC = () => {
  const { usageStats } = useParallax();
  const navigate = useNavigate();
  const [isModelHubOpen, setIsModelHubOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col relative overflow-hidden">
      <QuantumParticles density="medium" />
      <Header
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenModelHub={() => setIsModelHubOpen(true)}
      />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 md:px-8 py-8 space-y-8 relative z-10">
        {/* Top Header & Breadcrumb */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-border">
          <div className="space-y-1">
            <Link to="/app" className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-cyan-400 mb-1 transition-colors">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Cognitive Matrix</span>
            </Link>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold flex items-center gap-3">
              <span>AETHEL Intelligence Telemetry</span>
              <Badge variant="outline" className="border-cyan-500/40 text-cyan-400 bg-cyan-950/30 text-xs font-mono">
                LIVE
              </Badge>
            </h1>
            <p className="text-xs text-muted-foreground font-mono">
              Empirical multi-model performance benchmarks, token quantum latency, and consensus fidelity
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsModelHubOpen(true)}
              className="text-xs gap-1.5"
            >
              <Cpu className="w-3.5 h-3.5 text-accent" />
              <span>Manage Models</span>
            </Button>
            <Button
              size="sm"
              onClick={() => navigate('/app')}
              className="text-xs gap-1.5 bg-primary text-primary-foreground"
            >
              <span>Launch Session</span>
            </Button>
          </div>
        </div>

        {/* 4 Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl border border-border bg-card space-y-2">
            <div className="flex items-center justify-between text-muted-foreground">
              <span className="text-xs font-mono uppercase">Inquiries Dispatched</span>
              <SplitSquareVertical className="w-4 h-4 text-accent" />
            </div>
            <div className="text-3xl font-bold font-serif text-foreground">
              {usageStats.totalQuestions}
            </div>
            <div className="text-[11px] text-muted-foreground">
              Across {usageStats.totalSessions} distinct workspaces
            </div>
          </div>

          <div className="p-5 rounded-2xl border border-border bg-card space-y-2">
            <div className="flex items-center justify-between text-muted-foreground">
              <span className="text-xs font-mono uppercase">Model Invocations</span>
              <Cpu className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="text-3xl font-bold font-serif text-foreground">
              {usageStats.totalModelRuns}
            </div>
            <div className="text-[11px] text-emerald-500 font-mono">
              +48 Visual Generations
            </div>
          </div>

          <div className="p-5 rounded-2xl border border-border bg-card space-y-2">
            <div className="flex items-center justify-between text-muted-foreground">
              <span className="text-xs font-mono uppercase">Tokens Processed</span>
              <TrendingUp className="w-4 h-4 text-blue-500" />
            </div>
            <div className="text-3xl font-bold font-mono text-foreground">
              {usageStats.totalTokensUsed.toLocaleString()}
            </div>
            <div className="text-[11px] text-muted-foreground">
              Estimated spend: ${usageStats.estimatedTotalCost.toFixed(2)}
            </div>
          </div>

          <div className="p-5 rounded-2xl border border-border bg-card space-y-2">
            <div className="flex items-center justify-between text-muted-foreground">
              <span className="text-xs font-mono uppercase">Top Rated Engine</span>
              <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
            </div>
            <div className="text-2xl font-bold font-serif text-foreground truncate">
              {usageStats.mostUsedModel}
            </div>
            <div className="text-[11px] text-amber-500 font-mono">
              4.9/5.0 Empirical Rating
            </div>
          </div>
        </div>

        {/* Model Performance Breakdown Table */}
        <div className="p-6 rounded-2xl border border-border bg-card space-y-4 shadow-sm">
          <div className="flex items-center justify-between pb-3 border-b border-border">
            <h2 className="font-serif font-bold text-base text-foreground">
              Model Performance & Latency Telemetry
            </h2>
            <span className="text-xs font-mono text-muted-foreground">
              Empirical Benchmarks
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-muted/40 border-b border-border text-muted-foreground font-mono text-[10px] uppercase">
                <tr>
                  <th className="p-3">Model Architecture</th>
                  <th className="p-3">Total Invocations</th>
                  <th className="p-3">Average Latency</th>
                  <th className="p-3">User Quality Rating</th>
                  <th className="p-3">Specialization</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {usageStats.modelUsageBreakdown.map((row) => (
                  <tr key={row.modelId} className="hover:bg-muted/20">
                    <td className="p-3 font-semibold text-foreground">{row.modelName}</td>
                    <td className="p-3 font-mono text-muted-foreground">{row.count} runs</td>
                    <td className="p-3 font-mono text-muted-foreground">{row.avgLatency}ms</td>
                    <td className="p-3">
                      <div className="flex items-center gap-1 font-mono text-amber-500 font-medium">
                        <Star className="w-3 h-3 fill-current" />
                        <span>{row.userRating}</span>
                      </div>
                    </td>
                    <td className="p-3">
                      <Badge variant="outline" className="font-mono text-[10px]">
                        {row.modelId.includes('r1') ? 'Deductive Proof' : row.modelId.includes('sonnet') ? 'Nuanced Dialectic' : row.modelId.includes('kling') ? 'Visual Generative' : 'General Frontier'}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mode Usage Distribution Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl border border-border bg-card space-y-4">
            <h3 className="font-serif font-bold text-base text-foreground">
              Workspace Mode Utilization
            </h3>
            <div className="space-y-3 text-xs">
              {usageStats.modeUsageBreakdown.map(m => {
                const percentage = Math.round((m.count / usageStats.totalQuestions) * 100);
                return (
                  <div key={m.mode} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="capitalize font-medium text-foreground">{m.mode} Mode</span>
                      <span className="font-mono text-muted-foreground">{m.count} sessions ({percentage}%)</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
                      <div 
                        className="h-full bg-accent rounded-full" 
                        style={{ width: `${Math.min(100, percentage * 1.5)}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="p-6 rounded-2xl border border-border bg-card space-y-4 flex flex-col justify-between">
            <div className="space-y-2">
              <h3 className="font-serif font-bold text-base text-foreground">
                Continuous Model Calibration
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                PARALLAX dynamically recalibrates Smart Model Routing based on your interaction feedback, preferred synthesis depth, and provider latency variance.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-accent/10 border border-accent/20 text-xs space-y-2">
              <div className="flex items-center gap-2 font-semibold text-accent">
                <CheckCircle2 className="w-4 h-4" />
                <span>Zero Data Training Commitment</span>
              </div>
              <p className="text-muted-foreground text-[11px] leading-relaxed">
                Your private workspace queries are never used to train foundation models. All provider connections adhere to enterprise zero-retention API agreements.
              </p>
            </div>
          </div>
        </div>
      </main>

      <ModelHubModal open={isModelHubOpen} onOpenChange={setIsModelHubOpen} />
      <AuthModal open={isAuthOpen} onOpenChange={setIsAuthOpen} />
    </div>
  );
};

export default DashboardPage;
