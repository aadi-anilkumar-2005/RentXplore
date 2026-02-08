import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { theme, borderRadius, spacing } from '../../constants/theme';
import { bookingStatus } from '../../constants/theme';
import { Booking } from '../../services/mockData';
import { Image } from 'expo-image';
import * as Haptics from 'expo-haptics';

interface BookingCardProps {
  booking: Booking;
  onPress?: () => void;
  showActions?: boolean;
  onStatusUpdate?: (status: Booking['status']) => void;
}

export function BookingCard({ booking, onPress, showActions, onStatusUpdate }: BookingCardProps) {
  const status = bookingStatus[booking.status];

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const handleAction = (newStatus: Booking['status']) => {
    Haptics.selectionAsync();
    onStatusUpdate?.(newStatus);
  };

  return (
    <Pressable 
      style={styles.card} 
      onPress={() => {
        Haptics.selectionAsync();
        onPress?.();
      }}
    >
      <View style={styles.header}>
        <Image
          source={{ uri: booking.vehicle.image }}
          style={styles.vehicleImage}
          contentFit="cover"
          transition={200}
        />
        <View style={styles.vehicleInfo}>
          <Text style={styles.vehicleName}>
            {booking.vehicle.make} {booking.vehicle.model}
          </Text>
          <Text style={styles.shopName}>{booking.vehicle.shopName}</Text>
          <View style={[styles.statusBadge, { backgroundColor: status.bgColor }]}>
            <Text style={[styles.statusText, { color: status.color }]}>
              {status.label}
            </Text>
          </View>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.totalPrice}>${booking.totalPrice}</Text>
          <Text style={styles.totalLabel}>total</Text>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.dateRow}>
        <View style={styles.dateItem}>
          <MaterialIcons name="event" size={16} color={theme.textSecondary} />
          <View>
            <Text style={styles.dateLabel}>Pick-up</Text>
            <Text style={styles.dateValue}>
              {formatDate(booking.startDate)} • {booking.pickupTime}
            </Text>
          </View>
        </View>
        <MaterialIcons name="arrow-forward" size={16} color={theme.textMuted} />
        <View style={styles.dateItem}>
          <MaterialIcons name="event" size={16} color={theme.textSecondary} />
          <View>
            <Text style={styles.dateLabel}>Return</Text>
            <Text style={styles.dateValue}>
              {formatDate(booking.endDate)} • {booking.returnTime}
            </Text>
          </View>
        </View>
      </View>

      {showActions && booking.status === 'pending' && (
        <View style={styles.actions}>
          <Pressable 
            style={[styles.actionButton, styles.confirmButton]}
            onPress={() => handleAction('confirmed')}
          >
            <MaterialIcons name="check" size={18} color="#FFF" />
            <Text style={styles.confirmText}>Confirm</Text>
          </Pressable>
          <Pressable 
            style={[styles.actionButton, styles.cancelButton]}
            onPress={() => handleAction('cancelled')}
          >
            <MaterialIcons name="close" size={18} color={theme.error} />
            <Text style={styles.cancelText}>Decline</Text>
          </Pressable>
        </View>
      )}

      {showActions && booking.status === 'confirmed' && (
        <View style={styles.actions}>
          <Pressable 
            style={[styles.actionButton, styles.confirmButton]}
            onPress={() => handleAction('ongoing')}
          >
            <MaterialIcons name="directions-car" size={18} color="#FFF" />
            <Text style={styles.confirmText}>Start Rental</Text>
          </Pressable>
        </View>
      )}

      {showActions && booking.status === 'ongoing' && (
        <View style={styles.actions}>
          <Pressable 
            style={[styles.actionButton, styles.completeButton]}
            onPress={() => handleAction('completed')}
          >
            <MaterialIcons name="check-circle" size={18} color="#FFF" />
            <Text style={styles.confirmText}>Complete Rental</Text>
          </Pressable>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.surface,
    borderRadius: borderRadius.large,
    padding: spacing.lg,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: theme.border,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  vehicleImage: {
    width: 70,
    height: 70,
    borderRadius: borderRadius.medium,
  },
  vehicleInfo: {
    flex: 1,
    marginLeft: spacing.md,
  },
  vehicleName: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.textPrimary,
    marginBottom: 2,
  },
  shopName: {
    fontSize: 13,
    color: theme.textSecondary,
    marginBottom: spacing.sm,
  },
  statusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: borderRadius.small,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: '700',
    color: theme.primary,
  },
  totalLabel: {
    fontSize: 11,
    color: theme.textMuted,
  },
  divider: {
    height: 1,
    backgroundColor: theme.borderLight,
    marginVertical: spacing.md,
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dateItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  dateLabel: {
    fontSize: 11,
    color: theme.textMuted,
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  dateValue: {
    fontSize: 13,
    fontWeight: '500',
    color: theme.textPrimary,
  },
  actions: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.md,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: theme.borderLight,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.medium,
  },
  confirmButton: {
    backgroundColor: theme.success,
  },
  cancelButton: {
    backgroundColor: theme.backgroundSecondary,
    borderWidth: 1,
    borderColor: theme.border,
  },
  completeButton: {
    backgroundColor: theme.primary,
  },
  confirmText: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: 14,
  },
  cancelText: {
    color: theme.error,
    fontWeight: '600',
    fontSize: 14,
  },
});
