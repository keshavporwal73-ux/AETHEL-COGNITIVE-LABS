# Requirements Document

## 1. Application Overview

**Name**: AETHEL COGNITIVE LABS
**Tagline**: Turn multiple AI perspectives into structured intelligence. See Every Perspective. Think Beyond One Model.
**Brand Descriptor**: AI Decision & Intelligence Laboratory
**Footer Endorsement**: A Curio Network product

**Description**: AETHEL COGNITIVE LABS is a production-ready web application that enables users to query, compare, analyze, and synthesize responses from multiple AI models simultaneously. It elevates multi-model intelligence into a structured 7-stage decision workflow: QUESTION -> INVESTIGATE -> CROSS-EXAMINE -> MAP -> STRESS-TEST -> SYNTHESIZE -> DECIDE. It provides specialized modes for research, debate, fact-checking, image generation, file analysis, and a suite of advanced intelligence capabilities including Intelligence Map, Conflict Map, Uncertainty Map, Blind-Spot Detection, Assumption Audit, Decision Lab, Scenario Lab, Red Team, and Intelligence Report, all within a unified workspace. New capabilities include an AI Benchmark Arena, Collaborative Intelligence Workspace, Executive Briefing Builder, Prompt Matrix Sandbox, and Real-Time Intelligence Telemetry Suite.

---

## 2. Users and Use Cases

**Target Users**: AI power users, researchers, developers, content creators, analysts, and decision-makers who need to leverage multiple AI models for complex tasks and structured decision-making.

**Core Use Cases**:
- Compare responses from multiple AI models side by side
- Generate and compare AI images across providers
- Conduct structured research with multi-model synthesis
- Fact-check claims using multiple AI sources
- Run structured AI debates on propositions
- Analyze uploaded documents across multiple models
- Map intelligence across claims, evidence, perspectives, and conflicts
- Stress-test conclusions with adversarial red-teaming
- Run multi-criteria decision analysis with adjustable weights
- Simulate what-if scenarios by toggling variables and assumptions
- Export comprehensive intelligence reports
- Benchmark AI models head-to-head on standardized and custom tasks
- Share collaborative intelligence workspaces with other users
- Export polished executive briefing presentations from session intelligence
- Test prompt variations systematically across a matrix of models and parameters
- Monitor real-time intelligence signals and model performance telemetry

---

## 3. Page Structure and Feature Descriptions

### 3.1 Page Hierarchy

```
AETHEL COGNITIVE LABS
├── Landing Page
├── Authentication
│   ├── Login
│   └── Register
├── Main Workspace
│   ├── Left Sidebar Navigation
│   ├── Center Workspace
│   └── Right Panel
├── Model Hub
├── Modes
│   ├── Compare Mode
│   ├── Synthesis Mode
│   ├── AI Debate Mode
│   ├── Fact Check Mode
│   └── Research Mode
├── Intelligence Suite
│   ├── Intelligence Map
│   ├── Conflict Map
│   ├── Uncertainty Map
│   ├── Blind-Spot Detection
│   ├── Assumption Audit
│   ├── Decision Lab
│   ├── Scenario Lab
│   ├── Red Team
│   └── Intelligence Report
├── Image Lab
│   ├── Generation & Comparison Grid
│   ├── Image Comparison Analysis
│   └── Image Viewer
├── File Analysis
├── AI Benchmark Arena
├── Collaborative Intelligence Workspace
├── Executive Briefing Builder
├── Prompt Matrix Sandbox
├── Intelligence Telemetry Suite
├── Session & History
├── Dashboard
└── Settings & Profile
```

### 3.2 Landing Page

- Hero section with application name, tagline, and primary CTA (Get Started, Try Demo)
- Interactive holographic branching visual animation illustrating the 7-stage workflow: QUESTION -> INVESTIGATE -> CROSS-EXAMINE -> MAP -> STRESS-TEST -> SYNTHESIZE -> DECIDE, rendered with quantum beam separators and ambient holographic particles
- Capability overview sections describing core modes, intelligence suite features, the decision laboratory positioning, and the five new capabilities
- Secondary CTAs leading to registration or demo mode
- Footer with brand endorsement: A Curio Network product

