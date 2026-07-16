'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import clsx from 'clsx';
import { salesConsultant } from '@/data/locations';
import { buildWhatsAppUrl } from '@/lib/whatsapp/message';
import { NAV_LINKS } from '@/lib/nav-links';
import { MobileMenu } from './mobile-menu';

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const waUrl = buildWhatsAppUrl(
    `Halo Kak ${salesConsultant.name}, saya ingin bertanya seputar kendaraan Mitsubishi.`,
  );

  return (
    <>
      <header
        className={clsx(
          'fixed inset-x-0 top-0 z-50 transition-colors duration-500 ease-cinematic',
          scrolled || menuOpen
            ? 'border-b border-white/10 bg-charcoal-950/90 backdrop-blur-md'
            : 'bg-gradient-to-b from-black/60 to-transparent',
        )}
      >
        <div className="container-content flex h-20 items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <span className="font-display text-2xl font-medium tracking-widest2 text-offwhite">
              SAVLUNE
            </span>
            <span className="hidden h-5 w-px bg-white/20 sm:block" />
            <span className="hidden text-[11px] uppercase tracking-widest2 text-white/50 sm:block">
              × Mitsubishi
            </span>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={clsx(
                  'text-sm tracking-wide text-white/70 transition-colors hover:text-savlune-gold-light',
                  pathname === link.href && 'text-savlune-gold-light',
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-2 border border-mitsubishi-red/60 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-mitsubishi-red md:inline-flex"
            >
              Hubungi Sales
            </a>
            <button
              type="button"
              aria-label={menuOpen ? 'Tutup menu' : 'Buka menu'}
              onClick={() => setMenuOpen((v) => !v)}
              className="flex h-10 w-10 items-center justify-center text-offwhite lg:hidden"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} waUrl={waUrl} />
    </>
  );
}
