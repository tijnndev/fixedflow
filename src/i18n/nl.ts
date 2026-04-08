export const nl = {
  // Navigation
  nav: {
    list: 'Lijst',
    agenda: 'Agenda',
    settings: 'Instellingen',
  },

  // List Screen
  list: {
    title: 'Terugkerende Betalingen',
    addPayment: '+ Betaling Toevoegen',
    emptyTitle: 'Nog Geen Betalingen',
    emptyMessage: 'Voeg je eerste terugkerende betaling toe om je maandelijkse uitgaven bij te houden.',
    editButton: 'Bewerken',
    deleteButton: 'Verwijderen',
  },

  // Agenda Screen
  agenda: {
    title: 'Betalingskalender',
    totalMonth: 'Totaal deze maand:',
    selectDay: 'Selecteer een dag om betalingen te bekijken',
    noPaymentsOn: 'Geen betalingen op',
    total: 'Totaal:',
    emptyTitle: 'Nog Geen Betalingen',
    emptyMessage: 'Voeg betalingen toe in het Lijst tabblad om ze op je kalender te zien.',
  },

  // Settings Screen
  settings: {
    title: 'Instellingen',
    appearance: 'Weergave',
    theme: 'Thema',
    themeLight: 'Licht',
    themeDark: 'Donker',
    themeSystem: 'Systeem',
    language: 'Taal',
    currency: 'Valuta',
    selectCurrency: 'Selecteer Valuta',
    security: 'Beveiliging',
    biometricAuth: 'Biometrische Authenticatie',
    biometricAuthDesc: 'Vereist biometrische authenticatie bij het opstarten van de app',
    biometricNotAvailable: 'Biometrische authenticatie is niet beschikbaar op dit apparaat',
    biometricNotEnrolled: 'Stel eerst biometrische authenticatie in via je apparaatinstellingen',
    categories: 'Categorieën',
    customCategories: 'Aangepaste Categorieën',
    addCategory: '+ Categorie Toevoegen',
    manageCategoriesTitle: 'Categorieën Beheren',
    manageCategoriesDesc: 'Voeg aangepaste betalingscategorieën toe of verwijder ze',
    deleteCategory: 'Verwijderen',
    enterCategoryName: 'Voer categorienaam in',
    categoryPlaceholder: 'bijv. Entertainment',
    cancel: 'Annuleren',
    add: 'Toevoegen',
    allCategories: 'Alle Categorieën',
  },

  // Payment Form
  form: {
    titleAdd: 'Betaling Toevoegen',
    titleEdit: 'Betaling Bewerken',
    name: 'Naam',
    namePlaceholder: 'bijv. Netflix abonnement',
    amount: 'Bedrag (EUR)',
    amountPlaceholder: '0,00',
    frequency: 'Frequentie',
    monthly: 'Maandelijks',
    quarterly: 'Kwartaal',
    yearly: 'Jaarlijks',
    dueDay: 'Vervaldatum (1-31)',
    dueDayPlaceholder: '1',
    startDate: 'Startdatum',
    startDatePlaceholder: 'JJJJ-MM-DD',
    startDateHelper: 'Bepaalt wanneer kwartaal-/jaarlijkse betalingen plaatsvinden',
    category: 'Categorie (optioneel)',
    required: '*',
    save: 'Opslaan',
    cancel: 'Annuleren',
  },

  // Default Categories
  defaultCategories: {
    rent: 'Huur',
    subscriptions: 'Abonnementen',
    insurance: 'Verzekering',
    utilities: 'Nutsvoorzieningen',
    loans: 'Leningen',
    other: 'Overig',
  },

  // Validation Messages
  validation: {
    errorTitle: 'Validatiefout',
    nameRequired: 'Voer een betalingsnaam in',
    amountInvalid: 'Voer een geldig bedrag in',
    dueDayInvalid: 'Vervaldatum moet tussen 1 en 31 liggen',
    categoryRequired: 'Voer een categorienaam in',
  },

  // Error Messages
  error: {
    title: 'Fout',
    loadPayments: 'Kan betalingen niet laden',
    savePayment: 'Kan betaling niet opslaan',
    deletePayment: 'Kan betaling niet verwijderen',
    loadSettings: 'Kan instellingen niet laden',
    saveSettings: 'Kan instellingen niet opslaan',
  },

  // Alerts
  alert: {
    deletePaymentTitle: 'Betaling Verwijderen',
    deletePaymentMessage: 'Weet je zeker dat je wilt verwijderen',
    deleteCategoryTitle: 'Categorie Verwijderen',
    deleteCategoryMessage: 'Weet je zeker dat je deze categorie wilt verwijderen?',
  },

  // Days of week
  days: {
    sun: 'Zo',
    mon: 'Ma',
    tue: 'Di',
    wed: 'Wo',
    thu: 'Do',
    fri: 'Vr',
    sat: 'Za',
  },

  // Months
  months: {
    january: 'Januari',
    february: 'Februari',
    march: 'Maart',
    april: 'April',
    may: 'Mei',
    june: 'Juni',
    july: 'Juli',
    august: 'Augustus',
    september: 'September',
    october: 'Oktober',
    november: 'November',
    december: 'December',
  },
};