### 3.3 Authentication

**Register**: User enters email, password, and confirms password to create an account.
**Login**: User enters email and password to access the platform.
- Password reset via email link is supported.

### 3.4 App Icon and Brand Mark

- Futuristic holographic logo design featuring quantum-inspired geometric forms with layered translucent surfaces and neon edge lighting
- Cybernetic aesthetic with glowing circuit-like patterns integrated into the mark
- Variants provided for: Favicon, PWA manifest icons, mobile app icon, dark interface, light interface
- Logo incorporates animated holographic particle effects when displayed in interactive contexts

### 3.5 Visual Design System

- Color palette: deep space black, electric cyan, quantum violet, holographic silver, neon accent colors
- Cybernetic/quantum neon aesthetics throughout the interface
- Ambient holographic particles and animations on interactive elements
- Futuristic status HUDs displaying real-time system states
- Animated quantum beam separators between major UI sections
- Hyper-polished futuristic transitions with light trails and holographic dissolves
- Fine glowing borders and strong futuristic typography
- Aesthetic reference: high-tech AI research laboratory + quantum computing interface + holographic command center
- Appearance modes: Light, Dark, System (user-configurable)

### 3.6 Main Workspace

**Desktop Layout**:
- Left sidebar: navigation links to all modes and intelligence suite tools, session history, model hub, settings
- Center workspace: active conversation and intelligence workflow area displaying prompts, responses, comparison views, and intelligence outputs
- Right panel: model status, model configuration, usage stats, analysis summary

**Mobile Layout**:
- Bottom navigation bar for primary sections
- Swipeable cards for responses and comparisons
- Touch-friendly controls throughout

### 3.7 Universal Prompt Composer

Available across all relevant modes. Includes:
- Model selection (single or multi-select)
- Mode toggles (Compare, Synthesis, Debate, Fact Check, Research)
- Intelligence Suite activation toggles
- Attachment and image upload support
- Web research toggle
- Response length control
- Creativity/temperature control
- Improve Prompt action that rewrites the user's prompt for better results

### 3.8 Model Hub

- Unified model selection interface listing available AI models
- Each model displays: provider name, capability badges (Reasoning, Writing, Coding, Research, Vision, Image Generation, Fast Response), speed indicator, cost estimate
- Provider abstraction layer: models are grouped or filtered by provider but accessed through a unified interface
- Users can select default models and favorite models

### 3.9 Compare Mode

- Side-by-side response display for 2 or more selected models
- Per-response metadata: generation time, token usage, estimated cost
- Evaluation dimensions per response: Reasoning, Accuracy, Completeness, Clarity, Creativity, Evidence Quality
- Strengths and weaknesses summary per model response
- Confidence estimate per response

### 3.10 Synthesis Mode

- Aggregates responses from multiple models into a structured synthesis
- Synthesis breakdown sections: Consensus, Disagreement, Unique Insights, Uncertainty, Final Answer
- Synthesis depth options: Concise, Balanced, Deep, Expert

### 3.11 AI Debate Mode

**Input Validation and Guidance**:
- When user submits input, system validates whether it is a substantive proposition suitable for formal debate
- Non-proposition inputs (greetings like Hii, Hello, casual phrases, or non-debatable statements) trigger a helpful guidance state
- Guidance state displays: clear explanation of proposition requirements, 3-5 curated one-click debate motion examples (e.g., AI will replace most human jobs by 2030, Universal basic income should be implemented globally, Social media does more harm than good)
- User can click any example to populate the input field, or manually enter a valid proposition
- Formal debate workflow only initiates after a substantive proposition is provided

**Debate Workflow** (activated after valid proposition input):
- User assigns models to roles: Advocate, Opponent, Neutral Analyst, Fact Checker, Judge
- Debate proceeds through structured rounds: Opening Arguments, Counterarguments, Cross-Examination, Evidence Analysis, Final Verdict
- Each round displays per-model argument with breakdown and assessment

### 3.12 Fact Check Mode

