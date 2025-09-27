import { inject, Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';
import { AuthenticationRequest } from '../dto/request/authentication.request';
import { UserRequest } from '../dto/request/user.request';
import { BehaviorSubject, catchError, from, map, Observable, of, tap } from 'rxjs';
import { Auth, User } from '../models/user.model';
import { ResponseObject } from '../models/responseObject.model';
import { Router } from '@angular/router';

declare const google: any;

const GOOGLE_CLIENT_ID = environment.GOOGLE_CLIENT_ID;

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private apiClient: any;

  private APP_URL: string = "";

  private userSubject = new BehaviorSubject<Auth | null>(null);
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

    this.APP_URL = API_URL && API_URL.length > 0 ? API_URL : BASE_URL
    this.apiClient = axios.create({
      baseURL: (API_URL && API_URL.length > 0 ? API_URL : BASE_URL) + "api/v1/auth/",
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

  async fetchProfile(): Promise<Observable<Auth | null>> {
    if (!this.getAccessToken()) {
      this.userSubject.next(null);
      return of(null);
    }
    return from(this.apiClient.get('me')).pipe(
      map((response: any) => response.data),
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

  // async login(authentication:AuthenticationRequest): Promise<string> {
  //   try {
  //     const { data } = await this.apiClient.post(`token`, authentication, {
  //       headers: {
  //         'Content-Type': 'application/json'
  //       }
  //     });
  //     return data.data;
  //   } catch (err: unknown) {

  //     throw new Error(axios.isAxiosError(err)?err.response?.data?.message:"Đã xảy ra lỗi. Vui lòng thử lại");
  //   }
  // }

  async login(authentication: AuthenticationRequest): Promise<Auth> {
    try {
      const { data } = await this.apiClient.post('authenticate', authentication, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const user = data.data as Auth;
      if (!user.token) throw new Error('Login success but no token returned');

      localStorage.setItem('access_token', user.token);

      const userFromLogin = user ?? null;
      if (userFromLogin) {
        this.userSubject.next(userFromLogin as Auth);
        return userFromLogin;
      }

      return user;
    } catch (err: unknown) {
      // nicety: unwrap axios error message
      const msg = axios.isAxiosError(err)
        ? err.response?.data?.message ?? err.message
        : (err as Error).message ?? 'Đã xảy ra lỗi. Vui lòng thử lại';
      throw new Error(msg);
    }
  }

  // loginWithGoogle() {
  //   window.location.href = `${this.APP_URL}oauth2/authorization/google`;
  // }


  async register(userRequest: UserRequest): Promise<string> {
    try {
      const { data } = await this.apiClient.post(``, userRequest, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return data.data;
    } catch (err: unknown) {

      throw new Error(axios.isAxiosError(err) ? err.response?.data?.message : "Đã xảy ra lỗi. Vui lòng thử lại");
    }
  }

  logout(redirectToLogin = true) {
    localStorage.removeItem('access_token');
    this.userSubject.next(null);
    if (redirectToLogin) {
      this.router.navigate(['']);
    }
  }

  initGoogle() {

    google.accounts.id.initialize({
      client_id: environment.GOOGLE_CLIENT_ID,
      callback: (response: any) => this.handleCredentialResponse(response),
      auto_select: false,
    use_fedcm_for_prompt: false,            
    itp_support: true
    });
  }

  renderGoogleButton(elementId: string) {
    google.accounts.id.renderButton(
      document.getElementById(elementId),
      { theme: 'filled_blue', size: 'large', type: 'standard', shape: 'rectangular' }
    );
  }



  promptOneTap() {
    // google.accounts.id.prompt()
    google.accounts.id.prompt((notification: any) => {
    if (notification.isDisplayed()) {
      return;
    }

  });
  }

  private async handleCredentialResponse(response: any) {
    const idToken = response?.credential;
    if (!idToken) return;
    try {
      const auth = await this.loginWithGoogleToken(idToken);
      localStorage.setItem('access_token', auth.token);

      this.userSubject.next(auth as Auth);
      this.router.navigate([''])
    } catch (e: any) {
      console.error('Google login failed:', e?.message || e);
    }
  }

  async loginWithGoogleToken(idToken: string): Promise<Auth> {
    try {
      const { data } = await this.apiClient.post(`google`, { token: idToken }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return data.data;
    } catch (err: unknown) {

      throw new Error(axios.isAxiosError(err) ? err.response?.data?.message : "Đã xảy ra lỗi. Vui lòng thử lại");
    }
  }


}
