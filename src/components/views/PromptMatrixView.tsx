import React, { useState } from 'react';
import { useParallax } from '@/contexts/ParallaxContext';
import { PromptMatrixCell, PromptMatrixRow, PromptMatrixCol } from '@/types/parallax';
import { getModelById } from '@/services/modelCatalog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { 
  Grid3X3, 
  Play, 
  RotateCcw, 
  Download, 
  Copy, 
  Maximize2, 
  X, 
  Plus, 
  Sliders, 
  Sparkles,
  Layers,
  FileSpreadsheet
} from 'lucide-react';
import { toast } from 'sonner';

export const PromptMatrixView: React.FC = () => {
  const { 
    promptMatrixGrid, 
    runPromptMatrix, 
    isGenerating, 
    currentPrompt 
  } = useParallax();

  const [activePrompt, setActivePrompt] = useState(currentPrompt || 'Evaluate the feasibility and timeline of multi-agent autonomous software engineering teams.');
  const [selectedCell, setSelectedCell] = useState<{ key: string; cell: PromptMatrixCell; row: PromptMatrixRow; col: PromptMatrixCol } | null>(null);

  const handleRunMatrix = () => {
    runPromptMatrix(activePrompt);
  };

  const handleExportCSV = () => {
    if (!promptMatrixGrid) return;
    const header = ['Variant Framing', 'Prompt Text', ...promptMatrixGrid.cols.map(c => `${getModelById(c.modelId)?.name || c.modelId} (Temp ${c.temperature})`)].join(',');
    const rows = promptMatrixGrid.rows.map(row => {
      const colValues = promptMatrixGrid.cols.map(col => {
        const cell = promptMatrixGrid.cells[`${row.id}_${col.id}`];
        return `"${(cell?.response || '').replace(/"/g, '""').slice(0, 150)}..."`;
      });
      return [`"${row.variantLabel}"`, `"${row.promptText.replace(/"/g, '""')}"`, ...colValues].join(',');
    });
    const csvContent = 'data:text/csv;charset=utf-8,' + [header, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `prompt_matrix_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Prompt Matrix exported to CSV');
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Header Banner */}
      <div className="p-5 md:p-6 rounded-2xl bg-card border border-border space-y-4 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-500 shadow-sm">
              <Grid3X3 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif font-bold text-lg md:text-xl text-foreground">
                  Prompt Matrix Sandbox · N×M Parametric Testing
                </h1>
                <Badge variant="outline" className="text-[10px] font-mono border-violet-500/40 text-violet-500 bg-violet-500/5">
                  Multi-Variable Sweep
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground font-mono">
                Systematically stress-test prompt framings across multiple foundation models and temperature configurations
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleExportCSV}
              disabled={!promptMatrixGrid}
              className="text-xs h-8 gap-1.5 border-border bg-background hover:bg-muted"
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </Button>
            <Button
              size="sm"
              onClick={handleRunMatrix}
              disabled={isGenerating}
              className="text-xs h-8 gap-1.5 bg-primary text-primary-foreground font-semibold shadow-sm hover:opacity-90"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>{isGenerating ? 'Executing Matrix...' : 'Run Matrix Sweep'}</span>
            </Button>
          </div>
        </div>

        {/* Base Concept Directive Input */}
        <div className="space-y-2 pt-2 border-t border-border/50">
          <div className="flex justify-between items-center text-xs font-mono">
            <span className="text-muted-foreground font-semibold uppercase text-[10px]">Base Strategic Concept / Hypothesis</span>
            <span className="text-muted-foreground">{promptMatrixGrid ? `${promptMatrixGrid.rows.length} Variants × ${promptMatrixGrid.cols.length} Configs` : '3 Variants × 4 Configs'}</span>
          </div>
          <Textarea
            value={activePrompt}
            onChange={(e) => setActivePrompt(e.target.value)}
            rows={2}
            className="text-xs md:text-sm resize-none rounded-xl bg-muted/20 border-border focus:ring-accent"
            placeholder="Enter the core thesis or engineering problem to expand into matrix variations..."
          />
        </div>
      </div>

      {/* Matrix 2D Grid */}
      {promptMatrixGrid && (
        <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm">
          <div className="p-4 border-b border-border bg-muted/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-serif font-bold text-sm text-foreground">Interactive Response Matrix</span>
              <span className="text-xs text-muted-foreground font-mono">(Click any cell to inspect full reasoning)</span>
            </div>
            <div className="text-xs font-mono text-muted-foreground">
              Total Cells: {promptMatrixGrid.rows.length * promptMatrixGrid.cols.length}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="p-3 text-xs font-mono font-semibold text-muted-foreground w-64 uppercase tracking-wider">
                    Prompt Variant / Framing
                  </th>
                  {promptMatrixGrid.cols.map(col => {
                    const model = getModelById(col.modelId);
                    return (
                      <th key={col.id} className="p-3 text-xs font-mono text-foreground min-w-[240px] border-l border-border">
                        <div className="flex items-center justify-between">
                          <span className="font-bold">{model?.name || col.modelId}</span>
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground">
                            T: {col.temperature}
                          </span>
                        </div>
                        <div className="text-[10px] text-muted-foreground font-normal mt-0.5">
                          {col.responseLength} Response · {model?.provider}
                        </div>
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {promptMatrixGrid.rows.map(row => (
                  <tr key={row.id} className="hover:bg-muted/10 transition-colors">
                    <td className="p-3 align-top bg-muted/15 border-r border-border">
                      <div className="font-serif font-bold text-xs text-foreground mb-1">
                        {row.variantLabel}
                      </div>
                      <p className="text-[11px] text-muted-foreground line-clamp-3 italic">
                        "{row.promptText}"
                      </p>
                    </td>

                    {promptMatrixGrid.cols.map(col => {
                      const cellKey = `${row.id}_${col.id}`;
                      const cell = promptMatrixGrid.cells[cellKey];

                      if (!cell) {
                        return (
                          <td key={col.id} className="p-3 text-xs text-muted-foreground border-l border-border">
                            Pending...
                          </td>
                        );
                      }

                      return (
                        <td 
                          key={col.id} 
                          onClick={() => setSelectedCell({ key: cellKey, cell, row, col })}
                          className="p-3 align-top border-l border-border hover:bg-accent/5 cursor-pointer transition-all group"
                        >
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-[10px] font-mono">
                              <span className="text-emerald-500 font-semibold">{cell.score}/100 Score</span>
                              <span className="text-muted-foreground">{cell.latencyMs}ms · {cell.tokenCount}t</span>
                            </div>

                            <p className="text-xs text-foreground/90 line-clamp-3 leading-relaxed">
                              {cell.response}
                            </p>

                            <div className="flex justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                              <span className="text-[10px] font-mono text-accent flex items-center gap-1 font-semibold">
                                <Maximize2 className="w-2.5 h-2.5" /> Inspect
                              </span>
                            </div>
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Detailed Cell Modal */}
      {selectedCell && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-2xl max-w-2xl w-full p-6 space-y-4 shadow-2xl animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-accent font-bold">
                  Matrix Inspection · {selectedCell.row.variantLabel}
                </div>
                <h3 className="font-serif font-bold text-base text-foreground">
                  {getModelById(selectedCell.col.modelId)?.name || selectedCell.col.modelId} (Temp: {selectedCell.col.temperature})
                </h3>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedCell(null)}
                className="h-8 w-8 p-0 rounded-full"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
              <div className="p-3 rounded-xl bg-muted/20 border border-border text-xs space-y-1">
                <div className="font-mono font-bold text-[10px] text-muted-foreground uppercase">Tested Prompt</div>
                <div className="text-foreground italic">{selectedCell.row.promptText}</div>
              </div>

              <div className="space-y-2">
                <div className="font-mono font-bold text-[10px] text-muted-foreground uppercase">Model Output</div>
                <div className="p-4 rounded-xl bg-muted/10 border border-border text-xs font-mono whitespace-pre-wrap leading-relaxed text-foreground">
                  {selectedCell.cell.response}
                </div>
              </div>

              <div className="flex items-center justify-between text-xs font-mono pt-2 text-muted-foreground border-t border-border">
                <span>Latency: {selectedCell.cell.latencyMs}ms</span>
                <span>Tokens Generated: {selectedCell.cell.tokenCount}</span>
                <span className="text-emerald-500 font-bold">Quality Score: {selectedCell.cell.score}/100</span>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  navigator.clipboard.writeText(selectedCell.cell.response);
                  toast.success('Response copied to clipboard');
                }}
                className="text-xs h-8 gap-1.5"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Output</span>
              </Button>
              <Button
                size="sm"
                onClick={() => setSelectedCell(null)}
                className="text-xs h-8 bg-primary text-primary-foreground"
              >
                Close Inspector
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};