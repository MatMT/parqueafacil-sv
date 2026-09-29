'use client';

import React from 'react';
import { Wifi, BatteryMedium, Signal } from 'lucide-react';

export interface PhoneFrameProps {
  children: React.ReactNode;
}

export const PhoneFrame: React.FC<PhoneFrameProps> = ({ children }) => {
  return (
    <div className="w-full flex justify-center items-center">
      {/* Mobile real: 100% viewport, sin bordes de teléfono. 
          Desktop: marco de smartphone elegante con sombra y bisel */}
      <div className="w-full h-[100dvh] md:h-[844px] md:max-w-[390px] bg-background md:rounded-[44px] md:shadow-phone md:border-[10px] md:border-slate-900 relative flex flex-col overflow-hidden transition-all duration-300">
        
        {/* Dynamic Island / Speaker Notch (Desktop & Tablet) */}
        <div className="hidden md:flex absolute top-2.5 inset-x-0 justify-center z-50 pointer-events-none">
          <div className="w-28 h-6 bg-black rounded-full flex items-center justify-between px-3">
            <div className="w-2.5 h-2.5 rounded-full bg-slate-900 ring-1 ring-slate-800" />
            <div className="w-2 h-2 rounded-full bg-blue-950/80" />
          </div>
        </div>

        {/* Barra de Estado (Status Bar) */}
        <header className="shrink-0 h-11 px-6 pt-2 pb-1 flex items-center justify-between text-xs font-semibold text-slate-800 z-40 select-none bg-surface/80 backdrop-blur-sm border-b border-slate-100/60">
          <time dateTime="14:15" className="font-semibold tracking-tight text-[13px]">2:15 PM</time>
          <div className="flex items-center gap-1.5 text-slate-700">
            <Signal className="w-3.5 h-3.5" />
            <Wifi className="w-3.5 h-3.5" />
            <div className="flex items-center gap-0.5">
              <span className="text-[10px] font-bold">96%</span>
              <BatteryMedium className="w-4 h-4 text-slate-800" />
            </div>
          </div>
        </header>

        {/* Contenedor de Pantallas con Scroll Interno Suave */}
        <main className="flex-1 overflow-y-auto no-scrollbar flex flex-col relative bg-background">
          {children}
        </main>

        {/* Home Indicator (iOS Bar) */}
        <footer aria-label="Navegación de sistema" className="shrink-0 h-5 pb-1 flex justify-center items-center pointer-events-none bg-surface/80 backdrop-blur-sm border-t border-slate-100/40">
          <div className="w-32 h-1 bg-slate-300 rounded-full" />
        </footer>
      </div>
    </div>
  );
};
