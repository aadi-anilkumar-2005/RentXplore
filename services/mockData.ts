// RentXplore Mock Data Service
// Contains 20+ realistic vehicle entries and booking data

export interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  category: 'car' | 'bike' | 'scooter' | 'suv';
  licensePlate: string;
  dailyRate: number;
  image: string;
  isAvailable: boolean;
  status: 'active' | 'maintenance';
  rating: number;
  reviewCount: number;
  features: string[];
  shopId: string;
  shopName: string;
  location: string;
  seats?: number;
  transmission?: 'automatic' | 'manual';
  fuelType?: 'petrol' | 'diesel' | 'electric' | 'hybrid';
}

export interface Booking {
  id: string;
  vehicleId: string;
  vehicle: Vehicle;
  customerId: string;
  customerName: string;
  customerPhone: string;
  startDate: string;
  endDate: string;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'ongoing' | 'completed' | 'cancelled';
  pickupTime: string;
  returnTime: string;
  createdAt: string;
}

export interface Shop {
  id: string;
  name: string;
  location: string;
  contactInfo: string;
  ownerId: string;
  vehicleCount: number;
  rating: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'customer' | 'owner' | 'staff' | 'admin';
  avatar?: string;
  address?: string;
}

// Stock photo URLs for vehicles
const vehicleImages = {
  cars: [
    'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1542362567-b07e54358753?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800&h=600&fit=crop',
  ],
  suvs: [
    'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&h=600&fit=crop',
  ],
  bikes: [
    'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1558981285-6f0c94958bb6?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=800&h=600&fit=crop',
  ],
  scooters: [
    'https://images.unsplash.com/photo-1571188654248-7a89213915f7?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1621859169630-85b7cdae82cf?w=800&h=600&fit=crop',
  ],
};

