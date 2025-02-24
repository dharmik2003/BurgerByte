import { deleteCookie, getCookie, hasCookie, setCookie } from 'cookies-next'

export const fetchCookie = (key: string, defaultValue?: string) => {
  if (getCookie(key)?.toString()) {
    return getCookie(key)
  }
  return defaultValue
}

export const addCookie = (key: string, value: string) => {
  setCookie(key, value, { maxAge: 86400 }) // 24hrs expiration
}

export const haveCookie = (key: string) => hasCookie(key)

export const removeCookie = (key: string) => deleteCookie(key)
