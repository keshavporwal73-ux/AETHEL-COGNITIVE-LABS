import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useParallax } from '@/contexts/ParallaxContext';
import { WorkspaceMode } from '@/types/parallax';
import { Header } from '@/components/layout/Header';
import { LeftSidebar } from '@/components/layout/LeftSidebar';
import { RightInspectorPanel } from '@/components/layout/RightInspectorPanel';
import { MobileBottomNav } from '@/components/layout/MobileBottomNav';
import { UniversalPromptComposer } from '@/components/composer/UniversalPromptComposer';
import { MultiModelLoadingState } from '@/components/common/MultiModelLoadingState';
import { QuantumParticles, QuantumBeam } from '@/components/common/QuantumParticles';
import { CompareView } from '@/components/views/CompareView';
import { SynthesisView } from '@/components/views/SynthesisView';
import { ImageLabView } from '@/components/views/ImageLabView';
import { DebateView } from '@/components/views/DebateView';
import { FactCheckView } from '@/components/views/FactCheckView';
import { ResearchView } from '@/components/views/ResearchView';
import { FileAnalysisView } from '@/components/views/FileAnalysisView';
import { IntelligenceMapView } from '@/components/views/IntelligenceMapView';
import { ConflictMapView } from '@/components/views/ConflictMapView';
import { UncertaintyMapView } from '@/components/views/UncertaintyMapView';
import { BlindSpotView } from '@/components/views/BlindSpotView';
import { AssumptionAuditView } from '@/components/views/AssumptionAuditView';
import { DecisionLabView } from '@/components/views/DecisionLabView';
import { ScenarioLabView } from '@/components/views/ScenarioLabView';
import { RedTeamView } from '@/components/views/RedTeamView';
import { IntelligenceReportView } from '@/components/views/IntelligenceReportView';
import { ArenaView } from '@/components/views/ArenaView';
import { PromptMatrixView } from '@/components/views/PromptMatrixView';
import { ExecutiveBriefingView } from '@/components/views/ExecutiveBriefingView';
import { TelemetryView } from '@/components/views/TelemetryView';
import { QuantumMindMapView } from '@/components/views/QuantumMindMapView';
import { AiPersonaChatView } from '@/components/views/AiPersonaChatView';
import { TemporalTrackerView } from '@/components/views/TemporalTrackerView';
import { CollaborateModal } from '@/components/modals/CollaborateModal';
import { WorkflowStepper } from '@/components/common/WorkflowStepper';
import { ModelHubModal } from '@/components/modals/ModelHubModal';
import { AuthModal } from '@/components/modals/AuthModal';
import { SettingsModal } from '@/components/modals/SettingsModal';
import { Sheet, SheetContent } from '@/components/ui/sheet';

