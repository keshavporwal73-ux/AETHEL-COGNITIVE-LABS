import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  WorkspaceMode, 
  IntelligenceStage,
  AIModel, 
  ModelResponse, 
  SynthesisOutput, 
  DebateSession, 
  FactCheckReport, 
  ResearchProject, 
  ImageGenerationResult, 
  SessionItem,
  UserUsageStats,
  IntelligenceMapData,
  ConflictMapData,
  UncertaintyMapData,
  BlindSpotReport,
  AssumptionAuditReport,
  DecisionLabData,
  ScenarioLabData,
  RedTeamDossier,
  IntelligenceReportData,
  ArenaBenchmarkRun,
  ArenaCategory,
  PromptMatrixGrid,
  ExecutiveBriefing,
  LiveTelemetryData,
  CollaboratorMember,
  SessionAnnotation
} from '@/types/parallax';
import { 
  AVAILABLE_TEXT_MODELS, 
  AVAILABLE_IMAGE_MODELS, 
  DEFAULT_SELECTED_TEXT_MODELS, 
  DEFAULT_SELECTED_IMAGE_MODELS 
} from '@/services/modelCatalog';
import { AIProviderEngine } from '@/services/aiProviderEngine';
import { toast } from 'sonner';

interface ParallaxContextType {
  // Navigation & Mode
  activeMode: WorkspaceMode;
  setActiveMode: (mode: WorkspaceMode) => void;
  currentWorkflowStage: IntelligenceStage;
  setCurrentWorkflowStage: (stage: IntelligenceStage) => void;
  goToStage: (stage: IntelligenceStage) => void;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
  isRightPanelOpen: boolean;
  setIsRightPanelOpen: (open: boolean) => void;

  // Active Session & Prompts
  currentSessionId: string;
  currentPrompt: string;
  setCurrentPrompt: (p: string) => void;
  isGenerating: boolean;
  isDemoMode: boolean;
  setIsDemoMode: (demo: boolean) => void;

  // Selected Models
  selectedTextModelIds: string[];
  setSelectedTextModelIds: (ids: string[]) => void;
  selectedImageModelIds: string[];
  setSelectedImageModelIds: (ids: string[]) => void;
  toggleTextModel: (id: string) => void;
  toggleImageModel: (id: string) => void;

  // Current Responses & Results
  textResponses: ModelResponse[];
  setTextResponses: React.Dispatch<React.SetStateAction<ModelResponse[]>>;
  synthesisResult: SynthesisOutput | null;
  setSynthesisResult: (s: SynthesisOutput | null) => void;
  debateSession: DebateSession | null;
  setDebateSession: (d: DebateSession | null) => void;
  factCheckReport: FactCheckReport | null;
  setFactCheckReport: (f: FactCheckReport | null) => void;
  researchProject: ResearchProject | null;
  setResearchProject: (r: ResearchProject | null) => void;
  imageResults: ImageGenerationResult[];
  setImageResults: React.Dispatch<React.SetStateAction<ImageGenerationResult[]>>;

  // Intelligence Suite Data & Controls
  intelligenceMapData: IntelligenceMapData | null;
  setIntelligenceMapData: (data: IntelligenceMapData | null) => void;
  conflictMapData: ConflictMapData | null;
  setConflictMapData: (data: ConflictMapData | null) => void;
  uncertaintyMapData: UncertaintyMapData | null;
  setUncertaintyMapData: (data: UncertaintyMapData | null) => void;
  blindSpotReport: BlindSpotReport | null;
  setBlindSpotReport: (data: BlindSpotReport | null) => void;
  assumptionAuditReport: AssumptionAuditReport | null;
  setAssumptionAuditReport: (data: AssumptionAuditReport | null) => void;
  updateAssumptionStatus: (id: string, status: 'Accepted' | 'Contested' | 'Requires Investigation') => void;
  
  decisionLabData: DecisionLabData | null;
  setDecisionLabData: (data: DecisionLabData | null) => void;
  updateDecisionFactorWeight: (factorId: string, weight: number) => void;
  addDecisionOption: (name: string, description: string) => void;
  removeDecisionOption: (optionId: string) => void;

  scenarioLabData: ScenarioLabData | null;
  setScenarioLabData: (data: ScenarioLabData | null) => void;
  updateScenarioVariableValue: (varId: string, value: number) => void;
  applyScenarioPreset: (presetName: string) => void;

  redTeamDossier: RedTeamDossier | null;
  setRedTeamDossier: (data: RedTeamDossier | null) => void;
  
  intelligenceReportData: IntelligenceReportData | null;
  setIntelligenceReportData: (data: IntelligenceReportData | null) => void;
  toggleReportSection: (secId: string) => void;

  // AI Benchmark Arena
  arenaBenchmarkRun: ArenaBenchmarkRun | null;
  setArenaBenchmarkRun: (data: ArenaBenchmarkRun | null) => void;
  runArenaBenchmark: (category: ArenaCategory, prompt?: string, modelIds?: string[]) => Promise<void>;

  // Prompt Matrix Sandbox
  promptMatrixGrid: PromptMatrixGrid | null;
  setPromptMatrixGrid: (data: PromptMatrixGrid | null) => void;
  runPromptMatrix: (basePrompt?: string) => Promise<void>;

  // Executive Briefing Presentation
  executiveBriefing: ExecutiveBriefing | null;
  setExecutiveBriefing: (data: ExecutiveBriefing | null) => void;
  toggleBriefingSlide: (slideId: string) => void;
  generateBriefingDeck: () => void;

