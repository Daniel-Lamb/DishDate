export interface PaymentMethod {
  id: string;
  type: 'card' | 'paypal';
  last4: string;
  expiryMonth: string;
  expiryYear: string;
  brand: string;
  isDefault: boolean;
}

export interface Transaction {
  id: string;
  date: string;
  amount: number;
  description: string;
  type: 'payment' | 'refund';
  status: 'completed' | 'pending' | 'failed';
  paymentMethod: string;
}