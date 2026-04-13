import AsyncStorage from '@react-native-async-storage/async-storage';
import { RecurringPayment } from '../types/payment';
import { paymentStatusService } from './paymentStatus';

const STORAGE_KEY = '@fixedflow_payments';

export const storageService = {
  /**
   * Get all payments from storage
   */
  async getPayments(): Promise<RecurringPayment[]> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error loading payments:', error);
      return [];
    }
  },

  /**
   * Save all payments to storage
   */
  async savePayments(payments: RecurringPayment[]): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(payments));
    } catch (error) {
      console.error('Error saving payments:', error);
      throw error;
    }
  },

  /**
   * Add a new payment
   */
  async addPayment(payment: Omit<RecurringPayment, 'id' | 'createdAt' | 'updatedAt'>): Promise<RecurringPayment> {
    const payments = await this.getPayments();
    const newPayment: RecurringPayment = {
      ...payment,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    payments.push(newPayment);
    await this.savePayments(payments);
    return newPayment;
  },

  /**
   * Update an existing payment
   */
  async updatePayment(id: string, updates: Partial<RecurringPayment>): Promise<void> {
    const payments = await this.getPayments();
    const index = payments.findIndex(p => p.id === id);
    if (index !== -1) {
      payments[index] = {
        ...payments[index],
        ...updates,
        id, // Ensure id doesn't change
        updatedAt: new Date().toISOString(),
      };
      await this.savePayments(payments);
    }
  },

  /**
   * Delete a payment
   */
  async deletePayment(id: string): Promise<void> {
    const payments = await this.getPayments();
    const filtered = payments.filter(p => p.id !== id);
    await this.savePayments(filtered);
    
    // Also delete associated payment statuses
    await paymentStatusService.deletePaymentStatuses(id);
  },

  /**
   * Clear all data (useful for testing)
   */
  async clearAll(): Promise<void> {
    await AsyncStorage.removeItem(STORAGE_KEY);
  },
};
