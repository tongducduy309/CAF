import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor() { }

  getPrice(item:any){
    if (!item.sale) item.sale=0
    return (item.cost-item.cost*(item.sale/100))
  }

  setCookie(name: string, value: string, expires: number | null = null, path: string = '/', domain: string | null = null, secure: boolean = false, sameSite: 'strict' | 'lax' | 'none' | null = null) {
    let cookieString = `${name}=${encodeURIComponent(value)}`;
    if (expires) {
      const date = new Date();
      date.setTime(date.getTime() + expires *  60 * 1000);
      cookieString += `; expires=${date.toUTCString()}`;
    }
    if (path) {
      cookieString += `; path=${path}`;
    }
    if (domain) {
      cookieString += `; domain=${domain}`;
    }
    if (secure) {
      cookieString += `; secure`;
    }
    if (sameSite) {
      cookieString += `; SameSite=${sameSite}`;
    }
    document.cookie = cookieString;  

  }

  getCookie(name: string): string | null {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
      const parts = cookie.trim().split('=');
      if (parts[0] === name) {
        return decodeURIComponent(parts[1]);
      }
    }
    return null;
  }

  deleteCookie(name: string, path: string = '/', domain: string | null = null) {
    this.setCookie(name, '', -1, path, domain);
  }
}
