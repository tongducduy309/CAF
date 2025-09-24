import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, from, map, Observable, of, tap } from 'rxjs';
import { CartResponse } from '../dto/response/cart.response';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from './authentication.service';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private apiClient: any;

  private cartSubject = new BehaviorSubject<CartResponse[]>([]);
  cart$ = this.cartSubject.asObservable();

  constructor(private authenticationService: AuthenticationService) {

    const BASE_URL = environment.variable_global.BASE_URL;
    const API_URL = environment.variable_global.API_URL;
    if (!BASE_URL && !API_URL) {
      throw new Error("KHÔNG CẤU HÌNH ĐƯỜNG DẪN API");
    }


    this.apiClient = axios.create({
      baseURL: (API_URL && API_URL.length > 0 ? API_URL : BASE_URL) + "carts",
      timeout: 5000,
      headers: { "Content-Type": "application/json" },
    });

    this.apiClient.interceptors.request.use((config: any) => {
      const token = authenticationService.getAccessToken()
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    }, (error: any) => {
      return Promise.reject(error);
    });
  }

  async getMyCart(): Promise<Observable<CartResponse[]>> {
    return from(this.apiClient.get('/mycart')).pipe(
      map((response: any) => response.data),
      tap(cart => {
        this.cartSubject.next(cart.data);
      }),
      catchError(err => {
        this.cartSubject.next([]);
        return of([]);
      })
    );
  }
}
