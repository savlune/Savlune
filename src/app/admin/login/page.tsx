'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.error ?? 'Gagal masuk.');
        return;
      }
      router.push(searchParams.get('next') || '/admin/dashboard');
      router.refresh();
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="w-full max-w-sm border border-white/10 bg-charcoal-900/50 p-8">
      <h1 className="font-display text-2xl font-light text-offwhite">Admin SAVLUNE</h1>
      <p className="mt-2 text-sm text-white/50">Masuk untuk mengelola data leads dan paket leasing.</p>

      <div className="mt-6 space-y-4">
        <div>
          <label className="text-xs uppercase tracking-widest2 text-white/40">Username</label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-2 w-full border border-white/15 bg-transparent px-3.5 py-3 text-sm text-offwhite outline-none focus:border-savlune-gold"
            autoComplete="username"
          />
        </div>
        <div>
          <label className="text-xs uppercase tracking-widest2 text-white/40">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-2 w-full border border-white/15 bg-transparent px-3.5 py-3 text-sm text-offwhite outline-none focus:border-savlune-gold"
            autoComplete="current-password"
          />
        </div>
      </div>

      {error && <p className="mt-4 text-sm text-mitsubishi-red">{error}</p>}

      <Button type="submit" className="mt-6 w-full" disabled={loading}>
        {loading ? 'Memproses...' : 'Masuk'}
      </Button>
    </form>
  );
}

export default function AdminLoginPage() {
  return (
    <div className="container-content flex min-h-[70vh] items-center justify-center py-14 pt-32">
      <Suspense fallback={null}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
