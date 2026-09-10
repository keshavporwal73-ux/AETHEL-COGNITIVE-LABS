export type WorkspaceMode = 
  | 'compare'
  | 'synthesis'
  | 'debate'
  | 'factcheck'
  | 'research'
  | 'imagelab'
  | 'fileanalysis'
  | 'intelligencemap'
  | 'conflictmap'
  | 'uncertaintymap'
  | 'blindspot'
  | 'assumptionaudit'
  | 'decisionlab'
  | 'scenariolab'
  | 'redteam'
  | 'intelligencereport'
  | 'arena'
  | 'briefing'
  | 'matrix'
  | 'telemetry'
  | 'quantummindmap'
  | 'personachat'
  | 'temporaltrack';

export type IntelligenceStage = 
  | 'question'
  | 'investigate'
  | 'cross-examine'
  | 'map'
  | 'stress-test'
  | 'synthesize'
  | 'decide';

export interface IntelligenceStageInfo {
  id: IntelligenceStage;
  label: string;
  shortDesc: string;
  recommendedMode: WorkspaceMode;
  iconName: string;
}

export type ModelCapability = 
  | 'Reasoning'
  | 'Writing'
  | 'Coding'
  | 'Research'
  | 'Vision'
  | 'Image Generation'
  | 'Fast Response';

export interface AIModel {
  id: string;
  name: string;
  provider: string;
  providerCode: 'openai' | 'anthropic' | 'google' | 'deepseek' | 'meta' | 'kling' | 'midjourney' | 'black-forest';
  version: string;
  description: string;
  capabilities: ModelCapability[];
  speedRating: 'Ultra Fast' | 'Fast' | 'Balanced' | 'Deep/Thinking';
  latencyEstimateMs: number;
  contextWindow: string;
  costPer1kTokens: string;
  isImageCapable?: boolean;
  isVisionCapable?: boolean;
  isReasoningSpecialist?: boolean;
  available: boolean;
  accentColor?: string;
  strengths: string[];
  weaknesses: string[];
}

export interface ModelEvaluation {
  reasoning: number;      // 0-100
  accuracy: number;       // 0-100
  completeness: number;   // 0-100
  clarity: number;        // 0-100
  creativity: number;     // 0-100
  evidenceQuality: number;// 0-100
  overallScore: number;
  strengthsSummary: string;
  weaknessesSummary: string;
  confidenceEstimate: number;
}

export interface ModelResponse {
  id: string;
  modelId: string;
  modelName: string;
  provider: string;
  text: string;
  reasoningChain?: string;
  latencyMs: number;
  tokensUsed: number;
  costEstimate: number;
  evaluation: ModelEvaluation;
  status: 'pending' | 'thinking' | 'streaming' | 'completed' | 'failed';
  errorMessage?: string;
  isDemo?: boolean;
}

export interface SynthesisOutput {
  depth: 'Concise' | 'Balanced' | 'Deep' | 'Expert';
  consensus: string[];
  disagreements: {
    topic: string;
    perspectives: { model: string; stance: string }[];
  }[];
  uniqueInsights: {
    model: string;
    insight: string;
  }[];
  uncertainties: string[];
  finalSynthesis: string;
  executiveSummary: string;
  evidenceMatrix: {
    claim: string;
    modelsSupporting: string[];
    confidence: 'High' | 'Moderate' | 'Low';
  }[];
}

export interface DebateRoleAssignment {
  advocate: string;      // modelId
  opponent: string;      // modelId
  neutralAnalyst: string;// modelId
  factChecker: string;   // modelId
  judge: string;         // modelId
}

export interface DebateTurn {
  role: 'advocate' | 'opponent' | 'neutralAnalyst' | 'factChecker' | 'judge';
  modelId: string;
  modelName: string;
  title: string;
  content: string;
  keyArguments: string[];
  rebuttals?: string[];
  evidenceCited: string[];
}

export interface DebateRound {
  roundNumber: number;
  name: 'Opening Arguments' | 'Counterarguments' | 'Cross-Examination' | 'Evidence Analysis' | 'Final Verdict';
  turns: DebateTurn[];
}

export interface DebateSession {
  proposition: string;
  roles: DebateRoleAssignment;
  rounds: DebateRound[];
  verdict?: {
    winnerRole: 'Advocate' | 'Opponent' | 'Draw / Nuanced Synthesis';
    strongestArgument: string;
    weakestArgument: string;
    evidenceQualityScore: number;
    logicalFallaciesDetected: string[];
    unresolvedQuestions: string[];
    judgeAssessment: string;
  };
  status: 'draft' | 'debating' | 'completed';
}

