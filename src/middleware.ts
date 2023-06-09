import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { TOKEN_COOKIE_NAME } from './lib/auth';
import { jwtVerify } from 'jose';

export async function middleware(request: NextRequest) {
  const tokenCookieValue = request.cookies.get(TOKEN_COOKIE_NAME)?.value;
  try {
    if (!tokenCookieValue) throw Error('missing token');
    await verify(tokenCookieValue, process.env.JWT_SECRET as string);
    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

export const config = {
  matcher: '/users/:path*',
};

const verify = async (token: string, secret: string) =>
  await jwtVerify(token, new TextEncoder().encode(secret));
