import { forwardRef } from 'react';
import Link from 'next/link';
import clsx from 'clsx';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'whatsapp';

interface BaseProps {
  variant?: ButtonVariant;
  className?: string;
  children: React.ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-offwhite text-charcoal-950 hover:bg-white border border-transparent',
  secondary:
    'bg-transparent text-offwhite border border-white/25 hover:border-savlune-gold hover:text-savlune-gold-light',
  ghost: 'bg-transparent text-offwhite/80 hover:text-offwhite underline-offset-4 hover:underline',
  whatsapp: 'bg-mitsubishi-red text-white hover:bg-mitsubishi-red/90 border border-transparent',
};

const baseClasses =
  'inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-medium tracking-wide transition-colors duration-300 ease-cinematic disabled:opacity-40 disabled:pointer-events-none';

export const Button = forwardRef<
  HTMLButtonElement,
  BaseProps & React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ variant = 'primary', className, children, ...props }, ref) => (
  <button ref={ref} className={clsx(baseClasses, variantClasses[variant], className)} {...props}>
    {children}
  </button>
));
Button.displayName = 'Button';

interface LinkButtonProps extends BaseProps {
  href: string;
  external?: boolean;
}

export function LinkButton({ href, external, variant = 'primary', className, children }: LinkButtonProps) {
  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={clsx(baseClasses, variantClasses[variant], className)}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={clsx(baseClasses, variantClasses[variant], className)}>
      {children}
    </Link>
  );
}
