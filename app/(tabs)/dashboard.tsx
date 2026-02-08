import React from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { theme, spacing, borderRadius, shadows } from '../../constants/theme';
import { useApp } from '../../contexts/AppContext';
import { StatCard } from '../../components/ui/StatCard';
import { BookingCard } from '../../components/ui/BookingCard';
import * as Haptics from 'expo-haptics';

export default function DashboardScreen() {
  const insets = useSafeAreaInsets();
  const { dashboardStats, bookings, updateBookingStatus } = useApp();

  const activeBookings = bookings.filter(
    b => b.status === 'pending' || b.status === 'confirmed' || b.status === 'ongoing'
  ).slice(0, 3);

  const handleStatusUpdate = (bookingId: string, status: any) => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    updateBookingStatus(bookingId, status);
  };

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={{ paddingBottom: insets.bottom + 16 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Welcome back! 👋</Text>
            <Text style={styles.subtitle}>Premium Auto Rentals</Text>
          </View>
          <Pressable style={styles.notificationButton}>
            <MaterialIcons name="notifications-none" size={26} color={theme.textPrimary} />
            <View style={styles.notificationBadge}>
              <Text style={styles.badgeText}>3</Text>
            </View>
          </Pressable>
        </View>

        {/* Revenue Card */}
        <View style={styles.revenueContainer}>
          <LinearGradient
            colors={[theme.primary, theme.primaryDark]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.revenueCard}
          >
            <View style={styles.revenueHeader}>
              <Text style={styles.revenueLabel}>Monthly Revenue</Text>
              <View style={styles.trendBadge}>
                <MaterialIcons name="trending-up" size={14} color={theme.success} />
                <Text style={styles.trendText}>+12%</Text>
              </View>
            </View>
            <Text style={styles.revenueAmount}>
              ${dashboardStats.monthlyRevenue.toLocaleString()}
            </Text>
            <View style={styles.revenueFooter}>
              <View style={styles.revenueItem}>
                <Text style={styles.revenueItemLabel}>This Week</Text>
                <Text style={styles.revenueItemValue}>
                  ${dashboardStats.weeklyRevenue.toLocaleString()}
                </Text>
              </View>
              <View style={styles.revenueDivider} />
              <View style={styles.revenueItem}>
                <Text style={styles.revenueItemLabel}>Occupancy</Text>
                <Text style={styles.revenueItemValue}>{dashboardStats.occupancyRate}%</Text>
              </View>
            </View>
          </LinearGradient>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          <StatCard
            icon="directions-car"
            value={dashboardStats.totalVehicles}
            label="Total Vehicles"
            color={theme.primary}
          />
          <StatCard
            icon="assignment"
            value={dashboardStats.activeRentals}
            label="Active Rentals"
            color={theme.success}
          />
        </View>
        <View style={styles.statsGrid}>
          <StatCard
            icon="login"
            value={dashboardStats.todayPickups}
            label="Today Pickups"
            color={theme.accent}
          />
          <StatCard
            icon="logout"
            value={dashboardStats.todayReturns}
            label="Today Returns"
            color="#8B5CF6"
          />
        </View>

        {/* Quick Actions */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
        </View>
        <View style={styles.actionsRow}>
          <Pressable style={[styles.actionButton, { backgroundColor: `${theme.primary}15` }]}>
            <MaterialIcons name="add-circle" size={28} color={theme.primary} />
            <Text style={styles.actionLabel}>Add Vehicle</Text>
          </Pressable>
          <Pressable style={[styles.actionButton, { backgroundColor: `${theme.success}15` }]}>
            <MaterialIcons name="qr-code-scanner" size={28} color={theme.success} />
            <Text style={styles.actionLabel}>Scan QR</Text>
          </Pressable>
          <Pressable style={[styles.actionButton, { backgroundColor: `${theme.accent}15` }]}>
            <MaterialIcons name="assessment" size={28} color={theme.accent} />
            <Text style={styles.actionLabel}>Reports</Text>
          </Pressable>
        </View>

        {/* Recent Bookings */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Bookings</Text>
          <Pressable>
            <Text style={styles.seeAll}>View All</Text>
          </Pressable>
        </View>
        {activeBookings.map((booking) => (
          <View key={booking.id} style={styles.bookingWrapper}>
            <BookingCard
              booking={booking}
              showActions={true}
              onStatusUpdate={(status) => handleStatusUpdate(booking.id, status)}
            />
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.backgroundSecondary,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
    paddingBottom: spacing.lg,
  },
  greeting: {
    fontSize: 24,
    fontWeight: '700',
    color: theme.textPrimary,
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 15,
    color: theme.textSecondary,
  },
  notificationButton: {
    width: 44,
    height: 44,
    borderRadius: borderRadius.full,
    backgroundColor: theme.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationBadge: {
    position: 'absolute',
    top: 6,
    right: 6,
    backgroundColor: theme.error,
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: '#FFF',
    fontSize: 11,
    fontWeight: '700',
  },
  revenueContainer: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },
  revenueCard: {
    borderRadius: borderRadius.large,
    padding: spacing.xl,
  },
  revenueHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  revenueLabel: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
  },
  trendBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: borderRadius.small,
  },
  trendText: {
    fontSize: 12,
    fontWeight: '600',
    color: theme.success,
  },
  revenueAmount: {
    fontSize: 42,
    fontWeight: '700',
    color: '#FFF',
    marginBottom: spacing.lg,
  },
  revenueFooter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  revenueItem: {
    flex: 1,
  },
  revenueItemLabel: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.7)',
    marginBottom: 2,
  },
  revenueItemValue: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFF',
  },
  revenueDivider: {
    width: 1,
    height: 36,
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginHorizontal: spacing.lg,
  },
  statsGrid: {
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    marginTop: spacing.lg,
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.textPrimary,
  },
  seeAll: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.primary,
  },
  actionsRow: {
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
    gap: spacing.md,
  },
  actionButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: spacing.lg,
    borderRadius: borderRadius.large,
    gap: spacing.sm,
  },
  actionLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: theme.textPrimary,
  },
  bookingWrapper: {
    paddingHorizontal: spacing.lg,
  },
});
