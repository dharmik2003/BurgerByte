import { deleteCookie, getCookie, hasCookie, setCookie } from 'cookies-next'
import { NextRequest } from 'next/server';

export const fetchCookie = (key: string, defaultValue?: string) => {
    if (getCookie(key)?.toString()) {
        return getCookie(key)
    }
    return defaultValue
}
// export const fetchCookie = (key: string, defaultValue?: string) => {
//     const cookieValue = getCookie(key)?.toString(); // Retrieve the cookie value

//     if (cookieValue) {
//         // Add double quotes around the cookie value
//         const quotedValue = `"${cookieValue}"`;
//         return quotedValue;
//     }

//     return defaultValue;
// }

export const addCookie = (key: string, value: string) => {
    setCookie(key, value,) // 24hrs expiration { maxAge: 86400 }
}

// export const haveCookie = (key: string) => hasCookie(key)
export const haveCookie = (request: NextRequest, key: string): boolean => {
    const cookies = request.cookies;
    return !!cookies.get(key);
};
export const haveCookie1 = (request: any, cookieName: string): boolean => {
    return !!request.cookies[cookieName];
};

export const removeCookie = (key: string) => deleteCookie(key)


export const Cookienamether = (cookieName: string): boolean => {
    return document.cookie.split(';').some(cookie => {
        const [name] = cookie.trim().split('=');
        return name === cookieName;
    });
};



