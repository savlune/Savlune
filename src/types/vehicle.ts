export type VehicleCategory = 'SUV' | 'MPV' | 'Pickup' | 'Kendaraan Niaga' | 'Kendaraan Listrik';

export type FieldStatus = 'verified' | 'unverified' | 'unavailable';

/**
 * Wraps any data point that must carry a provenance/verification status so the
 * UI never silently presents guessed data as fact. See UNVERIFIED_FIELDS.md.
 */
export interface Verifiable<T> {
  value: T | null;
  status: FieldStatus;
  source?: string;
  lastUpdated?: string;
}

export interface VehicleImage {
  src: string;
  alt: string;
  angle?: 'front-3q' | 'front' | 'side' | 'rear' | 'interior' | 'dashboard' | 'trunk' | 'detail';
}

export interface VehicleColor {
  id: string;
  name: string;
  hex: string;
  /** Material/texture swap target used by the 3D viewer, if a GLB is present. */
  materialName?: string;
  swatchImage?: string;
  status: FieldStatus;
}

export interface VehicleVariant {
  id: string;
  name: string;
  price: Verifiable<number>;
  transmission?: string;
  seats?: number;
  notes?: string;
}

export interface VehicleHighlight {
  title: string;
  description: string;
  icon?: string;
  chapter: 'presence' | 'comfort' | 'technology' | 'confidence' | 'ownership';
}

export interface SpecificationItem {
  label: string;
  value: Verifiable<string>;
}

export interface SpecificationGroup {
  group: string;
  items: SpecificationItem[];
}

export interface BrochureItem {
  label: string;
  href: string;
  status: FieldStatus;
}

export interface VehicleHotspot {
  id: string;
  label: string;
  description: string;
  /** Normalized 3D position [x, y, z] anchored to the model, or null if the asset/data isn't ready. */
  position: [number, number, number] | null;
}

export interface VehicleViewerConfig {
  mode: '3d' | 'sequence' | 'static';
  modelPath?: string;
  framePattern?: string;
  frameCount?: number;
  posterImage?: string;
  fallbackImages: VehicleImage[];
  hotspots?: VehicleHotspot[];
}

export interface Vehicle {
  id: string;
  slug: string;
  name: string;
  category: VehicleCategory;
  tagline: string;
  shortDescription: string;
  longDescription: string;
  startingPrice: Verifiable<number>;
  priceRegion: string;
  priceLastUpdated: string;
  seats: number | null;
  fuelType: string | null;
  transmission: string[];
  engine: Verifiable<string>;
  groundClearance: Verifiable<string>;
  heroImage: string;
  gallery: VehicleImage[];
  colors: VehicleColor[];
  variants: VehicleVariant[];
  highlights: VehicleHighlight[];
  specifications: SpecificationGroup[];
  viewer: VehicleViewerConfig;
  brochures: BrochureItem[];
  disclaimer: string;
  featured?: boolean;
}
