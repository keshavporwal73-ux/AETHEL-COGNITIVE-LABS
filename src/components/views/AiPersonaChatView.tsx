import React, { useState, useRef, useEffect } from 'react';
import { useParallax } from '@/contexts/ParallaxContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import { 
  Users, Send, RefreshCw, Brain, Flame, Shield, TrendingUp, 
  Lightbulb, Scale, Sparkles, ChevronDown, Copy, Star
} from 'lucide-react';
import { toast } from 'sonner';

type PersonaId = 'analyst' | 'optimist' | 'pessimist' | 'devils_advocate' | 'pragmatist';

interface Persona {
  id: PersonaId;
  name: string;
  title: string;
  stance: string;
  icon: React.ReactNode;
  color: string;
  borderColor: string;
  bgColor: string;
  tagline: string;
  systemProfile: string;
}

interface PersonaMessage {
  id: string;
  personaId: PersonaId;
  content: string;
  timestamp: Date;
  isDemo: boolean;
  starred?: boolean;
}

const PERSONAS: Persona[] = [
  {
    id: 'analyst',
    name: 'The Analyst',
    title: 'Neutral Evidence Auditor',
    stance: 'Data-driven',
    icon: <Brain className="w-4 h-4" />,
    color: 'text-cyan-300',
    borderColor: 'border-cyan-500/40',
    bgColor: 'bg-cyan-950/30',
    tagline: 'What does the data actually show?',
    systemProfile: 'You are a neutral intelligence analyst. You assess claims using empirical evidence, statistical data, and historical precedents. You never take a normative stance — only cite verifiable facts.',
  },
  {
    id: 'optimist',
    name: 'The Optimist',
    title: 'Upside Opportunity Scout',
    stance: 'Bullish',
    icon: <TrendingUp className="w-4 h-4" />,
    color: 'text-emerald-300',
    borderColor: 'border-emerald-500/40',
    bgColor: 'bg-emerald-950/30',
    tagline: 'Where is the largest opportunity space?',
    systemProfile: 'You are an enthusiastic opportunity scout. You highlight the best-case scenarios, emerging opportunities, and positive second-order effects that others may overlook.',
  },
  {
    id: 'pessimist',
    name: 'The Pessimist',
    title: 'Downside Risk Auditor',
    stance: 'Bearish',
    icon: <Shield className="w-4 h-4" />,
    color: 'text-rose-300',
    borderColor: 'border-rose-500/40',
    bgColor: 'bg-rose-950/30',
    tagline: 'What are the catastrophic failure modes?',
    systemProfile: 'You are a risk-focused pessimist. You surface worst-case outcomes, systemic fragilities, and tail risks that optimists discount. You question every assumption.',
  },
  {
    id: 'devils_advocate',
    name: "Devil's Advocate",
    title: 'Adversarial Contrarian',
    stance: 'Contrarian',
    icon: <Flame className="w-4 h-4" />,
    color: 'text-amber-300',
    borderColor: 'border-amber-500/40',
    bgColor: 'bg-amber-950/30',
    tagline: 'Why is the consensus reasoning fatally flawed?',
    systemProfile: "You are a pure contrarian. Your role is to aggressively argue the opposite of any emerging consensus. You challenge assumptions, expose logical fallacies, and steelman the minority position.",
  },
  {
    id: 'pragmatist',
    name: 'The Pragmatist',
    title: 'Actionable Synthesis Engineer',
    stance: 'Balanced',
    icon: <Scale className="w-4 h-4" />,
    color: 'text-violet-300',
    borderColor: 'border-violet-500/40',
    bgColor: 'bg-violet-950/30',
    tagline: 'What is the realistic, actionable path forward?',
    systemProfile: 'You are a pragmatic synthesizer. You weigh tradeoffs, acknowledge complexity, and produce concrete recommendations that balance risk with opportunity. You are outcome-focused.',
  },
];

