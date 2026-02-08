// RentXplore App Configuration

export const APP_CONFIG = {
  name: 'RentXplore',
  tagline: 'Your Journey, Your Ride',
  version: '1.0.0',

  // Demo mode - allows role switching
  demoMode: true,

  // Default location for vehicle search
  defaultLocation: 'San Francisco, CA',

  // Currency
  currency: {
    symbol: '$',
    code: 'USD',
  },

  // Booking settings
  booking: {
    minDays: 1,
    maxDays: 30,
    advanceBookingDays: 60, // How far in advance users can book
  },

  // Pagination
  pagination: {
    vehiclesPerPage: 10,
    bookingsPerPage: 20,
  },
};

// User Roles
export type UserRole = 'customer' | 'owner' | 'staff' | 'admin';

export const USER_ROLES: Record<UserRole, { label: string; description: string }> = {
  customer: {
    label: 'Customer',
    description: 'Browse and rent vehicles',
  },
  owner: {
    label: 'Shop Owner',
    description: 'Manage your rental business',
  },
  staff: {
    label: 'Staff',
    description: 'Handle daily operations',
  },
  admin: {
    label: 'Admin',
    description: 'Full system access',
  },
};

// Vehicle Categories
export const VEHICLE_CATEGORIES = [
  { id: 'all', label: 'All', icon: 'apps' },
  { id: 'car', label: 'Cars', icon: 'directions-car' },
  { id: 'bike', label: 'Bikes', icon: 'two-wheeler' },
  { id: 'scooter', label: 'Scooters', icon: 'electric-scooter' },
  { id: 'suv', label: 'SUVs', icon: 'airport-shuttle' },
] as const;

// Sort Options
export const SORT_OPTIONS = [
  { id: 'price_low', label: 'Price: Low to High' },
  { id: 'price_high', label: 'Price: High to Low' },
  { id: 'rating', label: 'Highest Rated' },
  { id: 'newest', label: 'Newest First' },
] as const;
