// import { NextRequest, NextResponse } from 'next/server';
// import { haveCookie } from './app/utils/cookies';

// export async function middleware(request: NextRequest) {
//     // Retrieve userDetails cookie from the request
//     const userDetails = haveCookie('userDetails');
//     console.log("token-----", userDetails)

//     // Check if userDetails cookie is present
//     if (!userDetails) {
//         const loginUrl: string = new URL('/login', request.nextUrl.origin).toString();
//         return NextResponse.redirect(loginUrl);
//     }

//     const currentUrl = new URL(request.url)
//     const currentPathname = currentUrl.pathname
//     console.log(currentPathname)

//     return NextResponse.next()
// }

// export const config = {
//     matcher: '/cart',
// };

import { NextRequest, NextResponse } from 'next/server';
import { fetchCookie, haveCookie, haveCookie1 } from './app/utils/cookies';
import { useSelector } from 'react-redux';
import jwt from "jsonwebtoken";

// Your secret key used for signing JWT tokens
const secretKey = "dharmik";



export async function middleware(request: NextRequest) {
    // Check if userDetails cookie is present

    const adminDetailsExists = haveCookie(request, 'adminDetails');
    const userDetailsExists = haveCookie(request, 'userDetails');

    
    console.log(request.nextUrl.pathname)
    console.log(userDetailsExists)
    console.log("userDetailsExists", userDetailsExists)
    console.log("adminDetailsExists", adminDetailsExists)
    console.log("request.nextUrl.pathname", request.nextUrl.pathname)


    // if ((request.nextUrl.pathname === '/product' || request.nextUrl.pathname === '/addproduct') && !adminDetailsExists) {
    //     // Redirect non-admin users trying to access product-related routes
    //     const homeUrl: string = new URL('/', request.nextUrl.origin).toString();
    //     return NextResponse.redirect(homeUrl);
    // }
    
    // Redirect to the login page if the userDetails cookie is not present
    if (request.nextUrl.pathname === '/product' && adminDetailsExists) {
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
        const homeUrl: string = new URL('/', request.nextUrl.origin).toString();
        return NextResponse.redirect(homeUrl);
    }
    else if (request.nextUrl.pathname === '/addproduct' && userDetailsExists) {
        const homeUrl: string = new URL('/', request.nextUrl.origin).toString();
        return NextResponse.redirect(homeUrl);
    }

    else if (!userDetailsExists && request.nextUrl.pathname !== '/login' && request.nextUrl.pathname !== '/signup' && request.nextUrl.pathname !== '/profile') {
        const loginUrl: string = new URL('/login', request.nextUrl.origin).toString();
        return NextResponse.redirect(loginUrl);
    }
    
    // Check if the user is trying to access the /login or /signup page
    else if ((request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/signup') && userDetailsExists ) {
        // Redirect to the home page if the user is logged in and tries to access /login or /signup
        const homeUrl: string = new URL('/', request.nextUrl.origin).toString();
        return NextResponse.redirect(homeUrl);
    }
    

    
    if ((request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/signup') && adminDetailsExists) {
        // Redirect to the home page if the user is logged in and tries to access /login or /signup
        const homeUrl: string = new URL('/', request.nextUrl.origin).toString();
        return NextResponse.redirect(homeUrl);
    }
   

    return NextResponse.next();
}



export const config = {
    matcher: ['/product', '/cart', '/login', "/addproduct", '/signup', '/profile'],
};
