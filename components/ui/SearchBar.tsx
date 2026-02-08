import React from 'react';
import { View, Text, TextInput, StyleSheet, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { theme, borderRadius, spacing } from '../../constants/theme';
import * as Haptics from 'expo-haptics';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  onFilterPress?: () => void;
}

export function SearchBar({ 
  value, 
  onChangeText, 
  placeholder = 'Search vehicles...',
  onFilterPress 
}: SearchBarProps) {
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <MaterialIcons name="search" size={22} color={theme.textMuted} />
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={theme.textMuted}
        />
        {value.length > 0 && (
          <Pressable 
            onPress={() => {
              Haptics.selectionAsync();
              onChangeText('');
            }}
            hitSlop={8}
          >
            <MaterialIcons name="close" size={20} color={theme.textMuted} />
          </Pressable>
        )}
      </View>
      {onFilterPress && (
        <Pressable 
          style={styles.filterButton}
          onPress={() => {
            Haptics.selectionAsync();
            onFilterPress();
          }}
        >
          <MaterialIcons name="tune" size={22} color={theme.primary} />
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: spacing.sm,
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },
  inputContainer: {
    flex: 1,
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
  filterButton: {
    width: 48,
    height: 48,
    backgroundColor: theme.backgroundSecondary,
    borderRadius: borderRadius.medium,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: theme.border,
  },
});
