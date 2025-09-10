import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';
import { ReviewResponse } from '../dto/response/ReviewResponse';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  private apiClient: any;

  constructor() {

    const BASE_URL = environment.variable_global.BASE_URL;
    const API_URL = environment.variable_global.API_URL;
    if (!BASE_URL && !API_URL) {
      throw new Error("KHÔNG CẤU HÌNH ĐƯỜNG DẪN API");
    }

    this.apiClient = axios.create({
      baseURL: API_URL&&API_URL.length>0 ? API_URL: BASE_URL+"reviews/",
      timeout: 5000,
      headers: { "Content-Type": "application/json" },
    });

    this.apiClient.interceptors.request.use((config: any) => {
      // const token = getAccessToken()
      // if (token) {
      //   config.headers['Authorization'] = `Bearer ${token}`;
      // }
      return config;
    }, (error: any) => {
      return Promise.reject(error);
    });
  }

  async getReviewByProductId(name_id:string): Promise<ReviewResponse[]> {
    try {
      const { data } = await this.apiClient.get(`product-id/${name_id}`);
      return data.data as ReviewResponse[];
    } catch (err: unknown) {

      throw new Error(axios.isAxiosError(err)?err.response?.data?.message:"Đã xảy ra lỗi. Vui lòng thử lại");
    }
  }
}
