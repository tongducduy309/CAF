import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';
import { UserRequest } from '../dto/request/UserRequest';
import { AuthenticationService } from './authentication.service';
import { catchError, from, map, Observable, of, tap } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiClient: any;

  constructor(private authenticationService: AuthenticationService) {

    const BASE_URL = environment.variable_global.BASE_URL;
    const API_URL = environment.variable_global.API_URL;
    if (!BASE_URL && !API_URL) {
      throw new Error("KHÔNG CẤU HÌNH ĐƯỜNG DẪN API");
    }


    this.apiClient = axios.create({
      baseURL: (API_URL&&API_URL.length>0 ? API_URL: BASE_URL)+"users",
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

  async getProfile(): Promise<Observable<User | null>> {
      return from(this.apiClient.get('/profile')).pipe(
        map((response: any) => response.data),
        tap(user => {
          return user
        }),
        catchError(err => {
          return of(null);
        })
      );
    }

}
