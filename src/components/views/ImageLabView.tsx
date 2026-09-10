import React, { useState } from 'react';
import { useParallax } from '@/contexts/ParallaxContext';
import { ImageGenerationResult } from '@/types/parallax';
import { getModelById, AVAILABLE_IMAGE_MODELS } from '@/services/modelCatalog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { 
  Image as ImageIcon, 
  Sparkles, 
  Wand2, 
  Download, 
  Maximize2, 
  Heart, 
  Check, 
  Layers, 
  Sliders, 
  SlidersHorizontal, 
  Upload, 
  Clock, 
  Zap, 
  Scale, 
  Eye, 
  X,
  Share2,
  RefreshCw,
  Send,
  Loader2,
  Compass
} from 'lucide-react';
import { ImageViewerModal } from '@/components/modals/ImageViewerModal';
import { toast } from 'sonner';

const PRESET_IMAGE_PROMPTS = [
  {
    label: 'Sacred Temple Sunrise',
    prompt: 'Ancient Kyoto temple at sunrise, ornate golden pagodas, misty sacred river reflections, cinematic volumetric golden lighting'
  },
  {
    label: 'Cyberpunk Neon Rain',
    prompt: 'Cyberpunk alleyway ramen shop in the rain, vibrant neon signs reflecting on wet asphalt, cinematic 35mm photography'
  },
  {
    label: 'Bioluminescent Garden',
    prompt: 'Exotic botanical garden with bioluminescent orchids and glowing spores in deep twilight, macro photography 8k'
  },
  {
    label: 'Cosmic Nebula Explorer',
    prompt: 'Futuristic astronaut in detailed EVA suit floating before a vibrant glowing cosmic nebula, visor optical reflections'
  },
  {
    label: 'Himalayan Snow Leopard',
    prompt: 'Majestic snow leopard resting on a Himalayan snowy cliff at golden hour, sharp crystalline fur textures, national geographic style'
  },
  {
    label: 'Brutalist Architecture',
    prompt: 'Minimalist brutalist concrete museum pavilion with calm reflection pool, dramatic chiaroscuro architectural photography'
  }
];

