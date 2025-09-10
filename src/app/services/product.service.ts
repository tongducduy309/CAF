import { Injectable } from '@angular/core';
import axios from "axios";
import { environment } from 'src/environments/environment';
import { ProductResponse } from '../dto/response/ProductResponse';
import { Product } from '../models/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiClient: any;

  constructor() {

    const BASE_URL = environment.variable_global.BASE_URL;
    const API_URL = environment.variable_global.API_URL;
    if (!BASE_URL && !API_URL) {
      throw new Error("KHÔNG CẤU HÌNH ĐƯỜNG DẪN API");
    }


    this.apiClient = axios.create({
      baseURL: API_URL&&API_URL.length>0 ? API_URL: BASE_URL+"products/",
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

  async getAllProducts(): Promise<ProductResponse[]> {
    try {
      const { data } = await this.apiClient.get("grouped");
      return data.data as ProductResponse[];
    } catch (err: unknown) {
      throw new Error(axios.isAxiosError(err)?err.response?.data?.message:"Đã xảy ra lỗi. Vui lòng thử lại");
    }
  }
  async getDetailProduct(id:string): Promise<ProductResponse> {
    try {
      const { data } = await this.apiClient.get(`grouped/${id}`);
      return data.data as ProductResponse;
    } catch (err: unknown) {

      throw new Error(axios.isAxiosError(err)?err.response?.data?.message:"Đã xảy ra lỗi. Vui lòng thử lại");
    }
  }

  async searchProduct(keyword:string): Promise<Product> {
    try {
      const { data } = await this.apiClient.get(`search/${keyword}`);
      return data.data as Product;
    } catch (err: unknown) {

      throw new Error(axios.isAxiosError(err)?err.response?.data?.message:"Đã xảy ra lỗi. Vui lòng thử lại");
    }
  }
}
