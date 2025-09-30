import { inject, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';
import { CreateOrderRequest } from '../dto/request/order.request';
import { PaymentStatus } from '../enums/Payment.enum';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private apiClient: any;

  translate = inject(TranslateService)

  constructor(private authenticationService: AuthenticationService) {

    const BASE_URL = environment.variable_global.BASE_URL;
    const API_URL = environment.variable_global.API_URL;
    if (!BASE_URL && !API_URL) {
      throw new Error("KHÔNG CẤU HÌNH ĐƯỜNG DẪN API");
    }


    this.apiClient = axios.create({
      baseURL: (API_URL && API_URL.length > 0 ? API_URL : BASE_URL) + "api/v1/payments/vnpay",
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

  async getIpn(url:any): Promise<any> {
    try {
      const { data } = await this.apiClient.get(`/ipn`);
      console.log(data)
      return data;
    } catch (err: unknown) {

      throw new Error(axios.isAxiosError(err) ? err.response?.data?.message : this.translate.instant('NOTIFICATION.ERROR.CALL_API'));
    }
  }
}
