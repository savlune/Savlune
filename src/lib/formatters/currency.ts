const rupiahFormatter = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

const numberFormatter = new Intl.NumberFormat('id-ID');

export function formatRupiah(value: number | null | undefined): string {
  if (value === null || value === undefined || Number.isNaN(value)) {
    return '';
  }
  return rupiahFormatter.format(value).replace('IDR', 'Rp').replace(/\s/g, '');
}

export function formatNumber(value: number | null | undefined): string {
  if (value === null || value === undefined || Number.isNaN(value)) return '';
  return numberFormatter.format(value);
}

/** Parses a user-typed, locale-formatted rupiah string ("5.692.000") back to a number. */
export function parseRupiahInput(input: string): number {
  const digitsOnly = input.replace(/[^\d]/g, '');
  if (!digitsOnly) return 0;
  return Number.parseInt(digitsOnly, 10);
}

export function formatDateID(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
}
