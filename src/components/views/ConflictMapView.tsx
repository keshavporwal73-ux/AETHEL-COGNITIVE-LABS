import React, { useState } from 'react';
import { useParallax } from '@/contexts/ParallaxContext';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  GitCommit, 
  AlertTriangle, 
  Sparkles, 
  Scale, 
  ArrowRight, 
  Filter, 
  BookOpen, 
  Check, 
  Cpu,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { ConflictCategory, ConflictItem } from '@/types/parallax';

export const ConflictMapView: React.FC = () => {
  const { conflictMapData, runPrompt, isGenerating, goToStage } = useParallax();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedConflictId, setExpandedConflictId] = useState<string | null>(null);

  if (!conflictMapData) {
    return (
      <div className="p-8 text-center border border-dashed border-border rounded-xl">
        <GitCommit className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-40" />
        <h3 className="font-serif text-lg font-bold mb-2">No Conflict Map Generated</h3>
        <p className="text-sm text-muted-foreground max-w-md mx-auto mb-4">
          Execute a prompt across multiple models to uncover root-cause disagreement taxonomies (Data, Values, Definitions, Risk Tolerance).
        </p>
        <Button onClick={() => runPrompt()} disabled={isGenerating}>
          <Sparkles className="w-4 h-4 mr-2" />
          Generate Conflict Map
        </Button>
      </div>
    );
  }

  const categories: ('all' | ConflictCategory)[] = [
    'all',
    'Data Differences',
    'Value Judgments',
    'Definition Divergence',
    'Risk Tolerance',
    'Methodology Gap'
  ];

  const filteredConflicts = selectedCategory === 'all'
    ? conflictMapData.conflicts
    : conflictMapData.conflicts.filter(c => c.category === selectedCategory);

  const getSeverityBadge = (severity: 'Critical' | 'Moderate' | 'Minor') => {
    switch (severity) {
      case 'Critical': return <Badge variant="destructive" className="font-mono text-[10px]">Critical Dispute</Badge>;
      case 'Moderate': return <Badge variant="outline" className="font-mono text-[10px] text-amber-400 border-amber-500/40">Moderate Divergence</Badge>;
      case 'Minor': return <Badge variant="secondary" className="font-mono text-[10px]">Minor Semantic Nuance</Badge>;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-300">
      {/* Overview Banner */}
      <div className="p-4 rounded-xl bg-card border border-border flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="outline" className="font-mono text-xs uppercase bg-rose-500/10 text-rose-400 border-rose-500/30">
              Taxonomy of Disagreements
            </Badge>
            <span className="text-xs text-muted-foreground">Why Models Differ</span>
          </div>
          <h2 className="font-serif text-xl md:text-2xl font-bold tracking-tight text-foreground">
            {conflictMapData.primaryDisagreementAxis}
          </h2>
          <p className="text-sm text-muted-foreground mt-1 max-w-2xl">
            {conflictMapData.resolutionSummary}
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="text-right px-3 py-1.5 rounded-lg bg-muted/40 border border-border">
            <span className="text-xs font-mono text-muted-foreground block">Active Clashes</span>
            <span className="text-base font-bold font-mono text-rose-400">{conflictMapData.totalDisputes}</span>
          </div>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => goToStage('synthesize')}
            className="hidden md:flex items-center gap-1.5 text-xs"
          >
            <span>Proceed to Synthesis</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
        <Filter className="w-3.5 h-3.5 text-muted-foreground ml-1" />
        <span className="text-xs font-mono text-muted-foreground mr-1">Taxonomy Root:</span>
        {categories.map(cat => (
          <Button
            key={cat}
            variant={selectedCategory === cat ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setSelectedCategory(cat)}
            className="h-7 text-xs whitespace-nowrap"
          >
            {cat === 'all' ? 'All Disputes' : cat}
          </Button>
        ))}
      </div>

      {/* Conflict Items Grid */}
      <div className="grid grid-cols-1 gap-4">
        {filteredConflicts.map(conflict => {
          const isExpanded = expandedConflictId === conflict.id;
          return (
            <Card key={conflict.id} className="border-border hover:border-border/80 transition-colors">
              <CardHeader className="pb-3 cursor-pointer" onClick={() => setExpandedConflictId(isExpanded ? null : conflict.id)}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    {getSeverityBadge(conflict.severity)}
                    <Badge variant="secondary" className="font-mono text-[10px]">
                      {conflict.category}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{conflict.sides.length} Competing Factions</span>
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </div>
                <CardTitle className="text-base font-serif font-bold mt-2">
                  {conflict.topic}
                </CardTitle>
                <CardDescription className="text-xs text-muted-foreground mt-1">
                  {conflict.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="pt-0 space-y-4">
                {/* Side-by-Side Perspectives */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                  {conflict.sides.map((side, sIdx) => (
                    <div key={sIdx} className="p-3.5 rounded-xl bg-muted/30 border border-border/70 space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                          <Scale className="w-3.5 h-3.5 text-primary" />
                          Position {sIdx + 1}: {side.stance}
                        </span>
                      </div>
                      
                      <div className="flex flex-wrap gap-1">
                        {side.models.map(m => (
                          <Badge key={m} variant="outline" className="font-mono text-[10px] bg-background">
                            <Cpu className="w-2.5 h-2.5 mr-1" />
                            {m}
                          </Badge>
                        ))}
                      </div>

                      <p className="text-xs text-muted-foreground">
                        <strong className="text-foreground">Core Rationale:</strong> {side.coreRationale}
                      </p>

                      <div className="text-[11px] p-2 rounded bg-black/20 font-mono text-muted-foreground">
                        <strong>Evidence Cited:</strong> {side.supportingEvidence}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Resolution Pathway */}
                {conflict.resolutionPathway && (
                  <div className="p-3 rounded-lg bg-emerald-950/20 border border-emerald-600/30 text-xs">
                    <span className="font-semibold text-emerald-400 block mb-1 flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      Synthetic Resolution Pathway
                    </span>
                    <p className="text-muted-foreground">{conflict.resolutionPathway}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
