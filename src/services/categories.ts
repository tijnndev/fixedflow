import AsyncStorage from '@react-native-async-storage/async-storage';

const CATEGORIES_KEY = '@fixedflow_categories';
const INITIALIZED_KEY = '@fixedflow_categories_initialized';
// Old keys for migration
const OLD_CUSTOM_CATEGORIES_KEY = '@fixedflow_custom_categories';
const OLD_HIDDEN_CATEGORIES_KEY = '@fixedflow_hidden_categories';

const DEFAULT_CATEGORIES = [
  'Rent',
  'Subscriptions',
  'Insurance',
  'Utilities',
  'Loans',
  'Other',
];

export const categoriesService = {
  /**
   * Initialize categories with defaults on first app load
   * Also handles migration from old system
   */
  async initializeCategories(): Promise<void> {
    try {
      const initialized = await AsyncStorage.getItem(INITIALIZED_KEY);
      if (!initialized) {
        // Check for old data to migrate
        const oldCustom = await AsyncStorage.getItem(OLD_CUSTOM_CATEGORIES_KEY);
        const oldHidden = await AsyncStorage.getItem(OLD_HIDDEN_CATEGORIES_KEY);
        
        let categoriesToSave = [...DEFAULT_CATEGORIES];
        
        if (oldCustom || oldHidden) {
          // Migrate from old system
          const customCats = oldCustom ? JSON.parse(oldCustom) : [];
          const hiddenCats = oldHidden ? JSON.parse(oldHidden) : [];
          
          // Filter out hidden default categories and add custom ones
          const visibleDefaults = DEFAULT_CATEGORIES.filter(cat => !hiddenCats.includes(cat));
          categoriesToSave = [...visibleDefaults, ...customCats];
          
          // Clean up old keys
          await AsyncStorage.removeItem(OLD_CUSTOM_CATEGORIES_KEY);
          await AsyncStorage.removeItem(OLD_HIDDEN_CATEGORIES_KEY);
          
          console.log('Migrated categories from old system:', categoriesToSave);
        }
        
        await AsyncStorage.setItem(CATEGORIES_KEY, JSON.stringify(categoriesToSave));
        await AsyncStorage.setItem(INITIALIZED_KEY, 'true');
        console.log('Categories initialized:', categoriesToSave);
      }
    } catch (error) {
      console.error('Error initializing categories:', error);
    }
  },

  /**
   * Get all categories
   */
  async getAllCategories(): Promise<string[]> {
    try {
      await this.initializeCategories();
      const data = await AsyncStorage.getItem(CATEGORIES_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error loading categories:', error);
      return [];
    }
  },

  /**
   * Add a new category
   */
  async addCategory(category: string): Promise<void> {
    const categories = await this.getAllCategories();
    const trimmedCategory = category.trim();
    
    if (!trimmedCategory) {
      throw new Error('Category name cannot be empty');
    }

    // Check if category already exists (case-insensitive)
    if (categories.some(cat => cat.toLowerCase() === trimmedCategory.toLowerCase())) {
      throw new Error('Category already exists');
    }

    categories.push(trimmedCategory);
    await AsyncStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories));
  },

  /**
   * Delete a category
   */
  async deleteCategory(category: string): Promise<void> {
    console.log('deleteCategory called with:', category);
    const categories = await this.getAllCategories();
    console.log('Current categories:', categories);
    const filtered = categories.filter(cat => cat !== category);
    console.log('Filtered categories:', filtered);
    await AsyncStorage.setItem(CATEGORIES_KEY, JSON.stringify(filtered));
    console.log('Categories saved to AsyncStorage');
  },
};
