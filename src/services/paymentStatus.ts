import AsyncStorage from '@react-native-async-storage/async-storage';
import { PaymentOccurrenceStatus, PaymentStatus } from '../types/payment';

const STORAGE_KEY = '@fixedflow_payment_statuses';

/**
 * Service for managing payment occurrence statuses (paid, skipped, pending)
 */
class PaymentStatusService {
  /**
   * Get all payment occurrence statuses
   */
  async getAllStatuses(): Promise<PaymentOccurrenceStatus[]> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error loading payment statuses:', error);
      return [];
    }
  }

  /**
   * Get status for a specific payment occurrence
   */
  async getStatus(paymentId: string, date: Date): Promise<PaymentStatus> {
    try {
      const dateKey = this.formatDate(date);
      const statuses = await this.getAllStatuses();
      const status = statuses.find(
        s => s.paymentId === paymentId && s.date === dateKey
      );
      return status?.status || 'pending';
    } catch (error) {
      console.error('Error getting payment status:', error);
      return 'pending';
    }
  }

  /**
   * Set status for a payment occurrence
   */
  async setStatus(
    paymentId: string,
    date: Date,
    status: PaymentStatus
  ): Promise<void> {
    try {
      const dateKey = this.formatDate(date);
      const statuses = await this.getAllStatuses();
      
      // Remove existing status for this occurrence
      const filtered = statuses.filter(
        s => !(s.paymentId === paymentId && s.date === dateKey)
      );

      // Add new status (only if not pending, to save storage)
      if (status !== 'pending') {
        filtered.push({
          paymentId,
          date: dateKey,
          status,
          markedAt: new Date().toISOString(),
        });
      }

      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    } catch (error) {
      console.error('Error setting payment status:', error);
      throw error;
    }
  }

  /**
   * Get all statuses for a specific payment
   */
  async getPaymentStatuses(paymentId: string): Promise<PaymentOccurrenceStatus[]> {
    try {
      const statuses = await this.getAllStatuses();
      return statuses.filter(s => s.paymentId === paymentId);
    } catch (error) {
      console.error('Error getting payment statuses:', error);
      return [];
    }
  }

  /**
   * Delete all statuses for a specific payment (when payment is deleted)
   */
  async deletePaymentStatuses(paymentId: string): Promise<void> {
    try {
      const statuses = await this.getAllStatuses();
      const filtered = statuses.filter(s => s.paymentId !== paymentId);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    } catch (error) {
      console.error('Error deleting payment statuses:', error);
      throw error;
    }
  }

  /**
   * Get statuses for a specific month
   */
  async getMonthStatuses(
    year: number,
    month: number
  ): Promise<Map<string, PaymentOccurrenceStatus[]>> {
    try {
      const statuses = await this.getAllStatuses();
      const monthKey = `${year}-${String(month + 1).padStart(2, '0')}`;
      
      const monthStatuses = statuses.filter(s => s.date.startsWith(monthKey));
      
      // Group by date
      const grouped = new Map<string, PaymentOccurrenceStatus[]>();
      monthStatuses.forEach(status => {
        const existing = grouped.get(status.date) || [];
        existing.push(status);
        grouped.set(status.date, existing);
      });
      
      return grouped;
    } catch (error) {
      console.error('Error getting month statuses:', error);
      return new Map();
    }
  }

  /**
   * Clean up old statuses (older than 1 year)
   */
  async cleanupOldStatuses(): Promise<void> {
    try {
      const statuses = await this.getAllStatuses();
      const oneYearAgo = new Date();
      oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
      const cutoffDate = this.formatDate(oneYearAgo);

      const filtered = statuses.filter(s => s.date >= cutoffDate);
      
      if (filtered.length !== statuses.length) {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
      }
    } catch (error) {
      console.error('Error cleaning up old statuses:', error);
    }
  }

  /**
   * Format date to YYYY-MM-DD
   */
  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  /**
   * Check if a payment occurrence should be notified (not paid)
   */
  async shouldNotify(paymentId: string, date: Date): Promise<boolean> {
    const status = await this.getStatus(paymentId, date);
    return status !== 'paid'; // Notify if not paid (pending or skipped)
  }
}

export const paymentStatusService = new PaymentStatusService();
