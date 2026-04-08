import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
  Alert,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RecurringPayment, Frequency } from '../types/payment';
import { useTheme, ThemeColors } from '../theme/ThemeContext';
import { useI18n } from '../i18n';
import { categoriesService } from '../services/categories';

interface PaymentFormModalProps {
  visible: boolean;
  payment?: RecurringPayment | null;
  onClose: () => void;
  onSave: (payment: Omit<RecurringPayment, 'id' | 'createdAt' | 'updatedAt'>) => void;
}

export const PaymentFormModal: React.FC<PaymentFormModalProps> = ({
  visible,
  payment,
  onClose,
  onSave,
}) => {
  const { colors, isDark } = useTheme();
  const { t } = useI18n();
  const insets = useSafeAreaInsets();
  const styles = getStyles(colors, isDark);

  const [categories, setCategories] = useState<string[]>([]);
  const [name, setName] = useState(payment?.name || '');
  const [amount, setAmount] = useState(payment?.amount.toString() || '');
  const [frequency, setFrequency] = useState<Frequency>(payment?.frequency || 'monthly');
  const [dueDay, setDueDay] = useState(payment?.dueDay.toString() || '1');
  const [category, setCategory] = useState(payment?.category || '');
  const [startDate, setStartDate] = useState(
    payment?.startDate || new Date().toISOString().split('T')[0]
  );

  useEffect(() => {
    const loadCategories = async () => {
      const allCategories = await categoriesService.getAllCategories();
      setCategories(allCategories);
    };
    if (visible) {
      loadCategories();
    }
  }, [visible]);

  React.useEffect(() => {
    if (payment) {
      setName(payment.name);
      setAmount(payment.amount.toString());
      setFrequency(payment.frequency);
      setDueDay(payment.dueDay.toString());
      setCategory(payment.category || '');
      setStartDate(payment.startDate);
    } else {
      // Reset form for new payment
      setName('');
      setAmount('');
      setFrequency('monthly');
      setDueDay('1');
      setCategory('');
      setStartDate(new Date().toISOString().split('T')[0]);
    }
  }, [payment, visible]);

  const handleSave = () => {
    // Validation
    if (!name.trim()) {
      Alert.alert(t.validation.errorTitle, t.validation.nameRequired);
      return;
    }

    // Handle both comma and dot as decimal separator
    const normalizedAmount = amount.replace(',', '.');
    const amountNum = parseFloat(normalizedAmount);
    if (isNaN(amountNum) || amountNum <= 0) {
      Alert.alert(t.validation.errorTitle, t.validation.amountInvalid);
      return;
    }

    const dueDayNum = parseInt(dueDay, 10);
    if (isNaN(dueDayNum) || dueDayNum < 1 || dueDayNum > 31) {
      Alert.alert(t.validation.errorTitle, t.validation.dueDayInvalid);
      return;
    }

    onSave({
      name: name.trim(),
      amount: amountNum,
      frequency,
      dueDay: dueDayNum,
      category: category.trim() || undefined,
      startDate,
    });
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <ScrollView>
            <Text style={styles.title}>
              {payment ? t.form.titleEdit : t.form.titleAdd}
            </Text>

            <View style={styles.formGroup}>
              <Text style={styles.label}>{t.form.name} {t.form.required}</Text>
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder={t.form.namePlaceholder}
                placeholderTextColor={colors.textSecondary}
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>{t.form.amount} {t.form.required}</Text>
              <TextInput
                style={styles.input}
                value={amount}
                onChangeText={setAmount}
                placeholder={t.form.amountPlaceholder}
                keyboardType="decimal-pad"
                placeholderTextColor={colors.textSecondary}
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>{t.form.frequency} {t.form.required}</Text>
              <View style={styles.frequencyButtons}>
                {(['monthly', 'quarterly', 'yearly'] as Frequency[]).map((freq) => (
                  <TouchableOpacity
                    key={freq}
                    style={[
                      styles.frequencyButton,
                      frequency === freq && styles.frequencyButtonActive,
                    ]}
                    onPress={() => setFrequency(freq)}
                  >
                    <Text
                      style={[
                        styles.frequencyButtonText,
                        frequency === freq && styles.frequencyButtonTextActive,
                      ]}
                    >
                      {freq === 'monthly' ? t.form.monthly : freq === 'quarterly' ? t.form.quarterly : t.form.yearly}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>{t.form.dueDay} {t.form.required}</Text>
              <TextInput
                style={styles.input}
                value={dueDay}
                onChangeText={setDueDay}
                placeholder={t.form.dueDayPlaceholder}
                keyboardType="number-pad"
                placeholderTextColor={colors.textSecondary}
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>{t.form.startDate} {t.form.required}</Text>
              <TextInput
                style={styles.input}
                value={startDate}
                onChangeText={setStartDate}
                placeholder={t.form.startDatePlaceholder}
                placeholderTextColor={colors.textSecondary}
              />
              <Text style={styles.helperText}>
                {t.form.startDateHelper}
              </Text>
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>{t.form.category}</Text>
              <View style={styles.categoryButtons}>
                {categories.map((cat) => (
                  <TouchableOpacity
                    key={cat}
                    style={[
                      styles.categoryButton,
                      category === cat && styles.categoryButtonActive,
                    ]}
                    onPress={() => setCategory(category === cat ? '' : cat)}
                  >
                    <Text
                      style={[
                        styles.categoryButtonText,
                        category === cat && styles.categoryButtonTextActive,
                      ]}
                    >
                      {cat}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={[styles.buttonRow, { paddingBottom: Math.max(insets.bottom, 16) }]}>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={onClose}
              >
                <Text style={styles.cancelButtonText}>{t.form.cancel}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.saveButton]}
                onPress={handleSave}
              >
                <Text style={styles.saveButtonText}>{t.form.save}</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const getStyles = (colors: ThemeColors, isDark: boolean) => StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: colors.overlay,
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.card,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 24,
    maxHeight: '90%',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 24,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.borderStrong,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: colors.text,
    backgroundColor: colors.background,
  },
  helperText: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 4,
  },
  frequencyButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  frequencyButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.borderStrong,
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  frequencyButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  frequencyButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  frequencyButtonTextActive: {
    color: '#fff',
  },
  categoryButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  categoryButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.borderStrong,
    backgroundColor: colors.background,
  },
  categoryButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  categoryButtonText: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  categoryButtonTextActive: {
    color: '#fff',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 24,
  },
  button: {
    flex: 1,
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: colors.border,
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  saveButton: {
    backgroundColor: colors.primary,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});
