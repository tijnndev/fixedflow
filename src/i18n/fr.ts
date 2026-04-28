export const fr = {
  // Navigation
  nav: {
    list: 'Liste',
    agenda: 'Agenda',
    settings: 'Paramètres',
  },

  // List Screen
  list: {
    title: 'Paiements Récurrents',
    addPayment: '+ Ajouter Paiement',
    emptyTitle: 'Aucun Paiement',
    emptyMessage: 'Ajoutez votre premier paiement récurrent pour commencer à suivre vos dépenses mensuelles.',
    editButton: 'Modifier',
    deleteButton: 'Supprimer',
  },

  // Agenda Screen
  agenda: {
    title: 'Calendrier des Paiements',
    totalMonth: 'Total ce mois:',
    stillToPay: 'Reste à payer:',
    selectDay: 'Sélectionnez un jour pour voir les paiements',
    noPaymentsOn: 'Aucun paiement le',
    total: 'Total:',
    emptyTitle: 'Aucun Paiement',
    emptyMessage: 'Ajoutez des paiements dans l\'onglet Liste pour les voir sur votre calendrier.',
  },

  // Settings Screen
  settings: {
    title: 'Paramètres',
    appearance: 'Apparence',
    theme: 'Thème',
    themeLight: 'Clair',
    themeDark: 'Sombre',
    themeSystem: 'Système',
    language: 'Langue',
    currency: 'Devise',
    selectCurrency: 'Sélectionner la devise',
    security: 'Sécurité',
    biometricAuth: 'Authentification Biométrique',
    biometricAuthDesc: 'Exiger une authentification biométrique au démarrage de l\'application',
    biometricNotAvailable: 'L\'authentification biométrique n\'est pas disponible sur cet appareil',
    biometricNotEnrolled: 'Veuillez d\'abord configurer l\'authentification biométrique dans les paramètres de votre appareil',
    categories: 'Catégories',
    customCategories: 'Catégories Personnalisées',
    addCategory: '+ Ajouter Catégorie',
    manageCategoriesTitle: 'Gérer les Catégories',
    manageCategoriesDesc: 'Ajouter ou supprimer des catégories de paiement',
    deleteCategory: 'Supprimer',
    enterCategoryName: 'Entrez le nom de la catégorie',
    categoryPlaceholder: 'ex. Divertissement',
    cancel: 'Annuler',
    add: 'Ajouter',
    allCategories: 'Toutes les Catégories',
  },

  // Payment Form
  form: {
    titleAdd: 'Ajouter Paiement',
    titleEdit: 'Modifier Paiement',
    name: 'Nom',
    namePlaceholder: 'ex. Abonnement Netflix',
    amount: 'Montant (EUR)',
    amountPlaceholder: '0,00',
    frequency: 'Fréquence',
    monthly: 'Mensuel',
    quarterly: 'Trimestriel',
    yearly: 'Annuel',
    installments: '3 Mois',
    dueDay: 'Jour d\'échéance (1-31)',
    dueDayPlaceholder: '1',
    startDate: 'Date de début',
    startDatePlaceholder: 'AAAA-MM-JJ',
    startDateHelper: 'Détermine quand les paiements trimestriels/annuels se produisent',
    category: 'Catégorie (optionnel)',
    required: '*',
    save: 'Enregistrer',
    cancel: 'Annuler',
  },

  // Default Categories
  defaultCategories: {
    rent: 'Loyer',
    subscriptions: 'Abonnements',
    insurance: 'Assurance',
    utilities: 'Services Publics',
    loans: 'Prêts',
    other: 'Autre',
  },

  // Validation Messages
  validation: {
    errorTitle: 'Erreur de Validation',
    nameRequired: 'Veuillez entrer un nom de paiement',
    amountInvalid: 'Veuillez entrer un montant valide',
    dueDayInvalid: 'Le jour d\'échéance doit être entre 1 et 31',
    categoryRequired: 'Veuillez entrer un nom de catégorie',
  },

  // Error Messages
  error: {
    title: 'Erreur',
    loadPayments: 'Échec du chargement des paiements',
    savePayment: 'Échec de l\'enregistrement du paiement',
    deletePayment: 'Échec de la suppression du paiement',
    loadSettings: 'Échec du chargement des paramètres',
    saveSettings: 'Échec de l\'enregistrement des paramètres',
  },

  // Alerts
  alert: {
    deletePaymentTitle: 'Supprimer le Paiement',
    deletePaymentMessage: 'Êtes-vous sûr de vouloir supprimer',
    deleteCategoryTitle: 'Supprimer la Catégorie',
    deleteCategoryMessage: 'Êtes-vous sûr de vouloir supprimer cette catégorie?',
  },

  // Payment Status
  status: {
    pending: 'En Attente',
    paid: 'Payé',
    skipped: 'Ignoré',
    markAsPaid: 'Marquer comme Payé',
    markAsSkipped: 'Marquer comme Ignoré',
    markAsPending: 'Marquer comme En Attente',
    markedPaid: 'Paiement marqué comme payé',
    markedSkipped: 'Paiement marqué comme ignoré',
    markedPending: 'Paiement marqué comme en attente',
  },

  // Days of week
  days: {
    sun: 'Dim',
    mon: 'Lun',
    tue: 'Mar',
    wed: 'Mer',
    thu: 'Jeu',
    fri: 'Ven',
    sat: 'Sam',
  },

  // Months
  months: {
    january: 'Janvier',
    february: 'Février',
    march: 'Mars',
    april: 'Avril',
    may: 'Mai',
    june: 'Juin',
    july: 'Juillet',
    august: 'Août',
    september: 'Septembre',
    october: 'Octobre',
    november: 'Novembre',
    december: 'Décembre',
  },
};