export interface FactCheckClaim {
  id: string;
  claimText: string;
  status: 'Supported' | 'Unclear' | 'Disputed' | 'Unsupported';
  confidence: number;
  reasoning: string;
  evidence: string[];
  sources: { title: string; url?: string; credibility: 'High' | 'Medium' | 'Low' }[];
  modelAgreement: {
    supportedBy: string[];
    disputedBy: string[];
    unclearFor: string[];
  };
}

export interface FactCheckReport {
  originalText: string;
  claims: FactCheckClaim[];
  overallVerdict: 'High Credibility' | 'Mixed Evidence' | 'Low Credibility' | 'Disputed';
  summary: string;
}

export interface ResearchStage {
  id: 'question' | 'plan' | 'subquestions' | 'investigations' | 'evidence' | 'comparison' | 'synthesis';
  label: string;
  status: 'pending' | 'in_progress' | 'completed';
  data: any;
}

export interface ResearchProject {
  id: string;
  question: string;
  stages: ResearchStage[];
  plan: {
    objectives: string[];
    methodology: string;
    domainsToInvestigate: string[];
  };
  subquestions: {
    id: string;
    question: string;
    assignedModels: string[];
    status: 'pending' | 'completed';
    findings?: string;
  }[];
  sources: {
    id: string;
    title: string;
    authorOrOrg: string;
    url?: string;
    relevance: string;
  }[];
  finalReportMarkdown: string;
  status: 'active' | 'completed';
}

export interface ImageGenerationResult {
  id: string;
  modelId: string;
  modelName: string;
  provider: string;
  imageUrl: string;
  prompt: string;
  enhancedPrompt?: string;
  style: string;
  aspectRatio: string;
  latencyMs: number;
  status: 'pending' | 'generating' | 'completed' | 'failed';
  visualAnalysis: {
    visualQualityScore: number;      // 0-100
    compositionScore: number;        // 0-100
    lightingScore: number;           // 0-100
    detailScore: number;             // 0-100
    promptAdherenceScore: number;    // 0-100
    strengths: string[];
    weaknesses: string[];
    interpretationNotes: string;
  };
  userSelected?: boolean;
  isDemo?: boolean;
}

