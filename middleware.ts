

import { NextRequest, NextResponse } from 'next/server';
import { fetchCookie, haveCookie } from './app/utils/cookies';
import { COOKIE_ADMIN, COOKIE_USER } from './constant';
export async function middleware(request: NextRequest) {

    const adminDetailsExists = haveCookie(request, COOKIE_ADMIN);
    const userDetailsExists = haveCookie(request,COOKIE_USER);

  
    // Redirect to the login page if the userDetails cookie is not present
    if ((request.nextUrl.pathname === '/product' && adminDetailsExists) || (request.nextUrl.pathname === '/orders' && adminDetailsExists)){
        // const homeUrl: string = new URL('/product', request.nextUrl.origin).toString();
        // return NextResponse.redirect(homeUrl);
        return NextResponse.next();
    }
    else if (request.nextUrl.pathname === '/addproduct' && adminDetailsExists) {
        // const homeUrl: string = new URL('/addproduct', request.nextUrl.origin).toString();
        // return NextResponse.redirect(homeUrl);
        return NextResponse.next();
    }

    if (request.nextUrl.pathname === '/product' && userDetailsExists) {
        const homeUrl: string = new URL('/dashboard', request.nextUrl.origin).toString();
        return NextResponse.redirect(homeUrl);
    }
    else if (request.nextUrl.pathname === '/addproduct' && userDetailsExists) {
        const homeUrl: string = new URL('/dashboard', request.nextUrl.origin).toString();
        return NextResponse.redirect(homeUrl);
    }

    else if (!userDetailsExists && request.nextUrl.pathname !== '/login' && request.nextUrl.pathname !== '/signup' && request.nextUrl.pathname !== '/profile') {
        const loginUrl: string = new URL('/login', request.nextUrl.origin).toString();
        return NextResponse.redirect(loginUrl);
    }
    
    // Check if the user is trying to access the /login or /signup page
    else if ((request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/signup') && userDetailsExists ) {
        // Redirect to the home page if the user is logged in and tries to access /login or /signup
        const homeUrl: string = new URL('/dashboard', request.nextUrl.origin).toString();
        return NextResponse.redirect(homeUrl);
    }
    

    
    if ((request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/signup') && adminDetailsExists) {
        // Redirect to the home page if the user is logged in and tries to access /login or /signup
        const homeUrl: string = new URL('/dashboard', request.nextUrl.origin).toString();
        return NextResponse.redirect(homeUrl);
    }

    if (request.nextUrl.pathname == '/orders' && userDetailsExists){
        const homeUrl: string = new URL('/dashboard', request.nextUrl.origin).toString();
        return NextResponse.redirect(homeUrl);
    }
   
    if (request.nextUrl.pathname === '/') {
        const homeUrl = new URL('/dashboard', request.nextUrl.origin).toString();
        return NextResponse.redirect(homeUrl);
    }
    
    return NextResponse.next();
}

export const config = {
    matcher: ['/','/product', '/cart', '/login', "/addproduct", '/signup', '/profile',"/orders"],
};
