import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useParallax } from '@/contexts/ParallaxContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Brain, RefreshCw, Sparkles, ZoomIn, ZoomOut, Maximize2, 
  Download, Plus, GitCommit, ChevronRight, Layers, Target
} from 'lucide-react';
import { toast } from 'sonner';

interface MindNode {
  id: string;
  label: string;
  type: 'root' | 'branch' | 'leaf' | 'conflict' | 'evidence';
  x: number;
  y: number;
  color: string;
  glowColor: string;
  children: string[];
  modelSource?: string;
  confidence?: number;
  snippet?: string;
}

const DEMO_NODES: MindNode[] = [
  { id: 'root', label: 'Central Intelligence Node', type: 'root', x: 500, y: 320, color: '#06b6d4', glowColor: 'rgba(6,182,212,0.5)', children: ['n1','n2','n3','n4'], confidence: 95 },
  { id: 'n1', label: 'Economic Impact Analysis', type: 'branch', x: 200, y: 140, color: '#8b5cf6', glowColor: 'rgba(139,92,246,0.4)', children: ['n1a','n1b'], modelSource: 'GPT-4o', confidence: 88, snippet: 'DLT integration reduces cross-border settlement costs by 34%' },
  { id: 'n2', label: 'Regulatory Compliance Matrix', type: 'branch', x: 800, y: 140, color: '#ec4899', glowColor: 'rgba(236,72,153,0.4)', children: ['n2a','n2b'], modelSource: 'Claude 3.7', confidence: 79, snippet: 'Basel IV requirements conflict with real-time DLT finality' },
  { id: 'n3', label: 'Technical Architecture Risk', type: 'conflict', x: 160, y: 500, color: '#f43f5e', glowColor: 'rgba(244,63,94,0.4)', children: ['n3a'], modelSource: 'DeepSeek R1', confidence: 62, snippet: 'Validator collusion potential in permissioned networks' },
  { id: 'n4', label: 'Geopolitical Fragmentation', type: 'branch', x: 840, y: 500, color: '#10b981', glowColor: 'rgba(16,185,129,0.4)', children: ['n4a','n4b'], modelSource: 'Gemini 2.5', confidence: 71, snippet: 'Sovereign CBDC rivalries may fragment global liquidity' },
  { id: 'n1a', label: 'Atomic Swap Efficiency', type: 'leaf', x: 60, y: 60, color: '#38bdf8', glowColor: 'rgba(56,189,248,0.3)', children: [], modelSource: 'GPT-4o', confidence: 92 },
  { id: 'n1b', label: 'Liquidity Pool Fragmentation', type: 'evidence', x: 180, y: 30, color: '#a78bfa', glowColor: 'rgba(167,139,250,0.3)', children: [], modelSource: 'Claude 3.7', confidence: 83 },
  { id: 'n2a', label: 'ISO 20022 Adoption Rate', type: 'leaf', x: 760, y: 30, color: '#f9a8d4', glowColor: 'rgba(249,168,212,0.3)', children: [], modelSource: 'GPT-4o', confidence: 90 },
  { id: 'n2b', label: 'GDPR Cross-Border Constraint', type: 'conflict', x: 920, y: 60, color: '#fca5a5', glowColor: 'rgba(252,165,165,0.3)', children: [], modelSource: 'Gemini 2.5', confidence: 67 },
  { id: 'n3a', label: 'Byzantine Fault Threshold', type: 'leaf', x: 60, y: 590, color: '#fb7185', glowColor: 'rgba(251,113,133,0.3)', children: [], modelSource: 'DeepSeek R1', confidence: 55 },
  { id: 'n4a', label: 'BIS Project Agorá Findings', type: 'evidence', x: 840, y: 620, color: '#34d399', glowColor: 'rgba(52,211,153,0.3)', children: [], modelSource: 'Gemini 2.5', confidence: 94 },
  { id: 'n4b', label: 'Petrodollar Settlement Risk', type: 'leaf', x: 970, y: 530, color: '#6ee7b7', glowColor: 'rgba(110,231,183,0.3)', children: [], modelSource: 'Claude 3.7', confidence: 60 },
];

