import { useState, useEffect } from 'react';
import { currencyService, Currency, CURRENCIES } from '../services/currency';

export function useCurrency() {
  const [currency, setCurrency] = useState<Currency>(CURRENCIES[0]);

  const loadCurrency = async () => {
    const selectedCurrency = await currencyService.getCurrency();
    setCurrency(selectedCurrency);
  };

  useEffect(() => {
    loadCurrency();
  }, []);

  const formatAmount = (amount: number): string => {
    return currencyService.formatWithCurrency(amount, currency);
  };

  return {
    currency,
    formatCurrency: formatAmount,
    reloadCurrency: loadCurrency,
  };
}
