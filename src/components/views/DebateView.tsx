import React, { useState } from 'react';
import { useParallax } from '@/contexts/ParallaxContext';
import { DebateSession, DebateRound, DebateTurn } from '@/types/parallax';
import { getModelById, AVAILABLE_TEXT_MODELS } from '@/services/modelCatalog';
import { CURATED_DEBATE_PROPOSITIONS } from '@/services/aiProviderEngine';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Swords, 
  Scale, 
  CheckCircle2, 
  AlertTriangle, 
  Gavel, 
  ShieldAlert, 
  ShieldCheck, 
  FileText, 
  ChevronRight, 
  Sparkles, 
  Layers,
  Award,
  HelpCircle,
  ArrowRight,
  Flame
} from 'lucide-react';
import { toast } from 'sonner';

export const DebateView: React.FC = () => {
  const { debateSession, isGenerating, currentPrompt, setCurrentPrompt, runPrompt, selectedTextModelIds } = useParallax();
  const [activeRoundTab, setActiveRoundTab] = useState<number>(1);

  const isGreetingPrompt = /^(hi|hii|hiii|hello|hey|heyy|howdy|hola|greetings|test|yo|sup)$/i.test(currentPrompt.trim()) ||
                           (currentPrompt.trim().length <= 4 && (currentPrompt.toLowerCase().startsWith('hi') || currentPrompt.toLowerCase().startsWith('hey')));

  const handleSelectMotion = (motion: string) => {
    setCurrentPrompt(motion);
    runPrompt(motion);
    toast.info(`Orchestrating 5-role debate on: "${motion.slice(0, 45)}..."`);
  };

  // If no debate session, or if current prompt is a greeting/non-proposition
  if (!debateSession || (debateSession.proposition && isGreetingPrompt)) {
    return (
      <div className="space-y-6 pb-12 max-w-5xl mx-auto">
        {/* Proposition Requirement Notice */}
        <div className="p-6 rounded-2xl bg-gradient-to-b from-blue-500/10 via-card to-card border border-blue-500/20 space-y-4 shadow-sm text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0 shadow-inner">
              <Swords className="w-6 h-6" />
            </div>
            <div className="space-y-1.5 flex-1">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                <h2 className="font-serif font-bold text-base md:text-lg text-foreground">
                  Formal AI Judicial Debate Chamber
                </h2>
                <Badge variant="outline" className="text-[10px] font-mono border-blue-500/30 text-blue-400">
                  5 Roles • 4 Rounds • Chief Judge Verdict
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed max-w-2xl">
                A formal debate requires a <strong className="text-foreground">substantive thesis, controversy, or policy proposition</strong> to debate across Advocate, Opponent, Neutral Analyst, Fact-Checker, and Chief Judge models. Casual greetings (like <em>"{currentPrompt.trim() || 'Hii'}"</em>) are conversational rather than debatable propositions.
              </p>
            </div>
          </div>

          {/* Quick 1-Click Curated Debate Motions */}
          <div className="pt-4 border-t border-border/50 space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-foreground">
              <Flame className="w-3.5 h-3.5 text-amber-500" />
              <span>Select a Curated Debate Motion to Launch Immediately:</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {CURATED_DEBATE_PROPOSITIONS.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectMotion(item.motion)}
                  disabled={isGenerating}
                  className="p-3.5 rounded-xl border border-border/80 bg-card/60 hover:bg-card hover:border-blue-500/40 hover:shadow-md transition-all text-left group flex flex-col justify-between gap-2"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider font-semibold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-md">
                      {item.category}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-blue-400 group-hover:translate-x-0.5 transition-all" />
                  </div>
                  <div className="text-xs font-medium text-foreground group-hover:text-blue-400 transition-colors leading-snug">
                    "{item.motion}"
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentRound = debateSession.rounds.find(r => r.roundNumber === activeRoundTab) || debateSession.rounds[0];

  return (
    <div className="space-y-6 pb-12 max-w-5xl mx-auto">
      {/* Debate Header */}
      <div className="p-4 rounded-2xl bg-card border border-border space-y-3 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-500">
              <Swords className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-serif font-bold text-sm md:text-base text-foreground">
                Formal AI Judicial Debate
              </h2>
              <p className="text-[11px] text-muted-foreground font-mono">
                Proposition: "{debateSession.proposition}"
              </p>
            </div>
          </div>

          <Badge variant="outline" className="font-mono text-xs text-blue-500 border-blue-500/30">
            {debateSession.rounds.length} Formal Rounds Orchestrated
          </Badge>
        </div>

        {/* 5-Role Model Allocation Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 pt-2 border-t border-border/50 text-[11px]">
          <div className="p-2 rounded-lg bg-emerald-500/5 border border-emerald-500/20 space-y-0.5">
            <span className="font-mono text-[9px] uppercase text-emerald-500 font-semibold">1. Advocate</span>
            <div className="font-medium text-foreground truncate">{getModelById(debateSession.roles.advocate)?.name || 'Claude 3.7'}</div>
          </div>
          <div className="p-2 rounded-lg bg-red-500/5 border border-red-500/20 space-y-0.5">
            <span className="font-mono text-[9px] uppercase text-red-500 font-semibold">2. Opponent</span>
            <div className="font-medium text-foreground truncate">{getModelById(debateSession.roles.opponent)?.name || 'DeepSeek R1'}</div>
          </div>
          <div className="p-2 rounded-lg bg-blue-500/5 border border-blue-500/20 space-y-0.5">
            <span className="font-mono text-[9px] uppercase text-blue-500 font-semibold">3. Neutral Analyst</span>
            <div className="font-medium text-foreground truncate">{getModelById(debateSession.roles.neutralAnalyst)?.name || 'Gemini 2.5'}</div>
          </div>
          <div className="p-2 rounded-lg bg-amber-500/5 border border-amber-500/20 space-y-0.5">
            <span className="font-mono text-[9px] uppercase text-amber-500 font-semibold">4. Fact-Checker</span>
            <div className="font-medium text-foreground truncate">{getModelById(debateSession.roles.factChecker)?.name || 'GPT-4o'}</div>
          </div>
          <div className="p-2 rounded-lg bg-purple-500/5 border border-purple-500/20 space-y-0.5">
            <span className="font-mono text-[9px] uppercase text-purple-500 font-semibold">5. Chief Judge</span>
            <div className="font-medium text-foreground truncate">{getModelById(debateSession.roles.judge)?.name || 'Claude 3.7'}</div>
          </div>
        </div>
      </div>

      {/* Rounds Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto whitespace-nowrap pb-1">
        {debateSession.rounds.map((round) => (
          <button
            key={round.roundNumber}
            onClick={() => setActiveRoundTab(round.roundNumber)}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 ${
              activeRoundTab === round.roundNumber
                ? 'bg-primary text-primary-foreground font-semibold shadow-sm'
                : 'bg-card text-muted-foreground hover:text-foreground border border-border'
            }`}
          >
            <span>Round {round.roundNumber}: {round.name}</span>
          </button>
        ))}

        {debateSession.verdict && (
          <button
            onClick={() => setActiveRoundTab(99)}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 ${
              activeRoundTab === 99
                ? 'bg-purple-600 text-white font-semibold shadow-sm'
                : 'bg-card text-purple-400 hover:text-purple-300 border border-purple-500/30'
            }`}
          >
            <Gavel className="w-3.5 h-3.5" />
            <span>Final Judicial Verdict</span>
          </button>
        )}
      </div>

      {/* Active Round Content */}
      {activeRoundTab !== 99 && currentRound && (
        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <h3 className="font-serif font-bold text-sm text-foreground">
              Round {currentRound.roundNumber}: {currentRound.name}
            </h3>
            <span className="text-xs font-mono text-muted-foreground">
              {currentRound.turns.length} Model Turns Dispatched
            </span>
          </div>

          <div className="space-y-4">
            {currentRound.turns.map((turn, tIdx) => {
              const isAdvocate = turn.role === 'advocate';
              const isOpponent = turn.role === 'opponent';
              const isJudge = turn.role === 'judge';

              return (
                <div
                  key={tIdx}
                  className={`p-5 rounded-2xl border bg-card space-y-3 ${
                    isAdvocate 
                      ? 'border-emerald-500/30' 
                      : isOpponent 
                      ? 'border-red-500/30' 
                      : isJudge 
                      ? 'border-purple-500/30 bg-purple-500/5' 
                      : 'border-border'
                  }`}
                >
                  <div className="flex items-center justify-between pb-2 border-b border-border/60">
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="outline"
                        className={`font-mono text-[10px] uppercase font-bold ${
                          isAdvocate 
                            ? 'text-emerald-500 border-emerald-500/40 bg-emerald-500/10' 
                            : isOpponent 
                            ? 'text-red-500 border-red-500/40 bg-red-500/10' 
                            : isJudge 
                            ? 'text-purple-500 border-purple-500/40 bg-purple-500/10' 
                            : 'text-blue-500 border-blue-500/40 bg-blue-500/10'
                        }`}
                      >
                        {turn.role}
                      </Badge>
                      <span className="font-serif font-bold text-xs md:text-sm text-foreground">
                        {turn.title}
                      </span>
                    </div>

                    <span className="font-mono text-[11px] text-muted-foreground">
                      {turn.modelName}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">
                    {turn.content}
                  </p>

                  {/* Key Arguments */}
                  {turn.keyArguments && turn.keyArguments.length > 0 && (
                    <div className="p-3 rounded-lg bg-muted/30 border border-border space-y-1 text-xs">
                      <span className="font-mono text-[10px] uppercase text-muted-foreground font-semibold">
                        Core Arguments Presented:
                      </span>
                      <ul className="space-y-1 text-foreground">
                        {turn.keyArguments.map((arg, idx) => (
                          <li key={idx} className="flex items-start gap-1.5 text-xs">
                            <span className="text-accent font-bold">•</span>
                            <span>{arg}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Cited Evidence */}
                  {turn.evidenceCited && turn.evidenceCited.length > 0 && (
                    <div className="flex flex-wrap items-center gap-1.5 pt-1 text-[10px] font-mono text-muted-foreground">
                      <span className="font-semibold">Evidence Basis:</span>
                      {turn.evidenceCited.map((ev, idx) => (
                        <span key={idx} className="px-2 py-0.5 rounded bg-muted border border-border">
                          {ev}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Judicial Final Verdict Tab */}
      {activeRoundTab === 99 && debateSession.verdict && (
        <div className="p-6 rounded-2xl border border-purple-500/40 bg-purple-500/5 space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-purple-500/30">
            <div className="flex items-center gap-2">
              <Gavel className="w-5 h-5 text-purple-400" />
              <h3 className="font-serif font-bold text-base text-foreground">
                Judicial Verdict & Cross-Examination Synthesis
              </h3>
            </div>
            <Badge className="bg-purple-600 text-white font-mono text-xs">
              Winner / Ruling: {debateSession.verdict.winnerRole}
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-3.5 rounded-xl bg-card border border-border space-y-1">
              <div className="text-emerald-500 font-semibold font-mono text-[11px]">
                Strongest Sustained Argument
              </div>
              <p className="text-muted-foreground leading-relaxed">
                {debateSession.verdict.strongestArgument}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-card border border-border space-y-1">
              <div className="text-amber-500 font-semibold font-mono text-[11px]">
                Weakest Vulnerability Exposed
              </div>
              <p className="text-muted-foreground leading-relaxed">
                {debateSession.verdict.weakestArgument}
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-card border border-border space-y-2 text-xs">
            <div className="font-serif font-bold text-xs uppercase tracking-wide text-foreground">
              Judge Assessment & Epistemic Verdict
            </div>
            <p className="text-muted-foreground leading-relaxed">
              {debateSession.verdict.judgeAssessment}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