// Mock Vehicles (20+ items)
export const mockVehicles: Vehicle[] = [
  {
    id: 'v1',
    make: 'Tesla',
    model: 'Model 3',
    year: 2024,
    category: 'car',
    licensePlate: 'EV-2024',
    dailyRate: 89,
    image: vehicleImages.cars[0],
    isAvailable: true,
    status: 'active',
    rating: 4.9,
    reviewCount: 128,
    features: ['Autopilot', 'Premium Audio', 'Heated Seats', 'Glass Roof'],
    shopId: 's1',
    shopName: 'Premium Auto Rentals',
    location: 'San Francisco, CA',
    seats: 5,
    transmission: 'automatic',
    fuelType: 'electric',
  },
  {
    id: 'v2',
    make: 'BMW',
    model: '3 Series',
    year: 2023,
    category: 'car',
    licensePlate: 'BMW-330i',
    dailyRate: 75,
    image: vehicleImages.cars[1],
    isAvailable: true,
    status: 'active',
    rating: 4.7,
    reviewCount: 95,
    features: ['Leather Interior', 'Navigation', 'Sunroof', 'Apple CarPlay'],
    shopId: 's1',
    shopName: 'Premium Auto Rentals',
    location: 'San Francisco, CA',
    seats: 5,
    transmission: 'automatic',
    fuelType: 'petrol',
  },
  {
    id: 'v3',
    make: 'Honda',
    model: 'Civic',
    year: 2024,
    category: 'car',
    licensePlate: 'HND-2024',
    dailyRate: 45,
    image: vehicleImages.cars[2],
    isAvailable: true,
    status: 'active',
    rating: 4.5,
    reviewCount: 210,
    features: ['Fuel Efficient', 'Backup Camera', 'Bluetooth', 'USB Ports'],
    shopId: 's2',
    shopName: 'City Wheels',
    location: 'Oakland, CA',
    seats: 5,
    transmission: 'automatic',
    fuelType: 'petrol',
  },
  {
    id: 'v4',
    make: 'Mercedes-Benz',
    model: 'E-Class',
    year: 2023,
    category: 'car',
    licensePlate: 'MB-ECLASS',
    dailyRate: 120,
    image: vehicleImages.cars[3],
    isAvailable: false,
    status: 'active',
    rating: 4.8,
    reviewCount: 76,
    features: ['Luxury Interior', 'MBUX System', 'Massage Seats', 'Burmester Audio'],
    shopId: 's1',
    shopName: 'Premium Auto Rentals',
    location: 'San Francisco, CA',
    seats: 5,
    transmission: 'automatic',
    fuelType: 'hybrid',
  },
  {
    id: 'v5',
    make: 'Toyota',
    model: 'Camry',
    year: 2024,
    category: 'car',
    licensePlate: 'TYT-CMRY',
    dailyRate: 55,
    image: vehicleImages.cars[4],
    isAvailable: true,
    status: 'active',
    rating: 4.6,
    reviewCount: 185,
    features: ['Toyota Safety Sense', 'Wireless Charging', 'JBL Audio', 'Dual Climate'],
    shopId: 's2',
    shopName: 'City Wheels',
    location: 'Oakland, CA',
    seats: 5,
    transmission: 'automatic',
    fuelType: 'hybrid',
  },
  {
    id: 'v6',
    make: 'Jeep',
    model: 'Grand Cherokee',
    year: 2024,
    category: 'suv',
    licensePlate: 'JEP-GC24',
    dailyRate: 95,
    image: vehicleImages.suvs[0],
    isAvailable: true,
    status: 'active',
    rating: 4.7,
    reviewCount: 142,
    features: ['4WD', 'Panoramic Roof', 'Tow Package', 'Off-Road Ready'],
    shopId: 's1',
    shopName: 'Premium Auto Rentals',
    location: 'San Francisco, CA',
    seats: 5,
    transmission: 'automatic',
    fuelType: 'petrol',
  },
  {
    id: 'v7',
    make: 'Ford',
    model: 'Explorer',
    year: 2023,
    category: 'suv',
    licensePlate: 'FRD-XPLR',
    dailyRate: 85,
    image: vehicleImages.suvs[1],
    isAvailable: true,
    status: 'active',
    rating: 4.5,
    reviewCount: 98,
    features: ['Third Row', 'SYNC 4', 'Co-Pilot360', 'Heated Steering'],
    shopId: 's2',
    shopName: 'City Wheels',
    location: 'Oakland, CA',
    seats: 7,
    transmission: 'automatic',
    fuelType: 'petrol',
  },
  {
    id: 'v8',
    make: 'Range Rover',
    model: 'Sport',
    year: 2024,
    category: 'suv',
    licensePlate: 'RR-SPORT',
    dailyRate: 175,
    image: vehicleImages.suvs[2],
    isAvailable: true,
    status: 'active',
    rating: 4.9,
    reviewCount: 64,
    features: ['Terrain Response', 'Meridian Audio', 'Air Suspension', 'Pixel LED'],
    shopId: 's1',
    shopName: 'Premium Auto Rentals',
    location: 'San Francisco, CA',
    seats: 5,
    transmission: 'automatic',
    fuelType: 'diesel',
  },
  {
    id: 'v9',
    make: 'Harley-Davidson',
    model: 'Street Glide',
    year: 2024,
    category: 'bike',
    licensePlate: 'HD-GLIDE',
    dailyRate: 110,
    image: vehicleImages.bikes[0],
    isAvailable: true,
    status: 'active',
    rating: 4.8,
    reviewCount: 87,
    features: ['Milwaukee-Eight Engine', 'Boom Box GTS', 'Cruise Control', 'ABS'],
    shopId: 's3',
    shopName: 'Moto Zone',
    location: 'San Jose, CA',
  },
  {
    id: 'v10',
    make: 'Ducati',
    model: 'Monster',
    year: 2023,
    category: 'bike',
    licensePlate: 'DUC-MON',
    dailyRate: 95,
    image: vehicleImages.bikes[1],
    isAvailable: true,
    status: 'active',
    rating: 4.7,
    reviewCount: 63,
    features: ['Testastretta Engine', 'TFT Display', 'Cornering ABS', 'Quick Shift'],
    shopId: 's3',
    shopName: 'Moto Zone',
    location: 'San Jose, CA',
  },
  {
    id: 'v11',
    make: 'Kawasaki',
    model: 'Ninja 650',
    year: 2024,
    category: 'bike',
    licensePlate: 'KAW-NJA',
    dailyRate: 65,
    image: vehicleImages.bikes[2],
    isAvailable: true,
    status: 'active',
    rating: 4.6,
    reviewCount: 112,
    features: ['Parallel Twin', 'Assist & Slipper Clutch', 'ABS', 'LED Lights'],
    shopId: 's3',
    shopName: 'Moto Zone',
    location: 'San Jose, CA',
  },
  {
    id: 'v12',
    make: 'BMW',
    model: 'R 1250 GS',
    year: 2024,
    category: 'bike',
    licensePlate: 'BMW-ADV',
    dailyRate: 130,
    image: vehicleImages.bikes[3],
    isAvailable: false,
    status: 'active',
    rating: 4.9,
    reviewCount: 54,
    features: ['ShiftCam Engine', 'Dynamic ESA', 'TFT Connectivity', 'Keyless Ride'],
    shopId: 's3',
    shopName: 'Moto Zone',
    location: 'San Jose, CA',
  },
  {
    id: 'v13',
    make: 'Vespa',
    model: 'Primavera 150',
    year: 2024,
    category: 'scooter',
    licensePlate: 'VSP-PRIMA',
    dailyRate: 35,
    image: vehicleImages.scooters[0],
    isAvailable: true,
    status: 'active',
    rating: 4.5,
    reviewCount: 156,
    features: ['Italian Design', 'USB Charging', 'Under-seat Storage', 'ABS'],
    shopId: 's2',
    shopName: 'City Wheels',
    location: 'Oakland, CA',
  },
  {
    id: 'v14',
    make: 'NIU',
    model: 'NQi GT',
    year: 2024,
    category: 'scooter',
    licensePlate: 'NIU-ELEC',
    dailyRate: 28,
    image: vehicleImages.scooters[1],
    isAvailable: true,
    status: 'active',
    rating: 4.4,
    reviewCount: 89,
    features: ['Electric', 'Smart App', 'Dual Battery', 'Regenerative Braking'],
    shopId: 's2',
    shopName: 'City Wheels',
    location: 'Oakland, CA',
  },
  {
    id: 'v15',
    make: 'Audi',
    model: 'A4',
    year: 2024,
    category: 'car',
    licensePlate: 'AUD-A4',
    dailyRate: 82,
    image: vehicleImages.cars[0],
    isAvailable: true,
    status: 'active',
    rating: 4.7,
    reviewCount: 73,
    features: ['Quattro AWD', 'Virtual Cockpit', 'Bang & Olufsen', 'Matrix LED'],
    shopId: 's1',
    shopName: 'Premium Auto Rentals',
    location: 'San Francisco, CA',
    seats: 5,
    transmission: 'automatic',
    fuelType: 'petrol',
  },
  {
    id: 'v16',
    make: 'Porsche',
    model: 'Cayenne',
    year: 2024,
    category: 'suv',
    licensePlate: 'POR-CAY',
    dailyRate: 195,
    image: vehicleImages.suvs[0],
    isAvailable: true,
    status: 'active',
    rating: 4.9,
    reviewCount: 42,
    features: ['Sport Chrono', 'PASM', 'Bose Surround', 'Panoramic Roof'],
    shopId: 's1',
    shopName: 'Premium Auto Rentals',
    location: 'San Francisco, CA',
    seats: 5,
    transmission: 'automatic',
    fuelType: 'hybrid',
  },
  {
    id: 'v17',
    make: 'Hyundai',
    model: 'Tucson',
    year: 2024,
    category: 'suv',
    licensePlate: 'HYN-TUC',
    dailyRate: 62,
    image: vehicleImages.suvs[1],
    isAvailable: true,
    status: 'active',
    rating: 4.5,
    reviewCount: 134,
    features: ['SmartSense', 'Wireless CarPlay', 'Digital Key', 'Heated Seats'],
    shopId: 's2',
    shopName: 'City Wheels',
    location: 'Oakland, CA',
    seats: 5,
    transmission: 'automatic',
    fuelType: 'hybrid',
  },
  {
    id: 'v18',
    make: 'Yamaha',
    model: 'MT-07',
    year: 2024,
    category: 'bike',
    licensePlate: 'YAM-MT07',
    dailyRate: 55,
    image: vehicleImages.bikes[1],
    isAvailable: true,
    status: 'active',
    rating: 4.6,
    reviewCount: 98,
    features: ['CP2 Engine', 'LCD Display', 'ABS', 'Lightweight Frame'],
    shopId: 's3',
    shopName: 'Moto Zone',
    location: 'San Jose, CA',
  },
  {
    id: 'v19',
    make: 'Honda',
    model: 'PCX 160',
    year: 2024,
    category: 'scooter',
    licensePlate: 'HND-PCX',
    dailyRate: 32,
    image: vehicleImages.scooters[0],
    isAvailable: true,
    status: 'active',
    rating: 4.5,
    reviewCount: 167,
    features: ['eSP+ Engine', 'Smart Key', 'USB Type-C', 'Large Storage'],
    shopId: 's2',
    shopName: 'City Wheels',
    location: 'Oakland, CA',
  },
  {
    id: 'v20',
    make: 'Lexus',
    model: 'ES 350',
    year: 2024,
    category: 'car',
    licensePlate: 'LEX-ES',
    dailyRate: 98,
    image: vehicleImages.cars[3],
    isAvailable: true,
    status: 'active',
    rating: 4.8,
    reviewCount: 61,
    features: ['Mark Levinson', 'Safety System+', 'Wood Trim', 'Moonroof'],
    shopId: 's1',
    shopName: 'Premium Auto Rentals',
    location: 'San Francisco, CA',
    seats: 5,
    transmission: 'automatic',
    fuelType: 'petrol',
  },
  {
    id: 'v21',
    make: 'Mazda',
    model: 'CX-5',
    year: 2024,
    category: 'suv',
    licensePlate: 'MAZ-CX5',
    dailyRate: 68,
    image: vehicleImages.suvs[2],
    isAvailable: true,
    status: 'maintenance',
    rating: 4.6,
    reviewCount: 112,
    features: ['Skyactiv-G', 'i-Activsense', 'Bose Audio', 'Head-Up Display'],
    shopId: 's2',
    shopName: 'City Wheels',
    location: 'Oakland, CA',
    seats: 5,
    transmission: 'automatic',
    fuelType: 'petrol',
  },
];

