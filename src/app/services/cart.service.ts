import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, from, map, Observable, of, tap } from 'rxjs';
import { CartResponse } from '../dto/response/cart.response';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from './authentication.service';
import axios from 'axios';
import { CartRequest, UpdateQuantityCartRequest } from '../dto/request/cart.request';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private apiClient: any;

  private cartSubject = new BehaviorSubject<CartResponse[]>([]);
  cart$ = this.cartSubject.asObservable();

  get cartValue(): CartResponse[] { return this.cartSubject.value; }

  constructor(private authenticationService: AuthenticationService) {

    const BASE_URL = environment.variable_global.BASE_URL;
    const API_URL = environment.variable_global.API_URL;
    if (!BASE_URL && !API_URL) {
      throw new Error("KHÔNG CẤU HÌNH ĐƯỜNG DẪN API");
    }


    this.apiClient = axios.create({
      baseURL: (API_URL && API_URL.length > 0 ? API_URL : BASE_URL) + "api/v1/carts",
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
        console.log(cart.data)
        this.cartSubject.next(cart.data);
      }),
      catchError(err => {
        this.cartSubject.next([]);
        return of([]);
      })
    );
  }

  async updateQuantityInCart(id: string, updateQuantityCartRequest: UpdateQuantityCartRequest): Promise<CartResponse> {
    try {
      const { data } = await this.apiClient.patch(`/${id}`, updateQuantityCartRequest, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return data.data as CartResponse;
    } catch (err: unknown) {

      throw new Error(axios.isAxiosError(err) ? err.response?.data?.message : "Đã xảy ra lỗi. Vui lòng thử lại");
    }
  }

  async removeItemById(id: string): Promise<void> {
    try {
      const { data } = await this.apiClient.delete(`/${id}`);
      const next = this.cartValue.filter(it => it.id !== id);
      this.cartSubject.next(next);

    } catch (err: unknown) {

      throw new Error(axios.isAxiosError(err) ? err.response?.data?.message : "Đã xảy ra lỗi. Vui lòng thử lại");
    }

  }

  async addToCart(req: CartRequest): Promise<CartResponse> {

    try {
      const res = await this.apiClient.post('', req, { headers: { 'Content-Type': 'application/json' } });
      const added = res.data?.data as CartResponse;

      const existedIdx = this.cartValue.findIndex(it => it.id === added.id);
      let next = [...this.cartValue];
      if (existedIdx >= 0) next[existedIdx] = { ...next[existedIdx], ...added };
      else next.push(added);
      this.cartSubject.next(next);

      return added;
    } catch (err: unknown) {

      throw new Error(axios.isAxiosError(err) ? err.response?.data?.message : "Đã xảy ra lỗi. Vui lòng thử lại");
    }
  }
}
