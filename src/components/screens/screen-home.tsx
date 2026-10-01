'use client';

import React, { useRef, useEffect, useLayoutEffect, useState } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { ParkingSpace, ZoneType } from '../../types';
import {
  Bell,
  Search,
  ChevronRight,
  ShieldCheck,
  Menu,
  LayoutGrid,
  List,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

const RealMap = dynamic(() => import('@/components/map/osm-map'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[320px] flex flex-col items-center justify-center bg-[#F1F5F9] text-slate-500 gap-2">
      <div className="w-7 h-7 border-2 border-[#001F5D] border-t-transparent rounded-full animate-spin" />
      <span className="text-[11px] font-semibold text-slate-600">
        Cargando mapa en vivo...
      </span>
    </div>
  ),
});

export interface ScreenHomeProps {
  selectedZone: ZoneType;
  onSelectZone: (zone: ZoneType) => void;
  selectedParking: ParkingSpace;
  onSelectParking: (parking: ParkingSpace) => void;
  filteredParkings: ParkingSpace[];
  onGoToDetail: () => void;
  onOpenSidebar?: () => void;
  isDarkMode?: boolean;
}

// Chips de zonas amigables con el usuario por orden de proximidad
const DISPLAY_ZONES: { value: ZoneType; label: string }[] = [
  { value: 'Todas', label: 'Cerca de mí' },
  { value: 'Zona Rosa', label: 'Zona Rosa' },
  { value: 'Colonia Escalón', label: 'Col. Escalón' },
  { value: 'Antiguo Cuscatlán', label: 'Antiguo Cuscatlán' },
  { value: 'Santa Tecla', label: 'Santa Tecla' },
  { value: 'San Salvador Centro', label: 'Centro Histórico' },
];

export const ScreenHome: React.FC<ScreenHomeProps> = ({
  selectedZone,
  onSelectZone,
  selectedParking,
  onSelectParking,
  filteredParkings,
  onGoToDetail,
  onOpenSidebar,
  isDarkMode = false,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [viewMode, setViewMode] = useState<'carousel' | 'list'>('carousel');

  const carouselRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const isProgrammaticScroll = useRef(false);
  const isManualScrolling = useRef(false);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  // Conmutador de vista blindado contra saltos erráticos de scroll y mapa
  const handleToggleViewMode = () => {
    const nextMode = viewMode === 'carousel' ? 'list' : 'carousel';
    if (nextMode === 'carousel') {
      isProgrammaticScroll.current = true;
    }
    setViewMode(nextMode);
  };

  // 1. Sincronización automática geométrica al deslizar (Scroll Detector infalible)
  const handleCarouselScroll = () => {
    if (isProgrammaticScroll.current || !carouselRef.current) return;

    isManualScrolling.current = true;
    if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    scrollTimeout.current = setTimeout(() => {
      isManualScrolling.current = false;
    }, 150);

    const container = carouselRef.current;
    const containerCenter = container.scrollLeft + container.clientWidth / 2;

    let closestParking: ParkingSpace | null = null;
    let minDistance = Infinity;

    // Buscar qué tarjeta está más cerca del centro exacto del carrusel
    filteredParkings.forEach((parking) => {
      const el = cardRefs.current[parking.id];
      if (!el) return;
      const cardCenter = el.offsetLeft + el.offsetWidth / 2;
      const distance = Math.abs(containerCenter - cardCenter);
      if (distance < minDistance) {
        minDistance = distance;
        closestParking = parking;
      }
    });

    if (closestParking && (closestParking as ParkingSpace).id !== selectedParking.id) {
      onSelectParking(closestParking); // Actualiza estado global y pin activo
    }
  };

  // 2. Control de navegación al hacer clic en un pin del mapa o tarjeta
  const handlePinOrCardClick = (parking: ParkingSpace) => {
    isProgrammaticScroll.current = true;
    onSelectParking(parking);
    if (viewMode === 'carousel') {
      cardRefs.current[parking.id]?.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest',
      });
    }
    setTimeout(() => {
      isProgrammaticScroll.current = false;
    }, 450);
  };

  // 3. Al cambiar de 'list' a 'carousel', centrar INMEDIATAMENTE la tarjeta activa sin mover el mapa
  useLayoutEffect(() => {
    if (viewMode === 'carousel' && selectedParking?.id) {
      isProgrammaticScroll.current = true;
      cardRefs.current[selectedParking.id]?.scrollIntoView({
        behavior: 'instant' as ScrollBehavior,
        inline: 'center',
        block: 'nearest',
      });
      const timer = setTimeout(() => {
        isProgrammaticScroll.current = false;
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [viewMode, selectedParking?.id]);

  // 4. Auto-centrado suave si el cambio vino de un control externo
  useEffect(() => {
    if (isManualScrolling.current || isProgrammaticScroll.current || viewMode !== 'carousel') return;

    if (selectedParking?.id && cardRefs.current[selectedParking.id]) {
      cardRefs.current[selectedParking.id]?.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest',
      });
    }
  }, [selectedParking?.id, viewMode]);

  return (
    <div
      className={`flex flex-col h-full relative overflow-hidden transition-colors duration-300 ${
        isDarkMode ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'
      }`}
    >
      {/* 1. Header con Menú Hamburguesa, Isotipo Institucional y Barra de Búsqueda */}
      <div
        className={`px-4 pt-2.5 pb-2 border-b z-30 shrink-0 shadow-xs backdrop-blur-md transition-colors duration-300 ${
          isDarkMode
            ? 'bg-slate-950/95 border-slate-800'
            : 'bg-white/95 border-slate-100'
        }`}
      >
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-2">
            {/* Botón de Menú Hamburguesa para abrir el Sidebar */}
            <button
              type="button"
              onClick={onOpenSidebar}
              title="Menú de opciones"
              className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-150 active:scale-95 cursor-pointer ${
                isDarkMode
                  ? 'bg-slate-800 text-white hover:bg-slate-700'
                  : 'bg-slate-100 text-[#001F5D] hover:bg-slate-200'
              }`}
            >
              <Menu className="w-4 h-4" />
            </button>

            {/* Isotipo ParqueaFácilSV estilo Pitch Airbnb / Uber */}
            <div className="bg-[#001F5D] px-2.5 py-1 rounded-xl shadow-xs flex items-center gap-1 border border-blue-900/40">
              <span className="text-white font-black tracking-tight text-xs">PARQUEA</span>
              <span className="text-[#ECD700] font-black tracking-tight text-xs">FÁCIL</span>
              <span className="ml-0.5 text-[9px] font-black bg-[#ECD700] text-[#001F5D] px-1 py-0.2 rounded">
                SV
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Botón de Notificaciones */}
            <div className="relative">
              <button
                type="button"
                onClick={onOpenSidebar}
                title="Notificaciones activas"
                className={`w-8 h-8 rounded-full border flex items-center justify-center transition-colors cursor-pointer active:scale-95 ${
                  isDarkMode
                    ? 'border-slate-800 text-slate-300 hover:text-white bg-slate-900'
                    : 'border-slate-200 text-slate-600 hover:text-primary bg-white'
                }`}
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#ECD700] rounded-full ring-2 ring-white dark:ring-slate-900" />
              </button>
            </div>

            {/* Avatar Usuario */}
            <div
              onClick={onOpenSidebar}
              title="Ver mi perfil"
              className="w-8 h-8 rounded-full overflow-hidden ring-2 ring-secondary/50 cursor-pointer active:scale-95 transition-transform"
            >
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

        {/* Barra de búsqueda estilo píldora */}
        <div className="relative mb-2">
          <div
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full shadow-xs border transition-colors cursor-pointer ${
              isDarkMode
                ? 'bg-slate-900/90 border-slate-800 hover:border-slate-700 text-white'
                : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700'
            }`}
          >
            <Search className="w-4 h-4 text-slate-400 shrink-0" />
            <input
              type="text"
              readOnly
              value="Buscar por zona, colonia o centro comercial..."
              className="w-full bg-transparent text-xs font-medium focus:outline-none cursor-pointer truncate placeholder-slate-400"
            />
          </div>
        </div>

        {/* Chips de filtro horizontales con interacción */}
        <div
          className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 scroll-smooth"
          role="tablist"
          aria-label="Filtro de zonas"
        >
          {DISPLAY_ZONES.map(({ value, label }) => {
            const isActive = selectedZone === value;
            return (
              <button
                key={value}
                onClick={() => onSelectZone(value)}
                type="button"
                className={`shrink-0 px-3 py-1 rounded-full text-[11px] font-bold transition-all duration-150 active:scale-95 cursor-pointer select-none ${
                  isActive
                    ? 'bg-[#001F5D] text-white shadow-xs ring-1 ring-[#001F5D]'
                    : isDarkMode
                    ? 'bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800'
                    : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Mapa con Tonalidades de la Marca y Soporte de Modo Oscuro */}
      <div className="flex-1 relative w-full min-h-[220px] z-10">
        <RealMap
          parkings={filteredParkings}
          selectedParking={selectedParking}
          onSelectParking={handlePinOrCardClick}
          isDarkMode={isDarkMode}
          selectedZone={selectedZone}
        />
      </div>

      {/* 3. Panel Inferior Deslizable / Bottom Sheet (Carrusel vs Lista vs Colapsado) */}
      {isCollapsed ? (
        /* ESTADO COLAPSADO: Barra flotante fija inferior con mapa al máximo */
        <div
          className={`shrink-0 border-t z-20 px-4 py-2.5 flex items-center justify-between shadow-floating transition-all duration-300 animate-in slide-in-from-bottom-2 ${
            isDarkMode
              ? 'bg-slate-900/95 border-slate-800 text-white'
              : 'bg-white/95 border-slate-100 text-slate-900'
          }`}
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="relative w-11 h-11 rounded-xl overflow-hidden shrink-0 border border-slate-200 dark:border-slate-700 bg-slate-800">
              <Image
                src={selectedParking.images[0]}
                alt={selectedParking.title}
                fill
                sizes="44px"
                className="object-cover"
              />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-bold text-[#7C9FE7] uppercase truncate">
                  {selectedParking.zone}
                </span>
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">
                  ${selectedParking.hourlyRate.toFixed(2)}/h
                </span>
              </div>
              <h4 className="text-xs font-bold truncate leading-tight">
                {selectedParking.title}
              </h4>
              <p className="text-[10px] text-slate-400 truncate">
                A {selectedParking.distanceMeters} m · ★ {selectedParking.rating.toFixed(1)}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* Botón Ver otros para reabrir panel completo */}
            <button
              type="button"
              onClick={() => setIsCollapsed(false)}
              className="px-2.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1 cursor-pointer transition-all active:scale-95"
            >
              <ChevronUp className="w-3.5 h-3.5" />
              <span>Ver otros</span>
            </button>

            {/* Botón primario estandarizado Ver detalle */}
            <button
              type="button"
              onClick={onGoToDetail}
              className="h-10 px-4 rounded-xl bg-[#ECD700] hover:bg-[#dfcb00] text-[#001F5D] text-xs font-bold tracking-tight shadow-sm transition-all duration-150 active:scale-[0.98] flex items-center justify-center cursor-pointer border border-[#ECD700]/60 shrink-0"
            >
              <span>Ver detalle</span>
              <ChevronRight className="w-3.5 h-3.5 stroke-[2.5] ml-0.5 text-[#001F5D]" />
            </button>
          </div>
        </div>
      ) : (
        /* ESTADO EXPANDIDO: Panel con asa táctil, switch Carrusel/Lista y opciones */
        <div
          className={`shrink-0 rounded-t-3xl border-t z-20 pt-1 pb-3 transition-all duration-300 shadow-floating ${
            isDarkMode
              ? 'bg-slate-900 border-slate-800 text-white'
              : 'bg-white border-slate-100 text-slate-900'
          }`}
        >
          {/* Asa táctil centrada que permite minimizar o expandir el panel */}
          <div
            onClick={() => setIsCollapsed(true)}
            role="button"
            tabIndex={0}
            title="Minimizar panel para ver el mapa"
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') setIsCollapsed(true);
            }}
            className="w-10 h-1 bg-slate-300 dark:bg-slate-700 rounded-full mx-auto my-2 cursor-pointer hover:bg-slate-400 dark:hover:bg-slate-600 transition-colors"
          />

          {/* Cabecera limpia y sintetizada del panel */}
          <div className="flex justify-between items-center px-4 mb-3.5">
            {/* Lado Izquierdo (Título + Contador compacto con indicador de pulso) */}
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-bold text-sm text-[#001F5D] dark:text-white">Cocheras cerca</span>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-[#59667B] dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                {filteredParkings.length}
              </span>
            </div>

            {/* Lado Derecho (Conmutador de Vista + Botón Minimizar) */}
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={handleToggleViewMode}
                className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-[#001F5D] dark:text-white text-xs font-semibold transition-colors border border-slate-200 dark:border-slate-700 cursor-pointer active:scale-95"
              >
                {viewMode === 'carousel' ? (
                  <>
                    <List className="w-3.5 h-3.5" />
                    <span>Lista</span>
                  </>
                ) : (
                  <>
                    <LayoutGrid className="w-3.5 h-3.5" />
                    <span>Tarjetas</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => setIsCollapsed(true)}
                title="Minimizar panel"
                className="p-1 rounded-lg border border-transparent text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer active:scale-95"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* VISTA 1: LISTA VERTICAL COMPACTA */}
          {viewMode === 'list' ? (
            <div className="max-h-[290px] overflow-y-auto space-y-2 px-4 pb-2 no-scrollbar">
              {filteredParkings.map((parking) => {
                const isSelected = selectedParking.id === parking.id;
                return (
                  <div
                    key={parking.id}
                    onClick={() => handlePinOrCardClick(parking)}
                    className={`p-2.5 rounded-2xl border transition-all cursor-pointer flex items-center gap-3 ${
                      isSelected
                        ? 'bg-[#001F5D] text-white border-[#ECD700] ring-2 ring-[#ECD700]/70 shadow-md'
                        : isDarkMode
                        ? 'bg-slate-800/80 border-slate-700 text-white hover:border-slate-600'
                        : 'bg-white border-slate-200 text-slate-900 hover:border-slate-300 shadow-2xs'
                    }`}
                  >
                    {/* Miniatura */}
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-slate-800">
                      <Image
                        src={parking.images[0]}
                        alt={parking.title}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                      <div className="absolute top-1 left-1 bg-black/75 backdrop-blur-xs text-[#ECD700] font-bold text-[9px] px-1 py-0.2 rounded">
                        ${parking.hourlyRate.toFixed(2)}/h
                      </div>
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-0.5">
                        <span className={`text-[10px] font-bold uppercase tracking-wider ${
                          isSelected ? 'text-[#7C9FE7]' : 'text-secondary'
                        }`}>
                          {parking.zone}
                        </span>
                        <span className="text-[11px] font-bold flex items-center gap-0.5">
                          <span className="text-[#ECD700]">★</span>
                          <span className={isSelected ? 'text-white' : ''}>{parking.rating.toFixed(1)}</span>
                        </span>
                      </div>
                      <h4 className="text-xs font-bold truncate leading-tight">
                        {parking.title}
                      </h4>
                      <p className={`text-[11px] truncate mt-0.5 ${
                        isSelected ? 'text-slate-200' : 'text-slate-500 dark:text-slate-400'
                      }`}>
                        {parking.addressReference}
                      </p>
                      <div className="mt-1 flex items-center gap-2 text-[10px]">
                        <span className={isSelected ? 'text-[#7C9FE7]' : 'text-slate-400'}>
                          A {parking.distanceMeters} m
                        </span>
                        <span className="opacity-40">•</span>
                        <span className={`px-1.5 py-0.2 rounded text-[9px] font-semibold ${
                          isSelected
                            ? 'bg-white/10 text-slate-200'
                            : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                        }`}>
                          {parking.highlightBadge || 'Disponible'}
                        </span>
                      </div>
                    </div>

                    {/* Botón Acción */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePinOrCardClick(parking);
                        onGoToDetail();
                      }}
                      className={`px-3 py-2 rounded-xl text-xs font-bold transition-all shrink-0 active:scale-95 cursor-pointer ${
                        isSelected
                          ? 'bg-[#ECD700] text-[#001F5D] hover:bg-[#dfcb00]'
                          : 'bg-primary text-white hover:bg-primary-hover'
                      }`}
                    >
                      {isSelected ? 'Ver ficha' : 'Elegir'}
                    </button>
                  </div>
                );
              })}
            </div>
          ) : (
            /* VISTA 2: CARRUSEL HORIZONTAL */
            <div
              ref={carouselRef}
              onScroll={handleCarouselScroll}
              className="flex gap-3 overflow-x-auto snap-x snap-mandatory px-4 scroll-px-4 scroll-smooth no-scrollbar pb-3 pt-1"
            >
              {filteredParkings.map((parking) => {
                const isSelected = selectedParking.id === parking.id;
                return (
                  <div
                    key={parking.id}
                    ref={(el) => {
                      cardRefs.current[parking.id] = el;
                    }}
                    data-parking-id={parking.id}
                    onClick={() => handlePinOrCardClick(parking)}
                    className={`snap-center shrink-0 w-[82%] max-w-[310px] rounded-2xl bg-[#001F5D] border transition-all duration-300 cursor-pointer overflow-hidden shadow-lg flex flex-col justify-between ${
                      isSelected
                        ? 'border-[#ECD700] ring-2 ring-[#ECD700] scale-[1.01] shadow-2xl opacity-100'
                        : 'border-blue-900/60 hover:border-[#7C9FE7]/40 opacity-95'
                    }`}
                  >
                    {/* Miniatura superior */}
                    <div className="relative w-full h-28 overflow-hidden bg-slate-800 shrink-0">
                      <Image
                        src={parking.images[0]}
                        alt={parking.title}
                        fill
                        sizes="(max-width: 768px) 82vw, 310px"
                        className="object-cover"
                      />
                      {/* Tarifa izquierda */}
                      <div className="absolute top-2.5 left-2.5 bg-[#001F5D]/90 backdrop-blur-sm text-[#ECD700] border border-[#ECD700]/30 font-bold px-2 py-1 rounded-lg text-xs flex items-center gap-1 shadow-md">
                        <span>${parking.hourlyRate.toFixed(2)}/h</span>
                      </div>

                      {/* Badge derecho */}
                      <div className="absolute top-2.5 right-2.5 bg-black/60 backdrop-blur-sm text-white border border-white/20 px-2 py-1 rounded-lg text-[11px] font-semibold shadow-xs">
                        {parking.highlightBadge || 'Acceso Automatizado'}
                      </div>
                    </div>

                    {/* Cuerpo con datos */}
                    <div className="p-3 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[#7C9FE7] font-semibold text-[11px] uppercase tracking-wider">
                            {parking.zone}
                          </span>
                          <span className="text-xs flex items-center gap-1">
                            <span className="text-[#ECD700] text-sm">★</span>
                            <span className="text-white font-bold text-xs">{parking.rating.toFixed(1)}</span>
                            <span className="text-slate-300 text-xs">({parking.reviewCount})</span>
                          </span>
                        </div>
                        <h3 className="text-white font-bold text-sm leading-snug line-clamp-1">
                          {parking.title}
                        </h3>
                        <p className="text-slate-200 text-xs line-clamp-1 mt-0.5">
                          {parking.addressReference}
                        </p>
                      </div>

                      {/* Línea divisoria */}
                      <div className="border-t border-white/15 my-2.5" />

                      {/* Footer de tarjeta */}
                      <div className="flex items-center justify-between mt-auto">
                        <span className="text-[#7C9FE7] font-semibold text-xs">
                          A {parking.distanceMeters} m
                        </span>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectParking(parking);
                            onGoToDetail();
                          }}
                          className="text-xs font-bold bg-[#001745] hover:bg-[#002B82] text-white px-3 py-1.5 rounded-xl transition-all flex items-center gap-1 shadow-xs cursor-pointer active:scale-95 border border-[#7C9FE7]/30"
                        >
                          <span>Ver detalle</span>
                          <ChevronRight className="w-3.5 h-3.5 text-white" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ScreenHome;