export interface SessionItem {
  id: string;
  title: string;
  mode: WorkspaceMode;
  starred: boolean;
  archived: boolean;
  modelsUsed: string[];
  snippet: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserUsageStats {
  totalSessions: number;
  totalQuestions: number;
  totalModelRuns: number;
  totalImageGenerations: number;
  totalTokensUsed: number;
  estimatedTotalCost: number;
  mostUsedModel: string;
  modelUsageBreakdown: { modelId: string; modelName: string; count: number; avgLatency: number; userRating: number }[];
  modeUsageBreakdown: { mode: WorkspaceMode; count: number }[];
}

// -------------------------------------------------------------
// INTELLIGENCE SUITE TYPES
// -------------------------------------------------------------

export interface IntelligenceNode {
  id: string;
  label: string;
  type: 'claim' | 'evidence' | 'perspective' | 'conflict' | 'conclusion' | 'assumption';
  modelId?: string;
  confidence?: number;
  snippet?: string;
  tags?: string[];
  x?: number;
  y?: number;
}

export interface IntelligenceEdge {
  id: string;
  source: string;
  target: string;
  relation: 'supports' | 'contradicts' | 'qualifies' | 'assumes' | 'generates';
  strength: 'strong' | 'moderate' | 'weak';
  annotation?: string;
}

export interface IntelligenceMapData {
  title: string;
  summary: string;
  nodes: IntelligenceNode[];
  edges: IntelligenceEdge[];
  coverageScore: number;
  conflictCount: number;
  evidenceStrengthAvg: number;
}

export type ConflictCategory = 
  | 'Data Differences' 
  | 'Value Judgments' 
  | 'Definition Divergence' 
  | 'Risk Tolerance'
  | 'Methodology Gap';

export interface ConflictItem {
  id: string;
  topic: string;
  category: ConflictCategory;
  severity: 'Critical' | 'Moderate' | 'Minor';
  description: string;
  sides: {
    stance: string;
    models: string[];
    coreRationale: string;
    supportingEvidence: string;
  }[];
  resolutionPathway?: string;
}

export interface ConflictMapData {
  totalDisputes: number;
  primaryDisagreementAxis: string;
  conflicts: ConflictItem[];
  resolutionSummary: string;
}

export interface UncertaintyItem {
  id: string;
  area: string;
  uncertaintyType: 'Empirical Unknown' | 'Model Divergence' | 'Weak Evidence' | 'Fragile Assumption' | 'Temporal Drift';
  severity: 'High' | 'Medium' | 'Low';
  scope: 'Global Conclusion' | 'Specific Metric' | 'Implementation Detail';
  affectedClaims: string[];
  recommendedInvestigation: string;
  modelPositions: { model: string; acknowledgment: string }[];
}

export interface UncertaintyMapData {
  overallUncertaintyLevel: 'High' | 'Moderate' | 'Low';
  compositeScore: number; // 0-100 (100 = full certainty)
  items: UncertaintyItem[];
  mitigationStrategy: string;
}

export interface BlindSpotItem {
  id: string;
  title: string;
  category: 'Overlooked Variable' | 'Second-Order Consequence' | 'Asymmetric Risk' | 'Regulatory/Legal Void' | 'Behavioral Bias';
  whyMissed: string;
  potentialImpact: 'Catastrophic' | 'High' | 'Moderate';
  mitigationOrRemedy: string;
  suggestedPrompt: string;
}

export interface BlindSpotReport {
  detectionConfidence: number;
  blindSpots: BlindSpotItem[];
  holisticAssessment: string;
}

export interface AssumptionItem {
  id: string;
  statement: string;
  category: 'Macroeconomic' | 'Technological' | 'Behavioral' | 'Operational' | 'Regulatory';
  fragilityScore: number; // 0-100 (100 = extremely fragile)
  sensitivityScore: number; // 0-100 (100 = high impact on conclusion)
  status: 'Accepted' | 'Contested' | 'Requires Investigation';
  vulnerabilityExplanation: string;
  stressTestCondition: string;
}

export interface AssumptionAuditReport {
  compositeFragilityScore: number;
  criticalAssumptionCount: number;
  assumptions: AssumptionItem[];
  auditSummary: string;
}

export interface DecisionFactor {
  id: string;
  name: string;
  weight: number; // 0-100 (sum should ideally be 100)
  description: string;
}

export interface DecisionOption {
  id: string;
  name: string;
  description: string;
  modelScores: Record<string, Record<string, number>>; // modelId -> factorId -> score (0-100)
  pros: string[];
  cons: string[];
  keyRisk: string;
}

export interface DecisionLabData {
  decisionTitle: string;
  factors: DecisionFactor[];
  options: DecisionOption[];
  recommendedOptionId: string;
  sensitivityAnalysis: string;
  tradeoffSummary: string;
}

export interface ScenarioVariable {
  id: string;
  name: string;
  description: string;
  currentValue: number; // 0-100 slider or baseline
  min: number;
  max: number;
  unit: string;
  presets?: { label: string; value: number }[];
}

export interface ScenarioOutcome {
  scenarioName: string;
  description: string;
  leadingOption: string;
  confidenceScore: number;
  keyConsequences: string[];
  modelConsensusShift: string;
}

export interface ScenarioLabData {
  baselineOutcome: string;
  variables: ScenarioVariable[];
  activeScenarioName: string;
  calculatedOutcome: ScenarioOutcome;
  savedScenarios: { name: string; variableValues: Record<string, number>; outcome: ScenarioOutcome }[];
}

export interface FailureMode {
  name: string;
  triggerEvent: string;
  probability: 'Low' | 'Medium' | 'High';
  impact: 'Severe' | 'Moderate' | 'Critical';
  defenseStrategy: string;
}

export interface FalsificationCriterion {
  testCondition: string;
  metricThreshold: string;
  observableSignal: string;
}

export interface RedTeamDossier {
  consensusAttacked: string;
  counterTheses: {
    title: string;
    argument: string;
    evidenceCited: string[];
    adversarialModel: string;
  }[];
  failureModes: FailureMode[];
  falsificationCriteria: FalsificationCriterion[];
  worstCaseScenario: string;
  adversarialVerdict: 'Vulnerable to Disruption' | 'Resilient with Caveats' | 'Highly Fragile' | 'Robust';
  stressTestScore: number; // 0-100 (higher = more resilient)
}

export interface ReportSection {
  id: string;
  title: string;
  enabled: boolean;
  content: string;
}

export interface IntelligenceReportData {
  id: string;
  title: string;
  dossierNumber: string;
  classification: 'RESTRICTED INTELLIGENCE' | 'DECISION BRIEF' | 'STRATEGIC DOSSIER';
  generatedAt: string;
  executiveSummary: string;
  keyFindings: string[];
  sections: ReportSection[];
  exportFormats: ('markdown' | 'pdf' | 'json')[];
}

// -------------------------------------------------------------
// AI BENCHMARK ARENA TYPES
// -------------------------------------------------------------
export type ArenaCategory = 'Reasoning' | 'Coding' | 'Creative' | 'Factual Recall' | 'Instruction Following' | 'Custom';

export interface ArenaDimensionScore {
  dimension: string;
  score: number; // 0-100
  note: string;
}

export interface ArenaModelRank {
  rank: number;
  modelId: string;
  modelName: string;
  provider: string;
  overallScore: number;
  latencyMs: number;
  tokenOutput: number;
  winRate: number;
  response: string;
  dimensionScores: ArenaDimensionScore[];
  verdictHighlight: string;
}

export interface ArenaBenchmarkRun {
  id: string;
  category: ArenaCategory;
  taskPrompt: string;
  rubric: string[];
  modelsParticipating: string[];
  timestamp: string;
  rankings: ArenaModelRank[];
  consensusWinner: string;
  keyTakeaway: string;
}

// -------------------------------------------------------------
// PROMPT MATRIX SANDBOX TYPES
// -------------------------------------------------------------
export interface PromptMatrixRow {
  id: string;
  variantLabel: string;
  promptText: string;
  systemInstruction?: string;
}

export interface PromptMatrixCol {
  id: string;
  modelId: string;
  temperature: number;
  responseLength: 'Concise' | 'Balanced' | 'Exhaustive';
}

export interface PromptMatrixCell {
  rowId: string;
  colId: string;
  response: string;
  latencyMs: number;
  tokenCount: number;
  score: number;
  status: 'completed' | 'generating' | 'error';
}

export interface PromptMatrixGrid {
  title: string;
  baseConcept: string;
  rows: PromptMatrixRow[];
  cols: PromptMatrixCol[];
  cells: Record<string, PromptMatrixCell>; // key: `${rowId}_${colId}`
}

// -------------------------------------------------------------
// EXECUTIVE BRIEFING PRESENTATION TYPES
// -------------------------------------------------------------
export interface BriefingSlide {
  id: string;
  slideNumber: number;
  title: string;
  subtitle: string;
  category: 'Overview' | 'Findings' | 'Disputes' | 'Fragility' | 'Decision Matrix' | 'Scenarios' | 'Red Team' | 'Synthesis';
  bulletPoints: string[];
  calloutQuote?: string;
  metrics?: { label: string; value: string; delta?: string }[];
  visualType: 'bullets' | 'matrix' | 'quote' | 'stats' | 'timeline';
  enabled: boolean;
}

export interface ExecutiveBriefing {
  id: string;
  title: string;
  subtitle: string;
  presenter: string;
  targetAudience: string;
  executiveContext: string;
  generatedDate: string;
  slides: BriefingSlide[];
  theme: 'editorial-dark' | 'corporate-light' | 'laboratory-minimal';
}

// -------------------------------------------------------------
// REAL-TIME INTELLIGENCE TELEMETRY TYPES
// -------------------------------------------------------------
export interface ModelTelemetrySnapshot {
  modelId: string;
  modelName: string;
  latencyMs: number;
  tokensPerSec: number;
  confidenceScore: number;
  costEstimate: number;
  status: 'idle' | 'streaming' | 'complete';
}

export interface ConflictEmergenceEvent {
  id: string;
  timestamp: string;
  topic: string;
  divergingModels: string[];
  severity: 'Critical' | 'Moderate' | 'Minor';
  snippet: string;
}

export interface UncertaintyDriftPoint {
  timeStep: string;
  uncertaintyScore: number;
  certaintyScore: number;
  contributingFactor: string;
}

export interface LiveTelemetryData {
  activeSessionId: string;
  totalTokensProcessed: number;
  accumulatedCost: number;
  averageLatencyMs: number;
  currentConfidenceAvg: number;
  modelSnapshots: ModelTelemetrySnapshot[];
  conflictEvents: ConflictEmergenceEvent[];
  uncertaintyDrift: UncertaintyDriftPoint[];
}

// -------------------------------------------------------------
// COLLABORATIVE INTELLIGENCE & ANNOTATIONS
// -------------------------------------------------------------
export interface CollaboratorMember {
  id: string;
  name: string;
  email: string;
  role: 'Owner' | 'Editor' | 'Commenter' | 'Viewer';
  avatarColor: string;
  joinedAt: string;
  lastActive: string;
}

export interface SessionAnnotation {
  id: string;
  authorName: string;
  authorEmail: string;
  targetNodeOrModel: string;
  content: string;
  timestamp: string;
  resolved: boolean;
}
