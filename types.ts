
export type UserRole = 'buyer' | 'seller' | 'both';
export type Language = 'PT' | 'EN';
export type Currency = 'MZN' | 'USD';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  photo?: string;
  location: {
    province: string;
    district: string;
  };
  role: UserRole;
  isVerified: boolean;
  isPremium: boolean;
  score: number; // 0-100
  language: Language;
  currency: Currency;
  wallet: {
    available: number;
    pending: number;
  };
}

export interface Product {
  id: string;
  sellerId: string;
  title: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  location: string;
  condition: 'new' | 'used';
  deliveryMethods: string[];
  estimatedDelivery: string;
  rating: number;
  reviewCount: number;
  isSponsored?: boolean;
  trackingCode?: string;
}

export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  isRead: boolean;
}

export interface ChatSession {
  id: string;
  participantId: string;
  participantName: string;
  participantPhoto?: string;
  productId: string;
  productTitle: string;
  productPrice: number;
  productImage: string;
  messages: Message[];
  lastMessageSnippet: string;
  lastMessageTimestamp: string;
}

export interface Transaction {
  id: string;
  productId: string;
  buyerId: string;
  sellerId: string;
  amount: number;
  commission: number;
  taxFee: number;
  status: 'pending' | 'escrow' | 'completed' | 'disputed';
  date: string;
  receiptUrl?: string;
}

export const MOZ_PROVINCES = [
  "Cabo Delgado", "Gaza", "Inhambane", "Manica", "Maputo Cidade", "Maputo Província", "Nampula", "Niassa", "Sofala", "Tete", "Zambézia"
];