export const WorkspacePage: React.FC = () => {
  const { 
    activeMode, 
    setActiveMode, 
    isSidebarOpen, 
    isRightPanelOpen,
    isGenerating,
    selectedTextModelIds,
    selectedImageModelIds 
  } = useParallax();

  const [searchParams] = useSearchParams();
  const [isModelHubOpen, setIsModelHubOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  // Sync mode query parameter
  useEffect(() => {
    const modeParam = searchParams.get('mode') as WorkspaceMode;
    if (modeParam && ['compare', 'synthesis', 'debate', 'factcheck', 'research', 'imagelab', 'fileanalysis'].includes(modeParam)) {
      setActiveMode(modeParam);
    }
  }, [searchParams, setActiveMode]);

  const activeModelIds = activeMode === 'imagelab' ? selectedImageModelIds : selectedTextModelIds;

  return (
    <div className="flex flex-col h-screen w-full bg-background text-foreground overflow-hidden">
      {/* Top Header */}
      <Header
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenModelHub={() => setIsModelHubOpen(true)}
        onToggleMobileNav={() => setIsMobileNavOpen(true)}
      />

      {/* Main 3-Column Layout */}
      <div className="flex-1 flex w-full min-h-0 relative overflow-hidden">
        <QuantumParticles density="low" />
        <QuantumBeam />

        {/* Left Navigation Sidebar (Desktop) */}
        {isSidebarOpen && (
          <div className="hidden md:block h-full shrink-0">
            <LeftSidebar
              onOpenModelHub={() => setIsModelHubOpen(true)}
              onOpenSettings={() => setIsSettingsOpen(true)}
            />
          </div>
        )}

        {/* Center Main Workspace Area */}
        <main className="flex-1 min-w-0 flex flex-col h-full overflow-hidden bg-background">
          {/* 7-Stage Intelligence Laboratory Workflow Bar */}
          <WorkflowStepper />

          {/* Scrollable Output View Area */}
          <div className="flex-1 overflow-y-auto px-4 md:px-8 py-6 pb-36">
            <div className="max-w-6xl mx-auto w-full">
              {/* Thinking / Loading Animation State */}
              {isGenerating && (
                <MultiModelLoadingState modelIds={activeModelIds} mode={activeMode} />
              )}

              {/* Dynamic View Component Render */}
              {activeMode === 'compare' && <CompareView />}
              {activeMode === 'synthesis' && <SynthesisView />}
              {activeMode === 'imagelab' && <ImageLabView />}
              {activeMode === 'debate' && <DebateView />}
              {activeMode === 'factcheck' && <FactCheckView />}
              {activeMode === 'research' && <ResearchView />}
              {activeMode === 'fileanalysis' && <FileAnalysisView />}
              
              {/* Decision & Intelligence Laboratory Suite */}
              {activeMode === 'intelligencemap' && <IntelligenceMapView />}
              {activeMode === 'conflictmap' && <ConflictMapView />}
              {activeMode === 'uncertaintymap' && <UncertaintyMapView />}
              {activeMode === 'blindspot' && <BlindSpotView />}
              {activeMode === 'assumptionaudit' && <AssumptionAuditView />}
              {activeMode === 'decisionlab' && <DecisionLabView />}
              {activeMode === 'scenariolab' && <ScenarioLabView />}
              {activeMode === 'redteam' && <RedTeamView />}
              {activeMode === 'intelligencereport' && <IntelligenceReportView />}

              {/* Advanced Benchmarking & Presentation Suite */}
              {activeMode === 'arena' && <ArenaView />}
              {activeMode === 'matrix' && <PromptMatrixView />}
              {activeMode === 'briefing' && <ExecutiveBriefingView />}
              {activeMode === 'telemetry' && <TelemetryView />}
              {activeMode === 'quantummindmap' && <QuantumMindMapView />}
              {activeMode === 'personachat' && <AiPersonaChatView />}
              {activeMode === 'temporaltrack' && <TemporalTrackerView />}
            </div>
          </div>

          {/* Floating Universal Prompt Composer (Sticky Bottom) */}
          <div className="absolute bottom-4 md:bottom-6 left-0 right-0 px-4 md:px-8 pointer-events-none z-30">
            <div className="max-w-4xl mx-auto pointer-events-auto">
              <UniversalPromptComposer onOpenModelHub={() => setIsModelHubOpen(true)} />
            </div>
          </div>
        </main>

        {/* Right Model Inspector / Telemetry Panel (Desktop XL) */}
        {isRightPanelOpen && (
          <div className="hidden xl:block h-full shrink-0">
            <RightInspectorPanel onOpenModelHub={() => setIsModelHubOpen(true)} />
          </div>
        )}
      </div>

      {/* Collaborative Workspace Modal */}
      <CollaborateModal />

      {/* Mobile Bottom Navigation Bar */}
      <MobileBottomNav
        onOpenModelHub={() => setIsModelHubOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />

      {/* Mobile Sidebar Sheet Drawer */}
      <Sheet open={isMobileNavOpen} onOpenChange={setIsMobileNavOpen}>
        <SheetContent side="left" className="p-0 w-72 bg-sidebar border-sidebar-border">
          <LeftSidebar
            onOpenModelHub={() => { setIsMobileNavOpen(false); setIsModelHubOpen(true); }}
            onOpenSettings={() => { setIsMobileNavOpen(false); setIsSettingsOpen(true); }}
          />
        </SheetContent>
      </Sheet>

      {/* Global Modals */}
      <ModelHubModal open={isModelHubOpen} onOpenChange={setIsModelHubOpen} />
      <AuthModal open={isAuthOpen} onOpenChange={setIsAuthOpen} />
      <SettingsModal open={isSettingsOpen} onOpenChange={setIsSettingsOpen} />
    </div>
  );
};

export default WorkspacePage;
