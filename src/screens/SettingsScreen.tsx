import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { useTheme, ThemeType, ThemeColors } from '../theme/ThemeContext';
import { useI18n, Language } from '../i18n';
import { categoriesService } from '../services/categories';
import { Ionicons } from '@expo/vector-icons';

export const SettingsScreen: React.FC = () => {
  const { colors, isDark, theme, setTheme } = useTheme();
  const { language, t, setLanguage } = useI18n();
  const styles = getStyles(colors, isDark);

  const [categories, setCategories] = useState<string[]>([]);
  const [newCategory, setNewCategory] = useState('');
  const [showCategoryInput, setShowCategoryInput] = useState(false);

  const loadCategories = async () => {
    try {
      console.log('loadCategories called');
      const allCategories = await categoriesService.getAllCategories();
      console.log('Loaded categories:', allCategories);
      setCategories(allCategories);
      console.log('State updated');
    } catch (error) {
      Alert.alert(t.error.title, t.error.loadSettings);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadCategories();
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
      await loadCategories();
    } catch (error: any) {
      Alert.alert(t.error.title, error.message || t.error.saveSettings);
    }
  };

  const handleDeleteCategory = async (category: string) => {
    console.log('handleDeleteCategory called with:', category);
    
    // Simple direct delete for debugging - we'll add confirmation back later
    try {
      console.log('Calling deleteCategory service...');
      await categoriesService.deleteCategory(category);
      console.log('Service returned, reloading...');
      await loadCategories();
      console.log('Reload complete');
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
    <SafeAreaView style={styles.container} edges={['top']}>
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
    </SafeAreaView>
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
});