const DEMO_RESPONSES: Record<PersonaId, string[]> = {
  analyst: [
    "Based on BIS 2024 Q3 data, DLT adoption in wholesale finance increased 34% YoY. However, 67% of pilot programmes have failed to achieve production scale within 36 months, suggesting the operational readiness gap remains critical.",
    "Cross-referencing the Federal Reserve's 2025 FedNow usage statistics with ECB TARGET2 settlement latency metrics reveals a 2.3σ divergence in real-time settlement efficiency. This is statistically significant at p < 0.01.",
  ],
  optimist: [
    "The convergence of ISO 20022 messaging standards with atomic swap protocols creates an unprecedented opportunity window. Early movers in Phase 1 modernization stand to capture 28-40% cost reduction in correspondent banking by 2027.",
    "Project Agorá's preliminary CBDC results are genuinely exciting — the 64% settlement speed improvement represents a paradigm shift that could unlock $2.3 trillion in dormant overnight liquidity globally.",
  ],
  pessimist: [
    "The regulatory arbitrage risk is catastrophically underpriced. The moment a major sovereign imposes capital controls on DLT settlement nodes, 84% of cross-border atomic swap volume would freeze instantly with no emergency unwinding mechanism.",
    "Validator collusion under Byzantine fault conditions remains an unsolved engineering problem. Every 'solution' I've reviewed in academic literature assumes honest majority participation — an assumption that will fail during the next systemic stress event.",
  ],
  devils_advocate: [
    "Everyone is celebrating ISO 20022 adoption, but nobody is asking: why has SWIFT been 'modernizing' for 50 years and still processes $5 trillion/day on COBOL? The incumbents have zero incentive to enable the disintermediation the blockchain advocates promise.",
    "The BIS Project Agorá findings you're citing were conducted in a sandbox with zero adversarial load. Any DeFi protocol that has survived more than 18 months in production has been hacked at least once. Your 'governance overhead' metric is fiction.",
  ],
  pragmatist: [
    "Synthesizing all perspectives: a phased hybrid approach is optimal. Phase 1 (24 months): ISO 20022 messaging modernization on existing rails — low risk, high ROI. Phase 2 (48 months): Atomic swap pilots on permissioned side-chains with quarterly regulatory reviews. Full DLT commitment only after Phase 2 evidence threshold.",
    "The real actionable insight here is to separate the settlement innovation from the clearing infrastructure. You can modernize messaging standards immediately without committing to blockchain settlement — this unlocks 60% of the efficiency gains at 20% of the governance risk.",
  ],
};

