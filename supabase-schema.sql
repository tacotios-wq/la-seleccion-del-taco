-- =============================================
-- LA SELECCION DEL TACO — Schema de base de datos
-- Pegar en Supabase Dashboard → SQL Editor → New query → Run
-- =============================================

-- PERFILES DE USUARIO (extiende auth.users)
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  nombre text not null,
  email text not null,
  telefono text default '',
  avatar_url text default '',
  created_at timestamptz default now()
);

-- VOTOS
create table public.votes (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles on delete cascade not null,
  matchup_id text not null,
  taqueria_id text not null,
  source text default 'webapp' check (source in ('webapp', 'instagram')),
  weight int default 3,
  created_at timestamptz default now(),
  unique(user_id, matchup_id)
);

-- SELLOS DEL PASAPORTE
create table public.stamps (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles on delete cascade not null,
  taqueria_id text not null,
  photo_url text not null,
  verified boolean default false,
  created_at timestamptz default now(),
  unique(user_id, taqueria_id)
);

-- DRAFT / QUINIELA
create table public.drafts (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles on delete cascade not null unique,
  picks text[] not null default '{}',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Row Level Security (RLS)
alter table public.profiles enable row level security;
alter table public.votes enable row level security;
alter table public.stamps enable row level security;
alter table public.drafts enable row level security;

-- Politicas: profiles
create policy "Profiles visible para todos" on public.profiles for select using (true);
create policy "Usuarios editan su perfil" on public.profiles for update using (auth.uid() = id);
create policy "Usuarios crean su perfil" on public.profiles for insert with check (auth.uid() = id);

-- Politicas: votes
create policy "Votos visibles para todos" on public.votes for select using (true);
create policy "Usuarios crean sus votos" on public.votes for insert with check (auth.uid() = user_id);

-- Politicas: stamps
create policy "Sellos visibles para todos" on public.stamps for select using (true);
create policy "Usuarios crean sus sellos" on public.stamps for insert with check (auth.uid() = user_id);

-- Politicas: drafts
create policy "Drafts visibles para todos" on public.drafts for select using (true);
create policy "Usuarios crean su draft" on public.drafts for insert with check (auth.uid() = user_id);
create policy "Usuarios editan su draft" on public.drafts for update using (auth.uid() = user_id);

-- Trigger: crear perfil automaticamente al registrarse
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, nombre, email)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'nombre', new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
    new.email
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Vista: conteo de votos por matchup (para consultar facil)
create or replace view public.vote_counts as
select
  matchup_id,
  taqueria_id,
  sum(weight) as total_weighted,
  count(*) as total_votes
from public.votes
group by matchup_id, taqueria_id;
