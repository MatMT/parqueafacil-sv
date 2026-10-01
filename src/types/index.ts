export type ScreenStep = 1 | 2 | 3 | 4 | 5;

export type ZoneType =
  | 'Todas'
  | 'Santa Tecla'
  | 'Colonia Escalón'
  | 'Zona Rosa'
  | 'San Salvador Centro'
  | 'Antiguo Cuscatlán';

export type PaymentMethodType = 'card' | 'chivo' | 'transfer';

export type SidebarView = 'menu' | 'profile' | 'settings';

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  avatar: string;
  carModel: string;
  licensePlate: string;
  rating: number;
  tripsCount: number;
  walletBalance: number;
}

export interface HostInfo {
  name: string;
  avatar: string;
  isSuperHost: boolean;
  responseTime: string;
  rating: number;
}

export interface ParkingAmenities {
  isCovered: boolean;
  hasCamera: boolean;
  gatedEntry: boolean;
  easyManeuver: boolean;
  evCharging?: boolean;
  security24_7: boolean;
}

export interface Review {
  id: string;
  authorName: string;
  date: string;
  rating: number;
  comment: string;
  carModel?: string;
}

export interface ParkingSpace {
  id: string;
  title: string;
  zone: ZoneType;
  addressReference: string;
  hourlyRate: number;
  rating: number;
  reviewCount: number;
  distanceMeters: number;
  host: HostInfo;
  amenities: ParkingAmenities;
  coordinates: {
    lat: number;
    lng: number;
    mapX: number; // Coordenada X relativa % para el mapa interactivo
    mapY: number; // Coordenada Y relativa % para el mapa interactivo
  };
  vehicleTypes: ('Sedán' | 'Camioneta' | 'Pick-up' | 'Moto')[];
  images: string[];
  reviews: Review[];
  highlightBadge?: string;
}

export interface BookingDetails {
  parkingId: string;
  date: string;
  hours: number;
  startTime: string;
  endTime: string;
  hourlyRate: number;
  subtotal: number;
  commissionFee: number;
  totalAmount: number;
  estimatedSaving: number;
  paymentMethod: PaymentMethodType;
  bookingCode: string;
  qrCodeToken: string;
  createdAt: string;
  scheduleText?: string;
}
