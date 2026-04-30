create table public.project_requests (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  phone text,
  project_type text not null,
  budget_range text not null,
  timeline text not null,
  description text not null,
  created_at timestamptz not null default now()
);

alter table public.project_requests enable row level security;

-- Anyone can submit a request (public lead form)
create policy "Anyone can submit a project request"
  on public.project_requests
  for insert
  to anon, authenticated
  with check (
    length(full_name) between 2 and 100
    and length(email) between 3 and 255
    and email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
    and (phone is null or length(phone) <= 40)
    and project_type in ('Mobile App', 'Website', 'Both', 'Custom')
    and length(budget_range) between 1 and 80
    and length(timeline) between 1 and 80
    and length(description) between 10 and 4000
  );

-- Only authenticated users can read submitted requests
create policy "Authenticated users can view project requests"
  on public.project_requests
  for select
  to authenticated
  using (true);

create index project_requests_created_at_idx on public.project_requests (created_at desc);