// Mock Bookings
export const mockBookings: Booking[] = [
  {
    id: 'b1',
    vehicleId: 'v1',
    vehicle: mockVehicles[0],
    customerId: 'u1',
    customerName: 'John Smith',
    customerPhone: '+1 (555) 123-4567',
    startDate: '2024-02-15',
    endDate: '2024-02-18',
    totalPrice: 267,
    status: 'ongoing',
    pickupTime: '10:00 AM',
    returnTime: '10:00 AM',
    createdAt: '2024-02-10',
  },
  {
    id: 'b2',
    vehicleId: 'v3',
    vehicle: mockVehicles[2],
    customerId: 'u1',
    customerName: 'John Smith',
    customerPhone: '+1 (555) 123-4567',
    startDate: '2024-02-20',
    endDate: '2024-02-22',
    totalPrice: 90,
    status: 'confirmed',
    pickupTime: '09:00 AM',
    returnTime: '06:00 PM',
    createdAt: '2024-02-12',
  },
  {
    id: 'b3',
    vehicleId: 'v9',
    vehicle: mockVehicles[8],
    customerId: 'u2',
    customerName: 'Sarah Johnson',
    customerPhone: '+1 (555) 234-5678',
    startDate: '2024-02-14',
    endDate: '2024-02-16',
    totalPrice: 220,
    status: 'completed',
    pickupTime: '11:00 AM',
    returnTime: '11:00 AM',
    createdAt: '2024-02-08',
  },
  {
    id: 'b4',
    vehicleId: 'v6',
    vehicle: mockVehicles[5],
    customerId: 'u3',
    customerName: 'Mike Wilson',
    customerPhone: '+1 (555) 345-6789',
    startDate: '2024-02-25',
    endDate: '2024-02-28',
    totalPrice: 285,
    status: 'pending',
    pickupTime: '02:00 PM',
    returnTime: '02:00 PM',
    createdAt: '2024-02-14',
  },
  {
    id: 'b5',
    vehicleId: 'v13',
    vehicle: mockVehicles[12],
    customerId: 'u1',
    customerName: 'John Smith',
    customerPhone: '+1 (555) 123-4567',
    startDate: '2024-01-20',
    endDate: '2024-01-22',
    totalPrice: 70,
    status: 'completed',
    pickupTime: '10:00 AM',
    returnTime: '06:00 PM',
    createdAt: '2024-01-15',
  },
  {
    id: 'b6',
    vehicleId: 'v4',
    vehicle: mockVehicles[3],
    customerId: 'u4',
    customerName: 'Emily Davis',
    customerPhone: '+1 (555) 456-7890',
    startDate: '2024-02-16',
    endDate: '2024-02-19',
    totalPrice: 360,
    status: 'ongoing',
    pickupTime: '09:00 AM',
    returnTime: '09:00 AM',
    createdAt: '2024-02-11',
  },
];

