import { Address } from "./address.model";

export interface User {
  id: string;
  fullname: string;
  email: string;
  point: number;
  phone: string;
  addresses: Address[];
  createdAt: string; 
}

export interface Auth {
  id: string;
  fullname: string;
  createdAt: string; 
  token:string;
}