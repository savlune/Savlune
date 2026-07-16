import { NextRequest, NextResponse } from 'next/server';
import crypto from 'node:crypto';

const ADMIN_COOKIE = 'savlune_admin_session';

export async function POST(request: NextRequest) {
  const { username, password } = (await request.json()) as { username?: string; password?: string };

  const expectedUser = process.env.ADMIN_USERNAME;
  const expectedPass = process.env.ADMIN_PASSWORD;

  if (!expectedUser || !expectedPass) {
    return NextResponse.json(
      { error: 'Admin belum dikonfigurasi. Isi ADMIN_USERNAME dan ADMIN_PASSWORD di .env.local.' },
      { status: 503 },
    );
  }

  const validUser = timingSafeEqual(username ?? '', expectedUser);
  const validPass = timingSafeEqual(password ?? '', expectedPass);

  if (!validUser || !validPass) {
    return NextResponse.json({ error: 'Username atau password salah.' }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_COOKIE, crypto.randomUUID(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 8,
  });
  return response;
}

function timingSafeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return crypto.timingSafeEqual(bufA, bufB);
}
