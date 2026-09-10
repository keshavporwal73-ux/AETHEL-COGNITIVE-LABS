import React, { useState } from 'react';
import { useParallax } from '@/contexts/ParallaxContext';
import { SynthesisOutput } from '@/types/parallax';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  Lightbulb, 
  HelpCircle, 
  FileText, 
  Copy, 
  Download, 
  Share2, 
  Check, 
  Layers, 
  ShieldCheck 
} from 'lucide-react';
import { toast } from 'sonner';

export const SynthesisView: React.FC = () => {
  const { synthesisResult, setSynthesisResult, currentPrompt, textResponses, isGenerating } = useParallax();
  const [depth, setDepth] = useState<'Concise' | 'Balanced' | 'Deep' | 'Expert'>('Balanced');
  const [copied, setCopied] = useState(false);

  const handleCopySynthesis = () => {
    if (!synthesisResult) return;
    const content = `${synthesisResult.executiveSummary}\n\n${synthesisResult.finalSynthesis}`;
    navigator.clipboard.writeText(content);
    setCopied(true);
    toast.success('Master synthesis copied to clipboard');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExportMarkdown = () => {
    if (!synthesisResult) return;
    const md = `# PARALLAX Master Intelligence Synthesis\n\n**Inquiry**: ${currentPrompt}\n**Depth Level**: ${depth}\n\n## Executive Summary\n${synthesisResult.executiveSummary}\n\n## Core Consensus Points\n${synthesisResult.consensus.map(c => `- ${c}`).join('\n')}\n\n## Primary Model Disagreements\n${synthesisResult.disagreements.map(d => `### ${d.topic}\n${d.perspectives.map(p => `- **${p.model}**: ${p.stance}`).join('\n')}`).join('\n\n')}\n\n## Unique Lone Insights\n${synthesisResult.uniqueInsights.map(u => `- **${u.model}**: ${u.insight}`).join('\n')}\n\n## Final Master Synthesis\n${synthesisResult.finalSynthesis}\n`;
    const blob = new Blob([md], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `parallax-synthesis-${Date.now()}.md`;
    a.click();
    toast.success('Exported synthesis as Markdown');
  };

  if (!synthesisResult && !isGenerating) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center border border-dashed border-border rounded-2xl my-6 bg-card/40">
        <Sparkles className="w-10 h-10 text-amber-500/50 mb-3" />
        <h3 className="font-serif text-lg font-bold text-foreground">
          Synthesis Engine Ready
        </h3>
        <p className="text-xs text-muted-foreground max-w-md mt-1 leading-relaxed">
          Submit a query across multiple models in Compare Mode. The Synthesis Engine will automatically extract consensus, disagreements, and unified truth.
        </p>
      </div>
    );
  }

  if (!synthesisResult) return null;

  return (
    <div className="space-y-6 pb-12 max-w-5xl mx-auto">
      {/* Header Bar with Depth Switcher & Export */}
      <div className="p-4 rounded-2xl bg-card border border-border flex flex-wrap items-center justify-between gap-3 shadow-sm">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h2 className="font-serif font-bold text-sm md:text-base text-foreground">
              Multi-Model Master Synthesis
            </h2>
            <p className="text-[11px] text-muted-foreground font-mono">
              Synthesized across {textResponses.length || 4} frontier models
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Depth Switcher */}
          <div className="flex items-center bg-muted/60 p-1 rounded-lg border border-border">
            {(['Concise', 'Balanced', 'Deep', 'Expert'] as const).map(d => (
              <button
                key={d}
                onClick={() => setDepth(d)}
                className={`px-2.5 py-1 rounded text-xs font-medium transition-all ${
                  depth === d 
                    ? 'bg-card text-foreground font-semibold shadow-sm border border-border' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {d}
              </button>
            ))}
          </div>

          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleCopySynthesis}
            className="text-xs h-8 gap-1.5 border-border bg-card"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">Copy</span>
          </Button>

          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleExportMarkdown}
            className="text-xs h-8 gap-1.5 border-border bg-card"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Export</span>
          </Button>
        </div>
      </div>

      {/* Executive Summary Card */}
      <div className="p-5 rounded-2xl border border-accent/30 bg-accent/5 space-y-2">
        <div className="flex items-center gap-2 font-serif font-bold text-xs uppercase tracking-wider text-accent">
          <ShieldCheck className="w-4 h-4" />
          <span>Executive Intelligence Summary</span>
        </div>
        <p className="text-xs sm:text-sm text-foreground leading-relaxed">
          {synthesisResult.executiveSummary}
        </p>
      </div>

      {/* Dimensional Breakdown: 4 Quads (Consensus, Disagreements, Unique Insights, Uncertainties) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Consensus */}
        <div className="p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5 space-y-2.5">
          <div className="flex items-center gap-2 text-emerald-500 font-serif font-bold text-xs uppercase tracking-wider">
            <CheckCircle2 className="w-4 h-4" />
            <span>1. Unanimous Model Consensus</span>
          </div>
          <ul className="space-y-2 text-xs text-muted-foreground">
            {synthesisResult.consensus.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-emerald-500 font-bold mt-0.5">•</span>
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Disagreements */}
        <div className="p-4 rounded-xl border border-amber-500/20 bg-amber-500/5 space-y-2.5">
          <div className="flex items-center gap-2 text-amber-500 font-serif font-bold text-xs uppercase tracking-wider">
            <AlertCircle className="w-4 h-4" />
            <span>2. Key Points of Model Disagreement</span>
          </div>
          <div className="space-y-3 text-xs">
            {synthesisResult.disagreements.map((d, idx) => (
              <div key={idx} className="space-y-1">
                <div className="font-semibold text-foreground text-[11px]">{d.topic}</div>
                <div className="space-y-1 pl-2 border-l border-amber-500/30">
                  {d.perspectives.map((p, pIdx) => (
                    <div key={pIdx} className="text-[11px] text-muted-foreground">
                      <span className="font-mono text-foreground font-medium">{p.model}:</span> {p.stance}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Unique Insights */}
        <div className="p-4 rounded-xl border border-purple-500/20 bg-purple-500/5 space-y-2.5">
          <div className="flex items-center gap-2 text-purple-500 font-serif font-bold text-xs uppercase tracking-wider">
            <Lightbulb className="w-4 h-4" />
            <span>3. Unique Lone Insights (Singular Models)</span>
          </div>
          <ul className="space-y-2 text-xs text-muted-foreground">
            {synthesisResult.uniqueInsights.map((u, idx) => (
              <li key={idx} className="space-y-0.5">
                <span className="font-mono text-foreground font-semibold text-[11px]">{u.model}:</span>
                <p className="leading-relaxed text-[11px]">{u.insight}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Uncertainties & Boundary Limits */}
        <div className="p-4 rounded-xl border border-blue-500/20 bg-blue-500/5 space-y-2.5">
          <div className="flex items-center gap-2 text-blue-500 font-serif font-bold text-xs uppercase tracking-wider">
            <HelpCircle className="w-4 h-4" />
            <span>4. Boundary Conditions & Epistemic Uncertainties</span>
          </div>
          <ul className="space-y-2 text-xs text-muted-foreground">
            {synthesisResult.uncertainties.map((unc, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-blue-500 font-bold mt-0.5">?</span>
                <span className="leading-relaxed text-[11px]">{unc}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Cross-Model Evidence Matrix */}
      {synthesisResult.evidenceMatrix && (
        <div className="p-4 rounded-2xl border border-border bg-card space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-serif font-bold text-xs uppercase tracking-wider text-foreground">
              Cross-Model Evidence & Triangulation Matrix
            </h3>
            <span className="text-[10px] font-mono text-muted-foreground">Multi-Model Verification</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-muted/40 border-b border-border text-muted-foreground font-mono text-[10px] uppercase">
                <tr>
                  <th className="p-2.5">Extracted Key Claim</th>
                  <th className="p-2.5">Supporting Models</th>
                  <th className="p-2.5">Confidence</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {synthesisResult.evidenceMatrix.map((row, idx) => (
                  <tr key={idx} className="hover:bg-muted/20">
                    <td className="p-2.5 text-foreground font-medium">{row.claim}</td>
                    <td className="p-2.5 font-mono text-muted-foreground">
                      <div className="flex flex-wrap gap-1">
                        {row.modelsSupporting.map(m => (
                          <span key={m} className="px-1.5 py-0.5 rounded text-[9px] bg-muted border border-border">
                            {m}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="p-2.5">
                      <Badge variant="outline" className={`font-mono text-[10px] ${
                        row.confidence === 'High' ? 'text-emerald-500 border-emerald-500/30' : 'text-amber-500 border-amber-500/30'
                      }`}>
                        {row.confidence}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Master Synthesized Answer */}
      <div className="p-6 rounded-2xl border border-border bg-card shadow-md space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-border">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-accent" />
            <span className="font-serif font-bold text-sm text-foreground uppercase tracking-wide">
              Final Comprehensive Master Synthesis
            </span>
          </div>
          <Badge variant="outline" className="font-mono text-xs">
            Depth: {depth}
          </Badge>
        </div>

        <div className="prose prose-sm dark:prose-invert max-w-none text-foreground text-xs md:text-sm leading-relaxed space-y-3">
          {synthesisResult.finalSynthesis.split('\n\n').map((para, idx) => {
            if (para.startsWith('## ')) {
              return <h3 key={idx} className="font-serif font-bold text-base text-foreground mt-4 pb-1 border-b border-border/40">{para.replace('## ', '')}</h3>;
            }
            if (para.startsWith('### ')) {
              return <h4 key={idx} className="font-serif font-semibold text-sm text-foreground mt-3">{para.replace('### ', '')}</h4>;
            }
            if (para.startsWith('* ') || para.startsWith('1. ')) {
              return (
                <div key={idx} className="pl-3 border-l-2 border-accent/40 space-y-1 my-2 text-muted-foreground">
                  {para.split('\n').map((line, lIdx) => (
                    <div key={lIdx}>{line}</div>
                  ))}
                </div>
              );
            }
            return <p key={idx} className="text-muted-foreground leading-relaxed">{para}</p>;
          })}
        </div>
      </div>
    </div>
  );
};
