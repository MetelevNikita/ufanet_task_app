import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";


export async function middleware(request: NextRequest) {

  const token = request.cookies.get('token')?.value
  const pathname = request.nextUrl.pathname


  const isPublicRoute =
  pathname.startsWith('/auth/') ||
  pathname.startsWith('/auth') ||
  pathname.startsWith('/api/')

  if (isPublicRoute) {
    return NextResponse.next()
  }


  if (!token) {
  return NextResponse.redirect(new URL('/auth', request.url))
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET as string);
    await jwtVerify(token, secret);
    return NextResponse.next()
  } catch (err: Error | unknown) {

    if (err instanceof Error) {


      const url = new URL('/auth')
      url.searchParams.set('expired', 'true')
      if (err.name === 'TokenExpiredError') {
        console.error('Срок действия токена истек')
        return NextResponse.redirect(new URL(url, request.url))
      }

      console.error('ERR ', err)
      return NextResponse.redirect(new URL(url, request.url))
    }

  }

  
  
  return NextResponse.next()
}


export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:css|js|map|png|jpg|jpeg|svg|ico|webp)$).*)',
  ]
}