import React, { useState } from 'react';
import { useParallax } from '@/contexts/ParallaxContext';
import { ResearchProject, ResearchStage } from '@/types/parallax';
import { CURATED_RESEARCH_TOPICS } from '@/services/aiProviderEngine';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  BookOpen, 
  CheckCircle2, 
  ListChecks, 
  Layers, 
  FileText, 
  Download, 
  Copy, 
  Check, 
  ArrowRight, 
  ExternalLink,
  Sparkles,
  Search
} from 'lucide-react';
import { toast } from 'sonner';

export const ResearchView: React.FC = () => {
  const { researchProject, isGenerating, currentPrompt, setCurrentPrompt, runPrompt } = useParallax();
  const [activeStageId, setActiveStageId] = useState<string>('plan');
  const [copied, setCopied] = useState(false);

  const isGreetingPrompt = /^(hi|hii|hiii|hello|hey|heyy|howdy|hola|greetings|test|yo|sup)$/i.test(currentPrompt.trim()) ||
                           (currentPrompt.trim().length <= 4 && (currentPrompt.toLowerCase().startsWith('hi') || currentPrompt.toLowerCase().startsWith('hey')));

  const handleSelectTopic = (topic: string) => {
    setCurrentPrompt(topic);
    runPrompt(topic);
    toast.info(`Launching multi-stage research on: "${topic.slice(0, 45)}..."`);
  };

  if (!researchProject || (researchProject && isGreetingPrompt)) {
    return (
      <div className="space-y-6 pb-12 max-w-5xl mx-auto">
        <div className="p-6 rounded-2xl bg-gradient-to-b from-purple-500/10 via-card to-card border border-purple-500/20 space-y-4 shadow-sm text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-400 shrink-0 shadow-inner">
              <BookOpen className="w-6 h-6" />
            </div>
            <div className="space-y-1.5 flex-1">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                <h2 className="font-serif font-bold text-base md:text-lg text-foreground">
                  Deep Research Workspace
                </h2>
                <Badge variant="outline" className="text-[10px] font-mono border-purple-500/30 text-purple-400">
                  Sub-question Decomposition • Evidence Triangulation
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed max-w-2xl">
                Research Mode conducts expansive multi-stage investigations across frontier models, compiling citations, evidence tables, and a complete research dossier. Please select or enter a substantive research inquiry.
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-border/50 space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-foreground">
              <Sparkles className="w-3.5 h-3.5 text-purple-500" />
              <span>Select an Expansive Research Inquiry to Launch:</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {CURATED_RESEARCH_TOPICS.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectTopic(item.topic)}
                  disabled={isGenerating}
                  className="p-3.5 rounded-xl border border-border/80 bg-card/60 hover:bg-card hover:border-purple-500/40 hover:shadow-md transition-all text-left group flex flex-col justify-between gap-2"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider font-semibold text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded-md">
                      {item.domain}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-purple-400 group-hover:translate-x-0.5 transition-all" />
                  </div>
                  <div className="text-xs font-medium text-foreground group-hover:text-purple-400 transition-colors leading-snug">
                    "{item.topic}"
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const handleCopyReport = () => {
    navigator.clipboard.writeText(researchProject.finalReportMarkdown);
    setCopied(true);
    toast.success('Research dossier copied to clipboard');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExportMarkdown = () => {
    const blob = new Blob([researchProject.finalReportMarkdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `parallax-research-${Date.now()}.md`;
    a.click();
    toast.success('Exported research dossier as Markdown');
  };

  return (
    <div className="space-y-6 pb-12 max-w-5xl mx-auto">
      {/* Research Dossier Header */}
      <div className="p-4 rounded-2xl bg-card border border-border space-y-3 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-500">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-serif font-bold text-sm md:text-base text-foreground">
                PARALLAX Deep Research Dossier
              </h2>
              <p className="text-[11px] text-muted-foreground font-mono">
                Topic: "{researchProject.question}"
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopyReport}
              className="text-xs h-8 gap-1.5 border-border bg-card"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              <span>Copy Report</span>
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={handleExportMarkdown}
              className="text-xs h-8 gap-1.5 border-border bg-card"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export MD</span>
            </Button>
          </div>
        </div>

        {/* 6 Stage Progress Indicators */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 pt-2 border-t border-border/50 text-[10px] font-mono">
          {researchProject.stages.map((stage) => (
            <button
              key={stage.id}
              onClick={() => setActiveStageId(stage.id)}
              className={`p-2 rounded-lg border text-left transition-all ${
                activeStageId === stage.id
                  ? 'border-purple-500 bg-purple-500/10 text-foreground font-bold shadow-sm'
                  : 'border-border bg-muted/20 text-muted-foreground hover:text-foreground'
              }`}
            >
              <div className="flex items-center justify-between mb-0.5">
                <span className="truncate">{stage.label.split('. ')[1]}</span>
                <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" />
              </div>
              <div className="text-[9px] opacity-70">Completed</div>
            </button>
          ))}
        </div>
      </div>

      {/* Stage Detail Cards */}
      {/* 1. Methodological Plan */}
      <div className="p-5 rounded-2xl border border-border bg-card space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-border">
          <div className="flex items-center gap-2">
            <ListChecks className="w-4 h-4 text-purple-500" />
            <h3 className="font-serif font-bold text-sm text-foreground">
              1. Methodological Formulation & Domains
            </h3>
          </div>
          <Badge variant="outline" className="font-mono text-[10px]">
            Triangulated Inquiry
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="space-y-2 p-3 rounded-xl bg-muted/20 border border-border">
            <span className="font-mono text-[10px] uppercase text-muted-foreground font-semibold">
              Primary Objectives
            </span>
            <ul className="space-y-1.5 text-muted-foreground">
              {researchProject.plan.objectives.map((obj, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <span className="text-purple-500 font-bold">•</span>
                  <span>{obj}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-2 p-3 rounded-xl bg-muted/20 border border-border">
            <span className="font-mono text-[10px] uppercase text-muted-foreground font-semibold">
              Domains Under Investigation
            </span>
            <ul className="space-y-1.5 text-muted-foreground">
              {researchProject.plan.domainsToInvestigate.map((dom, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <span className="text-accent font-bold">•</span>
                  <span>{dom}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* 2. Subquestion Decomposition */}
      <div className="p-5 rounded-2xl border border-border bg-card space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-border">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-accent" />
            <h3 className="font-serif font-bold text-sm text-foreground">
              2. Subquestion Decomposition & Model Findings
            </h3>
          </div>
          <span className="text-xs font-mono text-muted-foreground">
            {researchProject.subquestions.length} Inquiries Resolved
          </span>
        </div>

        <div className="space-y-3">
          {researchProject.subquestions.map((sub, idx) => (
            <div key={sub.id} className="p-4 rounded-xl border border-border bg-muted/10 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-foreground">
                  Subquestion {idx + 1}: {sub.question}
                </span>
                <div className="flex items-center gap-1 font-mono text-[10px] text-muted-foreground">
                  {sub.assignedModels.map(m => (
                    <span key={m} className="px-1.5 py-0.5 rounded bg-muted border border-border">
                      {m}
                    </span>
                  ))}
                </div>
              </div>

              <p className="text-muted-foreground leading-relaxed pl-2 border-l-2 border-purple-500/40">
                {sub.findings}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Final Master Synthesized Report */}
      <div className="p-6 rounded-2xl border border-border bg-card shadow-md space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-border">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-purple-500" />
            <h3 className="font-serif font-bold text-sm uppercase tracking-wide text-foreground">
              3. Master Synthesized Research Dossier
            </h3>
          </div>
          <Badge className="bg-purple-600 text-white font-mono text-[10px]">
            Final Research Report
          </Badge>
        </div>

        <div className="prose prose-sm dark:prose-invert max-w-none text-foreground text-xs md:text-sm leading-relaxed space-y-3">
          {researchProject.finalReportMarkdown.split('\n\n').map((para, idx) => {
            if (para.startsWith('# ')) {
              return <h2 key={idx} className="font-serif font-bold text-lg text-foreground mt-2">{para.replace('# ', '')}</h2>;
            }
            if (para.startsWith('## ')) {
              return <h3 key={idx} className="font-serif font-bold text-sm text-foreground mt-4 pb-1 border-b border-border/40">{para.replace('## ', '')}</h3>;
            }
            if (para.startsWith('* ') || para.startsWith('1. ')) {
              return (
                <div key={idx} className="pl-3 border-l-2 border-purple-500/40 space-y-1 my-2 text-muted-foreground">
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
