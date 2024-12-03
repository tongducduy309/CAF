import { Injectable } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(private notification: NzNotificationService) { }

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

  equalObject(obj1:any,obj2:any){

    for (let key of Object.keys(obj1)){
      if (obj1[key]!=obj2[key]) return false
    }
    return true
  }

  getCookie(name: string): {} | any{
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
      const parts = cookie.trim().split('=');
      if (parts[0] === name) {
        return JSON.parse(decodeURIComponent(parts[1]));
      }
    }
    return null;
  }

  deleteCookie(name: string, path: string = '/', domain: string | null = null) {
    this.setCookie(name, '', -1, path, domain);
  }

  createNotification(type: string, message: string, show=true): void {
    if (show){
      this.notification.create(
        type,
        'Thông Báo',
        message
      );
    }
  }

  formatEncode(n:any,a:any){
    let s=n+"";
    while (s.length<a) s='0'+s;
    let x='';
    for (let i=0;i<a;i++) x+=s[i];


    return x;
}
  createID(){
    let date = new Date();
    let d=[date.getDate(),date.getMonth(),(date.getFullYear()+"").slice(2,4),date.getHours(),date.getMinutes(),date.getSeconds(),date.getMilliseconds()];
    let n=[2,2,2,2,2,2,4];
    let id='';
    for (let i=0;i<d.length;i++) id+=this.formatEncode(d[i],n[i]);
    return id;
  }

  formatPrice(num:any) {
    try {
      return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    catch (e){
      return '0'
    }
    return num
  }
}
