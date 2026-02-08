import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { 
  Vehicle, 
  Booking, 
  mockVehicles, 
  mockBookings, 
  mockDashboardStats,
  mockUsers,
  User
} from '../services/mockData';

interface BookingDraft {
  vehicleId: string;
  startDate: Date | null;
  endDate: Date | null;
  pickupTime: string;
  returnTime: string;
}

interface AppContextType {
  // User & Auth
  currentUser: User | null;
  userRole: 'customer' | 'owner';
  setUserRole: (role: 'customer' | 'owner') => void;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;

  // Vehicles
  vehicles: Vehicle[];
  favorites: string[];
  toggleFavorite: (vehicleId: string) => void;
  
  // Bookings
  bookings: Booking[];
  addBooking: (booking: Omit<Booking, 'id' | 'createdAt'>) => void;
  updateBookingStatus: (bookingId: string, status: Booking['status']) => void;
  
  // Booking Draft (for booking flow)
  bookingDraft: BookingDraft | null;
  setBookingDraft: (draft: BookingDraft | null) => void;

  // Dashboard Stats (Owner)
  dashboardStats: typeof mockDashboardStats;

  // Filters
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  // User state
  const [currentUser, setCurrentUser] = useState<User | null>(mockUsers[0]); // Default logged in as customer
  const [userRole, setUserRole] = useState<'customer' | 'owner'>('customer');
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  // Vehicle state
  const [vehicles] = useState<Vehicle[]>(mockVehicles);
  const [favorites, setFavorites] = useState<string[]>([]);

  // Booking state
  const [bookings, setBookings] = useState<Booking[]>(mockBookings);
  const [bookingDraft, setBookingDraft] = useState<BookingDraft | null>(null);

  // Dashboard stats
  const [dashboardStats] = useState(mockDashboardStats);

  // Filter state
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Load favorites from storage
  useEffect(() => {
    AsyncStorage.getItem('favorites').then(data => {
      if (data) setFavorites(JSON.parse(data));
    });
  }, []);

  // Persist favorites
  useEffect(() => {
    AsyncStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Load bookings from storage
  useEffect(() => {
    AsyncStorage.getItem('bookings').then(data => {
      if (data) {
        const savedBookings = JSON.parse(data);
        if (savedBookings.length > 0) {
          setBookings(savedBookings);
        }
      }
    });
  }, []);

  // Persist bookings
  useEffect(() => {
    AsyncStorage.setItem('bookings', JSON.stringify(bookings));
  }, [bookings]);

  const toggleFavorite = (vehicleId: string) => {
    setFavorites(prev => 
      prev.includes(vehicleId)
        ? prev.filter(id => id !== vehicleId)
        : [...prev, vehicleId]
    );
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock login - accept any credentials
    const user = mockUsers.find(u => u.email === email) || mockUsers[0];
    setCurrentUser(user);
    setIsLoggedIn(true);
    setUserRole(user.role === 'owner' ? 'owner' : 'customer');
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
    setIsLoggedIn(false);
    setUserRole('customer');
  };

  const addBooking = (booking: Omit<Booking, 'id' | 'createdAt'>) => {
    const newBooking: Booking = {
      ...booking,
      id: `b${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
    };
    setBookings(prev => [newBooking, ...prev]);
  };

  const updateBookingStatus = (bookingId: string, status: Booking['status']) => {
    setBookings(prev =>
      prev.map(b => (b.id === bookingId ? { ...b, status } : b))
    );
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        userRole,
        setUserRole,
        isLoggedIn,
        login,
        logout,
        vehicles,
        favorites,
        toggleFavorite,
        bookings,
        addBooking,
        updateBookingStatus,
        bookingDraft,
        setBookingDraft,
        dashboardStats,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}
