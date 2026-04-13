import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { ListScreen } from './src/screens/ListScreen';
import { AgendaScreen } from './src/screens/AgendaScreen';
import { SettingsScreen } from './src/screens/SettingsScreen';
import { ThemeProvider, useTheme } from './src/theme/ThemeContext';
import { I18nProvider, useI18n } from './src/i18n';
import { BiometricLock } from './src/components/BiometricLock';
import { notificationService } from './src/services/notification';

const Tab = createBottomTabNavigator();

function AppContent() {
  const { colors, isDark } = useTheme();
  const { t } = useI18n();
  const insets = useSafeAreaInsets();

  // Request notification permissions on app start
  useEffect(() => {
    const requestPermissions = async () => {
      await notificationService.requestNotificationPermissions();
    };
    requestPermissions();
  }, []);

  // Calculate safe area padding for tab bar
  const bottomPadding = Math.max(insets.bottom, 8);

  return (
    <NavigationContainer theme={{
      dark: isDark,
      colors: {
        primary: colors.primary,
        background: colors.background,
        card: colors.card,
        text: colors.text,
        border: colors.border,
        notification: colors.error,
      }
    }}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.textSecondary,
          tabBarStyle: {
            backgroundColor: colors.card,
            borderTopWidth: 1,
            borderTopColor: colors.border,
            paddingBottom: bottomPadding,
            paddingTop: 8,
            height: 60 + bottomPadding,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '600',
            paddingBottom: 10,
          },
        }}
      >
        <Tab.Screen
          name="List"
          component={ListScreen}
          options={{
            title: t.nav.list,
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="list" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Agenda"
          component={AgendaScreen}
          options={{
            title: t.nav.agenda,
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="calendar" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            title: t.nav.settings,
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="settings" size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <I18nProvider>
        <ThemeProvider>
          <BiometricLock>
            <AppContent />
          </BiometricLock>
        </ThemeProvider>
      </I18nProvider>
    </SafeAreaProvider>
  );
}
