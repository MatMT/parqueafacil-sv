'use client';

import React, { useState } from 'react';
import { ParkingSpace, BookingDetails } from '../../types';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import {
  CheckCircle,
  QrCode,
  MapPin,
  Clock,
  Car,
  MessageCircle,
  Navigation2,
  RotateCcw,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  Check,
} from 'lucide-react';

export interface ScreenTicketProps {
  parking: ParkingSpace;
  booking: BookingDetails;
  onNewSearch: () => void;
}

export const ScreenTicket: React.FC<ScreenTicketProps> = ({
  parking,
  booking,
  onNewSearch,
}) => {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const handleOpenMaps = () => {
    showToast(
      `Ruta trazada hacia ${parking.title} en Waze / Google Maps (San Salvador)`
    );
  };

  const handleWhatsApp = () => {
    showToast(
      `Abriendo chat con ${parking.host.name}: "Hola, voy en camino con mi reserva #${booking.bookingCode}"`
    );
  };

  return (
    <div className="flex flex-col min-h-full pb-8 relative bg-background px-4 pt-4">
      {/* Toast Notificación */}
      {toastMessage && (
        <div className="fixed top-14 inset-x-8 z-50 bg-slate-900 text-white text-xs px-3.5 py-2.5 rounded-2xl shadow-xl flex items-center gap-2 border border-slate-700 animate-in fade-in slide-in-from-top-2 duration-200">
          <Sparkles className="w-4 h-4 text-accent shrink-0" />
          <span className="flex-1 font-medium">{toastMessage}</span>
        </div>
      )}

      {/* 1. Header con Animación de Éxito */}
      <div className="text-center pt-2 pb-4">
        <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-2 shadow-sm ring-4 ring-emerald-50">
          <CheckCircle className="w-8 h-8 fill-emerald-600 text-white" />
        </div>
        <Badge variant="accent" size="sm" className="mb-1">
          ¡Reserva Confirmada!
        </Badge>
        <h1 className="text-lg font-black text-slate-900">
          Tu Espacio Está Asegurado
        </h1>
        <p className="text-xs text-textSecondary">
          Presenta este ticket al llegar al portón
        </p>
      </div>

      {/* 2. Tarjeta Digital / Pase de Entrada Estilo Boarding Pass */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-card overflow-hidden relative">
        {/* Franja superior institucional */}
        <div className="bg-primary text-white p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-sm tracking-tight text-white">
                ParqueaFácil
              </span>
              <span className="text-[10px] font-black bg-accent text-primary px-1.5 py-0.5 rounded">
                SV
              </span>
            </div>
            <span className="font-mono text-xs font-bold text-accent">
              #{booking.bookingCode}
            </span>
          </div>

          <div className="mt-3">
            <h2 className="text-base font-bold text-white truncate">
              {parking.title}
            </h2>
            <p className="text-[11px] text-slate-300 flex items-center gap-1 mt-0.5">
              <MapPin className="w-3 h-3 text-secondary shrink-0" />
              <span>{parking.zone}</span>
            </p>
          </div>
        </div>

        {/* Separador de ticket con muescas circulares */}
        <div className="relative h-4 bg-white flex items-center">
          <div className="absolute -left-2.5 w-5 h-5 rounded-full bg-background border-r border-slate-200" />
          <div className="w-full border-b border-dashed border-slate-200 mx-4" />
          <div className="absolute -right-2.5 w-5 h-5 rounded-full bg-background border-l border-slate-200" />
        </div>

        {/* Código QR Vectorial Nítido */}
        <div className="p-4 flex flex-col items-center">
          <div className="p-3 bg-white border-2 border-slate-900 rounded-2xl shadow-sm mb-2">
            <svg
              className="w-40 h-40 text-slate-900"
              viewBox="0 0 100 100"
              fill="currentColor"
            >
              {/* Esquinas superiores e inferior de posicionamiento de QR */}
              <rect x="5" y="5" width="25" height="25" rx="3" fill="#001F5D" />
              <rect x="10" y="10" width="15" height="15" fill="#FFFFFF" />
              <rect x="13" y="13" width="9" height="9" fill="#001F5D" />

              <rect x="70" y="5" width="25" height="25" rx="3" fill="#001F5D" />
              <rect x="75" y="10" width="15" height="15" fill="#FFFFFF" />
              <rect x="78" y="13" width="9" height="9" fill="#001F5D" />

              <rect x="5" y="70" width="25" height="25" rx="3" fill="#001F5D" />
              <rect x="10" y="75" width="15" height="15" fill="#FFFFFF" />
              <rect x="13" y="78" width="9" height="9" fill="#001F5D" />

              {/* Patrones de datos simulados */}
              <rect x="36" y="8" width="6" height="6" rx="1" fill="#001F5D" />
              <rect x="48" y="8" width="12" height="6" rx="1" fill="#001F5D" />
              <rect x="36" y="20" width="18" height="6" rx="1" fill="#001F5D" />
              <rect x="40" y="32" width="8" height="8" rx="1" fill="#ECD700" />
              <rect x="54" y="32" width="6" height="6" rx="1" fill="#001F5D" />
              <rect x="8" y="36" width="6" height="14" rx="1" fill="#001F5D" />
              <rect x="20" y="44" width="10" height="6" rx="1" fill="#001F5D" />
              <rect x="70" y="36" width="12" height="6" rx="1" fill="#001F5D" />
              <rect x="86" y="46" width="6" height="14" rx="1" fill="#001F5D" />

              <rect x="36" y="46" width="8" height="8" rx="1" fill="#001F5D" />
              <rect x="48" y="48" width="14" height="6" rx="1" fill="#001F5D" />
              <rect x="36" y="60" width="18" height="8" rx="1" fill="#001F5D" />
              <rect x="60" y="60" width="8" height="8" rx="1" fill="#001F5D" />
              <rect x="72" y="64" width="18" height="6" rx="1" fill="#001F5D" />
              <rect x="36" y="76" width="14" height="16" rx="1" fill="#001F5D" />
              <rect x="56" y="76" width="8" height="8" rx="1" fill="#001F5D" />
              <rect x="68" y="76" width="22" height="6" rx="1" fill="#001F5D" />
              <rect x="76" y="86" width="14" height="6" rx="1" fill="#001F5D" />
            </svg>
          </div>
          <span className="text-[11px] font-mono text-slate-500 font-semibold tracking-wider">
            TOKEN: {booking.bookingCode}
          </span>
        </div>

        {/* Datos Clave del Pase */}
        <div className="p-4 pt-1 border-t border-slate-100 bg-slate-50/50 space-y-2.5 text-xs">
          <div className="flex justify-between items-center">
            <span className="text-textSecondary flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-primary" />
              Horario asegurado:
            </span>
            <span className="font-bold text-slate-900">
              {booking.date}, {booking.startTime} - {booking.endTime}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-textSecondary flex items-center gap-1">
              <Car className="w-3.5 h-3.5 text-primary" />
              Anfitrión:
            </span>
            <span className="font-bold text-slate-900">
              {parking.host.name}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-textSecondary">Total pagado:</span>
            <span className="font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
              ${booking.totalAmount.toFixed(2)} (Confirmado)
            </span>
          </div>
        </div>
      </div>

      {/* 3. Botones de Acción Complementarios */}
      <div className="mt-4 space-y-2">
        <button
          onClick={handleOpenMaps}
          type="button"
          className="w-full py-3 px-4 rounded-2xl bg-white border border-slate-200 text-xs font-bold text-slate-900 hover:bg-slate-50 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-xs"
        >
          <Navigation2 className="w-4 h-4 text-blue-600" />
          <span>Cómo llegar (Abrir en Waze / Google Maps)</span>
        </button>

        <button
          onClick={handleWhatsApp}
          type="button"
          className="w-full py-3 px-4 rounded-2xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-xs"
        >
          <MessageCircle className="w-4 h-4" />
          <span>Contactar a {parking.host.name} por WhatsApp</span>
        </button>

        <Button
          variant="outline"
          size="md"
          fullWidth
          onClick={onNewSearch}
          leftIcon={<RotateCcw className="w-3.5 h-3.5" />}
        >
          Volver al inicio / Nueva búsqueda
        </Button>
      </div>

      {/* Sello de confianza */}
      <div className="mt-4 text-center text-[10px] text-slate-400 flex items-center justify-center gap-1">
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
        <span>Garantía de espacio colaborativo ParqueaFácilSV</span>
      </div>
    </div>
  );
};
