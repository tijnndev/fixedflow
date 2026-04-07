import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { RecurringPayment } from '../types/payment';
import { formatCurrency } from '../utils/recurrence';
import { useTheme, ThemeColors } from '../theme/ThemeContext';
import { useI18n } from '../i18n';

interface PaymentCardProps {
  payment: RecurringPayment;
  onPress?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  showActions?: boolean;
}

export const PaymentCard: React.FC<PaymentCardProps> = ({
  payment,
  onPress,
  onEdit,
  onDelete,
  showActions = true,
}) => {
  const { colors, isDark } = useTheme();
  const { t } = useI18n();
  const styles = getStyles(colors, isDark);

  const FREQUENCY_LABELS = {
    monthly: t.form.monthly,
    quarterly: t.form.quarterly,
    yearly: t.form.yearly,
  };

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={onPress ? 0.7 : 1}
    >
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.name}>{payment.name}</Text>
          <Text style={styles.amount}>{formatCurrency(payment.amount)}</Text>
        </View>
        
        <View style={styles.details}>
          <Text style={styles.detailText}>
            {FREQUENCY_LABELS[payment.frequency]} • Due day: {payment.dueDay}
          </Text>
          {payment.category && (
            <Text style={styles.category}>{payment.category}</Text>
          )}
        </View>

        {showActions && (
          <View style={styles.actions}>
            {onEdit && (
              <TouchableOpacity style={styles.actionButton} onPress={onEdit}>
                <Text style={styles.editText}>{t.list.editButton}</Text>
              </TouchableOpacity>
            )}
            {onDelete && (
              <TouchableOpacity style={styles.actionButton} onPress={onDelete}>
                <Text style={styles.deleteText}>{t.list.deleteButton}</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const getStyles = (colors: ThemeColors, isDark: boolean) => StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: isDark ? 0.3 : 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  content: {
    gap: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    flex: 1,
  },
  amount: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.primary,
  },
  details: {
    gap: 4,
  },
  detailText: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  category: {
    fontSize: 13,
    color: colors.textSecondary,
    fontStyle: 'italic',
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  actionButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  editText: {
    color: colors.primary,
    fontWeight: '600',
    fontSize: 14,
  },
  deleteText: {
    color: colors.error,
    fontWeight: '600',
    fontSize: 14,
  },
});
