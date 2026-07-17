import clsx from 'clsx';

interface SectionProps {
  number?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
  id?: string;
}

export function Section({ number, eyebrow, title, description, children, className, id }: SectionProps) {
  return (
    <section id={id} className={clsx('container-content py-20 md:py-28', className)}>
      {(number || eyebrow || title) && (
        <div className="mb-12 md:mb-16">
          <div className="flex items-center gap-4">
            {number && <span className="section-number">{number}</span>}
            {eyebrow && (
              <span className="text-xs font-medium uppercase tracking-widest2 text-white/50">
                {eyebrow}
              </span>
            )}
          </div>
          {title && (
            <h2 className="mt-4 max-w-2xl font-display text-4xl font-light leading-tight text-offwhite md:text-5xl">
              {title}
            </h2>
          )}
          {description && (
            <p className="mt-4 max-w-xl text-base leading-relaxed text-white/60">{description}</p>
          )}
        </div>
      )}
      {children}
    </section>
  );
}
