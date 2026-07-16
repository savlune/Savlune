import type { Vehicle } from '@/types';

/**
 * SEED CATALOG — SAVLUNE × MITSUBISHI
 *
 * Model names and categories below are public Mitsubishi Motors Indonesia
 * lineup facts. Everything else that would normally require a confirmed
 * source (price, specs, colors, variants, feature copy) is intentionally
 * left `status: 'unavailable'` / empty rather than invented.
 *
 * A live fetch of mitsubishi-motors.co.id was attempted while building this
 * catalog and was blocked (HTTP 403, bot protection) — see UNVERIFIED_FIELDS.md.
 * Replace placeholders here as soon as verified data/assets are supplied.
 * See DATA_UPDATE_GUIDE.md for how to edit this file safely.
 */

const PLACEHOLDER_DISCLAIMER =
  'Informasi harga, promo, ketersediaan unit, warna, dan spesifikasi dapat berubah. Konfirmasi akhir dilakukan bersama sales dan pihak pembiayaan terkait.';

const NO_PRICE_NOTE = 'Hubungi sales untuk harga OTR Samarinda terbaru.';

function emptyViewer(fallbackAlt: string): Vehicle['viewer'] {
  return {
    mode: 'static',
    fallbackImages: [],
    hotspots: [],
    posterImage: undefined,
  };
}

