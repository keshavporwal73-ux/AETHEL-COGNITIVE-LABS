import React, { useState } from 'react';
import { useParallax } from '@/contexts/ParallaxContext';
import { ParallaxLogo } from '@/components/common/ParallaxLogo';
import { AethelLogo } from '@/components/common/AethelLogo';
import { FuturisticHUD } from '@/components/common/FuturisticHUD';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Sparkles, 
  Sun, 
  Moon, 
  Layers, 
  Cpu, 
  Info, 
  User, 
  SlidersHorizontal,
  Sidebar as SidebarIcon,
  ShieldCheck,
  Zap,
  Menu,
  Users
} from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Link, useLocation } from 'react-router-dom';

interface HeaderProps {
  onOpenAuth?: () => void;
  onOpenModelHub?: () => void;
  onToggleMobileNav?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  onOpenAuth, 
  onOpenModelHub,
  onToggleMobileNav
}) => {
  const { 
    activeMode, 
    isSidebarOpen, 
    setIsSidebarOpen, 
    isRightPanelOpen, 
    setIsRightPanelOpen,
    selectedTextModelIds,
    selectedImageModelIds,
    isDemoMode,
    setIsDemoMode,
    theme,
    setTheme,
    collaborators,
    setIsCollabModalOpen
  } = useParallax();

  const location = useLocation();
  const isWorkspace = location.pathname === '/app' || location.pathname === '/';

  const activeModelCount = activeMode === 'imagelab' 
    ? selectedImageModelIds.length 
    : selectedTextModelIds.length;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur-md px-3 md:px-6 h-14 flex items-center justify-between">
      {/* Left side: Brand Logo + Toggle Sidebar */}
      <div className="flex items-center gap-3">
        {isWorkspace && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="hidden md:flex text-muted-foreground hover:text-foreground h-8 w-8"
            aria-label="Toggle Navigation Sidebar"
          >
            <SidebarIcon className="w-4 h-4" />
          </Button>
        )}

        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleMobileNav}
          className="md:hidden text-muted-foreground hover:text-foreground h-8 w-8"
          aria-label="Toggle Mobile Menu"
        >
          <Menu className="w-4 h-4" />
        </Button>

        <Link to="/" className="flex items-center gap-2 group">
          <AethelLogo size={28} showWordmark={true} variant="default" isAnimated={true} />
        </Link>

        {/* Futuristic Real-Time Quantum HUD Status */}
        <div className="hidden xl:flex items-center ml-2 pl-3 border-l border-cyan-500/20">
          <FuturisticHUD activeModelsCount={activeModelCount} />
        </div>

        <div className="hidden lg:flex xl:hidden items-center ml-3 pl-3 border-l border-border/80">
          <Badge variant="outline" className="font-mono text-[11px] font-normal uppercase tracking-wider text-cyan-400 bg-cyan-950/30 border-cyan-500/30">
            {activeMode === 'imagelab' ? 'Visual Lab' : `${activeMode.toUpperCase()} Matrix`}
          </Badge>
        </div>
      </div>

      {/* Center: Interactive Mode Switcher Quick Nav */}
      <div className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full bg-muted/50 border border-border/60">
        <Link 
          to="/app?mode=intelligencemap"
          className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
            activeMode === 'intelligencemap' 
              ? 'bg-primary text-primary-foreground shadow-sm' 
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          Intelligence Map
        </Link>
        <Link 
          to="/app?mode=decisionlab"
          className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
            activeMode === 'decisionlab' 
              ? 'bg-primary text-primary-foreground shadow-sm' 
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          Decision Lab
        </Link>
        <Link 
          to="/app?mode=synthesis"
          className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
            activeMode === 'synthesis' 
              ? 'bg-card text-foreground shadow-sm border border-border' 
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          Synthesis
        </Link>
        <Link 
          to="/app?mode=compare"
          className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
            activeMode === 'compare' 
              ? 'bg-card text-foreground shadow-sm border border-border' 
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          Compare
        </Link>
        <Link 
          to="/app?mode=scenariolab"
          className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
            activeMode === 'scenariolab' 
              ? 'bg-card text-foreground shadow-sm border border-border' 
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          Scenario Lab
        </Link>
        <Link 
          to="/app?mode=redteam"
          className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
            activeMode === 'redteam' 
              ? 'bg-card text-foreground shadow-sm border border-border' 
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          Red Team
        </Link>
      </div>

      {/* Right side: Model Hub badge, DEMO switch, Theme, Inspector toggle & User profile */}
      <div className="flex items-center gap-2">
        {/* Collaborate Workspace Trigger */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsCollabModalOpen(true)}
                className="h-8 px-2.5 text-xs font-mono gap-1.5 border-border/80 bg-card hover:bg-muted"
              >
                <div className="flex -space-x-1.5 mr-0.5">
                  {collaborators.slice(0, 2).map((c, i) => (
                    <span 
                      key={c.id} 
                      className="w-4 h-4 rounded-full border border-background flex items-center justify-center text-[8px] text-white font-bold"
                      style={{ backgroundColor: c.avatarColor }}
                    >
                      {c.name.charAt(0)}
                    </span>
                  ))}
                </div>
                <span className="hidden sm:inline">Share</span>
                <span className="text-[10px] text-muted-foreground font-mono">({collaborators.length})</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              Invite collaborators & manage shared intelligence workspace
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {/* Model Selector Hub Trigger */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                onClick={onOpenModelHub}
                className="h-8 px-2.5 text-xs font-mono gap-1.5 border-border/80 bg-card hover:bg-muted"
              >
                <Cpu className="w-3.5 h-3.5 text-accent" />
                <span className="hidden sm:inline">{activeModelCount} Models</span>
                <span className="sm:hidden">{activeModelCount}</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              Configure active multi-model ensemble
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {/* DEMO Mode Badge / Toggle */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsDemoMode(!isDemoMode)}
                className={`h-7 px-2 text-[10px] font-mono tracking-wider font-semibold uppercase rounded-md border ${
                  isDemoMode 
                    ? 'bg-amber-500/10 border-amber-500/30 text-amber-500 hover:bg-amber-500/20' 
                    : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-500 hover:bg-emerald-500/20'
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${isDemoMode ? 'bg-amber-500 animate-pulse' : 'bg-emerald-500'}`} />
                {isDemoMode ? 'DEMO' : 'LIVE API'}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="max-w-xs text-xs">
              {isDemoMode 
                ? 'Running in realistic simulated intelligence mode. Click to toggle live API credentials.' 
                : 'Connected to server-side AI provider orchestration.'}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {/* Theme Toggle */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
              {theme === 'dark' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTheme('light')}>Light</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme('dark')}>Dark</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme('system')}>System</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Right Inspector Toggle (Desktop) */}
        {isWorkspace && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsRightPanelOpen(!isRightPanelOpen)}
            className="hidden xl:flex text-muted-foreground hover:text-foreground h-8 w-8"
            aria-label="Toggle Model Inspector"
          >
            <SlidersHorizontal className="w-4 h-4" />
          </Button>
        )}

        {/* User Account / Profile Button */}
        <Button
          variant="outline"
          size="sm"
          onClick={onOpenAuth}
          className="h-8 px-2.5 text-xs gap-1.5 border-border bg-card"
        >
          <User className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Fellow</span>
        </Button>
      </div>
    </header>
  );
};

export default Header;
