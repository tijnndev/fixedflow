import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { RecurringPayment, PaymentOccurrence } from '../types/payment';
import { storageService } from '../services/storage';
import {
  getPaymentsByDay,
  calculateMonthlyTotal,
  calculateDailyTotal,
  formatCurrency,
  getDaysInMonth,
  getMonthName,
} from '../utils/recurrence';
import { PaymentCard } from '../components/PaymentCard';
import { EmptyState } from '../components/EmptyState';
import { useTheme } from '../theme/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { useI18n } from '../i18n';

import { ThemeColors } from '../theme/ThemeContext';

export const AgendaScreen: React.FC = () => {
  const { colors, isDark } = useTheme();
  const { t } = useI18n();
  const insets = useSafeAreaInsets();
  const styles = getStyles(colors, isDark);
  const [payments, setPayments] = useState<RecurringPayment[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const loadPayments = async () => {
    try {
      const data = await storageService.getPayments();
      setPayments(data);
    } catch (error) {
      Alert.alert(t.error.title, t.error.loadPayments);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadPayments();
    }, [])
  );

  const paymentsByDay = getPaymentsByDay(payments, year, month);
  const monthlyTotal = calculateMonthlyTotal(payments, year, month);

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
    setSelectedDay(null);
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
    setSelectedDay(null);
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(year, month);
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    
    const weeks: (number | null)[][] = [];
    let currentWeek: (number | null)[] = [];
    
    // Fill in empty days before the first day
    for (let i = 0; i < firstDayOfMonth; i++) {
      currentWeek.push(null);
    }
    
    // Fill in the actual days
    for (let day = 1; day <= daysInMonth; day++) {
      currentWeek.push(day);
      if (currentWeek.length === 7) {
        weeks.push(currentWeek);
        currentWeek = [];
      }
    }
    
    // Fill in remaining empty days
    if (currentWeek.length > 0) {
      while (currentWeek.length < 7) {
        currentWeek.push(null);
      }
      weeks.push(currentWeek);
    }

    return (
      <View style={styles.calendar}>
        {/* Day labels */}
        <View style={styles.weekRow}>
          {[t.days.sun, t.days.mon, t.days.tue, t.days.wed, t.days.thu, t.days.fri, t.days.sat].map((day) => (
            <View key={day} style={styles.dayLabel}>
              <Text style={styles.dayLabelText}>{day}</Text>
            </View>
          ))}
        </View>

        {/* Calendar days */}
        {weeks.map((week, weekIndex) => (
          <View key={weekIndex} style={styles.weekRow}>
            {week.map((day, dayIndex) => {
              if (day === null) {
                return <View key={dayIndex} style={styles.dayCell} />;
              }

              const hasPayments = paymentsByDay.has(day);
              const isSelected = selectedDay === day;
              const dayTotal = hasPayments
                ? calculateDailyTotal(paymentsByDay.get(day)!)
                : 0;

              return (
                <TouchableOpacity
                  key={dayIndex}
                  style={[
                    styles.dayCell,
                    hasPayments && styles.dayCellWithPayments,
                    isSelected && styles.dayCellSelected,
                  ]}
                  onPress={() => setSelectedDay(day)}
                >
                  <Text
                    style={[
                      styles.dayNumber,
                      hasPayments && styles.dayNumberWithPayments,
                      isSelected && styles.dayNumberSelected,
                    ]}
                  >
                    {day}
                  </Text>
                  {hasPayments && (
                    <Text style={styles.dayAmount}>
                      {formatCurrency(dayTotal)}
                    </Text>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        ))}
      </View>
    );
  };

  const renderSelectedDayPayments = () => {
    if (selectedDay === null) {
      return (
        <View style={styles.emptySelection}>
          <Text style={styles.emptySelectionText}>
            {t.agenda.selectDay}
          </Text>
        </View>
      );
    }

    const dayPayments = paymentsByDay.get(selectedDay);
    if (!dayPayments || dayPayments.length === 0) {
      return (
        <View style={styles.emptySelection}>
          <Text style={styles.emptySelectionText}>
            {t.agenda.noPaymentsOn} {getMonthName(month)} {selectedDay}
          </Text>
        </View>
      );
    }

    const dayTotal = calculateDailyTotal(dayPayments);

    return (
      <View style={styles.selectedDayContainer}>
        <View style={styles.selectedDayHeader}>
          <Text style={styles.selectedDayTitle}>
            {getMonthName(month)} {selectedDay}, {year}
          </Text>
          <Text style={styles.selectedDayTotal}>
            {t.agenda.total} {formatCurrency(dayTotal)}
          </Text>
        </View>
        <ScrollView style={styles.selectedDayPayments}>
          {dayPayments.map((occurrence, index) => (
            <PaymentCard
              key={`${occurrence.payment.id}-${index}`}
              payment={occurrence.payment}
              showActions={false}
            />
          ))}
        </ScrollView>
      </View>
    );
  };

  if (payments.length === 0) {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <View style={styles.header}>
          <Text style={styles.title}>{t.agenda.title}</Text>
        </View>
        <EmptyState
          title={t.agenda.emptyTitle}
          message={t.agenda.emptyMessage}
        />
      </View>
    );
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.title}>{t.agenda.title}</Text>
        
        <View style={styles.monthSelector}>
          <TouchableOpacity onPress={goToPreviousMonth} style={styles.monthButton}>
            <Ionicons name="chevron-back" size={24} color={colors.primary} />
          </TouchableOpacity>
          <Text style={styles.monthTitle}>
            {getMonthName(month)} {year}
          </Text>
          <TouchableOpacity onPress={goToNextMonth} style={styles.monthButton}>
            <Ionicons name="chevron-forward" size={24} color={colors.primary} />
          </TouchableOpacity>
        </View>

        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>{t.agenda.totalMonth}</Text>
          <Text style={styles.totalAmount}>{formatCurrency(monthlyTotal)}</Text>
        </View>
      </View>

      <ScrollView style={styles.content}>
        {renderCalendar()}
        {renderSelectedDayPayments()}
      </ScrollView>
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
    marginBottom: 16,
    userSelect: "none"
  },
  monthSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  monthButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  monthTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
    userSelect: "none"
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.highlight,
    padding: 16,
    borderRadius: 10,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.highlightText,
  },
  totalAmount: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.primary,
  },
  content: {
    flex: 1,
  },
  calendar: {
    backgroundColor: colors.card,
    margin: 16,
    padding: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  weekRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  dayLabel: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  dayLabelText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  dayCell: {
    flex: 1,
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    margin: 2,
  },
  dayCellWithPayments: {
    backgroundColor: colors.highlight,
  },
  dayCellSelected: {
    backgroundColor: colors.primary,
  },
  dayNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  dayNumberWithPayments: {
    color: colors.primary,
  },
  dayNumberSelected: {
    color: colors.card,
  },
  dayAmount: {
    fontSize: 10,
    color: colors.primary,
    marginTop: 2,
  },
  selectedDayContainer: {
    backgroundColor: colors.card,
    margin: 16,
    marginTop: 0,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  selectedDayHeader: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  selectedDayTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  selectedDayTotal: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.primary,
  },
  selectedDayPayments: {
    padding: 16,
    maxHeight: 400,
  },
  emptySelection: {
    backgroundColor: colors.card,
    margin: 16,
    marginTop: 0,
    padding: 40,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  emptySelectionText: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});
