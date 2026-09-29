'use client';

import React from 'react';
import { useBookingFlow } from '../hooks/use-booking-flow';
import { PhoneFrame } from '../components/layout/phone-frame';
import { PitchControls } from '../components/layout/pitch-controls';
import { ScreenHome } from '../components/screens/screen-home';
import { ScreenDetail } from '../components/screens/screen-detail';
import { ScreenSchedule } from '../components/screens/screen-schedule';
import { ScreenPayment } from '../components/screens/screen-payment';
import { ScreenTicket } from '../components/screens/screen-ticket';

export default function HomePage() {
  const {
    currentStep,
    selectedZone,
    setSelectedZone,
    selectedParking,
    filteredParkings,
    bookingDuration,
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
    processPayment,
  } = useBookingFlow();

  return (
    <div className="min-h-screen flex flex-col items-center justify-start md:justify-center p-0 md:p-6 lg:p-8">
      {/* 1. Barra Externa Flotante para el Expositor del Pitch (Pitch Mode) */}
      <PitchControls
        currentStep={currentStep}
        onGoToStep={goToStep}
        onReset={resetFlow}
      />

      {/* 2. Contenedor Envolvente de Smartphone (100% viewport en móvil real, mockup en desktop) */}
      <PhoneFrame>
        {currentStep === 1 && (
          <ScreenHome
            selectedZone={selectedZone}
            onSelectZone={setSelectedZone}
            selectedParking={selectedParking}
            onSelectParking={selectParking}
            filteredParkings={filteredParkings}
            onGoToDetail={() => goToStep(2)}
          />
        )}

        {currentStep === 2 && (
          <ScreenDetail
            parking={selectedParking}
            onBack={() => goToStep(1)}
            onProceedToSchedule={() => goToStep(3)}
          />
        )}

        {currentStep === 3 && (
          <ScreenSchedule
            parking={selectedParking}
            hours={bookingDuration}
            onIncrementHours={incrementDuration}
            onDecrementHours={decrementDuration}
            timeRange={timeRange}
            financials={financials}
            onBack={() => goToStep(2)}
            onProceedToPayment={() => goToStep(4)}
          />
        )}

        {currentStep === 4 && (
          <ScreenPayment
            parking={selectedParking}
            totalAmount={financials.totalAmount}
            hours={bookingDuration}
            timeRange={timeRange}
            paymentMethod={paymentMethod}
            onSelectPaymentMethod={setPaymentMethod}
            isProcessing={isProcessingPayment}
            onConfirmPayment={processPayment}
            onBack={() => goToStep(3)}
          />
        )}

        {currentStep === 5 && (
          <ScreenTicket
            parking={selectedParking}
            booking={bookingSummary}
            onNewSearch={resetFlow}
          />
        )}
      </PhoneFrame>
    </div>
  );
}
