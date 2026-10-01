'use client';

import React from 'react';
import { useBookingFlow } from '../hooks/use-booking-flow';
import { PhoneFrame } from '../components/layout/phone-frame';
import { PitchControls } from '../components/layout/pitch-controls';
import { SidebarDrawer } from '../components/layout/sidebar-drawer';
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
    selectedDayId,
    setSelectedDayId,
    updateBookingSchedule,
    timeRange,
    financials,
    paymentMethod,
    setPaymentMethod,
    isProcessingPayment,
    bookingSummary,
    goToStep,
    resetFlow,
    selectParking,
    processPayment,
    isSidebarOpen,
    openSidebar,
    closeSidebar,
    isDarkMode,
    toggleDarkMode,
    sidebarView,
    setSidebarView,
    userProfile,
  } = useBookingFlow();

  // Sincronizar clase .dark en <html> únicamente cuando se activa el interruptor interno
  React.useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    }
  }, [isDarkMode]);

  return (
    <main className="w-full min-h-[100dvh] h-[100dvh] md:h-auto md:min-h-screen bg-[#F8FAFC] md:bg-[#0B0F19] text-white flex flex-col items-center justify-start p-0 md:py-8 md:px-4 overflow-y-auto">
      {/* 1. Barra superior de Pitch Demo (solo desktop) */}
      <div className="hidden md:flex mb-6 z-50">
        <PitchControls
          currentStep={currentStep}
          onGoToStep={goToStep}
          onReset={resetFlow}
        />
      </div>

      {/* 2. Contenedor del Mockup */}
      <div className="w-full h-full md:h-auto flex justify-center items-start md:pb-16">
        <PhoneFrame isDarkMode={isDarkMode}>
          {/* Menú Lateral Deslizable (Sidebar Drawer) */}
          <SidebarDrawer
            isOpen={isSidebarOpen}
            onClose={closeSidebar}
            view={sidebarView}
            onSelectView={setSidebarView}
            user={userProfile}
            isDarkMode={isDarkMode}
            onToggleDarkMode={toggleDarkMode}
          />

          {currentStep === 1 && (
            <ScreenHome
              selectedZone={selectedZone}
              onSelectZone={setSelectedZone}
              selectedParking={selectedParking}
              onSelectParking={selectParking}
              filteredParkings={filteredParkings}
              onGoToDetail={() => goToStep(2)}
              onOpenSidebar={() => openSidebar('menu')}
              isDarkMode={isDarkMode}
            />
          )}

          {currentStep === 2 && (
            <ScreenDetail
              parking={selectedParking}
              selectedParking={selectedParking}
              onBack={() => goToStep(1)}
              onProceedToSchedule={() => goToStep(3)}
              isDarkMode={isDarkMode}
            />
          )}

          {currentStep === 3 && (
            <ScreenSchedule
              parking={selectedParking}
              hours={bookingDuration}
              onIncrementHours={incrementDuration}
              onDecrementHours={decrementDuration}
              selectedDayId={selectedDayId}
              onSelectDayId={setSelectedDayId}
              onUpdateBooking={updateBookingSchedule}
              timeRange={timeRange}
              financials={financials}
              onBack={() => goToStep(2)}
              onProceedToPayment={() => goToStep(4)}
              isDarkMode={isDarkMode}
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
              isDarkMode={isDarkMode}
            />
          )}

          {currentStep === 5 && (
            <ScreenTicket
              parking={selectedParking}
              booking={bookingSummary}
              onNewSearch={resetFlow}
              isDarkMode={isDarkMode}
            />
          )}
        </PhoneFrame>
      </div>
    </main>
  );
}
