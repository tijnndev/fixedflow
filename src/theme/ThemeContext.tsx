import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type ThemeType = 'light' | 'dark' | 'system';

export interface ThemeColors {
  background: string;
  card: string;
  text: string;
  textSecondary: string;
  primary: string;
  border: string;
  borderStrong: string;
  error: string;
  success: string;
  highlight: string;
  highlightText: string;
  overlay: string;
}

const lightColors: ThemeColors = {
  background: '#f5f5f5',
  card: '#ffffff',
  text: '#1a1a1a',
  textSecondary: '#666666',
  primary: '#2563eb',
  border: '#f3f4f6',
  borderStrong: '#dddddd',
  error: '#dc2626',
  success: '#16a34a',
  highlight: '#eff6ff',
  highlightText: '#1e40af',
  overlay: 'rgba(0, 0, 0, 0.5)',
};

const darkColors: ThemeColors = {
  background: '#0f172a', // Slate 900
  card: '#1e293b',       // Slate 800
  text: '#f8fafc',       // Slate 50
  textSecondary: '#94a3b8', // Slate 400
  primary: '#3b82f6',    // Blue 500
  border: '#334155',     // Slate 700
  borderStrong: '#475569', // Slate 600
  error: '#ef4444',      // Red 500
  success: '#22c55e',    // Green 500
  highlight: '#1e3a8a',  // Blue 900
  highlightText: '#bfdbfe', // Blue 200
  overlay: 'rgba(0, 0, 0, 0.7)',
};

interface ThemeContextProps {
  theme: ThemeType;
  isDark: boolean;
  colors: ThemeColors;
  setTheme: (theme: ThemeType) => void;
}

const ThemeContext = createContext<ThemeContextProps>({
  theme: 'system',
  isDark: false,
  colors: lightColors,
  setTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const [theme, setThemeState] = useState<ThemeType>('system');
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem('@fixedflow_theme');
        if (savedTheme && ['light', 'dark', 'system'].includes(savedTheme)) {
          setThemeState(savedTheme as ThemeType);
        }
      } catch (error) {
        console.error('Error loading theme:', error);
      } finally {
        setIsReady(true);
      }
    };
    loadTheme();
  }, []);

  const setTheme = async (newTheme: ThemeType) => {
    setThemeState(newTheme);
    try {
      await AsyncStorage.setItem('@fixedflow_theme', newTheme);
    } catch (error) {
      console.error('Error saving theme:', error);
    }
  };

  const isDark = theme === 'system' ? systemColorScheme === 'dark' : theme === 'dark';
  const colors = isDark ? darkColors : lightColors;

  if (!isReady) return null;

  return (
    <ThemeContext.Provider value={{ theme, isDark, colors, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
