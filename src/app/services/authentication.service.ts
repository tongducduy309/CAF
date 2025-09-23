import { inject, Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';
import { AuthenticationRequest } from '../dto/request/Authentication';
import { UserRequest } from '../dto/request/UserRequest';
import { BehaviorSubject, catchError, from, map, Observable, of, tap } from 'rxjs';
import { User } from '../models/user.model';
import { ResponseObject } from '../models/responseObject.model';
import { Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private apiClient: any;

  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();
  private router = inject(Router)

  constructor() {
    const token = this.getAccessToken()

    if (!token) {
      this.userSubject.next(null);
    }
    const BASE_URL = environment.variable_global.BASE_URL;
    const API_URL = environment.variable_global.API_URL;
    if (!BASE_URL && !API_URL) {
      throw new Error("KHÔNG CẤU HÌNH ĐƯỜNG DẪN API");
    }


    this.apiClient = axios.create({
      baseURL: (API_URL&&API_URL.length>0 ? API_URL: BASE_URL)+"auth/",
      timeout: 5000,
      headers: { "Content-Type": "application/json" },
    });

    this.apiClient.interceptors.request.use((config: any) => {
      
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    }, (error: any) => {
      return Promise.reject(error);
    });
  }

  async checkAuth(): Promise<Observable<User | null>> {
    return from(this.apiClient.get('/me')).pipe(
      map((response:any) => response.data),
      tap(user => {
        this.userSubject.next(user);
      }),
      catchError(err => {
        this.userSubject.next(null);
        return of(null);
      })
    );
  }

  getAccessToken(): string | null {
    return localStorage.getItem('access_token');
  }

  async login(authentication:AuthenticationRequest): Promise<string> {
    try {
      const { data } = await this.apiClient.post(`token`, authentication, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return data.data;
    } catch (err: unknown) {

      throw new Error(axios.isAxiosError(err)?err.response?.data?.message:"Đã xảy ra lỗi. Vui lòng thử lại");
    }
  }

  async register(userRequest:UserRequest): Promise<string> {
    try {
      const { data } = await this.apiClient.post(``, userRequest, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return data.data;
    } catch (err: unknown) {

      throw new Error(axios.isAxiosError(err)?err.response?.data?.message:"Đã xảy ra lỗi. Vui lòng thử lại");
    }
  }

  logout(redirectToLogin = true) {
    localStorage.removeItem('access_token');
    this.userSubject.next(null);
    if (redirectToLogin) {
      this.router.navigate(['']);
    }
  }
}
