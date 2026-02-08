import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { theme, spacing, borderRadius } from '../../constants/theme';
import { useApp } from '../../contexts/AppContext';
import { BookingCard } from '../../components/ui/BookingCard';
import { Image } from 'expo-image';
import * as Haptics from 'expo-haptics';

type TabType = 'upcoming' | 'completed' | 'cancelled';

export default function BookingsScreen() {
  const insets = useSafeAreaInsets();
  const { bookings, updateBookingStatus, userRole } = useApp();
  const [activeTab, setActiveTab] = useState<TabType>('upcoming');

  const upcomingBookings = bookings.filter(
    b => b.status === 'pending' || b.status === 'confirmed' || b.status === 'ongoing'
  );
  const completedBookings = bookings.filter(b => b.status === 'completed');
  const cancelledBookings = bookings.filter(b => b.status === 'cancelled');

  const displayBookings = 
    activeTab === 'upcoming' ? upcomingBookings :
    activeTab === 'completed' ? completedBookings : cancelledBookings;

  const handleStatusUpdate = (bookingId: string, status: any) => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    updateBookingStatus(bookingId, status);
  };

  const tabs: { id: TabType; label: string; count: number }[] = [
    { id: 'upcoming', label: 'Upcoming', count: upcomingBookings.length },
    { id: 'completed', label: 'Completed', count: completedBookings.length },
    { id: 'cancelled', label: 'Cancelled', count: cancelledBookings.length },
  ];

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>
          {userRole === 'owner' ? 'Rental Management' : 'My Bookings'}
        </Text>
        <Pressable style={styles.searchButton}>
          <MaterialIcons name="search" size={24} color={theme.textPrimary} />
        </Pressable>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        {tabs.map((tab) => (
          <Pressable
            key={tab.id}
            style={[styles.tab, activeTab === tab.id && styles.tabActive]}
            onPress={() => {
              Haptics.selectionAsync();
              setActiveTab(tab.id);
            }}
          >
            <Text style={[styles.tabText, activeTab === tab.id && styles.tabTextActive]}>
              {tab.label}
            </Text>
            <View style={[styles.tabBadge, activeTab === tab.id && styles.tabBadgeActive]}>
              <Text style={[styles.tabBadgeText, activeTab === tab.id && styles.tabBadgeTextActive]}>
                {tab.count}
              </Text>
            </View>
          </Pressable>
        ))}
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + 16 }
        ]}
        showsVerticalScrollIndicator={false}
      >
        {displayBookings.length > 0 ? (
          displayBookings.map((booking) => (
            <BookingCard
              key={booking.id}
              booking={booking}
              showActions={userRole === 'owner'}
              onStatusUpdate={(status) => handleStatusUpdate(booking.id, status)}
            />
          ))
        ) : (
          <View style={styles.emptyState}>
            <Image
              source={require('../../assets/images/empty-bookings.png')}
              style={styles.emptyImage}
              contentFit="contain"
            />
            <Text style={styles.emptyTitle}>No {activeTab} bookings</Text>
            <Text style={styles.emptySubtitle}>
              {activeTab === 'upcoming' 
                ? "You don't have any upcoming rentals. Browse vehicles to book one!"
                : `Your ${activeTab} bookings will appear here`
              }
            </Text>
          </View>
        )}
      </ScrollView>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: theme.textPrimary,
  },
  searchButton: {
    width: 44,
    height: 44,
    borderRadius: borderRadius.full,
    backgroundColor: theme.backgroundSecondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg,
    gap: spacing.sm,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
    paddingVertical: spacing.sm,
    backgroundColor: theme.backgroundSecondary,
    borderRadius: borderRadius.medium,
    borderWidth: 1,
    borderColor: theme.border,
  },
  tabActive: {
    backgroundColor: theme.primary,
    borderColor: theme.primary,
  },
  tabText: {
    fontSize: 13,
    fontWeight: '600',
    color: theme.textSecondary,
  },
  tabTextActive: {
    color: '#FFF',
  },
  tabBadge: {
    backgroundColor: theme.border,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: borderRadius.full,
  },
  tabBadgeActive: {
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  tabBadgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: theme.textSecondary,
  },
  tabBadgeTextActive: {
    color: '#FFF',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
  },
  emptyState: {
    alignItems: 'center',
    paddingTop: spacing.xxl,
    paddingHorizontal: spacing.xl,
  },
  emptyImage: {
    width: 200,
    height: 200,
    marginBottom: spacing.lg,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: theme.textPrimary,
    marginBottom: spacing.sm,
  },
  emptySubtitle: {
    fontSize: 15,
    color: theme.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },
});
