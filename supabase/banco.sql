-- =====================================================================
--  BANCO DE DADOS DO CONVITE "CAROL 31"
--
--  Como usar (detalhes no README.md, passo 2):
--  1. ANTES de rodar, troque a senha do admin no FINAL deste arquivo
--     (procure por TROQUE-ESTA-SENHA).
--  2. No Supabase, abra "SQL Editor", cole TUDO e clique em "Run".
--
--  Pode rodar de novo sem perder dados (por exemplo, só para trocar a senha).
--
--  Segurança: as tabelas ficam fechadas para o público. O site só consegue
--  usar as funções abaixo, que validam os dados, limitam spam por IP e
--  nunca devolvem a lista de convidados sem a senha do admin.
-- =====================================================================

create extension if not exists pgcrypto with schema extensions;

-- ---------- Tabelas ----------
create table if not exists public.confirmacoes (
  id         bigint generated always as identity primary key,
  nome       text        not null check (char_length(nome) between 2 and 80),
  pessoas    smallint    not null check (pessoas between 0 and 4),
  acompanhantes text              check (char_length(acompanhantes) <= 300),
  recado     text                 check (char_length(recado) <= 500),
  vai        boolean     not null,
  criado_em  timestamptz not null default now()
);
-- Para bancos criados antes do campo "acompanhantes" existir
alter table public.confirmacoes add column if not exists acompanhantes text
  check (char_length(acompanhantes) <= 300);

create table if not exists public.presentes_escolhidos (
  presente_id  text        primary key,          -- a chave primária impede escolha dupla
  codigo_hash  text        not null,             -- só quem tem o código pode desfazer
  escolhido_em timestamptz not null default now()
);

create table if not exists public.tentativas (
  id        bigint generated always as identity primary key,
  acao      text        not null,
  ip_hash   text        not null,
  criado_em timestamptz not null default now()
);
create index if not exists tentativas_busca on public.tentativas (acao, ip_hash, criado_em);

create table if not exists public.admin_config (
  id         smallint primary key default 1 check (id = 1),
  senha_hash text not null
);

-- Ninguém de fora lê ou escreve direto nas tabelas
alter table public.confirmacoes         enable row level security;
alter table public.presentes_escolhidos enable row level security;
alter table public.tentativas           enable row level security;
alter table public.admin_config         enable row level security;
revoke all on public.confirmacoes, public.presentes_escolhidos, public.tentativas, public.admin_config
  from anon, authenticated;

-- ---------- Funções internas ----------

-- Identifica o visitante pelo IP (guardado só como código embaralhado)
create or replace function public._ip_hash()
returns text
language plpgsql stable
set search_path = public, extensions
as $$
declare
  h  json := nullif(current_setting('request.headers', true), '')::json;
  ip text;
begin
  ip := coalesce(
    nullif(btrim(h ->> 'cf-connecting-ip'), ''),
    nullif(btrim(split_part(h ->> 'x-forwarded-for', ',', 1)), ''),
    nullif(btrim(h ->> 'x-real-ip'), ''),
    'sem-ip');
  return encode(extensions.digest(ip, 'sha256'), 'hex');
end $$;

-- Limite de tentativas por IP dentro de uma janela de tempo
create or replace function public._limitar(p_acao text, p_max int, p_janela interval)
returns void
language plpgsql security definer
set search_path = public, extensions
as $$
declare
  v_ip  text := public._ip_hash();
  v_qtd int;
begin
  delete from public.tentativas where criado_em < now() - interval '1 day';
  select count(*) into v_qtd from public.tentativas
   where acao = p_acao and ip_hash = v_ip and criado_em > now() - p_janela;
  if v_qtd >= p_max then
    raise exception 'LIMITE';
  end if;
  insert into public.tentativas (acao, ip_hash) values (p_acao, v_ip);
end $$;

-- Confere a senha do admin (com limite contra quem tenta adivinhar)
create or replace function public._admin_ok(p_senha text)
returns text
language plpgsql security definer
set search_path = public, extensions
as $$
declare
  v_hash text;
begin
  perform public._limitar('admin', 20, interval '15 minutes');
  select senha_hash into v_hash from public.admin_config where id = 1;
  if v_hash is null or extensions.crypt(coalesce(p_senha, ''), v_hash) <> v_hash then
    return 'SENHA';
  end if;
  if p_senha = 'TROQUE-ESTA-SENHA' then
    return 'TROCAR';
  end if;
  return 'OK';
end $$;

revoke execute on function public._ip_hash()                    from public, anon, authenticated;
revoke execute on function public._limitar(text, int, interval) from public, anon, authenticated;
revoke execute on function public._admin_ok(text)               from public, anon, authenticated;

-- ---------- Funções usadas pelo site ----------

-- Confirmação de presença
drop function if exists public.confirmar_presenca(text, int, text, boolean, text);
create or replace function public.confirmar_presenca(
  p_nome text, p_pessoas int, p_recado text, p_vai boolean, p_armadilha text default '',
  p_acompanhantes text default ''
)
returns json
language plpgsql security definer
set search_path = public, extensions
as $$
declare
  v_nome   text := btrim(regexp_replace(coalesce(p_nome, ''), '\s+', ' ', 'g'));
  v_recado text := nullif(btrim(coalesce(p_recado, '')), '');
  v_acomp  text := nullif(btrim(regexp_replace(coalesce(p_acompanhantes, ''), '\s+', ' ', 'g')), '');
