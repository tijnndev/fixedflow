import { RecurringPayment, PaymentOccurrence } from '../types/payment';

/**
 * Recurrence Logic:
 * - Monthly: Payment occurs on the specified day every month
 * - Quarterly: Payment occurs on the specified day every 3 months, starting from startDate month
 * - Yearly: Payment occurs on the specified day once per year, in the same month as startDate
 * 
 * startDate determines the reference point for quarterly and yearly payments.
 * For example:
 * - If startDate is 2024-01-15 and frequency is quarterly, payments occur in Jan, Apr, Jul, Oct
 * - If startDate is 2024-03-15 and frequency is quarterly, payments occur in Mar, Jun, Sep, Dec
 * - If startDate is 2024-02-15 and frequency is yearly, payment occurs every year in February
 */

/**
 * Check if a payment should occur in a given month
 */
export function shouldPaymentOccurInMonth(
  payment: RecurringPayment,
  year: number,
  month: number // 0-indexed (0 = January)
): boolean {
  const startDate = new Date(payment.startDate);
  const startYear = startDate.getFullYear();
  const startMonth = startDate.getMonth();

  // Create target date
  const targetDate = new Date(year, month, 1);
  
  // Payment hasn't started yet
  if (targetDate < new Date(startYear, startMonth, 1)) {
    return false;
  }

  if (payment.frequency === 'monthly') {
    return true;
  }

  if (payment.frequency === 'quarterly') {
    // Calculate months since start
    const monthsSinceStart = (year - startYear) * 12 + (month - startMonth);
    return monthsSinceStart >= 0 && monthsSinceStart % 3 === 0;
  }

  if (payment.frequency === 'yearly') {
    return month === startMonth;
  }

  return false;
}

/**
 * Get all payment occurrences for a specific month
 */
export function getPaymentOccurrencesForMonth(
  payments: RecurringPayment[],
  year: number,
  month: number // 0-indexed (0 = January)
): PaymentOccurrence[] {
  const occurrences: PaymentOccurrence[] = [];

  payments.forEach(payment => {
    if (shouldPaymentOccurInMonth(payment, year, month)) {
      // Ensure the due day is valid for this month
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      const actualDay = Math.min(payment.dueDay, daysInMonth);
      
      occurrences.push({
        payment,
        date: new Date(year, month, actualDay),
      });
    }
  });

  return occurrences;
}

/**
 * Get payment occurrences grouped by day for a specific month
 */
export function getPaymentsByDay(
  payments: RecurringPayment[],
  year: number,
  month: number
): Map<number, PaymentOccurrence[]> {
  const occurrences = getPaymentOccurrencesForMonth(payments, year, month);
  const byDay = new Map<number, PaymentOccurrence[]>();

  occurrences.forEach(occurrence => {
    const day = occurrence.date.getDate();
    if (!byDay.has(day)) {
      byDay.set(day, []);
    }
    byDay.get(day)!.push(occurrence);
  });

  return byDay;
}

/**
 * Calculate total amount due for a specific month
 */
export function calculateMonthlyTotal(
  payments: RecurringPayment[],
  year: number,
  month: number
): number {
  const occurrences = getPaymentOccurrencesForMonth(payments, year, month);
  return occurrences.reduce((sum, occurrence) => sum + occurrence.payment.amount, 0);
}

/**
 * Calculate total amount due for a specific day
 */
export function calculateDailyTotal(occurrences: PaymentOccurrence[]): number {
  return occurrences.reduce((sum, occurrence) => sum + occurrence.payment.amount, 0);
}

/**
 * Format currency in EUR
 */
export function formatCurrency(amount: number): string {
  return `€${amount.toFixed(2)}`;
}

/**
 * Get the number of days in a month
 */
export function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

/**
 * Get month name
 */
export function getMonthName(month: number): string {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  return months[month];
}
