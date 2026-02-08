import React from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable, Switch } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { theme, spacing, borderRadius, shadows } from '../../constants/theme';
import { useApp } from '../../contexts/AppContext';
import * as Haptics from 'expo-haptics';

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const { currentUser, userRole, setUserRole, logout } = useApp();

  const handleRoleSwitch = () => {
    Haptics.selectionAsync();
    setUserRole(userRole === 'customer' ? 'owner' : 'customer');
  };

  const menuItems = [
    { 
      icon: 'person-outline' as const, 
      label: 'Personal Information', 
      onPress: () => {} 
    },
    { 
      icon: 'credit-card' as const, 
      label: 'Payment Methods', 
      onPress: () => {} 
    },
    { 
      icon: 'history' as const, 
      label: 'Rental History', 
      onPress: () => {} 
    },
    { 
      icon: 'notifications-none' as const, 
      label: 'Notifications', 
      onPress: () => {} 
    },
    { 
      icon: 'help-outline' as const, 
      label: 'Help & Support', 
      onPress: () => {} 
    },
    { 
      icon: 'privacy-tip' as const, 
      label: 'Privacy Policy', 
      onPress: () => {} 
    },
  ];

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={{ paddingBottom: insets.bottom + 16 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Profile</Text>
          <Pressable style={styles.settingsButton}>
            <MaterialIcons name="settings" size={24} color={theme.textPrimary} />
          </Pressable>
        </View>

        {/* Profile Card */}
        <View style={[styles.profileCard, shadows.card]}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {currentUser?.name.split(' ').map(n => n[0]).join('')}
            </Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.userName}>{currentUser?.name}</Text>
            <Text style={styles.userEmail}>{currentUser?.email}</Text>
            <View style={styles.roleBadge}>
              <MaterialIcons 
                name={userRole === 'owner' ? 'store' : 'person'} 
                size={14} 
                color={theme.primary} 
              />
              <Text style={styles.roleText}>
                {userRole === 'owner' ? 'Shop Owner' : 'Customer'}
              </Text>
            </View>
          </View>
          <Pressable style={styles.editButton}>
            <MaterialIcons name="edit" size={20} color={theme.primary} />
          </Pressable>
        </View>

        {/* Demo Mode Toggle */}
        <View style={[styles.demoCard, shadows.card]}>
          <View style={styles.demoInfo}>
            <MaterialIcons name="swap-horiz" size={24} color={theme.accent} />
            <View style={styles.demoText}>
              <Text style={styles.demoTitle}>Demo Mode</Text>
              <Text style={styles.demoSubtitle}>
                Switch between Customer & Owner views
              </Text>
            </View>
          </View>
          <Switch
            value={userRole === 'owner'}
            onValueChange={handleRoleSwitch}
            trackColor={{ false: theme.border, true: theme.primaryLight }}
            thumbColor={userRole === 'owner' ? theme.primary : theme.textMuted}
          />
        </View>

        {/* Menu Items */}
        <View style={styles.menuSection}>
          {menuItems.map((item, index) => (
            <Pressable
              key={index}
              style={styles.menuItem}
              onPress={() => {
                Haptics.selectionAsync();
                item.onPress();
              }}
            >
              <View style={styles.menuIcon}>
                <MaterialIcons name={item.icon} size={22} color={theme.textSecondary} />
              </View>
              <Text style={styles.menuLabel}>{item.label}</Text>
              <MaterialIcons name="chevron-right" size={22} color={theme.textMuted} />
            </Pressable>
          ))}
        </View>

        {/* Logout Button */}
        <Pressable 
          style={styles.logoutButton}
          onPress={() => {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
            logout();
          }}
        >
          <MaterialIcons name="logout" size={22} color={theme.error} />
          <Text style={styles.logoutText}>Log Out</Text>
        </Pressable>

        <Text style={styles.version}>Version 1.0.0</Text>
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
    paddingVertical: spacing.md,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: theme.textPrimary,
  },
  settingsButton: {
    width: 44,
    height: 44,
    borderRadius: borderRadius.full,
    backgroundColor: theme.backgroundSecondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.surface,
    marginHorizontal: spacing.lg,
    padding: spacing.lg,
    borderRadius: borderRadius.large,
    marginBottom: spacing.lg,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: theme.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFF',
  },
  profileInfo: {
    flex: 1,
    marginLeft: spacing.md,
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.textPrimary,
    marginBottom: 2,
  },
  userEmail: {
    fontSize: 14,
    color: theme.textSecondary,
    marginBottom: spacing.sm,
  },
  roleBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: `${theme.primary}15`,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: borderRadius.small,
    alignSelf: 'flex-start',
  },
  roleText: {
    fontSize: 12,
    fontWeight: '600',
    color: theme.primary,
  },
  editButton: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.full,
    backgroundColor: theme.backgroundSecondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  demoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.surface,
    marginHorizontal: spacing.lg,
    padding: spacing.lg,
    borderRadius: borderRadius.large,
    marginBottom: spacing.xl,
    borderWidth: 1,
    borderColor: theme.accent,
  },
  demoInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  demoText: {
    flex: 1,
  },
  demoTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: theme.textPrimary,
  },
  demoSubtitle: {
    fontSize: 13,
    color: theme.textSecondary,
  },
  menuSection: {
    backgroundColor: theme.surface,
    marginHorizontal: spacing.lg,
    borderRadius: borderRadius.large,
    overflow: 'hidden',
    marginBottom: spacing.xl,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: theme.borderLight,
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.medium,
    backgroundColor: theme.backgroundSecondary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  menuLabel: {
    flex: 1,
    fontSize: 15,
    color: theme.textPrimary,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    marginHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: `${theme.error}10`,
    borderRadius: borderRadius.medium,
    marginBottom: spacing.lg,
  },
  logoutText: {
    fontSize: 15,
    fontWeight: '600',
    color: theme.error,
  },
  version: {
    textAlign: 'center',
    fontSize: 13,
    color: theme.textMuted,
    marginBottom: spacing.lg,
  },
});
