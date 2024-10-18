import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  constructor(private http: HttpClient) {

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
