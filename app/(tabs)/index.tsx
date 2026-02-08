import React from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { theme, spacing, borderRadius, shadows } from '../../constants/theme';
import { useApp } from '../../contexts/AppContext';
import { VehicleCard } from '../../components/ui/VehicleCard';
import { SearchBar } from '../../components/ui/SearchBar';
import { CategoryFilter } from '../../components/ui/CategoryFilter';
import { getVehiclesByCategory, getAvailableVehicles } from '../../services/mockData';

export default function ExploreScreen() {
  const insets = useSafeAreaInsets();
  const { 
    currentUser, 
    selectedCategory, 
    setSelectedCategory,
    searchQuery,
    setSearchQuery 
  } = useApp();

  const vehicles = getVehiclesByCategory(selectedCategory);
  const filteredVehicles = vehicles.filter(v => 
    searchQuery === '' || 
    `${v.make} ${v.model}`.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const popularVehicles = getAvailableVehicles().slice(0, 6);

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
            <Text style={styles.greeting}>Hello, {currentUser?.name.split(' ')[0]} 👋</Text>
            <Text style={styles.subtitle}>Find your perfect ride</Text>
          </View>
          <Pressable style={styles.notificationButton}>
            <MaterialIcons name="notifications-none" size={26} color={theme.textPrimary} />
            <View style={styles.notificationBadge} />
          </Pressable>
        </View>

        {/* Search */}
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search by brand, model..."
          onFilterPress={() => {}}
        />

        {/* Hero Banner */}
        <View style={styles.heroBannerContainer}>
          <LinearGradient
            colors={[theme.primary, theme.primaryDark]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.heroBanner}
          >
            <View style={styles.heroContent}>
              <Text style={styles.heroTag}>SPECIAL OFFER</Text>
              <Text style={styles.heroTitle}>20% Off</Text>
              <Text style={styles.heroSubtitle}>Weekend Rentals</Text>
              <Pressable style={styles.heroButton}>
                <Text style={styles.heroButtonText}>Book Now</Text>
              </Pressable>
            </View>
            <Image
              source={require('../../assets/images/hero-car.jpg')}
              style={styles.heroImage}
              contentFit="cover"
            />
          </LinearGradient>
        </View>

        {/* Categories */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Categories</Text>
        </View>
        <CategoryFilter
          selectedCategory={selectedCategory}
          onSelect={setSelectedCategory}
        />

        {/* Vehicle Grid */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            {selectedCategory === 'all' ? 'All Vehicles' : `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}s`}
          </Text>
          <Text style={styles.resultCount}>{filteredVehicles.length} available</Text>
        </View>
        <View style={styles.vehicleGrid}>
          {filteredVehicles.slice(0, 6).map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </View>

        {/* Popular Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Popular Picks</Text>
          <Pressable>
            <Text style={styles.seeAll}>See All</Text>
          </Pressable>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.popularScroll}
        >
          {popularVehicles.map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} variant="compact" />
          ))}
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
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
    backgroundColor: theme.backgroundSecondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.accent,
  },
  heroBannerContainer: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.xl,
  },
  heroBanner: {
    borderRadius: borderRadius.large,
    overflow: 'hidden',
    flexDirection: 'row',
    height: 160,
  },
  heroContent: {
    flex: 1,
    padding: spacing.lg,
    justifyContent: 'center',
  },
  heroTag: {
    fontSize: 11,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.8)',
    letterSpacing: 1,
    marginBottom: spacing.xs,
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FFF',
    lineHeight: 36,
  },
  heroSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    marginBottom: spacing.md,
  },
  heroButton: {
    backgroundColor: theme.accent,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.small,
    alignSelf: 'flex-start',
  },
  heroButtonText: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: 13,
  },
  heroImage: {
    width: 140,
    height: '100%',
    opacity: 0.9,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.textPrimary,
  },
  resultCount: {
    fontSize: 13,
    color: theme.textSecondary,
  },
  seeAll: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.primary,
  },
  vehicleGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: spacing.lg,
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  popularScroll: {
    paddingHorizontal: spacing.lg,
  },
});
