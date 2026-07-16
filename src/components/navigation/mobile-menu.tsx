'use client';

import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { NAV_LINKS } from '@/lib/nav-links';

export function MobileMenu({
  open,
  onClose,
  waUrl,
}: {
  open: boolean;
  onClose: () => void;
  waUrl: string;
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-40 flex flex-col justify-center bg-charcoal-950 lg:hidden"
        >
          <nav className="container-content flex flex-col gap-2">
            {NAV_LINKS.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * i, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link
                  href={link.href}
                  onClick={onClose}
                  className="block border-b border-white/10 py-5 font-display text-3xl font-light text-offwhite"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
            <motion.a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * NAV_LINKS.length, duration: 0.4 }}
              className="mt-8 inline-flex w-fit items-center gap-2 bg-mitsubishi-red px-7 py-4 text-sm font-medium text-white"
            >
              Hubungi Sales
            </motion.a>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