  // Real-Time Intelligence Telemetry Suite
  liveTelemetryData: LiveTelemetryData | null;
  setLiveTelemetryData: (data: LiveTelemetryData | null) => void;

  // Collaborative Intelligence Workspace
  collaborators: CollaboratorMember[];
  annotations: SessionAnnotation[];
  inviteCollaborator: (email: string, role?: 'Editor' | 'Commenter' | 'Viewer') => void;
  removeCollaborator: (id: string) => void;
  addAnnotation: (target: string, content: string) => void;
  resolveAnnotation: (id: string) => void;
  isCollabModalOpen: boolean;
  setIsCollabModalOpen: (open: boolean) => void;

  // Session History
  sessions: SessionItem[];
  createNewSession: (mode?: WorkspaceMode, title?: string) => string;
  loadSession: (sessionId: string) => void;
  renameSession: (id: string, newTitle: string) => void;
  starSession: (id: string) => void;
  archiveSession: (id: string) => void;
  deleteSession: (id: string) => void;
  duplicateSession: (id: string) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;

  // Global Actions
  runPrompt: (promptOverride?: string) => Promise<void>;
  improvePrompt: (mode?: 'text' | 'image') => void;
  autoRouteModels: () => void;
  routingReason: string | null;

  // Analytics & Stats
  usageStats: UserUsageStats;
  theme: 'light' | 'dark' | 'system';
  setTheme: (t: 'light' | 'dark' | 'system') => void;
}

const ParallaxContext = createContext<ParallaxContextType | undefined>(undefined);

const INITIAL_SESSIONS: SessionItem[] = [
  {
    id: 'sess_default_1',
    title: 'Multi-Model Epistemology & Architecture',
    mode: 'compare',
    starred: true,
    archived: false,
    modelsUsed: ['gpt-4o', 'claude-3-7-sonnet', 'gemini-2.5-pro', 'deepseek-r1'],
    snippet: 'Compare leading foundation models on formal boundary invariants...',
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 2).toISOString(),
  },
  {
    id: 'sess_default_2',
    title: 'Nuclear Baseload vs Renewable Storage Debate',
    mode: 'debate',
    starred: true,
    archived: false,
    modelsUsed: ['claude-3-7-sonnet', 'deepseek-r1', 'gemini-2.5-pro', 'gpt-4o'],
    snippet: 'Structured 4-round judicial debate on capital gestation and grid inertia...',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 + 7200000).toISOString(),
  },
  {
    id: 'sess_default_3',
    title: 'Ancient Indian City at Sunrise (Image Lab)',
    mode: 'imagelab',
    starred: false,
    archived: false,
    modelsUsed: ['kling-omni-v1', 'dall-e-3', 'flux-1-pro', 'midjourney-v6'],
    snippet: 'Cinematic visual comparison of golden hour atmospheric architecture...',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 2 + 3600000).toISOString(),
  },
  {
    id: 'sess_default_4',
    title: 'LLM Hallucination Mechanics Fact Check',
    mode: 'factcheck',
    starred: false,
    archived: false,
    modelsUsed: ['gpt-4o', 'claude-3-7-sonnet', 'deepseek-r1'],
    snippet: 'Cross-verifying claims on next-token entropy and ensembling bounds...',
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 3 + 1800000).toISOString(),
  }
];

