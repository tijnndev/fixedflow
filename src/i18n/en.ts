export const en = {
  // Navigation
  nav: {
    list: 'List',
    agenda: 'Agenda',
    settings: 'Settings',
  },

  // List Screen
  list: {
    title: 'Recurring Payments',
    addPayment: '+ Add Payment',
    emptyTitle: 'No Payments Yet',
    emptyMessage: 'Add your first recurring payment to get started tracking your monthly expenses.',
    editButton: 'Edit',
    deleteButton: 'Delete',
  },

  // Agenda Screen
  agenda: {
    title: 'Payment Calendar',
    totalMonth: 'Total this month:',
    stillToPay: 'Still to pay:',
    selectDay: 'Select a day to view payments',
    noPaymentsOn: 'No payments on',
    total: 'Total:',
    emptyTitle: 'No Payments Yet',
    emptyMessage: 'Add payments in the List tab to see them on your calendar.',
  },

  // Settings Screen
  settings: {
    title: 'Settings',
    appearance: 'Appearance',
    theme: 'Theme',
    themeLight: 'Light',
    themeDark: 'Dark',
    themeSystem: 'System',
    language: 'Language',
    currency: 'Currency',
    selectCurrency: 'Select Currency',
    security: 'Security',
    biometricAuth: 'Biometric Authentication',
    biometricAuthDesc: 'Require biometric authentication on app startup',
    biometricNotAvailable: 'Biometric authentication is not available on this device',
    biometricNotEnrolled: 'Please enroll biometric authentication in your device settings first',
    categories: 'Categories',
    customCategories: 'Custom Categories',
    addCategory: '+ Add Category',
    manageCategoriesTitle: 'Manage Categories',
    manageCategoriesDesc: 'Add or remove custom payment categories',
    deleteCategory: 'Delete',
    enterCategoryName: 'Enter category name',
    categoryPlaceholder: 'e.g., Entertainment',
    cancel: 'Cancel',
    add: 'Add',
    allCategories: 'All Categories',
  },

  // Payment Form
  form: {
    titleAdd: 'Add Payment',
    titleEdit: 'Edit Payment',
    name: 'Name',
    namePlaceholder: 'e.g., Netflix subscription',
    amount: 'Amount (EUR)',
    amountPlaceholder: '0.00',
    frequency: 'Frequency',
    monthly: 'Monthly',
    quarterly: 'Quarterly',
    yearly: 'Yearly',
    installments: '3 Months',
    dueDay: 'Due Day (1-31)',
    dueDayPlaceholder: '1',
    startDate: 'Start Date',
    startDatePlaceholder: 'YYYY-MM-DD',
    startDateHelper: 'Determines when quarterly/yearly payments occur',
    category: 'Category (optional)',
    required: '*',
    save: 'Save',
    cancel: 'Cancel',
  },

  // Default Categories
  defaultCategories: {
    rent: 'Rent',
    subscriptions: 'Subscriptions',
    insurance: 'Insurance',
    utilities: 'Utilities',
    loans: 'Loans',
    other: 'Other',
  },

  // Validation Messages
  validation: {
    errorTitle: 'Validation Error',
    nameRequired: 'Please enter a payment name',
    amountInvalid: 'Please enter a valid amount',
    dueDayInvalid: 'Due day must be between 1 and 31',
    categoryRequired: 'Please enter a category name',
  },

  // Error Messages
  error: {
    title: 'Error',
    loadPayments: 'Failed to load payments',
    savePayment: 'Failed to save payment',
    deletePayment: 'Failed to delete payment',
    loadSettings: 'Failed to load settings',
    saveSettings: 'Failed to save settings',
  },

  // Alerts
  alert: {
    deletePaymentTitle: 'Delete Payment',
    deletePaymentMessage: 'Are you sure you want to delete',
    deleteCategoryTitle: 'Delete Category',
    deleteCategoryMessage: 'Are you sure you want to delete this category?',
  },

  // Payment Status
  status: {
    pending: 'Pending',
    paid: 'Paid',
    skipped: 'Skipped',
    markAsPaid: 'Mark as Paid',
    markAsSkipped: 'Mark as Skipped',
    markAsPending: 'Mark as Pending',
    markedPaid: 'Payment marked as paid',
    markedSkipped: 'Payment marked as skipped',
    markedPending: 'Payment marked as pending',
  },

  // Days of week
  days: {
    sun: 'Sun',
    mon: 'Mon',
    tue: 'Tue',
    wed: 'Wed',
    thu: 'Thu',
    fri: 'Fri',
    sat: 'Sat',
  },

  // Months
  months: {
    january: 'January',
    february: 'February',
    march: 'March',
    april: 'April',
    may: 'May',
    june: 'June',
    july: 'July',
    august: 'August',
    september: 'September',
    october: 'October',
    november: 'November',
    december: 'December',
  },
};
