import React, { useState } from 'react';
import { ImageGenerationResult } from '@/types/parallax';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Download, 
  Copy, 
  Share2, 
  Wand2, 
  Layers, 
  RotateCw, 
  Maximize2, 
  ZoomIn, 
  ZoomOut, 
  Sparkles,
  Check
} from 'lucide-react';
import { toast } from 'sonner';

interface ImageViewerModalProps {
  image: ImageGenerationResult;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUseAsReference?: (url: string) => void;
}

export const ImageViewerModal: React.FC<ImageViewerModalProps> = ({
  image,
  open,
  onOpenChange,
  onUseAsReference
}) => {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(image.imageUrl);
    setCopied(true);
    toast.success('Image URL copied to clipboard');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const a = document.createElement('a');
    a.href = image.imageUrl;
    a.download = `parallax-${image.modelId}-${Date.now()}.jpg`;
    a.click();
    toast.success('Downloading high-resolution render');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[calc(100%-2rem)] md:max-w-4xl max-h-[92dvh] overflow-y-auto bg-card border-border p-4 md:p-6">
        <DialogHeader className="flex flex-row items-center justify-between pb-2 border-b border-border">
          <div>
            <div className="flex items-center gap-2">
              <DialogTitle className="font-serif text-base md:text-lg font-bold">
                {image.modelName} Visual Inspection
              </DialogTitle>
              <Badge variant="outline" className="font-mono text-[10px]">
                {image.provider}
              </Badge>
            </div>
            <DialogDescription className="text-xs text-muted-foreground mt-0.5 truncate max-w-xl">
              "{image.prompt}"
            </DialogDescription>
          </div>

          {/* Zoom controls */}
          <div className="flex items-center gap-1 bg-muted/60 p-1 rounded-lg">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setZoomLevel(prev => Math.max(0.75, prev - 0.25))}
              className="h-7 w-7 text-muted-foreground hover:text-foreground"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </Button>
            <span className="font-mono text-[10px] px-1">{Math.round(zoomLevel * 100)}%</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setZoomLevel(prev => Math.min(2.5, prev + 0.25))}
              className="h-7 w-7 text-muted-foreground hover:text-foreground"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </Button>
          </div>
        </DialogHeader>

        {/* Large Image Preview Container */}
        <div className="relative overflow-hidden rounded-xl bg-black/80 flex items-center justify-center min-h-[340px] max-h-[520px] p-2">
          <img
            src={image.imageUrl}
            alt={image.prompt}
            style={{ transform: `scale(${zoomLevel})`, transition: 'transform 0.2s ease-out' }}
            className="max-h-[500px] w-auto object-contain rounded-lg shadow-2xl"
          />
        </div>

        {/* Visual Analysis & Strengths Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-3 rounded-xl bg-muted/20 border border-border text-xs">
          <div className="space-y-1">
            <div className="font-serif font-bold text-xs uppercase tracking-wide text-foreground">
              Aesthetic Strengths & Details
            </div>
            <ul className="space-y-1 text-muted-foreground">
              {image.visualAnalysis.strengths.map((s, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <span className="text-emerald-500 font-bold">•</span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-1">
            <div className="font-serif font-bold text-xs uppercase tracking-wide text-foreground">
              Interpretation Notes
            </div>
            <p className="text-muted-foreground leading-relaxed text-[11px]">
              {image.visualAnalysis.interpretationNotes}
            </p>
          </div>
        </div>

        {/* Dialog Actions */}
        <DialogFooter className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-border">
          <div className="flex items-center gap-1.5">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onUseAsReference?.(image.imageUrl)}
              className="text-xs h-8 gap-1.5"
            >
              <Layers className="w-3.5 h-3.5 text-accent" />
              <span>Use as Reference</span>
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => toast.success(`Generating 4 variations with ${image.modelName}`)}
              className="text-xs h-8 gap-1.5"
            >
              <RotateCw className="w-3.5 h-3.5 text-pink-500" />
              <span>Generate Variation</span>
            </Button>
          </div>

          <div className="flex items-center gap-1.5">
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopyLink}
              className="text-xs h-8 gap-1.5"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              <span>Copy Link</span>
            </Button>

            <Button
              size="sm"
              onClick={handleDownload}
              className="text-xs h-8 gap-1.5 bg-primary text-primary-foreground"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download High-Res</span>
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
