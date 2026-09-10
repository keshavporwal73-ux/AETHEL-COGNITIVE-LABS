import React, { useState } from 'react';
import { useParallax } from '@/contexts/ParallaxContext';
import { FactCheckReport, FactCheckClaim } from '@/types/parallax';
import { CURATED_FACT_CHECK_CLAIMS } from '@/services/aiProviderEngine';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  HelpCircle, 
  ShieldCheck, 
  FileText, 
  ExternalLink, 
  Copy, 
  Check, 
  Layers,
  ArrowRight,
  Search
} from 'lucide-react';
import { toast } from 'sonner';

export const FactCheckView: React.FC = () => {
  const { factCheckReport, isGenerating, currentPrompt, setCurrentPrompt, runPrompt } = useParallax();
  const [copied, setCopied] = useState(false);

  const isGreetingPrompt = /^(hi|hii|hiii|hello|hey|heyy|howdy|hola|greetings|test|yo|sup)$/i.test(currentPrompt.trim()) ||
                           (currentPrompt.trim().length <= 4 && (currentPrompt.toLowerCase().startsWith('hi') || currentPrompt.toLowerCase().startsWith('hey')));

  const handleSelectClaim = (claimText: string) => {
    setCurrentPrompt(claimText);
    runPrompt(claimText);
    toast.info(`Auditing empirical claim: "${claimText.slice(0, 45)}..."`);
  };

  if (!factCheckReport || (factCheckReport && isGreetingPrompt)) {
    return (
      <div className="space-y-6 pb-12 max-w-5xl mx-auto">
        <div className="p-6 rounded-2xl bg-gradient-to-b from-emerald-500/10 via-card to-card border border-emerald-500/20 space-y-4 shadow-sm text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0 shadow-inner">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div className="space-y-1.5 flex-1">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                <h2 className="font-serif font-bold text-base md:text-lg text-foreground">
                  Fact Check & Multi-Model Claim Audit Engine
                </h2>
                <Badge variant="outline" className="text-[10px] font-mono border-emerald-500/30 text-emerald-400">
                  Atomic Claim Decomposition • Multi-Model Verification
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed max-w-2xl">
                Fact Check Mode decomposes paragraphs, articles, or statements into verifiable factual claims and cross-references them across AI models. Casual greetings (like <em>"{currentPrompt.trim() || 'Hii'}"</em>) do not contain factual claims to audit.
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-border/50 space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-foreground">
              <Search className="w-3.5 h-3.5 text-emerald-500" />
              <span>Select an Empirical Claim to Audit Across All Models:</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {CURATED_FACT_CHECK_CLAIMS.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectClaim(item.claim)}
                  disabled={isGenerating}
                  className="p-3.5 rounded-xl border border-border/80 bg-card/60 hover:bg-card hover:border-emerald-500/40 hover:shadow-md transition-all text-left group flex flex-col justify-between gap-2"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md">
                      {item.category}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-emerald-400 group-hover:translate-x-0.5 transition-all" />
                  </div>
                  <div className="text-xs font-medium text-foreground group-hover:text-emerald-400 transition-colors leading-snug">
                    "{item.claim}"
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-12 max-w-5xl mx-auto">
      {/* Header Summary */}
      <div className="p-4 rounded-2xl bg-card border border-border space-y-3 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-serif font-bold text-sm md:text-base text-foreground">
                Fact Check & Multi-Model Claim Audit
              </h2>
              <p className="text-[11px] text-muted-foreground font-mono">
                {factCheckReport.claims.length} checkable statements decomposed & audited
              </p>
            </div>
          </div>

          <Badge className="bg-emerald-500/10 text-emerald-500 border border-emerald-500/30 font-mono text-xs">
            Overall: {factCheckReport.overallVerdict}
          </Badge>
        </div>

        <p className="text-xs text-muted-foreground leading-relaxed pt-2 border-t border-border/50">
          {factCheckReport.summary}
        </p>
      </div>

      {/* Claims List */}
      <div className="space-y-4">
        {factCheckReport.claims.map((claim, idx) => {
          const isSupported = claim.status === 'Supported';
          const isDisputed = claim.status === 'Disputed';
          const isUnclear = claim.status === 'Unclear';

          return (
            <div
              key={claim.id}
              className={`p-5 rounded-2xl border bg-card space-y-3 shadow-sm ${
                isSupported 
                  ? 'border-emerald-500/30' 
                  : isDisputed 
                  ? 'border-amber-500/30' 
                  : 'border-border'
              }`}
            >
              {/* Claim Header & Status */}
              <div className="flex flex-wrap items-start justify-between gap-2 pb-2 border-b border-border/60">
                <div className="flex items-start gap-2 max-w-2xl">
                  <span className="w-5 h-5 rounded-full bg-muted flex items-center justify-center text-[10px] font-mono font-bold shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <div className="font-medium text-xs sm:text-sm text-foreground leading-relaxed">
                    "{claim.claimText}"
                  </div>
                </div>

                <Badge
                  variant="outline"
                  className={`font-mono text-xs ${
                    isSupported 
                      ? 'text-emerald-500 border-emerald-500/40 bg-emerald-500/10' 
                      : isDisputed 
                      ? 'text-amber-500 border-amber-500/40 bg-amber-500/10' 
                      : 'text-muted-foreground border-border'
                  }`}
                >
                  {isSupported ? <CheckCircle2 className="w-3 h-3 mr-1" /> : <AlertTriangle className="w-3 h-3 mr-1" />}
                  {claim.status} ({claim.confidence}%)
                </Badge>
              </div>

              {/* Reasoning */}
              <p className="text-xs text-muted-foreground leading-relaxed">
                <span className="font-semibold text-foreground">Audit Reasoning: </span>
                {claim.reasoning}
              </p>

              {/* Evidence Points */}
              <div className="p-3 rounded-lg bg-muted/20 border border-border space-y-1.5 text-xs">
                <span className="font-mono text-[10px] uppercase text-muted-foreground font-semibold">
                  Empirical Evidence:
                </span>
                <ul className="space-y-1 text-muted-foreground">
                  {claim.evidence.map((ev, eIdx) => (
                    <li key={eIdx} className="flex items-start gap-1.5">
                      <span className="text-accent font-bold mt-0.5">•</span>
                      <span>{ev}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Model Agreement Breakdown */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-border/40 text-[11px] font-mono">
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">Supported By:</span>
                  <div className="flex flex-wrap gap-1">
                    {claim.modelAgreement.supportedBy.map(m => (
                      <span key={m} className="px-1.5 py-0.5 rounded text-[10px] bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                        {m}
                      </span>
                    ))}
                  </div>
                </div>

                {claim.modelAgreement.disputedBy.length > 0 && (
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">Disputed By:</span>
                    <div className="flex flex-wrap gap-1">
                      {claim.modelAgreement.disputedBy.map(m => (
                        <span key={m} className="px-1.5 py-0.5 rounded text-[10px] bg-amber-500/10 text-amber-500 border border-amber-500/20">
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
