
import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Modal,
  FlatList,
  Switch,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { useTheme, ThemeType, ThemeColors } from '../theme/ThemeContext';
import { useI18n, Language } from '../i18n';
import { categoriesService } from '../services/categories';
import { currencyService, Currency, CURRENCIES } from '../services/currency';
import { biometricService } from '../services/biometric';
import { Ionicons } from '@expo/vector-icons';

export const SettingsScreen: React.FC = () => {
  const { colors, isDark, theme, setTheme } = useTheme();
  const { language, t, setLanguage } = useI18n();
  const insets = useSafeAreaInsets();
  const styles = getStyles(colors, isDark);

  const [categories, setCategories] = useState<string[]>([]);
  const [newCategory, setNewCategory] = useState('');
  const [showCategoryInput, setShowCategoryInput] = useState(false);
  const [currency, setCurrencyState] = useState<Currency>(CURRENCIES[0]);
  const [showCurrencyPicker, setShowCurrencyPicker] = useState(false);
  const [biometricEnabled, setBiometricEnabled] = useState(false);
  const [biometricAvailable, setBiometricAvailable] = useState(false);
  const [biometricType, setBiometricType] = useState('Biometric');

  const loadSettings = async () => {
    try {
      const allCategories = await categoriesService.getAllCategories();
      setCategories(allCategories);
      
      const selectedCurrency = await currencyService.getCurrency();
      setCurrencyState(selectedCurrency);

      // Load biometric settings
      const available = await biometricService.isAvailable();
      setBiometricAvailable(available);
      if (available) {
        const enabled = await biometricService.isEnabled();
        setBiometricEnabled(enabled);
        const type = await biometricService.getBiometricTypeName();
        setBiometricType(type);
      }
    } catch (error) {
      Alert.alert(t.error.title, t.error.loadSettings);
    }
  };

  const handleBiometricToggle = async (value: boolean) => {
    if (!biometricAvailable) {
      Alert.alert(t.error.title, t.settings.biometricNotAvailable);
      return;
    }

    if (value) {
      // Enabling - authenticate first
      const success = await biometricService.authenticate(`Enable ${biometricType} Authentication`);
      if (success) {
        await biometricService.setEnabled(true);
        setBiometricEnabled(true);
      }
    } else {
      // Disabling
      await biometricService.setEnabled(false);
      setBiometricEnabled(false);
    }
  };

  const handleCurrencyChange = async (selectedCurrency: Currency) => {
    try {
      await currencyService.setCurrency(selectedCurrency.code);
      setCurrencyState(selectedCurrency);
      setShowCurrencyPicker(false);
    } catch (error) {
      Alert.alert(t.error.title, t.error.saveSettings);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadSettings();
    }, [])
  );

  const handleAddCategory = async () => {
    if (!newCategory.trim()) {
      Alert.alert(t.validation.errorTitle, t.validation.categoryRequired);
      return;
    }

    try {
      await categoriesService.addCategory(newCategory);
      setNewCategory('');
      setShowCategoryInput(false);
      await loadSettings();
    } catch (error: any) {
      Alert.alert(t.error.title, error.message || t.error.saveSettings);
    }
  };

  const handleDeleteCategory = async (category: string) => {
    // Simple direct delete for debugging - we'll add confirmation back later
    try {
      await categoriesService.deleteCategory(category);
      await loadSettings();
    } catch (error) {
      console.error('Error deleting category:', error);
      Alert.alert(t.error.title, t.error.saveSettings);
    }
  };

  const ThemeOption: React.FC<{ value: ThemeType; label: string }> = ({ value, label }) => (
    <TouchableOpacity
      style={[styles.option, theme === value && styles.optionSelected]}
      onPress={() => setTheme(value)}
    >
      <Text style={[styles.optionText, theme === value && styles.optionTextSelected]}>
        {label}
      </Text>
      {theme === value && <Ionicons name="checkmark" size={20} color={colors.primary} />}
    </TouchableOpacity>
  );

  const LanguageOption: React.FC<{ value: Language; label: string }> = ({ value, label }) => (
    <TouchableOpacity
      style={[styles.option, language === value && styles.optionSelected]}
      onPress={() => setLanguage(value)}
    >
      <Text style={[styles.optionText, language === value && styles.optionTextSelected]}>
        {label}
      </Text>
      {language === value && <Ionicons name="checkmark" size={20} color={colors.primary} />}
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.title}>{t.settings.title}</Text>
      </View>

      <ScrollView style={styles.content}>
        {/* Appearance Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t.settings.appearance}</Text>
          
          <View style={styles.settingGroup}>
            <Text style={styles.settingLabel}>{t.settings.theme}</Text>
            <View style={styles.optionsContainer}>
              <ThemeOption value="light" label={t.settings.themeLight} />
              <ThemeOption value="dark" label={t.settings.themeDark} />
              <ThemeOption value="system" label={t.settings.themeSystem} />
            </View>
          </View>
        </View>

        {/* Language Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t.settings.language}</Text>
          
          <View style={styles.settingGroup}>
            <View style={styles.optionsContainer}>
              <LanguageOption value="en" label="English" />
              <LanguageOption value="nl" label="Nederlands" />
              <LanguageOption value="fr" label="Français" />
              <LanguageOption value="de" label="Deutsch" />
            </View>
          </View>
        </View>

        {/* Currency Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t.settings.currency}</Text>
          
          <View style={styles.settingGroup}>
            <TouchableOpacity
              style={styles.currencySelector}
              onPress={() => setShowCurrencyPicker(true)}
            >
              <View style={styles.currencyInfo}>
                <Text style={styles.currencySymbol}>{currency.symbol}</Text>
                <Text style={styles.currencyName}>{currency.name}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Security Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t.settings.security}</Text>
          
          <View style={styles.settingGroup}>
            <View style={styles.biometricSetting}>
              <View style={styles.biometricInfo}>
                <Text style={styles.settingLabel}>{t.settings.biometricAuth}</Text>
                <Text style={styles.settingDescription}>
                  {biometricAvailable 
                    ? t.settings.biometricAuthDesc
                    : t.settings.biometricNotAvailable}
                </Text>
              </View>
              <Switch
                value={biometricEnabled}
                onValueChange={handleBiometricToggle}
                disabled={!biometricAvailable}
                trackColor={{ false: colors.border, true: colors.primary }}
                thumbColor={biometricEnabled ? '#fff' : colors.textSecondary}
              />
            </View>
          </View>
        </View>

        {/* Categories Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t.settings.categories}</Text>
          
          <View style={styles.settingGroup}>
            <Text style={styles.settingLabel}>{t.settings.manageCategoriesTitle}</Text>
            <Text style={styles.settingDescription}>{t.settings.manageCategoriesDesc}</Text>

            {/* All Categories */}
            <View style={styles.categoriesContainer}>
              <Text style={styles.categoryGroupLabel}>{t.settings.allCategories}</Text>
              {categories.map((category) => (
                <View key={category} style={styles.categoryItem}>
                  <Text style={styles.categoryText}>{category}</Text>
                  <TouchableOpacity
                    onPress={() => handleDeleteCategory(category)}
                    style={styles.deleteButton}
                  >
                    <Ionicons name="trash-outline" size={20} color={colors.error} />
                  </TouchableOpacity>
                </View>
              ))}
            </View>

            {/* Add Category Input */}
            {showCategoryInput ? (
              <View style={styles.addCategoryContainer}>
                <TextInput
                  style={styles.categoryInput}
                  value={newCategory}
                  onChangeText={setNewCategory}
                  placeholder={t.settings.categoryPlaceholder}
                  placeholderTextColor={colors.textSecondary}
                  autoFocus
                />
                <View style={styles.categoryInputButtons}>
                  <TouchableOpacity
                    style={styles.categoryInputButton}
                    onPress={() => {
                      setShowCategoryInput(false);
                      setNewCategory('');
                    }}
                  >
                    <Text style={styles.cancelButtonText}>{t.settings.cancel}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.categoryInputButton, styles.addButton]}
                    onPress={handleAddCategory}
                  >
                    <Text style={styles.addButtonText}>{t.settings.add}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <TouchableOpacity
                style={styles.addCategoryButton}
                onPress={() => setShowCategoryInput(true)}
              >
                <Ionicons name="add-circle-outline" size={20} color={colors.primary} />
                <Text style={styles.addCategoryButtonText}>{t.settings.addCategory}</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </ScrollView>

      {/* Currency Picker Modal */}
      <Modal
        visible={showCurrencyPicker}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowCurrencyPicker(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { paddingBottom: insets.bottom }]}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{t.settings.selectCurrency}</Text>
              <TouchableOpacity onPress={() => setShowCurrencyPicker(false)}>
                <Ionicons name="close" size={24} color={colors.text} />
              </TouchableOpacity>
            </View>
            <FlatList
              data={CURRENCIES}
              keyExtractor={(item) => item.code}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.currencyOption,
                    currency.code === item.code && styles.currencyOptionSelected,
                  ]}
                  onPress={() => handleCurrencyChange(item)}
                >
                  <View style={styles.currencyOptionContent}>
                    <Text style={styles.currencyOptionSymbol}>{item.symbol}</Text>
                    <Text style={styles.currencyOptionName}>{item.name}</Text>
                  </View>
                  {currency.code === item.code && (
                    <Ionicons name="checkmark" size={24} color={colors.primary} />
                  )}
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const getStyles = (colors: ThemeColors, isDark: boolean) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    backgroundColor: colors.card,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: isDark ? 0.3 : 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text,
    userSelect: "none"
  },
  content: {
    flex: 1,
  },
  section: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 16,
  },
  settingGroup: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: isDark ? 0.2 : 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
  },
  settingDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 16,
    lineHeight: 20,
  },
  optionsContainer: {
    gap: 8,
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.borderStrong,
    backgroundColor: colors.background,
  },
  optionSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.highlight,
  },
  optionText: {
    fontSize: 16,
    color: colors.text,
  },
  optionTextSelected: {
    color: colors.primary,
    fontWeight: '600',
  },
  categoriesContainer: {
    marginTop: 16,
  },
  categoryGroupLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  categoryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  categoryText: {
    fontSize: 16,
    color: colors.text,
  },
  categoryBadge: {
    backgroundColor: colors.border,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  categoryBadgeText: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  deleteButton: {
    padding: 4,
  },
  addCategoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    marginTop: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.primary,
    borderStyle: 'dashed',
    gap: 8,
  },
  addCategoryButtonText: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: '600',
  },
  addCategoryContainer: {
    marginTop: 16,
  },
  categoryInput: {
    borderWidth: 1,
    borderColor: colors.borderStrong,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: colors.text,
    backgroundColor: colors.background,
    marginBottom: 12,
  },
  categoryInputButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  categoryInputButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: colors.border,
  },
  addButton: {
    backgroundColor: colors.primary,
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  currencySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.card,
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  currencyInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  currencySymbol: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.primary,
  },
  currencyName: {
    fontSize: 16,
    color: colors.text,
  },
  biometricSetting: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 16,
  },
  biometricInfo: {
    flex: 1,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: colors.overlay,
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.card,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
  },
  currencyOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  currencyOptionSelected: {
    backgroundColor: colors.highlight,
  },
  currencyOptionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  currencyOptionSymbol: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.primary,
    minWidth: 40,
  },
  currencyOptionName: {
    fontSize: 16,
    color: colors.text,
  },
});
