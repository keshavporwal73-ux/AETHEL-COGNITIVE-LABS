import React, { useState } from 'react';
import { useParallax } from '@/contexts/ParallaxContext';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { 
  Network, 
  Layers, 
  AlertTriangle, 
  CheckCircle2, 
  HelpCircle, 
  Cpu, 
  Sparkles, 
  ArrowRight,
  ShieldAlert,
  Search,
  Filter,
  RefreshCw,
  Maximize2
} from 'lucide-react';
import { IntelligenceNode } from '@/types/parallax';

export const IntelligenceMapView: React.FC = () => {
  const { intelligenceMapData, runPrompt, isGenerating, goToStage } = useParallax();
  const [selectedType, setSelectedType] = useState<string>('all');
  const [activeNode, setActiveNode] = useState<IntelligenceNode | null>(null);

  if (!intelligenceMapData) {
    return (
      <div className="p-8 text-center border border-dashed border-border rounded-xl">
        <Network className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-40" />
        <h3 className="font-serif text-lg font-bold mb-2">No Intelligence Map Generated Yet</h3>
        <p className="text-sm text-muted-foreground max-w-md mx-auto mb-4">
          Execute an inquiry to automatically synthesize claims, evidence anchors, model perspectives, and dispute boundaries into an interactive Intelligence Map.
        </p>
        <Button onClick={() => runPrompt()} disabled={isGenerating}>
          {isGenerating ? <RefreshCw className="w-4 h-4 mr-2 animate-spin" /> : <Sparkles className="w-4 h-4 mr-2" />}
          Generate Intelligence Map
        </Button>
      </div>
    );
  }

  const filteredNodes = selectedType === 'all' 
    ? intelligenceMapData.nodes 
    : intelligenceMapData.nodes.filter(n => n.type === selectedType);

  const getNodeColor = (type: string) => {
    switch (type) {
      case 'conclusion': return 'bg-primary text-primary-foreground border-primary';
      case 'claim': return 'bg-amber-950/40 text-amber-300 border-amber-600/40';
      case 'evidence': return 'bg-emerald-950/40 text-emerald-300 border-emerald-600/40';
      case 'perspective': return 'bg-indigo-950/40 text-indigo-300 border-indigo-600/40';
      case 'conflict': return 'bg-rose-950/40 text-rose-300 border-rose-600/40';
      case 'assumption': return 'bg-purple-950/40 text-purple-300 border-purple-600/40';
      default: return 'bg-muted text-foreground border-border';
    }
  };

  const getNodeIcon = (type: string) => {
    switch (type) {
      case 'conclusion': return <Sparkles className="w-3.5 h-3.5" />;
      case 'claim': return <Layers className="w-3.5 h-3.5" />;
      case 'evidence': return <CheckCircle2 className="w-3.5 h-3.5" />;
      case 'perspective': return <Cpu className="w-3.5 h-3.5" />;
      case 'conflict': return <AlertTriangle className="w-3.5 h-3.5" />;
      case 'assumption': return <HelpCircle className="w-3.5 h-3.5" />;
      default: return <Network className="w-3.5 h-3.5" />;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-300">
      {/* Top Meta Summary */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-xl bg-card border border-border">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="outline" className="font-mono text-xs uppercase bg-primary/10 text-primary border-primary/30">
              Stage 4: Intelligence Mapping
            </Badge>
            <span className="text-xs text-muted-foreground">Triangulated Graph Analysis</span>
          </div>
          <h2 className="font-serif text-xl md:text-2xl font-bold tracking-tight text-foreground">
            {intelligenceMapData.title}
          </h2>
          <p className="text-sm text-muted-foreground mt-1 max-w-2xl">
            {intelligenceMapData.summary}
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="text-right px-3 py-1.5 rounded-lg bg-muted/40 border border-border">
            <span className="text-xs font-mono text-muted-foreground block">Coverage Depth</span>
            <span className="text-base font-bold font-mono text-primary">{intelligenceMapData.coverageScore}%</span>
          </div>
          <div className="text-right px-3 py-1.5 rounded-lg bg-muted/40 border border-border">
            <span className="text-xs font-mono text-muted-foreground block">Dispute Anchors</span>
            <span className="text-base font-bold font-mono text-rose-400">{intelligenceMapData.conflictCount}</span>
          </div>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => goToStage('stress-test')}
            className="hidden md:flex items-center gap-1.5 text-xs font-medium"
          >
            <span>Proceed to Stress Test</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between gap-2 overflow-x-auto pb-1">
        <div className="flex items-center gap-1.5">
          <Filter className="w-3.5 h-3.5 text-muted-foreground ml-1" />
          <span className="text-xs font-mono text-muted-foreground mr-2">Filter Nodes:</span>
          {(['all', 'claim', 'evidence', 'perspective', 'conflict'] as const).map(type => (
            <Button
              key={type}
              variant={selectedType === type ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setSelectedType(type)}
              className="h-7 text-xs capitalize"
            >
              {type === 'all' ? `All (${intelligenceMapData.nodes.length})` : `${type}s`}
            </Button>
          ))}
        </div>
      </div>

      {/* Main Graph Canvas & Matrix View */}
      <Tabs defaultValue="visual" className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-xs mb-4">
          <TabsTrigger value="visual" className="text-xs">Visual Topology</TabsTrigger>
          <TabsTrigger value="matrix" className="text-xs">Structured Matrix</TabsTrigger>
        </TabsList>

        <TabsContent value="visual" className="space-y-4">
          <Card className="border-border overflow-hidden relative">
            <div className="p-4 bg-muted/20 border-b border-border flex items-center justify-between text-xs text-muted-foreground">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Interactive Cognitive Topology • Click any node to inspect semantic evidence
              </span>
              <span className="font-mono">{filteredNodes.length} Nodes Rendered</span>
            </div>

            {/* Simulated 2D Topology Canvas */}
            <div className="min-h-[440px] p-6 bg-radial-gradient relative overflow-hidden flex flex-wrap gap-4 items-center justify-center">
              {filteredNodes.map((node) => (
                <div
                  key={node.id}
                  onClick={() => setActiveNode(node)}
                  className={`cursor-pointer transition-all duration-200 transform hover:scale-105 p-3.5 rounded-xl border max-w-xs w-full sm:w-[260px] shadow-sm ${
                    getNodeColor(node.type)
                  } ${activeNode?.id === node.id ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' : ''}`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="flex items-center gap-1.5 text-xs font-semibold tracking-wide uppercase font-mono">
                      {getNodeIcon(node.type)}
                      {node.type}
                    </span>
                    {node.confidence && (
                      <span className="text-[10px] font-mono opacity-80">{node.confidence}% Conf.</span>
                    )}
                  </div>
                  <h4 className="font-medium text-sm leading-snug line-clamp-2 mb-1">
                    {node.label}
                  </h4>
                  {node.snippet && (
                    <p className="text-xs opacity-80 line-clamp-2">
                      {node.snippet}
                    </p>
                  )}
                  {node.tags && node.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {node.tags.map(t => (
                        <span key={t} className="text-[9px] px-1.5 py-0.5 rounded bg-black/20 font-mono">
                          #{t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="matrix" className="space-y-4">
          <Card className="border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-serif">Node Relationship Ingestion Matrix</CardTitle>
              <CardDescription className="text-xs">
                Exhaustive relational mapping between claims, supporting empirical literature, model stances, and conflict edges.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="w-full overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-border bg-muted/40 text-muted-foreground font-mono">
                      <th className="p-2.5 whitespace-nowrap">Edge ID</th>
                      <th className="p-2.5 whitespace-nowrap">Source Node</th>
                      <th className="p-2.5 whitespace-nowrap">Relation</th>
                      <th className="p-2.5 whitespace-nowrap">Target Node</th>
                      <th className="p-2.5 whitespace-nowrap">Strength</th>
                      <th className="p-2.5 whitespace-nowrap">Annotation</th>
                    </tr>
                  </thead>
                  <tbody>
                    {intelligenceMapData.edges.map(edge => {
                      const src = intelligenceMapData.nodes.find(n => n.id === edge.source);
                      const tgt = intelligenceMapData.nodes.find(n => n.id === edge.target);
                      return (
                        <tr key={edge.id} className="border-b border-border/50 hover:bg-muted/20">
                          <td className="p-2.5 font-mono text-muted-foreground whitespace-nowrap">{edge.id}</td>
                          <td className="p-2.5 font-medium whitespace-nowrap">{src?.label || edge.source}</td>
                          <td className="p-2.5 whitespace-nowrap">
                            <Badge variant="outline" className={`font-mono text-[10px] ${
                              edge.relation === 'supports' ? 'text-emerald-400 border-emerald-500/30' :
                              edge.relation === 'contradicts' ? 'text-rose-400 border-rose-500/30' :
                              'text-amber-400 border-amber-500/30'
                            }`}>
                              {edge.relation}
                            </Badge>
                          </td>
                          <td className="p-2.5 font-medium whitespace-nowrap">{tgt?.label || edge.target}</td>
                          <td className="p-2.5 font-mono capitalize whitespace-nowrap">{edge.strength}</td>
                          <td className="p-2.5 text-muted-foreground max-w-xs truncate">{edge.annotation}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Selected Node Inspector Drawer / Card */}
      {activeNode && (
        <Card className="border-primary/40 bg-card/90 backdrop-blur shadow-md">
          <CardHeader className="pb-2 flex flex-row items-start justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Badge className={`font-mono text-xs uppercase ${getNodeColor(activeNode.type)}`}>
                  {activeNode.type}
                </Badge>
                {activeNode.confidence && (
                  <span className="text-xs font-mono text-muted-foreground">Confidence: {activeNode.confidence}%</span>
                )}
              </div>
              <CardTitle className="text-base font-serif">{activeNode.label}</CardTitle>
            </div>
            <Button variant="ghost" size="sm" onClick={() => setActiveNode(null)} className="h-7 text-xs">
              Dismiss
            </Button>
          </CardHeader>
          <CardContent className="text-sm space-y-2">
            <p className="text-muted-foreground">{activeNode.snippet}</p>
            {activeNode.tags && (
              <div className="flex flex-wrap gap-1.5 pt-2">
                {activeNode.tags.map(t => (
                  <Badge key={t} variant="secondary" className="font-mono text-[10px]">
                    #{t}
                  </Badge>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};
