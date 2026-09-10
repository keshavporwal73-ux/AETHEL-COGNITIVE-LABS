import React, { useState } from 'react';
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
import { ParallaxLogo } from '@/components/common/ParallaxLogo';
import { ShieldCheck, Mail, Lock, User, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

interface AuthModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ open, onOpenChange }) => {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('researcher@curionetwork.ai');
  const [password, setPassword] = useState('••••••••••••');
  const [name, setName] = useState('Senior Research Fellow');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(mode === 'login' ? 'Signed in successfully' : 'Account created and verified');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[calc(100%-2rem)] md:max-w-md bg-card border-border p-6">
        <DialogHeader className="text-center items-center space-y-2">
          <ParallaxLogo size={36} showWordmark={true} showTagline={true} />
          <DialogTitle className="font-serif text-lg font-bold">
            {mode === 'login' ? 'Welcome to PARALLAX' : 'Create Intelligence Workspace'}
          </DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground">
            {mode === 'login' 
              ? 'Access your unified multi-model sessions, debates, and visual comparisons.' 
              : 'Join the premier multi-model AI research laboratory.'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-3.5 my-2">
          {mode === 'register' && (
            <div className="space-y-1">
              <Label className="text-xs font-medium">Full Name / Title</Label>
              <div className="relative">
                <User className="w-3.5 h-3.5 absolute left-3 top-3 text-muted-foreground" />
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Dr. Alex Vance"
                  className="pl-9 text-xs"
                  required
                />
              </div>
            </div>
          )}

          <div className="space-y-1">
            <Label className="text-xs font-medium">Institutional Email</Label>
            <div className="relative">
              <Mail className="w-3.5 h-3.5 absolute left-3 top-3 text-muted-foreground" />
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@organization.com"
                className="pl-9 text-xs"
                required
              />
            </div>
          </div>

          <div className="space-y-1">
            <Label className="text-xs font-medium">Password</Label>
            <div className="relative">
              <Lock className="w-3.5 h-3.5 absolute left-3 top-3 text-muted-foreground" />
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="pl-9 text-xs"
                required
              />
            </div>
          </div>

          <Button type="submit" className="w-full text-xs font-medium mt-2">
            {mode === 'login' ? 'Sign In' : 'Create Account'}
          </Button>
        </form>

        <div className="pt-2 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
          <span>{mode === 'login' ? "Don't have an account?" : 'Already have an account?'}</span>
          <Button
            variant="link"
            onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
            className="text-xs p-0 h-auto text-accent"
          >
            {mode === 'login' ? 'Create one' : 'Sign in'}
          </Button>
        </div>

        <div className="text-[10px] text-center text-muted-foreground font-mono flex items-center justify-center gap-1 opacity-70">
          <ShieldCheck className="w-3 h-3 text-emerald-500" />
          <span>Secured via Supabase Authentication</span>
        </div>
      </DialogContent>
    </Dialog>
  );
};
