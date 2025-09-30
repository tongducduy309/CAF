import { inject, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';
import { CreateOrderRequest } from '../dto/request/order.request';
import { AuthenticationService } from './authentication.service';
import { PaymentStatus } from '../enums/Payment.enum';
import { P } from '@angular/cdk/portal-directives.d-BoG39gYN';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
private apiClient: any;

  translate = inject(TranslateService)

  constructor(private authenticationService: AuthenticationService) {

    const BASE_URL = environment.variable_global.BASE_URL;
    const API_URL = environment.variable_global.API_URL;
    if (!BASE_URL && !API_URL) {
      throw new Error("KHÔNG CẤU HÌNH ĐƯỜNG DẪN API");
    }


    this.apiClient = axios.create({
      baseURL: (API_URL && API_URL.length > 0 ? API_URL : BASE_URL) + "api/v1/orders",
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

  async createOrder(createOrderRequest:CreateOrderRequest): Promise<string> {
    try {
      const { data } = await this.apiClient.post(``, createOrderRequest, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      return data.payUrl as string;
    } catch (err: unknown) {

      throw new Error(axios.isAxiosError(err)?err.response?.data?.message:this.translate.instant('NOTIFICATION.ERROR.CALL_API'));
    }
  }

  async getStatus(id:number): Promise<PaymentStatus> {
    try {
      const { data } = await this.apiClient.get(`${id}/payment-status`);
      console.log(data);
      return data.data??PaymentStatus.UNPAID as PaymentStatus;
    } catch (err: unknown) {

      throw new Error(axios.isAxiosError(err)?err.response?.data?.message:this.translate.instant('NOTIFICATION.ERROR.CALL_API'));
    }
  }
}
