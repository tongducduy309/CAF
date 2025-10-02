import { User } from "./user.model";

export interface Address {
    id: string;
    receiverName: string;
    phone: string;
    line1: string;
    line2?: string;
    district: string;
    city: string;
    latitude?: number;
    longitude?: number;
    isDefault: boolean;
}