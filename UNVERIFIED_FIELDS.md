# Unverified / Placeholder Fields

This file tracks every data point in the current seed data that is **not** backed by a confirmed
source, per the project rule: never invent specs, prices, colors, variants, or feature copy.

## Why This List Exists

A live fetch of `mitsubishi-motors.co.id` was attempted while building the initial catalog
(`src/data/vehicles.ts`) to source real specs. Every request returned **HTTP 403 (bot protection)**,
so no live data could be pulled. Everything below was therefore left as an honest placeholder rather
than guessed.

## Vehicle Catalog (`src/data/vehicles.ts`)

All 8 models (Destinator, Xforce, Pajero Sport, Xpander Cross, Xpander, Triton, L100 EV, L300):

| Field | Status | Note |
| --- | --- | --- |
| `startingPrice` | `unavailable` | No confirmed OTR Samarinda price for any model. UI shows "Hubungi sales untuk harga OTR Samarinda terbaru." |
| `variants[].price` | `unavailable` | Destinator's four variant slots (GLS, Exceed, Ultimate, Ultimate Premium) are structurally present per the brief, but carry no price. |
| `seats`, `fuelType` (except L100 EV), `transmission`, `engine`, `groundClearance` | `unavailable` / `null` | No confirmed spec sheet data. |
| `colors` | Empty | No confirmed official color names/hex codes. |
| `gallery` | Empty | No official photography supplied yet — see `ASSET_CHECKLIST.md`. |
| `highlights` | Empty | No confirmed feature copy for any of the 5 story chapters (Presence/Comfort/Technology/Confidence/Ownership). |
| `specifications` | Empty | No confirmed dimensions/engine/safety spec groups. |
| `brochures` | Empty | No official brochure PDFs supplied yet. |
| `heroImage` | Generated placeholder SVG | `public/vehicles/<slug>/hero-placeholder.svg` — a neutral studio-backdrop graphic labeled "FOTO RESMI KENDARAAN MENYUSUL", not a photo or a drawn car shape. |
| `tagline`, `shortDescription`, `longDescription` | Generic placeholder copy | Deliberately non-specific (states only the public category/name), pending marketing-approved copy from Mitsubishi Motors Indonesia / SAVLUNE. |
| `viewer` | `mode: 'static'`, all arrays empty | No GLB model or 360 frame sequence exists yet for any vehicle; the viewer correctly falls back to Mode 3 and shows "Pratinjau 360 akan tersedia setelah aset kendaraan ditambahkan." |

## Financing Reference Data (`src/data/finance-packages.ts`)

- **Maybank Finance — 3 entries (36/48/60-month tenors):** `verifiedFromScreenshot: true`,
  `needsVehicleMapping: true`. Transcribed directly from a leasing quotation screenshot supplied by
  the site owner (OTR Rp285.500.000, ADDM scheme). Numbers are real and unaltered, but **not** tied
  to a specific Mitsubishi model/variant yet — do not surface them as "the Destinator's payment plan"
  or similar until confirmed.
- **Mandiri Utama Finance:** Referenced via a screenshot too low-resolution to transcribe reliably.
  Per the "never guess numbers" rule, **no entries were created**. `draftLeasingImports` in the same
  file starts empty; use the admin CSV import flow (`/admin/dashboard`) once the real figures are
  available — see `DATA_UPDATE_GUIDE.md`.

## Promotions (`src/data/promotions.ts`)

Empty by design — no promo copy or validity dates have been confirmed. `/promo` shows an honest
empty state rather than a placeholder card.

## Financing Calculator Interest Rate (Mode B)

The "flexible estimate" calculator (`src/lib/financing/calculator.ts`,
`src/components/financing/calculator-form.tsx`) defaults its "suku bunga estimasi" field to a
round **5%/year** starting value, editable by the user before calculating. This is a UI convenience
default for an input the spec explicitly designates as user-adjustable — it is not presented anywhere
as a confirmed Mitsubishi/leasing rate, and every result carries the "Estimasi, bukan persetujuan
kredit" disclaimer.

## Brand Assets

- `public/brands/` is currently empty. The SAVLUNE wordmark is rendered as styled text (no logo file
  supplied). The Mitsubishi Motors logo is **not** rendered anywhere in the current build — no
  official logo file was supplied, and per project rules no logo may be redrawn or approximated.
  Add the official files per `ASSET_CHECKLIST.md` before launch.

## What Is Confirmed / Real

- Model names and categories (Destinator/Xforce/Pajero Sport/Xpander Cross/Xpander/Triton/L100
  EV/L300, mapped to SUV/MPV/Pickup/Kendaraan Niaga/Kendaraan Listrik) — public Mitsubishi Indonesia
  lineup facts, not vendor-confirmed pricing/specs.
- WhatsApp number (`6282156067048`) and sales consultant name (Luthfi) — as supplied directly by the
  site owner.
- The three Maybank Finance figures above (OTR/tenor/installment/first-payment numbers only, not
  their vehicle mapping).
