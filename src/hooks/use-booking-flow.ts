'use client';

import { useState, useMemo, useCallback } from 'react';
import {
  ScreenStep,
  ZoneType,
  PaymentMethodType,
  ParkingSpace,
  BookingDetails,
  SidebarView,
  UserProfile,
} from '../types';
import { MOCK_PARKINGS } from '../data/mock-parkings';
import { APP_CONFIG } from '../constants/theme';

const DEFAULT_USER: UserProfile = {
  name: 'Mario Henríquez',
  email: 'mario.henriquez@gmail.com',
  phone: '+503 7842-9910',
  avatar:
    'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&h=200&q=80',
  carModel: 'Toyota Corolla 2022 (Sedán)',
  licensePlate: 'P 849-231',
  rating: 4.95,
  tripsCount: 14,
  walletBalance: 12.5,
};

// Función para redondear a la siguiente hora entera
export const getNextWholeHour = () => {
  const d = new Date();
  d.setMinutes(0, 0, 0);
  d.setHours(d.getHours() + 1);
  return d.getHours(); // Ej: si son 10:15 -> retorna 11
};

// Formateador 12h: 11 -> "11:00 AM", 14 -> "2:00 PM"
export const formatHour12 = (hour24: number) => {
  const normalizedHour = ((hour24 % 24) + 24) % 24;
  const period = normalizedHour >= 12 ? 'PM' : 'AM';
  const hour12 = normalizedHour % 12 === 0 ? 12 : normalizedHour % 12;
  return `${hour12}:00 ${period}`;
};

// Días dinámicos ("Hoy", "Mañana", tercer día según calendario)
export const getUpcomingDays = () => {
  const now = new Date();
  const thirdDate = new Date(now);
  thirdDate.setDate(now.getDate() + 2);

  const dayName = new Intl.DateTimeFormat('es-SV', { weekday: 'long' }).format(thirdDate);
  const capitalizedDay = dayName.charAt(0).toUpperCase() + dayName.slice(1);

  return [
    { id: 'today' as const, label: 'Hoy' },
    { id: 'tomorrow' as const, label: 'Mañana' },
    { id: 'day3' as const, label: capitalizedDay },
  ];
};

