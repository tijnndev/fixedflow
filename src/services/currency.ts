import AsyncStorage from '@react-native-async-storage/async-storage';

const CURRENCY_KEY = '@fixedflow_currency';

export interface Currency {
  code: string;
  symbol: string;
  name: string;
}

export const CURRENCIES: Currency[] = [
  { code: 'EUR', symbol: '€', name: 'Euro (€)' },
  { code: 'USD', symbol: '$', name: 'US Dollar ($)' },
  { code: 'GBP', symbol: '£', name: 'British Pound (£)' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen (¥)' },
  { code: 'CHF', symbol: 'CHF', name: 'Swiss Franc (CHF)' },
  { code: 'CAD', symbol: 'CA$', name: 'Canadian Dollar (CA$)' },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar (A$)' },
  { code: 'CNY', symbol: '¥', name: 'Chinese Yuan (¥)' },
  { code: 'INR', symbol: '₹', name: 'Indian Rupee (₹)' },
  { code: 'BRL', symbol: 'R$', name: 'Brazilian Real (R$)' },
  { code: 'ZAR', symbol: 'R', name: 'South African Rand (R)' },
  { code: 'SEK', symbol: 'kr', name: 'Swedish Krona (kr)' },
  { code: 'NOK', symbol: 'kr', name: 'Norwegian Krone (kr)' },
  { code: 'DKK', symbol: 'kr', name: 'Danish Krone (kr)' },
  { code: 'PLN', symbol: 'zł', name: 'Polish Zloty (zł)' },
  { code: 'CZK', symbol: 'Kč', name: 'Czech Koruna (Kč)' },
  { code: 'HUF', symbol: 'Ft', name: 'Hungarian Forint (Ft)' },
  { code: 'RON', symbol: 'lei', name: 'Romanian Leu (lei)' },
  { code: 'TRY', symbol: '₺', name: 'Turkish Lira (₺)' },
  { code: 'RUB', symbol: '₽', name: 'Russian Ruble (₽)' },
  { code: 'MXN', symbol: 'MX$', name: 'Mexican Peso (MX$)' },
  { code: 'ARS', symbol: 'AR$', name: 'Argentine Peso (AR$)' },
  { code: 'CLP', symbol: 'CL$', name: 'Chilean Peso (CL$)' },
  { code: 'COP', symbol: 'CO$', name: 'Colombian Peso (CO$)' },
  { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar (S$)' },
  { code: 'HKD', symbol: 'HK$', name: 'Hong Kong Dollar (HK$)' },
  { code: 'NZD', symbol: 'NZ$', name: 'New Zealand Dollar (NZ$)' },
  { code: 'KRW', symbol: '₩', name: 'South Korean Won (₩)' },
  { code: 'THB', symbol: '฿', name: 'Thai Baht (฿)' },
  { code: 'MYR', symbol: 'RM', name: 'Malaysian Ringgit (RM)' },
  { code: 'IDR', symbol: 'Rp', name: 'Indonesian Rupiah (Rp)' },
  { code: 'PHP', symbol: '₱', name: 'Philippine Peso (₱)' },
  { code: 'VND', symbol: '₫', name: 'Vietnamese Dong (₫)' },
  { code: 'ILS', symbol: '₪', name: 'Israeli Shekel (₪)' },
  { code: 'AED', symbol: 'د.إ', name: 'UAE Dirham (د.إ)' },
  { code: 'SAR', symbol: '﷼', name: 'Saudi Riyal (﷼)' },
];

export const currencyService = {
  /**
   * Get the currently selected currency
   */
  async getCurrency(): Promise<Currency> {
    try {
      const code = await AsyncStorage.getItem(CURRENCY_KEY);
      if (code) {
        const currency = CURRENCIES.find(c => c.code === code);
        if (currency) return currency;
      }
      // Default to EUR
      return CURRENCIES[0];
    } catch (error) {
      console.error('Error loading currency:', error);
      return CURRENCIES[0];
    }
  },

  /**
   * Set the selected currency
   */
  async setCurrency(code: string): Promise<void> {
    try {
      await AsyncStorage.setItem(CURRENCY_KEY, code);
    } catch (error) {
      console.error('Error saving currency:', error);
      throw error;
    }
  },

  /**
   * Format amount with the selected currency
   */
  async formatCurrency(amount: number): Promise<string> {
    const currency = await this.getCurrency();
    return this.formatWithCurrency(amount, currency);
  },

  /**
   * Format amount with a specific currency
   */
  formatWithCurrency(amount: number, currency: Currency): string {
    // For currencies with symbol at the end
    const symbolAtEnd = ['SEK', 'NOK', 'DKK', 'CZK', 'HUF', 'RON'];
    
    if (symbolAtEnd.includes(currency.code)) {
      return `${amount.toFixed(2)} ${currency.symbol}`;
    }
    
    return `${currency.symbol}${amount.toFixed(2)}`;
  },
};
