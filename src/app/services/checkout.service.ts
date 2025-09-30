import { inject, Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from './authentication.service';
import { CreateOrderRequest } from '../dto/request/order.request';
import { ReviewResponse } from '../dto/response/review.response';
import { TranslateService } from '@ngx-translate/core';
import { OrderService } from './order.service';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  private apiClient: any;

  translate = inject(TranslateService)

  orderService = inject(OrderService)

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
    return this.orderService.createOrder(createOrderRequest)
  }
}
