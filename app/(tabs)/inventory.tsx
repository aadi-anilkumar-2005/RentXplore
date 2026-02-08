import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable, TextInput } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { theme, spacing, borderRadius, shadows } from '../../constants/theme';
import { useApp } from '../../contexts/AppContext';
import { VehicleCard } from '../../components/ui/VehicleCard';
import { CategoryFilter } from '../../components/ui/CategoryFilter';
import { categories } from '../../constants/theme';
import { Image } from 'expo-image';
import * as Haptics from 'expo-haptics';

export default function InventoryScreen() {
  const insets = useSafeAreaInsets();
  const { vehicles } = useApp();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter to owner's vehicles (mock: show all)
  const myVehicles = vehicles.filter(v => {
    const matchesCategory = selectedCategory === 'all' || v.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      `${v.make} ${v.model}`.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const availableCount = myVehicles.filter(v => v.isAvailable).length;
  const maintenanceCount = myVehicles.filter(v => v.status === 'maintenance').length;

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Inventory</Text>
        <Pressable 
          style={styles.addButton}
          onPress={() => Haptics.selectionAsync()}
        >
          <MaterialIcons name="add" size={24} color="#FFF" />
        </Pressable>
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInput}>
          <MaterialIcons name="search" size={22} color={theme.textMuted} />
          <TextInput
            style={styles.input}
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search vehicles..."
            placeholderTextColor={theme.textMuted}
          />
        </View>
      </View>

      {/* Stats */}
      <View style={styles.statsRow}>
        <View style={[styles.statBadge, { backgroundColor: `${theme.success}15` }]}>
          <View style={[styles.statDot, { backgroundColor: theme.success }]} />
          <Text style={styles.statText}>{availableCount} Available</Text>
        </View>
        <View style={[styles.statBadge, { backgroundColor: `${theme.warning}15` }]}>
          <View style={[styles.statDot, { backgroundColor: theme.warning }]} />
          <Text style={styles.statText}>{maintenanceCount} Maintenance</Text>
        </View>
        <View style={[styles.statBadge, { backgroundColor: `${theme.primary}15` }]}>
          <Text style={styles.statText}>{myVehicles.length} Total</Text>
        </View>
      </View>

      {/* Categories */}
      <CategoryFilter
        selectedCategory={selectedCategory}
        onSelect={setSelectedCategory}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + 16 }
        ]}
        showsVerticalScrollIndicator={false}
      >
        {myVehicles.map((vehicle) => (
          <Pressable key={vehicle.id} style={[styles.vehicleRow, shadows.card]}>
            <Image
              source={{ uri: vehicle.image }}
              style={styles.vehicleImage}
              contentFit="cover"
            />
            <View style={styles.vehicleInfo}>
              <Text style={styles.vehicleName}>
                {vehicle.make} {vehicle.model}
              </Text>
              <Text style={styles.vehicleMeta}>
                {vehicle.year} • {vehicle.licensePlate}
              </Text>
              <View style={styles.vehicleStats}>
                <View style={[
                  styles.statusBadge, 
                  { backgroundColor: vehicle.isAvailable ? `${theme.success}15` : `${theme.error}15` }
                ]}>
                  <Text style={[
                    styles.statusText,
                    { color: vehicle.isAvailable ? theme.success : theme.error }
                  ]}>
                    {vehicle.isAvailable ? 'Available' : 'Rented'}
                  </Text>
                </View>
                <Text style={styles.dailyRate}>${vehicle.dailyRate}/day</Text>
              </View>
            </View>
            <View style={styles.vehicleActions}>
              <Pressable 
                style={styles.actionIcon}
                onPress={() => Haptics.selectionAsync()}
              >
                <MaterialIcons name="edit" size={20} color={theme.textSecondary} />
              </Pressable>
              <Pressable 
                style={styles.actionIcon}
                onPress={() => Haptics.selectionAsync()}
              >
                <MaterialIcons name="more-vert" size={20} color={theme.textSecondary} />
              </Pressable>
            </View>
          </Pressable>
        ))}
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
  addButton: {
    width: 44,
    height: 44,
    borderRadius: borderRadius.medium,
    backgroundColor: theme.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchContainer: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  searchInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.backgroundSecondary,
    borderRadius: borderRadius.medium,
    paddingHorizontal: spacing.md,
    gap: spacing.sm,
    height: 48,
    borderWidth: 1,
    borderColor: theme.border,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: theme.textPrimary,
  },
  statsRow: {
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  statBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
  },
  statDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  statText: {
    fontSize: 12,
    fontWeight: '600',
    color: theme.textPrimary,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
  },
  vehicleRow: {
    flexDirection: 'row',
    backgroundColor: theme.surface,
    borderRadius: borderRadius.large,
    padding: spacing.md,
    marginBottom: spacing.md,
    alignItems: 'center',
  },
  vehicleImage: {
    width: 80,
    height: 80,
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
  vehicleMeta: {
    fontSize: 13,
    color: theme.textSecondary,
    marginBottom: spacing.sm,
  },
  vehicleStats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: borderRadius.small,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
  },
  dailyRate: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.accent,
  },
  vehicleActions: {
    flexDirection: 'row',
    gap: spacing.xs,
  },
  actionIcon: {
    width: 36,
    height: 36,
    borderRadius: borderRadius.full,
    backgroundColor: theme.backgroundSecondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
