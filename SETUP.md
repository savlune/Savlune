# Setup Guide

## 1. Requirements

- Node.js 20+ (built and tested on Node 22)
- npm 10+

## 2. Install

```bash
npm install
```

## 3. Environment Variables

Copy `.env.example` to `.env.local` and fill in what you have. Every variable is optional — the app
degrades gracefully without them:

| Variable | Effect if unset |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` / `SUPABASE_SERVICE_ROLE_KEY` | Leads and CSV leasing imports are written to local JSON files under `src/data/*.local.json` instead of Supabase. Fine for local dev; **not durable on serverless hosts** (Vercel's filesystem is ephemeral/read-only in production) — configure Supabase before going live. |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Falls back to the number in `src/data/locations.ts` (`6282156067048`). |
| `ADMIN_USERNAME` / `ADMIN_PASSWORD` | `/admin/login` returns a clear 503 explaining the admin panel isn't configured yet. Set both to enable it. |
| `NEXT_PUBLIC_SITE_URL` | Falls back to a placeholder URL used only for OG/canonical metadata. |

## 4. Supabase Schema (optional)

If you enable Supabase, create a `leads` table matching `src/types/lead.ts` (`LeadPayload`):

```sql
create table leads (
  id uuid primary key default gen_random_uuid(),
  type text not null,
  name text not null,
  phone text not null,
  email text,
  city text not null,
  vehicle_slug text,
  variant_id text,
  color_id text,
  need text,
  message text,
  preferred_date text,
  simulation_summary text,
  source text,
  created_at timestamptz not null default now()
);
```

`src/lib/leads/store.ts` posts directly to Supabase's REST endpoint (`/rest/v1/leads`) using the
service role key — no extra SDK dependency required. Row Level Security should stay enabled with no
public policies, since only the server (holding the service role key) ever writes.

## 5. Admin Panel

`/admin/login` is a minimal credential gate (see `.env.example`), intended for a single internal
user (the sales team), not a multi-tenant auth system. `src/middleware.ts` guards
`/admin/dashboard/*` by checking for a session cookie set by `/api/admin/login`. Replace this with a
real auth provider before handling sensitive data at scale.

## 6. Running Tests

```bash
npm test            # Vitest — financing calculator + WhatsApp message builder
npm run test:e2e     # Playwright — builds the app, boots it, and runs a homepage smoke test
```

## 7. Known Dev-Dependency Advisories

`npm audit` reports two moderate-severity advisories against a `postcss` version bundled internally
by `next` itself (build-time only, not shipped to the browser). No fix is available yet without a
breaking Next.js downgrade; re-run `npm audit` after routine dependency updates.
