import React, { useState } from 'react';
import { useParallax } from '@/contexts/ParallaxContext';
import { ModelResponse } from '@/types/parallax';
import { getModelById } from '@/services/modelCatalog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Copy, 
  RotateCw, 
  Sparkles, 
  CheckCircle2, 
  HelpCircle, 
  AlertTriangle, 
  ThumbsUp, 
  Clock, 
  Coins, 
  ChevronDown, 
  ChevronUp, 
  Scale, 
  FileCheck,
  Bookmark,
  Share2,
  Check,
  Zap
} from 'lucide-react';
import { toast } from 'sonner';

export const CompareView: React.FC = () => {
  const { textResponses, isGenerating, setActiveMode, currentPrompt } = useParallax();
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [expandedReasoningId, setExpandedReasoningId] = useState<string | null>(null);
  const [expandedEvalId, setExpandedEvalId] = useState<string | null>(null);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    toast.success('Response copied to clipboard');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSendToSynthesis = () => {
    setActiveMode('synthesis');
    toast.info('Switched to Master Synthesis Mode');
  };

  const handleSendToFactCheck = () => {
    setActiveMode('factcheck');
    toast.info('Switched to Fact Check Mode with current prompt');
  };

  if (textResponses.length === 0 && !isGenerating) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center border border-dashed border-border rounded-2xl my-6 bg-card/40">
        <Scale className="w-10 h-10 text-muted-foreground mb-3 opacity-50" />
        <h3 className="font-serif text-lg font-bold text-foreground">
          Compare Mode Awaiting Query
        </h3>
        <p className="text-xs text-muted-foreground max-w-md mt-1 leading-relaxed">
          Type your question in the universal composer below and click "Run All" to dispatch requests across multiple selected frontier models simultaneously.
        </p>
      </div>
    );
  }

  // Calculate dynamic grid columns (2 to 4 columns)
  const colClass = textResponses.length === 1 
    ? 'grid-cols-1' 
    : textResponses.length === 2 
    ? 'grid-cols-1 md:grid-cols-2' 
    : textResponses.length === 3 
    ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
    : 'grid-cols-1 md:grid-cols-2 xl:grid-cols-4';

  return (
    <div className="space-y-4 pb-8">
      {/* Compare Header Bar with Global Actions */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-3 rounded-xl bg-card border border-border">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="font-mono text-xs bg-accent/10 text-accent border-accent/30">
            {textResponses.length} Models Running Concurrently
          </Badge>
          <span className="text-xs text-muted-foreground hidden sm:inline">
            Side-by-side comparative analysis with subjective evaluation dimensions
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleSendToSynthesis} 
            className="text-xs h-7 gap-1.5 border-border bg-muted/40 hover:bg-muted"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Open Synthesis</span>
          </Button>

          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleSendToFactCheck} 
            className="text-xs h-7 gap-1.5 border-border bg-muted/40 hover:bg-muted"
          >
            <FileCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>Audit Claims</span>
          </Button>
        </div>
      </div>

      {/* Side-by-Side Model Response Cards Grid */}
      <div className={`grid ${colClass} gap-4`}>
        {textResponses.map((resp) => {
          const model = getModelById(resp.modelId);
          const isReasoningExpanded = expandedReasoningId === resp.id;
          const isEvalExpanded = expandedEvalId === resp.id;

          return (
            <div
              key={resp.id}
              className="flex flex-col justify-between rounded-2xl border border-border bg-card shadow-sm hover:border-border/90 transition-all overflow-hidden"
            >
              {/* Card Header: Model Badge, Latency, Token Count */}
              <div className="p-3.5 border-b border-border bg-muted/30 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span 
                      className="w-2.5 h-2.5 rounded-full shrink-0" 
                      style={{ backgroundColor: model?.accentColor || 'hsl(var(--accent))' }}
                    />
                    <div>
                      <div className="font-serif font-bold text-xs md:text-sm text-foreground">
                        {resp.modelName}
                      </div>
                      <div className="text-[10px] font-mono text-muted-foreground">
                        {resp.provider}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <Badge variant="outline" className="font-mono text-[10px] bg-card text-muted-foreground border-border">
                      {resp.evaluation.confidenceEstimate}% conf
                    </Badge>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[10px] font-mono text-muted-foreground pt-1 border-t border-border/40">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {resp.latencyMs}ms
                  </span>
                  <span className="flex items-center gap-1">
                    <Coins className="w-3 h-3" /> ${resp.costEstimate.toFixed(4)}
                  </span>
                  <span>{resp.tokensUsed} tokens</span>
                </div>
              </div>

              {/* Card Body: Text Output & Reasoning Chain */}
              <div className="p-4 flex-1 space-y-3 text-xs leading-relaxed overflow-y-auto max-h-[520px]">
                {/* Expandable Reasoning / Chain of Thought */}
                {resp.reasoningChain && (
                  <div className="rounded-lg border border-border/70 bg-muted/20 p-2.5 space-y-1.5">
                    <button
                      onClick={() => setExpandedReasoningId(isReasoningExpanded ? null : resp.id)}
                      className="w-full flex items-center justify-between text-[11px] font-mono font-medium text-muted-foreground hover:text-foreground"
                    >
                      <span className="flex items-center gap-1.5">
                        <Zap className="w-3 h-3 text-accent" />
                        <span>Chain-of-Thought Introspection</span>
                      </span>
                      {isReasoningExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                    </button>
                    {isReasoningExpanded && (
                      <pre className="text-[10px] font-mono text-muted-foreground bg-background/80 p-2 rounded border border-border/50 whitespace-pre-wrap leading-relaxed mt-1">
                        {resp.reasoningChain}
                      </pre>
                    )}
                  </div>
                )}

                {/* Formatted Markdown/Text Output */}
                <div className="prose prose-sm dark:prose-invert max-w-none text-foreground text-xs leading-relaxed space-y-2">
                  {resp.text.split('\n\n').map((paragraph, idx) => {
                    if (paragraph.startsWith('### ')) {
                      return <h4 key={idx} className="font-serif font-bold text-xs uppercase tracking-wide text-foreground mt-2">{paragraph.replace('### ', '')}</h4>;
                    }
                    if (paragraph.startsWith('#### ')) {
                      return <h5 key={idx} className="font-semibold text-xs text-foreground mt-1.5">{paragraph.replace('#### ', '')}</h5>;
                    }
                    if (paragraph.startsWith('* ') || paragraph.startsWith('- ')) {
                      return (
                        <ul key={idx} className="list-disc pl-4 space-y-1 text-muted-foreground">
                          {paragraph.split('\n').map((li, lIdx) => (
                            <li key={lIdx}>{li.replace(/^[\*\-]\s+/, '')}</li>
                          ))}
                        </ul>
                      );
                    }
                    return <p key={idx} className="text-muted-foreground leading-relaxed">{paragraph}</p>;
                  })}
                </div>
              </div>

              {/* Evaluation Dimensions Accordion */}
              <div className="border-t border-border bg-muted/10 p-3 space-y-2">
                <button
                  onClick={() => setExpandedEvalId(isEvalExpanded ? null : resp.id)}
                  className="w-full flex items-center justify-between text-[11px] font-mono text-muted-foreground hover:text-foreground"
                >
                  <span className="flex items-center gap-1.5">
                    <Scale className="w-3 h-3 text-accent" />
                    <span>Evaluation Scores (AI Estimate)</span>
                  </span>
                  <span className="font-bold text-foreground">{resp.evaluation.overallScore}/100</span>
                </button>

                {isEvalExpanded && (
                  <div className="pt-2 space-y-2 border-t border-border/40 text-[11px]">
                    <div className="grid grid-cols-2 gap-1.5 font-mono text-[10px]">
                      <div className="flex justify-between p-1 rounded bg-background border border-border">
                        <span className="text-muted-foreground">Reasoning:</span>
                        <span className="font-bold">{resp.evaluation.reasoning}%</span>
                      </div>
                      <div className="flex justify-between p-1 rounded bg-background border border-border">
                        <span className="text-muted-foreground">Accuracy:</span>
                        <span className="font-bold">{resp.evaluation.accuracy}%</span>
                      </div>
                      <div className="flex justify-between p-1 rounded bg-background border border-border">
                        <span className="text-muted-foreground">Clarity:</span>
                        <span className="font-bold">{resp.evaluation.clarity}%</span>
                      </div>
                      <div className="flex justify-between p-1 rounded bg-background border border-border">
                        <span className="text-muted-foreground">Evidence:</span>
                        <span className="font-bold">{resp.evaluation.evidenceQuality}%</span>
                      </div>
                    </div>

                    <div className="text-[10px] space-y-1 pt-1">
                      <div className="text-emerald-500">
                        <span className="font-semibold">Strength:</span> {resp.evaluation.strengthsSummary}
                      </div>
                      <div className="text-amber-500">
                        <span className="font-semibold">Weakness:</span> {resp.evaluation.weaknessesSummary}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Card Footer Actions */}
              <div className="p-2 border-t border-border bg-card flex items-center justify-between gap-1">
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleCopy(resp.id, resp.text)}
                    className="h-7 w-7 text-muted-foreground hover:text-foreground"
                    title="Copy response text"
                  >
                    {copiedId === resp.id ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  </Button>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => toast.success('Response bookmarked to session repository')}
                    className="h-7 w-7 text-muted-foreground hover:text-foreground"
                    title="Save response"
                  >
                    <Bookmark className="w-3.5 h-3.5" />
                  </Button>
                </div>

                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toast.info(`Challenging ${resp.modelName} on logical assumptions`)}
                    className="h-7 px-2 text-[10px] text-muted-foreground hover:text-foreground"
                  >
                    Challenge
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toast.success(`Response added to master synthesis pool`)}
                    className="h-7 px-2 text-[10px] border-border bg-muted/40 hover:bg-muted"
                  >
                    Add to Synthesis
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
