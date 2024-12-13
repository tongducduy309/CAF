import { Injectable } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(private notification: NzNotificationService) { }

  getPrice(item:any){
    if (!item) return 0
    if (!item.sale) item.sale=0
    return (item.cost-item.cost*(item.sale/100))
  }

  setCookie(name: string, value: string, expires: number | null = null) {
    let cookieString = `${name}=${encodeURIComponent(value)}`;
    if (expires) {
      const date = new Date();
      date.setTime(date.getTime() + expires *  60 * 1000);
      cookieString += `; expires=${date.toUTCString()}`;
    }
    document.cookie = cookieString;

  }

  equalObject(obj1:any,obj2:any){
    if (obj1&&obj2) return true
    if (!obj1||!obj2) return false

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
        let d = decodeURIComponent(parts[1])
        if (d)
          return JSON.parse(d);
        return null
      }
    }
    return null;
  }

  deleteCookie(name: string) {
    this.setCookie(name, '', -1);
  }

  createNotification(type: string, message: string): void {
    if (type!='success'&&type!='info'&&type!='warning'&&type!='error') return;
    this.notification.create(
      type,
      'Thông Báo',
      message
    );
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