// Mock Shops
export const mockShops: Shop[] = [
  {
    id: 's1',
    name: 'Premium Auto Rentals',
    location: 'San Francisco, CA',
    contactInfo: '+1 (415) 555-0100',
    ownerId: 'owner1',
    vehicleCount: 8,
    rating: 4.8,
  },
  {
    id: 's2',
    name: 'City Wheels',
    location: 'Oakland, CA',
    contactInfo: '+1 (510) 555-0200',
    ownerId: 'owner2',
    vehicleCount: 7,
    rating: 4.5,
  },
  {
    id: 's3',
    name: 'Moto Zone',
    location: 'San Jose, CA',
    contactInfo: '+1 (408) 555-0300',
    ownerId: 'owner3',
    vehicleCount: 5,
    rating: 4.7,
  },
];

// Mock Users
export const mockUsers: User[] = [
  {
    id: 'u1',
    name: 'John Smith',
    email: 'john@example.com',
    phone: '+1 (555) 123-4567',
    role: 'customer',
    address: '123 Main St, San Francisco, CA',
  },
  {
    id: 'owner1',
    name: 'Robert Chen',
    email: 'robert@premiumauto.com',
    phone: '+1 (415) 555-0100',
    role: 'owner',
    address: '456 Market St, San Francisco, CA',
  },
];

// Dashboard Stats (for owner view)
export const mockDashboardStats = {
  totalVehicles: 21,
  activeRentals: 4,
  todayPickups: 2,
  todayReturns: 1,
  monthlyRevenue: 12450,
  weeklyRevenue: 3280,
  occupancyRate: 72,
  averageRating: 4.7,
};

// Helper functions
export const getVehicleById = (id: string): Vehicle | undefined => {
  return mockVehicles.find(v => v.id === id);
};

export const getVehiclesByCategory = (category: string): Vehicle[] => {
  if (category === 'all') return mockVehicles.filter(v => v.status === 'active');
  return mockVehicles.filter(v => v.category === category && v.status === 'active');
};

export const getAvailableVehicles = (): Vehicle[] => {
  return mockVehicles.filter(v => v.isAvailable && v.status === 'active');
};

export const getBookingsByCustomer = (customerId: string): Booking[] => {
  return mockBookings.filter(b => b.customerId === customerId);
};

export const getActiveBookings = (): Booking[] => {
  return mockBookings.filter(b => b.status === 'ongoing' || b.status === 'confirmed');
};
