import React from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable, Dimensions } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Image } from 'expo-image';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { theme, spacing, borderRadius, shadows } from '../../constants/theme';
import { getVehicleById } from '../../services/mockData';
import { useApp } from '../../contexts/AppContext';
import * as Haptics from 'expo-haptics';

const { width } = Dimensions.get('window');

export default function VehicleDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { favorites, toggleFavorite } = useApp();

  const vehicle = getVehicleById(id);
  const isFavorite = favorites.includes(id);

  if (!vehicle) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Vehicle not found</Text>
      </SafeAreaView>
    );
  }

  const handleBookNow = () => {
    Haptics.selectionAsync();
    router.push(`/booking/${vehicle.id}`);
  };

  const handleFavorite = () => {
    Haptics.selectionAsync();
    toggleFavorite(vehicle.id);
  };

  return (
    <View style={styles.container}>
      {/* Hero Image */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: vehicle.image }}
          style={styles.heroImage}
          contentFit="cover"
        />
        <LinearGradient
          colors={['rgba(0,0,0,0.4)', 'transparent', 'transparent']}
          style={styles.imageOverlay}
        />
        
        {/* Header */}
        <SafeAreaView edges={['top']} style={styles.headerSafe}>
          <View style={styles.header}>
            <Pressable 
              style={styles.backButton}
              onPress={() => {
                Haptics.selectionAsync();
                router.back();
              }}
            >
              <MaterialIcons name="arrow-back" size={24} color="#FFF" />
            </Pressable>
            <View style={styles.headerRight}>
              <Pressable style={styles.iconButton} onPress={() => {}}>
                <MaterialIcons name="share" size={22} color="#FFF" />
              </Pressable>
              <Pressable style={styles.iconButton} onPress={handleFavorite}>
                <MaterialIcons 
                  name={isFavorite ? 'favorite' : 'favorite-border'} 
                  size={22} 
                  color={isFavorite ? theme.error : '#FFF'} 
                />
              </Pressable>
            </View>
          </View>
        </SafeAreaView>

        {/* Availability Badge */}
        {!vehicle.isAvailable && (
          <View style={styles.unavailableBadge}>
            <Text style={styles.unavailableText}>Currently Rented</Text>
          </View>
        )}
      </View>

      {/* Content */}
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={{ paddingBottom: insets.bottom + 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Title Section */}
        <View style={styles.titleSection}>
          <View style={styles.titleRow}>
            <View style={styles.titleInfo}>
              <Text style={styles.vehicleName}>
                {vehicle.make} {vehicle.model}
              </Text>
              <Text style={styles.vehicleYear}>{vehicle.year}</Text>
            </View>
            <View style={styles.priceContainer}>
              <Text style={styles.price}>${vehicle.dailyRate}</Text>
              <Text style={styles.perDay}>/day</Text>
            </View>
          </View>
          
          <View style={styles.ratingRow}>
            <MaterialIcons name="star" size={18} color="#FBBF24" />
            <Text style={styles.rating}>{vehicle.rating}</Text>
            <Text style={styles.reviews}>({vehicle.reviewCount} reviews)</Text>
            <View style={styles.locationTag}>
              <MaterialIcons name="location-on" size={14} color={theme.textSecondary} />
              <Text style={styles.locationText}>{vehicle.location}</Text>
            </View>
          </View>
        </View>

        {/* Shop Info */}
        <View style={[styles.shopCard, shadows.card]}>
          <View style={styles.shopIcon}>
            <MaterialIcons name="store" size={24} color={theme.primary} />
          </View>
          <View style={styles.shopInfo}>
            <Text style={styles.shopName}>{vehicle.shopName}</Text>
            <View style={styles.shopRating}>
              <MaterialIcons name="verified" size={14} color={theme.success} />
              <Text style={styles.shopVerified}>Verified Partner</Text>
            </View>
          </View>
          <Pressable style={styles.contactButton}>
            <MaterialIcons name="chat" size={20} color={theme.primary} />
          </Pressable>
        </View>

        {/* Specs */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Specifications</Text>
          <View style={styles.specsGrid}>
            {vehicle.seats && (
              <View style={styles.specItem}>
                <MaterialIcons name="people" size={24} color={theme.primary} />
                <Text style={styles.specValue}>{vehicle.seats}</Text>
                <Text style={styles.specLabel}>Seats</Text>
              </View>
            )}
            {vehicle.transmission && (
              <View style={styles.specItem}>
                <MaterialIcons name="settings" size={24} color={theme.primary} />
                <Text style={styles.specValue}>{vehicle.transmission}</Text>
                <Text style={styles.specLabel}>Transmission</Text>
              </View>
            )}
            {vehicle.fuelType && (
              <View style={styles.specItem}>
                <MaterialIcons name="local-gas-station" size={24} color={theme.primary} />
                <Text style={styles.specValue}>{vehicle.fuelType}</Text>
                <Text style={styles.specLabel}>Fuel</Text>
              </View>
            )}
            <View style={styles.specItem}>
              <MaterialIcons name="category" size={24} color={theme.primary} />
              <Text style={styles.specValue}>{vehicle.category}</Text>
              <Text style={styles.specLabel}>Type</Text>
            </View>
          </View>
        </View>

        {/* Features */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Features</Text>
          <View style={styles.featuresGrid}>
            {vehicle.features.map((feature, index) => (
              <View key={index} style={styles.featureItem}>
                <MaterialIcons name="check-circle" size={18} color={theme.success} />
                <Text style={styles.featureText}>{feature}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Rental Terms */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Rental Terms</Text>
          <View style={styles.termsCard}>
            <View style={styles.termItem}>
              <MaterialIcons name="access-time" size={20} color={theme.textSecondary} />
              <Text style={styles.termText}>Minimum rental: 1 day</Text>
            </View>
            <View style={styles.termItem}>
              <MaterialIcons name="security" size={20} color={theme.textSecondary} />
              <Text style={styles.termText}>Insurance included</Text>
            </View>
            <View style={styles.termItem}>
              <MaterialIcons name="local-gas-station" size={20} color={theme.textSecondary} />
              <Text style={styles.termText}>Return with same fuel level</Text>
            </View>
            <View style={styles.termItem}>
              <MaterialIcons name="cancel" size={20} color={theme.textSecondary} />
              <Text style={styles.termText}>Free cancellation up to 24h</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom CTA */}
      <View style={[styles.bottomBar, { paddingBottom: insets.bottom + 16 }]}>
        <View style={styles.bottomPriceRow}>
          <Text style={styles.bottomPrice}>${vehicle.dailyRate}</Text>
          <Text style={styles.bottomPerDay}>/day</Text>
        </View>
        <Pressable 
          style={[
            styles.bookButton, 
            !vehicle.isAvailable && styles.bookButtonDisabled
          ]}
          onPress={vehicle.isAvailable ? handleBookNow : undefined}
        >
          <Text style={styles.bookButtonText}>
            {vehicle.isAvailable ? 'Book Now' : 'Not Available'}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
  },
  imageContainer: {
    position: 'relative',
    height: 300,
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  headerSafe: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: borderRadius.full,
    backgroundColor: 'rgba(0,0,0,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerRight: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: borderRadius.full,
    backgroundColor: 'rgba(0,0,0,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  unavailableBadge: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    backgroundColor: theme.error,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: borderRadius.small,
  },
  unavailableText: {
    color: '#FFF',
    fontSize: 13,
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
  titleSection: {
    padding: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: theme.borderLight,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.sm,
  },
  titleInfo: {
    flex: 1,
  },
  vehicleName: {
    fontSize: 24,
    fontWeight: '700',
    color: theme.textPrimary,
    marginBottom: 2,
  },
  vehicleYear: {
    fontSize: 16,
    color: theme.textSecondary,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  price: {
    fontSize: 28,
    fontWeight: '700',
    color: theme.accent,
  },
  perDay: {
    fontSize: 14,
    color: theme.textSecondary,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  rating: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.textPrimary,
    marginLeft: 4,
  },
  reviews: {
    fontSize: 14,
    color: theme.textSecondary,
    marginLeft: 4,
  },
  locationTag: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: spacing.md,
    gap: 2,
  },
  locationText: {
    fontSize: 13,
    color: theme.textSecondary,
  },
  shopCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: spacing.lg,
    marginTop: spacing.lg,
    padding: spacing.md,
    backgroundColor: theme.surface,
    borderRadius: borderRadius.large,
  },
  shopIcon: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.medium,
    backgroundColor: `${theme.primary}15`,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shopInfo: {
    flex: 1,
    marginLeft: spacing.md,
  },
  shopName: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.textPrimary,
    marginBottom: 2,
  },
  shopRating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  shopVerified: {
    fontSize: 13,
    color: theme.success,
  },
  contactButton: {
    width: 44,
    height: 44,
    borderRadius: borderRadius.full,
    backgroundColor: theme.backgroundSecondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  section: {
    padding: spacing.lg,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.textPrimary,
    marginBottom: spacing.md,
  },
  specsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  specItem: {
    width: (width - spacing.lg * 2 - spacing.md * 3) / 4,
    alignItems: 'center',
    backgroundColor: theme.backgroundSecondary,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.medium,
  },
  specValue: {
    fontSize: 13,
    fontWeight: '600',
    color: theme.textPrimary,
    marginTop: spacing.xs,
    textTransform: 'capitalize',
  },
  specLabel: {
    fontSize: 11,
    color: theme.textSecondary,
    marginTop: 2,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    backgroundColor: theme.backgroundSecondary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
  },
  featureText: {
    fontSize: 13,
    color: theme.textPrimary,
  },
  termsCard: {
    backgroundColor: theme.backgroundSecondary,
    borderRadius: borderRadius.large,
    padding: spacing.lg,
    gap: spacing.md,
  },
  termItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  termText: {
    fontSize: 14,
    color: theme.textSecondary,
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
  bottomPriceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  bottomPrice: {
    fontSize: 24,
    fontWeight: '700',
    color: theme.textPrimary,
  },
  bottomPerDay: {
    fontSize: 14,
    color: theme.textSecondary,
  },
  bookButton: {
    backgroundColor: theme.accent,
    paddingHorizontal: spacing.xxl,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.medium,
  },
  bookButtonDisabled: {
    backgroundColor: theme.textMuted,
  },
  bookButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