const DEMO_EDGES = [
  { from: 'root', to: 'n1' }, { from: 'root', to: 'n2' }, { from: 'root', to: 'n3' }, { from: 'root', to: 'n4' },
  { from: 'n1', to: 'n1a' }, { from: 'n1', to: 'n1b' },
  { from: 'n2', to: 'n2a' }, { from: 'n2', to: 'n2b' },
  { from: 'n3', to: 'n3a' },
  { from: 'n4', to: 'n4a' }, { from: 'n4', to: 'n4b' },
  { from: 'n1', to: 'n3' }, // conflict edge
  { from: 'n2', to: 'n4' }, // cross-link
];

const NODE_TYPE_COLORS: Record<string, { bg: string; border: string; text: string }> = {
  root:     { bg: 'bg-cyan-950/80',   border: 'border-cyan-400/70',   text: 'text-cyan-200' },
  branch:   { bg: 'bg-violet-950/70', border: 'border-violet-400/50', text: 'text-violet-200' },
  leaf:     { bg: 'bg-slate-900/70',  border: 'border-slate-500/50',  text: 'text-slate-300' },
  conflict: { bg: 'bg-rose-950/70',   border: 'border-rose-500/60',   text: 'text-rose-300' },
  evidence: { bg: 'bg-emerald-950/70',border: 'border-emerald-500/50',text: 'text-emerald-300' },
};

