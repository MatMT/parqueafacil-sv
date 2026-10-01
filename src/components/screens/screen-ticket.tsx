'use client';

import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { ParkingSpace, BookingDetails } from '../../types';
import { THEME_COLORS } from '../../constants/theme';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import {
  CheckCircle,
  MapPin,
  Clock,
  Car,
  MessageCircle,
  Navigation2,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  ExternalLink,
  Maximize2,
  X,
  Download,
  Share2,
} from 'lucide-react';

export interface ScreenTicketProps {
  parking: ParkingSpace;
  booking: BookingDetails;
  onNewSearch: () => void;
  isDarkMode?: boolean;
}

export const ScreenTicket: React.FC<ScreenTicketProps> = ({
  parking,
  booking,
  onNewSearch,
  isDarkMode = false,
}) => {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  // Helper para el método de pago
  const getPaymentDetails = (method: string) => {
    switch (method) {
      case 'chivo':
        return {
          label: 'Chivo Wallet / Bitcoin (Lightning ⚡)',
          short: 'Chivo Wallet ⚡',
        };
      case 'card':
        return {
          label: 'Tarjeta Visa Débito (•••• 4242)',
          short: 'Tarjeta •••• 4242',
        };
      case 'transfer':
        return {
          label: 'Transferencia Bancaria (Transfer365)',
          short: 'Transfer365',
        };
      default:
        return {
          label: 'Chivo Wallet / Bitcoin (Lightning ⚡)',
          short: 'Chivo Wallet ⚡',
        };
    }
  };

  const paymentInfo = getPaymentDetails(booking.paymentMethod);
  const hostPhone = '+503 7271-9118';

  // Cadena estructurada y sintetizada óptima para lectores de cámara en iOS y Android
  const qrPayload = [
    'PARQUEAFÁCIL SV | TICKET OFICIAL',
    `Código: #${booking.bookingCode || 'PFSV-8942'}`,
    `Lugar: ${parking.title || 'Espacio Hipódromo San Benito'} (${parking.zone || 'Zona Rosa'})`,
    `Horario: ${booking.scheduleText || `${booking.date || 'Hoy'} · ${booking.startTime || '11:00 AM'} - ${booking.endTime || '1:00 PM'} (${booking.hours || 2} hrs)`}`,
    `Total: $${booking.totalAmount ? booking.totalAmount.toFixed(2) : '3.45'} (Pagado)`,
    'ESTADO: ACCESO AUTORIZADO ✅',
  ].join('\n');

  // Acción 1: Cómo llegar (Google Maps / Waze)
  const handleOpenMaps = () => {
    showToast('Abriendo ruta hacia la cochera en Google Maps...');
    const query = encodeURIComponent(
      parking.addressReference
        ? `${parking.addressReference} ${parking.zone} El Salvador`
        : `${parking.title} Santa Tecla El Salvador`
    );
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
  };

  // Acción 2: Contactar por WhatsApp con mensaje prellenado
  const handleWhatsApp = () => {
    showToast(`Iniciando chat de WhatsApp con ${parking.host.name}...`);
    const cleanPhone = '50372719118';
    const message = `Hola ${parking.host.name}, tengo una reserva activa en ParqueaFácilSV con código #${booking.bookingCode}`;
    window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`, '_blank');
  };

  // Acción 3: Descargar comprobante oficial en PDF
  const handleDownloadTicket = () => {
    showToast(`Comprobante oficial guardado en Descargas (#${booking.bookingCode}.pdf)`);
  };

  return (
    <div className={`flex flex-col flex-1 overflow-y-auto px-4 py-3 relative no-scrollbar transition-colors duration-200 ${
      isDarkMode ? 'bg-slate-900 text-white' : 'bg-background text-slate-900'
    }`}>
      {/* Toast Notificación */}
      {toastMessage && (
        <div className="fixed top-14 inset-x-8 z-50 bg-slate-950 text-white text-xs px-3.5 py-2.5 rounded-2xl shadow-xl flex items-center gap-2 border border-slate-700 animate-in fade-in slide-in-from-top-2 duration-200">
          <Sparkles className="w-4 h-4 text-accent shrink-0" />
          <span className="flex-1 font-medium">{toastMessage}</span>
        </div>
      )}

      {/* MODAL QR EXPANDIDO: Ocupa vista completa con fondo oscuro, cerrable al hacer clic fuera o con botón */}
      {isQrModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Código QR ampliado"
          onClick={() => setIsQrModalOpen(false)}
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-6 animate-in fade-in duration-200 cursor-pointer"
        >
          {/* Contenedor del Modal */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-[340px] bg-slate-900 border border-slate-700/80 rounded-3xl p-6 shadow-2xl flex flex-col items-center text-center relative cursor-default animate-in zoom-in-95 duration-200"
          >
            {/* Botón Cerrar */}
            <button
              type="button"
              onClick={() => setIsQrModalOpen(false)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer border border-slate-700 active:scale-95"
              aria-label="Cerrar vista completa"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header del Modal */}
            <div className="mb-4 pr-6">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#ECD700] bg-[#001F5D] px-2.5 py-1 rounded-full border border-[#ECD700]/30 inline-block mb-1.5">
                Ticket Oficial #{booking.bookingCode}
              </span>
              <h3 className="text-base font-black text-white leading-tight">
                {parking.title}
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                {parking.zone} · {parking.addressReference}
              </p>
            </div>

            {/* QR Grande de alta resolución */}
            <div className="p-4 bg-white rounded-2xl shadow-xl border-4 border-[#001F5D] flex items-center justify-center my-1">
              <QRCodeSVG
                value={qrPayload}
                size={230}
                level="Q"
                includeMargin={false}
                fgColor={THEME_COLORS.primary}
                bgColor="#FFFFFF"
              />
            </div>

            {/* Instrucción de validación */}
            <div className="mt-4 space-y-1.5">
              <p className="text-xs font-semibold text-slate-200">
                Escanea desde cualquier distancia con la cámara
              </p>
              <p className="text-[11px] text-slate-400">
                Válido para entrada: <span className="text-white font-bold">{booking.date ? `${booking.date} · ` : ''}{booking.startTime} - {booking.endTime}</span>
              </p>
            </div>

            {/* Botón de cierre explícito */}
            <button
              type="button"
              onClick={() => setIsQrModalOpen(false)}
              className="mt-5 w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-white font-bold text-xs border border-slate-700 transition-all active:scale-95 cursor-pointer"
            >
              Cerrar Vista Ampliada
            </button>
          </div>
        </div>
      )}

      {/* 1. Header con Indicador de Éxito Compacto */}
      <div className="text-center pt-1 pb-2 shrink-0">
        <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-1.5 shadow-xs ring-2 ring-emerald-50 dark:ring-emerald-900/30">
          <CheckCircle className="w-6 h-6 fill-emerald-600 dark:fill-emerald-500 text-white dark:text-slate-900" />
        </div>
        <Badge variant="accent" size="sm" className="mb-0.5 text-[10px] py-0.5">
          ¡Reserva Confirmada!
        </Badge>
        <h1 className="text-base font-black tracking-tight leading-tight">
          Tu Espacio Está Asegurado
        </h1>
        <p className={`text-[11px] ${isDarkMode ? 'text-slate-400' : 'text-textSecondary'}`}>
          Presenta este ticket al llegar al portón
        </p>
      </div>

      {/* 2. Tarjeta Digital / Pase de Entrada Estilo Boarding Pass Compacto */}
      <div className={`rounded-2xl border shadow-card overflow-hidden relative shrink-0 transition-colors ${
        isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'
      }`}>
        {/* Cabecera del Ticket (#001F5D Navy) Compacta */}
        <div className="bg-primary text-white p-3.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-xs tracking-tight text-white">
                ParqueaFácil
              </span>
              <span className="text-[9px] font-black bg-accent text-primary px-1.5 py-0.2 rounded shadow-xs">
                SV
              </span>
            </div>
            <span className="font-mono text-xs font-bold text-accent tracking-wider bg-primaryLight/70 px-2 py-0.5 rounded border border-accent/20">
              #{booking.bookingCode}
            </span>
          </div>

          <div className="mt-2">
            <h2 className="text-sm font-bold text-white truncate leading-tight">
              {parking.title}
            </h2>
            <p className="text-[10px] text-slate-300 flex items-center gap-1 mt-0.5">
              <MapPin className="w-3 h-3 text-secondary shrink-0" />
              <span>{parking.zone}</span>
              <span className="text-slate-400">·</span>
              <span className="text-slate-300 truncate">{parking.addressReference}</span>
            </p>
          </div>
        </div>

        {/* Separador de corte (Efecto Ticket / Boarding Pass) */}
        <div className={`relative h-4 flex items-center justify-between overflow-hidden transition-colors ${
          isDarkMode ? 'bg-slate-800' : 'bg-white'
        }`}>
          <div className={`w-3.5 h-3.5 -ml-2 rounded-full border shadow-inner ${
            isDarkMode ? 'bg-slate-900 border-slate-700' : 'bg-[#F8FAFC] border-slate-200'
          }`} />
          <div className="flex-1 border-t-2 border-dashed border-slate-200 dark:border-slate-700 mx-2" />
          <div className={`w-3.5 h-3.5 -mr-2 rounded-full border shadow-inner ${
            isDarkMode ? 'bg-slate-900 border-slate-700' : 'bg-[#F8FAFC] border-slate-200'
          }`} />
        </div>

        {/* Cuerpo Central del Ticket: Código QR Interactivo con trigger a Modal */}
        <div className="px-4 py-2.5 flex flex-col items-center">
          <div
            onClick={() => setIsQrModalOpen(true)}
            role="button"
            tabIndex={0}
            title="Toca para ampliar el código QR"
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                setIsQrModalOpen(true);
              }
            }}
            className="p-2.5 bg-white rounded-xl shadow-sm border border-slate-200 hover:border-primary/50 hover:shadow-md flex flex-col items-center justify-center cursor-pointer group transition-all relative active:scale-98"
          >
            <QRCodeSVG
              value={qrPayload}
              size={135}
              level="M"
              includeMargin={false}
              fgColor={THEME_COLORS.primary}
              bgColor="#FFFFFF"
            />
            {/* Overlay sutil de ampliar */}
            <div className="mt-1.5 flex items-center gap-1 text-[10px] font-bold text-primary group-hover:text-primary-hover">
              <Maximize2 className="w-3 h-3 text-[#7C9FE7] group-hover:scale-110 transition-transform" />
              <span>Toca para ampliar QR</span>
            </div>
          </div>

          <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium text-center mt-1.5 max-w-[210px] leading-tight">
            Escanea con la cámara de tu celular para verificar autenticidad
          </p>

          {/* Grid de 2 columnas con metadatos limpios */}
          <div className={`w-full grid grid-cols-2 gap-2 mt-2.5 pt-2.5 border-t text-left ${
            isDarkMode ? 'border-slate-700' : 'border-slate-100'
          }`}>
            {/* Columna 1 */}
            <div className="space-y-1.5">
              <div>
                <span className="text-[9px] uppercase font-bold text-slate-400 block tracking-wider">
                  Horario
                </span>
                <p className="text-[11px] font-bold flex items-center gap-1" title={booking.scheduleText}>
                  <Clock className="w-3 h-3 text-secondary shrink-0" />
                  <span className="truncate">{booking.date ? `${booking.date} · ` : ''}{booking.startTime} - {booking.endTime}</span>
                </p>
              </div>

              <div>
                <span className="text-[9px] uppercase font-bold text-slate-400 block tracking-wider">
                  Vehículo
                </span>
                <p className="text-[11px] font-semibold flex items-center gap-1">
                  <Car className="w-3 h-3 text-secondary shrink-0" />
                  <span>Sedán / P-1248</span>
                </p>
              </div>
            </div>

            {/* Columna 2 */}
            <div className="space-y-1.5">
              <div>
                <span className="text-[9px] uppercase font-bold text-slate-400 block tracking-wider">
                  Total
                </span>
                <p className="text-[11px] font-extrabold text-emerald-600 dark:text-emerald-400">
                  ${booking.totalAmount.toFixed(2)} Pagado
                </p>
              </div>

              <div>
                <span className="text-[9px] uppercase font-bold text-slate-400 block tracking-wider">
                  Método
                </span>
                <p className="text-[11px] font-semibold truncate">
                  {paymentInfo.short}
                </p>
              </div>
            </div>
          </div>

          {/* Pie del ticket: Sello de seguridad */}
          <div className={`w-full mt-2 pt-2 border-t flex items-center justify-center gap-1 text-[10px] ${
            isDarkMode ? 'border-slate-700 text-slate-400' : 'border-slate-100 text-slate-500'
          }`}>
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span className="font-medium text-center truncate">
              Seguro de Estadía Protegida ParqueaFácilSV activo
            </span>
          </div>
        </div>
      </div>

      {/* 3. Acciones Interactivas en Botones con Padding Moderado (py-2.5) */}
      <div className="mt-3 space-y-2 shrink-0 pb-1">
        {/* Botón Cómo Llegar */}
        <button
          onClick={handleOpenMaps}
          type="button"
          className="w-full py-2.5 px-3.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-750 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-xs group cursor-pointer"
        >
          <Navigation2 className="w-3.5 h-3.5 text-blue-600 group-hover:rotate-12 transition-transform" />
          <span>Cómo llegar (Google Maps / Waze)</span>
          <ExternalLink className="w-3 h-3 text-slate-400 ml-auto" />
        </button>

        {/* Botón WhatsApp */}
        <button
          onClick={handleWhatsApp}
          type="button"
          className="w-full py-2.5 px-3.5 rounded-xl bg-[#25D366] text-white text-xs font-bold hover:bg-[#20ba5a] active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer"
        >
          <MessageCircle className="w-3.5 h-3.5 fill-white text-[#25D366]" />
          <span>Contactar a {parking.host.name} por WhatsApp</span>
          <ExternalLink className="w-3 h-3 text-white/80 ml-auto" />
        </button>

        {/* Botón Descargar Comprobante Oficial */}
        <button
          onClick={handleDownloadTicket}
          type="button"
          className="w-full py-2.5 px-3.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-750 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-xs group cursor-pointer"
        >
          <Download className="w-3.5 h-3.5 text-primary dark:text-[#7C9FE7] group-hover:translate-y-0.5 transition-transform" />
          <span>Descargar comprobante oficial (PDF)</span>
          <span className="text-[9px] bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-400 font-bold px-1.5 py-0.2 rounded ml-auto">
            Descargar
          </span>
        </button>

        {/* Botón Volver al Inicio / Nueva Búsqueda */}
        <Button
          variant="outline"
          size="sm"
          fullWidth
          onClick={onNewSearch}
          leftIcon={<RotateCcw className="w-3.5 h-3.5" />}
          className="font-bold border-slate-300 dark:border-slate-700 text-xs py-2.5 rounded-xl"
        >
          Volver al inicio / Nueva búsqueda
        </Button>
      </div>
    </div>
  );
};
