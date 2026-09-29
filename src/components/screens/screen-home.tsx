'use client';

import React from 'react';
import Image from 'next/image';
import { ParkingSpace, ZoneType } from '../../types';
import { ZONES_LIST } from '../../data/mock-parkings';
import { ChipFilter } from '../ui/chip-filter';
import { RatingStars } from '../ui/rating-stars';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import {
  MapPin,
  Navigation,
  ShieldCheck,
  Bell,
  Search,
  ChevronRight,
  Layers,
} from 'lucide-react';

export interface ScreenHomeProps {
  selectedZone: ZoneType;
  onSelectZone: (zone: ZoneType) => void;
  selectedParking: ParkingSpace;
  onSelectParking: (parking: ParkingSpace) => void;
  filteredParkings: ParkingSpace[];
  onGoToDetail: () => void;
}

export const ScreenHome: React.FC<ScreenHomeProps> = ({
  selectedZone,
  onSelectZone,
  selectedParking,
  onSelectParking,
  filteredParkings,
  onGoToDetail,
}) => {
  return (
    <div className="flex flex-col min-h-full pb-6">
      {/* 1. Header institucional */}
      <div className="px-4 pt-3 pb-2 bg-surface border-b border-slate-100 sticky top-0 z-30 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5">
            <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center shadow-xs">
              <span className="text-accent font-extrabold text-lg">P</span>
            </div>
            <div className="flex items-baseline">
              <span className="text-lg font-extrabold tracking-tight text-primary">
                ParqueaFácil
              </span>
              <span className="ml-1 text-[11px] font-black bg-accent text-primary px-1.5 py-0.5 rounded-md shadow-xs">
                SV
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              title="Notificaciones"
              className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:text-primary relative active:scale-95 transition-transform"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-accent ring-1 ring-white" />
            </button>
            <div className="w-8 h-8 rounded-full overflow-hidden ring-2 ring-secondary/50">
              <Image
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&h=120&q=80"
                alt="Avatar Usuario"
                width={32}
                height={32}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Buscador visual de cocheras */}
        <div className="relative mb-2">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            readOnly
            value="Buscar cochera en San Salvador, Tecla..."
            className="w-full pl-9 pr-4 py-2 bg-slate-100/80 rounded-xl text-xs text-slate-700 font-medium border border-transparent focus:outline-none cursor-pointer"
          />
          <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] bg-white px-2 py-0.5 rounded-md text-slate-500 font-semibold shadow-2xs border border-slate-200">
            Cerca de mí
          </span>
        </div>

        {/* Chips de Zonas de El Salvador */}
        <ChipFilter
          zones={ZONES_LIST}
          selectedZone={selectedZone}
          onSelectZone={onSelectZone}
          className="-mx-4"
        />
      </div>

      {/* 2. Mapa Simulado Interactivo con Vector Styling */}
      <div className="px-4 pt-3">
        <div className="flex items-center justify-between mb-1.5">
          <div className="flex items-center gap-1.5 text-xs font-bold text-primary">
            <Navigation className="w-3.5 h-3.5 text-secondary" />
            <span>Mapa en Vivo (El Salvador)</span>
          </div>
          <span className="text-[11px] text-textSecondary flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            {filteredParkings.length} cocheras activas
          </span>
        </div>

        {/* Contenedor del mapa */}
        <div className="relative w-full h-52 bg-[#E5ECF6] rounded-2xl overflow-hidden border border-slate-200/80 shadow-inner group">
          {/* Grilla y Calles vectoriales simuladas de San Salvador / La Libertad */}
          <svg
            className="absolute inset-0 w-full h-full opacity-60"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Vías principales */}
            <path
              d="M-20,120 Q120,90 220,140 T420,80"
              fill="none"
              stroke="#CBD5E1"
              strokeWidth="14"
            />
            <path
              d="M-20,120 Q120,90 220,140 T420,80"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="10"
            />
            {/* Autopista Sur / Panamericana */}
            <path
              d="M100,-10 L160,220"
              fill="none"
              stroke="#CBD5E1"
              strokeWidth="12"
            />
            <path
              d="M100,-10 L160,220"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="8"
            />
            {/* Calles secundarias */}
            <path
              d="M10,40 L380,40"
              fill="none"
              stroke="#E2E8F0"
              strokeWidth="5"
            />
            <path
              d="M20,180 L380,170"
              fill="none"
              stroke="#E2E8F0"
              strokeWidth="5"
            />
            <path
              d="M280,0 L270,220"
              fill="none"
              stroke="#E2E8F0"
              strokeWidth="5"
            />
          </svg>

          {/* Áreas de referencia / Parques / Centros Comerciales */}
          <div className="absolute top-4 left-6 bg-emerald-100/90 text-emerald-800 text-[9px] font-bold px-1.5 py-0.5 rounded border border-emerald-200/60 pointer-events-none shadow-2xs">
            Plaza Merliot
          </div>
          <div className="absolute top-6 right-10 bg-indigo-100/90 text-indigo-900 text-[9px] font-bold px-1.5 py-0.5 rounded border border-indigo-200/60 pointer-events-none shadow-2xs">
            Redondel Masferrer
          </div>
          <div className="absolute bottom-10 left-12 bg-amber-100/90 text-amber-900 text-[9px] font-bold px-1.5 py-0.5 rounded border border-amber-200/60 pointer-events-none shadow-2xs">
            Museo MARTE
          </div>
          <div className="absolute bottom-4 right-8 bg-blue-100/90 text-blue-900 text-[9px] font-bold px-1.5 py-0.5 rounded border border-blue-200/60 pointer-events-none shadow-2xs">
            Campus UCA
          </div>

          {/* Pines de cocheras geolocalizadas */}
          {filteredParkings.map((parking) => {
            const isSelected = selectedParking.id === parking.id;
            return (
              <button
                key={parking.id}
                onClick={() => onSelectParking(parking)}
                type="button"
                style={{
                  left: `${parking.coordinates.mapX}%`,
                  top: `${parking.coordinates.mapY}%`,
                }}
                className={`absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-200 active:scale-95 group/pin z-20 ${
                  isSelected ? 'z-30 scale-110' : 'hover:scale-105'
                }`}
                title={`${parking.title} ($${parking.hourlyRate.toFixed(2)}/h)`}
              >
                <div
                  className={`flex items-center gap-1 px-2 py-1 rounded-full text-[11px] font-black shadow-md border ${
                    isSelected
                      ? 'bg-accent text-primary border-primary ring-2 ring-primary/40'
                      : 'bg-primary text-white border-white/60'
                  }`}
                >
                  <MapPin className="w-3 h-3 shrink-0" />
                  <span>${parking.hourlyRate.toFixed(2)}/h</span>
                </div>
                {/* Indicador de pulso para la seleccionada */}
                {isSelected && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-accent ring-2 ring-primary" />
                )}
              </button>
            );
          })}

          {/* Badge informativo en esquina */}
          <div className="absolute bottom-2 left-2 bg-white/85 backdrop-blur-sm px-2 py-0.5 rounded-md text-[10px] text-slate-600 font-medium border border-slate-200/60 flex items-center gap-1 shadow-2xs">
            <Layers className="w-3 h-3 text-secondary" />
            <span>Toca un pin para cambiar cochera</span>
          </div>
        </div>
      </div>

      {/* 3. Parqueo Seleccionado Rápido (Card de Enlace al Detalle) */}
      <div className="px-4 mt-3">
        <div
          onClick={onGoToDetail}
          className="bg-white rounded-2xl p-3 border border-secondary/30 shadow-card hover:border-secondary cursor-pointer transition-all duration-200 active:scale-[0.99] relative overflow-hidden"
        >
          <div className="flex gap-3">
            <div className="w-24 h-24 rounded-xl overflow-hidden shrink-0 relative bg-slate-100">
              <Image
                src={selectedParking.images[0]}
                alt={selectedParking.title}
                fill
                sizes="96px"
                className="object-cover"
              />
              <span className="absolute top-1 left-1 bg-primary/90 text-accent font-bold text-[9px] px-1.5 py-0.5 rounded-md backdrop-blur-2xs">
                ${selectedParking.hourlyRate.toFixed(2)}/h
              </span>
            </div>

            <div className="flex-1 min-w-0 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-1 mb-0.5">
                  <Badge variant="accent" size="sm">
                    {selectedParking.highlightBadge || 'Techado'}
                  </Badge>
                  <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                    A {selectedParking.distanceMeters} m
                  </span>
                </div>
                <h3 className="text-xs font-bold text-slate-900 truncate">
                  {selectedParking.title}
                </h3>
                <p className="text-[11px] text-textSecondary truncate">
                  {selectedParking.addressReference}
                </p>
              </div>

              <div className="flex items-center justify-between mt-1 pt-1.5 border-t border-slate-100">
                <RatingStars
                  rating={selectedParking.rating}
                  reviewCount={selectedParking.reviewCount}
                  size="sm"
                />
                <span className="text-xs font-bold text-primary flex items-center gap-0.5">
                  Ver ficha <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Sección "Parqueos Más Cercanos" (<500m) */}
      <div className="px-4 mt-5">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h2 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Parqueos Más Cercanos (&lt;500m)
            </h2>
            <p className="text-[11px] text-textSecondary">
              Cocheras privadas verificadas por la comunidad
            </p>
          </div>
          <span className="text-[11px] font-bold text-primary bg-secondary-light px-2 py-0.5 rounded-full">
            {filteredParkings.length} disp.
          </span>
        </div>

        {/* Lista deslizable / tarjetas de cocheras */}
        <div className="space-y-2.5">
          {filteredParkings.map((parking) => {
            const isCurrent = parking.id === selectedParking.id;
            return (
              <div
                key={parking.id}
                onClick={() => {
                  onSelectParking(parking);
                }}
                className={`p-3 rounded-2xl bg-white border transition-all duration-150 cursor-pointer ${
                  isCurrent
                    ? 'border-primary ring-1 ring-primary/20 shadow-card bg-blue-50/20'
                    : 'border-slate-200/80 hover:border-slate-300'
                }`}
              >
                <div className="flex gap-3">
                  <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 relative bg-slate-100">
                    <Image
                      src={parking.images[0]}
                      alt={parking.title}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-secondary-dark">
                          {parking.zone}
                        </span>
                        <span className="text-[11px] font-black text-primary">
                          ${parking.hourlyRate.toFixed(2)} / hora
                        </span>
                      </div>
                      <h4 className="text-xs font-bold text-slate-900 truncate">
                        {parking.title}
                      </h4>
                      <p className="text-[11px] text-textSecondary truncate">
                        {parking.addressReference}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-1">
                      <RatingStars
                        rating={parking.rating}
                        reviewCount={parking.reviewCount}
                        size="sm"
                      />
                      <span className="text-[11px] text-slate-600 font-medium">
                        A {parking.distanceMeters} m
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between">
                  <Badge variant="secondary" size="sm">
                    {parking.highlightBadge || 'Verificada'}
                  </Badge>
                  <Button
                    variant={isCurrent ? 'accent' : 'outline'}
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectParking(parking);
                      onGoToDetail();
                    }}
                  >
                    Ver detalle
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
