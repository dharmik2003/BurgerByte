import { deleteCookie, getCookie, hasCookie, setCookie } from 'cookies-next'
import { NextRequest } from 'next/server';
import Cookies from 'js-cookie';

export const fetchCookie = (key: string, defaultValue?: string) => {
    if (getCookie(key)?.toString()) {
        return getCookie(key)
    }
    return defaultValue
}


export const addCookie = (key: string, value: string) => {
    setCookie(key, value,) // 24hrs expiration { maxAge: 86400 }
}

// export const haveCookie = (key: string) => hasCookie(key)
export const haveCookie = (request: NextRequest, key: string): boolean => {
    const cookies = request.cookies;
    return !!cookies.get(key);
};
export const haveCookiebool = (key: string): boolean => {
    const cookies = Cookies.get(key);
    if (cookies){
        return true
    }
    else{
        return false
    }
};


export const haveCookieClient = (key:any) => {
    const cookies = document.cookie.split(';').map(cookie => cookie.trim());
    for (let cookie of cookies) {
        if (cookie.startsWith(`${key}=`)) {
            return true;
        }
    }
    return false;
};


export const removeCookie = (key: string) => deleteCookie(key)


export const Cookienamether = (cookieName: string): boolean => {
    return document.cookie.split(';').some(cookie => {
        const [name] = cookie.trim().split('=');
        return name === cookieName;
    });
};
