import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { environment } from 'src/environments/environment';
import axios from 'axios';
import { CreateBlogRequest } from '../dto/request/Blog';
import { ResponseObject } from '../models/responseObject.model';
import { BlogHTMLResponse } from '../dto/response/BlogResponse';
import { parseLocalDateTime } from '../utils/Date';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  private apiClient: any;

  constructor(private authenticationService: AuthenticationService) {

    const BASE_URL = environment.variable_global.BASE_URL;
    const API_URL = environment.variable_global.API_URL;
    if (!BASE_URL && !API_URL) {
      throw new Error("KHÔNG CẤU HÌNH ĐƯỜNG DẪN API");
    }


    this.apiClient = axios.create({
      baseURL: (API_URL&&API_URL.length>0 ? API_URL: BASE_URL)+"blogs",
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

  async getDetailBlogBySlug(slug:string): Promise<BlogHTMLResponse> {
    try {
      const { data } = await this.apiClient.get(`/html/${slug}`);
      const res  = {
        ...data.data,
        createdAt:parseLocalDateTime(data.data.createdAt)
      };

      return res as BlogHTMLResponse;
    } catch (err: unknown) {

      throw new Error(axios.isAxiosError(err)?err.response?.data?.message:"Đã xảy ra lỗi. Vui lòng thử lại");
    }
  }

  async create(createBlogRequest:CreateBlogRequest): Promise<ResponseObject> {
    try {
      const { data } = await this.apiClient.post(``, createBlogRequest, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return data.data;
    } catch (err: unknown) {

      throw new Error(axios.isAxiosError(err)?err.response?.data?.message:"Đã xảy ra lỗi. Vui lòng thử lại");
    }
  }
}
