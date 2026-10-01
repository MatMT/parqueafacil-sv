'use client';

import React from 'react';
import { PaymentMethodType, ParkingSpace } from '../../types';
import {
  ArrowLeft,
  CreditCard,
  Zap,
  Building2,
  Lock,
  Clock,
  MapPin,
  Shield,
  Check,
  ChevronRight,
} from 'lucide-react';

export interface ScreenPaymentProps {
  parking: ParkingSpace;
  totalAmount: number;
  hours: number;
  timeRange: {
    formattedRange: string;
    date: string;
  };
  paymentMethod: PaymentMethodType;
  onSelectPaymentMethod: (method: PaymentMethodType) => void;
  isProcessing: boolean;
  onConfirmPayment: () => void;
  onBack: () => void;
  isDarkMode?: boolean;
}

export const ScreenPayment: React.FC<ScreenPaymentProps> = ({
  parking,
  totalAmount,
  hours,
  timeRange,
  paymentMethod,
  onSelectPaymentMethod,
  isProcessing,
  onConfirmPayment,
  onBack,
  isDarkMode = false,
}) => {
  // Cálculo aproximado de Sats para Chivo Wallet (asumiendo BTC ~ $65,000 USD)
  const estimatedSats = Math.round((totalAmount / 65000) * 100000000);

  return (
    <div
      className={`flex flex-col min-h-full pb-6 relative transition-colors duration-300 ${
        isDarkMode ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'
      }`}
    >
      {/* 1. Header con Flecha Funcional "Atrás" y Progreso */}
      <div
        className={`sticky top-0 z-30 px-4 py-3 border-b flex items-center justify-between backdrop-blur-md transition-colors ${
          isDarkMode
            ? 'bg-slate-950/90 border-slate-800'
            : 'bg-white/95 border-slate-100 shadow-xs'
        }`}
      >
        <button
          onClick={onBack}
          type="button"
          disabled={isProcessing}
          className={`flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-xl active:scale-95 transition-all cursor-pointer disabled:opacity-40 ${
            isDarkMode
              ? 'text-[#7C9FE7] hover:bg-slate-800'
              : 'text-[#001F5D] hover:bg-slate-100'
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Atrás</span>
        </button>

        <span
          className={`text-xs font-black tracking-tight ${
            isDarkMode ? 'text-slate-300' : 'text-[#001F5D]'
          }`}
        >
          Paso 4 de 5
        </span>
      </div>

      <div className="px-4 pt-4 space-y-4 flex-1">
        {/* 2. Tarjeta de Resumen (#001F5D) sin texto truncado */}
        <div className="bg-[#001F5D] text-white p-4 rounded-2xl shadow-md border border-blue-900/60 relative overflow-hidden">
          <div className="flex items-start justify-between gap-3 mb-3">
            {/* Columna Izquierda: Detalles del lugar y fecha */}
            <div className="flex-1 min-w-0">
              <span className="text-[10px] text-[#ECD700] font-black uppercase tracking-wider block mb-0.5">
                Resumen de Reserva
              </span>
              <h3 className="text-sm font-bold leading-snug break-words">
                {parking.title}
              </h3>
              <p className="text-xs text-slate-300 flex items-center gap-1 mt-1">
                <MapPin className="w-3.5 h-3.5 text-[#7C9FE7] shrink-0" />
                <span>{parking.zone}</span>
              </p>
            </div>

            {/* Columna Derecha: Monto grande con badge de comisión */}
            <div className="text-right shrink-0">
              <div className="text-2xl font-black text-[#ECD700] leading-none mb-1">
                ${totalAmount.toFixed(2)}
              </div>
              <span className="inline-block bg-white/10 text-slate-200 text-[10px] font-semibold px-2 py-0.5 rounded-full border border-white/10">
                Incluye 15% comisión
              </span>
            </div>
          </div>

          {/* Horario sin truncar */}
          <div className="pt-2.5 border-t border-white/15 flex items-center gap-1.5 text-xs text-slate-200">
            <Clock className="w-3.5 h-3.5 text-[#7C9FE7] shrink-0" />
            <span>
              Hoy · {timeRange.formattedRange} ({hours} {hours === 1 ? 'hora' : 'horas'})
            </span>
          </div>
        </div>

        {/* 3. Métodos de Pago con Selección Interactiva */}
        <div>
          <div className="flex items-center justify-between mb-2.5">
            <h3
              className={`text-xs font-black uppercase tracking-wider ${
                isDarkMode ? 'text-slate-300' : 'text-slate-900'
              }`}
            >
              Métodos de Pago en El Salvador
            </h3>
            <span className="text-[10px] text-slate-500 flex items-center gap-1 font-medium">
              <Lock className="w-3 h-3 text-emerald-600" />
              Encriptación SSL
            </span>
          </div>

          <div className="space-y-2.5">
            {/* 1. Tarjeta Guardada */}
            <div
              onClick={() => onSelectPaymentMethod('card')}
              className={`p-3.5 rounded-2xl border cursor-pointer transition-all duration-150 flex items-center justify-between ${
                paymentMethod === 'card'
                  ? isDarkMode
                    ? 'border-[#7C9FE7] bg-blue-950/40 ring-2 ring-[#7C9FE7]/30 shadow-md'
                    : 'border-[#001F5D] bg-blue-50/60 ring-2 ring-[#001F5D]/20 shadow-sm'
                  : isDarkMode
                  ? 'border-slate-800 bg-slate-900 hover:border-slate-700'
                  : 'border-[#E2E8F0] bg-white hover:border-slate-300 shadow-2xs'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#001F5D] text-white flex items-center justify-center shrink-0 shadow-xs">
                  <CreditCard className="w-5 h-5 text-[#ECD700]" />
                </div>
                <div>
                  <h4
                    className={`text-xs font-bold leading-tight ${
                      isDarkMode ? 'text-white' : 'text-slate-900'
                    }`}
                  >
                    Visa Débito terminada en •••• 4242
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Tarjeta predeterminada verificada
                  </p>
                </div>
              </div>

              {/* Radio button interactivo */}
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                  paymentMethod === 'card'
                    ? 'border-[#001F5D] bg-[#001F5D]'
                    : 'border-slate-300'
                }`}
              >
                {paymentMethod === 'card' && (
                  <div className="w-2 h-2 rounded-full bg-[#ECD700]" />
                )}
              </div>
            </div>

            {/* 2. Chivo Wallet / Bitcoin Lightning */}
            <div
              onClick={() => onSelectPaymentMethod('chivo')}
              className={`p-3.5 rounded-2xl border cursor-pointer transition-all duration-150 flex items-center justify-between ${
                paymentMethod === 'chivo'
                  ? isDarkMode
                    ? 'border-[#7C9FE7] bg-blue-950/40 ring-2 ring-[#7C9FE7]/30 shadow-md'
                    : 'border-[#001F5D] bg-blue-50/60 ring-2 ring-[#001F5D]/20 shadow-sm'
                  : isDarkMode
                  ? 'border-slate-800 bg-slate-900 hover:border-slate-700'
                  : 'border-[#E2E8F0] bg-white hover:border-slate-300 shadow-2xs'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-950 text-[#ECD700] flex items-center justify-center shrink-0 shadow-xs border border-blue-900/50">
                  <Zap className="w-5 h-5 fill-[#ECD700] text-[#ECD700]" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4
                      className={`text-xs font-bold leading-tight ${
                        isDarkMode ? 'text-white' : 'text-slate-900'
                      }`}
                    >
                      Chivo Wallet (Bitcoin)
                    </h4>
                    <span className="text-[9px] font-black bg-[#ECD700]/20 text-[#001F5D] px-1.5 py-0.5 rounded border border-[#ECD700]/40">
                      Sin comisión (0% fee)
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 font-mono mt-0.5">
                    Aprox. ~{estimatedSats.toLocaleString()} sats (Red Lightning)
                  </p>
                </div>
              </div>

              {/* Radio button interactivo */}
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                  paymentMethod === 'chivo'
                    ? 'border-[#001F5D] bg-[#001F5D]'
                    : 'border-slate-300'
                }`}
              >
                {paymentMethod === 'chivo' && (
                  <div className="w-2 h-2 rounded-full bg-[#ECD700]" />
                )}
              </div>
            </div>

            {/* 3. Transferencia Transfer365 */}
            <div
              onClick={() => onSelectPaymentMethod('transfer')}
              className={`p-3.5 rounded-2xl border cursor-pointer transition-all duration-150 flex items-center justify-between ${
                paymentMethod === 'transfer'
                  ? isDarkMode
                    ? 'border-[#7C9FE7] bg-blue-950/40 ring-2 ring-[#7C9FE7]/30 shadow-md'
                    : 'border-[#001F5D] bg-blue-50/60 ring-2 ring-[#001F5D]/20 shadow-sm'
                  : isDarkMode
                  ? 'border-slate-800 bg-slate-900 hover:border-slate-700'
                  : 'border-[#E2E8F0] bg-white hover:border-slate-300 shadow-2xs'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 shadow-xs border border-emerald-100">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h4
                    className={`text-xs font-bold leading-tight ${
                      isDarkMode ? 'text-white' : 'text-slate-900'
                    }`}
                  >
                    Transferencia Bancaria Local (Transfer365)
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Banco Agrícola, BAC, Cuscatlán, Davivienda
                  </p>
                </div>
              </div>

              {/* Radio button interactivo */}
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                  paymentMethod === 'transfer'
                    ? 'border-[#001F5D] bg-[#001F5D]'
                    : 'border-slate-300'
                }`}
              >
                {paymentMethod === 'transfer' && (
                  <div className="w-2 h-2 rounded-full bg-[#ECD700]" />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Garantía de Seguridad Colaborativa */}
        <div
          className={`p-3 rounded-2xl border flex items-center gap-3 text-xs ${
            isDarkMode
              ? 'bg-slate-900/60 border-slate-800 text-slate-300'
              : 'bg-white border-slate-200/80 text-slate-700 shadow-2xs'
          }`}
        >
          <Shield className="w-5 h-5 text-emerald-500 shrink-0" />
          <p className="text-[11px] leading-tight">
            <strong className={isDarkMode ? 'text-white' : 'text-slate-900'}>
              Protección ParqueaFácil:
            </strong>{' '}
            El pago se libera al anfitrión únicamente tras validar tu entrada con el código QR.
          </p>
        </div>
      </div>

      {/* 4. Botón de Acción Principal Amarillo (#ECD700) con Texto (#001F5D) y Spinner */}
      <div
        className={`mt-4 sticky bottom-0 z-30 px-4 py-3 border-t flex flex-col gap-2 backdrop-blur-md transition-colors ${
          isDarkMode
            ? 'bg-slate-950/95 border-slate-800'
            : 'bg-white/95 border-slate-200 shadow-floating'
        }`}
      >
        <button
          type="button"
          disabled={isProcessing}
          onClick={onConfirmPayment}
          className="w-full h-12 px-6 rounded-2xl font-bold text-sm tracking-tight bg-[#ECD700] hover:bg-[#dfcb00] text-[#001F5D] shadow-sm transition-all duration-150 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-1.5 cursor-pointer border border-[#ECD700]/60"
        >
          {isProcessing ? (
            <>
              <div className="w-4 h-4 border-2 border-[#001F5D] border-t-transparent rounded-full animate-spin" />
              <span>Procesando pago seguro...</span>
            </>
          ) : (
            <>
              <span>Confirmar y Pagar ${totalAmount.toFixed(2)}</span>
              <ChevronRight className="w-4 h-4 stroke-[2.5] ml-1 text-[#001F5D]" />
            </>
          )}
        </button>
        <p className="text-center text-[10px] text-slate-400 font-medium">
          Transacción protegida por protocolo 3D Secure y cifrado bancario
        </p>
      </div>
    </div>
  );
};

export default ScreenPayment;
