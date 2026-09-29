'use client';

import React from 'react';
import Image from 'next/image';
import { ParkingSpace } from '../../types';
import { Button } from '../ui/button';
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
}) => {
  return (
    <div className="flex flex-col min-h-full pb-20 relative bg-background">
      {/* Header flotante */}
      <div className="sticky top-0 z-30 px-4 py-2.5 bg-surface/90 backdrop-blur-md border-b border-slate-100 flex items-center justify-between">
        <button
          onClick={onBack}
          type="button"
          className="flex items-center gap-1.5 text-xs font-bold text-primary px-2 py-1 rounded-xl hover:bg-slate-100 active:scale-95 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Ficha de cochera</span>
        </button>
        <span className="text-xs font-extrabold text-primary">Paso 2 de 4</span>
      </div>

      <div className="px-4 pt-4 space-y-4">
        {/* Cochera seleccionada compacta */}
        <div className="p-3 bg-white rounded-2xl border border-slate-200 flex items-center gap-3 shadow-xs">
          <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0 bg-slate-100">
            <Image
              src={parking.images[0]}
              alt={parking.title}
              fill
              sizes="56px"
              className="object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <span className="text-[10px] font-bold text-secondary-dark uppercase tracking-wider">
              {parking.zone}
            </span>
            <h3 className="text-xs font-bold text-slate-900 truncate">
              {parking.title}
            </h3>
            <p className="text-[11px] text-textSecondary truncate">
              Tarifa: ${parking.hourlyRate.toFixed(2)}/h
            </p>
          </div>
        </div>

        {/* 1. Selector de Fecha */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <label className="text-xs font-bold text-slate-900 mb-2 flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-primary" />
            Fecha de Reserva
          </label>
          <div className="grid grid-cols-3 gap-2">
            {['Hoy', 'Mañana', 'Sábado'].map((dateOption, idx) => {
              const isSelected = idx === 0;
              return (
                <button
                  key={dateOption}
                  type="button"
                  className={`py-2 px-3 rounded-xl text-xs font-semibold transition-all duration-150 active:scale-95 ${
                    isSelected
                      ? 'bg-primary text-white shadow-xs ring-1 ring-primary'
                      : 'bg-slate-50 border border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {dateOption}
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Selector de Horas con Stepper Interactivo */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-primary" />
                Duración del Estacionamiento
              </h3>
              <p className="text-[11px] text-textSecondary">
                Selecciona la cantidad de horas necesarias
              </p>
            </div>
            <Badge variant="accent" size="sm">
              ${parking.hourlyRate.toFixed(2)}/h
            </Badge>
          </div>

          <div className="flex items-center justify-between bg-slate-50 p-2.5 rounded-2xl border border-slate-200/80">
            <button
              onClick={onDecrementHours}
              disabled={hours <= 1}
              type="button"
              className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-primary font-bold shadow-xs hover:bg-slate-100 active:scale-90 disabled:opacity-30 disabled:active:scale-100 transition-all"
            >
              <Minus className="w-4 h-4" />
            </button>

            <div className="text-center px-4">
              <span className="text-2xl font-black text-primary">
                {hours} {hours === 1 ? 'hora' : 'horas'}
              </span>
              <p className="text-[11px] font-semibold text-secondary-dark mt-0.5">
                {timeRange.formattedRange}
              </p>
            </div>

            <button
              onClick={onIncrementHours}
              disabled={hours >= 12}
              type="button"
              className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center font-bold shadow-xs hover:bg-primary-hover active:scale-90 disabled:opacity-30 disabled:active:scale-100 transition-all"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500 bg-amber-50/70 p-2.5 rounded-xl border border-amber-200/60">
            <span className="flex items-center gap-1 font-medium text-amber-900">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-700 shrink-0" />
              Tolerancia de 15 min gratis al entrar
            </span>
          </div>
        </div>

        {/* 3. Desglose Transparente del Modelo de Negocio (15% Take Rate) */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-2.5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">
              Desglose de Pago
            </h3>
            <span className="text-[10px] bg-secondary-light text-primary font-bold px-2 py-0.5 rounded-full">
              Comisión Transparente
            </span>
          </div>

          <div className="flex justify-between text-xs text-slate-700">
            <span>
              Tiempo reservado ({hours} {hours === 1 ? 'hr' : 'hrs'} x $
              {financials.hourlyRate.toFixed(2)})
            </span>
            <span className="font-semibold">
              ${financials.subtotal.toFixed(2)}
            </span>
          </div>

          <div className="flex justify-between text-xs text-slate-700">
            <span className="flex items-center gap-1 text-slate-600">
              Tarifa de servicio colaborativo (15%)
              <Info className="w-3 h-3 text-secondary-dark" />
            </span>
            <span className="font-semibold text-secondary-dark">
              ${financials.commissionFee.toFixed(2)}
            </span>
          </div>

          <div className="pt-2 border-t border-slate-200 flex justify-between items-baseline">
            <div>
              <span className="text-xs font-black text-slate-900">
                Total a pagar
              </span>
              <p className="text-[10px] text-emerald-600 font-semibold">
                Sin cargos ocultos ni propinas obligadas
              </p>
            </div>
            <span className="text-xl font-black text-primary">
              ${financials.totalAmount.toFixed(2)}
            </span>
          </div>
        </div>

        {/* 4. Propuesta de Valor y Ahorro */}
        <div className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-50 to-yellow-100/70 border border-amber-200/80 shadow-xs flex items-start gap-2.5">
          <div className="w-7 h-7 rounded-xl bg-accent text-primary flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-black text-primary">
              Ahorras aprox. ${financials.estimatedSaving.toFixed(2)}
            </h4>
            <p className="text-[11px] text-slate-700 mt-0.5 leading-snug">
              Comparado con parqueos tradicionales o cuidadores de calle que
              cobran hasta $5 o $7 sin seguridad garantizada.
            </p>
          </div>
        </div>
      </div>

      {/* Barra Inferior con CTA */}
      <div className="sticky bottom-0 z-30 px-4 py-3 bg-white/95 backdrop-blur-md border-t border-slate-200 flex items-center justify-between gap-3 shadow-floating">
        <div>
          <span className="text-[10px] font-bold text-textSecondary uppercase">
            Total final
          </span>
          <p className="text-lg font-black text-primary">
            ${financials.totalAmount.toFixed(2)}
          </p>
        </div>

        <Button
          variant="accent"
          size="md"
          onClick={onProceedToPayment}
          rightIcon={<ChevronRight className="w-4 h-4 text-primary" />}
        >
          Continuar al Pago
        </Button>
      </div>
    </div>
  );
};
