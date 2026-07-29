-- Forward-only operational support for traceable, idempotent contact delivery.
alter table public.project_requests add column if not exists public_reference text;
alter table public.project_requests add column if not exists submission_id uuid;
alter table public.project_requests add column if not exists delivery_status text not null default 'pending';
alter table public.project_requests add column if not exists provider_message_id text;
alter table public.project_requests add column if not exists email_sent_at timestamptz;
alter table public.project_requests add column if not exists delivery_error_code text;
alter table public.project_requests add column if not exists updated_at timestamptz not null default now();

do $$ begin
  alter table public.project_requests add constraint project_requests_delivery_status_check
    check (delivery_status in ('pending', 'sent', 'failed'));
exception when duplicate_object then null; end $$;

create unique index if not exists project_requests_public_reference_uidx
  on public.project_requests(public_reference) where public_reference is not null;
create unique index if not exists project_requests_submission_id_uidx
  on public.project_requests(submission_id) where submission_id is not null;
create index if not exists project_requests_delivery_status_idx
  on public.project_requests(delivery_status, created_at desc);

-- All contact persistence now goes through the service-role Edge Function.
-- Remove legacy browser policies and make database privileges explicit so this
-- remains safe when "Automatically expose new tables and functions" is off.
drop policy if exists "Anyone can submit a project request" on public.project_requests;
drop policy if exists "Authenticated users can view project requests" on public.project_requests;
revoke all on table public.project_requests from anon, authenticated;
grant select, insert, update on table public.project_requests to service_role;

create table if not exists public.contact_rate_limits (
  key_hash text primary key,
  window_started_at timestamptz not null default now(),
  request_count integer not null default 1 check (request_count > 0)
);
alter table public.contact_rate_limits enable row level security;
revoke all on table public.contact_rate_limits from public, anon, authenticated;

create or replace function public.consume_contact_rate_limit(p_key_hash text, p_limit integer default 5)
returns boolean language plpgsql security definer set search_path = public as $$
declare allowed boolean;
begin
  insert into contact_rate_limits(key_hash) values (p_key_hash)
  on conflict (key_hash) do update set
    window_started_at = case when contact_rate_limits.window_started_at < now() - interval '1 minute' then now() else contact_rate_limits.window_started_at end,
    request_count = case when contact_rate_limits.window_started_at < now() - interval '1 minute' then 1 else contact_rate_limits.request_count + 1 end
  returning request_count <= p_limit into allowed;
  return allowed;
end $$;
revoke all on function public.consume_contact_rate_limit(text, integer) from public, anon, authenticated;
grant execute on function public.consume_contact_rate_limit(text, integer) to service_role;
