import React, { useState, useTransition } from 'react';
import { useParallax } from '@/contexts/ParallaxContext';
import { WorkspaceMode } from '@/types/parallax';
import { getModelById, AVAILABLE_TEXT_MODELS, AVAILABLE_IMAGE_MODELS } from '@/services/modelCatalog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Sparkles, 
  Send, 
  Square, 
  Paperclip, 
  Image as ImageIcon, 
  Globe, 
  SlidersHorizontal, 
  Wand2, 
  Cpu, 
  Shuffle, 
  ChevronDown, 
  Layers,
  FileText,
  X
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';

interface UniversalPromptComposerProps {
  onOpenModelHub?: () => void;
  className?: string;
}

export const UniversalPromptComposer: React.FC<UniversalPromptComposerProps> = ({
  onOpenModelHub,
  className = ''
}) => {
  const { 
    activeMode, 
    setActiveMode, 
    currentPrompt, 
    setCurrentPrompt, 
    runPrompt, 
    isGenerating, 
    improvePrompt, 
    autoRouteModels,
    selectedTextModelIds,
    toggleTextModel,
    selectedImageModelIds,
    toggleImageModel
  } = useParallax();

  const [webSearchEnabled, setWebSearchEnabled] = useState(true);
  const [responseLength, setResponseLength] = useState<'Concise' | 'Balanced' | 'Exhaustive'>('Balanced');
  const [creativity, setCreativity] = useState([70]);
  const [attachedFiles, setAttachedFiles] = useState<string[]>([]);
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);

  const selectedModels = activeMode === 'imagelab'
    ? selectedImageModelIds.map(id => getModelById(id)).filter(Boolean)
    : selectedTextModelIds.map(id => getModelById(id)).filter(Boolean);

  const [isPending, startTransition] = useTransition();

  const handleRun = () => {
    if (!currentPrompt.trim()) {
      toast.error('Please enter a question or prompt to run');
      return;
    }
    startTransition(() => {
      runPrompt(currentPrompt);
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleRun();
    }
  };

  const handleFileUpload = () => {
    const mockFiles = ['system_architecture_spec_v2.pdf', 'empirical_benchmarks_2025.csv', 'quantum_tensor_paper.docx'];
    const chosen = mockFiles[Math.floor(Math.random() * mockFiles.length)];
    if (!attachedFiles.includes(chosen)) {
      setAttachedFiles(prev => [...prev, chosen]);
      toast.success(`Attached document: ${chosen}`);
    }
  };

  const removeFile = (file: string) => {
    setAttachedFiles(prev => prev.filter(f => f !== file));
  };

  return (
    <div className={`w-full bg-card/90 backdrop-blur-md rounded-2xl border border-border shadow-md transition-all ${className}`}>
      {/* Attached Files Bar */}
      {attachedFiles.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 px-4 pt-3">
          {attachedFiles.map(file => (
            <div key={file} className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-muted text-xs font-mono text-muted-foreground border border-border">
              <FileText className="w-3.5 h-3.5 text-accent" />
              <span className="truncate max-w-[200px]">{file}</span>
              <button onClick={() => removeFile(file)} className="hover:text-foreground">
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Quick Suggestion Pills */}
      <div className="flex items-center gap-1.5 px-3 md:px-4 pt-2.5 overflow-x-auto no-scrollbar">
        <span className="text-[10px] font-mono text-muted-foreground shrink-0">Try:</span>
        {[
          'Implement lock-free queue in TypeScript',
          'Monolith vs Microservices tradeoffs',
          'Explain Quantum Quantum Decoherence',
          'Compare Claude 3.7 vs DeepSeek R1',
          'Why is Rust memory safe without GC?'
        ].map(sample => (
          <button
            key={sample}
            type="button"
            onClick={() => {
              setCurrentPrompt(sample);
              startTransition(() => {
                runPrompt(sample);
              });
            }}
            className="shrink-0 text-[10px] px-2 py-0.5 rounded-full bg-muted/60 hover:bg-muted text-muted-foreground hover:text-foreground border border-border/60 transition-colors"
          >
            {sample}
          </button>
        ))}
      </div>

      {/* Main Textarea */}
      <div className="p-3 md:p-4">
        <Textarea
          value={currentPrompt}
          onChange={(e) => setCurrentPrompt(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={
            activeMode === 'imagelab' 
              ? 'Describe the image concept to generate and compare across visual models... (e.g. "Ancient Indian city at sunrise with golden palaces and atmospheric light")' 
              : activeMode === 'debate'
              ? 'Enter a debate proposition... (e.g. "Should sovereign nations expand nuclear energy for industrial AI compute?")'
              : activeMode === 'factcheck'
              ? 'Paste text or claims to decompose, audit, and cross-verify with AI models...'
              : activeMode === 'research'
              ? 'Enter a deep research question for multi-stage AI triangulation...'
              : 'Ask PARALLAX anything to see how multiple frontier AI models reason, diverge, and synthesize...'
          }
          className="min-h-[84px] max-h-[220px] w-full resize-none bg-transparent border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-xs md:text-sm leading-relaxed p-0 placeholder:text-muted-foreground/60"
        />
      </div>

      {/* Bottom Control Bar */}
      <div className="px-3 md:px-4 pb-3 pt-1 flex flex-wrap items-center justify-between gap-2 border-t border-border/40">
        {/* Left Controls: Model Tags, Auto-Route, Improve Prompt, Attach */}
        <div className="flex flex-wrap items-center gap-1.5">
          {/* Active Model Selector Pills */}
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="sm"
              onClick={onOpenModelHub}
              className="h-7 px-2 text-[11px] font-mono gap-1 border-border bg-muted/40 hover:bg-muted"
            >
              <Cpu className="w-3 h-3 text-accent" />
              <span>{selectedModels.length} Models</span>
            </Button>
          </div>

          {/* Smart Route */}
          <Button
            variant="ghost"
            size="sm"
            onClick={autoRouteModels}
            title="Automatically detect query domain and select best models"
            className="h-7 px-2 text-[11px] text-muted-foreground hover:text-foreground gap-1"
          >
            <Shuffle className="w-3 h-3 text-amber-500" />
            <span className="hidden sm:inline">Auto Route</span>
          </Button>

          {/* Improve Prompt */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => improvePrompt(activeMode === 'imagelab' ? 'image' : 'text')}
            title="Expand prompt with nuanced analytical framing & parameters"
            className="h-7 px-2 text-[11px] text-muted-foreground hover:text-foreground gap-1"
          >
            <Wand2 className="w-3 h-3 text-purple-500" />
            <span className="hidden sm:inline">Improve Prompt</span>
          </Button>

          {/* Web Research Toggle */}
          <button
            onClick={() => {
              setWebSearchEnabled(!webSearchEnabled);
              toast.info(webSearchEnabled ? 'Web research disabled' : 'Live web research enabled');
            }}
            className={`h-7 px-2 rounded-md flex items-center gap-1 text-[11px] transition-colors border ${
              webSearchEnabled 
                ? 'bg-blue-500/10 text-blue-500 border-blue-500/30' 
                : 'bg-transparent text-muted-foreground border-transparent hover:bg-muted'
            }`}
            title="Toggle Live Web Grounding"
          >
            <Globe className="w-3 h-3" />
            <span className="hidden sm:inline">Web Grounding</span>
          </button>

          {/* Attach Document / Image */}
          <Button
            variant="ghost"
            size="icon"
            onClick={handleFileUpload}
            title="Attach file for multi-model document analysis"
            className="h-7 w-7 text-muted-foreground hover:text-foreground"
          >
            <Paperclip className="w-3.5 h-3.5" />
          </Button>

          {/* Advanced Controls Popover */}
          <Popover open={isAdvancedOpen} onOpenChange={setIsAdvancedOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 text-muted-foreground hover:text-foreground"
                title="Advanced generation parameters"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-72 p-3 text-xs space-y-3 bg-card border-border" align="start">
              <div className="font-semibold text-xs pb-1 border-b border-border">
                Advanced Generation Settings
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-muted-foreground">
                  <span>Creativity Temperature:</span>
                  <span className="font-mono text-foreground font-semibold">{(creativity[0] / 100).toFixed(2)}</span>
                </div>
                <Slider
                  value={creativity}
                  onValueChange={setCreativity}
                  max={100}
                  step={5}
                  className="py-1"
                />
              </div>

              <div className="space-y-1.5">
                <div className="text-muted-foreground">Target Response Depth:</div>
                <div className="grid grid-cols-3 gap-1">
                  {(['Concise', 'Balanced', 'Exhaustive'] as const).map(len => (
                    <Button
                      key={len}
                      type="button"
                      size="sm"
                      variant={responseLength === len ? 'default' : 'outline'}
                      onClick={() => setResponseLength(len)}
                      className="text-[10px] h-6 px-1"
                    >
                      {len}
                    </Button>
                  ))}
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        {/* Right Action: Run / Stop Button */}
        <div className="flex items-center gap-1.5 ml-auto">
          {isGenerating ? (
            <Button
              size="sm"
              variant="destructive"
              onClick={() => toast.info('Execution halted')}
              className="h-8 px-3 text-xs gap-1.5"
            >
              <Square className="w-3.5 h-3.5 fill-current" />
              <span>Stop</span>
            </Button>
          ) : (
            <Button
              size="sm"
              onClick={handleRun}
              className="h-8 px-3.5 text-xs font-semibold gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Run All</span>
              <span className="hidden md:inline text-[10px] opacity-70 font-mono ml-0.5">⌘↵</span>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
