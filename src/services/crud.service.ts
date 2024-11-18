import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  constructor(private http: HttpClient) {

  }

  // ============================ALL=============================

  addData(id:any,data:any){
    // const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    // this.http.post(`https://api-caf.vercel.app/api/post/${id}`,{...data}, { headers })

    return fetch(`https://api-caf.vercel.app/api/post/${id}`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
})
  }

  verifyUser(token:any){
    // const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    // this.http.post(`https://api-caf.vercel.app/api/post/${id}`,{...data}, { headers })

    return fetch(`https://api-caf.vercel.app/api/put/users/verify`, {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({token:token})
})
  }

  get(table:string,id:string){

    return this.http.get(`https://api-caf.vercel.app/api/get/${table}/${id}`,{headers:new HttpHeaders('Content-type')});

  }

  delete(table:string,id:string){

    return this.http.delete(`https://api-caf.vercel.app/api/delete/${table}/${id}`,{headers:new HttpHeaders('Content-type')});

  }

  put(table:any,data:any){

    return fetch(`https://api-caf.vercel.app/api/put/${table}`, {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
})
  }

  // ============================PRODUCT=============================

  getInfoItemsCart(ids:any){
    return this.http.get(`https://api-caf.vercel.app/api/get/products/items-cart/${ids}`);
  }

  // ============================USER=============================
  getUsers(){
    return null;
  }
}