export const vehicles: Vehicle[] = [
  {
    id: 'destinator',
    slug: 'destinator',
    name: 'Mitsubishi Destinator',
    category: 'SUV',
    tagline: 'SUV terbaru Mitsubishi untuk Samarinda dan Kalimantan Timur.',
    shortDescription:
      'Mitsubishi Destinator hadir sebagai SUV terbaru di lini Mitsubishi. Detail desain, kabin, dan fitur akan ditampilkan setelah materi resmi dan aset kendaraan dikonfirmasi.',
    longDescription:
      'Materi deskripsi lengkap Destinator menunggu konfirmasi dari sumber resmi Mitsubishi Motors Indonesia dan tim SAVLUNE. Hubungi Sales Consultant untuk brosur dan penjelasan lengkap.',
    startingPrice: { value: null, status: 'unavailable' },
    priceRegion: 'Samarinda',
    priceLastUpdated: '2026-07-16',
    seats: null,
    fuelType: null,
    transmission: [],
    engine: { value: null, status: 'unavailable' },
    groundClearance: { value: null, status: 'unavailable' },
    heroImage: '/vehicles/destinator/hero-placeholder.svg',
    gallery: [],
    colors: [],
    variants: [
      { id: 'gls', name: 'GLS', price: { value: null, status: 'unavailable' } },
      { id: 'exceed', name: 'Exceed', price: { value: null, status: 'unavailable' } },
      { id: 'ultimate', name: 'Ultimate', price: { value: null, status: 'unavailable' } },
      {
        id: 'ultimate-premium',
        name: 'Ultimate Premium',
        price: { value: null, status: 'unavailable' },
      },
    ],
    highlights: [],
    specifications: [],
    viewer: emptyViewer('Mitsubishi Destinator'),
    brochures: [],
    disclaimer: PLACEHOLDER_DISCLAIMER,
    featured: true,
  },
  {
    id: 'xforce',
    slug: 'xforce',
    name: 'Mitsubishi Xforce',
    category: 'SUV',
    tagline: 'SUV compact Mitsubishi dengan karakter tangguh perkotaan.',
    shortDescription:
      'Mitsubishi Xforce merupakan SUV compact di lini Mitsubishi. Detail fitur dan spesifikasi menunggu konfirmasi materi resmi.',
    longDescription:
      'Materi deskripsi lengkap Xforce menunggu konfirmasi dari sumber resmi Mitsubishi Motors Indonesia dan tim SAVLUNE. Hubungi Sales Consultant untuk brosur dan penjelasan lengkap.',
    startingPrice: { value: null, status: 'unavailable' },
    priceRegion: 'Samarinda',
    priceLastUpdated: '2026-07-16',
    seats: null,
    fuelType: null,
    transmission: [],
    engine: { value: null, status: 'unavailable' },
    groundClearance: { value: null, status: 'unavailable' },
    heroImage: '/vehicles/xforce/hero-placeholder.svg',
    gallery: [],
    colors: [],
    variants: [],
    highlights: [],
    specifications: [],
    viewer: emptyViewer('Mitsubishi Xforce'),
    brochures: [],
    disclaimer: PLACEHOLDER_DISCLAIMER,
  },
  {
    id: 'pajero-sport',
    slug: 'pajero-sport',
    name: 'Mitsubishi Pajero Sport',
    category: 'SUV',
    tagline: 'SUV tangguh Mitsubishi untuk segala medan Kalimantan Timur.',
    shortDescription:
      'Mitsubishi Pajero Sport dikenal sebagai SUV tangguh Mitsubishi. Detail fitur dan spesifikasi menunggu konfirmasi materi resmi.',
    longDescription:
      'Materi deskripsi lengkap Pajero Sport menunggu konfirmasi dari sumber resmi Mitsubishi Motors Indonesia dan tim SAVLUNE. Hubungi Sales Consultant untuk brosur dan penjelasan lengkap.',
    startingPrice: { value: null, status: 'unavailable' },
    priceRegion: 'Samarinda',
    priceLastUpdated: '2026-07-16',
    seats: null,
    fuelType: null,
    transmission: [],
    engine: { value: null, status: 'unavailable' },
    groundClearance: { value: null, status: 'unavailable' },
    heroImage: '/vehicles/pajero-sport/hero-placeholder.svg',
    gallery: [],
    colors: [],
    variants: [],
    highlights: [],
    specifications: [],
    viewer: emptyViewer('Mitsubishi Pajero Sport'),
    brochures: [],
    disclaimer: PLACEHOLDER_DISCLAIMER,
  },
  {
    id: 'xpander-cross',
    slug: 'xpander-cross',
    name: 'Mitsubishi Xpander Cross',
    category: 'MPV',
    tagline: 'MPV crossover Mitsubishi dengan tampilan lebih berkarakter.',
    shortDescription:
      'Mitsubishi Xpander Cross adalah varian crossover dari Xpander. Detail fitur dan spesifikasi menunggu konfirmasi materi resmi.',
    longDescription:
      'Materi deskripsi lengkap Xpander Cross menunggu konfirmasi dari sumber resmi Mitsubishi Motors Indonesia dan tim SAVLUNE. Hubungi Sales Consultant untuk brosur dan penjelasan lengkap.',
    startingPrice: { value: null, status: 'unavailable' },
    priceRegion: 'Samarinda',
    priceLastUpdated: '2026-07-16',
    seats: null,
    fuelType: null,
    transmission: [],
    engine: { value: null, status: 'unavailable' },
    groundClearance: { value: null, status: 'unavailable' },
    heroImage: '/vehicles/xpander-cross/hero-placeholder.svg',
    gallery: [],
    colors: [],
    variants: [],
    highlights: [],
    specifications: [],
    viewer: emptyViewer('Mitsubishi Xpander Cross'),
    brochures: [],
    disclaimer: PLACEHOLDER_DISCLAIMER,
  },
  {
    id: 'xpander',
    slug: 'xpander',
    name: 'Mitsubishi Xpander',
    category: 'MPV',
    tagline: 'MPV andalan keluarga Indonesia dari Mitsubishi.',
    shortDescription:
      'Mitsubishi Xpander adalah MPV keluarga populer dari Mitsubishi. Detail fitur dan spesifikasi menunggu konfirmasi materi resmi.',
    longDescription:
      'Materi deskripsi lengkap Xpander menunggu konfirmasi dari sumber resmi Mitsubishi Motors Indonesia dan tim SAVLUNE. Hubungi Sales Consultant untuk brosur dan penjelasan lengkap.',
    startingPrice: { value: null, status: 'unavailable' },
    priceRegion: 'Samarinda',
    priceLastUpdated: '2026-07-16',
    seats: null,
    fuelType: null,
    transmission: [],
    engine: { value: null, status: 'unavailable' },
    groundClearance: { value: null, status: 'unavailable' },
    heroImage: '/vehicles/xpander/hero-placeholder.svg',
    gallery: [],
    colors: [],
    variants: [],
    highlights: [],
    specifications: [],
    viewer: emptyViewer('Mitsubishi Xpander'),
    brochures: [],
    disclaimer: PLACEHOLDER_DISCLAIMER,
  },
  {
    id: 'triton',
    slug: 'triton',
    name: 'Mitsubishi Triton',
    category: 'Pickup',
    tagline: 'Pickup double cabin Mitsubishi untuk kebutuhan kerja dan petualangan.',
    shortDescription:
      'Mitsubishi Triton adalah pickup double cabin dari Mitsubishi. Detail fitur dan spesifikasi menunggu konfirmasi materi resmi.',
    longDescription:
      'Materi deskripsi lengkap Triton menunggu konfirmasi dari sumber resmi Mitsubishi Motors Indonesia dan tim SAVLUNE. Hubungi Sales Consultant untuk brosur dan penjelasan lengkap.',
    startingPrice: { value: null, status: 'unavailable' },
    priceRegion: 'Samarinda',
    priceLastUpdated: '2026-07-16',
    seats: null,
    fuelType: null,
    transmission: [],
    engine: { value: null, status: 'unavailable' },
    groundClearance: { value: null, status: 'unavailable' },
    heroImage: '/vehicles/triton/hero-placeholder.svg',
    gallery: [],
    colors: [],
    variants: [],
    highlights: [],
    specifications: [],
    viewer: emptyViewer('Mitsubishi Triton'),
    brochures: [],
    disclaimer: PLACEHOLDER_DISCLAIMER,
  },
  {
    id: 'l100-ev',
    slug: 'l100-ev',
    name: 'Mitsubishi L100 EV',
    category: 'Kendaraan Listrik',
    tagline: 'Kendaraan niaga listrik Mitsubishi untuk operasional rendah emisi.',
    shortDescription:
      'Mitsubishi L100 EV adalah kendaraan niaga listrik dari Mitsubishi. Detail fitur dan spesifikasi menunggu konfirmasi materi resmi.',
    longDescription:
      'Materi deskripsi lengkap L100 EV menunggu konfirmasi dari sumber resmi Mitsubishi Motors Indonesia dan tim SAVLUNE. Hubungi Sales Consultant untuk brosur dan penjelasan lengkap.',
    startingPrice: { value: null, status: 'unavailable' },
    priceRegion: 'Samarinda',
    priceLastUpdated: '2026-07-16',
    seats: null,
    fuelType: 'Listrik',
    transmission: [],
    engine: { value: null, status: 'unavailable' },
    groundClearance: { value: null, status: 'unavailable' },
    heroImage: '/vehicles/l100-ev/hero-placeholder.svg',
    gallery: [],
    colors: [],
    variants: [],
    highlights: [],
    specifications: [],
    viewer: emptyViewer('Mitsubishi L100 EV'),
    brochures: [],
    disclaimer: PLACEHOLDER_DISCLAIMER,
  },
  {
    id: 'l300',
    slug: 'l300',
    name: 'Mitsubishi L300',
    category: 'Kendaraan Niaga',
    tagline: 'Kendaraan niaga legendaris Mitsubishi untuk bisnis dan logistik.',
    shortDescription:
      'Mitsubishi L300 adalah kendaraan niaga andalan Mitsubishi untuk logistik dan usaha. Detail fitur dan spesifikasi menunggu konfirmasi materi resmi.',
    longDescription:
      'Materi deskripsi lengkap L300 menunggu konfirmasi dari sumber resmi Mitsubishi Motors Indonesia dan tim SAVLUNE. Hubungi Sales Consultant untuk brosur dan penjelasan lengkap.',
    startingPrice: { value: null, status: 'unavailable' },
    priceRegion: 'Samarinda',
    priceLastUpdated: '2026-07-16',
    seats: null,
    fuelType: null,
    transmission: [],
    engine: { value: null, status: 'unavailable' },
    groundClearance: { value: null, status: 'unavailable' },
    heroImage: '/vehicles/l300/hero-placeholder.svg',
    gallery: [],
    colors: [],
    variants: [],
    highlights: [],
    specifications: [],
    viewer: emptyViewer('Mitsubishi L300'),
    brochures: [],
    disclaimer: PLACEHOLDER_DISCLAIMER,
  },
];

export function getVehicleBySlug(slug: string): Vehicle | undefined {
  return vehicles.find((v) => v.slug === slug);
}

export function getFeaturedVehicle(): Vehicle {
  return vehicles.find((v) => v.featured) ?? (vehicles[0] as Vehicle);
}

export const vehicleCategories = [
  'SUV',
  'MPV',
  'Pickup',
  'Kendaraan Niaga',
  'Kendaraan Listrik',
] as const;

export { NO_PRICE_NOTE };
