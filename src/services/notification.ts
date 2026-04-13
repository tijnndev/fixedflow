import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import { RecurringPayment } from '../types/payment';
import { getPaymentOccurrencesForMonth, shouldPaymentOccurInMonth } from '../utils/recurrence';
import { paymentStatusService } from './paymentStatus';

// Configure notification behavior
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

/**
 * Request notification permissions
 */
export async function requestNotificationPermissions(): Promise<boolean> {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== 'granted') {
    return false;
  }

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('payment-reminders', {
      name: 'Payment Reminders',
      importance: Notifications.AndroidImportance.HIGH,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#4F46E5',
    });
  }

  return true;
}

/**
 * Get the next occurrence date for a payment
 */
function getNextPaymentDate(payment: RecurringPayment): Date | null {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();
  
  // Check next 12 months
  for (let i = 0; i < 12; i++) {
    const checkMonth = (currentMonth + i) % 12;
    const checkYear = currentYear + Math.floor((currentMonth + i) / 12);
    
    if (shouldPaymentOccurInMonth(payment, checkYear, checkMonth)) {
      const daysInMonth = new Date(checkYear, checkMonth + 1, 0).getDate();
      const actualDay = Math.min(payment.dueDay, daysInMonth);
      const paymentDate = new Date(checkYear, checkMonth, actualDay);
      
      // Only return if the date is in the future
      if (paymentDate > now) {
        return paymentDate;
      }
    }
  }
  
  return null;
}

/**
 * Schedule a notification for a payment reminder (day before payment)
 */
async function schedulePaymentNotification(payment: RecurringPayment): Promise<string | null> {
  try {
    const paymentDate = getNextPaymentDate(payment);
    
    if (!paymentDate) {
      return null;
    }
    
    // Check if this payment occurrence is already marked as paid
    const shouldNotify = await paymentStatusService.shouldNotify(payment.id, paymentDate);
    if (!shouldNotify) {
      return null; // Don't notify for paid payments
    }
    
    // Calculate notification date (day before payment)
    const notificationDate = new Date(paymentDate);
    notificationDate.setDate(notificationDate.getDate() - 1);
    notificationDate.setHours(9, 0, 0, 0); // Set to 9 AM
    
    const now = new Date();
    
    // Don't schedule if notification date is in the past
    if (notificationDate <= now) {
      return null;
    }
    
    // Calculate seconds until notification
    const secondsUntilNotification = Math.floor((notificationDate.getTime() - now.getTime()) / 1000);
    
    const notificationId = await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Payment Reminder',
        body: `${payment.name} is due tomorrow (${paymentDate.toLocaleDateString()})`,
        data: { paymentId: payment.id },
        sound: true,
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
        seconds: secondsUntilNotification,
        repeats: false,
      },
    });
    
    return notificationId;
  } catch (error) {
    console.error('Error scheduling notification:', error);
    return null;
  }
}

/**
 * Cancel all scheduled notifications for a specific payment
 */
async function cancelPaymentNotifications(paymentId: string): Promise<void> {
  try {
    const scheduledNotifications = await Notifications.getAllScheduledNotificationsAsync();
    
    for (const notification of scheduledNotifications) {
      if (notification.content.data?.paymentId === paymentId) {
        await Notifications.cancelScheduledNotificationAsync(notification.identifier);
      }
    }
  } catch (error) {
    console.error('Error canceling notifications:', error);
  }
}

/**
 * Schedule notifications for all payments
 */
export async function scheduleAllPaymentNotifications(payments: RecurringPayment[]): Promise<void> {
  try {
    // First, cancel all existing payment notifications
    await Notifications.cancelAllScheduledNotificationsAsync();
    
    // Schedule new notifications for each payment
    for (const payment of payments) {
      await schedulePaymentNotification(payment);
    }
  } catch (error) {
    console.error('Error scheduling all notifications:', error);
  }
}

/**
 * Cancel all payment notifications
 */
export async function cancelAllPaymentNotifications(): Promise<void> {
  try {
    await Notifications.cancelAllScheduledNotificationsAsync();
  } catch (error) {
    console.error('Error canceling all notifications:', error);
  }
}

/**
 * Get all scheduled notifications (for debugging)
 */
export async function getScheduledNotifications(): Promise<Notifications.NotificationRequest[]> {
  try {
    return await Notifications.getAllScheduledNotificationsAsync();
  } catch (error) {
    console.error('Error getting scheduled notifications:', error);
    return [];
  }
}

export const notificationService = {
  requestNotificationPermissions,
  scheduleAllPaymentNotifications,
  cancelAllPaymentNotifications,
  getScheduledNotifications,
};
