import React, { useState } from 'react';
import { useParallax } from '@/contexts/ParallaxContext';
import { WorkspaceMode } from '@/types/parallax';
import { 
  SplitSquareVertical, 
  Sparkles, 
  Image as ImageIcon, 
  Swords, 
  Menu,
  Plus,
  BookOpen,
  CheckCircle2,
  BarChart3,
  Sliders,
  Settings,
  Compass,
  SlidersHorizontal,
  ShieldAlert,
  GitCommit,
  HelpCircle,
  EyeOff,
  CheckSquare,
  FileText
} from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { ParallaxLogo } from '@/components/common/ParallaxLogo';
import { useNavigate } from 'react-router-dom';

export const MobileBottomNav: React.FC<{ onOpenModelHub?: () => void; onOpenSettings?: () => void }> = ({
  onOpenModelHub,
  onOpenSettings
}) => {
  const { activeMode, setActiveMode, createNewSession } = useParallax();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleModeChange = (mode: WorkspaceMode) => {
    setActiveMode(mode);
    navigate(`/app?mode=${mode}`);
    setIsMenuOpen(false);
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-lg border-t border-border px-3 py-1.5 flex items-center justify-around">
      <button
        onClick={() => handleModeChange('intelligencemap')}
        className={`flex flex-col items-center gap-1 py-1 px-2 rounded-lg text-[10px] font-medium transition-colors ${
          activeMode === 'intelligencemap' ? 'text-accent' : 'text-muted-foreground'
        }`}
      >
        <Compass className="w-4 h-4" />
        <span>Intel Map</span>
      </button>

      <button
        onClick={() => handleModeChange('decisionlab')}
        className={`flex flex-col items-center gap-1 py-1 px-2 rounded-lg text-[10px] font-medium transition-colors ${
          activeMode === 'decisionlab' ? 'text-accent' : 'text-muted-foreground'
        }`}
      >
        <SlidersHorizontal className="w-4 h-4" />
        <span>Decision</span>
      </button>

      {/* Central Quick Prompt Action */}
      <button
        onClick={() => createNewSession(activeMode)}
        className="w-10 h-10 -mt-4 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg border border-border shrink-0"
        aria-label="New Session"
      >
        <Plus className="w-5 h-5" />
      </button>

      <button
        onClick={() => handleModeChange('redteam')}
        className={`flex flex-col items-center gap-1 py-1 px-2 rounded-lg text-[10px] font-medium transition-colors ${
          activeMode === 'redteam' ? 'text-accent' : 'text-muted-foreground'
        }`}
      >
        <ShieldAlert className="w-4 h-4" />
        <span>Red Team</span>
      </button>

      {/* Slide-out Menu for all laboratory tools */}
      <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
        <SheetTrigger asChild>
          <button className="flex flex-col items-center gap-1 py-1 px-2 rounded-lg text-[10px] font-medium text-muted-foreground">
            <Menu className="w-4 h-4" />
            <span>Suite</span>
          </button>
        </SheetTrigger>
        <SheetContent side="bottom" className="max-h-[85dvh] overflow-y-auto bg-card rounded-t-2xl p-4">
          <SheetHeader className="pb-3 border-b border-border text-left">
            <div className="flex items-center justify-between">
              <ParallaxLogo size={22} showWordmark={true} />
            </div>
            <SheetTitle className="text-xs text-muted-foreground font-normal">
              AI Decision & Intelligence Laboratory Suite
            </SheetTitle>
          </SheetHeader>

          <div className="py-3">
            <p className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground mb-2 px-1">
              Intelligence Laboratory
            </p>
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                onClick={() => handleModeChange('intelligencemap')}
                className="h-auto p-2.5 flex flex-col items-start gap-1 justify-start text-left bg-muted/30 border-border"
              >
                <Compass className="w-3.5 h-3.5 text-accent" />
                <span className="font-semibold text-xs">Intelligence Map</span>
                <span className="text-[9px] text-muted-foreground">Claims, evidence & lattice</span>
              </Button>

              <Button
                variant="outline"
                onClick={() => handleModeChange('conflictmap')}
                className="h-auto p-2.5 flex flex-col items-start gap-1 justify-start text-left bg-muted/30 border-border"
              >
                <GitCommit className="w-3.5 h-3.5 text-amber-500" />
                <span className="font-semibold text-xs">Conflict Map</span>
                <span className="text-[9px] text-muted-foreground">Disagreements & why</span>
              </Button>

              <Button
                variant="outline"
                onClick={() => handleModeChange('uncertaintymap')}
                className="h-auto p-2.5 flex flex-col items-start gap-1 justify-start text-left bg-muted/30 border-border"
              >
                <HelpCircle className="w-3.5 h-3.5 text-blue-500" />
                <span className="font-semibold text-xs">Uncertainty Map</span>
                <span className="text-[9px] text-muted-foreground">Unknowns & weak points</span>
              </Button>

              <Button
                variant="outline"
                onClick={() => handleModeChange('blindspot')}
                className="h-auto p-2.5 flex flex-col items-start gap-1 justify-start text-left bg-muted/30 border-border"
              >
                <EyeOff className="w-3.5 h-3.5 text-purple-500" />
                <span className="font-semibold text-xs">Blind Spots</span>
                <span className="text-[9px] text-muted-foreground">Overlooked variables</span>
              </Button>

              <Button
                variant="outline"
                onClick={() => handleModeChange('assumptionaudit')}
                className="h-auto p-2.5 flex flex-col items-start gap-1 justify-start text-left bg-muted/30 border-border"
              >
                <CheckSquare className="w-3.5 h-3.5 text-emerald-500" />
                <span className="font-semibold text-xs">Assumption Audit</span>
                <span className="text-[9px] text-muted-foreground">Fragility & vulnerability</span>
              </Button>

              <Button
                variant="outline"
                onClick={() => handleModeChange('decisionlab')}
                className="h-auto p-2.5 flex flex-col items-start gap-1 justify-start text-left bg-muted/30 border-border"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-accent" />
                <span className="font-semibold text-xs">Decision Lab</span>
                <span className="text-[9px] text-muted-foreground">Weighted factor matrix</span>
              </Button>

              <Button
                variant="outline"
                onClick={() => handleModeChange('scenariolab')}
                className="h-auto p-2.5 flex flex-col items-start gap-1 justify-start text-left bg-muted/30 border-border"
              >
                <Sliders className="w-3.5 h-3.5 text-cyan-500" />
                <span className="font-semibold text-xs">Scenario Lab</span>
                <span className="text-[9px] text-muted-foreground">What-If assumption test</span>
              </Button>

              <Button
                variant="outline"
                onClick={() => handleModeChange('redteam')}
                className="h-auto p-2.5 flex flex-col items-start gap-1 justify-start text-left bg-muted/30 border-border"
              >
                <ShieldAlert className="w-3.5 h-3.5 text-red-500" />
                <span className="font-semibold text-xs">Red Team</span>
                <span className="text-[9px] text-muted-foreground">Adversarial stress-test</span>
              </Button>

              <Button
                variant="outline"
                onClick={() => handleModeChange('intelligencereport')}
                className="h-auto p-2.5 flex flex-col items-start gap-1 justify-start text-left bg-muted/30 border-border col-span-2"
              >
                <FileText className="w-3.5 h-3.5 text-accent" />
                <span className="font-semibold text-xs">Intelligence Dossier Report</span>
                <span className="text-[9px] text-muted-foreground">Executive synthesized intelligence brief</span>
              </Button>

              <Button
                variant="outline"
                onClick={() => handleModeChange('arena')}
                className="h-auto p-2.5 flex flex-col items-start gap-1 justify-start text-left bg-amber-500/10 border-amber-500/30 text-amber-500"
              >
                <Swords className="w-3.5 h-3.5" />
                <span className="font-semibold text-xs">Benchmark Arena</span>
                <span className="text-[9px] text-muted-foreground">Head-to-head model ranks</span>
              </Button>

              <Button
                variant="outline"
                onClick={() => handleModeChange('matrix')}
                className="h-auto p-2.5 flex flex-col items-start gap-1 justify-start text-left bg-violet-500/10 border-violet-500/30 text-violet-400"
              >
                <Sliders className="w-3.5 h-3.5" />
                <span className="font-semibold text-xs">Prompt Matrix</span>
                <span className="text-[9px] text-muted-foreground">N×M variant sweep</span>
              </Button>

              <Button
                variant="outline"
                onClick={() => handleModeChange('briefing')}
                className="h-auto p-2.5 flex flex-col items-start gap-1 justify-start text-left bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
              >
                <FileText className="w-3.5 h-3.5" />
                <span className="font-semibold text-xs">Executive Briefing</span>
                <span className="text-[9px] text-muted-foreground">16:9 Presentation slides</span>
              </Button>

              <Button
                variant="outline"
                onClick={() => handleModeChange('telemetry')}
                className="h-auto p-2.5 flex flex-col items-start gap-1 justify-start text-left bg-cyan-500/10 border-cyan-500/30 text-cyan-400"
              >
                <BarChart3 className="w-3.5 h-3.5" />
                <span className="font-semibold text-xs">Live Telemetry</span>
                <span className="text-[9px] text-muted-foreground">Real-time throughput & drift</span>
              </Button>
            </div>
          </div>

          <div className="py-3 border-t border-border">
            <p className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground mb-2 px-1">
              Perspective Engines & Tools
            </p>
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="ghost"
                onClick={() => handleModeChange('compare')}
                className="h-auto p-2 flex items-center gap-2 justify-start text-left text-xs"
              >
                <SplitSquareVertical className="w-3.5 h-3.5" />
                <span>Multi-Compare</span>
              </Button>

              <Button
                variant="ghost"
                onClick={() => handleModeChange('synthesis')}
                className="h-auto p-2 flex items-center gap-2 justify-start text-left text-xs"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Synthesis</span>
              </Button>

              <Button
                variant="ghost"
                onClick={() => handleModeChange('debate')}
                className="h-auto p-2 flex items-center gap-2 justify-start text-left text-xs"
              >
                <Swords className="w-3.5 h-3.5" />
                <span>AI Debate</span>
              </Button>

              <Button
                variant="ghost"
                onClick={() => handleModeChange('factcheck')}
                className="h-auto p-2 flex items-center gap-2 justify-start text-left text-xs"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Fact Check</span>
              </Button>

              <Button
                variant="ghost"
                onClick={() => handleModeChange('research')}
                className="h-auto p-2 flex items-center gap-2 justify-start text-left text-xs"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Deep Research</span>
              </Button>

              <Button
                variant="ghost"
                onClick={() => handleModeChange('imagelab')}
                className="h-auto p-2 flex items-center gap-2 justify-start text-left text-xs"
              >
                <ImageIcon className="w-3.5 h-3.5" />
                <span>Image Lab</span>
              </Button>
            </div>
          </div>

          <div className="pt-2 border-t border-border flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => { setIsMenuOpen(false); onOpenModelHub?.(); }}
              className="text-xs gap-1.5"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Model Hub</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => { setIsMenuOpen(false); navigate('/dashboard'); }}
              className="text-xs gap-1.5"
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Dashboard</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => { setIsMenuOpen(false); onOpenSettings?.(); }}
              className="text-xs gap-1.5"
            >
              <Settings className="w-3.5 h-3.5" />
              <span>Settings</span>
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};
