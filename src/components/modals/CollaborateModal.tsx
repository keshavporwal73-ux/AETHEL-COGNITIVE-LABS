import React, { useState } from 'react';
import { useParallax } from '@/contexts/ParallaxContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  UserPlus, 
  Link2, 
  Check, 
  Trash2, 
  X, 
  ShieldCheck, 
  MessageSquare, 
  Eye, 
  Edit3,
  Share2
} from 'lucide-react';
import { toast } from 'sonner';

export const CollaborateModal: React.FC = () => {
  const { 
    isCollabModalOpen, 
    setIsCollabModalOpen, 
    collaborators, 
    inviteCollaborator, 
    removeCollaborator,
    currentSessionId 
  } = useParallax();

  const [emailInput, setEmailInput] = useState('');
  const [roleInput, setRoleInput] = useState<'Editor' | 'Commenter' | 'Viewer'>('Commenter');
  const [copiedLink, setCopiedLink] = useState(false);

  if (!isCollabModalOpen) return null;

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim() || !emailInput.includes('@')) {
      toast.error('Please enter a valid collaborator email address');
      return;
    }
    inviteCollaborator(emailInput.trim(), roleInput);
    setEmailInput('');
  };

  const handleCopyShareLink = () => {
    const url = `${window.location.origin}/share/session/${currentSessionId}`;
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    toast.success('Public read-only session link copied to clipboard');
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-2xl animate-in fade-in zoom-in-95">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-border">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif font-bold text-base text-foreground">Collaborative Intelligence Workspace</h2>
              <p className="text-xs text-muted-foreground font-mono">Invite peers to co-analyze multi-model dossiers</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCollabModalOpen(false)}
            className="h-8 w-8 p-0 rounded-full"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Invite Form */}
        <form onSubmit={handleInvite} className="space-y-3">
          <div className="text-xs font-mono font-semibold uppercase text-muted-foreground">Invite by Email</div>
          <div className="flex gap-2">
            <Input
              type="email"
              placeholder="researcher@university.edu"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              className="text-xs h-9 bg-muted/20 border-border"
            />
            <select
              value={roleInput}
              onChange={(e: any) => setRoleInput(e.target.value)}
              className="text-xs h-9 px-2 rounded-md bg-muted/20 border border-border text-foreground font-mono"
            >
              <option value="Commenter">Commenter</option>
              <option value="Editor">Editor</option>
              <option value="Viewer">Viewer</option>
            </select>
            <Button type="submit" size="sm" className="h-9 px-3 gap-1 bg-primary text-primary-foreground font-semibold">
              <UserPlus className="w-3.5 h-3.5" />
              <span>Invite</span>
            </Button>
          </div>
        </form>

        {/* Active Members List */}
        <div className="space-y-2">
          <div className="text-xs font-mono font-semibold uppercase text-muted-foreground flex justify-between">
            <span>Active Workspace Members</span>
            <span>{collaborators.length} Members</span>
          </div>

          <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
            {collaborators.map((c) => (
              <div key={c.id} className="p-2.5 rounded-xl bg-muted/15 border border-border flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div 
                    className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold text-white shadow-sm"
                    style={{ backgroundColor: c.avatarColor }}
                  >
                    {c.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <div className="font-serif font-bold text-xs text-foreground flex items-center gap-1.5">
                      <span>{c.name}</span>
                      {c.role === 'Owner' && <Badge variant="outline" className="text-[9px] py-0 px-1 border-accent text-accent">Owner</Badge>}
                    </div>
                    <div className="text-[10px] text-muted-foreground font-mono">{c.email} · {c.lastActive}</div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-muted-foreground">{c.role}</span>
                  {c.role !== 'Owner' && (
                    <button
                      onClick={() => removeCollaborator(c.id)}
                      className="text-muted-foreground hover:text-red-500 transition-colors p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Public Share Link Bar */}
        <div className="p-3 rounded-xl bg-muted/20 border border-border space-y-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-muted-foreground flex items-center gap-1">
              <Link2 className="w-3.5 h-3.5 text-accent" /> Public Read-Only Share Link
            </span>
            <Badge variant="outline" className="text-[9px] text-emerald-500 border-emerald-500/30">
              Zero Auth Required
            </Badge>
          </div>
          <div className="flex gap-2">
            <Input
              readOnly
              value={`${window.location.origin}/share/session/${currentSessionId}`}
              className="text-[11px] h-8 font-mono bg-background text-muted-foreground border-border"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopyShareLink}
              className="h-8 px-3 text-xs gap-1 border-border bg-card"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Link2 className="w-3.5 h-3.5" />}
              <span>{copiedLink ? 'Copied' : 'Copy'}</span>
            </Button>
          </div>
        </div>

        <div className="flex justify-end pt-1">
          <Button
            size="sm"
            onClick={() => setIsCollabModalOpen(false)}
            className="text-xs h-8 bg-primary text-primary-foreground"
          >
            Done
          </Button>
        </div>
      </div>
    </div>
  );
};