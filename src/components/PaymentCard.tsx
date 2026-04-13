import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { RecurringPayment, PaymentStatus } from '../types/payment';
import { useTheme, ThemeColors } from '../theme/ThemeContext';
import { useI18n } from '../i18n';
import { useCurrency } from '../hooks/useCurrency';

interface PaymentCardProps {
  payment: RecurringPayment;
  onPress?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onMarkAsPaid?: () => void;
  onMarkAsSkipped?: () => void;
  onMarkAsPending?: () => void;
  showActions?: boolean;
  status?: PaymentStatus;
  showStatusActions?: boolean;
}

export const PaymentCard: React.FC<PaymentCardProps> = ({
  payment,
  onPress,
  onEdit,
  onDelete,
  onMarkAsPaid,
  onMarkAsSkipped,
  onMarkAsPending,
  showActions = true,
  status = 'pending',
  showStatusActions = false,
}) => {
  const { colors, isDark } = useTheme();
  const { t } = useI18n();
  const { formatCurrency } = useCurrency();
  const styles = getStyles(colors, isDark);

  const FREQUENCY_LABELS: Record<string, string> = {
    monthly: t.form.monthly,
    quarterly: t.form.quarterly,
    yearly: t.form.yearly,
    installments: t.form.installments,
  };

  const getStatusColor = (status: PaymentStatus) => {
    switch (status) {
      case 'paid':
        return '#10b981';
      case 'skipped':
        return '#f59e0b';
      default:
        return colors.textSecondary;
    }
  };

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={onPress ? 0.7 : 1}
    >
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.titleRow}>
            <Text style={styles.name}>{payment.name}</Text>
            {status !== 'pending' && (
              <View style={[styles.statusBadge, { backgroundColor: getStatusColor(status) }]}>
                <Text style={styles.statusText}>
                  {status === 'paid' ? t.status.paid : t.status.skipped}
                </Text>
              </View>
            )}
          </View>
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

        {showStatusActions && (
          <View style={styles.statusActions}>
            {status !== 'paid' && onMarkAsPaid && (
              <TouchableOpacity style={[styles.statusButton, styles.paidButton]} onPress={onMarkAsPaid}>
                <Text style={styles.statusButtonText}>{t.status.markAsPaid}</Text>
              </TouchableOpacity>
            )}
            {status !== 'skipped' && onMarkAsSkipped && (
              <TouchableOpacity style={[styles.statusButton, styles.skippedButton]} onPress={onMarkAsSkipped}>
                <Text style={styles.statusButtonText}>{t.status.markAsSkipped}</Text>
              </TouchableOpacity>
            )}
            {status !== 'pending' && onMarkAsPending && (
              <TouchableOpacity style={[styles.statusButton, styles.pendingButton]} onPress={onMarkAsPending}>
                <Text style={styles.statusButtonText}>{t.status.markAsPending}</Text>
              </TouchableOpacity>
            )}
          </View>
        )}

        {showActions && !showStatusActions && (
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
    flexDirection: 'column',
    gap: 8,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
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
  statusActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 8,
  },
  statusButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
  },
  paidButton: {
    borderColor: '#10b981',
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
  },
  skippedButton: {
    borderColor: '#f59e0b',
    backgroundColor: 'rgba(245, 158, 11, 0.1)',
  },
  pendingButton: {
    borderColor: colors.textSecondary,
    backgroundColor: colors.highlight,
  },
  statusButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.text,
  },
});