begin
  -- Campo invisível preenchido = robô. Finge que deu certo e não salva.
  if coalesce(p_armadilha, '') <> '' then
    return json_build_object('ok', true);
  end if;

  perform public._limitar('confirmar', 6, interval '10 minutes');
  if (select count(*) from public.confirmacoes where criado_em > now() - interval '1 minute') >= 30 then
    raise exception 'LIMITE';
  end if;

  if char_length(v_nome) < 2 or char_length(v_nome) > 80 then raise exception 'NOME'; end if;
  if p_vai is null then raise exception 'INVALIDO'; end if;
  if p_vai and (p_pessoas is null or p_pessoas < 1 or p_pessoas > 4) then raise exception 'PESSOAS'; end if;
  if v_recado is not null and char_length(v_recado) > 500 then raise exception 'RECADO'; end if;
  if not p_vai or p_pessoas < 2 then v_acomp := null; end if;
  if p_vai and p_pessoas >= 2 and (v_acomp is null or char_length(v_acomp) < 2 or char_length(v_acomp) > 300) then
    raise exception 'ACOMPANHANTES';
  end if;

  insert into public.confirmacoes (nome, pessoas, acompanhantes, recado, vai)
  values (v_nome, case when p_vai then p_pessoas else 0 end, v_acomp, v_recado, p_vai);

  return json_build_object('ok', true);
end $$;

-- Quais presentes já foram escolhidos (só os ids, sem dados de ninguém)
create or replace function public.presentes_status()
returns json
language sql stable security definer
set search_path = public
as $$
  select coalesce(json_agg(presente_id order by presente_id), '[]'::json) from public.presentes_escolhidos;
$$;

-- Marcar "Vou dar este". Se duas pessoas clicarem juntas, só a primeira consegue.
create or replace function public.escolher_presente(p_id text, p_codigo text)
returns json
language plpgsql security definer
set search_path = public, extensions
as $$
begin
  if p_id is null or p_id !~ '^[a-z0-9-]{1,60}$'
     or char_length(coalesce(p_codigo, '')) not between 16 and 100 then
    raise exception 'INVALIDO';
  end if;
  perform public._limitar('presente', 30, interval '10 minutes');
  if (select count(*) from public.presentes_escolhidos) >= 300 then
    raise exception 'LIMITE';
  end if;

  insert into public.presentes_escolhidos (presente_id, codigo_hash)
  values (p_id, encode(extensions.digest(p_codigo, 'sha256'), 'hex'))
  on conflict (presente_id) do nothing;

  return json_build_object('ok', found);
end $$;

-- Desfazer: só funciona com o código guardado no navegador de quem marcou
create or replace function public.desfazer_presente(p_id text, p_codigo text)
returns json
language plpgsql security definer
set search_path = public, extensions
as $$
begin
  perform public._limitar('presente', 30, interval '10 minutes');
  delete from public.presentes_escolhidos
   where presente_id = p_id
     and codigo_hash = encode(extensions.digest(coalesce(p_codigo, ''), 'sha256'), 'hex');
  return json_build_object('ok', found);
end $$;

-- ---------- Funções do /admin (exigem senha) ----------

create or replace function public.admin_dados(p_senha text)
returns json
language plpgsql security definer
set search_path = public, extensions
as $$
declare
  v text := public._admin_ok(p_senha);
begin
  if v <> 'OK' then
    return json_build_object('ok', false, 'erro', v);
  end if;
  return json_build_object(
    'ok', true,
    'confirmacoes', coalesce((
      select json_agg(c order by c.criado_em desc)
        from (select nome, pessoas, acompanhantes, recado, vai, criado_em from public.confirmacoes) c
    ), '[]'::json),
    'presentes', coalesce((
      select json_agg(p order by p.escolhido_em)
        from (select presente_id, escolhido_em from public.presentes_escolhidos) p
    ), '[]'::json)
  );
end $$;

create or replace function public.admin_liberar_presente(p_senha text, p_id text)
returns json
language plpgsql security definer
set search_path = public, extensions
as $$
declare
  v text := public._admin_ok(p_senha);
begin
  if v <> 'OK' then
    return json_build_object('ok', false, 'erro', v);
  end if;
  delete from public.presentes_escolhidos where presente_id = p_id;
  return json_build_object('ok', true);
end $$;

grant execute on function public.confirmar_presenca(text, int, text, boolean, text, text) to anon, authenticated;
grant execute on function public.presentes_status()                                to anon, authenticated;
grant execute on function public.escolher_presente(text, text)                     to anon, authenticated;
grant execute on function public.desfazer_presente(text, text)                     to anon, authenticated;
grant execute on function public.admin_dados(text)                                 to anon, authenticated;
grant execute on function public.admin_liberar_presente(text, text)                to anon, authenticated;

-- =====================================================================
--  SENHA DO ADMIN
--  Troque TROQUE-ESTA-SENHA pela sua senha (mantenha as aspas simples).
--  Use pelo menos 10 caracteres. Para trocar depois, edite e rode só
--  este bloco de novo.
-- =====================================================================
insert into public.admin_config (id, senha_hash)
values (1, extensions.crypt('TROQUE-ESTA-SENHA', extensions.gen_salt('bf')))
on conflict (id) do update set senha_hash = excluded.senha_hash;
