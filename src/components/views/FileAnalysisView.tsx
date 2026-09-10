import React, { useState } from 'react';
import { useParallax } from '@/contexts/ParallaxContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  FileSearch, 
  Upload, 
  FileText, 
  CheckCircle2, 
  Sparkles, 
  X, 
  Layers, 
  Scale 
} from 'lucide-react';
import { toast } from 'sonner';

export const FileAnalysisView: React.FC = () => {
  const { selectedTextModelIds, isGenerating } = useParallax();
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([
    'frontier_ai_architectures_benchmarks_2025.pdf'
  ]);
  const [analysisResult, setAnalysisResult] = useState<{
    file: string;
    summary: string;
    modelPerspectives: { model: string; keyFindings: string[]; confidence: number }[];
  } | null>({
    file: 'frontier_ai_architectures_benchmarks_2025.pdf',
    summary: 'The uploaded 42-page technical document details empirical memory bandwidth and token-latency benchmarks for heterogeneous reasoning clusters.',
    modelPerspectives: [
      {
        model: 'Claude 3.7 Sonnet',
        keyFindings: [
          'Highlights the trade-off between KV cache quantization and long-context precision loss.',
          'Emphasizes human-in-the-loop arbitration logs for compliance verification.'
        ],
        confidence: 97
      },
      {
        model: 'DeepSeek R1',
        keyFindings: [
          'Isolates algorithmic memory bottlenecks: Memory-bound workloads scale at O(N) while compute remains underutilized at 34%.',
          'Proves that speculative decoding yields 2.8x speedup on verified deterministic chains.'
        ],
        confidence: 99
      },
      {
        model: 'Gemini 2.5 Pro',
        keyFindings: [
          'Cross-references the paper’s benchmark tables against latest MLPerf 2024 results.',
          'Identifies that multi-datacenter latency introduces a 45ms tail penalty.'
        ],
        confidence: 96
      }
    ]
  });

  const handleSimulateUpload = () => {
    const mockFiles = ['quarterly_financial_audit.csv', 'legal_contract_terms.docx', 'quantum_tensor_spec.pdf'];
    const chosen = mockFiles[Math.floor(Math.random() * mockFiles.length)];
    if (!uploadedFiles.includes(chosen)) {
      setUploadedFiles(prev => [...prev, chosen]);
      toast.success(`Uploaded and indexed: ${chosen}`);
    }
  };

  return (
    <div className="space-y-6 pb-12 max-w-5xl mx-auto">
      {/* Upload Zone */}
      <div className="p-6 rounded-2xl bg-card border border-dashed border-border text-center space-y-3">
        <div className="w-10 h-10 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center text-accent mx-auto">
          <Upload className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-serif font-bold text-base text-foreground">
            Multi-Model Document & Dataset Analysis
          </h3>
          <p className="text-xs text-muted-foreground max-w-md mx-auto mt-1">
            Upload PDF, DOCX, CSV, TXT, or images to cross-examine key insights across multiple foundation models.
          </p>
        </div>

        <div className="pt-2 flex flex-wrap items-center justify-center gap-2">
          <Button size="sm" onClick={handleSimulateUpload} className="text-xs gap-1.5">
            <Upload className="w-3.5 h-3.5" />
            <span>Upload Document</span>
          </Button>
        </div>

        {/* Uploaded Files Pills */}
        {uploadedFiles.length > 0 && (
          <div className="flex flex-wrap items-center justify-center gap-2 pt-3 border-t border-border/50">
            {uploadedFiles.map(f => (
              <div key={f} className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-muted border border-border text-xs font-mono text-foreground">
                <FileText className="w-3.5 h-3.5 text-accent" />
                <span>{f}</span>
                <button onClick={() => setUploadedFiles(prev => prev.filter(item => item !== f))} className="hover:text-destructive">
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Cross-Model Analysis Result */}
      {analysisResult && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-card border border-border space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-serif font-bold text-sm text-foreground">
                <Sparkles className="w-4 h-4 text-accent" />
                <span>Document Extraction Summary</span>
              </div>
              <Badge variant="outline" className="font-mono text-xs">
                {uploadedFiles[0]}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {analysisResult.summary}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {analysisResult.modelPerspectives.map((persp) => (
              <div key={persp.model} className="p-4 rounded-2xl border border-border bg-card space-y-3 text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-border/60">
                  <span className="font-serif font-bold text-foreground text-sm">
                    {persp.model}
                  </span>
                  <Badge variant="outline" className="font-mono text-[10px] text-emerald-500">
                    {persp.confidence}% conf
                  </Badge>
                </div>

                <div className="space-y-1.5">
                  <span className="font-mono text-[10px] uppercase text-muted-foreground font-semibold">
                    Key Deductions:
                  </span>
                  <ul className="space-y-2 text-muted-foreground">
                    {persp.keyFindings.map((finding, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-accent font-bold mt-0.5">•</span>
                        <span className="leading-relaxed">{finding}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
