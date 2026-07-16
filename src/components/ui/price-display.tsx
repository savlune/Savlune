import { formatRupiah } from '@/lib/formatters/currency';
import type { Verifiable } from '@/types';

const NO_PRICE_NOTE = 'Hubungi sales untuk harga OTR Samarinda terbaru.';

export function PriceDisplay({
  price,
  suffix,
  className,
}: {
  price: Verifiable<number>;
  suffix?: string;
  className?: string;
}) {
  if (price.status !== 'verified' || price.value === null || price.value <= 0) {
    return <span className={className}>{NO_PRICE_NOTE}</span>;
  }
  return (
    <span className={className}>
      {formatRupiah(price.value)}
      {suffix ? <span className="text-white/50"> {suffix}</span> : null}
    </span>
  );
}
