import React from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { theme, borderRadius, spacing } from '../../constants/theme';
import { VEHICLE_CATEGORIES } from '../../constants/config';
import * as Haptics from 'expo-haptics';

interface CategoryFilterProps {
  selectedCategory: string;
  onSelect: (category: string) => void;
}

export function CategoryFilter({ selectedCategory, onSelect }: CategoryFilterProps) {
  const handleSelect = (categoryId: string) => {
    Haptics.selectionAsync();
    onSelect(categoryId);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {VEHICLE_CATEGORIES.map((category) => {
          const isSelected = selectedCategory === category.id;
          return (
            <Pressable
              key={category.id}
              style={[
                styles.chip,
                isSelected && styles.chipSelected,
              ]}
              onPress={() => handleSelect(category.id)}
            >
              <MaterialIcons
                name={category.icon as any}
                size={18}
                color={isSelected ? '#FFF' : theme.textSecondary}
              />
              <Text
                style={[
                  styles.chipText,
                  isSelected && styles.chipTextSelected,
                ]}
              >
                {category.label}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.lg,
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
    gap: spacing.sm,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    backgroundColor: theme.backgroundSecondary,
    borderRadius: borderRadius.full,
    borderWidth: 1,
    borderColor: theme.border,
  },
  chipSelected: {
    backgroundColor: theme.primary,
    borderColor: theme.primary,
  },
  chipText: {
    fontSize: 14,
    fontWeight: '500',
    color: theme.textSecondary,
  },
  chipTextSelected: {
    color: '#FFF',
  },
});
