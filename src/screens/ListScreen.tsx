import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  RefreshControl,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { RecurringPayment } from '../types/payment';
import { storageService } from '../services/storage';
import { PaymentCard } from '../components/PaymentCard';
import { PaymentFormModal } from '../components/PaymentFormModal';
import { EmptyState } from '../components/EmptyState';
import { useTheme, ThemeColors } from '../theme/ThemeContext';
import { useI18n } from '../i18n';
import { useCurrency } from '../hooks/useCurrency';
import { Ionicons } from '@expo/vector-icons';
import { notificationService } from '../services/notification';

export const ListScreen: React.FC = () => {
  const { colors, isDark } = useTheme();
  const { t } = useI18n();
  const insets = useSafeAreaInsets();
  const { reloadCurrency } = useCurrency();
  const styles = getStyles(colors, isDark);
  const [payments, setPayments] = useState<RecurringPayment[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingPayment, setEditingPayment] = useState<RecurringPayment | null>(null);
  const [currencyVersion, setCurrencyVersion] = useState(0);

  const loadPayments = async () => {
    try {
      const data = await storageService.getPayments();
      // Sort by name
      const sorted = data.sort((a, b) => a.name.localeCompare(b.name));
      setPayments(sorted);
      
      // Schedule notifications for all payments
      await notificationService.scheduleAllPaymentNotifications(sorted);
    } catch (error) {
      Alert.alert(t.error.title, t.error.loadPayments);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadPayments();
      reloadCurrency();
      setCurrencyVersion(prev => prev + 1);
    }, [])
  );

  const handleAddPayment = () => {
    setEditingPayment(null);
    setModalVisible(true);
  };

  const handleEditPayment = (payment: RecurringPayment) => {
    setEditingPayment(payment);
    setModalVisible(true);
  };

  const handleDeletePayment = (payment: RecurringPayment) => {
    Alert.alert(
      t.alert.deletePaymentTitle,
      `${t.alert.deletePaymentMessage} "${payment.name}"?`,
      [
        { text: t.form.cancel, style: 'cancel' },
        {
          text: t.list.deleteButton,
          style: 'destructive',
          onPress: async () => {
            try {
              await storageService.deletePayment(payment.id);
              await loadPayments();
            } catch (error) {
              Alert.alert(t.error.title, t.error.deletePayment);
            }
          },
        },
      ]
    );
  };

  const handleSavePayment = async (
    paymentData: Omit<RecurringPayment, 'id' | 'createdAt' | 'updatedAt'>
  ) => {
    try {
      if (editingPayment) {
        await storageService.updatePayment(editingPayment.id, paymentData);
      } else {
        await storageService.addPayment(paymentData);
      }
      setModalVisible(false);
      setEditingPayment(null);
      await loadPayments();
    } catch (error) {
      Alert.alert(t.error.title, t.error.savePayment);
    }
  };

  const renderPayment = ({ item }: { item: RecurringPayment }) => (
    <PaymentCard
      key={`${item.id}-${currencyVersion}`}
      payment={item}
      onEdit={() => handleEditPayment(item)}
      onDelete={() => handleDeletePayment(item)}
    />
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.title}>{t.list.title}</Text>
      </View>

      {payments.length === 0 && !loading ? (
        <EmptyState
          title={t.list.emptyTitle}
          message={t.list.emptyMessage}
        />
      ) : (
        <FlatList
          data={payments}
          renderItem={renderPayment}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={loadPayments} />
          }
        />
      )}

      {/* Floating Action Button */}
      <TouchableOpacity style={styles.fab} onPress={handleAddPayment}>
        <Ionicons name="add" size={32} color="#fff" />
      </TouchableOpacity>

      <PaymentFormModal
        visible={modalVisible}
        payment={editingPayment}
        onClose={() => {
          setModalVisible(false);
          setEditingPayment(null);
        }}
        onSave={handleSavePayment}
      />
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
  list: {
    padding: 16,
    paddingBottom: 100, // Add padding for FAB
  },
  fab: {
    position: 'absolute',
    bottom: 20, // Above navigation bar
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
});
