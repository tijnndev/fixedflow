export type Frequency = 'monthly' | 'quarterly' | 'yearly' | 'installments';

export type PaymentStatus = 'pending' | 'paid' | 'skipped';

export interface PaymentOccurrenceStatus {
  paymentId: string;
  date: string; // YYYY-MM-DD format
  status: PaymentStatus;
  markedAt?: string; // ISO timestamp when status was set
}

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
  status?: PaymentStatus; // Runtime status for this occurrence
}