export const ImageLabView: React.FC = () => {
  const { 
    imageResults, 
    setImageResults, 
    isGenerating, 
    currentPrompt, 
    setCurrentPrompt, 
    runPrompt,
    selectedImageModelIds,
    toggleImageModel 
  } = useParallax();

  const [aspectRatio, setAspectRatio] = useState('1:1');
  const [selectedStyle, setSelectedStyle] = useState('Cinematic');
  const [negativePrompt, setNegativePrompt] = useState('blurry, low quality, distorted anatomy, text artifacts');
  const [referenceImage, setReferenceImage] = useState<string | null>(null);
  const [activeViewerImage, setActiveViewerImage] = useState<ImageGenerationResult | null>(null);
  const [selectedChoiceId, setSelectedChoiceId] = useState<string | null>(null);
  const [localPrompt, setLocalPrompt] = useState(currentPrompt || 'Ancient Indian city at sunrise, ornate golden palaces along sacred river with misty reflections and cinematic volumetric light rays');

  const handleSelectChoice = (id: string, modelName: string) => {
    setSelectedChoiceId(id);
    setImageResults(prev => prev.map(img => ({
      ...img,
      userSelected: img.id === id
    })));
    toast.success(`Selected ${modelName}'s visual render as preferred choice`);
  };

  const handleImproveImagePrompt = () => {
    const targetPrompt = localPrompt || currentPrompt;
    if (!targetPrompt.trim()) {
      toast.error('Enter an image concept first');
      return;
    }
    const enhanced = `${targetPrompt}, 8k resolution, cinematic volumetric lighting, masterwork composition, hyper-detailed textures, photorealistic materials, 35mm lens depth of field`;
    setLocalPrompt(enhanced);
    setCurrentPrompt(enhanced);
    toast.success('Prompt expanded with cinematic lighting & texture parameters');
  };

  const handleSimulateRefUpload = () => {
    const refUrl = 'https://miaoda-site-img.s3cdn.medo.dev/images/KLing_3764b348-22b4-47f4-b900-b14056e3d696.jpg';
    setReferenceImage(refUrl);
    toast.success('Reference image loaded for Image-to-Image comparison');
  };

  const handleGenerateClick = (promptOverride?: string) => {
    const promptToUse = promptOverride || localPrompt || currentPrompt;
    if (!promptToUse.trim()) {
      toast.error('Please enter an image prompt first');
      return;
    }
    setCurrentPrompt(promptToUse);
    setLocalPrompt(promptToUse);
    runPrompt(promptToUse);
  };

  // Determine grid columns
  const colClass = imageResults.length === 1
    ? 'grid-cols-1'
    : imageResults.length === 2
    ? 'grid-cols-1 md:grid-cols-2'
    : imageResults.length === 3
    ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
    : 'grid-cols-1 md:grid-cols-2 xl:grid-cols-4';

  return (
    <div className="space-y-6 pb-12">
      {/* Visual Configuration & Direct Generation Header */}
      <div className="p-4 md:p-5 rounded-2xl bg-card border border-border space-y-4 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-500 shadow-sm">
              <ImageIcon className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-serif font-bold text-base md:text-lg text-foreground">
                  Image Lab · Multi-Model Visual Generation
                </h2>
                <Badge variant="outline" className="text-[10px] font-mono border-pink-500/30 text-pink-500 bg-pink-500/5">
                  4 Frontier Engines
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground font-mono">
                Generate, inspect and benchmark renders across Kling, DALL·E 3, Flux.1 Pro, and Midjourney v6
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleImproveImagePrompt}
              className="text-xs h-8 gap-1.5 border-border bg-background hover:bg-muted"
            >
              <Wand2 className="w-3.5 h-3.5 text-purple-500" />
              <span>Expand Visual Prompt</span>
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={handleSimulateRefUpload}
              className="text-xs h-8 gap-1.5 border-border bg-background hover:bg-muted"
            >
              <Upload className="w-3.5 h-3.5 text-accent" />
              <span>{referenceImage ? 'Change Reference' : 'Image Reference'}</span>
            </Button>
          </div>
        </div>

        {/* Dedicated In-View Prompt Input Bar */}
        <div className="space-y-2 pt-1">
          <div className="flex flex-col md:flex-row items-stretch gap-2">
            <div className="relative flex-1">
              <Textarea
                value={localPrompt}
                onChange={(e) => {
                  setLocalPrompt(e.target.value);
                  setCurrentPrompt(e.target.value);
                }}
                placeholder="Describe your visual concept (e.g., 'Ancient sacred temple at sunrise with mist and golden volumetric light')..."
                className="w-full min-h-[64px] md:min-h-[56px] text-sm resize-none pr-12 rounded-xl bg-muted/20 border-border focus:ring-accent"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                    e.preventDefault();
                    handleGenerateClick();
                  }
                }}
              />
            </div>

            <Button
              onClick={() => handleGenerateClick()}
              disabled={isGenerating || !localPrompt.trim()}
              className="h-auto py-3 px-6 rounded-xl bg-primary text-primary-foreground font-semibold text-sm gap-2 shrink-0 shadow-md transition-all hover:opacity-95"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Rendering...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-accent fill-accent" />
                  <span>Generate 4 Perspectives</span>
                </>
              )}
            </Button>
          </div>

          {/* Quick Preset Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto whitespace-nowrap pt-1 pb-0.5 scrollbar-none">
            <span className="text-[10px] uppercase font-mono text-muted-foreground font-semibold flex items-center gap-1 shrink-0">
              <Compass className="w-3 h-3" />
              <span>Presets:</span>
            </span>
            {PRESET_IMAGE_PROMPTS.map((preset) => (
              <button
                key={preset.label}
                onClick={() => {
                  setLocalPrompt(preset.prompt);
                  setCurrentPrompt(preset.prompt);
                  handleGenerateClick(preset.prompt);
                }}
                disabled={isGenerating}
                className="text-[11px] px-2.5 py-1 rounded-full bg-muted/40 hover:bg-accent/15 hover:text-accent border border-border text-muted-foreground transition-colors shrink-0"
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        {/* Model Selection & Parameters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-3 border-t border-border/50 text-xs">
          {/* Active Visual Models */}
          <div className="space-y-1.5">
            <span className="text-muted-foreground font-mono text-[10px] uppercase font-semibold">Active Visual Engines</span>
            <div className="flex flex-wrap items-center gap-1.5">
              {AVAILABLE_IMAGE_MODELS.map((model) => {
                const isSelected = selectedImageModelIds.includes(model.id);
                return (
                  <button
                    key={model.id}
                    onClick={() => toggleImageModel(model.id)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-mono flex items-center gap-1.5 transition-all border ${
                      isSelected
                        ? 'bg-muted border-accent/40 text-foreground font-medium'
                        : 'bg-background border-border text-muted-foreground hover:text-foreground opacity-50'
                    }`}
                  >
                    <span 
                      className="w-2 h-2 rounded-full" 
                      style={{ backgroundColor: isSelected ? model.accentColor : 'gray' }}
                    />
                    <span>{model.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Aspect Ratio */}
          <div className="space-y-1.5">
            <span className="text-muted-foreground font-mono text-[10px] uppercase font-semibold">Aspect Ratio</span>
            <div className="flex items-center gap-1">
              {['1:1', '16:9', '9:16', '4:3'].map(ratio => (
                <button
                  key={ratio}
                  onClick={() => setAspectRatio(ratio)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all ${
                    aspectRatio === ratio
                      ? 'bg-primary text-primary-foreground font-bold shadow-sm'
                      : 'bg-muted text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {ratio}
                </button>
              ))}
            </div>
          </div>

          {/* Visual Style */}
          <div className="space-y-1.5">
            <span className="text-muted-foreground font-mono text-[10px] uppercase font-semibold">Aesthetic Profile</span>
            <div className="flex items-center gap-1 overflow-x-auto whitespace-nowrap pb-1">
              {['Cinematic', 'Photoreal', 'Editorial', 'Concept Art', 'Anime'].map(style => (
                <button
                  key={style}
                  onClick={() => setSelectedStyle(style)}
                  className={`px-2.5 py-1 rounded-lg text-xs transition-all ${
                    selectedStyle === style
                      ? 'bg-accent text-accent-foreground font-semibold shadow-sm'
                      : 'bg-muted text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {style}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Reference Image Preview if present */}
        {referenceImage && (
          <div className="flex items-center gap-2 p-2 rounded-xl bg-muted/40 border border-border">
            <img 
              src={referenceImage} 
              alt="Reference" 
              className="w-10 h-10 rounded-lg object-cover border border-border"
            />
            <div className="text-xs font-mono leading-tight flex-1 min-w-0">
              <div className="font-semibold text-foreground truncate">Conditioning Reference Image</div>
              <div className="text-[10px] text-muted-foreground">Image-to-Image Guidance Active</div>
            </div>
            <button 
              onClick={() => setReferenceImage(null)} 
              className="text-muted-foreground hover:text-foreground p-1 rounded-md"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Loading Skeleton State when Generating */}
      {isGenerating && (
        <div className={`grid ${colClass} gap-4`}>
          {selectedImageModelIds.map((modelId) => {
            const model = getModelById(modelId);
            return (
              <div key={modelId} className="rounded-2xl border border-border bg-card p-4 space-y-3 animate-pulse">
                <div className="flex items-center justify-between pb-2 border-b border-border">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-accent animate-ping" />
                    <span className="font-serif font-bold text-xs">{model?.name || 'Frontier Model'}</span>
                  </div>
                  <span className="text-[10px] font-mono text-muted-foreground">Synthesizing...</span>
                </div>
                <div className="aspect-square rounded-xl bg-muted/60 flex flex-col items-center justify-center gap-2">
                  <Loader2 className="w-8 h-8 text-accent animate-spin" />
                  <span className="text-xs font-mono text-muted-foreground">Rendering optical textures</span>
                </div>
                <div className="h-10 rounded-lg bg-muted/40" />
              </div>
            );
          })}
        </div>
      )}

      {/* Visual Comparison Grid */}
      {!isGenerating && imageResults.length > 0 && (
        <div className={`grid ${colClass} gap-4`}>
          {imageResults.map((result) => {
            const model = getModelById(result.modelId);
            const isSelectedChoice = selectedChoiceId === result.id || result.userSelected;

            return (
              <div
                key={result.id}
                className={`flex flex-col justify-between rounded-2xl border transition-all overflow-hidden bg-card ${
                  isSelectedChoice 
                    ? 'border-accent shadow-md ring-1 ring-accent' 
                    : 'border-border hover:border-border/90'
                }`}
              >
                {/* Image Card Header */}
                <div className="p-3 border-b border-border bg-muted/30 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span 
                      className="w-2.5 h-2.5 rounded-full" 
                      style={{ backgroundColor: model?.accentColor || 'hsl(var(--accent))' }}
                    />
                    <div>
                      <div className="font-serif font-bold text-xs text-foreground">
                        {result.modelName}
                      </div>
                      <div className="text-[10px] font-mono text-muted-foreground">
                        {result.provider} · {result.aspectRatio}
                      </div>
                    </div>
                  </div>

                  <Button
                    size="sm"
                    variant={isSelectedChoice ? 'default' : 'outline'}
                    onClick={() => handleSelectChoice(result.id, result.modelName)}
                    className={`h-6 px-2 text-[10px] font-semibold gap-1 ${
                      isSelectedChoice ? 'bg-accent text-accent-foreground' : 'text-muted-foreground'
                    }`}
                  >
                    <Heart className={`w-3 h-3 ${isSelectedChoice ? 'fill-current' : ''}`} />
                    <span>{isSelectedChoice ? 'My Choice' : 'Pick'}</span>
                  </Button>
                </div>

                {/* Render Image with Hover Overlay & Safe Fallback */}
                <div 
                  className="relative group aspect-square overflow-hidden bg-muted cursor-pointer"
                  onClick={() => setActiveViewerImage(result)}
                >
                  <img
                    src={result.imageUrl}
                    alt={result.prompt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      // Fallback in case of network issue
                      (e.target as HTMLImageElement).src = 'https://miaoda-site-img.s3cdn.medo.dev/images/KLing_3764b348-22b4-47f4-b900-b14056e3d696.jpg';
                    }}
                  />

                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <Button 
                      size="icon" 
                      variant="secondary" 
                      className="h-8 w-8 rounded-full shadow-lg"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveViewerImage(result);
                      }}
                    >
                      <Maximize2 className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/70 backdrop-blur-md text-white font-mono text-[9px] border border-white/20">
                    {result.latencyMs}ms
                  </div>
                </div>

                {/* Visual Quality Analysis Breakdown */}
                <div className="p-3.5 space-y-2.5 text-xs bg-muted/10 border-t border-border">
                  <div className="flex items-center justify-between font-mono text-[11px]">
                    <span className="text-muted-foreground flex items-center gap-1">
                      <Scale className="w-3 h-3 text-pink-500" />
                      <span>Visual Analysis</span>
                    </span>
                    <span className="font-bold text-foreground">
                      {result.visualAnalysis.visualQualityScore}/100 Quality
                    </span>
                  </div>

                  {/* Score Pills */}
                  <div className="grid grid-cols-2 gap-1.5 text-[10px] font-mono">
                    <div className="flex justify-between p-1 rounded bg-background border border-border">
                      <span className="text-muted-foreground">Lighting:</span>
                      <span className="font-bold">{result.visualAnalysis.lightingScore}%</span>
                    </div>
                    <div className="flex justify-between p-1 rounded bg-background border border-border">
                      <span className="text-muted-foreground">Detail:</span>
                      <span className="font-bold">{result.visualAnalysis.detailScore}%</span>
                    </div>
                    <div className="flex justify-between p-1 rounded bg-background border border-border">
                      <span className="text-muted-foreground">Composition:</span>
                      <span className="font-bold">{result.visualAnalysis.compositionScore}%</span>
                    </div>
                    <div className="flex justify-between p-1 rounded bg-background border border-border">
                      <span className="text-muted-foreground">Prompt Adherence:</span>
                      <span className="font-bold">{result.visualAnalysis.promptAdherenceScore}%</span>
                    </div>
                  </div>

                  {/* Strengths & Weaknesses */}
                  <div className="text-[10px] space-y-1 pt-1">
                    <div className="text-emerald-500 leading-tight">
                      <span className="font-semibold">Strength:</span> {result.visualAnalysis.strengths[0]}
                    </div>
                    <div className="text-amber-500 leading-tight">
                      <span className="font-semibold">Note:</span> {result.visualAnalysis.weaknesses[0]}
                    </div>
                  </div>
                </div>

                {/* Action Footer */}
                <div className="p-2 border-t border-border bg-card flex items-center justify-between text-xs">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setActiveViewerImage(result)}
                    className="h-7 px-2 text-[10px] gap-1 text-muted-foreground hover:text-foreground"
                  >
                    <Eye className="w-3 h-3" />
                    <span>Inspect</span>
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      const a = document.createElement('a');
                      a.href = result.imageUrl;
                      a.download = `parallax-${result.modelId}.jpg`;
                      a.click();
                      toast.success('Downloaded image');
                    }}
                    className="h-7 px-2 text-[10px] gap-1 text-muted-foreground hover:text-foreground"
                  >
                    <Download className="w-3 h-3" />
                    <span>Download</span>
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Empty State when no results */}
      {!isGenerating && imageResults.length === 0 && (
        <div className="text-center py-16 px-4 rounded-2xl border border-dashed border-border bg-muted/10 space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-pink-500/10 border border-pink-500/20 text-pink-500 flex items-center justify-center mx-auto">
            <ImageIcon className="w-6 h-6" />
          </div>
          <h3 className="font-serif font-bold text-base text-foreground">No Visual Renders Generated Yet</h3>
          <p className="text-xs text-muted-foreground max-w-md mx-auto">
            Type any image concept in the box above or choose a preset to generate 4 parallel perspectives across Kling, DALL·E 3, Flux.1 Pro, and Midjourney v6.
          </p>
          <Button
            onClick={() => handleGenerateClick('Ancient Kyoto temple at sunrise, ornate golden pagodas, misty sacred river reflections')}
            className="text-xs font-semibold bg-accent text-accent-foreground gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Generate Sample Visual Grid</span>
          </Button>
        </div>
      )}

      {/* Full-Screen Image Viewer Modal */}
      {activeViewerImage && (
        <ImageViewerModal
          image={activeViewerImage}
          open={!!activeViewerImage}
          onOpenChange={(open) => !open && setActiveViewerImage(null)}
          onUseAsReference={(url) => {
            setReferenceImage(url);
            setActiveViewerImage(null);
            toast.success('Set image as Image-to-Image reference');
          }}
        />
      )}
    </div>
  );
};
