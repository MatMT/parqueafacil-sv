'use client';

import { useState, useMemo, useCallback } from 'react';
import {
  ScreenStep,
  ZoneType,
  PaymentMethodType,
  ParkingSpace,
  BookingDetails,
} from '../types';
import { MOCK_PARKINGS } from '../data/mock-parkings';
import { APP_CONFIG } from '../constants/theme';

export function useBookingFlow() {
  const [currentStep, setCurrentStep] = useState<ScreenStep>(1);
  const [selectedZone, setSelectedZone] = useState<ZoneType>('Todas');
  const [selectedParkingId, setSelectedParkingId] = useState<string>(
    MOCK_PARKINGS[0].id
  );
  const [bookingDuration, setBookingDuration] = useState<number>(
    APP_CONFIG.defaultHours
  );
  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethodType>('card');
  const [isProcessingPayment, setIsProcessingPayment] = useState<boolean>(false);
  const [bookingCode, setBookingCode] = useState<string>('PFSV-8942');

  // Cochera activa seleccionada
  const selectedParking = useMemo(() => {
    return (
      MOCK_PARKINGS.find((p) => p.id === selectedParkingId) || MOCK_PARKINGS[0]
    );
  }, [selectedParkingId]);

  // Lista de cocheras filtrada por zona
  const filteredParkings = useMemo(() => {
    if (selectedZone === 'Todas') {
      return MOCK_PARKINGS;
    }
    return MOCK_PARKINGS.filter((p) => p.zone === selectedZone);
  }, [selectedZone]);

  // Horario estimado (ej: de 2:00 PM a 4:00 PM)
  const timeRange = useMemo(() => {
    const startHour = 14; // 2:00 PM
    const endHour = startHour + bookingDuration;
    const formatHour = (h: number) => {
      const period = h >= 12 ? 'PM' : 'AM';
      const adjusted = h > 12 ? h - 12 : h;
      return `${adjusted}:00 ${period}`;
    };
    return {
      date: 'Hoy',
      startTime: formatHour(startHour),
      endTime: formatHour(endHour),
      formattedRange: `${formatHour(startHour)} a ${formatHour(endHour)}`,
    };
  }, [bookingDuration]);

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

  const goToStep = useCallback((step: ScreenStep) => {
    setCurrentStep(step);
  }, []);

  const resetFlow = useCallback(() => {
    setCurrentStep(1);
    setSelectedZone('Todas');
    setSelectedParkingId(MOCK_PARKINGS[0].id);
    setBookingDuration(APP_CONFIG.defaultHours);
    setPaymentMethod('card');
    setIsProcessingPayment(false);
  }, []);

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
    setSelectedZone,
    selectedParking,
    selectedParkingId,
    filteredParkings,
    allParkings: MOCK_PARKINGS,
    bookingDuration,
    setBookingDuration,
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
  };
}
