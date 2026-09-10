import React from 'react';
import { useParallax } from '@/contexts/ParallaxContext';
import { WorkspaceMode } from '@/types/parallax';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Plus, 
  Search, 
  SplitSquareVertical, 
  Sparkles, 
  Swords, 
  CheckCircle2, 
  BookOpen, 
  FileSearch, 
  Image as ImageIcon, 
  BarChart3, 
  Sliders, 
  Settings, 
  Star, 
  Archive, 
  Trash2, 
  Copy, 
  Edit2, 
  MoreVertical,
  Compass,
  Zap,
  Network,
  GitCommit,
  HelpCircle,
  EyeOff,
  CheckSquare,
  SlidersHorizontal,
  ShieldAlert,
  FileText,
  Trophy,
  Grid3X3,
  Presentation,
  Radio,
  Users
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Link, useNavigate } from 'react-router-dom';

interface LeftSidebarProps {
  onOpenModelHub?: () => void;
  onOpenSettings?: () => void;
}

export const LeftSidebar: React.FC<LeftSidebarProps> = ({
  onOpenModelHub,
  onOpenSettings
}) => {
  const { 
    activeMode, 
    setActiveMode, 
    sessions, 
    currentSessionId, 
    loadSession, 
    createNewSession, 
    renameSession, 
    starSession, 
    archiveSession, 
    deleteSession, 
    duplicateSession,
    searchQuery,
    setSearchQuery
  } = useParallax();

  const navigate = useNavigate();

  const handleModeSelect = (mode: WorkspaceMode) => {
    setActiveMode(mode);
    navigate(`/app?mode=${mode}`);
  };

  const filteredSessions = sessions.filter(s => {
    if (searchQuery.trim()) {
      return s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
             s.snippet.toLowerCase().includes(searchQuery.toLowerCase());
    }
    return !s.archived;
  });

  const starredSessions = filteredSessions.filter(s => s.starred);
  const recentSessions = filteredSessions.filter(s => !s.starred);

  return (
    <aside className="w-64 h-full border-r border-border bg-sidebar/95 backdrop-blur-md text-sidebar-foreground flex flex-col shrink-0 select-none">
      {/* Top CTA: New Session */}
      <div className="p-3 border-b border-sidebar-border">
        <Button 
          onClick={() => createNewSession(activeMode)} 
          className="w-full bg-gradient-to-r from-cyan-600 to-violet-600 hover:from-cyan-500 hover:to-violet-500 text-white font-medium text-xs h-9 justify-start gap-2 shadow-[0_0_12px_rgba(6,182,212,0.25)] border border-cyan-400/20"
        >
          <Plus className="w-4 h-4" />
          <span>New Session</span>
          <span className="ml-auto font-mono text-[10px] opacity-75 border border-white/30 px-1 py-0.5 rounded">
            ⌘N
          </span>
        </Button>
      </div>

      {/* Navigation Sections */}
      <div className="p-2 space-y-3 border-b border-sidebar-border overflow-y-auto max-h-[380px]">
        {/* Intelligence Laboratory Suite */}
        <div>
          <div className="text-[10px] font-mono tracking-wider uppercase text-primary font-bold px-2 py-1 flex items-center justify-between">
            <span>Intelligence Lab</span>
            <span className="text-[9px] bg-primary/10 text-primary px-1.5 py-0.2 rounded font-mono">Core</span>
          </div>

          <div className="space-y-0.5 mt-0.5">
            <button
              onClick={() => handleModeSelect('intelligencemap')}
              className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors ${
                activeMode === 'intelligencemap' 
                  ? 'bg-sidebar-accent text-sidebar-accent-foreground font-semibold' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-sidebar-accent/50'
              }`}
            >
              <Network className="w-3.5 h-3.5 text-primary" />
              <span>Intelligence Map</span>
              <span className="ml-auto text-[10px] font-mono text-muted-foreground">Graph</span>
            </button>

            <button
              onClick={() => handleModeSelect('conflictmap')}
              className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors ${
                activeMode === 'conflictmap' 
                  ? 'bg-sidebar-accent text-sidebar-accent-foreground font-semibold' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-sidebar-accent/50'
              }`}
            >
              <GitCommit className="w-3.5 h-3.5 text-rose-400" />
              <span>Conflict Map</span>
              <span className="ml-auto text-[10px] font-mono text-muted-foreground">Disputes</span>
            </button>

            <button
              onClick={() => handleModeSelect('uncertaintymap')}
              className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors ${
                activeMode === 'uncertaintymap' 
                  ? 'bg-sidebar-accent text-sidebar-accent-foreground font-semibold' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-sidebar-accent/50'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
              <span>Uncertainty Map</span>
              <span className="ml-auto text-[10px] font-mono text-muted-foreground">Gaps</span>
            </button>

            <button
              onClick={() => handleModeSelect('blindspot')}
              className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors ${
                activeMode === 'blindspot' 
                  ? 'bg-sidebar-accent text-sidebar-accent-foreground font-semibold' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-sidebar-accent/50'
              }`}
            >
              <EyeOff className="w-3.5 h-3.5 text-purple-400" />
              <span>Blind Spots</span>
              <span className="ml-auto text-[10px] font-mono text-muted-foreground">Hidden</span>
            </button>

            <button
              onClick={() => handleModeSelect('assumptionaudit')}
              className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors ${
                activeMode === 'assumptionaudit' 
                  ? 'bg-sidebar-accent text-sidebar-accent-foreground font-semibold' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-sidebar-accent/50'
              }`}
            >
              <CheckSquare className="w-3.5 h-3.5 text-emerald-400" />
              <span>Assumption Audit</span>
              <span className="ml-auto text-[10px] font-mono text-muted-foreground">Fragility</span>
            </button>

            <button
              onClick={() => handleModeSelect('decisionlab')}
              className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors ${
                activeMode === 'decisionlab' 
                  ? 'bg-sidebar-accent text-sidebar-accent-foreground font-semibold' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-sidebar-accent/50'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-indigo-400" />
              <span>Decision Lab</span>
              <span className="ml-auto text-[10px] font-mono text-muted-foreground">Weights</span>
            </button>

            <button
              onClick={() => handleModeSelect('scenariolab')}
              className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors ${
                activeMode === 'scenariolab' 
                  ? 'bg-sidebar-accent text-sidebar-accent-foreground font-semibold' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-sidebar-accent/50'
              }`}
            >
              <Compass className="w-3.5 h-3.5 text-cyan-400" />
              <span>Scenario Lab</span>
              <span className="ml-auto text-[10px] font-mono text-muted-foreground">What-If</span>
            </button>

            <button
              onClick={() => handleModeSelect('redteam')}
              className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors ${
                activeMode === 'redteam' 
                  ? 'bg-sidebar-accent text-sidebar-accent-foreground font-semibold' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-sidebar-accent/50'
              }`}
            >
              <ShieldAlert className="w-3.5 h-3.5 text-rose-500" />
              <span>Red Team</span>
              <span className="ml-auto text-[10px] font-mono text-muted-foreground">Stress-Test</span>
            </button>

            <button
              onClick={() => handleModeSelect('intelligencereport')}
              className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors ${
                activeMode === 'intelligencereport' 
                  ? 'bg-sidebar-accent text-sidebar-accent-foreground font-semibold' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-sidebar-accent/50'
              }`}
            >
              <FileText className="w-3.5 h-3.5 text-emerald-400" />
              <span>Intelligence Report</span>
              <span className="ml-auto text-[10px] font-mono text-muted-foreground">Dossier</span>
            </button>
          </div>
        </div>

        {/* Multi-Perspective Foundation Engines */}
        <div>
          <div className="text-[10px] font-mono tracking-wider uppercase text-muted-foreground px-2 py-1">
            Perspective Engines
          </div>
          
          <div className="space-y-0.5 mt-0.5">
            <button
              onClick={() => handleModeSelect('compare')}
              className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors ${
                activeMode === 'compare' 
                  ? 'bg-sidebar-accent text-sidebar-accent-foreground font-semibold' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-sidebar-accent/50'
              }`}
            >
              <SplitSquareVertical className="w-3.5 h-3.5 text-accent" />
              <span>Compare Grid</span>
              <span className="ml-auto text-[10px] font-mono text-muted-foreground">Multi-Run</span>
            </button>

            <button
              onClick={() => handleModeSelect('synthesis')}
              className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors ${
                activeMode === 'synthesis' 
                  ? 'bg-sidebar-accent text-sidebar-accent-foreground font-semibold' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-sidebar-accent/50'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Consensus Synthesis</span>
              <span className="ml-auto text-[10px] font-mono text-muted-foreground">Verdict</span>
            </button>

            <button
              onClick={() => handleModeSelect('debate')}
              className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors ${
                activeMode === 'debate' 
                  ? 'bg-sidebar-accent text-sidebar-accent-foreground font-semibold' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-sidebar-accent/50'
              }`}
            >
              <Swords className="w-3.5 h-3.5 text-blue-500" />
              <span>Formal AI Debate</span>
              <span className="ml-auto text-[10px] font-mono text-muted-foreground">5-Role</span>
            </button>

            <button
              onClick={() => handleModeSelect('factcheck')}
              className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors ${
                activeMode === 'factcheck' 
                  ? 'bg-sidebar-accent text-sidebar-accent-foreground font-semibold' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-sidebar-accent/50'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              <span>Fact Check</span>
              <span className="ml-auto text-[10px] font-mono text-muted-foreground">Triangulate</span>
            </button>

            <button
              onClick={() => handleModeSelect('research')}
              className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors ${
                activeMode === 'research' 
                  ? 'bg-sidebar-accent text-sidebar-accent-foreground font-semibold' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-sidebar-accent/50'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-purple-500" />
              <span>Deep Research</span>
              <span className="ml-auto text-[10px] font-mono text-muted-foreground">Dossier</span>
            </button>

            <button
              onClick={() => handleModeSelect('imagelab')}
              className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors ${
                activeMode === 'imagelab' 
                  ? 'bg-sidebar-accent text-sidebar-accent-foreground font-semibold' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-sidebar-accent/50'
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5 text-pink-500" />
              <span>Image Lab</span>
              <span className="ml-auto text-[10px] font-mono text-muted-foreground">Visual Grid</span>
            </button>
          </div>
        </div>

        {/* Benchmarking & Executive Suite */}
        <div>
          <div className="text-[10px] font-mono tracking-wider uppercase text-amber-500 font-bold px-2 py-1 flex items-center justify-between">
            <span>Benchmark & Telemetry</span>
            <span className="text-[9px] bg-amber-500/10 text-amber-500 px-1.5 py-0.2 rounded font-mono">Advanced</span>
          </div>

          <div className="space-y-0.5 mt-0.5">
            <button
              onClick={() => handleModeSelect('arena')}
              className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors ${
                activeMode === 'arena' 
                  ? 'bg-sidebar-accent text-sidebar-accent-foreground font-semibold' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-sidebar-accent/50'
              }`}
            >
              <Trophy className="w-3.5 h-3.5 text-amber-500" />
              <span>Benchmark Arena</span>
              <span className="ml-auto text-[10px] font-mono text-muted-foreground">Ranks</span>
            </button>

            <button
              onClick={() => handleModeSelect('matrix')}
              className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors ${
                activeMode === 'matrix' 
                  ? 'bg-sidebar-accent text-sidebar-accent-foreground font-semibold' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-sidebar-accent/50'
              }`}
            >
              <Grid3X3 className="w-3.5 h-3.5 text-violet-400" />
              <span>Prompt Matrix</span>
              <span className="ml-auto text-[10px] font-mono text-muted-foreground">N×M Sweep</span>
            </button>

            <button
              onClick={() => handleModeSelect('briefing')}
              className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors ${
                activeMode === 'briefing' 
                  ? 'bg-sidebar-accent text-sidebar-accent-foreground font-semibold' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-sidebar-accent/50'
              }`}
            >
              <Presentation className="w-3.5 h-3.5 text-emerald-400" />
              <span>Executive Briefing</span>
              <span className="ml-auto text-[10px] font-mono text-muted-foreground">Slides</span>
            </button>

            <button
              onClick={() => handleModeSelect('telemetry')}
              className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors ${
                activeMode === 'telemetry' 
                  ? 'bg-sidebar-accent text-sidebar-accent-foreground font-semibold' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-sidebar-accent/50'
              }`}
            >
              <Radio className="w-3.5 h-3.5 text-cyan-400" />
              <span>Live Telemetry</span>
              <span className="ml-auto text-[10px] font-mono text-muted-foreground">Real-Time</span>
            </button>
          </div>
        </div>
      </div>

      {/* Session History & Search */}
      <div className="flex-1 flex flex-col min-h-0">
        <div className="p-2 border-b border-sidebar-border">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search sessions..."
              className="h-8 pl-8 text-xs bg-sidebar-accent/40 border-sidebar-border"
            />
          </div>
        </div>

        <ScrollArea className="flex-1 px-2 py-2">
          {starredSessions.length > 0 && (
            <div className="mb-3">
              <div className="text-[10px] font-mono uppercase text-muted-foreground px-2 py-1 flex items-center gap-1">
                <Star className="w-2.5 h-2.5 text-amber-500 fill-amber-500" />
                <span>Starred</span>
              </div>
              <div className="space-y-0.5">
                {starredSessions.map(sess => (
                  <SessionRow
                    key={sess.id}
                    session={sess}
                    isActive={sess.id === currentSessionId}
                    onLoad={() => loadSession(sess.id)}
                    onStar={() => starSession(sess.id)}
                    onArchive={() => archiveSession(sess.id)}
                    onDelete={() => deleteSession(sess.id)}
                    onDuplicate={() => duplicateSession(sess.id)}
                    onRename={(title) => renameSession(sess.id, title)}
                  />
                ))}
              </div>
            </div>
          )}

          <div>
            <div className="text-[10px] font-mono uppercase text-muted-foreground px-2 py-1">
              Recent Sessions
            </div>
            {recentSessions.length === 0 && (
              <div className="text-[11px] text-muted-foreground px-2 py-2 italic">
                No matching sessions
              </div>
            )}
            <div className="space-y-0.5">
              {recentSessions.map(sess => (
                <SessionRow
                  key={sess.id}
                  session={sess}
                  isActive={sess.id === currentSessionId}
                  onLoad={() => loadSession(sess.id)}
                  onStar={() => starSession(sess.id)}
                  onArchive={() => archiveSession(sess.id)}
                  onDelete={() => deleteSession(sess.id)}
                  onDuplicate={() => duplicateSession(sess.id)}
                  onRename={(title) => renameSession(sess.id, title)}
                />
              ))}
            </div>
          </div>
        </ScrollArea>
      </div>

      {/* Footer Nav Links: Dashboard, Hub, Settings & Curio Network Endorsement */}
      <div className="p-2 border-t border-sidebar-border space-y-1">
        <Link
          to="/dashboard"
          className="w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-xs text-muted-foreground hover:text-foreground hover:bg-sidebar-accent/50 transition-colors"
        >
          <BarChart3 className="w-3.5 h-3.5" />
          <span>Intelligence Dashboard</span>
        </Link>

        <button
          onClick={onOpenModelHub}
          className="w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-xs text-muted-foreground hover:text-foreground hover:bg-sidebar-accent/50 transition-colors"
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>Model Hub & APIs</span>
        </button>

        <button
          onClick={onOpenSettings}
          className="w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-xs text-muted-foreground hover:text-foreground hover:bg-sidebar-accent/50 transition-colors"
        >
          <Settings className="w-3.5 h-3.5" />
          <span>Settings & Profile</span>
        </button>

        {/* Brand Endorsement */}
        <div className="pt-2 px-2 border-t border-sidebar-border/60 flex items-center justify-between text-[10px] text-muted-foreground font-mono">
          <span>PARALLAX v2.4</span>
          <span className="opacity-80">A Curio Network product</span>
        </div>
      </div>
    </aside>
  );
};

interface SessionRowProps {
  session: any;
  isActive: boolean;
  onLoad: () => void;
  onStar: () => void;
  onArchive: () => void;
  onDelete: () => void;
  onDuplicate: () => void;
  onRename: (title: string) => void;
}

const SessionRow: React.FC<SessionRowProps> = ({
  session,
  isActive,
  onLoad,
  onStar,
  onArchive,
  onDelete,
  onDuplicate,
  onRename
}) => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [titleText, setTitleText] = React.useState(session.title);

  const handleSaveTitle = () => {
    if (titleText.trim()) {
      onRename(titleText.trim());
    }
    setIsEditing(false);
  };

  return (
    <div
      className={`group relative flex items-center justify-between px-2 py-1.5 rounded-md text-xs transition-colors cursor-pointer ${
        isActive 
          ? 'bg-sidebar-accent text-sidebar-accent-foreground font-medium' 
          : 'text-muted-foreground hover:text-foreground hover:bg-sidebar-accent/40'
      }`}
      onClick={onLoad}
    >
      <div className="flex-1 min-w-0 pr-2">
        {isEditing ? (
          <input
            type="text"
            value={titleText}
            onChange={(e) => setTitleText(e.target.value)}
            onBlur={handleSaveTitle}
            onKeyDown={(e) => { if (e.key === 'Enter') handleSaveTitle(); }}
            autoFocus
            className="w-full text-xs bg-background text-foreground px-1 py-0.5 rounded border border-border"
            onClick={(e) => e.stopPropagation()}
          />
        ) : (
          <div className="truncate font-normal">{session.title}</div>
        )}
      </div>

      <div className="flex items-center gap-0.5 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onStar}
          className="p-1 hover:text-amber-500 rounded"
          title={session.starred ? 'Unstar' : 'Star'}
        >
          <Star className={`w-3 h-3 ${session.starred ? 'text-amber-500 fill-amber-500' : ''}`} />
        </button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="p-1 hover:text-foreground rounded">
              <MoreVertical className="w-3 h-3" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="text-xs w-36">
            <DropdownMenuItem onClick={() => setIsEditing(true)}>
              <Edit2 className="w-3.5 h-3.5 mr-2" />
              Rename
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onDuplicate}>
              <Copy className="w-3.5 h-3.5 mr-2" />
              Duplicate
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onArchive}>
              <Archive className="w-3.5 h-3.5 mr-2" />
              Archive
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onDelete} className="text-destructive focus:text-destructive">
              <Trash2 className="w-3.5 h-3.5 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
