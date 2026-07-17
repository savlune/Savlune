# Asset Checklist

Every vehicle currently ships with a generated placeholder hero image
(`public/vehicles/<slug>/hero-placeholder.svg`) and empty galleries/colors/viewer config. Nothing in
the UI pretends these are real photos — the 360 viewer explicitly shows "Pratinjau 360 akan tersedia
setelah aset kendaraan ditambahkan" until real assets are wired in.

## Per-Vehicle Checklist

For each of the 8 models (`destinator`, `xforce`, `pajero-sport`, `xpander-cross`, `xpander`,
`triton`, `l100-ev`, `l300`), collect and add:

- [ ] **Hero image** — official 3/4-front studio shot → `public/vehicles/<slug>/hero.jpg` (or .webp),
      then update `heroImage` in `src/data/vehicles.ts`.
- [ ] **Gallery photos** — front, side, rear, interior, dashboard, trunk → `public/vehicles/<slug>/gallery/`,
      referenced in the vehicle's `gallery: VehicleImage[]` with the matching `angle`.
- [ ] **Colors** — official color names + hex codes from Mitsubishi Motors Indonesia materials →
      `colors: VehicleColor[]`, each with `status: 'verified'` and a `source`.
- [ ] **One of the three viewer modes:**
  - **Mode 1 (preferred) — GLB/GLTF 3D model.** Drop at `public/models/<slug>.glb` (Draco/Meshopt
    compressed if possible), set `viewer.mode = '3d'` and `viewer.modelPath`. Material names used
    for color-swapping must be set on `VehicleColor.materialName` to match the GLB's material name.
  - **Mode 2 — 360 image sequence.** 36/48/72 frames named `frame-00.webp` … `frame-NN.webp` under
    `public/vehicles/<slug>/360/`, set `viewer.mode = 'sequence'`, `viewer.framePattern`, and
    `viewer.frameCount`.
  - **Mode 3 (current default) — static fallback.** Already works once `gallery`/`fallbackImages`
    are populated; no code changes needed.
- [ ] **Brochure PDF** — official spec sheet → `public/brochures/<slug>.pdf`, added to `brochures`.

## Brand Assets

- [ ] **SAVLUNE logo** (large-format, for header/hero) → `public/brands/savlune-logo.svg`.
- [ ] **Mitsubishi Motors logo** — use only the official file(s) supplied by the site owner, unmodified
      (no re-drawing, skewing, recoloring, or stretching) → `public/brands/mitsubishi-logo.svg`.
      Do not commit a logo sourced any other way.

## Destinator (Priority Vehicle)

Per the master brief, Destinator gets the most complete build-out once assets land:

- [ ] Dark studio hero with realistic body reflection + premium ground plane.
- [ ] Interior gallery set (separate from exterior).
- [ ] Hotspots on grille, lights, wheels, camera, cabin, screen, and cargo area — only once both the
      3D asset **and** the underlying feature copy are confirmed (`viewer.hotspots`, `Vehicle.highlights`).
- [ ] Variant-specific pricing for GLS / Exceed / Ultimate / Ultimate Premium.

## Do Not

- Do not substitute stock photos of unrelated vehicles.
- Do not fabricate a 3D body kit, grille, lights, wheels, or badge that doesn't exist on the real car.
- Do not mark any `Verifiable<T>` field `status: 'verified'` without a real source.
