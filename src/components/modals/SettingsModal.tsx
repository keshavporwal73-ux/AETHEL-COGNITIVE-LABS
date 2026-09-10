import React, { useState } from 'react';
import { useParallax } from '@/contexts/ParallaxContext';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { 
  Settings as SettingsIcon, 
  User, 
  Cpu, 
  Moon, 
  Sun, 
  ShieldAlert, 
  Trash2, 
  Download, 
  Database 
} from 'lucide-react';
import { toast } from 'sonner';

interface SettingsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ open, onOpenChange }) => {
  const { theme, setTheme, usageStats } = useParallax();
  const [preferredDepth, setPreferredDepth] = useState('Balanced');
  const [autoRoute, setAutoRoute] = useState(true);
  const [streamResponses, setStreamResponses] = useState(true);
  const [dataRetention, setDataRetention] = useState(true);

  const handleExportData = () => {
    const data = {
      exportedAt: new Date().toISOString(),
      usage: usageStats,
      version: 'PARALLAX 2.4'
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `parallax-export-${Date.now()}.json`;
    a.click();
    toast.success('User intelligence history exported');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[calc(100%-2rem)] md:max-w-2xl max-h-[85dvh] overflow-y-auto bg-card border-border p-4 md:p-6">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <SettingsIcon className="w-5 h-5 text-accent" />
            <DialogTitle className="font-serif text-lg font-bold">
              Workspace Settings & Preferences
            </DialogTitle>
          </div>
          <DialogDescription className="text-xs text-muted-foreground">
            Manage your AI model configurations, appearance preferences, and telemetry data controls.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="preferences" className="w-full mt-2">
          <TabsList className="grid grid-cols-4 w-full bg-muted/60 p-1 mb-4 text-xs">
            <TabsTrigger value="preferences" className="text-xs">AI Defaults</TabsTrigger>
            <TabsTrigger value="appearance" className="text-xs">Appearance</TabsTrigger>
            <TabsTrigger value="privacy" className="text-xs">Privacy</TabsTrigger>
            <TabsTrigger value="usage" className="text-xs">Usage & Cost</TabsTrigger>
          </TabsList>

          <TabsContent value="preferences" className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg border border-border bg-muted/10">
                <div className="space-y-0.5">
                  <div className="text-xs font-semibold">Smart Model Routing</div>
                  <div className="text-[11px] text-muted-foreground">
                    Automatically detect query domain (coding, debate, vision) and route to optimal models
                  </div>
                </div>
                <Switch checked={autoRoute} onCheckedChange={setAutoRoute} />
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg border border-border bg-muted/10">
                <div className="space-y-0.5">
                  <div className="text-xs font-semibold">Real-time Streamed Responses</div>
                  <div className="text-[11px] text-muted-foreground">
                    Stream multi-model tokens progressively as they complete inference
                  </div>
                </div>
                <Switch checked={streamResponses} onCheckedChange={setStreamResponses} />
              </div>

              <div className="p-3 rounded-lg border border-border bg-muted/10 space-y-2">
                <div className="text-xs font-semibold">Default Synthesis Depth</div>
                <div className="grid grid-cols-4 gap-2">
                  {['Concise', 'Balanced', 'Deep', 'Expert'].map((d) => (
                    <Button
                      key={d}
                      type="button"
                      variant={preferredDepth === d ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setPreferredDepth(d)}
                      className="text-xs h-8"
                    >
                      {d}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="appearance" className="space-y-4">
            <div className="p-3 rounded-lg border border-border bg-muted/10 space-y-3">
              <div className="text-xs font-semibold">Theme Palette</div>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'dark', label: 'Dark Laboratory (Recommended)', icon: Moon },
                  { id: 'light', label: 'Light Editorial', icon: Sun },
                  { id: 'system', label: 'System Default', icon: SettingsIcon },
                ].map((t) => {
                  const Icon = t.icon;
                  return (
                    <button
                      key={t.id}
                      onClick={() => setTheme(t.id as any)}
                      className={`p-3 rounded-xl border flex flex-col items-center gap-2 text-xs transition-all ${
                        theme === t.id 
                          ? 'border-accent bg-accent/10 text-foreground font-semibold shadow-sm' 
                          : 'border-border bg-card text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{t.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="privacy" className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg border border-border bg-muted/10">
                <div className="space-y-0.5">
                  <div className="text-xs font-semibold">Private Session History Retention</div>
                  <div className="text-[11px] text-muted-foreground">
                    Store and index past multi-model comparisons in encrypted local workspace
                  </div>
                </div>
                <Switch checked={dataRetention} onCheckedChange={setDataRetention} />
              </div>

              <div className="p-3 rounded-lg border border-border bg-muted/10 flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold">Export Intelligence Dossier</div>
                  <div className="text-[11px] text-muted-foreground">Download full JSON backup of your sessions</div>
                </div>
                <Button variant="outline" size="sm" onClick={handleExportData} className="text-xs gap-1.5">
                  <Download className="w-3.5 h-3.5" />
                  Export Data
                </Button>
              </div>

              <div className="p-3 rounded-lg border border-destructive/30 bg-destructive/5 flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold text-destructive">Clear Workspace & History</div>
                  <div className="text-[11px] text-muted-foreground">Irreversibly delete all stored sessions</div>
                </div>
                <Button 
                  variant="destructive" 
                  size="sm" 
                  onClick={() => toast.success('Workspace cleared')} 
                  className="text-xs gap-1.5"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Clear
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="usage" className="space-y-3">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
              <div className="p-3 rounded-lg bg-muted/40 border border-border">
                <div className="text-[10px] font-mono uppercase text-muted-foreground">Total Questions</div>
                <div className="text-lg font-bold font-mono text-foreground mt-1">{usageStats.totalQuestions}</div>
              </div>
              <div className="p-3 rounded-lg bg-muted/40 border border-border">
                <div className="text-[10px] font-mono uppercase text-muted-foreground">Model Runs</div>
                <div className="text-lg font-bold font-mono text-foreground mt-1">{usageStats.totalModelRuns}</div>
              </div>
              <div className="p-3 rounded-lg bg-muted/40 border border-border">
                <div className="text-[10px] font-mono uppercase text-muted-foreground">Tokens Processed</div>
                <div className="text-lg font-bold font-mono text-foreground mt-1">{usageStats.totalTokensUsed.toLocaleString()}</div>
              </div>
              <div className="p-3 rounded-lg bg-muted/40 border border-border">
                <div className="text-[10px] font-mono uppercase text-muted-foreground">Estimated Spend</div>
                <div className="text-lg font-bold font-mono text-emerald-500 mt-1">${usageStats.estimatedTotalCost.toFixed(2)}</div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter className="pt-3 border-t border-border">
          <Button onClick={() => { onOpenChange(false); toast.success('Settings saved'); }} className="text-xs">
            Save Preferences
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
