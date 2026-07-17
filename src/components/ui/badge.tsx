import clsx from 'clsx';

export function Badge({
  children,
  tone = 'gold',
  className,
}: {
  children: React.ReactNode;
  tone?: 'gold' | 'red' | 'neutral';
  className?: string;
}) {
  const toneClasses = {
    gold: 'border-savlune-gold/40 text-savlune-gold-light',
    red: 'border-mitsubishi-red/50 text-mitsubishi-red',
    neutral: 'border-white/20 text-white/60',
  }[tone];

  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-medium uppercase tracking-widest2',
        toneClasses,
        className,
      )}
    >
      {children}
    </span>
  );
}
