# SAVLUNE × Mitsubishi — Digital Automotive Showroom Samarinda

A premium, Next.js–based digital showroom used by Sales Consultant Mitsubishi Samarinda to present
the Mitsubishi lineup, run credit simulations, and generate qualified leads (consultation, test
drive, trade-in) that route straight to WhatsApp.

This is not an official Mitsubishi Motors Indonesia corporate website — see
[`src/app/terms/page.tsx`](src/app/terms/page.tsx) and the footer disclaimer on every page.

> The repository root also contains a legacy static `index.html` (a general property/land/car
> marketplace landing page) from an earlier iteration of the SAVLUNE brand. It is unrelated to this
> Next.js app and left untouched; the Mitsubishi showroom lives entirely under `src/`.

## Stack

Next.js 15 (App Router) · TypeScript (strict) · Tailwind CSS · Framer Motion · React Three Fiber +
drei (Three.js) · React Hook Form + Zod · Zustand · Lucide Icons · Vitest · Playwright.

## Getting Started

```bash
npm install
cp .env.example .env.local   # optional — app works with sensible fallbacks, see SETUP.md
npm run dev
```

Open http://localhost:3000.

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc --noEmit` |
| `npm test` | Vitest unit tests (financing calculator, WhatsApp message builder) |
| `npm run test:e2e` | Playwright end-to-end smoke tests |
| `npm run format` | Prettier write |

## Project Structure

```
src/
  app/                  Routes (App Router) — home, showroom, financing, compare, promo,
                         trade-in, test-drive, consultation, privacy, terms, admin, API routes
  components/
    layout/              Site-wide chrome (footer)
    navigation/           Header, mobile menu
    hero/                 Cinematic homepage hero
    showroom/             Model selector, vehicle cards, grid, detail panel, comparisons
    vehicle-3d/            React Three Fiber GLB viewer (Mode 1)
    vehicle-viewer/        VehicleExperience orchestrator, 360 image-sequence viewer (Mode 2),
                            static angle-selector fallback (Mode 3)
    financing/             DP input, calculator form, result summary, reference packages
    comparison/            Compare workspace (max 3 vehicles)
    forms/                 Lead capture form (RHF + Zod)
    sections/               Feature story chapters, quick financing, consultation
    ui/                    Design-system primitives (Button, Section, Badge, PriceDisplay)
    admin/                  CSV leasing import panel, logout button
  data/                   vehicles.ts, finance-packages.ts, promotions.ts, locations.ts
  lib/
    financing/              Amortization math (Mode A pass-through, Mode B flat-rate estimate)
    whatsapp/                WhatsApp deep-link + message builders
    validation/              Zod schemas (lead form, CSV leasing import)
    analytics/                Minimal event-tracking sink
    leads/, leasing-import/   Server-only persistence (Supabase or local JSON fallback)
    formatters/               Rupiah/number/date formatting (Intl.NumberFormat id-ID)
  types/                  Vehicle, financing, and lead type definitions
  store/                  Zustand store for cross-component showroom selection state
```

## Key Documents

- **[SETUP.md](SETUP.md)** — environment variables, Supabase vs. local-JSON lead storage, admin login.
- **[ASSET_CHECKLIST.md](ASSET_CHECKLIST.md)** — exactly which images/GLB/360-frames are still needed
  per vehicle, and where to drop them.
- **[DATA_UPDATE_GUIDE.md](DATA_UPDATE_GUIDE.md)** — how to safely edit vehicle data, prices, and
  leasing packages without touching UI components.
- **[DEPLOYMENT.md](DEPLOYMENT.md)** — deploying to Vercel or any Node host.
- **[UNVERIFIED_FIELDS.md](UNVERIFIED_FIELDS.md)** — full list of every placeholder/unconfirmed data
  point in the current seed data, and why.

## Design Principles Honored in Code

- **No invented data.** Every price, spec, color, and variant is wrapped in a `Verifiable<T>` type
  (`status: 'verified' | 'unverified' | 'unavailable'`). Nothing is shown as fact unless it carries
  `status: 'verified'`; otherwise the UI renders an honest "Hubungi sales" / "Menunggu konfirmasi"
  state instead of a guess or a blank/zero value.
- **Three viewer modes, one component.** `<VehicleExperience />` auto-selects GLB 3D → 360 image
  sequence → static photo fallback based on what's actually configured per vehicle, with graceful
  WebGL degradation and code-split, on-demand loading of the Three.js bundle.
- **Financing is estimate-labeled everywhere.** Mode A (verified leasing package) never recomputes
  the source numbers; Mode B (flexible estimate) is always labeled "Estimasi, bukan persetujuan
  kredit."