**Input Validation and Guidance**:
- When user submits input, system validates whether it contains checkable factual claims
- Non-claim inputs (greetings, casual phrases, or non-factual statements) trigger a helpful guidance state
- Guidance state displays: clear explanation of claim requirements, 3-5 curated one-click claim examples for fact-checking (e.g., The Earth is flat, Vaccines cause autism, Coffee is bad for your health)
- User can click any example to populate the input field, or manually enter valid claims
- Fact-checking workflow only initiates after substantive claims are provided

**Fact-Checking Workflow** (activated after valid claims input):
- System decomposes claims into individual checkable statements
- Each claim is assigned a verification status: Supported, Unclear, Disputed, Unsupported
- Evidence and sources displayed per claim
- Model agreement level shown across participating models

### 3.13 Research Mode

**Input Validation and Guidance**:
- When user submits input, system validates whether it is a substantive research question
- Non-question inputs (greetings, casual phrases, or non-researchable statements) trigger a helpful guidance state
- Guidance state displays: clear explanation of research question requirements, 3-5 curated one-click research question examples (e.g., What are the long-term effects of remote work on productivity?, How does climate change impact global food security?, What are the ethical implications of AI in healthcare?)
- User can click any example to populate the input field, or manually enter a valid research question
- Research workflow only initiates after a substantive research question is provided

**Research Workflow** (activated after valid research question input):
- Structured research workspace with sequential stages: Research Question -> Plan -> Subquestions -> Multi-AI Investigations -> Evidence -> Cross-Model Comparison -> Synthesis
- Each stage is displayed as a distinct section within the workspace
- Export options: Markdown, PDF, Copy to clipboard

### 3.14 Intelligence Suite

The Intelligence Suite is a collection of advanced analytical tools accessible from the left sidebar and from within active sessions. All tools operate on the current session's data (prompts, model responses, and prior analysis outputs).

**Input Validation and Guidance** (applies to all Intelligence Suite tools):
- When a tool is activated without sufficient session data, or when session data consists only of non-substantive inputs (greetings, casual phrases), the tool displays a helpful guidance state
- Guidance state displays: clear explanation of data requirements, 3-5 curated one-click starter prompt examples relevant to the specific tool (e.g., for Intelligence Map: Analyze the pros and cons of renewable energy adoption, for Conflict Map: Compare different economic theories on inflation)
- User can click any example to initiate a new session with valid input, or return to the prompt composer to enter substantive content
- Tool workflow only proceeds after the session contains substantive model responses

#### 3.14.1 Intelligence Map

- Visual graph and matrix representation of claims, evidence, model perspectives, conflicts, and conclusions derived from the current session
- Nodes represent claims, evidence items, model positions, and conclusions; edges represent relationships (supports, contradicts, qualifies)
- Users can expand, collapse, and navigate nodes
- Conflicts between model perspectives are visually highlighted

#### 3.14.2 Conflict Map

- Displays a structured taxonomy of disagreements identified across model responses
- Conflict categories: Data Differences, Value Judgments, Definition Divergence, Risk Tolerance
- Each conflict entry shows: the conflicting positions, the models holding each position, and the root-cause category
- Users can drill into each conflict for detail

#### 3.14.3 Uncertainty Map

- Identifies and displays unknowns, areas of weak evidence, and fragile assumptions present in the session's intelligence
- Each uncertainty item is rated by severity and scope
- Linked to relevant model responses and evidence items

#### 3.14.4 Blind-Spot Detection

- Analyzes the session's collective model responses to surface overlooked factors, hidden variables, and unaddressed risks
- Each blind spot is described with an explanation of why it may have been missed and its potential impact

#### 3.14.5 Assumption Audit

- Extracts and lists foundational assumptions underlying the session's conclusions
- Each assumption is rated on: Fragility (how easily it breaks) and Sensitivity (how much the conclusion changes if it breaks)
- Users can mark assumptions as accepted, contested, or requiring investigation

#### 3.14.6 Decision Lab

- Multi-criteria decision matrix workspace
- User defines decision options (rows) and evaluation factors (columns)
- User adjusts factor weights via interactive controls
- Each model's score contributions per option-factor cell are displayed
- Weighted aggregate scores are calculated and ranked
- Users can add, remove, or rename options and factors

#### 3.14.7 Scenario Lab

