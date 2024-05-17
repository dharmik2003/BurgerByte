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

// export const Cookienamether = (request: NextRequest, cookieName: string): boolean => {
//     if (request && request.headers) {
//         const cookieHeader = request.headers.get('cookie');
//         if (cookieHeader) {
//             const cookies = cookieHeader.split(';');
//             return cookies.some(cookie => {
//                 const [name] = cookie.trim().split('=');
//                 return name === cookieName;
//             });
//         }
//     }
//     return false;
// };


