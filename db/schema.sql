create table if not exists registrations (
  id             uuid primary key,
  ref            text not null unique,            -- shown to the parent, used as the transfer narration
  kind           text not null check (kind in ('kids', 'teens')),
  email          text not null,
  contact_name   text not null,                   -- parent (kids) or the teen (teens)
  contact_phone  text not null,
  guardian_name  text,                            -- teens only
  guardian_phone text,                            -- teens only
  member_status  text not null check (member_status in ('member_with_kids', 'member_no_kids', 'guest')),
  amount         integer not null,                -- naira
  status         text not null default 'pending' check (status in ('pending', 'paid')),
  code           text unique,                     -- set when an admin confirms payment
  paid_at        timestamptz,
  created_at     timestamptz not null default now()
);

create table if not exists attendees (
  id              uuid primary key default gen_random_uuid(),
  registration_id uuid not null references registrations(id) on delete cascade,
  name            text not null,
  age             integer not null check (age between 1 and 17)
);

create index if not exists attendees_registration_idx on attendees(registration_id);
create index if not exists registrations_status_idx on registrations(status, created_at desc);
