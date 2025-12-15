import React from 'react';

// Core Enums
export enum UserRole {
  GUEST = 'GUEST',
  CONSUMER = 'CONSUMER',
  BUSINESS = 'BUSINESS',
  ADMIN = 'ADMIN'
}

export enum Currency {
  USD = 'USD',
  GBP = 'GBP',
  CAD = 'CAD',
  EUR = 'EUR',
  NGN = 'NGN'
}

export enum TransactionStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  ON_HOLD = 'ON_HOLD' // For fraud checks
}

export enum InvoiceStatus {
  DRAFT = 'DRAFT',
  SENT = 'SENT',
  PAID = 'PAID',
  OVERDUE = 'OVERDUE'
}

// Data Objects
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl: string;
  kycVerified: boolean;
  walletBalance: Record<Currency, number>;
  affiliateCode?: string;
  affiliateEarnings?: number;
}

export interface VendorProfile {
  id: string;
  businessName: string;
  tagline: string;
  description?: string;
  services: string[];
  rating: number;
  location: string;
  coverImage: string;
  hourlyRate: { min: number; max: number; currency: Currency };
  images?: string[];
}

export interface Transaction {
  id: string;
  date: string;
  amount: number;
  currency: Currency;
  type: 'TRANSFER' | 'PAYMENT' | 'PAYOUT' | 'COMMISSION';
  status: TransactionStatus;
  recipientName: string;
  recipientAvatar?: string;
  fee: number;
  fxRate?: number;
}

export interface AffiliateStat {
  period: string;
  clicks: number;
  signups: number;
  earnings: number;
}

export interface FXQuote {
  from: Currency;
  to: Currency;
  rate: number;
  expiresAt: number; // timestamp
}

export interface Invoice {
  id: string;
  vendorName: string;
  clientName: string;
  amount: number;
  currency: Currency;
  dueDate: string;
  status: InvoiceStatus;
  milestones: { description: string; amount: number; isPaid: boolean }[];
}

export interface NavigationItem {
  label: string;
  icon: React.ComponentType<any>;
  view: string;
}