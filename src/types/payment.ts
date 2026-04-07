export type Frequency = 'monthly' | 'quarterly' | 'yearly';

export interface RecurringPayment {
  id: string;
  name: string;
  amount: number;
  frequency: Frequency;
  dueDay: number; // 1-31
  category?: string;
  startDate: string; // ISO date string - when this payment started
  createdAt: string;
  updatedAt: string;
}

export interface PaymentOccurrence {
  payment: RecurringPayment;
  date: Date;
}