export const QuantumMindMapView: React.FC = () => {
  const { runPrompt, isGenerating } = useParallax();
  const svgRef = useRef<SVGSVGElement>(null);
  const [nodes, setNodes] = useState<MindNode[]>(DEMO_NODES);
  const [selectedNode, setSelectedNode] = useState<MindNode | null>(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [newNodeLabel, setNewNodeLabel] = useState('');
  const [showAddPanel, setShowAddPanel] = useState(false);
  const [pulse, setPulse] = useState(0);

  // Animate quantum pulse
  useEffect(() => {
    const t = setInterval(() => setPulse(p => (p + 1) % 100), 80);
    return () => clearInterval(t);
  }, []);

  const nodeMap = new Map(nodes.map(n => [n.id, n]));

  const handleNodeClick = (node: MindNode, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedNode(selectedNode?.id === node.id ? null : node);
  };

  const handleSvgMouseDown = (e: React.MouseEvent) => {
    if (e.target === svgRef.current || (e.target as Element).tagName === 'svg') {
      setIsDragging(true);
      setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
      setSelectedNode(null);
    }
  };
  const handleSvgMouseMove = useCallback((e: React.MouseEvent) => {
    if (isDragging) setPan({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
  }, [isDragging, dragStart]);
  const handleSvgMouseUp = () => setIsDragging(false);

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    setZoom(z => Math.min(3, Math.max(0.3, z - e.deltaY * 0.001)));
  };

  const addNode = () => {
    if (!newNodeLabel.trim()) return;
    const parentId = selectedNode?.id || 'root';
    const parent = nodeMap.get(parentId);
    const angle = Math.random() * Math.PI * 2;
    const dist = 160 + Math.random() * 80;
    const newNode: MindNode = {
      id: `custom_${Date.now()}`,
      label: newNodeLabel.trim(),
      type: 'branch',
      x: (parent?.x ?? 500) + Math.cos(angle) * dist,
      y: (parent?.y ?? 320) + Math.sin(angle) * dist,
      color: '#06b6d4',
      glowColor: 'rgba(6,182,212,0.4)',
      children: [],
      modelSource: 'User',
      confidence: 75,
    };
    setNodes(prev => [
      ...prev.map(n => n.id === parentId ? { ...n, children: [...n.children, newNode.id] } : n),
      newNode,
    ]);
    setNewNodeLabel('');
    setShowAddPanel(false);
    toast.success('Quantum node added to the cognitive map');
  };

  const handleExport = () => {
    const data = JSON.stringify({ nodes, edges: DEMO_EDGES }, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'aethel-mindmap.json'; a.click();
    toast.success('Mind map exported as JSON dossier');
  };

  const getEdgeStyle = (from: string, to: string) => {
    const fNode = nodeMap.get(from);
    const tNode = nodeMap.get(to);
    if (fNode?.type === 'conflict' || tNode?.type === 'conflict') return { stroke: '#f43f5e', opacity: 0.7, dasharray: '6 4' };
    if (from === 'root' || to === 'root') return { stroke: '#06b6d4', opacity: 0.6, dasharray: 'none' };
    return { stroke: '#8b5cf6', opacity: 0.4, dasharray: '4 6' };
  };

  const renderEdge = (edge: { from: string; to: string }, i: number) => {
    const s = nodeMap.get(edge.from);
    const t = nodeMap.get(edge.to);
    if (!s || !t) return null;
    const style = getEdgeStyle(edge.from, edge.to);
    const mx = (s.x + t.x) / 2;
    const my = (s.y + t.y) / 2 - 30;
    return (
      <path
        key={i}
        d={`M ${s.x} ${s.y} Q ${mx} ${my} ${t.x} ${t.y}`}
        stroke={style.stroke}
        strokeWidth="1.5"
        strokeOpacity={style.opacity}
        strokeDasharray={style.dasharray === 'none' ? undefined : style.dasharray}
        fill="none"
        strokeLinecap="round"
      />
    );
  };

  const renderNode = (node: MindNode) => {
    const isRoot = node.type === 'root';
    const isSelected = selectedNode?.id === node.id;
    const r = isRoot ? 48 : node.type === 'branch' ? 38 : 28;
    const glowR = r + 10 + Math.sin((pulse / 100) * Math.PI * 2 + node.x * 0.01) * 5;

    return (
      <g key={node.id} onClick={(e) => handleNodeClick(node, e)} className="cursor-pointer">
        {/* Pulsing glow aura */}
        <circle
          cx={node.x} cy={node.y} r={glowR}
          fill={node.glowColor}
          className="pointer-events-none"
        />
        {/* Selected ring */}
        {isSelected && (
          <circle cx={node.x} cy={node.y} r={r + 8}
            fill="none" stroke="#06b6d4" strokeWidth="2"
            strokeDasharray="5 3" className="animate-spin" style={{ transformOrigin: `${node.x}px ${node.y}px`, animationDuration: '4s' }} />
        )}
        {/* Node base circle */}
        <circle
          cx={node.x} cy={node.y} r={r}
          fill={isRoot ? '#06172a' : '#0b0f1f'}
          stroke={node.color}
          strokeWidth={isRoot ? 2.5 : isSelected ? 2 : 1.5}
        />
        {/* Root quantum diamond */}
        {isRoot && (
          <polygon
            points={`${node.x},${node.y - 22} ${node.x + 22},${node.y} ${node.x},${node.y + 22} ${node.x - 22},${node.y}`}
            fill="none"
            stroke="url(#mqGradient)"
            strokeWidth="1.5"
            className="pointer-events-none"
          />
        )}
        {/* Label */}
        <foreignObject
          x={node.x - r} y={node.y - 18}
          width={r * 2} height={36}
          className="pointer-events-none"
        >
          <div style={{ fontSize: isRoot ? 10 : 9, textAlign: 'center', color: node.color, fontFamily: 'monospace', fontWeight: 600, lineHeight: 1.3, padding: '0 2px', overflow: 'hidden' }}>
            {node.label.length > 24 ? node.label.slice(0, 22) + '…' : node.label}
          </div>
        </foreignObject>
        {/* Confidence badge */}
        {node.confidence !== undefined && (
          <text x={node.x} y={node.y + r + 12} textAnchor="middle" fontSize="8" fill={node.color} fontFamily="monospace" opacity="0.7">
            {node.confidence}% conf
          </text>
        )}
      </g>
    );
  };

  return (
    <div className="w-full space-y-4">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl bg-card border border-border">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-600/30 to-violet-600/20 border border-cyan-500/30 flex items-center justify-center">
            <Brain className="w-5 h-5 text-cyan-400" />
          </div>
          <div>
            <h2 className="font-serif text-base font-bold flex items-center gap-2">
              Quantum Mind Map
              <Badge variant="outline" className="text-[10px] font-mono border-cyan-500/30 text-cyan-400 bg-cyan-950/30">
                LIVE COGNITIVE GRAPH
              </Badge>
            </h2>
            <p className="text-[11px] text-muted-foreground font-mono">{nodes.length} nodes · {DEMO_EDGES.length} quantum edges · drag to pan · scroll to zoom</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline" onClick={() => setZoom(z => Math.min(3, z + 0.2))} className="h-8 w-8 p-0 border-border">
            <ZoomIn className="w-3.5 h-3.5" />
          </Button>
          <Button size="sm" variant="outline" onClick={() => setZoom(z => Math.max(0.3, z - 0.2))} className="h-8 w-8 p-0 border-border">
            <ZoomOut className="w-3.5 h-3.5" />
          </Button>
          <Button size="sm" variant="outline" onClick={() => { setZoom(1); setPan({ x: 0, y: 0 }); }} className="h-8 px-2.5 text-xs border-border">
            <Maximize2 className="w-3.5 h-3.5 mr-1" />Reset
          </Button>
          <Button size="sm" variant="outline" onClick={() => setShowAddPanel(p => !p)} className="h-8 px-2.5 text-xs border-cyan-500/30 text-cyan-400">
            <Plus className="w-3.5 h-3.5 mr-1" />Node
          </Button>
          <Button size="sm" variant="outline" onClick={handleExport} className="h-8 px-2.5 text-xs border-border">
            <Download className="w-3.5 h-3.5 mr-1" />Export
          </Button>
          <Button
            size="sm"
            onClick={() => runPrompt()}
            disabled={isGenerating}
            className="h-8 px-3 text-xs bg-gradient-to-r from-cyan-600 to-violet-600 hover:from-cyan-500 hover:to-violet-500 text-white border-0"
          >
            {isGenerating ? <RefreshCw className="w-3.5 h-3.5 mr-1.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5 mr-1.5" />}
            Regenerate Map
          </Button>
        </div>
      </div>

      {/* Add Node Panel */}
      {showAddPanel && (
        <div className="p-3 rounded-lg bg-card border border-cyan-500/30 flex items-center gap-2">
          <Input
            value={newNodeLabel}
            onChange={e => setNewNodeLabel(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && addNode()}
            placeholder={selectedNode ? `Connect to "${selectedNode.label.slice(0,20)}…"` : 'Enter node label and press Enter…'}
            className="h-8 text-xs flex-1 bg-background border-border"
            autoFocus
          />
          <Button size="sm" onClick={addNode} disabled={!newNodeLabel.trim()} className="h-8 px-3 text-xs bg-cyan-600 hover:bg-cyan-500 text-white border-0">
            <Plus className="w-3.5 h-3.5 mr-1" />Add
          </Button>
        </div>
      )}

      <div className="flex gap-4">
        {/* SVG Canvas */}
        <div
          className="flex-1 min-w-0 rounded-xl border border-border bg-[#070b14] overflow-hidden"
          style={{ height: 520, cursor: isDragging ? 'grabbing' : 'grab' }}
          onWheel={handleWheel}
        >
          <svg
            ref={svgRef}
            width="100%" height="100%"
            onMouseDown={handleSvgMouseDown}
            onMouseMove={handleSvgMouseMove}
            onMouseUp={handleSvgMouseUp}
            onMouseLeave={handleSvgMouseUp}
          >
            <defs>
              <linearGradient id="mqGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#06b6d4" />
                <stop offset="50%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#ec4899" />
              </linearGradient>
              {/* Cybernetic grid pattern */}
              <pattern id="mqGrid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1e293b" strokeWidth="0.5" />
              </pattern>
            </defs>

            {/* Background grid */}
            <rect width="100%" height="100%" fill="url(#mqGrid)" />

            <g transform={`translate(${pan.x}, ${pan.y}) scale(${zoom})`}>
              {/* Render edges */}
              {DEMO_EDGES.map((edge, i) => renderEdge(edge, i))}
              {/* Render dynamic edges for user-added nodes */}
              {nodes.filter(n => n.id.startsWith('custom_')).map(n => {
                const parent = nodes.find(p => p.children.includes(n.id));
                if (!parent) return null;
                return renderEdge({ from: parent.id, to: n.id }, n.id as unknown as number);
              })}
              {/* Render nodes */}
              {nodes.map(renderNode)}
            </g>

            {/* Legend overlay */}
            <g transform="translate(12, 12)">
              {[
                { type: 'root', label: 'Central Root', color: '#06b6d4' },
                { type: 'branch', label: 'Branch Node', color: '#8b5cf6' },
                { type: 'conflict', label: 'Conflict', color: '#f43f5e' },
                { type: 'evidence', label: 'Evidence', color: '#10b981' },
              ].map((item, i) => (
                <g key={item.type} transform={`translate(0, ${i * 18})`}>
                  <circle cx={6} cy={6} r={5} fill={item.color} opacity={0.8} />
                  <text x={15} y={10} fontSize="9" fill="#94a3b8" fontFamily="monospace">{item.label}</text>
                </g>
              ))}
            </g>

            {/* Zoom indicator */}
            <text x="calc(100% - 8)" y="calc(100% - 8)" fontSize="9" textAnchor="end" fill="#475569" fontFamily="monospace">
              {`zoom: ${(zoom * 100).toFixed(0)}%`}
            </text>
          </svg>
        </div>

        {/* Node Inspector Panel */}
        {selectedNode && (
          <div className="w-64 shrink-0 rounded-xl border border-border bg-card p-4 space-y-3">
            <div className="flex items-center gap-2 pb-2 border-b border-border">
              <Layers className="w-4 h-4 text-cyan-400" />
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">Node Inspector</span>
            </div>
            <div className={`px-2 py-1.5 rounded-lg border text-xs font-medium ${NODE_TYPE_COLORS[selectedNode.type]?.bg} ${NODE_TYPE_COLORS[selectedNode.type]?.border} ${NODE_TYPE_COLORS[selectedNode.type]?.text}`}>
              {selectedNode.type.toUpperCase()} NODE
            </div>
            <div>
              <div className="text-[10px] font-mono text-muted-foreground mb-0.5">LABEL</div>
              <p className="text-xs font-medium text-foreground leading-snug">{selectedNode.label}</p>
            </div>
            {selectedNode.modelSource && (
              <div>
                <div className="text-[10px] font-mono text-muted-foreground mb-0.5">MODEL SOURCE</div>
                <Badge variant="outline" className="text-[10px] border-violet-500/30 text-violet-400">{selectedNode.modelSource}</Badge>
              </div>
            )}
            {selectedNode.confidence !== undefined && (
              <div>
                <div className="text-[10px] font-mono text-muted-foreground mb-1">CONFIDENCE</div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                    <div className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-violet-500"
                      style={{ width: `${selectedNode.confidence}%` }} />
                  </div>
                  <span className="text-[11px] font-mono text-cyan-400">{selectedNode.confidence}%</span>
                </div>
              </div>
            )}
            {selectedNode.snippet && (
              <div>
                <div className="text-[10px] font-mono text-muted-foreground mb-1">SNIPPET</div>
                <p className="text-[11px] text-muted-foreground leading-relaxed italic">"{selectedNode.snippet}"</p>
              </div>
            )}
            <div>
              <div className="text-[10px] font-mono text-muted-foreground mb-1">CONNECTIONS</div>
              <div className="flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">{selectedNode.children.length} child nodes</span>
              </div>
            </div>
            <Button
              size="sm"
              variant="outline"
              className="w-full h-7 text-[10px] border-cyan-500/30 text-cyan-400 hover:bg-cyan-950/30"
              onClick={() => { setShowAddPanel(true); }}
            >
              <Plus className="w-3 h-3 mr-1" /> Add Child Node
            </Button>
          </div>
        )}
      </div>

      {/* Statistics Footer */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'Total Nodes', value: nodes.length.toString(), icon: <Brain className="w-4 h-4" />, color: 'text-cyan-400', bg: 'bg-cyan-950/30 border-cyan-500/20' },
          { label: 'Conflict Edges', value: DEMO_EDGES.filter((_, i) => i >= 11).length.toString(), icon: <GitCommit className="w-4 h-4" />, color: 'text-rose-400', bg: 'bg-rose-950/30 border-rose-500/20' },
          { label: 'Evidence Nodes', value: nodes.filter(n => n.type === 'evidence').length.toString(), icon: <Layers className="w-4 h-4" />, color: 'text-emerald-400', bg: 'bg-emerald-950/30 border-emerald-500/20' },
          { label: 'Avg Confidence', value: `${Math.round(nodes.filter(n => n.confidence).reduce((s, n) => s + (n.confidence ?? 0), 0) / nodes.filter(n => n.confidence).length)}%`, icon: <ChevronRight className="w-4 h-4" />, color: 'text-violet-400', bg: 'bg-violet-950/30 border-violet-500/20' },
        ].map(stat => (
          <div key={stat.label} className={`p-3 rounded-lg border ${stat.bg} flex items-center gap-3`}>
            <span className={stat.color}>{stat.icon}</span>
            <div>
              <div className={`text-base font-bold font-mono ${stat.color}`}>{stat.value}</div>
              <div className="text-[10px] text-muted-foreground">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuantumMindMapView;
