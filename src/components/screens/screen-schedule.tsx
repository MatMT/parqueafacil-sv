'use client';

import React from 'react';
import Image from 'next/image';
import { ParkingSpace } from '../../types';
import { Badge } from '../ui/badge';
import {
  ArrowLeft,
  Calendar,
  Clock,
  Plus,
  Minus,
  Sparkles,
  Info,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react';

export interface ScreenScheduleProps {
  parking: ParkingSpace;
  hours: number;
  onIncrementHours: () => void;
  onDecrementHours: () => void;
  timeRange: {
    date: string;
    startTime: string;
    endTime: string;
    formattedRange: string;
  };
  financials: {
    hourlyRate: number;
    subtotal: number;
    commissionFee: number;
    totalAmount: number;
    estimatedSaving: number;
  };
  onBack: () => void;
  onProceedToPayment: () => void;
  isDarkMode?: boolean;
}

export const ScreenSchedule: React.FC<ScreenScheduleProps> = ({
  parking,
  hours,
  onIncrementHours,
  onDecrementHours,
  timeRange,
  financials,
  onBack,
  onProceedToPayment,
  isDarkMode = false,
}) => {
  return (
    <div className={`flex flex-col min-h-full relative transition-colors duration-200 ${
      isDarkMode ? 'bg-slate-900 text-white' : 'bg-background text-slate-900'
    }`}>
      {/* Header flotante con paso sincronizado: Paso 3 de 5 */}
      <div className={`sticky top-0 z-30 px-4 py-2.5 backdrop-blur-md border-b flex items-center justify-between transition-colors ${
        isDarkMode
          ? 'bg-slate-900/90 border-slate-800'
          : 'bg-surface/90 border-slate-100'
      }`}>
        <button
          onClick={onBack}
          type="button"
          className="flex items-center gap-1.5 text-xs font-bold text-primary dark:text-[#7C9FE7] px-2 py-1 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 active:scale-95 transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Ficha de cochera</span>
        </button>
        <span className="text-xs font-extrabold text-primary dark:text-slate-200">
          Paso 3 de 5
        </span>
      </div>

      {/* Contenedor desplazable con pb-28 para que el contenido nunca quede tapado por la barra inferior */}
      <div className="flex-1 overflow-y-auto px-4 pt-4 pb-28 space-y-4 no-scrollbar">
        {/* Cochera seleccionada compacta */}
        <div className={`p-3 rounded-2xl border flex items-center gap-3 shadow-xs transition-colors ${
          isDarkMode ? 'bg-slate-800/90 border-slate-700' : 'bg-white border-slate-200'
        }`}>
          <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0 bg-slate-100 dark:bg-slate-800">
            <Image
              src={parking.images[0]}
              alt={parking.title}
              fill
              sizes="56px"
              className="object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <span className="text-[10px] font-bold text-secondary dark:text-[#7C9FE7] uppercase tracking-wider">
              {parking.zone}
            </span>
            <h3 className="text-xs font-bold text-slate-900 dark:text-white truncate">
              {parking.title}
            </h3>
            <p className="text-[11px] text-textSecondary dark:text-slate-400 truncate">
              Tarifa: ${parking.hourlyRate.toFixed(2)}/h
            </p>
          </div>
        </div>

        {/* 1. Selector de Fecha */}
        <div className={`p-4 rounded-2xl border shadow-xs transition-colors ${
          isDarkMode ? 'bg-slate-800/90 border-slate-700' : 'bg-white border-slate-200'
        }`}>
          <label className="text-xs font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-primary dark:text-[#7C9FE7]" />
            Fecha de Reserva
          </label>
          <div className="grid grid-cols-3 gap-2">
            {['Hoy', 'Mañana', 'Sábado'].map((dateOption, idx) => {
              const isSelected = idx === 0;
              return (
                <button
                  key={dateOption}
                  type="button"
                  className={`py-2 px-3 rounded-xl text-xs font-semibold transition-all duration-150 active:scale-95 cursor-pointer ${
                    isSelected
                      ? 'bg-primary text-white shadow-xs ring-1 ring-primary'
                      : isDarkMode
                      ? 'bg-slate-700/60 border border-slate-600 text-slate-300 hover:bg-slate-700'
                      : 'bg-slate-50 border border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {dateOption}
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Selector de Horas con Stepper Interactivo Coherente */}
        <div className={`p-4 rounded-2xl border shadow-xs transition-colors ${
          isDarkMode ? 'bg-slate-800/90 border-slate-700' : 'bg-white border-slate-200'
        }`}>
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-primary dark:text-[#7C9FE7]" />
                Duración del Estacionamiento
              </h3>
              <p className="text-[11px] text-textSecondary dark:text-slate-400">
                Selecciona la cantidad de horas necesarias
              </p>
            </div>
            <Badge variant="accent" size="sm">
              ${parking.hourlyRate.toFixed(2)}/h
            </Badge>
          </div>

          <div className={`flex items-center justify-between p-2.5 rounded-2xl border transition-colors ${
            isDarkMode ? 'bg-slate-900/60 border-slate-700' : 'bg-slate-50 border-slate-200/80'
          }`}>
            {/* Botón Decrementar (-) */}
            <button
              onClick={onDecrementHours}
              disabled={hours <= 1}
              type="button"
              className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-base transition-colors ${
                hours <= 1
                  ? 'bg-slate-100 dark:bg-slate-800 text-slate-400 opacity-30 cursor-not-allowed'
                  : 'bg-slate-100 dark:bg-slate-750 text-[#001F5D] dark:text-white hover:bg-slate-200 dark:hover:bg-slate-700 active:scale-95 cursor-pointer shadow-xs'
              }`}
              aria-label="Disminuir una hora"
            >
              <Minus className="w-4 h-4 stroke-[2.5]" />
            </button>

            <div className="text-center px-4">
              <span className="text-2xl font-black text-primary dark:text-white">
                {hours} {hours === 1 ? 'hora' : 'horas'}
              </span>
              <p className="text-[11px] font-semibold text-secondary dark:text-[#7C9FE7] mt-0.5">
                {timeRange.formattedRange}
              </p>
            </div>

            {/* Botón Incrementar (+) */}
            <button
              onClick={onIncrementHours}
              disabled={hours >= 12}
              type="button"
              className="w-10 h-10 rounded-xl bg-[#001F5D] text-white hover:bg-[#001744] flex items-center justify-center font-bold text-base shadow-xs active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
              aria-label="Aumentar una hora"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>

          <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500 bg-amber-50/70 dark:bg-amber-950/30 p-2.5 rounded-xl border border-amber-200/60 dark:border-amber-900/40">
            <span className="flex items-center gap-1 font-medium text-amber-900 dark:text-amber-200">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400 shrink-0" />
              Tolerancia de 15 min gratis al entrar
            </span>
          </div>
        </div>

        {/* 3. Desglose Transparente del Modelo de Negocio (15% Take Rate) */}
        <div className={`p-4 rounded-2xl border shadow-xs space-y-2.5 transition-colors ${
          isDarkMode ? 'bg-slate-800/90 border-slate-700' : 'bg-white border-slate-200'
        }`}>
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-2">
            <h3 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider">
              Desglose de Pago
            </h3>
            <span className="text-[10px] bg-secondary-light dark:bg-blue-950/50 text-primary dark:text-[#7C9FE7] font-bold px-2 py-0.5 rounded-full border border-secondary/20">
              Comisión Transparente
            </span>
          </div>

          <div className="flex justify-between text-xs text-slate-700 dark:text-slate-300">
            <span>
              Tiempo reservado ({hours} {hours === 1 ? 'hr' : 'hrs'} x $
              {financials.hourlyRate.toFixed(2)})
            </span>
            <span className="font-semibold">
              ${financials.subtotal.toFixed(2)}
            </span>
          </div>

          <div className="flex justify-between text-xs text-slate-700 dark:text-slate-300">
            <span className="flex items-center gap-1 text-slate-600 dark:text-slate-400">
              Tarifa de servicio colaborativo (15%)
              <Info className="w-3 h-3 text-secondary" />
            </span>
            <span className="font-semibold text-secondary dark:text-[#7C9FE7]">
              ${financials.commissionFee.toFixed(2)}
            </span>
          </div>

          <div className="pt-2 border-t border-slate-200 dark:border-slate-700 flex justify-between items-baseline">
            <div>
              <span className="text-xs font-black text-slate-900 dark:text-white">
                Total a pagar
              </span>
              <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">
                Sin cargos ocultos ni propinas obligadas
              </p>
            </div>
            <span className="text-xl font-black text-primary dark:text-[#ECD700]">
              ${financials.totalAmount.toFixed(2)}
            </span>
          </div>
        </div>

        {/* 4. Propuesta de Valor y Ahorro (Texto Completo sin Cortes) */}
        <div className="p-3 rounded-2xl bg-gradient-to-r from-amber-50 to-yellow-100/70 dark:from-amber-950/30 dark:to-yellow-950/20 border border-[#ECD700]/40 shadow-xs flex items-start gap-2.5">
          <div className="w-7 h-7 rounded-xl bg-[#ECD700] text-[#001F5D] flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-black text-[#001F5D] dark:text-[#ECD700]">
              Ahorras aprox. ${financials.estimatedSaving.toFixed(2)}
            </h4>
            <p className="text-[11px] text-slate-700 dark:text-slate-300 mt-0.5 leading-snug">
              Comparado con parqueos tradicionales o cuidadores de calle (ahorras más de $4.00).
            </p>
          </div>
        </div>
      </div>

      {/* 5. Barra Fija Inferior Estandarizada */}
      <div className={`sticky bottom-0 z-30 px-4 py-3 backdrop-blur-md border-t flex items-center justify-between gap-3 shadow-floating transition-colors ${
        isDarkMode
          ? 'bg-slate-900/95 border-slate-800'
          : 'bg-white/95 border-slate-200'
      }`}>
        <div>
          <span className="text-[10px] uppercase font-bold text-[#59667B] dark:text-slate-400 block mb-0.5">
            Total a pagar
          </span>
          <p className="text-2xl font-black text-[#001F5D] dark:text-white">
            ${financials.totalAmount.toFixed(2)}
          </p>
        </div>

        <button
          type="button"
          onClick={onProceedToPayment}
          className="h-12 px-6 rounded-2xl bg-[#ECD700] hover:bg-[#dfcb00] active:scale-[0.98] text-[#001F5D] text-sm font-bold tracking-tight shadow-sm transition-all duration-150 flex items-center justify-center cursor-pointer border border-[#ECD700]/60 shrink-0"
        >
          <span>Continuar al Pago</span>
          <ChevronRight className="w-4 h-4 stroke-[2.5] ml-1.5 text-[#001F5D]" />
        </button>
      </div>
    </div>
  );
};
