import AsyncStorage from '@react-native-async-storage/async-storage';

const MONTH_PERIOD_KEY = '@fixedflow_month_period_start_day';

/**
 * Service for the "month period" setting.
 *
 * The month period defines which days count as "one month" for totals like
 * "still to pay". By default a month runs from the 1st to the last day.
 * Users can shift the start day (e.g. 25), so a month then runs from the
 * 25th until the day before the next 25th (25th - 24th).
 */
export const monthPeriodService = {
  /**
   * Get the start day of the month period (1-31, default 1)
   */
  async getStartDay(): Promise<number> {
    try {
      const value = await AsyncStorage.getItem(MONTH_PERIOD_KEY);
      if (value) {
        const day = parseInt(value, 10);
        if (!isNaN(day) && day >= 1 && day <= 31) {
          return day;
        }
      }
      return 1;
    } catch (error) {
      console.error('Error loading month period:', error);
      return 1;
    }
  },

  /**
   * Set the start day of the month period (1-31)
   */
  async setStartDay(day: number): Promise<void> {
    try {
      const clamped = Math.min(31, Math.max(1, Math.round(day)));
      await AsyncStorage.setItem(MONTH_PERIOD_KEY, String(clamped));
    } catch (error) {
      console.error('Error saving month period:', error);
      throw error;
    }
  },

  /**
   * Get the date range of the month period anchored to a given month.
   *
   * The period starts on `startDay` of the given month (clamped to the
   * number of days in that month) and ends on the day before the next
   * occurrence of `startDay`.
   *
   * Example: startDay 25, month March -> March 25 .. April 24
   */
  getPeriodRange(
    year: number,
    month: number, // 0-indexed
    startDay: number
  ): { start: Date; end: Date } {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const actualStartDay = Math.min(startDay, daysInMonth);
    const start = new Date(year, month, actualStartDay);

    const nextMonth = month + 1;
    const nextYear = Math.floor(nextMonth / 12) + year;
    const nextMonthIndex = nextMonth % 12;
    const daysInNextMonth = new Date(nextYear, nextMonthIndex + 1, 0).getDate();
    const endDay = Math.min(startDay - 1, daysInNextMonth);
    const end = new Date(nextYear, nextMonthIndex, endDay);

    return { start, end };
  },
};