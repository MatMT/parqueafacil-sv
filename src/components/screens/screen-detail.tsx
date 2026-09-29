'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ParkingSpace } from '../../types';
import { RatingStars } from '../ui/rating-stars';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { AmenityPill } from '../ui/amenity-pill';
import {
  ArrowLeft,
  Share2,
  Heart,
  MapPin,
  Car,
  Clock,
  Award,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';

export interface ScreenDetailProps {
  parking: ParkingSpace;
  onBack: () => void;
  onProceedToSchedule: () => void;
}

export const ScreenDetail: React.FC<ScreenDetailProps> = ({
  parking,
  onBack,
  onProceedToSchedule,
}) => {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className="flex flex-col min-h-full pb-20 relative bg-background">
      {/* Header flotante con botón Volver y acciones */}
      <div className="sticky top-0 z-30 px-4 py-2 bg-surface/90 backdrop-blur-md border-b border-slate-100 flex items-center justify-between">
        <button
          onClick={onBack}
          type="button"
          className="flex items-center gap-1.5 text-xs font-bold text-primary px-2.5 py-1.5 rounded-xl hover:bg-slate-100 active:scale-95 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver al mapa</span>
        </button>

        <div className="flex items-center gap-1">
          <button
            type="button"
            title="Compartir cochera"
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-600 hover:text-primary active:scale-95"
          >
            <Share2 className="w-4 h-4" />
          </button>
          <button
            type="button"
            title="Favorito"
            onClick={() => setIsLiked(!isLiked)}
            className="w-8 h-8 rounded-full flex items-center justify-center text-rose-500 hover:text-rose-600 active:scale-95"
          >
            <Heart className={`w-4 h-4 ${isLiked ? 'fill-rose-500' : ''}`} />
          </button>
        </div>
      </div>

      {/* Galería de Fotos del Garaje Residencial */}
      <div className="relative w-full h-56 bg-slate-900 overflow-hidden">
        <Image
          src={parking.images[selectedPhotoIndex] || parking.images[0]}
          alt={parking.title}
          fill
          priority
          sizes="(max-width: 480px) 100vw, 390px"
          className="object-cover transition-opacity duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

        {/* Badge de estado en foto */}
        <div className="absolute top-3 left-3">
          <Badge variant="accent" size="sm">
            {parking.highlightBadge || 'Verificado SV'}
          </Badge>
        </div>

        {/* Indicadores de miniatura / carrusel */}
        <div className="absolute bottom-3 inset-x-0 flex justify-center items-center gap-1.5 z-10">
          {parking.images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedPhotoIndex(idx)}
              className={`h-2 rounded-full transition-all duration-200 ${
                selectedPhotoIndex === idx
                  ? 'w-6 bg-accent'
                  : 'w-2 bg-white/70 hover:bg-white'
              }`}
            />
          ))}
        </div>
      </div>

      <div className="px-4 pt-4 space-y-4">
        {/* Título, Ubicación y Rating */}
        <div>
          <div className="flex items-center justify-between text-xs font-semibold text-secondary-dark mb-1">
            <span>{parking.zone}</span>
            <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-bold">
              Disponible ahora
            </span>
          </div>
          <h1 className="text-lg font-black text-slate-900 leading-snug">
            {parking.title}
          </h1>
          <div className="flex items-start gap-1.5 mt-1.5 text-xs text-textSecondary">
            <MapPin className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
            <span>{parking.addressReference}</span>
          </div>
          <div className="flex items-center gap-3 mt-2.5 pt-2.5 border-t border-slate-100">
            <RatingStars
              rating={parking.rating}
              reviewCount={parking.reviewCount}
              size="md"
            />
            <span className="text-slate-300">•</span>
            <span className="text-xs font-semibold text-slate-700">
              A {parking.distanceMeters} m de tu destino
            </span>
          </div>
        </div>

        {/* Tarjeta de Información del Anfitrión */}
        <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 ring-2 ring-primary/20">
              <Image
                src={parking.host.avatar}
                alt={parking.host.name}
                fill
                sizes="48px"
                className="object-cover"
              />
              {parking.host.isSuperHost && (
                <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-accent rounded-full border border-white flex items-center justify-center">
                  <Award className="w-2.5 h-2.5 text-primary" />
                </span>
              )}
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h4 className="text-xs font-bold text-slate-900">
                  {parking.host.name}
                </h4>
                {parking.host.isSuperHost && (
                  <Badge variant="secondary" size="sm">
                    Super Anfitrión
                  </Badge>
                )}
              </div>
              <p className="text-[11px] text-textSecondary flex items-center gap-1 mt-0.5">
                <Clock className="w-3 h-3 text-emerald-600" />
                Responde {parking.host.responseTime}
              </p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-[10px] font-bold text-slate-500 uppercase">
              Confianza
            </span>
            <p className="text-xs font-black text-primary">★ 99% verif.</p>
          </div>
        </div>

        {/* Tipos de vehículos admitidos */}
        <div className="bg-white p-3.5 rounded-2xl border border-slate-200">
          <h4 className="text-xs font-bold text-slate-900 mb-2 flex items-center gap-1.5">
            <Car className="w-4 h-4 text-primary" />
            Vehículos Permitidos
          </h4>
          <div className="flex flex-wrap gap-2">
            {parking.vehicleTypes.map((v) => (
              <span
                key={v}
                className="px-2.5 py-1 rounded-xl bg-slate-100 text-xs font-semibold text-slate-800"
              >
                ✓ {v}
              </span>
            ))}
          </div>
        </div>

        {/* Características y Amenidades de Seguridad */}
        <div className="bg-white p-3.5 rounded-2xl border border-slate-200">
          <h4 className="text-xs font-bold text-slate-900 mb-2.5 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            Características del Espacio
          </h4>
          <div className="grid grid-cols-2 gap-2">
            {parking.amenities.isCovered && (
              <AmenityPill iconType="covered" label="Techado y Fresco" />
            )}
            {parking.amenities.gatedEntry && (
              <AmenityPill iconType="gate" label="Portón Privado" />
            )}
            {parking.amenities.security24_7 && (
              <AmenityPill iconType="shield" label="Vigilancia 24/7" />
            )}
            {parking.amenities.easyManeuver && (
              <AmenityPill iconType="maneuver" label="Fácil Maniobra" />
            )}
            {parking.amenities.hasCamera && (
              <AmenityPill iconType="camera" label="Cámara de Seguridad" />
            )}
            {parking.amenities.evCharging && (
              <AmenityPill iconType="ev" label="Carga Vehículo Eléctrico" />
            )}
          </div>
        </div>

        {/* Sección de Reseñas de la Comunidad Salvadoreña */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">
                Reseñas de la Comunidad
              </h3>
              <p className="text-[11px] text-textSecondary">
                Conductores reales que usaron esta cochera
              </p>
            </div>
            <div className="text-right">
              <span className="text-base font-black text-primary">
                {parking.rating.toFixed(1)}
              </span>
              <span className="text-xs text-textSecondary"> / 5.0</span>
            </div>
          </div>

          <div className="space-y-3 divide-y divide-slate-100">
            {parking.reviews.map((rev) => (
              <div key={rev.id} className="pt-2.5 first:pt-0">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-slate-900">
                      {rev.authorName}
                    </span>
                    {rev.carModel && (
                      <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-medium">
                        {rev.carModel}
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] text-slate-400 font-medium">
                    {rev.date}
                  </span>
                </div>
                <div className="flex items-center gap-1 mb-1">
                  <RatingStars rating={rev.rating} size="sm" showCount={false} />
                </div>
                <p className="text-xs text-slate-700 leading-relaxed font-normal">
                  “{rev.comment}”
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Barra Inferior Fija con Precio y CTA Amarillo Vibrante */}
      <div className="sticky bottom-0 z-30 px-4 py-3 bg-white/95 backdrop-blur-md border-t border-slate-200 flex items-center justify-between gap-3 shadow-floating">
        <div>
          <div className="text-[10px] font-bold text-textSecondary uppercase tracking-wider">
            Tarifa oficial
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-lg font-black text-primary">
              ${parking.hourlyRate.toFixed(2)}
            </span>
            <span className="text-xs text-textSecondary font-medium">/ hora</span>
          </div>
        </div>

        <Button
          variant="accent"
          size="md"
          onClick={onProceedToSchedule}
          rightIcon={<ChevronRight className="w-4 h-4 text-primary" />}
        >
          Reservar este espacio
        </Button>
      </div>
    </div>
  );
};
