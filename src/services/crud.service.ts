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

  get(table:string,id:string){
    return this.http.get(`https://api-caf.vercel.app/api/get/${table}/${id}`);

  }

  // ============================PRODUCT=============================

  getProducts(id:string){
    return this.http.get(`https://api-caf.vercel.app/api/get/products/${id}`);

  }

  // ============================USER=============================
  getUsers(){
    return null;
  }
}
