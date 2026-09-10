-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Table: profiles
create table if not exists public.profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  email text,
  display_name text default 'Research Fellow',
  avatar_url text,
  default_models jsonb default '["gpt-4o", "claude-3-7-sonnet", "gemini-2.5-pro", "deepseek-r1"]'::jsonb,
  preferred_depth text default 'Balanced',
  theme text default 'dark',
  preferences jsonb default '{"autoRoute": true, "webSearch": true, "creativity": 0.7, "streamResponses": true}'::jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Table: sessions
create table if not exists public.sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid,
  title text not null default 'New Intelligence Session',
  mode text not null default 'compare',
  starred boolean default false,
  archived boolean default false,
  models_used text[] default array['gpt-4o', 'claude-3-7-sonnet', 'gemini-2.5-pro', 'deepseek-r1'],
  metadata jsonb default '{}'::jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Table: messages
create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  session_id uuid references public.sessions(id) on delete cascade,
  user_id uuid,
  role text not null check (role in ('user', 'assistant', 'system')),
  content text not null,
  mode text default 'compare',
  attachments jsonb default '[]'::jsonb,
  metadata jsonb default '{}'::jsonb,
  created_at timestamptz default now()
);

-- Table: model_runs (individual responses from each model)
create table if not exists public.model_runs (
  id uuid primary key default gen_random_uuid(),
  session_id uuid references public.sessions(id) on delete cascade,
  message_id uuid references public.messages(id) on delete set null,
  model_id text not null,
  model_name text not null,
  provider text not null,
  response_text text not null,
  reasoning_text text,
  latency_ms integer default 0,
  tokens_used integer default 0,
  cost_estimate numeric(10, 6) default 0.000000,
  confidence numeric(5, 2) default 92.00,
  evaluation jsonb default '{}'::jsonb,
  status text default 'completed',
  created_at timestamptz default now()
);

-- Table: image_generations
create table if not exists public.image_generations (
  id uuid primary key default gen_random_uuid(),
  session_id uuid references public.sessions(id) on delete cascade,
  prompt text not null,
  enhanced_prompt text,
  negative_prompt text,
  aspect_ratio text default '1:1',
  style text default 'Cinematic',
  model_id text not null,
  provider text not null,
  image_url text not null,
  visual_analysis jsonb default '{}'::jsonb,
  user_selected boolean default false,
  status text default 'completed',
  created_at timestamptz default now()
);

-- Table: debates
create table if not exists public.debates (
  id uuid primary key default gen_random_uuid(),
  session_id uuid references public.sessions(id) on delete cascade,
  proposition text not null,
  roles jsonb not null default '{}'::jsonb,
  rounds jsonb not null default '[]'::jsonb,
  verdict jsonb default '{}'::jsonb,
  status text default 'completed',
  created_at timestamptz default now()
);

-- Table: fact_checks
create table if not exists public.fact_checks (
  id uuid primary key default gen_random_uuid(),
  session_id uuid references public.sessions(id) on delete cascade,
  source_text text not null,
  claims jsonb not null default '[]'::jsonb,
  overall_verdict text default 'Mixed Evidence',
  created_at timestamptz default now()
);

-- Table: research_projects
create table if not exists public.research_projects (
  id uuid primary key default gen_random_uuid(),
  session_id uuid references public.sessions(id) on delete cascade,
  question text not null,
  plan jsonb default '[]'::jsonb,
  subquestions jsonb default '[]'::jsonb,
  findings jsonb default '[]'::jsonb,
  sources jsonb default '[]'::jsonb,
  synthesis jsonb default '{}'::jsonb,
  report_markdown text,
  created_at timestamptz default now()
);

-- Table: usage_events
create table if not exists public.usage_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid,
  model_id text not null,
  provider text not null,
  mode text not null,
  latency_ms integer default 0,
  tokens integer default 0,
  cost numeric(10, 6) default 0.000000,
  rating integer,
  created_at timestamptz default now()
);

-- Enable RLS on all tables
alter table public.profiles enable row level security;
alter table public.sessions enable row level security;
alter table public.messages enable row level security;
alter table public.model_runs enable row level security;
alter table public.image_generations enable row level security;
alter table public.debates enable row level security;
alter table public.fact_checks enable row level security;
alter table public.research_projects enable row level security;
alter table public.usage_events enable row level security;

-- Setup full permissive RLS policies for authenticated & anon (demo access)
create policy "Allow all profiles access" on public.profiles for all using (true) with check (true);
create policy "Allow all sessions access" on public.sessions for all using (true) with check (true);
create policy "Allow all messages access" on public.messages for all using (true) with check (true);
create policy "Allow all model_runs access" on public.model_runs for all using (true) with check (true);
create policy "Allow all image_generations access" on public.image_generations for all using (true) with check (true);
create policy "Allow all debates access" on public.debates for all using (true) with check (true);
create policy "Allow all fact_checks access" on public.fact_checks for all using (true) with check (true);
create policy "Allow all research_projects access" on public.research_projects for all using (true) with check (true);
create policy "Allow all usage_events access" on public.usage_events for all using (true) with check (true);