export const ParallaxProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeMode, setActiveMode] = useState<WorkspaceMode>('compare');
  const [currentWorkflowStage, setCurrentWorkflowStage] = useState<IntelligenceStage>('question');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isRightPanelOpen, setIsRightPanelOpen] = useState(true);
  
  const [currentSessionId, setCurrentSessionId] = useState<string>('sess_default_1');
  const [currentPrompt, setCurrentPrompt] = useState<string>(
    'What are the fundamental architectural tradeoffs between monolithic frontier LLMs and specialized multi-model ensembling?'
  );
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDemoMode, setIsDemoMode] = useState(true);
  const [routingReason, setRoutingReason] = useState<string | null>(null);

  const [selectedTextModelIds, setSelectedTextModelIds] = useState<string[]>(DEFAULT_SELECTED_TEXT_MODELS);
  const [selectedImageModelIds, setSelectedImageModelIds] = useState<string[]>(DEFAULT_SELECTED_IMAGE_MODELS);

  const [textResponses, setTextResponses] = useState<ModelResponse[]>([]);
  const [synthesisResult, setSynthesisResult] = useState<SynthesisOutput | null>(null);
  const [debateSession, setDebateSession] = useState<DebateSession | null>(null);
  const [factCheckReport, setFactCheckReport] = useState<FactCheckReport | null>(null);
  const [researchProject, setResearchProject] = useState<ResearchProject | null>(null);
  const [imageResults, setImageResults] = useState<ImageGenerationResult[]>([]);

  // Intelligence Suite Data States
  const [intelligenceMapData, setIntelligenceMapData] = useState<IntelligenceMapData | null>(null);
  const [conflictMapData, setConflictMapData] = useState<ConflictMapData | null>(null);
  const [uncertaintyMapData, setUncertaintyMapData] = useState<UncertaintyMapData | null>(null);
  const [blindSpotReport, setBlindSpotReport] = useState<BlindSpotReport | null>(null);
  const [assumptionAuditReport, setAssumptionAuditReport] = useState<AssumptionAuditReport | null>(null);
  const [decisionLabData, setDecisionLabData] = useState<DecisionLabData | null>(null);
  const [scenarioLabData, setScenarioLabData] = useState<ScenarioLabData | null>(null);
  const [redTeamDossier, setRedTeamDossier] = useState<RedTeamDossier | null>(null);
  const [intelligenceReportData, setIntelligenceReportData] = useState<IntelligenceReportData | null>(null);

  // New User-Attraction Capabilities State
  const [arenaBenchmarkRun, setArenaBenchmarkRun] = useState<ArenaBenchmarkRun | null>(null);
  const [promptMatrixGrid, setPromptMatrixGrid] = useState<PromptMatrixGrid | null>(null);
  const [executiveBriefing, setExecutiveBriefing] = useState<ExecutiveBriefing | null>(null);
  const [liveTelemetryData, setLiveTelemetryData] = useState<LiveTelemetryData | null>(null);
  const [isCollabModalOpen, setIsCollabModalOpen] = useState(false);

  const [collaborators, setCollaborators] = useState<CollaboratorMember[]>([
    {
      id: 'usr_me',
      name: 'Alex Mercer (You)',
      email: 'alex.mercer@intelligence.io',
      role: 'Owner',
      avatarColor: '#10b981',
      joinedAt: '2025-01-15T09:00:00Z',
      lastActive: 'Active now'
    },
    {
      id: 'usr_sarah',
      name: 'Dr. Sarah Chen',
      email: 'schen@stanford.ai.edu',
      role: 'Editor',
      avatarColor: '#3b82f6',
      joinedAt: '2025-02-10T14:20:00Z',
      lastActive: '5 mins ago'
    },
    {
      id: 'usr_elena',
      name: 'Elena Rostova',
      email: 'elena.rostova@quantum-risk.eu',
      role: 'Commenter',
      avatarColor: '#ec4899',
      joinedAt: '2025-02-18T11:45:00Z',
      lastActive: '2 hours ago'
    }
  ]);

  const [annotations, setAnnotations] = useState<SessionAnnotation[]>([
    {
      id: 'ann_1',
      authorName: 'Dr. Sarah Chen',
      authorEmail: 'schen@stanford.ai.edu',
      targetNodeOrModel: 'Claude 3.7 Sonnet',
      content: 'Remarkable alignment with the ISO 20022 message schema specifications. Note that liquidity line fallback requires hardware cryptographic isolation.',
      timestamp: 'Today at 14:32',
      resolved: false
    },
    {
      id: 'ann_2',
      authorName: 'Elena Rostova',
      authorEmail: 'elena.rostova@quantum-risk.eu',
      targetNodeOrModel: 'Red Team Attack Surface',
      content: 'We need to double check the latency penalty under 33% validator partition. High risk for high-frequency settlement.',
      timestamp: 'Today at 12:15',
      resolved: false
    }
  ]);

  const [sessions, setSessions] = useState<SessionItem[]>(INITIAL_SESSIONS);
  const [searchQuery, setSearchQuery] = useState('');
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('dark');

  // Stats calculation
  const [usageStats, setUsageStats] = useState<UserUsageStats>({
    totalSessions: 14,
    totalQuestions: 68,
    totalModelRuns: 272,
    totalImageGenerations: 48,
    totalTokensUsed: 382400,
    estimatedTotalCost: 1.48,
    mostUsedModel: 'Claude 3.7 Sonnet',
    modelUsageBreakdown: [
      { modelId: 'claude-3-7-sonnet', modelName: 'Claude 3.7 Sonnet', count: 94, avgLatency: 1420, userRating: 4.9 },
      { modelId: 'deepseek-r1', modelName: 'DeepSeek R1', count: 82, avgLatency: 2100, userRating: 4.8 },
      { modelId: 'gpt-4o', modelName: 'GPT-4o', count: 76, avgLatency: 980, userRating: 4.7 },
      { modelId: 'gemini-2.5-pro', modelName: 'Gemini 2.5 Pro', count: 68, avgLatency: 1120, userRating: 4.7 },
      { modelId: 'kling-omni-v1', modelName: 'Kling Omni-Image', count: 32, avgLatency: 2400, userRating: 4.9 },
    ],
    modeUsageBreakdown: [
      { mode: 'compare', count: 42 },
      { mode: 'synthesis', count: 28 },
      { mode: 'intelligencemap', count: 22 },
      { mode: 'conflictmap', count: 18 },
      { mode: 'redteam', count: 16 },
      { mode: 'decisionlab', count: 15 },
      { mode: 'imagelab', count: 24 },
      { mode: 'debate', count: 18 },
      { mode: 'research', count: 14 },
      { mode: 'factcheck', count: 12 },
    ]
  });

  // Apply dark class to documentElement
  useEffect(() => {
    if (theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Initial load simulation data
  useEffect(() => {
    runInitialLoad();
  }, []);

  const runInitialLoad = async () => {
    const defaultResponses = await AIProviderEngine.executeMultiModelText(
      currentPrompt,
      DEFAULT_SELECTED_TEXT_MODELS
    );
    setTextResponses(defaultResponses);
    const synth = await AIProviderEngine.executeSynthesis(currentPrompt, defaultResponses);
    setSynthesisResult(synth);

    // Initial Intelligence Suite Data
    const iMap = AIProviderEngine.generateIntelligenceMap(currentPrompt, defaultResponses);
    setIntelligenceMapData(iMap);

    const cMap = AIProviderEngine.generateConflictMap(currentPrompt, defaultResponses);
    setConflictMapData(cMap);

    const uMap = AIProviderEngine.generateUncertaintyMap(currentPrompt, defaultResponses);
    setUncertaintyMapData(uMap);

    const bSpots = AIProviderEngine.generateBlindSpotReport(currentPrompt, defaultResponses);
    setBlindSpotReport(bSpots);

    const aAudit = AIProviderEngine.generateAssumptionAudit(currentPrompt, defaultResponses);
    setAssumptionAuditReport(aAudit);

    const dLab = AIProviderEngine.generateDecisionLabData(currentPrompt, defaultResponses);
    setDecisionLabData(dLab);

    const sLab = AIProviderEngine.generateScenarioLabData(currentPrompt, defaultResponses);
    setScenarioLabData(sLab);

    const rTeam = AIProviderEngine.generateRedTeamDossier(currentPrompt, defaultResponses);
    setRedTeamDossier(rTeam);

    const iReport = AIProviderEngine.generateIntelligenceReport(currentPrompt, defaultResponses, synth, rTeam, dLab);
    setIntelligenceReportData(iReport);

    // Initial image lab samples
    const defaultImages = await AIProviderEngine.executeImageLabGeneration(
      'Ancient Indian city at sunrise, ornate golden palaces along sacred river with misty reflections and cinematic volumetric light rays',
      DEFAULT_SELECTED_IMAGE_MODELS
    );
    setImageResults(defaultImages);

    // Initial Arena Benchmark Run
    const initialArena = AIProviderEngine.generateArenaBenchmarkRun(
      'Reasoning',
      'Prove the convergence rate of decentralized consensus under Byzantine fault tolerance with 33% adversarial partition.',
      DEFAULT_SELECTED_TEXT_MODELS
    );
    setArenaBenchmarkRun(initialArena);

    // Initial Prompt Matrix Grid
    const initialMatrix = AIProviderEngine.generatePromptMatrixGrid(
      currentPrompt,
      DEFAULT_SELECTED_TEXT_MODELS
    );
    setPromptMatrixGrid(initialMatrix);

    // Initial Executive Briefing Deck
    const initialBriefing = AIProviderEngine.generateExecutiveBriefing(
      currentPrompt,
      synth,
      rTeam,
      dLab
    );
    setExecutiveBriefing(initialBriefing);

    // Initial Live Telemetry
    const initialTelemetry = AIProviderEngine.generateLiveTelemetryData(DEFAULT_SELECTED_TEXT_MODELS);
    setLiveTelemetryData(initialTelemetry);
  };

  const runArenaBenchmark = async (category: ArenaCategory, prompt?: string, modelIds?: string[]) => {
    setIsGenerating(true);
    try {
      const activeIds = modelIds && modelIds.length >= 2 ? modelIds : selectedTextModelIds;
      const benchmark = AIProviderEngine.generateArenaBenchmarkRun(
        category,
        prompt || currentPrompt,
        activeIds
      );
      setArenaBenchmarkRun(benchmark);
      toast.success(`Arena Benchmark completed across ${activeIds.length} models for ${category}`);
    } catch (err: any) {
      toast.error('Failed to execute arena benchmark');
    } finally {
      setIsGenerating(false);
    }
  };

  const runPromptMatrix = async (basePrompt?: string) => {
    setIsGenerating(true);
    try {
      const grid = AIProviderEngine.generatePromptMatrixGrid(
        basePrompt || currentPrompt,
        selectedTextModelIds
      );
      setPromptMatrixGrid(grid);
      toast.success(`Prompt Matrix executed: ${grid.rows.length} variants × ${grid.cols.length} configurations`);
    } catch (err: any) {
      toast.error('Failed to compute prompt matrix');
    } finally {
      setIsGenerating(false);
    }
  };

  const toggleBriefingSlide = (slideId: string) => {
    if (!executiveBriefing) return;
    setExecutiveBriefing({
      ...executiveBriefing,
      slides: executiveBriefing.slides.map(s => s.id === slideId ? { ...s, enabled: !s.enabled } : s)
    });
  };

  const generateBriefingDeck = () => {
    const brief = AIProviderEngine.generateExecutiveBriefing(
      currentPrompt,
      synthesisResult || null,
      redTeamDossier || null,
      decisionLabData || null
    );
    setExecutiveBriefing(brief);
    toast.success('Executive Briefing Deck regenerated from current session intelligence');
  };

  const inviteCollaborator = (email: string, role: 'Editor' | 'Commenter' | 'Viewer' = 'Commenter') => {
    const colors = ['#3b82f6', '#10b981', '#ec4899', '#f59e0b', '#8b5cf6'];
    const newMember: CollaboratorMember = {
      id: `usr_${Date.now()}`,
      name: email.split('@')[0].replace('.', ' ').replace(/\b\w/g, l => l.toUpperCase()),
      email,
      role,
      avatarColor: colors[Math.floor(Math.random() * colors.length)],
      joinedAt: new Date().toISOString(),
      lastActive: 'Invited'
    };
    setCollaborators(prev => [...prev, newMember]);
    toast.success(`Invitation sent to ${email} with ${role} permissions`);
  };

  const removeCollaborator = (id: string) => {
    setCollaborators(prev => prev.filter(c => c.id !== id));
    toast.info('Collaborator removed from session');
  };

  const addAnnotation = (target: string, content: string) => {
    const newAnn: SessionAnnotation = {
      id: `ann_${Date.now()}`,
      authorName: 'Alex Mercer (You)',
      authorEmail: 'alex.mercer@intelligence.io',
      targetNodeOrModel: target,
      content,
      timestamp: 'Just now',
      resolved: false
    };
    setAnnotations(prev => [newAnn, ...prev]);
    toast.success('Annotation pinned to workspace item');
  };

  const resolveAnnotation = (id: string) => {
    setAnnotations(prev => prev.map(a => a.id === id ? { ...a, resolved: !a.resolved } : a));
  };

  const goToStage = (stage: IntelligenceStage) => {
    setCurrentWorkflowStage(stage);
    switch (stage) {
      case 'question':
        setActiveMode('compare');
        break;
      case 'investigate':
        setActiveMode('research');
        break;
      case 'cross-examine':
        setActiveMode('debate');
        break;
      case 'map':
        setActiveMode('intelligencemap');
        break;
      case 'stress-test':
        setActiveMode('redteam');
        break;
      case 'synthesize':
        setActiveMode('synthesis');
        break;
      case 'decide':
        setActiveMode('decisionlab');
        break;
    }
    toast.info(`Workflow Stage: ${stage.toUpperCase()}`);
  };

  const updateAssumptionStatus = (id: string, status: 'Accepted' | 'Contested' | 'Requires Investigation') => {
    if (!assumptionAuditReport) return;
    setAssumptionAuditReport({
      ...assumptionAuditReport,
      assumptions: assumptionAuditReport.assumptions.map(a => a.id === id ? { ...a, status } : a)
    });
    toast.success(`Assumption status marked as: ${status}`);
  };

  const updateDecisionFactorWeight = (factorId: string, weight: number) => {
    if (!decisionLabData) return;
    setDecisionLabData({
      ...decisionLabData,
      factors: decisionLabData.factors.map(f => f.id === factorId ? { ...f, weight } : f)
    });
  };

  const addDecisionOption = (name: string, description: string) => {
    if (!decisionLabData) return;
    const newId = `opt_${Date.now()}`;
    const newOption = {
      id: newId,
      name,
      description,
      keyRisk: 'Custom user defined option under evaluation.',
      pros: ['Tailored user candidate', 'Direct objective alignment'],
      cons: ['Requires empirical validation'],
      modelScores: {
        'gpt-4o': { f_accuracy: 85, f_cost: 80, f_latency: 85, f_resilience: 80 },
        'claude-3-7-sonnet': { f_accuracy: 88, f_cost: 82, f_latency: 80, f_resilience: 85 },
        'deepseek-r1': { f_accuracy: 86, f_cost: 85, f_latency: 82, f_resilience: 84 },
        'gemini-2.5-pro': { f_accuracy: 84, f_cost: 80, f_latency: 86, f_resilience: 82 }
      }
    };
    setDecisionLabData({
      ...decisionLabData,
      options: [...decisionLabData.options, newOption]
    });
    toast.success(`Added candidate option: ${name}`);
  };

  const removeDecisionOption = (optionId: string) => {
    if (!decisionLabData) return;
    if (decisionLabData.options.length <= 2) {
      toast.error('Decision Lab requires at least 2 options for comparison');
      return;
    }
    setDecisionLabData({
      ...decisionLabData,
      options: decisionLabData.options.filter(o => o.id !== optionId)
    });
    toast.success('Option removed from matrix');
  };

  const updateScenarioVariableValue = (varId: string, value: number) => {
    if (!scenarioLabData) return;
    const updatedVariables = scenarioLabData.variables.map(v => v.id === varId ? { ...v, currentValue: value } : v);
    
    // Dynamically recalculate outcome based on variable shifts
    const tokenVol = updatedVariables.find(v => v.id === 'var_token_volume')?.currentValue || 50;
    const costSens = updatedVariables.find(v => v.id === 'var_cost_sensitivity')?.currentValue || 60;
    const latencyTol = updatedVariables.find(v => v.id === 'var_latency_tolerance')?.currentValue || 1200;

    let leadingOpt = 'Hybrid Federated Intelligence Mesh';
    let conf = 92;
    let desc = 'Standard balanced routing across frontier and open-weight models.';

    if (tokenVol > 150 && costSens > 70) {
      leadingOpt = 'Sovereign Dedicated Open-Weight Cluster (DeepSeek R1)';
      conf = 95;
      desc = 'High volume and high cost sensitivity shift ROI decisively to dedicated self-hosted clusters.';
    } else if (latencyTol < 600) {
      leadingOpt = 'Parallel Speculative Dual-Model Fast Router (GPT-4o + Gemini)';
      conf = 89;
      desc = 'Ultra-low latency tolerance favors parallel stream speculative inference over sequential arbitration.';
    }

    setScenarioLabData({
      ...scenarioLabData,
      variables: updatedVariables,
      calculatedOutcome: {
        scenarioName: 'Dynamic Simulation',
        description: desc,
        leadingOption: leadingOpt,
        confidenceScore: conf,
        keyConsequences: [
          `Adjusted Decision Volume: ${tokenVol}k queries/month`,
          `Cost Sensitivity: ${costSens}% | Latency Budget: ${latencyTol}ms`,
          `Optimal Architecture: ${leadingOpt}`
        ],
        modelConsensusShift: 'Real-time re-weighted consensus updated.'
      }
    });
  };

  const applyScenarioPreset = (presetName: string) => {
    if (!scenarioLabData) return;
    const preset = scenarioLabData.savedScenarios.find(s => s.name === presetName);
    if (!preset) return;
    
    const updatedVars = scenarioLabData.variables.map(v => {
      const presetVal = preset.variableValues[v.id];
      return presetVal !== undefined ? { ...v, currentValue: presetVal } : v;
    });

    setScenarioLabData({
      ...scenarioLabData,
      variables: updatedVars,
      activeScenarioName: preset.name,
      calculatedOutcome: preset.outcome
    });
    toast.success(`Applied scenario: ${preset.name}`);
  };

  const toggleReportSection = (secId: string) => {
    if (!intelligenceReportData) return;
    setIntelligenceReportData({
      ...intelligenceReportData,
      sections: intelligenceReportData.sections.map(s => s.id === secId ? { ...s, enabled: !s.enabled } : s)
    });
  };

  const toggleTextModel = (id: string) => {
    setSelectedTextModelIds(prev => {
      if (prev.includes(id)) {
        if (prev.length <= 1) {
          toast.error('Compare Mode requires at least 1 model selected');
          return prev;
        }
        return prev.filter(m => m !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const toggleImageModel = (id: string) => {
    setSelectedImageModelIds(prev => {
      if (prev.includes(id)) {
        if (prev.length <= 1) {
          toast.error('Image Lab requires at least 1 generator model');
          return prev;
        }
        return prev.filter(m => m !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const autoRouteModels = () => {
    const route = AIProviderEngine.smartModelRouting(currentPrompt);
    if (activeMode === 'imagelab') {
      setSelectedImageModelIds(route.recommendedModelIds.filter(id => AVAILABLE_IMAGE_MODELS.some(m => m.id === id)));
    } else {
      setSelectedTextModelIds(route.recommendedModelIds.filter(id => AVAILABLE_TEXT_MODELS.some(m => m.id === id)));
    }
    setRoutingReason(`[Smart Route: ${route.taskType}] ${route.reason}`);
    toast.success(`Models auto-routed for: ${route.taskType}`);
  };

  const improvePrompt = (mode: 'text' | 'image' = activeMode === 'imagelab' ? 'image' : 'text') => {
    if (!currentPrompt.trim()) {
      toast.error('Please enter a prompt first to improve it');
      return;
    }
    const enhanced = AIProviderEngine.enhancePrompt(currentPrompt, mode);
    setCurrentPrompt(enhanced.enhanced);
    toast.success('Prompt expanded with enhanced analytical/visual dimensions');
  };

  const createNewSession = (mode: WorkspaceMode = 'compare', title = 'New Intelligence Session') => {
    const newId = `sess_${Date.now()}`;
    const newSession: SessionItem = {
      id: newId,
      title,
      mode,
      starred: false,
      archived: false,
      modelsUsed: mode === 'imagelab' ? selectedImageModelIds : selectedTextModelIds,
      snippet: 'Fresh workspace initialized. Ask anything to see multi-model perspectives.',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setSessions(prev => [newSession, ...prev]);
    setCurrentSessionId(newId);
    setActiveMode(mode);
    setCurrentPrompt('');
    setTextResponses([]);
    setSynthesisResult(null);
    setDebateSession(null);
    setFactCheckReport(null);
    toast.success(`Created new ${mode.toUpperCase()} session`);
    return newId;
  };

  const loadSession = (sessionId: string) => {
    const target = sessions.find(s => s.id === sessionId);
    if (!target) return;
    setCurrentSessionId(sessionId);
    setActiveMode(target.mode);
    toast.info(`Loaded session: ${target.title}`);
  };

  const renameSession = (id: string, newTitle: string) => {
    setSessions(prev => prev.map(s => s.id === id ? { ...s, title: newTitle, updatedAt: new Date().toISOString() } : s));
    toast.success('Session renamed');
  };

  const starSession = (id: string) => {
    setSessions(prev => prev.map(s => s.id === id ? { ...s, starred: !s.starred } : s));
  };

  const archiveSession = (id: string) => {
    setSessions(prev => prev.map(s => s.id === id ? { ...s, archived: !s.archived } : s));
    toast.info('Session archive status updated');
  };

  const deleteSession = (id: string) => {
    setSessions(prev => prev.filter(s => s.id !== id));
    toast.success('Session deleted');
  };

  const duplicateSession = (id: string) => {
    const target = sessions.find(s => s.id === id);
    if (!target) return;
    const duplicated: SessionItem = {
      ...target,
      id: `sess_${Date.now()}`,
      title: `${target.title} (Copy)`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setSessions(prev => [duplicated, ...prev]);
    toast.success('Session duplicated');
  };

  const runPrompt = async (promptOverride?: string) => {
    const promptToRun = promptOverride || currentPrompt;
    if (!promptToRun.trim()) {
      toast.error('Please enter a question or prompt to run');
      return;
    }

    setIsGenerating(true);
    // Yield to main thread immediately so UI updates and paints loading state instantly (INP < 16ms)
    await new Promise(r => setTimeout(r, 0));

    try {
      if (activeMode === 'imagelab') {
        const results = await AIProviderEngine.executeImageLabGeneration(
          promptToRun,
          selectedImageModelIds
        );
        setImageResults(results);
        toast.success(`Generated ${results.length} visual perspectives in Image Lab`);
      } else if (activeMode === 'debate') {
        const isGreetingPrompt = /^(hi|hii|hiii|hello|hey|heyy|howdy|hola|greetings|test|yo|sup)$/i.test(promptToRun.trim()) ||
                                 (promptToRun.trim().length <= 4 && (promptToRun.toLowerCase().startsWith('hi') || promptToRun.toLowerCase().startsWith('hey')));
        const effectiveProposition = isGreetingPrompt 
          ? 'Microservices are an anti-pattern for engineering teams under 50 developers'
          : promptToRun;

        const round1 = await AIProviderEngine.executeDebateRound(
          effectiveProposition,
          {
            advocate: selectedTextModelIds[0] || 'claude-3-7-sonnet',
            opponent: selectedTextModelIds[1] || 'deepseek-r1',
            neutralAnalyst: selectedTextModelIds[2] || 'gemini-2.5-pro',
            factChecker: selectedTextModelIds[3] || 'gpt-4o',
            judge: selectedTextModelIds[0] || 'claude-3-7-sonnet'
          },
          1
        );
        await new Promise(r => setTimeout(r, 0));
        const round2 = await AIProviderEngine.executeDebateRound(
          effectiveProposition,
          {
            advocate: selectedTextModelIds[0] || 'claude-3-7-sonnet',
            opponent: selectedTextModelIds[1] || 'deepseek-r1',
            neutralAnalyst: selectedTextModelIds[2] || 'gemini-2.5-pro',
            factChecker: selectedTextModelIds[3] || 'gpt-4o',
            judge: selectedTextModelIds[0] || 'claude-3-7-sonnet'
          },
          2
        );
        await new Promise(r => setTimeout(r, 0));
        const round3 = await AIProviderEngine.executeDebateRound(
          effectiveProposition,
          {
            advocate: selectedTextModelIds[0] || 'claude-3-7-sonnet',
            opponent: selectedTextModelIds[1] || 'deepseek-r1',
            neutralAnalyst: selectedTextModelIds[2] || 'gemini-2.5-pro',
            factChecker: selectedTextModelIds[3] || 'gpt-4o',
            judge: selectedTextModelIds[0] || 'claude-3-7-sonnet'
          },
          3
        );
        await new Promise(r => setTimeout(r, 0));
        const round4 = await AIProviderEngine.executeDebateRound(
          effectiveProposition,
          {
            advocate: selectedTextModelIds[0] || 'claude-3-7-sonnet',
            opponent: selectedTextModelIds[1] || 'deepseek-r1',
            neutralAnalyst: selectedTextModelIds[2] || 'gemini-2.5-pro',
            factChecker: selectedTextModelIds[3] || 'gpt-4o',
            judge: selectedTextModelIds[0] || 'claude-3-7-sonnet'
          },
          4
        );

        setDebateSession({
          proposition: effectiveProposition,
          roles: {
            advocate: selectedTextModelIds[0] || 'claude-3-7-sonnet',
            opponent: selectedTextModelIds[1] || 'deepseek-r1',
            neutralAnalyst: selectedTextModelIds[2] || 'gemini-2.5-pro',
            factChecker: selectedTextModelIds[3] || 'gpt-4o',
            judge: selectedTextModelIds[0] || 'claude-3-7-sonnet'
          },
          rounds: [round1, round2, round3, round4],
          verdict: {
            winnerRole: 'Draw / Nuanced Synthesis',
            strongestArgument: 'Advocate execution velocity vs Opponent decoupled fault isolation',
            weakestArgument: 'Opponent assumption of zero cross-boundary latency overhead',
            evidenceQualityScore: 94,
            logicalFallaciesDetected: ['False Dichotomy (Pure Monolith vs Extreme Microservices)'],
            unresolvedQuestions: ['Optimal service granularity thresholds based on engineering team size'],
            judgeAssessment: 'The debate demonstrates that Modular Monoliths offer superior ROI for teams under 50, transitioning to microservices only at verified scaling bottlenecks.'
          },
          status: 'completed'
        });
        toast.success('4-Round Formal AI Debate successfully orchestrated');
      } else if (activeMode === 'factcheck') {
        const report = await AIProviderEngine.executeFactCheck(promptToRun);
        setFactCheckReport(report);
        toast.success(`Fact Check completed: ${report.claims.length} claims verified across models`);
      } else if (activeMode === 'research') {
        const project = await AIProviderEngine.executeResearchWorkflow(promptToRun);
        setResearchProject(project);
        toast.success('Deep Research Dossier generated with multi-stage triangulation');
      } else if (activeMode === 'arena') {
        const benchmark = AIProviderEngine.generateArenaBenchmarkRun(
          'Reasoning',
          promptToRun,
          selectedTextModelIds
        );
        setArenaBenchmarkRun(benchmark);
        toast.success(`Arena Benchmark evaluated across ${selectedTextModelIds.length} models`);
      } else if (activeMode === 'matrix') {
        const grid = AIProviderEngine.generatePromptMatrixGrid(
          promptToRun,
          selectedTextModelIds
        );
        setPromptMatrixGrid(grid);
        toast.success(`Prompt Matrix computed: ${grid.rows.length} variants × ${grid.cols.length} models`);
      } else if (activeMode === 'briefing') {
        const responses = await AIProviderEngine.executeMultiModelText(promptToRun, selectedTextModelIds);
        const synthesis = await AIProviderEngine.executeSynthesis(promptToRun, responses);
        const rTeam = AIProviderEngine.generateRedTeamDossier(promptToRun, responses);
        const dLab = AIProviderEngine.generateDecisionLabData(promptToRun, responses);
        const briefing = AIProviderEngine.generateExecutiveBriefing(promptToRun, synthesis, rTeam, dLab);
        setExecutiveBriefing(briefing);
        toast.success('Executive Briefing presentation slides generated');
      } else {
        // Compare, Synthesis and Intelligence Suite modes
        const responses = await AIProviderEngine.executeMultiModelText(
          promptToRun,
          selectedTextModelIds
        );
        setTextResponses(responses);

        // Yield to allow rendering of raw responses
        await new Promise(r => setTimeout(r, 0));

        const synthesis = await AIProviderEngine.executeSynthesis(promptToRun, responses);
        setSynthesisResult(synthesis);

        // Populate intelligence suite vectors with non-blocking micro-tasks
        await new Promise(r => setTimeout(r, 0));
        const iMap = AIProviderEngine.generateIntelligenceMap(promptToRun, responses);
        setIntelligenceMapData(iMap);

        const cMap = AIProviderEngine.generateConflictMap(promptToRun, responses);
        setConflictMapData(cMap);

        const uMap = AIProviderEngine.generateUncertaintyMap(promptToRun, responses);
        setUncertaintyMapData(uMap);

        await new Promise(r => setTimeout(r, 0));
        const bSpots = AIProviderEngine.generateBlindSpotReport(promptToRun, responses);
        setBlindSpotReport(bSpots);

        const aAudit = AIProviderEngine.generateAssumptionAudit(promptToRun, responses);
        setAssumptionAuditReport(aAudit);

        const dLab = AIProviderEngine.generateDecisionLabData(promptToRun, responses);
        setDecisionLabData(dLab);

        await new Promise(r => setTimeout(r, 0));
        const sLab = AIProviderEngine.generateScenarioLabData(promptToRun, responses);
        setScenarioLabData(sLab);

        const rTeam = AIProviderEngine.generateRedTeamDossier(promptToRun, responses);
        setRedTeamDossier(rTeam);

        const iReport = AIProviderEngine.generateIntelligenceReport(promptToRun, responses, synthesis, rTeam, dLab);
        setIntelligenceReportData(iReport);

        // Also update Arena, Matrix & Briefing with the new prompt
        const updatedArena = AIProviderEngine.generateArenaBenchmarkRun('Reasoning', promptToRun, selectedTextModelIds);
        setArenaBenchmarkRun(updatedArena);

        const updatedMatrix = AIProviderEngine.generatePromptMatrixGrid(promptToRun, selectedTextModelIds);
        setPromptMatrixGrid(updatedMatrix);

        const updatedBriefing = AIProviderEngine.generateExecutiveBriefing(promptToRun, synthesis, rTeam, dLab);
        setExecutiveBriefing(updatedBriefing);

        toast.success(`Synthesized ${responses.length} model perspectives & generated complete Intelligence Dossier`);
      }

      // Update current session title & snippet
      setSessions(prev => prev.map(s => {
        if (s.id === currentSessionId) {
          return {
            ...s,
            title: promptToRun.length > 40 ? `${promptToRun.slice(0, 38)}...` : promptToRun,
            snippet: promptToRun,
            mode: activeMode,
            updatedAt: new Date().toISOString()
          };
        }
        return s;
      }));

      // Update stats
      setUsageStats(prev => ({
        ...prev,
        totalQuestions: prev.totalQuestions + 1,
        totalModelRuns: prev.totalModelRuns + (activeMode === 'imagelab' ? selectedImageModelIds.length : selectedTextModelIds.length),
        totalTokensUsed: prev.totalTokensUsed + (activeMode === 'imagelab' ? 0 : selectedTextModelIds.length * 520),
        estimatedTotalCost: Number((prev.estimatedTotalCost + (activeMode === 'imagelab' ? 0.08 : 0.008)).toFixed(4))
      }));
    } catch (err: any) {
      toast.error(`Execution failed: ${err.message || 'Unknown error'}`);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <ParallaxContext.Provider
      value={{
        activeMode,
        setActiveMode,
        currentWorkflowStage,
        setCurrentWorkflowStage,
        goToStage,
        isSidebarOpen,
        setIsSidebarOpen,
        isRightPanelOpen,
        setIsRightPanelOpen,
        currentSessionId,
        currentPrompt,
        setCurrentPrompt,
        isGenerating,
        isDemoMode,
        setIsDemoMode,
        selectedTextModelIds,
        setSelectedTextModelIds,
        selectedImageModelIds,
        setSelectedImageModelIds,
        toggleTextModel,
        toggleImageModel,
        textResponses,
        setTextResponses,
        synthesisResult,
        setSynthesisResult,
        debateSession,
        setDebateSession,
        factCheckReport,
        setFactCheckReport,
        researchProject,
        setResearchProject,
        imageResults,
        setImageResults,
        
        intelligenceMapData,
        setIntelligenceMapData,
        conflictMapData,
        setConflictMapData,
        uncertaintyMapData,
        setUncertaintyMapData,
        blindSpotReport,
        setBlindSpotReport,
        assumptionAuditReport,
        setAssumptionAuditReport,
        updateAssumptionStatus,
        decisionLabData,
        setDecisionLabData,
        updateDecisionFactorWeight,
        addDecisionOption,
        removeDecisionOption,
        scenarioLabData,
        setScenarioLabData,
        updateScenarioVariableValue,
        applyScenarioPreset,
        redTeamDossier,
        setRedTeamDossier,
        intelligenceReportData,
        setIntelligenceReportData,
        toggleReportSection,

        arenaBenchmarkRun,
        setArenaBenchmarkRun,
        runArenaBenchmark,

        promptMatrixGrid,
        setPromptMatrixGrid,
        runPromptMatrix,

        executiveBriefing,
        setExecutiveBriefing,
        toggleBriefingSlide,
        generateBriefingDeck,

        liveTelemetryData,
        setLiveTelemetryData,

        collaborators,
        annotations,
        inviteCollaborator,
        removeCollaborator,
        addAnnotation,
        resolveAnnotation,
        isCollabModalOpen,
        setIsCollabModalOpen,

        sessions,
        createNewSession,
        loadSession,
        renameSession,
        starSession,
        archiveSession,
        deleteSession,
        duplicateSession,
        searchQuery,
        setSearchQuery,
        runPrompt,
        improvePrompt,
        autoRouteModels,
        routingReason,
        usageStats,
        theme,
        setTheme,
      }}
    >
      {children}
    </ParallaxContext.Provider>
  );
};

export const useParallax = () => {
  const context = useContext(ParallaxContext);
  if (!context) {
    throw new Error('useParallax must be used within a ParallaxProvider');
  }
  return context;
};
