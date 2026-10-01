'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ParkingSpace } from '../../types';
import { MOCK_PARKINGS } from '../../data/mock-parkings';
import { RatingStars } from '../ui/rating-stars';
import { Badge } from '../ui/badge';
import {
  ArrowLeft,
  Share2,
  Heart,
  MapPin,
  Car,
  Truck,
  Bike,
  Clock,
  ChevronRight,
  ShieldCheck,
  Camera,
  CheckCircle2,
  Home,
  Video,
  Key,
  Zap,
  Sparkles,
} from 'lucide-react';

export interface ScreenDetailProps {
  parking?: ParkingSpace;
  selectedParking?: ParkingSpace;
  onBack: () => void;
  onProceedToSchedule: () => void;
  isDarkMode?: boolean;
}

export const ScreenDetail: React.FC<ScreenDetailProps> = ({
  parking,
  selectedParking,
  onBack,
  onProceedToSchedule,
  isDarkMode = false,
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Fallback seguro para garantizar que siempre exista un objeto de parqueo válido
  const currentParking = selectedParking || parking || MOCK_PARKINGS[0];

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2400);
  };

  const heroImage =
    currentParking.images && currentParking.images.length > 0
      ? currentParking.images[0]
      : 'https://images.unsplash.com/photo-1590674899484-d5640e854abe?w=700&auto=format&fit=crop&q=80';

  return (
    <div
      className={`flex flex-col min-h-full relative transition-colors duration-200 ${isDarkMode ? 'bg-slate-900 text-white' : 'bg-background text-slate-900'
        }`}
    >
      {/* Toast Notificación */}
      {toastMessage && (
        <div className="fixed top-14 inset-x-8 z-50 bg-slate-950 text-white text-xs px-3.5 py-2.5 rounded-2xl shadow-xl flex items-center gap-2 border border-slate-700 animate-in fade-in slide-in-from-top-2 duration-200">
          <Sparkles className="w-4 h-4 text-accent shrink-0" />
          <span className="flex-1 font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Header flotante con botón Volver y acciones */}
      <header
        className={`sticky top-0 z-30 px-4 py-2.5 backdrop-blur-md border-b flex items-center justify-between transition-colors ${isDarkMode
            ? 'bg-slate-900/90 border-slate-800'
            : 'bg-white/90 border-slate-100'
          }`}
      >
        <button
          onClick={onBack}
          type="button"
          className="flex items-center gap-1.5 text-xs font-bold text-primary dark:text-[#7C9FE7] px-2.5 py-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 active:scale-95 transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver al mapa</span>
        </button>

        <div className="flex items-center gap-1">
          <button
            type="button"
            title="Compartir cochera"
            onClick={() => showToast('Enlace de la cochera copiado al portapapeles')}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors active:scale-95 cursor-pointer ${isDarkMode
                ? 'text-slate-300 hover:text-white hover:bg-slate-800'
                : 'text-slate-600 hover:text-primary hover:bg-slate-100'
              }`}
          >
            <Share2 className="w-4 h-4" />
          </button>
          <button
            type="button"
            title="Favorito"
            onClick={() => {
              setIsLiked(!isLiked);
              showToast(!isLiked ? 'Guardado en Cocheras Favoritas' : 'Eliminado de Favoritos');
            }}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors active:scale-95 cursor-pointer ${isLiked ? 'text-rose-500' : 'text-slate-400 hover:text-rose-500 hover:bg-rose-50'
              }`}
          >
            <Heart className={`w-4 h-4 ${isLiked ? 'fill-rose-500' : ''}`} />
          </button>
        </div>
      </header>

      {/* Contenedor Desplazable con pb-28 para evitar que la barra fija tape el contenido */}
      <div className="flex-1 overflow-y-auto px-4 pt-3 pb-28 space-y-4 no-scrollbar">
        {/* 1. FOTOGRAFÍA HERO DE CABECERA */}
        <div className="relative w-full h-44 rounded-2xl overflow-hidden shadow-sm bg-slate-100 dark:bg-slate-800 shrink-0 mb-3">
          <Image
            src={heroImage}
            alt={currentParking.title}
            fill
            priority
            sizes="(max-width: 480px) 100vw, 412px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10 pointer-events-none" />

          {/* Badge de estado en foto */}
          <div className="absolute top-2.5 left-2.5">
            <span className="text-[10px] font-black bg-[#ECD700] text-[#001F5D] px-2 py-0.5 rounded-lg shadow-sm">
              {currentParking.highlightBadge || 'Techado y Seguro'}
            </span>
          </div>

          {/* Badge flotante en esquina inferior izquierda: "Ver 4 fotos" con icono de cámara */}
          <button
            type="button"
            onClick={() => showToast('Galería completa: 4 fotografías verificadas')}
            className="absolute bottom-2.5 left-2.5 bg-black/65 hover:bg-black/85 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-1 rounded-lg flex items-center gap-1.5 shadow-sm active:scale-95 transition-all cursor-pointer"
          >
            <Camera className="w-3.5 h-3.5 text-[#ECD700]" />
            <span>Ver 4 fotos</span>
          </button>
        </div>

        {/* Título, Zona y Rating */}
        <div>
          <div className="flex items-center justify-between text-xs font-semibold mb-1">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#7C9FE7]">
              {currentParking.zone}
            </span>
            <span className="text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full font-bold text-[10px] border border-emerald-200 dark:border-emerald-800/40">
              Disponible ahora
            </span>
          </div>
          <h1 className="text-lg font-black tracking-tight leading-snug text-[#001F5D] dark:text-white">
            {currentParking.title}
          </h1>
          <div className="flex items-start gap-1.5 mt-1 text-xs text-[#59667B] dark:text-slate-400">
            <MapPin className="w-3.5 h-3.5 text-primary dark:text-[#7C9FE7] shrink-0 mt-0.5" />
            <span className="leading-tight">{currentParking.addressReference}</span>
          </div>
          <div className="flex items-center gap-3 mt-2.5 pt-2.5 border-t border-slate-100 dark:border-slate-800">
            <RatingStars
              rating={currentParking.rating}
              reviewCount={currentParking.reviewCount}
              size="md"
            />
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              A {currentParking.distanceMeters} m de tu destino
            </span>
          </div>
        </div>

        {/* 2. JERARQUÍA DEL ANFITRIÓN (CARLOS MÉNDEZ / AIRBNB & UBER STYLE) */}
        <div
          className={`p-3.5 rounded-2xl border shadow-xs flex items-center justify-between transition-colors ${isDarkMode
              ? 'bg-slate-800/90 border-slate-700'
              : 'bg-white border-slate-200/90'
            }`}
        >
          <div className="flex items-center gap-3 min-w-0">
            {/* Avatar visible (w-12 h-12 rounded-full border border-slate-200) */}
            <div className="relative w-12 h-12 rounded-full border border-slate-200 dark:border-slate-700 overflow-hidden shrink-0 shadow-xs">
              <Image
                src={currentParking.host.avatar}
                alt={currentParking.host.name}
                fill
                sizes="48px"
                className="object-cover"
              />
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <h3 className="text-xs font-black truncate leading-tight text-slate-900 dark:text-white">
                  {currentParking.host.name}
                </h3>
                {/* Badge verificado azul */}
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 fill-blue-500 text-white shrink-0" />
              </div>
              <p className="text-[11px] text-[#59667B] dark:text-slate-400 truncate mt-0.5 font-medium">
                Super Anfitrión · Responde en {currentParking.host.responseTime || '< 5 min'}
              </p>
            </div>
          </div>

          {/* Calificación a la derecha con estrellas limpias: "★ 4.9 (42 reseñas)" */}
          <div className="text-right shrink-0 pl-2">
            <p className="text-xs font-black text-[#001F5D] dark:text-[#ECD700] flex items-center justify-end gap-1">
              <span className="text-[#ECD700]">★</span>
              <span>4.9</span>
            </p>
            <span className="text-[10px] text-[#59667B] dark:text-slate-400 block font-medium">
              ({currentParking.reviewCount || 42} reseñas)
            </span>
          </div>
        </div>

        {/* 3. CHIPS COMPACTOS PARA VEHÍCULOS PERMITIDOS (ESTILO LIMPIO AIRBNB/UBER) */}
        <div
          className={`p-3.5 rounded-2xl border transition-colors ${isDarkMode ? 'bg-slate-800/90 border-slate-700' : 'bg-white border-slate-200'
            }`}
        >
          <h3 className="text-xs font-bold mb-2 flex items-center gap-1.5 text-primary dark:text-white">
            <Car className="w-3.5 h-3.5 text-secondary shrink-0" />
            <span>Vehículos Permitidos</span>
          </h3>
          <div className="flex flex-wrap gap-2">
            {currentParking.vehicleTypes.map((v) => {
              const IconComponent =
                v === 'Moto' ? Bike : v === 'Camioneta' || v === 'Pick-up' ? Truck : Car;
              return (
                <div
                  key={v}
                  className="px-3 py-1.5 rounded-xl flex items-center gap-1.5 bg-[#7C9FE7]/10 dark:bg-[#7C9FE7]/15 border border-[#7C9FE7]/30 text-[#001F5D] dark:text-[#7C9FE7] text-xs font-semibold select-none shadow-2xs"
                >
                  <IconComponent className="w-3.5 h-3.5 text-[#001F5D] dark:text-[#7C9FE7] shrink-0" />
                  <span>{v}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* 3. CHIPS COMPACTOS PARA CARACTERÍSTICAS DESTACADAS (ESTILO LIMPIO AIRBNB/UBER) */}
        <div
          className={`p-3.5 rounded-2xl border transition-colors ${isDarkMode ? 'bg-slate-800/90 border-slate-700' : 'bg-white border-slate-200'
            }`}
        >
          <h3 className="text-xs font-bold mb-2.5 flex items-center gap-1.5 text-primary dark:text-white">
            <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span>Características del Espacio</span>
          </h3>
          <div className="flex flex-wrap gap-2">
            {currentParking.amenities.isCovered && (
              <div className="px-3 py-1.5 rounded-xl flex items-center gap-1.5 bg-[#7C9FE7]/10 dark:bg-[#7C9FE7]/15 border border-[#7C9FE7]/30 text-[#001F5D] dark:text-[#7C9FE7] text-xs font-semibold hover:scale-102 active:scale-95 transition-all cursor-default select-none shadow-2xs">
                <Home className="w-3.5 h-3.5 text-[#001F5D] dark:text-[#7C9FE7] shrink-0" />
                <span>Techado y Fresco</span>
              </div>
            )}
            {currentParking.amenities.gatedEntry && (
              <div className="px-3 py-1.5 rounded-xl flex items-center gap-1.5 bg-[#7C9FE7]/10 dark:bg-[#7C9FE7]/15 border border-[#7C9FE7]/30 text-[#001F5D] dark:text-[#7C9FE7] text-xs font-semibold hover:scale-102 active:scale-95 transition-all cursor-default select-none shadow-2xs">
                <Key className="w-3.5 h-3.5 text-[#001F5D] dark:text-[#7C9FE7] shrink-0" />
                <span>Portón Privado</span>
              </div>
            )}
            {currentParking.amenities.hasCamera && (
              <div className="px-3 py-1.5 rounded-xl flex items-center gap-1.5 bg-[#7C9FE7]/10 dark:bg-[#7C9FE7]/15 border border-[#7C9FE7]/30 text-[#001F5D] dark:text-[#7C9FE7] text-xs font-semibold hover:scale-102 active:scale-95 transition-all cursor-default select-none shadow-2xs">
                <Video className="w-3.5 h-3.5 text-[#001F5D] dark:text-[#7C9FE7] shrink-0" />
                <span>Cámara de Seguridad</span>
              </div>
            )}
            {currentParking.amenities.security24_7 && (
              <div className="px-3 py-1.5 rounded-xl flex items-center gap-1.5 bg-[#7C9FE7]/10 dark:bg-[#7C9FE7]/15 border border-[#7C9FE7]/30 text-[#001F5D] dark:text-[#7C9FE7] text-xs font-semibold hover:scale-102 active:scale-95 transition-all cursor-default select-none shadow-2xs">
                <ShieldCheck className="w-3.5 h-3.5 text-[#001F5D] dark:text-[#7C9FE7] shrink-0" />
                <span>Vigilancia 24/7</span>
              </div>
            )}
            {currentParking.amenities.easyManeuver && (
              <div className="px-3 py-1.5 rounded-xl flex items-center gap-1.5 bg-[#7C9FE7]/10 dark:bg-[#7C9FE7]/15 border border-[#7C9FE7]/30 text-[#001F5D] dark:text-[#7C9FE7] text-xs font-semibold hover:scale-102 active:scale-95 transition-all cursor-default select-none shadow-2xs">
                <Car className="w-3.5 h-3.5 text-[#001F5D] dark:text-[#7C9FE7] shrink-0" />
                <span>Fácil Maniobra</span>
              </div>
            )}
            {currentParking.amenities.evCharging && (
              <div className="px-3 py-1.5 rounded-xl flex items-center gap-1.5 bg-[#7C9FE7]/10 dark:bg-[#7C9FE7]/15 border border-[#7C9FE7]/30 text-[#001F5D] dark:text-[#7C9FE7] text-xs font-semibold hover:scale-102 active:scale-95 transition-all cursor-default select-none shadow-2xs">
                <Zap className="w-3.5 h-3.5 text-[#ECD700] shrink-0" />
                <span>Carga Eléctrica</span>
              </div>
            )}
          </div>
        </div>

        {/* 4. RESEÑAS DE LA COMUNIDAD */}
        <div
          className={`p-4 rounded-2xl border transition-colors ${isDarkMode ? 'bg-slate-800/90 border-slate-700' : 'bg-white border-slate-200'
            }`}
        >
          {/* 1. CABECERA DINÁMICA */}
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-xs font-bold text-[#001F5D] dark:text-white tracking-wide uppercase">
                Reseñas de la comunidad
              </h3>
              <p className="text-[11px] text-[#59667B] dark:text-slate-400">
                Conductores que estacionaron en {currentParking?.zone || 'la zona'}
              </p>
            </div>
            <div className="text-right">
              <span className="text-base font-bold text-[#001F5D] dark:text-[#ECD700]">
                {currentParking?.rating?.toFixed(1) || '4.9'}
              </span>
              <span className="text-xs text-slate-400"> / 5.0</span>
            </div>
          </div>

          {/* 2. LISTA DINÁMICA DE TESTIMONIOS CON PLANTILLAS */}
          <div>
            {(currentParking?.reviews && currentParking.reviews.length > 0
              ? currentParking.reviews
              : [
                {
                  id: 'fb-1',
                  authorName: 'Mario Henríquez',
                  carModel: 'Toyota Corolla',
                  date: 'Hace 2 días',
                  rating: 5,
                  comment: `Excelente espacio en ${currentParking?.zone || 'la zona'}. La atención de ${currentParking?.host?.name || 'el anfitrión'} fue inmediata y muy cordial. Súper seguro y accesible.`,
                },
                {
                  id: 'fb-2',
                  authorName: 'Andrea Solís',
                  carModel: 'Toyota RAV4',
                  date: 'Hace 1 semana',
                  rating: 5,
                  comment: `Espacio amplio y seguro en ${currentParking?.addressReference || currentParking?.zone}. Me ahorré tiempo y dinero frente a los parqueos comerciales tradicionales.`,
                },
              ]
            ).map((rev) => (
              <div key={rev.id} className="border-b border-slate-100 dark:border-slate-700/60 last:border-b-0 py-3">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-[#001F5D]/10 dark:bg-slate-700 text-[#001F5D] dark:text-[#7C9FE7] font-bold text-xs flex items-center justify-center">
                      {rev.authorName
                        .split(' ')
                        .map((n) => n[0])
                        .join('')
                        .slice(0, 2)}
                    </div>
                    <div>
                      <span className="text-xs font-bold text-[#001F5D] dark:text-white mr-2">
                        {rev.authorName}
                      </span>
                      {rev.carModel && (
                        <span className="text-[10px] bg-slate-100 dark:bg-slate-700 text-[#59667B] dark:text-slate-300 px-1.5 py-0.5 rounded-md font-medium">
                          {rev.carModel}
                        </span>
                      )}
                    </div>
                  </div>
                  <span className="text-[10px] text-slate-400">{rev.date}</span>
                </div>

                <div className="flex items-center gap-1 mb-1 text-[#ECD700] text-xs">
                  {'★'.repeat(rev.rating)}
                  <span className="text-xs font-bold text-[#001F5D] dark:text-[#ECD700] ml-1">
                    {rev.rating}.0
                  </span>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed italic">
                  "{rev.comment}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 5. BARRA FIJA INFERIOR ESTANDARIZADA */}
      <div
        className={`sticky bottom-0 z-30 px-4 py-3 backdrop-blur-md border-t flex items-center justify-between gap-3 shadow-floating transition-colors ${isDarkMode
            ? 'bg-slate-900/95 border-slate-800'
            : 'bg-white/95 border-slate-200'
          }`}
      >
        <div>
          <span className="text-[10px] uppercase font-bold text-[#59667B] dark:text-slate-400 block mb-0.5">
            Tarifa oficial
          </span>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-black text-[#001F5D] dark:text-white">
              {currentParking?.hourlyRate ? `$${currentParking.hourlyRate.toFixed(2)}` : '$1.50'}
            </span>
            <span className="text-xs text-[#59667B] dark:text-slate-400 font-semibold">/ hora</span>
          </div>
        </div>

        <button
          type="button"
          onClick={onProceedToSchedule}
          className="h-12 px-6 rounded-2xl bg-[#ECD700] hover:bg-[#dfcb00] active:scale-[0.98] text-[#001F5D] text-sm font-bold tracking-tight shadow-sm transition-all duration-150 flex items-center justify-center cursor-pointer border border-[#ECD700]/60 shrink-0"
        >
          <span>Reservar este espacio</span>
          <ChevronRight className="w-4 h-4 stroke-[2.5] ml-1.5 text-[#001F5D]" />
        </button>
      </div>
    </div>
  );
};