- Interactive what-if scenario simulation workspace
- User defines variables and assumptions that can be toggled or adjusted
- Changing a variable or assumption triggers re-evaluation of outcomes in real time
- Multiple scenarios can be saved and compared side by side
- Scenario outcomes are displayed with model-sourced reasoning

#### 3.14.8 Red Team

- Adversarial stress-testing tool that targets the session's consensus conclusions
- Generates counter-theses challenging the primary conclusion
- Identifies worst-case failure modes
- Provides falsification criteria: conditions under which the conclusion would be proven wrong
- Red Team output is structured as: Counter-Thesis, Failure Modes, Falsification Criteria, Severity Assessment

#### 3.14.9 Intelligence Report

- Comprehensive structured dossier that aggregates all intelligence vectors from the current session
- Report sections: Executive Summary, Key Findings, Intelligence Map Summary, Conflict Analysis, Uncertainty Assessment, Blind Spots, Assumption Audit, Decision Matrix (if applicable), Scenario Outcomes (if applicable), Red Team Findings, Final Synthesis
- Export options: Markdown, PDF, Copy to clipboard
- User can select which sections to include before export

### 3.15 Image Lab

**Generation and Comparison Grid**:
- User inputs a prompt, selects 2-4 image generation models
- Desktop: 2-4 column grid layout
- Mobile: swipeable card layout
- Controls: aspect ratio, resolution, style, quality, negative prompt, reference image upload

**Image Comparison Analysis and Prompt Optimizer**:
- Per-image analysis dimensions: Visual Quality, Composition, Lighting, Detail, Prompt Adherence
- Strengths and weaknesses per generated image
- User selection action: My Choice to mark preferred result
- Improve Image Prompt action to enhance the generation prompt
- Image-to-Image comparison with a reference image

**Image Viewer**:
- Full-screen view with zoom
- Actions: Download, Copy, Share, Save, Regenerate, Use as Reference, Generate Variation

### 3.16 File Analysis

- User uploads one or more files (PDF, DOCX, TXT, CSV, Images)
- User selects multiple models to analyze the file(s)
- Responses from each model are displayed in a comparison layout

### 3.17 Smart Model Routing

- Auto Select Models option available in the prompt composer
- System detects task type (Coding, Research, Image Generation, Creative, Fast) and selects appropriate models
- Explanation of routing decision is displayed to the user

### 3.18 Session and History System

- All sessions are saved and listed in the left sidebar
- Per-session actions: Rename, Star, Archive, Delete, Duplicate, Export, Share
- Search across session history by keyword

### 3.19 Dashboard and Personal Model Intelligence

- Analytics overview: total sessions, total questions asked, model usage breakdown, image generations count
- User ratings per model interaction
- Speed and estimated cost statistics per model
- Visualized usage trends over time

### 3.20 Settings and User Profile

- User profile: display name, email, avatar
- AI preferences: default models, preferred synthesis depth, default mode
- Appearance: Light / Dark / System
- Privacy controls: data retention preferences
- Usage and cost stats summary

### 3.21 Provider Architecture and Demo Mode

- Standardized AI provider abstraction layer: all models accessed through a unified interface regardless of underlying provider
- Server-side API integration via Edge Functions
- DEMO mode: when live API keys are not configured, the platform operates in demo mode with realistic simulated responses
- DEMO mode is clearly indicated with a persistent badge throughout the UI

### 3.22 Progressive Web App (PWA)

- Web app manifest with application name, icons, theme color, display mode
- PWA icons in all required sizes (from brand mark variants)
- Offline app shell: core UI loads without network; active sessions require connectivity
- Mobile touch-friendly design throughout

### 3.23 Accessibility and Micro-interactions

- Fine animations on transitions, loading states, and interactive elements
- Accessible focus states on all interactive elements
- Screen-reader support with appropriate ARIA labels and semantic markup
- Responsive UI across desktop and mobile breakpoints

### 3.24 AI Benchmark Arena

