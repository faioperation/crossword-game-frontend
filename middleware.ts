import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get('accessToken')?.value;

  // Protect /admin routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    if (!accessToken) {
      // Redirect to login if no token is found
      const loginUrl = new URL('/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // If user is already logged in, prevent them from accessing /login or /register
  if (request.nextUrl.pathname.startsWith('/login') || request.nextUrl.pathname.startsWith('/register')) {
    if (accessToken) {
      // Redirect to home if they are already authenticated
      const homeUrl = new URL('/', request.url);
      return NextResponse.redirect(homeUrl);
    }
  }

  return NextResponse.next();
}

// Config to run middleware only on specific paths
export const config = {
  matcher: ['/admin/:path*', '/login', '/register'],
};
