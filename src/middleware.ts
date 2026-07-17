import { NextResponse, type NextRequest } from 'next/server';

const ADMIN_COOKIE = 'savlune_admin_session';

export function middleware(request: NextRequest) {
  const session = request.cookies.get(ADMIN_COOKIE);
  if (!session) {
    const loginUrl = new URL('/admin/login', request.url);
    loginUrl.searchParams.set('next', request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/dashboard/:path*'],
};
