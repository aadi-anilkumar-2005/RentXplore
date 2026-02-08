import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable, Platform } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Image } from 'expo-image';
import { MaterialIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { theme, spacing, borderRadius, shadows } from '../../constants/theme';
import { getVehicleById, mockUsers } from '../../services/mockData';
import { useApp } from '../../contexts/AppContext';
import * as Haptics from 'expo-haptics';

export default function BookingScreen() {
  const { vehicleId } = useLocalSearchParams<{ vehicleId: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { addBooking, currentUser } = useApp();

  const vehicle = getVehicleById(vehicleId);

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date(Date.now() + 86400000)); // Tomorrow
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  const [pickupTime, setPickupTime] = useState('10:00 AM');
  const [returnTime, setReturnTime] = useState('10:00 AM');

  if (!vehicle) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Vehicle not found</Text>
      </SafeAreaView>
    );
  }

  const calculateDays = () => {
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(1, diffDays);
  };

  const days = calculateDays();
  const subtotal = vehicle.dailyRate * days;
  const serviceFee = Math.round(subtotal * 0.1);
  const insurance = 15 * days;
  const total = subtotal + serviceFee + insurance;

  const handleConfirm = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    
    addBooking({
      vehicleId: vehicle.id,
      vehicle: vehicle,
      customerId: currentUser?.id || 'u1',
      customerName: currentUser?.name || 'John Smith',
      customerPhone: currentUser?.phone || '+1 (555) 123-4567',
      startDate: startDate.toISOString().split('T')[0],
      endDate: endDate.toISOString().split('T')[0],
      totalPrice: total,
      status: 'pending',
      pickupTime,
      returnTime,
    });

    router.replace('/booking-confirmation');
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const timeSlots = ['09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '02:00 PM', '04:00 PM', '06:00 PM'];

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable 
          style={styles.closeButton}
          onPress={() => {
            Haptics.selectionAsync();
            router.back();
          }}
        >
          <MaterialIcons name="close" size={24} color={theme.textPrimary} />
        </Pressable>
        <Text style={styles.headerTitle}>Book Vehicle</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={{ paddingBottom: insets.bottom + 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Vehicle Summary */}
        <View style={[styles.vehicleCard, shadows.card]}>
          <Image
            source={{ uri: vehicle.image }}
            style={styles.vehicleImage}
            contentFit="cover"
          />
          <View style={styles.vehicleInfo}>
            <Text style={styles.vehicleName}>
              {vehicle.make} {vehicle.model}
            </Text>
            <Text style={styles.vehicleYear}>{vehicle.year}</Text>
            <View style={styles.ratingRow}>
              <MaterialIcons name="star" size={14} color="#FBBF24" />
              <Text style={styles.rating}>{vehicle.rating}</Text>
            </View>
          </View>
          <View style={styles.priceInfo}>
            <Text style={styles.price}>${vehicle.dailyRate}</Text>
            <Text style={styles.perDay}>/day</Text>
          </View>
        </View>

        {/* Date Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Dates</Text>
          <View style={styles.dateRow}>
            <Pressable 
              style={styles.dateCard}
              onPress={() => setShowStartPicker(true)}
            >
              <MaterialIcons name="event" size={22} color={theme.primary} />
              <View style={styles.dateInfo}>
                <Text style={styles.dateLabel}>Pick-up Date</Text>
                <Text style={styles.dateValue}>{formatDate(startDate)}</Text>
              </View>
              <MaterialIcons name="edit" size={18} color={theme.textMuted} />
            </Pressable>

            <Pressable 
              style={styles.dateCard}
              onPress={() => setShowEndPicker(true)}
            >
              <MaterialIcons name="event" size={22} color={theme.primary} />
              <View style={styles.dateInfo}>
                <Text style={styles.dateLabel}>Return Date</Text>
                <Text style={styles.dateValue}>{formatDate(endDate)}</Text>
              </View>
              <MaterialIcons name="edit" size={18} color={theme.textMuted} />
            </Pressable>
          </View>

          {showStartPicker && (
            <DateTimePicker
              value={startDate}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={(event, date) => {
                setShowStartPicker(false);
                if (date) {
                  setStartDate(date);
                  if (date >= endDate) {
                    setEndDate(new Date(date.getTime() + 86400000));
                  }
                }
              }}
              minimumDate={new Date()}
            />
          )}

          {showEndPicker && (
            <DateTimePicker
              value={endDate}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={(event, date) => {
                setShowEndPicker(false);
                if (date) setEndDate(date);
              }}
              minimumDate={new Date(startDate.getTime() + 86400000)}
            />
          )}
        </View>

        {/* Time Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pick-up Time</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.timeScroll}
          >
            {timeSlots.map((time) => (
              <Pressable
                key={time}
                style={[
                  styles.timeChip,
                  pickupTime === time && styles.timeChipSelected,
                ]}
                onPress={() => {
                  Haptics.selectionAsync();
                  setPickupTime(time);
                }}
              >
                <Text style={[
                  styles.timeText,
                  pickupTime === time && styles.timeTextSelected,
                ]}>
                  {time}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Return Time</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.timeScroll}
          >
            {timeSlots.map((time) => (
              <Pressable
                key={time}
                style={[
                  styles.timeChip,
                  returnTime === time && styles.timeChipSelected,
                ]}
                onPress={() => {
                  Haptics.selectionAsync();
                  setReturnTime(time);
                }}
              >
                <Text style={[
                  styles.timeText,
                  returnTime === time && styles.timeTextSelected,
                ]}>
                  {time}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        {/* Price Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Price Summary</Text>
          <View style={styles.summaryCard}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>
                ${vehicle.dailyRate} × {days} day{days > 1 ? 's' : ''}
              </Text>
              <Text style={styles.summaryValue}>${subtotal}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Service Fee</Text>
              <Text style={styles.summaryValue}>${serviceFee}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Insurance</Text>
              <Text style={styles.summaryValue}>${insurance}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.summaryRow}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>${total}</Text>
            </View>
          </View>
        </View>

        {/* Cancellation Policy */}
        <View style={styles.policyCard}>
          <MaterialIcons name="info-outline" size={20} color={theme.info} />
          <Text style={styles.policyText}>
            Free cancellation up to 24 hours before pick-up. Cancel within 24 hours for a partial refund.
          </Text>
        </View>
      </ScrollView>

      {/* Bottom CTA */}
      <View style={[styles.bottomBar, { paddingBottom: insets.bottom + 16 }]}>
        <View>
          <Text style={styles.bottomLabel}>Total Price</Text>
          <Text style={styles.bottomTotal}>${total}</Text>
        </View>
        <Pressable style={styles.confirmButton} onPress={handleConfirm}>
          <Text style={styles.confirmButtonText}>Confirm Booking</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.border,
  },
  closeButton: {
    width: 44,
    height: 44,
    borderRadius: borderRadius.full,
    backgroundColor: theme.backgroundSecondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.textPrimary,
  },
  scrollView: {
    flex: 1,
  },
  vehicleCard: {
    flexDirection: 'row',
    margin: spacing.lg,
    padding: spacing.md,
    backgroundColor: theme.surface,
    borderRadius: borderRadius.large,
  },
  vehicleImage: {
    width: 80,
    height: 80,
    borderRadius: borderRadius.medium,
  },
  vehicleInfo: {
    flex: 1,
    marginLeft: spacing.md,
    justifyContent: 'center',
  },
  vehicleName: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.textPrimary,
  },
  vehicleYear: {
    fontSize: 14,
    color: theme.textSecondary,
    marginBottom: spacing.xs,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  rating: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.textPrimary,
  },
  priceInfo: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  price: {
    fontSize: 20,
    fontWeight: '700',
    color: theme.accent,
  },
  perDay: {
    fontSize: 12,
    color: theme.textSecondary,
  },
  section: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.textPrimary,
    marginBottom: spacing.md,
  },
  dateRow: {
    gap: spacing.md,
  },
  dateCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.backgroundSecondary,
    padding: spacing.md,
    borderRadius: borderRadius.medium,
    gap: spacing.md,
  },
  dateInfo: {
    flex: 1,
  },
  dateLabel: {
    fontSize: 12,
    color: theme.textSecondary,
    marginBottom: 2,
  },
  dateValue: {
    fontSize: 15,
    fontWeight: '600',
    color: theme.textPrimary,
  },
  timeScroll: {
    gap: spacing.sm,
  },
  timeChip: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    backgroundColor: theme.backgroundSecondary,
    borderRadius: borderRadius.full,
    borderWidth: 1,
    borderColor: theme.border,
  },
  timeChipSelected: {
    backgroundColor: theme.primary,
    borderColor: theme.primary,
  },
  timeText: {
    fontSize: 14,
    fontWeight: '500',
    color: theme.textSecondary,
  },
  timeTextSelected: {
    color: '#FFF',
  },
  summaryCard: {
    backgroundColor: theme.backgroundSecondary,
    borderRadius: borderRadius.large,
    padding: spacing.lg,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  summaryLabel: {
    fontSize: 15,
    color: theme.textSecondary,
  },
  summaryValue: {
    fontSize: 15,
    fontWeight: '500',
    color: theme.textPrimary,
  },
  divider: {
    height: 1,
    backgroundColor: theme.border,
    marginVertical: spacing.md,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.textPrimary,
  },
  totalValue: {
    fontSize: 20,
    fontWeight: '700',
    color: theme.accent,
  },
  policyCard: {
    flexDirection: 'row',
    marginHorizontal: spacing.lg,
    padding: spacing.md,
    backgroundColor: `${theme.info}10`,
    borderRadius: borderRadius.medium,
    gap: spacing.sm,
    alignItems: 'flex-start',
  },
  policyText: {
    flex: 1,
    fontSize: 13,
    color: theme.textSecondary,
    lineHeight: 20,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    backgroundColor: theme.background,
    borderTopWidth: 1,
    borderTopColor: theme.border,
  },
  bottomLabel: {
    fontSize: 12,
    color: theme.textSecondary,
  },
  bottomTotal: {
    fontSize: 24,
    fontWeight: '700',
    color: theme.textPrimary,
  },
  confirmButton: {
    backgroundColor: theme.accent,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.medium,
  },
  confirmButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
