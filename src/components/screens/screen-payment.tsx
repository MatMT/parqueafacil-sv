'use client';

import React from 'react';
import { PaymentMethodType, ParkingSpace } from '../../types';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import {
  ArrowLeft,
  CreditCard,
  Zap,
  Building2,
  Lock,
  CheckCircle2,
  Clock,
  MapPin,
  Shield,
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
}) => {
  // Cálculo aproximado de Sats para Chivo Wallet (asumiendo BTC ~ $65,000 USD)
  const estimatedSats = Math.round((totalAmount / 65000) * 100000000);

  return (
    <div className="flex flex-col min-h-full pb-6 relative bg-background">
      {/* Header */}
      <div className="sticky top-0 z-30 px-4 py-2.5 bg-surface/90 backdrop-blur-md border-b border-slate-100 flex items-center justify-between">
        <button
          onClick={onBack}
          type="button"
          disabled={isProcessing}
          className="flex items-center gap-1.5 text-xs font-bold text-primary px-2 py-1 rounded-xl hover:bg-slate-100 active:scale-95 transition-all disabled:opacity-40"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Cambiar horario</span>
        </button>
        <span className="text-xs font-extrabold text-primary">Paso 3 de 4</span>
      </div>

      <div className="px-4 pt-4 space-y-4 flex-1">
        {/* Resumen compacto de la reserva */}
        <div className="bg-primary text-white p-4 rounded-2xl shadow-card relative overflow-hidden">
          <div className="flex justify-between items-start mb-2">
            <div>
              <span className="text-[10px] text-accent font-extrabold uppercase tracking-wider">
                Resumen de Reserva
              </span>
              <h3 className="text-sm font-bold truncate max-w-[200px]">
                {parking.title}
              </h3>
            </div>
            <div className="text-right">
              <span className="text-lg font-black text-accent">
                ${totalAmount.toFixed(2)}
              </span>
              <p className="text-[10px] text-slate-300">Total con 15%</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/15 text-[11px] text-slate-200">
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-secondary" />
              <span>
                {hours} {hours === 1 ? 'hora' : 'horas'} ({timeRange.formattedRange})
              </span>
            </div>
            <div className="flex items-center gap-1.5 justify-end">
              <MapPin className="w-3.5 h-3.5 text-secondary" />
              <span className="truncate">{parking.zone}</span>
            </div>
          </div>
        </div>

        {/* Métodos de Pago Locales */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">
              Métodos de Pago en El Salvador
            </h3>
            <span className="text-[10px] text-slate-500 flex items-center gap-1">
              <Lock className="w-3 h-3 text-emerald-600" />
              Encriptación SSL
            </span>
          </div>

          <div className="space-y-2.5">
            {/* 1. Tarjeta de Crédito / Débito */}
            <div
              onClick={() => onSelectPaymentMethod('card')}
              className={`p-3.5 rounded-2xl bg-white border cursor-pointer transition-all duration-150 ${
                paymentMethod === 'card'
                  ? 'border-primary ring-2 ring-primary/20 shadow-card'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-primary flex items-center justify-center shrink-0">
                    <CreditCard className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">
                      Tarjeta de Crédito / Débito
                    </h4>
                    <p className="text-[11px] text-textSecondary">
                      Visa / Mastercard •••• 4242
                    </p>
                  </div>
                </div>

                <div
                  className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                    paymentMethod === 'card'
                      ? 'border-primary bg-primary text-white'
                      : 'border-slate-300'
                  }`}
                >
                  {paymentMethod === 'card' && (
                    <div className="w-2 h-2 rounded-full bg-accent" />
                  )}
                </div>
              </div>

              {/* Campos simulados expandidos si está activa */}
              {paymentMethod === 'card' && (
                <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-600 bg-slate-50 p-2 rounded-xl">
                  <span>Vence: 08/28</span>
                  <span>CVC: •••</span>
                  <Badge variant="success" size="sm">
                    Token Verificado
                  </Badge>
                </div>
              )}
            </div>

            {/* 2. Chivo Wallet / Bitcoin Lightning */}
            <div
              onClick={() => onSelectPaymentMethod('chivo')}
              className={`p-3.5 rounded-2xl bg-white border cursor-pointer transition-all duration-150 ${
                paymentMethod === 'chivo'
                  ? 'border-primary ring-2 ring-primary/20 shadow-card'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-950 text-accent flex items-center justify-center shrink-0 font-black text-sm">
                    <Zap className="w-5 h-5 fill-accent text-accent" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-xs font-bold text-slate-900">
                        Chivo Wallet / Bitcoin (Lightning)
                      </h4>
                      <Badge variant="accent" size="sm">
                        0% fee
                      </Badge>
                    </div>
                    <p className="text-[11px] text-textSecondary font-mono mt-0.5">
                      Aprox. {estimatedSats.toLocaleString()} sats
                    </p>
                  </div>
                </div>

                <div
                  className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                    paymentMethod === 'chivo'
                      ? 'border-primary bg-primary text-white'
                      : 'border-slate-300'
                  }`}
                >
                  {paymentMethod === 'chivo' && (
                    <div className="w-2 h-2 rounded-full bg-accent" />
                  )}
                </div>
              </div>
            </div>

            {/* 3. Transferencia Bancaria Local (Transfer365) */}
            <div
              onClick={() => onSelectPaymentMethod('transfer')}
              className={`p-3.5 rounded-2xl bg-white border cursor-pointer transition-all duration-150 ${
                paymentMethod === 'transfer'
                  ? 'border-primary ring-2 ring-primary/20 shadow-card'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">
                      Transferencia Transfer365
                    </h4>
                    <p className="text-[11px] text-textSecondary">
                      Banco Agrícola, BAC Credomatic, Cuscatlán
                    </p>
                  </div>
                </div>

                <div
                  className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                    paymentMethod === 'transfer'
                      ? 'border-primary bg-primary text-white'
                      : 'border-slate-300'
                  }`}
                >
                  {paymentMethod === 'transfer' && (
                    <div className="w-2 h-2 rounded-full bg-accent" />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Garantía de Seguridad Colaborativa */}
        <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 flex items-center gap-3 text-xs text-slate-700">
          <Shield className="w-5 h-5 text-emerald-600 shrink-0" />
          <p className="text-[11px] leading-tight">
            <strong className="text-slate-900">Protección ParqueaFácil:</strong> El pago se libera al anfitrión solo al validar tu entrada con el código QR.
          </p>
        </div>
      </div>

      {/* Barra Inferior con Botón de Confirmación y Estado de Carga */}
      <div className="mt-4 sticky bottom-0 z-30 px-4 py-3 bg-white/95 backdrop-blur-md border-t border-slate-200 flex flex-col gap-2 shadow-floating">
        <Button
          variant="accent"
          size="lg"
          fullWidth
          isLoading={isProcessing}
          onClick={onConfirmPayment}
          leftIcon={!isProcessing && <CheckCircle2 className="w-4 h-4 text-primary" />}
        >
          {isProcessing ? 'Procesando pago seguro...' : `Confirmar y Pagar $${totalAmount.toFixed(2)}`}
        </Button>
        <p className="text-center text-[10px] text-slate-400 font-medium">
          Transacción protegida por protocolo 3D Secure
        </p>
      </div>
    </div>
  );
};