- Dedicated workspace for head-to-head model benchmarking
- Users select 2 or more models and choose a benchmark task category: Reasoning, Coding, Creative Writing, Factual Recall, Instruction Following, or Custom
- For Custom benchmarks, users define their own task prompt and evaluation rubric
- Each model's response is scored against the rubric across defined dimensions
- Results are displayed in a ranked leaderboard view with per-dimension score breakdowns
- Users can save benchmark runs and compare results across multiple runs over time
- Benchmark results are exportable as Markdown or PDF

### 3.25 Collaborative Intelligence Workspace

- Users can invite other registered users to a shared workspace session by email
- Invited collaborators can view the session's prompts, model responses, and intelligence suite outputs in real time
- Collaborators can add annotations and comments on individual model responses and intelligence outputs
- The workspace owner controls access permissions: View Only or Comment
- The workspace owner can revoke access at any time
- A shared workspace link can be generated for read-only access without authentication
- All collaboration activity (annotations, comments) is attributed to the contributing user

### 3.26 Executive Briefing Builder

- Users can compose a polished executive briefing presentation from the intelligence outputs of the current session
- Users select which intelligence components to include: Key Findings, Conflict Summary, Assumption Audit, Decision Matrix, Scenario Outcomes, Red Team Summary, Final Synthesis
- Each selected component is rendered as a structured slide or section within the briefing
- Users can add a custom title, subtitle, and introductory context to the briefing
- Export options: PDF presentation format, PowerPoint-compatible format, Markdown
- Briefings are saved to the user's session history and can be re-exported at any time

### 3.27 Prompt Matrix Sandbox

- Dedicated workspace for systematic prompt variation testing
- Users define a base prompt and create a matrix of variations across two axes: Prompt Variants (rows) and Models or Parameter Settings (columns)
- Parameter settings that can be varied per column: model selection, response length, creativity/temperature level
- Each cell in the matrix executes the corresponding prompt variant against the corresponding model or parameter configuration
- Results are displayed in a grid view; users can expand any cell to view the full response
- Users can add, remove, or edit rows and columns at any time
- Matrix results are exportable as Markdown or CSV

### 3.28 Real-Time Intelligence Telemetry Suite

- A live monitoring dashboard displaying real-time signals from active sessions and model interactions
- Telemetry panels include:
  - Model Response Latency: live latency readings per model across active requests
  - Token Throughput: tokens generated per second per model
  - Confidence Signal Tracker: tracks confidence estimates across model responses in the current session over time
  - Conflict Emergence Feed: surfaces new conflicts detected between model responses as they are generated
  - Uncertainty Drift Indicator: monitors changes in the session's uncertainty profile as new responses arrive
  - Cost Accumulation Meter: running estimated cost total for the current session updated in real time
- Users can pin or unpin individual telemetry panels to customize their monitoring view
- Telemetry data for a session can be exported as a structured log in CSV or JSON format

---

## 4. Business Rules and Logic

4.1 A user must be authenticated to access the Main Workspace, all modes, and all Intelligence Suite tools. Unauthenticated users may view the Landing Page and enter Demo Mode.

4.2 In Demo Mode, all features including the full Intelligence Suite are accessible with simulated AI responses. A persistent DEMO badge is displayed. No real API calls are made.

4.3 Model selection in Compare Mode requires a minimum of 2 models. Maximum concurrent models per comparison is determined by the provider abstraction layer configuration.

4.4 The Improve Prompt action rewrites the user's current prompt and replaces it in the composer before submission. The original prompt is preserved for reference.

4.5 Smart Model Routing overrides manual model selection when activated. The user can review and override the auto-selected models before submitting.

4.6 In AI Debate Mode, each role (Advocate, Opponent, Neutral Analyst, Fact Checker, Judge) must be assigned to a model before the debate begins. The same model may not be assigned to multiple roles.

4.7 Research Mode export generates a structured document containing all stages, evidence, and synthesis from the current research session.

4.8 Session history is scoped to the authenticated user. Shared sessions generate a read-only link accessible without authentication.

4.9 Estimated cost displayed in the UI is an approximation based on token counts and provider pricing; it is not a billing commitment.

4.10 Image Lab reference image upload is used as a conditioning input for Image-to-Image generation and comparison analysis.

