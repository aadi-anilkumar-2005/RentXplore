// RentXplore Design System
// Archetype: Content Feed (B) + Dashboard (A) Hybrid
// Emotional: Q4 (Alert + Serious) - Trustworthy rental service

export const theme = {
  // Primary: Deep Navy Blue - Trust & Professionalism
  primary: '#1E3A5F',
  primaryLight: '#2D5A8A',
  primaryDark: '#0F2744',

  // Accent: Vibrant Orange - CTAs & Highlights
  accent: '#F97316',
  accentLight: '#FB923C',
  accentDark: '#EA580C',

  // Backgrounds
  background: '#FFFFFF',
  backgroundSecondary: '#F8FAFC',
  surface: '#FFFFFF',

  // Text
  textPrimary: '#0F172A',
  textSecondary: '#64748B',
  textMuted: '#94A3B8',

  // Semantic
  success: '#10B981',
  error: '#EF4444',
  warning: '#F59E0B',
  info: '#3B82F6',

  // Borders
  border: '#E2E8F0',
  borderLight: '#F1F5F9',

  // Shadows
  shadowColor: '#0F172A',
};

// Typography Scale - Content Feed (B) Pattern
export const typography = {
  // Hero/Headers
  heroHeadline: { fontSize: 28, fontWeight: '700' as const, color: theme.textPrimary },
  pageTitle: { fontSize: 24, fontWeight: '700' as const, color: theme.textPrimary },
  sectionTitle: { fontSize: 18, fontWeight: '600' as const, color: theme.textPrimary },

  // Content
  vehicleName: { fontSize: 16, fontWeight: '600' as const, color: theme.textPrimary },
  vehiclePrice: { fontSize: 20, fontWeight: '700' as const, color: theme.accent },
  body: { fontSize: 15, fontWeight: '400' as const, color: theme.textPrimary },
  bodySmall: { fontSize: 14, fontWeight: '400' as const, color: theme.textSecondary },

  // Labels & Captions
  label: { fontSize: 12, fontWeight: '600' as const, color: theme.textSecondary, textTransform: 'uppercase' as const, letterSpacing: 0.5 },
  caption: { fontSize: 12, fontWeight: '400' as const, color: theme.textMuted },

  // Dashboard Stats
  statValue: { fontSize: 32, fontWeight: '700' as const, color: theme.primary },
  statLabel: { fontSize: 11, fontWeight: '600' as const, color: theme.textSecondary, textTransform: 'uppercase' as const, letterSpacing: 1 },
};

// Spacing
export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
};

// Border Radius
export const borderRadius = {
  small: 8,
  medium: 12,
  large: 16,
  full: 9999,
};

// Shadows
export const shadows = {
  card: {
    shadowColor: theme.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  cardElevated: {
    shadowColor: theme.shadowColor,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
};

// Vehicle Categories
export const categories = {
  car: { label: 'Cars', icon: 'directions-car', color: '#3B82F6' },
  bike: { label: 'Bikes', icon: 'two-wheeler', color: '#8B5CF6' },
  scooter: { label: 'Scooters', icon: 'electric-scooter', color: '#10B981' },
  suv: { label: 'SUVs', icon: 'airport-shuttle', color: '#F59E0B' },
};

// Booking Status Colors
export const bookingStatus = {
  pending: { label: 'Pending', color: '#F59E0B', bgColor: '#FEF3C7' },
  confirmed: { label: 'Confirmed', color: '#3B82F6', bgColor: '#DBEAFE' },
  ongoing: { label: 'Ongoing', color: '#8B5CF6', bgColor: '#EDE9FE' },
  completed: { label: 'Completed', color: '#10B981', bgColor: '#D1FAE5' },
  cancelled: { label: 'Cancelled', color: '#EF4444', bgColor: '#FEE2E2' },
};