export const AiPersonaChatView: React.FC = () => {
  const { runPrompt, isGenerating } = useParallax();
  const [activePersonas, setActivePersonas] = useState<PersonaId[]>(['analyst', 'optimist', 'pessimist']);
  const [messages, setMessages] = useState<PersonaMessage[]>([]);
  const [prompt, setPrompt] = useState('');
  const [isSimulating, setIsSimulating] = useState(false);
  const [expandedPersonas, setExpandedPersonas] = useState<Set<string>>(new Set());
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const togglePersona = (id: PersonaId) => {
    setActivePersonas(prev =>
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  const simulateDebate = async () => {
    if (!prompt.trim() && messages.length === 0) {
      toast.error('Enter a topic or question to begin the persona debate');
      return;
    }
    setIsSimulating(true);
    const simulationPrompt = prompt.trim() || 'Continuation of the current analysis';
    setPrompt('');

    for (let i = 0; i < activePersonas.length; i++) {
      const personaId = activePersonas[i];
      const responses = DEMO_RESPONSES[personaId];
      const response = responses[Math.floor(Math.random() * responses.length)];

      await new Promise(res => setTimeout(res, 600 + i * 800));
      setMessages(prev => [...prev, {
        id: `${Date.now()}_${personaId}`,
        personaId,
        content: response,
        timestamp: new Date(),
        isDemo: true,
      }]);
    }
    setIsSimulating(false);
  };

  const clearSession = () => {
    setMessages([]);
    toast.info('Persona debate session cleared');
  };

  const copyMessage = (content: string) => {
    navigator.clipboard.writeText(content);
    toast.success('Copied to clipboard');
  };

  const toggleStar = (id: string) => {
    setMessages(prev => prev.map(m => m.id === id ? { ...m, starred: !m.starred } : m));
  };

  const getPersona = (id: PersonaId) => PERSONAS.find(p => p.id === id)!;

  return (
    <div className="w-full space-y-4">
      {/* Header */}
      <div className="p-4 rounded-xl bg-card border border-border flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-violet-600/30 to-rose-600/20 border border-violet-500/30 flex items-center justify-center">
            <Users className="w-5 h-5 text-violet-400" />
          </div>
          <div>
            <h2 className="font-serif text-base font-bold flex items-center gap-2">
              AI Persona Chat Panel
              <Badge variant="outline" className="text-[10px] font-mono border-violet-500/30 text-violet-400 bg-violet-950/30">
                MULTI-VOICE INTELLIGENCE
              </Badge>
            </h2>
            <p className="text-[11px] text-muted-foreground font-mono">{activePersonas.length} active voices · {messages.length} exchanges</p>
          </div>
        </div>
        <Button size="sm" variant="outline" onClick={clearSession} className="h-8 text-xs border-border">
          <RefreshCw className="w-3.5 h-3.5 mr-1.5" />Clear Session
        </Button>
      </div>

      {/* Persona Selector Grid */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
        {PERSONAS.map(persona => {
          const isActive = activePersonas.includes(persona.id);
          return (
            <button
              key={persona.id}
              onClick={() => togglePersona(persona.id)}
              className={`p-3 rounded-xl border text-left transition-all ${
                isActive
                  ? `${persona.bgColor} ${persona.borderColor} shadow-sm`
                  : 'bg-muted/20 border-border/60 opacity-60 hover:opacity-80'
              }`}
            >
              <div className={`flex items-center gap-1.5 mb-1.5 ${isActive ? persona.color : 'text-muted-foreground'}`}>
                {persona.icon}
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider">{persona.stance}</span>
              </div>
              <div className={`text-xs font-semibold mb-0.5 ${isActive ? persona.color : 'text-muted-foreground'}`}>{persona.name}</div>
              <div className="text-[10px] text-muted-foreground leading-tight">{persona.title}</div>
              {isActive && (
                <div className={`mt-1.5 text-[9px] font-mono italic ${persona.color} opacity-80 leading-tight`}>
                  "{persona.tagline}"
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Chat Feed */}
      <div
        ref={scrollRef}
        className="rounded-xl border border-border bg-[#070b14] p-4 space-y-4 overflow-y-auto"
        style={{ height: 400 }}
      >
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-600/20 to-cyan-600/20 border border-violet-500/20 flex items-center justify-center mb-4">
              <Lightbulb className="w-8 h-8 text-violet-400 opacity-60" />
            </div>
            <p className="text-sm font-medium text-muted-foreground mb-1">No exchanges yet</p>
            <p className="text-xs text-muted-foreground max-w-xs">
              Select personas above, enter a topic below, and trigger the multi-voice debate to see all active personas respond simultaneously.
            </p>
          </div>
        ) : (
          messages.map((msg) => {
            const persona = getPersona(msg.personaId);
            const isExp = expandedPersonas.has(msg.id);
            return (
              <div key={msg.id} className={`rounded-xl border p-4 space-y-2 ${persona.bgColor} ${persona.borderColor}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={persona.color}>{persona.icon}</span>
                    <span className={`text-xs font-bold ${persona.color}`}>{persona.name}</span>
                    <Badge variant="outline" className={`text-[9px] font-mono ${persona.borderColor} ${persona.color} bg-transparent`}>
                      {persona.stance}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-[10px] font-mono text-muted-foreground">
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                    <button onClick={() => toggleStar(msg.id)} className={`p-1 rounded transition-colors ${msg.starred ? 'text-amber-400' : 'text-muted-foreground hover:text-amber-400'}`}>
                      <Star className="w-3 h-3" fill={msg.starred ? 'currentColor' : 'none'} />
                    </button>
                    <button onClick={() => copyMessage(msg.content)} className="p-1 rounded text-muted-foreground hover:text-foreground transition-colors">
                      <Copy className="w-3 h-3" />
                    </button>
                  </div>
                </div>
                <p className={`text-xs leading-relaxed text-foreground/90 ${!isExp && msg.content.length > 200 ? 'line-clamp-3' : ''}`}>
                  {msg.content}
                </p>
                {msg.content.length > 200 && (
                  <button
                    onClick={() => setExpandedPersonas(s => {
                      const next = new Set(s);
                      isExp ? next.delete(msg.id) : next.add(msg.id);
                      return next;
                    })}
                    className={`flex items-center gap-1 text-[10px] font-mono ${persona.color} hover:underline`}
                  >
                    {isExp ? 'Collapse' : 'Expand full analysis'}
                    <ChevronDown className={`w-3 h-3 transition-transform ${isExp ? 'rotate-180' : ''}`} />
                  </button>
                )}
              </div>
            );
          })
        )}

        {/* Typing indicators */}
        {isSimulating && (
          <div className="flex items-center gap-3 p-3 rounded-xl border border-border bg-muted/20">
            <div className="flex gap-1">
              {[0, 1, 2].map(i => (
                <span key={i} className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: `${i * 150}ms` }} />
              ))}
            </div>
            <span className="text-xs text-muted-foreground font-mono">Personas composing responses…</span>
          </div>
        )}
      </div>

      {/* Prompt Input */}
      <div className="p-3 rounded-xl border border-border bg-card space-y-3">
        <Textarea
          value={prompt}
          onChange={e => setPrompt(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter' && e.metaKey) simulateDebate();
          }}
          placeholder="Enter a topic, question, or claim for all active personas to address… (⌘+Enter to submit)"
          className="min-h-16 text-xs bg-background border-border resize-none"
        />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-[11px] text-muted-foreground font-mono">
            <span>{activePersonas.length} voice{activePersonas.length !== 1 ? 's' : ''} active</span>
            <span className="text-border">·</span>
            <span>{messages.filter(m => m.starred).length} starred exchanges</span>
          </div>
          <Button
            onClick={simulateDebate}
            disabled={isSimulating || activePersonas.length === 0}
            className="h-9 px-5 text-xs bg-gradient-to-r from-violet-600 to-rose-600 hover:from-violet-500 hover:to-rose-500 text-white border-0 gap-2"
          >
            {isSimulating
              ? <><RefreshCw className="w-3.5 h-3.5 animate-spin" />Simulating…</>
              : <><Sparkles className="w-3.5 h-3.5" /><Send className="w-3.5 h-3.5" />Trigger Persona Debate</>
            }
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AiPersonaChatView;
