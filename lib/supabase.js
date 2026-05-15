import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

/*
  ── SQL para rodar no Supabase Dashboard (SQL Editor) ──────────────────────

  create table properties (
    id          bigserial primary key,
    title       text not null,
    rua         text default '',
    numero      text default '',
    city        text,
    neighborhood text,
    price       text,
    bedrooms    integer default 0,
    parking     integer default 0,
    published   boolean default false,
    images      text[] default '{}',
    description text default '',
    created_at  timestamptz default now()
  );

  -- Habilitar Row Level Security
  alter table properties enable row level security;

  -- Qualquer visitante pode ler imóveis publicados
  create policy "Leitura pública"
    on properties for select
    using (published = true);

  -- Usuário autenticado (admin) pode fazer tudo
  create policy "Admin autenticado"
    on properties for all
    using (auth.role() = 'authenticated');

  ── Admin: crie um usuário em Authentication > Users no dashboard ──────────
  Use o e-mail e senha que quiser — esses dados ficam no Supabase, não no código.
*/
