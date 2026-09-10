import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ParallaxLogo } from '@/components/common/ParallaxLogo';
import { AethelLogo } from '@/components/common/AethelLogo';
import { QuantumParticles, QuantumBeam } from '@/components/common/QuantumParticles';
import { FuturisticHUD } from '@/components/common/FuturisticHUD';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  SplitSquareVertical, 
  Sparkles, 
  Image as ImageIcon, 
  Swords, 
  CheckCircle2, 
  BookOpen, 
  ShieldCheck, 
  Cpu, 
  ArrowRight, 
  Layers, 
  Zap, 
  Scale, 
  Eye, 
  Lock,
  Compass,
  Network,
  GitCommit,
  HelpCircle,
  EyeOff,
  CheckSquare,
  SlidersHorizontal,
  ShieldAlert,
  FileText,
  Flame,
  Check,
  ChevronRight,
  Grid3X3,
  Presentation
} from 'lucide-react';
import { ModelHubModal } from '@/components/modals/ModelHubModal';
import { AuthModal } from '@/components/modals/AuthModal';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [isModelHubOpen, setIsModelHubOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [activeWorkflowStage, setActiveWorkflowStage] = useState<number>(0);

  const workflowStages = [
    {
      num: '01',
      id: 'question',
      name: 'Question',
      tagline: 'Multi-Model Interrogation',
      desc: 'Simultaneously query OpenAI GPT-4o, Claude 3.7 Sonnet, DeepSeek R1, and Gemini 2.5 Pro without prompt drift.',
      preview: {
        prompt: 'Should enterprise fintech adopt distributed ledger technology for cross-border settlement, or modernize centralized RTGS?',
        models: [
          { name: 'GPT-4o', stance: 'Highlights API integration ease, liquidity fragmentation risks, and legacy banking compliance.' },
          { name: 'Claude 3.7 Sonnet', stance: 'Stresses counterparty risk reduction, legal jurisdiction asymmetry, and governance overhead.' },
          { name: 'DeepSeek R1', stance: 'Calculates cryptographic finality latency vs. optimistic batch rollups mathematically.' },
          { name: 'Gemini 2.5 Pro', stance: 'Cross-references Project Agorá BIS trials and real-time ISO 20022 messaging telemetry.' }
        ]
      }
    },
    {
      num: '02',
      id: 'investigate',
      name: 'Investigate',
      tagline: 'Deep Evidence Sourcing',
      desc: 'Autonomous 6-stage web research and citation verification to ground assertions in audited empirical truth.',
      preview: {
        finding: 'BIS Project Agorá trial showed 64% settlement speed improvement with wholesale CBDCs, but 12% liquidity overhead in testnets.'
      }
    },
    {
      num: '03',
      id: 'cross-examine',
      name: 'Cross-Examine',
      tagline: 'Adversarial Multi-Model Debate',
      desc: 'Models take opposing roles (Advocate vs Opponent vs Analyst vs Fact-Checker) across 4 rigorous judicial rounds.',
      preview: {
        verdict: 'Judge Verdict: Hybrid model wins. Centralized liquidity clearing with decentralized cross-chain atomic swaps.'
      }
    },
    {
      num: '04',
      id: 'map',
      name: 'Map',
      tagline: 'Intelligence, Conflicts & Gaps',
      desc: 'Graph interconnected claims, pinpoint exact areas of model disagreement, and audit hidden blind spots.',
      preview: {
        nodes: '14 Claims Mapped',
        conflicts: '2 Critical Disagreements (Capital Efficiency vs Latency)',
        blindSpots: 'FX Slippage Volatility under extreme market stress'
      }
    },
    {
      num: '05',
      id: 'stress-test',
      name: 'Stress-Test',
      tagline: 'Adversarial Red-Teaming',
      desc: 'Karl Popper falsification tests and failure mode simulations actively attempting to disprove the consensus.',
      preview: {
        attack: 'Failure Mode: Validator collusion under sudden sovereign regulatory bans yields 84% capital freeze risk.'
      }
    },
    {
      num: '06',
      id: 'synthesize',
      name: 'Synthesize',
      tagline: 'Triangulated Master Verdict',
      desc: 'Extract invariant core consensus, isolate genuine model divergence, and index factual certainty.',
      preview: {
        consensus: '92% Consensus on Phase 1 ISO 20022 messaging modernization, deferring full DLT settlement to Phase 2.'
      }
    },
    {
      num: '07',
      id: 'decide',
      name: 'Decide',
      tagline: 'Weighted Multi-Criteria Decision Lab',
      desc: 'Interactive factor sliders (Cost, Security, Speed, Regulatory) and what-if simulation for executive decisions.',
      preview: {
        recommendation: 'Strategy B (Hybrid ISO 20022 + Atomic Swaps) leads with 88.4/100 Weighted Utility Score.'
      }
    }
  ];

  const currentStage = workflowStages[activeWorkflowStage];

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-cyan-500/30 selection:text-cyan-100 relative overflow-hidden">
      {/* Ambient Quantum Particles and Matrix Field */}
      <QuantumParticles density="high" />

      <Header
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenModelHub={() => setIsModelHubOpen(true)}
      />

      {/* Hero Section */}
      <section className="relative pt-12 md:pt-20 pb-16 px-4 md:px-8 max-w-7xl mx-auto w-full text-center flex flex-col items-center">
        {/* Positioning Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyan-500/40 bg-cyan-950/40 mb-6 text-xs font-mono text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.2)] backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span className="font-semibold tracking-wider uppercase">AETHEL COGNITIVE LABS · QUANTUM MULTI-MODEL INTELLIGENCE</span>
        </div>

        {/* Hero Headline */}
        <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground max-w-5xl leading-[1.1] mb-6">
          Turn Multiple AI Perspectives<br />
          <span className="italic font-normal holographic-text">Into Structured Intelligence.</span>
        </h1>

        {/* Supporting Copy */}
        <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-3xl leading-relaxed mb-8">
          Beyond single-model blind spots. AETHEL COGNITIVE LABS orchestrates frontier models through a 7-stage cognitive matrix—mapping evidence, exposing model disagreements, auditing assumptions, stress-testing conclusions, and simulating decisions.
        </p>

        {/* Hero CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-16">
          <Button
            size="lg"
            onClick={() => navigate('/app?mode=intelligencemap')}
            className="h-11 px-6 text-sm font-medium bg-gradient-to-r from-cyan-500 via-sky-500 to-violet-600 text-white hover:opacity-90 shadow-[0_0_20px_rgba(6,182,212,0.4)] border-0 gap-2"
          >
            <span>Enter Intelligence Lab</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => navigate('/app?mode=decisionlab')}
            className="h-11 px-6 text-sm font-medium border-cyan-500/30 bg-card/80 hover:bg-muted backdrop-blur-md gap-2"
          >
            <SlidersHorizontal className="w-4 h-4 text-cyan-400" />
            <span>Open Decision Lab</span>
          </Button>
          <Button
            size="lg"
            variant="ghost"
            onClick={() => navigate('/app?mode=imagelab')}
            className="h-11 px-4 text-sm font-medium hover:bg-muted gap-2 text-muted-foreground"
          >
            <ImageIcon className="w-4 h-4 text-pink-500" />
            <span>Image Lab</span>
          </Button>
        </div>

        {/* Interactive 7-Stage Workflow Pipeline Showcase */}
        <div className="w-full max-w-5xl bg-card border border-border rounded-2xl p-4 md:p-8 shadow-2xl text-left relative overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-border gap-2">
            <div className="flex items-center gap-2">
              <ParallaxLogo size={22} />
              <div>
                <span className="font-serif font-bold text-sm block">
                  The 7-Stage Intelligence Laboratory Workflow
                </span>
                <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
                  Continuous Cognitive Triangulation Pipeline
                </span>
              </div>
            </div>
            <Badge variant="outline" className="font-mono text-[10px] bg-primary/10 text-primary border-primary/30 w-fit">
              Stage {currentStage.num} of 07
            </Badge>
          </div>

          {/* Stepper Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-1.5 my-4 overflow-x-auto">
            {workflowStages.map((st, idx) => (
              <button
                key={st.id}
                onClick={() => setActiveWorkflowStage(idx)}
                className={`p-2 rounded-lg text-left transition-all border ${
                  activeWorkflowStage === idx
                    ? 'bg-primary text-primary-foreground border-primary shadow-sm font-semibold'
                    : 'bg-muted/20 border-border/60 text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
              >
                <div className="font-mono text-[10px] opacity-70 mb-0.5">{st.num}</div>
                <div className="text-xs font-serif leading-tight">{st.name}</div>
              </button>
            ))}
          </div>

          {/* Active Stage Inspector Box */}
          <div className="p-4 md:p-6 rounded-xl bg-muted/30 border border-border space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/60 pb-3">
              <div>
                <span className="font-mono text-xs uppercase text-primary font-bold tracking-wider">
                  Stage {currentStage.num}: {currentStage.name}
                </span>
                <h3 className="text-base sm:text-lg font-serif font-bold text-foreground">
                  {currentStage.tagline}
                </h3>
              </div>
              <Button
                size="sm"
                onClick={() => navigate(`/app?mode=${currentStage.id === 'question' ? 'compare' : currentStage.id === 'investigate' ? 'research' : currentStage.id === 'cross-examine' ? 'debate' : currentStage.id === 'map' ? 'intelligencemap' : currentStage.id === 'stress-test' ? 'redteam' : currentStage.id === 'synthesize' ? 'synthesis' : 'decisionlab'}`)}
                className="text-xs shrink-0 bg-primary text-primary-foreground gap-1.5"
              >
                <span>Launch {currentStage.name} Engine</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Button>
            </div>

            <p className="text-xs sm:text-sm text-muted-foreground">
              {currentStage.desc}
            </p>

            {/* Stage Dynamic Interactive Mock */}
            {currentStage.id === 'question' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 pt-2">
                {currentStage.preview.models?.map(m => (
                  <div key={m.name} className="p-3 rounded-lg bg-card border border-border text-xs space-y-1">
                    <span className="font-mono font-bold text-primary block">{m.name}</span>
                    <p className="text-muted-foreground text-[11px]">{m.stance}</p>
                  </div>
                ))}
              </div>
            )}

            {currentStage.id === 'map' && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
                <div className="p-3 rounded-lg bg-card border border-border">
                  <Network className="w-4 h-4 text-primary mb-1" />
                  <span className="font-semibold block text-foreground">Claim Network</span>
                  <p className="text-muted-foreground text-[11px]">{currentStage.preview.nodes}</p>
                </div>
                <div className="p-3 rounded-lg bg-card border border-border">
                  <GitCommit className="w-4 h-4 text-rose-400 mb-1" />
                  <span className="font-semibold block text-foreground">Conflict Taxonomy</span>
                  <p className="text-muted-foreground text-[11px]">{currentStage.preview.conflicts}</p>
                </div>
                <div className="p-3 rounded-lg bg-card border border-border">
                  <EyeOff className="w-4 h-4 text-purple-400 mb-1" />
                  <span className="font-semibold block text-foreground">Blind-Spot Audit</span>
                  <p className="text-muted-foreground text-[11px]">{currentStage.preview.blindSpots}</p>
                </div>
              </div>
            )}

            {currentStage.id === 'stress-test' && (
              <div className="p-3.5 rounded-lg bg-rose-950/20 border border-rose-600/30 text-xs space-y-1">
                <span className="font-mono font-bold text-rose-400 flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-rose-500" />
                  Adversarial Red-Team Probe:
                </span>
                <p className="text-foreground">{currentStage.preview.attack}</p>
              </div>
            )}

            {currentStage.id === 'decide' && (
              <div className="p-3.5 rounded-lg bg-indigo-950/20 border border-indigo-600/30 text-xs space-y-1">
                <span className="font-mono font-bold text-indigo-400 flex items-center gap-1.5">
                  <SlidersHorizontal className="w-3.5 h-3.5 text-indigo-400" />
                  Optimal Strategy Recommended:
                </span>
                <p className="text-foreground">{currentStage.preview.recommendation}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Signature Capabilities Grid */}
      <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <Badge variant="outline" className="font-mono text-xs uppercase bg-primary/10 text-primary border-primary/30">
            Laboratory Capabilities
          </Badge>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold">
            9 Signature Intelligence Modules
          </h2>
          <p className="text-sm text-muted-foreground">
            Transform ambiguous, contradictory model opinions into rigorous, actionable decisions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* 1. Intelligence Map */}
          <div className="p-6 rounded-2xl border border-border bg-card hover:border-primary/50 transition-all space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                <Network className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold">Intelligence Map</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Graph interconnected claims, evidence nodes, model stances, and conclusion dependencies in an interactive visual lattice.
              </p>
            </div>
            <Link to="/app?mode=intelligencemap" className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline">
              <span>Explore Intelligence Map</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* 2. Conflict Map */}
          <div className="p-6 rounded-2xl border border-border bg-card hover:border-rose-500/50 transition-all space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
                <GitCommit className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold">Conflict Map</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Pinpoint exact disagreements between GPT-4o, Claude 3.7, DeepSeek, and Gemini with empirical resolution pathways.
              </p>
            </div>
            <Link to="/app?mode=conflictmap" className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-400 hover:underline">
              <span>View Conflict Taxonomy</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* 3. Uncertainty Map */}
          <div className="p-6 rounded-2xl border border-border bg-card hover:border-amber-500/50 transition-all space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                <HelpCircle className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold">Uncertainty Map</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Expose epistemic gaps, weak empirical sources, uncalibrated confidence intervals, and fragile data dependencies.
              </p>
            </div>
            <Link to="/app?mode=uncertaintymap" className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400 hover:underline">
              <span>Audit Uncertainties</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* 4. Blind-Spot Detection */}
          <div className="p-6 rounded-2xl border border-border bg-card hover:border-purple-500/50 transition-all space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                <EyeOff className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold">Blind-Spot Detection</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Surface critical real-world factors, systemic externalities, and second-order consequences all models failed to mention.
              </p>
            </div>
            <Link to="/app?mode=blindspot" className="inline-flex items-center gap-1.5 text-xs font-semibold text-purple-400 hover:underline">
              <span>Detect Blind Spots</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* 5. Decision Lab */}
          <div className="p-6 rounded-2xl border border-border bg-card hover:border-indigo-500/50 transition-all space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                <SlidersHorizontal className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold">Decision Lab</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Evaluate strategic options against customized criteria with transparent user-weighted utility sliders.
              </p>
            </div>
            <Link to="/app?mode=decisionlab" className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-400 hover:underline">
              <span>Open Decision Matrix</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* 6. Scenario Lab */}
          <div className="p-6 rounded-2xl border border-border bg-card hover:border-cyan-500/50 transition-all space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                <Compass className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold">Scenario Lab</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Adjust external variables (query scale, cost sensitivity, regulatory stringency) to simulate what-if outcomes.
              </p>
            </div>
            <Link to="/app?mode=scenariolab" className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:underline">
              <span>Simulate What-If</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* 7. Red Team */}
          <div className="p-6 rounded-2xl border border-border bg-card hover:border-rose-600/50 transition-all space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-rose-600/10 border border-rose-600/20 flex items-center justify-center text-rose-500">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold">Adversarial Red Team</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Deploy counter-theses, simulate catastrophic failure modes, and define Popperian falsification thresholds.
              </p>
            </div>
            <Link to="/app?mode=redteam" className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-500 hover:underline">
              <span>Deploy Red Team</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* 8. Assumption Audit */}
          <div className="p-6 rounded-2xl border border-border bg-card hover:border-emerald-500/50 transition-all space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <CheckSquare className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold">Assumption Audit</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Expose implicit premises, benchmark fragility indices, and interactively contest unverified presuppositions.
              </p>
            </div>
            <Link to="/app?mode=assumptionaudit" className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 hover:underline">
              <span>Audit Assumptions</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* 9. Intelligence Report */}
          <div className="p-6 rounded-2xl border border-border bg-card hover:border-primary/50 transition-all space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold">Intelligence Report</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Compile executive intelligence briefs with multi-model triangulation, conflict breakdowns, and PDF/JSON export.
              </p>
            </div>
            <Link to="/app?mode=intelligencereport" className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline">
              <span>Compile Executive Dossier</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* 10. AI Benchmark Arena */}
          <div className="p-6 rounded-2xl border border-border bg-card hover:border-amber-500/50 transition-all space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500">
                <Swords className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold">Benchmark Arena</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Rank frontier foundation models head-to-head on Reasoning, Algorithmic Coding, Creative Synthesis, and Custom rubrics.
              </p>
            </div>
            <Link to="/app?mode=arena" className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-500 hover:underline">
              <span>Enter Benchmark Arena</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* 11. Prompt Matrix Sandbox */}
          <div className="p-6 rounded-2xl border border-border bg-card hover:border-violet-500/50 transition-all space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400">
                <Grid3X3 className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold">Prompt Matrix Sandbox</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Systematic N×M prompt parametric sweep across model variants and temperatures with one-click CSV matrix export.
              </p>
            </div>
            <Link to="/app?mode=matrix" className="inline-flex items-center gap-1.5 text-xs font-semibold text-violet-400 hover:underline">
              <span>Open Matrix Sandbox</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* 12. Executive Briefing Deck */}
          <div className="p-6 rounded-2xl border border-border bg-card hover:border-emerald-500/50 transition-all space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <Presentation className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold">Executive Briefing Builder</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Transform session intelligence into executive 16:9 presentation slide decks with key metrics and PDF export.
              </p>
            </div>
            <Link to="/app?mode=briefing" className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 hover:underline">
              <span>Build Slide Deck</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Differentiation Comparison Table */}
      <section className="py-16 px-4 md:px-8 max-w-6xl mx-auto w-full relative z-10">
        <div className="p-6 md:p-8 rounded-2xl bg-card/80 backdrop-blur-xl border border-cyan-500/20 shadow-[0_0_30px_rgba(6,182,212,0.1)] space-y-6">
          <div className="text-center space-y-2">
            <h3 className="font-serif text-xl md:text-2xl font-bold">Why AETHEL is Not Another Chatbot Aggregator</h3>
            <p className="text-xs md:text-sm text-muted-foreground max-w-xl mx-auto">
              Comparing traditional single chatbots, basic multi-model aggregators, and the AETHEL Cognitive Decision Matrix.
            </p>
          </div>

          <div className="w-full overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="border-b border-border text-muted-foreground font-mono">
                  <th className="p-3 whitespace-nowrap">Capability Dimension</th>
                  <th className="p-3 whitespace-nowrap">Single AI Chatbot</th>
                  <th className="p-3 whitespace-nowrap">Chat Aggregator</th>
                  <th className="p-3 whitespace-nowrap text-cyan-400 font-bold bg-cyan-950/30 border-l border-r border-cyan-500/30">AETHEL Intelligence Lab</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                <tr>
                  <td className="p-3 font-medium whitespace-nowrap">Perspective Synthesis</td>
                  <td className="p-3 text-muted-foreground whitespace-nowrap">Single model bias</td>
                  <td className="p-3 text-muted-foreground whitespace-nowrap">Side-by-side text columns</td>
                  <td className="p-3 font-semibold text-cyan-300 bg-cyan-950/20 border-l border-r border-cyan-500/20 whitespace-nowrap">Triangulated consensus & conflict taxonomy</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium whitespace-nowrap">Cognitive Workflow</td>
                  <td className="p-3 text-muted-foreground whitespace-nowrap">Unstructured chat turn</td>
                  <td className="p-3 text-muted-foreground whitespace-nowrap">Isolated query dispatch</td>
                  <td className="p-3 font-semibold text-cyan-300 bg-cyan-950/20 border-l border-r border-cyan-500/20 whitespace-nowrap">7-Stage Pipeline (Question → Decide)</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium whitespace-nowrap">Adversarial Stress-Testing</td>
                  <td className="p-3 text-muted-foreground whitespace-nowrap">None (sycophancy)</td>
                  <td className="p-3 text-muted-foreground whitespace-nowrap">Manual prompt switching</td>
                  <td className="p-3 font-semibold text-cyan-300 bg-cyan-950/20 border-l border-r border-cyan-500/20 whitespace-nowrap">Automated Red Team & Karl Popper falsification</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium whitespace-nowrap">Decision Evaluation</td>
                  <td className="p-3 text-muted-foreground whitespace-nowrap">Subjective text opinion</td>
                  <td className="p-3 text-muted-foreground whitespace-nowrap">No structured matrix</td>
                  <td className="p-3 font-semibold text-cyan-300 bg-cyan-950/20 border-l border-r border-cyan-500/20 whitespace-nowrap">Weighted multi-criteria decision matrix & sliders</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium whitespace-nowrap">What-If Simulation</td>
                  <td className="p-3 text-muted-foreground whitespace-nowrap">Static generation</td>
                  <td className="p-3 text-muted-foreground whitespace-nowrap">Static generation</td>
                  <td className="p-3 font-semibold text-cyan-300 bg-cyan-950/20 border-l border-r border-cyan-500/20 whitespace-nowrap">Scenario Lab with real-time variable sliders</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Footer with Curio Network Endorsement */}
      <footer className="mt-auto border-t border-border/80 bg-card/60 backdrop-blur-md py-10 px-4 md:px-8 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-3">
            <AethelLogo size={24} showWordmark={true} />
            <span className="hidden sm:inline border-l border-border/80 pl-3 font-mono text-[11px] text-cyan-400/80">
              Turn multiple AI perspectives into structured intelligence.
            </span>
          </div>

          <div className="flex items-center gap-4 font-mono text-[11px]">
            <Link to="/dashboard" className="hover:text-cyan-400 transition-colors">Dashboard</Link>
            <button onClick={() => setIsModelHubOpen(true)} className="hover:text-cyan-400 transition-colors">Model Hub</button>
            <button onClick={() => setIsAuthOpen(true)} className="hover:text-cyan-400 transition-colors">Account</button>
            <span className="text-foreground/80 font-medium">A Curio Network product</span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <ModelHubModal open={isModelHubOpen} onOpenChange={setIsModelHubOpen} />
      <AuthModal open={isAuthOpen} onOpenChange={setIsAuthOpen} />
    </div>
  );
};

export default LandingPage;
