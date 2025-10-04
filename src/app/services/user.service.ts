import { inject, Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';
import { UserRequest } from '../dto/request/user.request';
import { AuthenticationService } from './authentication.service';
import { catchError, from, map, Observable, of, tap } from 'rxjs';
import { User } from '../models/user.model';
import { TranslateService } from '@ngx-translate/core';
import { Address } from '../models/address.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiClient: any;

  private translate = inject(TranslateService);

  constructor(private authenticationService: AuthenticationService) {

    const BASE_URL = environment.variable_global.BASE_URL;
    const API_URL = environment.variable_global.API_URL;
    if (!BASE_URL && !API_URL) {
      throw new Error("KHÔNG CẤU HÌNH ĐƯỜNG DẪN API");
    }


    this.apiClient = axios.create({
      baseURL: (API_URL && API_URL.length > 0 ? API_URL : BASE_URL) + "api/v1/users",
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
      map((response: any) => {
        return response.data.data as User
      }),
      catchError(err => {
        return of(null);
      })
    );
  }

  async getMyAddresses():Promise<Address[]>{
    try{
      const {data} = await this.apiClient.get(`addresses`);
      return data.data as Address[]
    }catch (err: unknown) {
      console.log(err)
      throw new Error(axios.isAxiosError(err) ? err.response?.data?.message : this.translate.instant('NOTIFICATION.ERROR.CALL_API'));
    }
  }

  async deleteAddressById(id: string): Promise<void> {
    try {
      const { data } = await this.apiClient.delete(`addresses/${id}`);

    } catch (err: unknown) {

      throw new Error(axios.isAxiosError(err) ? err.response?.data?.message : this.translate.instant('NOTIFICATION.ERROR.CALL_API'));
    }

  }

}
