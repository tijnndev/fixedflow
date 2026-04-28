export const de = {
  // Navigation
  nav: {
    list: 'Liste',
    agenda: 'Kalender',
    settings: 'Einstellungen',
  },

  // List Screen
  list: {
    title: 'Wiederkehrende Zahlungen',
    addPayment: '+ Zahlung Hinzufügen',
    emptyTitle: 'Noch Keine Zahlungen',
    emptyMessage: 'Fügen Sie Ihre erste wiederkehrende Zahlung hinzu, um Ihre monatlichen Ausgaben zu verfolgen.',
    editButton: 'Bearbeiten',
    deleteButton: 'Löschen',
  },

  // Agenda Screen
  agenda: {
    title: 'Zahlungskalender',
    totalMonth: 'Gesamt diesen Monat:',
    stillToPay: 'Noch zu zahlen:',
    selectDay: 'Wählen Sie einen Tag, um Zahlungen anzuzeigen',
    noPaymentsOn: 'Keine Zahlungen am',
    total: 'Gesamt:',
    emptyTitle: 'Noch Keine Zahlungen',
    emptyMessage: 'Fügen Sie Zahlungen im Listen-Tab hinzu, um sie in Ihrem Kalender zu sehen.',
  },

  // Settings Screen
  settings: {
    title: 'Einstellungen',
    appearance: 'Erscheinungsbild',
    theme: 'Design',
    themeLight: 'Hell',
    themeDark: 'Dunkel',
    themeSystem: 'System',
    language: 'Sprache',
    currency: 'Währung',
    selectCurrency: 'Währung auswählen',
    security: 'Sicherheit',
    biometricAuth: 'Biometrische Authentifizierung',
    biometricAuthDesc: 'Biometrische Authentifizierung beim App-Start erforderlich',
    biometricNotAvailable: 'Biometrische Authentifizierung ist auf diesem Gerät nicht verfügbar',
    biometricNotEnrolled: 'Bitte richten Sie zuerst die biometrische Authentifizierung in Ihren Geräteeinstellungen ein',
    categories: 'Kategorien',
    customCategories: 'Benutzerdefinierte Kategorien',
    addCategory: '+ Kategorie Hinzufügen',
    manageCategoriesTitle: 'Kategorien Verwalten',
    manageCategoriesDesc: 'Zahlungskategorien hinzufügen oder entfernen',
    deleteCategory: 'Löschen',
    enterCategoryName: 'Kategorienamen eingeben',
    categoryPlaceholder: 'z.B. Unterhaltung',
    cancel: 'Abbrechen',
    add: 'Hinzufügen',
    allCategories: 'Alle Kategorien',
  },

  // Payment Form
  form: {
    titleAdd: 'Zahlung Hinzufügen',
    titleEdit: 'Zahlung Bearbeiten',
    name: 'Name',
    namePlaceholder: 'z.B. Netflix-Abonnement',
    amount: 'Betrag (EUR)',
    amountPlaceholder: '0,00',
    frequency: 'Häufigkeit',
    monthly: 'Monatlich',
    quarterly: 'Vierteljährlich',
    yearly: 'Jährlich',
    installments: '3 Monate',
    dueDay: 'Fälligkeitstag (1-31)',
    dueDayPlaceholder: '1',
    startDate: 'Startdatum',
    startDatePlaceholder: 'JJJJ-MM-TT',
    startDateHelper: 'Bestimmt, wann vierteljährliche/jährliche Zahlungen stattfinden',
    category: 'Kategorie (optional)',
    required: '*',
    save: 'Speichern',
    cancel: 'Abbrechen',
  },

  // Default Categories
  defaultCategories: {
    rent: 'Miete',
    subscriptions: 'Abonnements',
    insurance: 'Versicherung',
    utilities: 'Nebenkosten',
    loans: 'Kredite',
    other: 'Sonstiges',
  },

  // Validation Messages
  validation: {
    errorTitle: 'Validierungsfehler',
    nameRequired: 'Bitte geben Sie einen Zahlungsnamen ein',
    amountInvalid: 'Bitte geben Sie einen gültigen Betrag ein',
    dueDayInvalid: 'Fälligkeitstag muss zwischen 1 und 31 liegen',
    categoryRequired: 'Bitte geben Sie einen Kategorienamen ein',
  },

  // Error Messages
  error: {
    title: 'Fehler',
    loadPayments: 'Zahlungen konnten nicht geladen werden',
    savePayment: 'Zahlung konnte nicht gespeichert werden',
    deletePayment: 'Zahlung konnte nicht gelöscht werden',
    loadSettings: 'Einstellungen konnten nicht geladen werden',
    saveSettings: 'Einstellungen konnten nicht gespeichert werden',
  },

  // Alerts
  alert: {
    deletePaymentTitle: 'Zahlung Löschen',
    deletePaymentMessage: 'Möchten Sie wirklich löschen',
    deleteCategoryTitle: 'Kategorie Löschen',
    deleteCategoryMessage: 'Möchten Sie diese Kategorie wirklich löschen?',
  },

  // Payment Status
  status: {
    pending: 'Ausstehend',
    paid: 'Bezahlt',
    skipped: 'Übersprungen',
    markAsPaid: 'Als Bezahlt Markieren',
    markAsSkipped: 'Als Übersprungen Markieren',
    markAsPending: 'Als Ausstehend Markieren',
    markedPaid: 'Zahlung als bezahlt markiert',
    markedSkipped: 'Zahlung als übersprungen markiert',
    markedPending: 'Zahlung als ausstehend markiert',
  },

  // Days of week
  days: {
    sun: 'So',
    mon: 'Mo',
    tue: 'Di',
    wed: 'Mi',
    thu: 'Do',
    fri: 'Fr',
    sat: 'Sa',
  },

  // Months
  months: {
    january: 'Januar',
    february: 'Februar',
    march: 'März',
    april: 'April',
    may: 'Mai',
    june: 'Juni',
    july: 'Juli',
    august: 'August',
    september: 'September',
    october: 'Oktober',
    november: 'November',
    december: 'Dezember',
  },
};
