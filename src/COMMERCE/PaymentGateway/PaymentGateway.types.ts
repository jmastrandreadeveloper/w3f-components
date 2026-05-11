import type React from 'react';

export type PaymentMethod =
  | 'credit-card'
  | 'debit-card'
  | 'mercadopago'
  | 'paypal'
  | 'bank-transfer';

export type CardBrand = 'visa' | 'mastercard' | 'amex' | 'unknown';

export interface CardData {
  number: string;
  name: string;
  expiry: string;
  cvv: string;
}

export interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

export interface PaymentData {
  method: PaymentMethod;
  card?: CardData;
  amount: number;
  currency: string;
}

export interface CardValidation {
  number: boolean | null;
  name: boolean | null;
  expiry: boolean | null;
  cvv: boolean | null;
}

export interface PaymentGatewayProps {
  amount: number;
  currency?: string;
  currencySymbol?: string;
  methods?: PaymentMethod[];
  defaultMethod?: PaymentMethod;
  variant?: 'default' | 'compact' | 'inline' | 'stepped';
  color?: 'primary' | 'secondary' | 'info' | 'dark';
  showOrderSummary?: boolean;
  orderItems?: OrderItem[];
  onPayment?: (data: PaymentData) => void | Promise<void>;
  onMethodChange?: (method: PaymentMethod) => void;
  loading?: boolean;
  error?: string | null;
  success?: boolean;
  successMessage?: string;
  className?: string;
}
