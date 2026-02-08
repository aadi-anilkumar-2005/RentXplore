import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring, 
  withDelay,
  withSequence,
  withTiming 
} from 'react-native-reanimated';
import { theme, spacing, borderRadius } from '../constants/theme';
import * as Haptics from 'expo-haptics';

export default function BookingConfirmationScreen() {
  const router = useRouter();
  
  const checkScale = useSharedValue(0);
  const textOpacity = useSharedValue(0);
  const buttonTranslateY = useSharedValue(50);

  useEffect(() => {
    checkScale.value = withSpring(1, { damping: 12 });
    textOpacity.value = withDelay(300, withTiming(1, { duration: 400 }));
    buttonTranslateY.value = withDelay(500, withSpring(0, { damping: 15 }));
    
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  }, []);

  const checkStyle = useAnimatedStyle(() => ({
    transform: [{ scale: checkScale.value }],
  }));

  const textStyle = useAnimatedStyle(() => ({
    opacity: textOpacity.value,
  }));

  const buttonStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: buttonTranslateY.value }],
    opacity: textOpacity.value,
  }));

  const handleViewBookings = () => {
    Haptics.selectionAsync();
    router.replace('/(tabs)/bookings');
  };

  const handleBackHome = () => {
    Haptics.selectionAsync();
    router.replace('/(tabs)/');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Success Icon */}
        <Animated.View style={[styles.iconContainer, checkStyle]}>
          <LinearGradient
            colors={[theme.success, '#059669']}
            style={styles.iconGradient}
          >
            <MaterialIcons name="check" size={64} color="#FFF" />
          </LinearGradient>
        </Animated.View>

        {/* Text */}
        <Animated.View style={[styles.textContainer, textStyle]}>
          <Text style={styles.title}>Booking Confirmed!</Text>
          <Text style={styles.subtitle}>
            Your vehicle has been reserved successfully. You'll receive a confirmation email shortly.
          </Text>
        </Animated.View>

        {/* Info Card */}
        <Animated.View style={[styles.infoCard, textStyle]}>
          <View style={styles.infoRow}>
            <MaterialIcons name="email" size={20} color={theme.textSecondary} />
            <Text style={styles.infoText}>Confirmation sent to your email</Text>
          </View>
          <View style={styles.infoRow}>
            <MaterialIcons name="notifications" size={20} color={theme.textSecondary} />
            <Text style={styles.infoText}>You'll be reminded before pickup</Text>
          </View>
          <View style={styles.infoRow}>
            <MaterialIcons name="support-agent" size={20} color={theme.textSecondary} />
            <Text style={styles.infoText}>24/7 customer support available</Text>
          </View>
        </Animated.View>
      </View>

      {/* Buttons */}
      <Animated.View style={[styles.buttonContainer, buttonStyle]}>
        <Pressable style={styles.primaryButton} onPress={handleViewBookings}>
          <Text style={styles.primaryButtonText}>View My Bookings</Text>
        </Pressable>
        <Pressable style={styles.secondaryButton} onPress={handleBackHome}>
          <Text style={styles.secondaryButtonText}>Back to Home</Text>
        </Pressable>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
  },
  iconContainer: {
    marginBottom: spacing.xxl,
  },
  iconGradient: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: spacing.xxl,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: theme.textPrimary,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: theme.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: spacing.lg,
  },
  infoCard: {
    backgroundColor: theme.backgroundSecondary,
    borderRadius: borderRadius.large,
    padding: spacing.lg,
    width: '100%',
    gap: spacing.md,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  infoText: {
    fontSize: 14,
    color: theme.textSecondary,
    flex: 1,
  },
  buttonContainer: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
    gap: spacing.md,
  },
  primaryButton: {
    backgroundColor: theme.primary,
    paddingVertical: spacing.lg,
    borderRadius: borderRadius.medium,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
  },
  secondaryButton: {
    backgroundColor: theme.backgroundSecondary,
    paddingVertical: spacing.lg,
    borderRadius: borderRadius.medium,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.border,
  },
  secondaryButtonText: {
    color: theme.textPrimary,
    fontSize: 16,
    fontWeight: '600',
  },
});
