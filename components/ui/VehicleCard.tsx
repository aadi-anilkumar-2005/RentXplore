import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { theme, shadows, borderRadius, spacing } from '../../constants/theme';
import { Vehicle } from '../../services/mockData';
import { useApp } from '../../contexts/AppContext';
import * as Haptics from 'expo-haptics';

interface VehicleCardProps {
  vehicle: Vehicle;
  variant?: 'default' | 'compact' | 'horizontal';
}

export function VehicleCard({ vehicle, variant = 'default' }: VehicleCardProps) {
  const router = useRouter();
  const { favorites, toggleFavorite } = useApp();
  const isFavorite = favorites.includes(vehicle.id);

  const handlePress = () => {
    Haptics.selectionAsync();
    router.push(`/vehicle/${vehicle.id}`);
  };

  const handleFavorite = () => {
    Haptics.selectionAsync();
    toggleFavorite(vehicle.id);
  };

  if (variant === 'horizontal') {
    return (
      <Pressable 
        style={[styles.horizontalCard, shadows.card]} 
        onPress={handlePress}
      >
        <Image
          source={{ uri: vehicle.image }}
          style={styles.horizontalImage}
          contentFit="cover"
          transition={200}
        />
        <View style={styles.horizontalContent}>
          <View style={styles.horizontalHeader}>
            <Text style={styles.vehicleName} numberOfLines={1}>
              {vehicle.make} {vehicle.model}
            </Text>
            <Pressable onPress={handleFavorite} hitSlop={8}>
              <MaterialIcons
                name={isFavorite ? 'favorite' : 'favorite-border'}
                size={20}
                color={isFavorite ? theme.error : theme.textMuted}
              />
            </Pressable>
          </View>
          <Text style={styles.vehicleYear}>{vehicle.year} • {vehicle.category}</Text>
          <View style={styles.ratingRow}>
            <MaterialIcons name="star" size={14} color="#FBBF24" />
            <Text style={styles.ratingText}>{vehicle.rating}</Text>
            <Text style={styles.reviewCount}>({vehicle.reviewCount})</Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={styles.price}>${vehicle.dailyRate}</Text>
            <Text style={styles.perDay}>/day</Text>
          </View>
        </View>
      </Pressable>
    );
  }

  if (variant === 'compact') {
    return (
      <Pressable style={[styles.compactCard, shadows.card]} onPress={handlePress}>
        <Image
          source={{ uri: vehicle.image }}
          style={styles.compactImage}
          contentFit="cover"
          transition={200}
        />
        <View style={styles.compactContent}>
          <Text style={styles.compactName} numberOfLines={1}>
            {vehicle.make} {vehicle.model}
          </Text>
          <Text style={styles.compactPrice}>${vehicle.dailyRate}/day</Text>
        </View>
      </Pressable>
    );
  }

  return (
    <Pressable style={[styles.card, shadows.card]} onPress={handlePress}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: vehicle.image }}
          style={styles.image}
          contentFit="cover"
          transition={200}
        />
        <Pressable style={styles.favoriteButton} onPress={handleFavorite} hitSlop={8}>
          <MaterialIcons
            name={isFavorite ? 'favorite' : 'favorite-border'}
            size={22}
            color={isFavorite ? theme.error : '#FFF'}
          />
        </Pressable>
        {!vehicle.isAvailable && (
          <View style={styles.unavailableBadge}>
            <Text style={styles.unavailableText}>Booked</Text>
          </View>
        )}
      </View>
      <View style={styles.content}>
        <Text style={styles.vehicleName} numberOfLines={1}>
          {vehicle.make} {vehicle.model}
        </Text>
        <Text style={styles.vehicleYear}>{vehicle.year}</Text>
        <View style={styles.footer}>
          <View style={styles.ratingRow}>
            <MaterialIcons name="star" size={14} color="#FBBF24" />
            <Text style={styles.ratingText}>{vehicle.rating}</Text>
            <Text style={styles.reviewCount}>({vehicle.reviewCount})</Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={styles.price}>${vehicle.dailyRate}</Text>
            <Text style={styles.perDay}>/day</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.surface,
    borderRadius: borderRadius.large,
    overflow: 'hidden',
    width: '48%',
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 140,
  },
  favoriteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: borderRadius.full,
    padding: 6,
  },
  unavailableBadge: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    backgroundColor: theme.error,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: borderRadius.small,
  },
  unavailableText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: '600',
  },
  content: {
    padding: spacing.md,
  },
  vehicleName: {
    fontSize: 15,
    fontWeight: '600',
    color: theme.textPrimary,
    marginBottom: 2,
  },
  vehicleYear: {
    fontSize: 13,
    color: theme.textSecondary,
    marginBottom: spacing.sm,
    textTransform: 'capitalize',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  ratingText: {
    fontSize: 13,
    fontWeight: '600',
    color: theme.textPrimary,
  },
  reviewCount: {
    fontSize: 12,
    color: theme.textMuted,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  price: {
    fontSize: 16,
    fontWeight: '700',
    color: theme.accent,
  },
  perDay: {
    fontSize: 12,
    color: theme.textSecondary,
  },
  // Horizontal variant
  horizontalCard: {
    backgroundColor: theme.surface,
    borderRadius: borderRadius.large,
    overflow: 'hidden',
    flexDirection: 'row',
    marginBottom: spacing.md,
  },
  horizontalImage: {
    width: 120,
    height: 110,
  },
  horizontalContent: {
    flex: 1,
    padding: spacing.md,
    justifyContent: 'space-between',
  },
  horizontalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  // Compact variant
  compactCard: {
    backgroundColor: theme.surface,
    borderRadius: borderRadius.medium,
    overflow: 'hidden',
    width: 160,
    marginRight: spacing.md,
  },
  compactImage: {
    width: 160,
    height: 100,
  },
  compactContent: {
    padding: spacing.sm,
  },
  compactName: {
    fontSize: 13,
    fontWeight: '600',
    color: theme.textPrimary,
    marginBottom: 2,
  },
  compactPrice: {
    fontSize: 12,
    fontWeight: '600',
    color: theme.accent,
  },
});
