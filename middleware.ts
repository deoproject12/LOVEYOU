import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // For API routes that need admin authentication
  if (request.nextUrl.pathname.startsWith('/api/admin') && !request.nextUrl.pathname.startsWith('/api/admin/login')) {
    const isAuthenticated = request.cookies.get('isAuthenticated') === 'true';
    
    if (!isAuthenticated) {
      return new NextResponse(
        JSON.stringify({ error: 'Authentication required' }),
        { status: 401, headers: { 'content-type': 'application/json' } }
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images, fonts, and other static assets
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|css|js|woff|woff2|ttf|eot)$).*)',
  ],
};