import React, { useState } from 'react';
import { useParallax } from '@/contexts/ParallaxContext';
import { BriefingSlide } from '@/types/parallax';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Presentation, 
  RotateCcw, 
  Download, 
  Copy, 
  Check, 
  Sparkles, 
  Eye, 
  ChevronLeft, 
  ChevronRight, 
  SlidersHorizontal,
  FileText,
  Share2,
  TrendingUp,
  Quote,
  ShieldCheck,
  Building
} from 'lucide-react';
import { toast } from 'sonner';

export const ExecutiveBriefingView: React.FC = () => {
  const { 
    executiveBriefing, 
    generateBriefingDeck, 
    toggleBriefingSlide 
  } = useParallax();

  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  if (!executiveBriefing) {
    return (
      <div className="p-8 text-center space-y-4">
        <Presentation className="w-12 h-12 mx-auto text-muted-foreground opacity-50" />
        <h3 className="font-serif font-bold text-lg text-foreground">No Briefing Presentation Generated</h3>
        <Button onClick={generateBriefingDeck} className="gap-2">
          <Sparkles className="w-4 h-4" />
          <span>Build Executive Briefing Deck</span>
        </Button>
      </div>
    );
  }

  const enabledSlides = executiveBriefing.slides.filter(s => s.enabled);
  const currentSlide = enabledSlides[activeSlideIndex] || enabledSlides[0];

  const handleExportMarkdown = () => {
    const md = `# ${executiveBriefing.title}
*${executiveBriefing.subtitle}*
**Presenter**: ${executiveBriefing.presenter} | **Date**: ${executiveBriefing.generatedDate}
**Audience**: ${executiveBriefing.targetAudience}

---

${executiveBriefing.slides.filter(s => s.enabled).map((s, idx) => `
## Slide ${idx + 1}: ${s.title}
*${s.subtitle}*

${s.bulletPoints.map(b => `- ${b}`).join('\n')}

${s.calloutQuote ? `> "${s.calloutQuote}"\n` : ''}
${s.metrics ? s.metrics.map(m => `**${m.label}**: ${m.value} (${m.delta || ''})`).join(' | ') : ''}

---
`).join('\n')}
`;
    navigator.clipboard.writeText(md);
    toast.success('Executive briefing exported to Markdown presentation format');
  };

  const handleExportPDF = () => {
    window.print();
    toast.success('Print dialog triggered for PDF slide export');
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Header Banner */}
      <div className="p-5 md:p-6 rounded-2xl bg-card border border-border space-y-4 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500 shadow-sm">
              <Presentation className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif font-bold text-lg md:text-xl text-foreground">
                  Executive Briefing Deck Builder
                </h1>
                <Badge variant="outline" className="text-[10px] font-mono border-emerald-500/40 text-emerald-500 bg-emerald-500/5">
                  Board & C-Suite Ready
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground font-mono">
                Transform multi-model cognitive triangulation and decision intelligence into polished slide presentations
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleExportMarkdown}
              className="text-xs h-8 gap-1.5 border-border bg-background hover:bg-muted"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>Copy Markdown</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleExportPDF}
              className="text-xs h-8 gap-1.5 border-border bg-background hover:bg-muted"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export PDF</span>
            </Button>
            <Button
              size="sm"
              onClick={generateBriefingDeck}
              className="text-xs h-8 gap-1.5 bg-primary text-primary-foreground font-semibold shadow-sm hover:opacity-90"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Rebuild Deck</span>
            </Button>
          </div>
        </div>

        {/* Presentation Metadata Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 border-t border-border/50 text-xs font-mono">
          <div className="p-2.5 rounded-xl bg-muted/20 border border-border">
            <div className="text-[10px] text-muted-foreground uppercase">Target Audience</div>
            <div className="text-foreground font-semibold truncate">{executiveBriefing.targetAudience}</div>
          </div>
          <div className="p-2.5 rounded-xl bg-muted/20 border border-border">
            <div className="text-[10px] text-muted-foreground uppercase">Presenter</div>
            <div className="text-foreground font-semibold truncate">{executiveBriefing.presenter}</div>
          </div>
          <div className="p-2.5 rounded-xl bg-muted/20 border border-border">
            <div className="text-[10px] text-muted-foreground uppercase">Compiled Date</div>
            <div className="text-foreground font-semibold truncate">{executiveBriefing.generatedDate}</div>
          </div>
          <div className="p-2.5 rounded-xl bg-muted/20 border border-border">
            <div className="text-[10px] text-muted-foreground uppercase">Active Slides</div>
            <div className="text-foreground font-semibold truncate">{enabledSlides.length} / {executiveBriefing.slides.length} Selected</div>
          </div>
        </div>
      </div>

      {/* Main Slide Presentation Stage & Slide Thumbnails */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Slide Navigator Sidebar */}
        <div className="lg:col-span-1 space-y-3">
          <div className="text-xs font-mono font-semibold uppercase text-muted-foreground flex justify-between items-center px-1">
            <span>Slide Deck Outline</span>
            <span>{enabledSlides.length} Slides</span>
          </div>

          <div className="space-y-2 max-h-[520px] overflow-y-auto pr-1">
            {executiveBriefing.slides.map((slide, idx) => {
              const isSelected = enabledSlides[activeSlideIndex]?.id === slide.id;

              return (
                <div
                  key={slide.id}
                  onClick={() => {
                    const foundIdx = enabledSlides.findIndex(s => s.id === slide.id);
                    if (foundIdx >= 0) setActiveSlideIndex(foundIdx);
                  }}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer space-y-1.5 ${
                    !slide.enabled 
                      ? 'opacity-40 bg-muted/10 border-border'
                      : isSelected
                      ? 'bg-accent/10 border-accent shadow-sm ring-1 ring-accent'
                      : 'bg-card border-border hover:bg-muted/30'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold text-muted-foreground">
                      Slide #{idx + 1} · {slide.category}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleBriefingSlide(slide.id);
                      }}
                      className="text-[10px] text-muted-foreground hover:text-foreground font-mono"
                    >
                      {slide.enabled ? 'Enabled' : 'Disabled'}
                    </button>
                  </div>
                  <div className="font-serif font-bold text-xs text-foreground truncate">
                    {slide.title}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Active Slide Canvas (16:9 Presentation Frame) */}
        <div className="lg:col-span-3 space-y-4">
          <div className="relative aspect-[16/9] w-full rounded-2xl bg-gradient-to-br from-card via-card/95 to-muted/30 border border-border/80 p-6 md:p-10 flex flex-col justify-between shadow-lg overflow-hidden">
            {/* Top Presentation Bar */}
            <div className="flex items-center justify-between pb-4 border-b border-border/40">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
                  PARALLAX · {currentSlide?.category}
                </span>
              </div>
              <div className="text-xs font-mono text-muted-foreground">
                Slide {activeSlideIndex + 1} of {enabledSlides.length}
              </div>
            </div>

            {/* Slide Body Content */}
            <div className="my-auto space-y-5">
              <div>
                <h2 className="font-serif font-bold text-xl md:text-2xl lg:text-3xl text-foreground text-balance">
                  {currentSlide?.title}
                </h2>
                <p className="text-xs md:text-sm text-accent font-mono mt-1">
                  {currentSlide?.subtitle}
                </p>
              </div>

              {/* Bullet Points */}
              <div className="space-y-2.5">
                {currentSlide?.bulletPoints.map((bullet, bIdx) => (
                  <div key={bIdx} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                    <p className="text-xs md:text-sm text-foreground/90 leading-relaxed font-sans">
                      {bullet}
                    </p>
                  </div>
                ))}
              </div>

              {/* Callout Quote */}
              {currentSlide?.calloutQuote && (
                <div className="p-4 rounded-xl bg-accent/5 border-l-2 border-accent text-xs md:text-sm italic text-foreground/90">
                  "{currentSlide.calloutQuote}"
                </div>
              )}

              {/* Key Metrics Grid */}
              {currentSlide?.metrics && (
                <div className="grid grid-cols-3 gap-3 pt-2">
                  {currentSlide.metrics.map((m, mIdx) => (
                    <div key={mIdx} className="p-3 rounded-xl bg-muted/30 border border-border/60">
                      <div className="text-[10px] font-mono text-muted-foreground uppercase">{m.label}</div>
                      <div className="text-base md:text-lg font-bold font-mono text-foreground">{m.value}</div>
                      {m.delta && <div className="text-[10px] font-mono text-emerald-500">{m.delta}</div>}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Bottom Footer Frame */}
            <div className="flex items-center justify-between pt-4 border-t border-border/40 text-[10px] font-mono text-muted-foreground">
              <span>{executiveBriefing.presenter}</span>
              <span>{executiveBriefing.generatedDate} · Confidential Intelligence Dossier</span>
            </div>
          </div>

          {/* Presentation Slide Controls */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-card border border-border">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setActiveSlideIndex(prev => Math.max(0, prev - 1))}
                disabled={activeSlideIndex === 0}
                className="h-8 gap-1 text-xs"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setActiveSlideIndex(prev => Math.min(enabledSlides.length - 1, prev + 1))}
                disabled={activeSlideIndex >= enabledSlides.length - 1}
                className="h-8 gap-1 text-xs"
              >
                <span>Next</span>
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>

            <div className="text-xs font-mono text-muted-foreground">
              {activeSlideIndex + 1} / {enabledSlides.length}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};