export function useBookingFlow() {
  const [currentStep, setCurrentStep] = useState<ScreenStep>(1);
  const [selectedZone, setSelectedZone] = useState<ZoneType>('Todas');
  const [selectedParkingId, setSelectedParkingId] = useState<string>(
    'espacio-hipodromo-san-benito'
  );
  const [bookingDuration, setBookingDuration] = useState<number>(
    APP_CONFIG.defaultHours
  );
  const [selectedDayId, setSelectedDayId] = useState<'today' | 'tomorrow' | 'day3'>('today');
  const [customScheduleText, setCustomScheduleText] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethodType>('card');
  const [isProcessingPayment, setIsProcessingPayment] = useState<boolean>(false);
  const [bookingCode, setBookingCode] = useState<string>('PFSV-8942');

  // Sidebar & Dark Mode State
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [sidebarView, setSidebarView] = useState<SidebarView>('menu');
  const [userProfile] = useState<UserProfile>(DEFAULT_USER);

  const openSidebar = useCallback((view: SidebarView = 'menu') => {
    setSidebarView(view);
    setIsSidebarOpen(true);
  }, []);

  const closeSidebar = useCallback(() => {
    setIsSidebarOpen(false);
  }, []);

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen((prev) => !prev);
  }, []);

  const toggleDarkMode = useCallback(() => {
    setIsDarkMode((prev) => !prev);
  }, []);

  // Cochera activa seleccionada (por defecto Espacio Hipódromo San Benito)
  const selectedParking = useMemo(() => {
    return (
      MOCK_PARKINGS.find((p) => p.id === selectedParkingId) ||
      MOCK_PARKINGS.find((p) => p.id === 'espacio-hipodromo-san-benito') ||
      MOCK_PARKINGS[0]
    );
  }, [selectedParkingId]);

  // Lista de cocheras filtrada por zona con 'espacio-hipodromo-san-benito' como primera en "Cerca de mí"
  const filteredParkings = useMemo(() => {
    if (selectedZone === 'Todas') {
      const defaultFirst = MOCK_PARKINGS.find(
        (p) => p.id === 'espacio-hipodromo-san-benito'
      );
      if (defaultFirst) {
        return [
          defaultFirst,
          ...MOCK_PARKINGS.filter((p) => p.id !== 'espacio-hipodromo-san-benito'),
        ];
      }
      return MOCK_PARKINGS;
    }
    return MOCK_PARKINGS.filter((p) => p.zone === selectedZone);
  }, [selectedZone]);

  // Si es "Hoy", inicia en la próxima hora; si es otro día, inicia por defecto a las 9:00 AM
  const startHour = useMemo(() => {
    return selectedDayId === 'today' ? getNextWholeHour() : 9;
  }, [selectedDayId]);

  const endHour = startHour + bookingDuration;
  const formattedTimeRange = `${formatHour12(startHour)} a ${formatHour12(endHour)}`;

  const activeDayLabel = useMemo(() => {
    const days = getUpcomingDays();
    return days.find((d) => d.id === selectedDayId)?.label || 'Hoy';
  }, [selectedDayId]);

  const computedScheduleText = `${activeDayLabel} · ${formattedTimeRange} (${bookingDuration} ${bookingDuration === 1 ? 'Hora' : 'Horas'})`;
  const scheduleText = customScheduleText || computedScheduleText;

  // Horario dinámico calculado en tiempo real
  const timeRange = useMemo(() => {
    return {
      date: activeDayLabel,
      startHour,
      endHour,
      startTime: formatHour12(startHour),
      endTime: formatHour12(endHour),
      formattedRange: formattedTimeRange,
      scheduleText,
    };
  }, [activeDayLabel, startHour, endHour, formattedTimeRange, scheduleText]);

  // Cálculos financieros
  const financials = useMemo(() => {
    const rate = selectedParking.hourlyRate;
    const subtotal = Number((bookingDuration * rate).toFixed(2));
    const commissionFee = Number(
      (subtotal * APP_CONFIG.commissionRate).toFixed(2)
    );
    const totalAmount = Number((subtotal + commissionFee).toFixed(2));

    // Ahorro estimado vs parqueos de centros comerciales ($3.00/h a $4.00/h) o cuidadores callejeros ($5.00)
    const benchmarkStreetCost = 3.5 * bookingDuration;
    const estimatedSaving = Math.max(
      0.9,
      Number((benchmarkStreetCost - totalAmount).toFixed(2))
    );

    return {
      hourlyRate: rate,
      subtotal,
      commissionFee,
      totalAmount,
      estimatedSaving: Number(APP_CONFIG.averageStreetSaving.toFixed(2)),
    };
  }, [bookingDuration, selectedParking.hourlyRate]);

  // Navegación
  const goToNextStep = useCallback(() => {
    setCurrentStep((prev) => {
      if (prev < 5) return (prev + 1) as ScreenStep;
      return prev;
    });
  }, []);

  const goToPreviousStep = useCallback(() => {
    setCurrentStep((prev) => {
      if (prev > 1) return (prev - 1) as ScreenStep;
      return prev;
    });
  }, []);

  const changeSelectedZone = useCallback((zone: ZoneType) => {
    setSelectedZone(zone);
    if (zone === 'Todas') {
      setSelectedParkingId('espacio-hipodromo-san-benito');
    } else {
      const available = MOCK_PARKINGS.filter((p) => p.zone === zone);
      if (available.length > 0) {
        setSelectedParkingId(available[0].id);
      }
    }
  }, []);

  const goToStep = useCallback((step: ScreenStep) => {
    setCurrentStep(step);
  }, []);

  const resetFlow = useCallback(() => {
    setCurrentStep(1);
    setSelectedZone('Todas');
    setSelectedParkingId('espacio-hipodromo-san-benito');
    setSelectedDayId('today');
    setCustomScheduleText(null);
    setBookingDuration(APP_CONFIG.defaultHours);
    setPaymentMethod('card');
    setIsProcessingPayment(false);
  }, []);

  const updateBookingSchedule = useCallback(
    (details: {
      hours?: number;
      scheduleText?: string;
      dayId?: 'today' | 'tomorrow' | 'day3';
    }) => {
      if (details.hours !== undefined) {
        setBookingDuration(details.hours);
      }
      if (details.dayId) {
        setSelectedDayId(details.dayId);
      }
      if (details.scheduleText) {
        setCustomScheduleText(details.scheduleText);
      }
    },
    []
  );

  const selectParking = useCallback((parking: ParkingSpace) => {
    setSelectedParkingId(parking.id);
  }, []);

  const selectParkingById = useCallback((id: string) => {
    setSelectedParkingId(id);
  }, []);

  const incrementDuration = useCallback(() => {
    setBookingDuration((prev) => Math.min(prev + 1, APP_CONFIG.maxHours));
  }, []);

  const decrementDuration = useCallback(() => {
    setBookingDuration((prev) => Math.max(prev - 1, APP_CONFIG.minHours));
  }, []);

  // Procesamiento de pago simulado (1.2 segundos para feedback realista)
  const processPayment = useCallback(async () => {
    setIsProcessingPayment(true);
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setIsProcessingPayment(false);
    // Generar un código único
    const randomCode = `PFSV-${Math.floor(1000 + Math.random() * 9000)}`;
    setBookingCode(randomCode);
    setCurrentStep(5);
  }, []);

  // Objeto de reserva consolidado
  const bookingSummary: BookingDetails = useMemo(() => {
    return {
      parkingId: selectedParking.id,
      date: timeRange.date,
      hours: bookingDuration,
      startTime: timeRange.startTime,
      endTime: timeRange.endTime,
      hourlyRate: financials.hourlyRate,
      subtotal: financials.subtotal,
      commissionFee: financials.commissionFee,
      totalAmount: financials.totalAmount,
      estimatedSaving: financials.estimatedSaving,
      paymentMethod,
      bookingCode,
      qrCodeToken: `https://parqueafacil.sv/verify/${bookingCode}`,
      createdAt: new Date().toISOString(),
      scheduleText: timeRange.scheduleText,
    };
  }, [
    selectedParking.id,
    timeRange,
    bookingDuration,
    financials,
    paymentMethod,
    bookingCode,
  ]);

  return {
    currentStep,
    selectedZone,
    setSelectedZone: changeSelectedZone,
    selectedParking,
    selectedParkingId,
    filteredParkings,
    allParkings: MOCK_PARKINGS,
    bookingDuration,
    setBookingDuration,
    selectedDayId,
    setSelectedDayId,
    activeDayLabel,
    scheduleText,
    updateBookingSchedule,
    incrementDuration,
    decrementDuration,
    timeRange,
    financials,
    paymentMethod,
    setPaymentMethod,
    isProcessingPayment,
    bookingSummary,
    goToNextStep,
    goToPreviousStep,
    goToStep,
    resetFlow,
    selectParking,
    selectParkingById,
    processPayment,
    isSidebarOpen,
    openSidebar,
    closeSidebar,
    toggleSidebar,
    isDarkMode,
    setIsDarkMode,
    toggleDarkMode,
    sidebarView,
    setSidebarView,
    userProfile,
  };
}
