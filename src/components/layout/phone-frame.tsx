'use client';

import React from 'react';
import { Wifi, BatteryMedium, Signal } from 'lucide-react';

export interface PhoneFrameProps {
  children: React.ReactNode;
  isDarkMode?: boolean;
}

export const PhoneFrame: React.FC<PhoneFrameProps> = ({ children, isDarkMode = false }) => {
  return (
    <div className="w-full h-full md:h-auto flex justify-center items-start">
      {/* Mobile real (< 768px): 100dvh, sin marco, sin biseles ni sombras.
          Desktop (md: en adelante): Marco de smartphone refinado con sombra tridimensional */}
      <div
        className={`w-full min-h-[100dvh] h-[100dvh] overflow-hidden flex flex-col m-0 p-0 rounded-none border-0 shadow-none relative md:min-h-0 md:w-[412px] md:h-[870px] md:rounded-[50px] md:border-[8px] md:border-slate-900 md:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] shrink-0 transition-colors duration-300 ${
          isDarkMode ? 'bg-slate-950 text-white' : 'bg-[#F8FAFC] text-slate-900'
        }`}
      >
        {/* Dynamic Island refinada: Solo en pantallas de escritorio */}
        <div className="hidden md:flex absolute top-1.5 inset-x-0 justify-center z-50 pointer-events-none">
          <div className="w-24 h-4 bg-black rounded-full mx-auto my-1 flex items-center justify-between px-2.5 shadow-sm">
            <div className="w-2 h-2 rounded-full bg-slate-900 ring-1 ring-slate-800" />
            <div className="w-1.5 h-1.5 rounded-full bg-blue-950/80" />
          </div>
        </div>

        {/* Barra de Estado (Status Bar): Oculta en móviles (el teléfono real ya tiene la suya) */}
        <header
          className={`hidden md:flex shrink-0 h-9 px-6 pt-1.5 pb-1 items-center justify-between text-xs font-semibold z-40 select-none backdrop-blur-sm border-b transition-colors duration-300 ${
            isDarkMode
              ? 'bg-slate-950/80 border-slate-800/80 text-slate-200'
              : 'bg-surface/80 border-slate-100/60 text-slate-800'
          }`}
        >
          <time dateTime="14:15" className="font-semibold tracking-tight text-[11px]">
            2:15 PM
          </time>
          <div className="flex items-center gap-1.5 opacity-90">
            <Signal className="w-3.5 h-3.5" />
            <Wifi className="w-3.5 h-3.5" />
            <div className="flex items-center gap-0.5">
              <span className="text-[10px] font-bold">96%</span>
              <BatteryMedium className="w-4 h-4" />
            </div>
          </div>
        </header>

        {/* Contenedor de Pantallas con Scroll Interno Suave */}
        <main
          className={`flex-1 overflow-y-auto no-scrollbar flex flex-col relative w-full h-full transition-colors duration-300 ${
            isDarkMode ? 'bg-slate-950' : 'bg-[#F8FAFC]'
          }`}
        >
          {children}
        </main>

        {/* Home Indicator (iOS Bar): Oculto en móviles reales */}
        <footer
          aria-label="Navegación de sistema"
          className={`hidden md:flex shrink-0 h-4 pb-1 justify-center items-center pointer-events-none backdrop-blur-sm transition-colors duration-300 ${
            isDarkMode
              ? 'bg-slate-950/80'
              : 'bg-surface/80'
          }`}
        >
          <div
            className={`w-28 h-1 rounded-full ${
              isDarkMode ? 'bg-slate-600' : 'bg-slate-300'
            }`}
          />
        </footer>
      </div>
    </div>
  );
};