4.11 Intelligence Suite tools (Intelligence Map, Conflict Map, Uncertainty Map, Blind-Spot Detection, Assumption Audit, Red Team) operate on the data present in the current session. They require at least one completed model response before activation.

4.12 Decision Lab requires the user to define at least 2 options and at least 1 factor before scores can be calculated. Factor weights must sum to 100%; the UI enforces this constraint.

4.13 Scenario Lab re-evaluation is triggered when the user modifies a variable or assumption. The previous scenario state is preserved and accessible for comparison.

4.14 Intelligence Report section inclusion is user-controlled. At minimum, Executive Summary and Final Synthesis must be included in any export.

4.15 The 7-stage workflow (QUESTION -> INVESTIGATE -> CROSS-EXAMINE -> MAP -> STRESS-TEST -> SYNTHESIZE -> DECIDE) is surfaced as a guided workflow option within the Main Workspace. Users may also access individual modes and Intelligence Suite tools independently.

4.16 AI Benchmark Arena requires a minimum of 2 models to be selected before a benchmark run can be initiated. For Custom benchmarks, the user must define both a task prompt and at least one evaluation dimension before the run begins.

4.17 Collaborative Intelligence Workspace access is controlled by the workspace owner. Collaborators with View Only permission cannot add annotations or comments. The owner may change a collaborator's permission level or revoke access at any time.

4.18 Executive Briefing Builder requires at least one intelligence component to be selected before export. The briefing is generated from the data present in the current session at the time of export.

4.19 Prompt Matrix Sandbox requires at least 1 prompt variant row and at least 2 columns (model or parameter configurations) before execution. Each cell executes independently; a failure in one cell does not block other cells from completing.

4.20 Real-Time Intelligence Telemetry Suite panels display data scoped to the current active session. Telemetry log export covers the full duration of the current session.

4.21 Input Validation for Proposition-Based Modes and Intelligence Suite: AI Debate Mode, Fact Check Mode, Research Mode, and all Intelligence Suite tools validate user input to ensure it is substantive and suitable for the intended workflow. Non-substantive inputs (greetings, casual phrases, non-debatable or non-researchable statements) trigger a guidance state displaying clear requirements and 3-5 curated one-click starter examples. Formal workflows only initiate after valid substantive input is provided.

---

## 5. Edge Cases and Boundary Conditions

| Scenario | Handling |
|---|---|
| User submits prompt with no model selected | Prompt composer blocks submission; prompts user to select at least one model |
| API key not configured for a selected model | Model is marked unavailable; user is shown a DEMO fallback option |
| File upload format not supported | User is notified; unsupported file is rejected |
| Debate role left unassigned | Debate cannot start; unassigned roles are highlighted |
| Session export fails | User is notified; retry option is provided |
| Image generation model returns an error | Error state shown in that model's grid cell; other results remain visible |
| User attempts to compare fewer than 2 models in Compare Mode | Submission blocked with inline guidance |
| Intelligence Suite tool activated with no session data | Tool displays an empty state with guidance to run a prompt first |
| Decision Lab factor weights do not sum to 100% | Submission blocked; UI shows remaining weight to allocate |
| Scenario Lab variable change produces no model data | Re-evaluation displays a no-data state with option to re-run |
| Intelligence Report export with no sections selected | Export blocked; user must select at least Executive Summary and Final Synthesis |
| Benchmark Arena run initiated with fewer than 2 models | Run blocked; user is prompted to select at least 2 models |
| Custom benchmark submitted without evaluation dimensions | Run blocked; user is prompted to define at least one evaluation dimension |
| Collaborator invitation sent to unregistered email | Invitation is queued; collaborator must register before accessing the workspace |
| Executive Briefing export initiated with no components selected | Export blocked; user must select at least one intelligence component |
| Prompt Matrix Sandbox cell execution fails for one model | Failed cell displays an error state; remaining cells complete normally |
| Telemetry Suite displays no data for a new session | Panels show empty states with guidance to initiate a prompt |
| User submits greeting or non-proposition in AI Debate Mode | Guidance state displayed with proposition requirements and 3-5 curated one-click debate motion examples |
| User submits greeting or non-claim in Fact Check Mode | Guidance state displayed with claim requirements and 3-5 curated one-click claim examples |
| User submits greeting or non-question in Research Mode | Guidance state displayed with research question requirements and 3-5 curated one-click research question examples |
| User activates Intelligence Suite tool with only greeting/non-substantive session data | Guidance state displayed with data requirements and 3-5 curated one-click starter prompt examples relevant to the tool |

