# Deployment

## Vercel (recommended)

1. Import the repository into Vercel.
2. Set environment variables from `.env.example` in the Vercel project settings (Supabase keys,
   `ADMIN_USERNAME`/`ADMIN_PASSWORD`, `NEXT_PUBLIC_WHATSAPP_NUMBER`, `NEXT_PUBLIC_SITE_URL`).
3. Build command: `npm run build`. Output: Next.js default (`.next/`) — no extra config needed.
4. **Important:** without Supabase configured, lead/CSV-import storage falls back to writing local
   JSON files, which does **not** persist on Vercel's serverless filesystem between invocations.
   Configure Supabase before relying on the site for real leads (see SETUP.md §3–4).

## Any Node Host (self-managed)

```bash
npm ci
npm run build
npm run start   # serves on $PORT, default 3000
```

Put a reverse proxy (nginx/Caddy) in front for TLS. If Supabase is not configured, mount a
persistent volume for `src/data/*.local.json` so leads survive restarts — this is a dev convenience
path, not a production-grade store; Supabase is still the recommended path for real traffic.

## Pre-Deploy Checklist

- [ ] `npm run typecheck && npm run lint && npm test` all pass.
- [ ] `npm run build` succeeds locally.
- [ ] Real vehicle assets added per `ASSET_CHECKLIST.md` (or the site is intentionally shipping with
      the honest "aset menyusul" placeholders — that's a valid choice, not a bug).
- [ ] `UNVERIFIED_FIELDS.md` reviewed — every item still open is a known gap, not an oversight.
- [ ] Supabase configured (or the local-JSON limitation above is accepted for a soft launch).
- [ ] WhatsApp number in `.env.local` / `src/data/locations.ts` confirmed correct.
- [ ] robots/sitemap: add `src/app/robots.ts` and `src/app/sitemap.ts` once `NEXT_PUBLIC_SITE_URL` is
      finalized (not included by default since the production domain isn't known yet).
