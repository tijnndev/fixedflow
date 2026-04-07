import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { en } from './en';
import { nl } from './nl';
import { fr } from './fr';
import { de } from './de';

export type Language = 'en' | 'nl' | 'fr' | 'de';
export type TranslationKeys = typeof en;

const translations: Record<Language, TranslationKeys> = {
  en,
  nl,
  fr,
  de,
};

interface I18nContextProps {
  language: Language;
  t: TranslationKeys;
  setLanguage: (lang: Language) => void;
}

const I18nContext = createContext<I18nContextProps>({
  language: 'en',
  t: en,
  setLanguage: () => {},
});

export const useI18n = () => useContext(I18nContext);

interface I18nProviderProps {
  children: ReactNode;
}

export const I18nProvider: React.FC<I18nProviderProps> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('en');
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const loadLanguage = async () => {
      try {
        const savedLanguage = await AsyncStorage.getItem('@fixedflow_language');
        if (savedLanguage && ['en', 'nl', 'fr', 'de'].includes(savedLanguage)) {
          setLanguageState(savedLanguage as Language);
        }
      } catch (error) {
        console.error('Error loading language:', error);
      } finally {
        setIsReady(true);
      }
    };
    loadLanguage();
  }, []);

  const setLanguage = async (lang: Language) => {
    setLanguageState(lang);
    try {
      await AsyncStorage.setItem('@fixedflow_language', lang);
    } catch (error) {
      console.error('Error saving language:', error);
    }
  };

  if (!isReady) return null;

  return (
    <I18nContext.Provider value={{ language, t: translations[language], setLanguage }}>
      {children}
    </I18nContext.Provider>
  );
};