---

## 6. Acceptance Criteria

1. User visits the Landing Page, views the holographic 7-stage workflow animation with quantum beam separators and ambient particles (QUESTION -> INVESTIGATE -> CROSS-EXAMINE -> MAP -> STRESS-TEST -> SYNTHESIZE -> DECIDE), and clicks Get Started.
2. User registers with email and password, then logs in and lands on the Main Workspace with futuristic holographic UI elements.
3. User selects 3 models, enters a prompt, activates Compare Mode, and views side-by-side responses with evaluation dimensions and metadata.
4. User activates Synthesis Mode on the same session and views a structured synthesis with Consensus, Disagreement, Unique Insights, and Final Answer.
5. User opens Intelligence Map and views a visual graph of claims, evidence, model perspectives, and conflicts from the session.
6. User opens Conflict Map and views a taxonomy of disagreements categorized by root cause.
7. User opens Assumption Audit, reviews extracted assumptions with Fragility and Sensitivity ratings, and marks one assumption as contested.
8. User opens Decision Lab, defines 2 options and 3 factors, adjusts factor weights, and views weighted aggregate scores ranked by model contributions.
9. User opens Scenario Lab, toggles a variable, and views re-evaluated outcomes in real time.
10. User opens Red Team and views counter-theses, failure modes, and falsification criteria targeting the session's consensus conclusion.
11. User opens Intelligence Report, selects sections to include, and exports the report as PDF.
12. User navigates to Image Lab, enters an image prompt, selects 2 image generation models, and views the comparison grid with per-image analysis.
13. User opens Session History, searches for a past session, renames it, and stars it.
14. User visits the Dashboard and views model usage statistics and estimated cost displayed in futuristic status HUDs.
15. User navigates to AI Benchmark Arena, selects 2 models, chooses the Reasoning category, runs the benchmark, and views the ranked leaderboard with per-dimension score breakdowns.
16. User creates a Collaborative Intelligence Workspace, invites a collaborator by email with Comment permission, and the collaborator adds an annotation to a model response.
17. User opens Executive Briefing Builder, selects Key Findings and Final Synthesis components, adds a custom title, and exports the briefing as PDF.
18. User opens Prompt Matrix Sandbox, defines 2 prompt variants and 3 model columns, executes the matrix, and views all 6 result cells in the grid.
19. User opens the Intelligence Telemetry Suite during an active session and views live latency, token throughput, and cost accumulation panels updating in real time with holographic visualizations.
20. User enters Hello in AI Debate Mode, sees guidance state with proposition requirements and 3 curated one-click debate motion examples, clicks one example, assigns models to roles, and views the formal debate workflow.
21. User enters Hii in Fact Check Mode, sees guidance state with claim requirements and 3 curated one-click claim examples, clicks one example, and views the fact-checking workflow with verification statuses.
22. User enters a casual phrase in Research Mode, sees guidance state with research question requirements and 3 curated one-click research question examples, clicks one example, and views the structured research workflow.
23. User activates Intelligence Map with a session containing only a greeting, sees guidance state with data requirements and 3 curated one-click starter prompt examples, clicks one example to initiate a new session, and views the Intelligence Map after model responses are generated.
24. User activates Red Team with insufficient session data, sees guidance state with clear requirements and curated starter examples, enters a substantive prompt, and views the Red Team adversarial analysis output.

---

## 7. Out of Scope for This Release

- Team or organization accounts and collaborative workspaces beyond the per-session sharing model defined above
- Real-time multiplayer or shared live sessions beyond the collaborative workspace feature defined above
- Billing, subscription management, or payment processing
- Native iOS or Android applications
- Custom model fine-tuning or model training interfaces
- Plugin or extension marketplace
- Webhook or third-party integration configuration UI
- Voice input or audio output
- Automated scheduled research or batch processing jobs