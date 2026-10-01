'use client';

import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { ParkingSpace } from '../../types';
import { LocateFixed, ZoomIn, ZoomOut } from 'lucide-react';

export interface OsmMapProps {
  parkings: ParkingSpace[];
  selectedParking: ParkingSpace;
  onSelectParking: (parking: ParkingSpace) => void;
  className?: string;
  isDarkMode?: boolean;
  selectedZone?: string;
}

// Diccionario de coordenadas y zoom óptimo por zona salvadoreña
const ZONE_VIEWPORTS: Record<string, { center: [number, number]; zoom: number }> = {
  all: { center: [13.6910, -89.2440], zoom: 15 },
  Todas: { center: [13.6910, -89.2440], zoom: 15 },
  'Cerca de mí': { center: [13.6910, -89.2440], zoom: 15 },
  'Santa Tecla': { center: [13.6748, -89.2825], zoom: 15 },
  'Col. Escalón': { center: [13.7088, -89.2435], zoom: 15 },
  'Colonia Escalón': { center: [13.7088, -89.2435], zoom: 15 },
  'Antiguo Cuscatlán': { center: [13.6791, -89.2365], zoom: 15 },
  'Zona Rosa': { center: [13.6953, -89.2412], zoom: 15 },
  'San Salvador Centro': { center: [13.6980, -89.1910], zoom: 15 },
};

// Centro por defecto: Espacio Hipódromo San Benito (Zona Rosa, El Salvador)
const DEFAULT_CENTER: [number, number] = [13.6910, -89.2440];
const DEFAULT_ZOOM = 15;

export const OsmMap: React.FC<OsmMapProps> = ({
  parkings,
  selectedParking,
  onSelectParking,
  className = '',
  isDarkMode = false,
  selectedZone,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);
  const initialCenterRef = useRef<[number, number]>(
    selectedParking?.coordinates?.lat && selectedParking?.coordinates?.lng
      ? [selectedParking.coordinates.lat, selectedParking.coordinates.lng]
      : DEFAULT_CENTER
  );

  // 1. Inicializar mapa de Leaflet con Esri World Gray Canvas (100% gratuito, sin API key ni tokens)
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    const map = L.map(mapContainerRef.current, {
      center: initialCenterRef.current,
      zoom: DEFAULT_ZOOM,
      zoomControl: false,
      attributionControl: false,
      scrollWheelZoom: true,
      dragging: true,
      touchZoom: true,
    });

    // Capa libre de Esri World Gray Canvas: estética limpia, sin farmacias ni locales, sin registros
    L.tileLayer(
      'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}',
      {
        attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
        maxZoom: 16,
      }
    ).addTo(map);

    const markersLayer = L.layerGroup().addTo(map);
    markersLayerRef.current = markersLayer;
    mapInstanceRef.current = map;

    // Asegurar redibujado inmediato de teselas para eliminar cualquier pantalla de carga
    const resizeObserver = new ResizeObserver(() => {
      map.invalidateSize();
    });
    if (mapContainerRef.current) {
      resizeObserver.observe(mapContainerRef.current);
    }

    map.invalidateSize();
    const t1 = setTimeout(() => map.invalidateSize(), 50);
    const t2 = setTimeout(() => map.invalidateSize(), 200);
    const t3 = setTimeout(() => map.invalidateSize(), 500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      resizeObserver.disconnect();
      map.remove();
      mapInstanceRef.current = null;
      markersLayerRef.current = null;
    };
  }, []);

  // Invalida tamaño ante cambios de tema
  useEffect(() => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.invalidateSize();
      const t = setTimeout(() => {
        mapInstanceRef.current?.invalidateSize();
      }, 100);
      return () => clearTimeout(t);
    }
  }, [isDarkMode]);

  // 2. Renderizar y actualizar marcadores interactivos (estilo Airbnb / Uber)
  useEffect(() => {
    const map = mapInstanceRef.current;
    const markersLayer = markersLayerRef.current;
    if (!map || !markersLayer) return;

    markersLayer.clearLayers();

    const bounds = L.latLngBounds([]);

    parkings.forEach((parking) => {
      const isSelected = parking.id === selectedParking?.id;
      const { lat, lng } = parking.coordinates;

      bounds.extend([lat, lng]);

      // Ícono de coche en SVG limpio
      const carSvg = `
        <svg class="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round">
          <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.5 2.8C2.1 10.9 2 11.2 2 11.5V16c0 .6.4 1 1 1h2"/>
          <circle cx="7" cy="17" r="2"/>
          <path d="M9 17h6"/>
          <circle cx="17" cy="17" r="2"/>
        </svg>
      `;

      // Pin flotante con relieve y sombra:
      // Inactivo: Fondo blanco, borde delgado en #001F5D, icono y precio "$1.50/h" en #001F5D
      // Activo: Fondo #001F5D, icono y precio en #ECD700, y punto pulsante animado (ping effect)
      const customIcon = L.divIcon({
        className: 'custom-osm-marker',
        html: `
          <div class="relative group cursor-pointer select-none transition-transform duration-200 ${
            isSelected ? 'scale-110 z-40' : 'hover:scale-105 z-20'
          }">
            <div class="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-black shadow-md border ${
              isSelected
                ? 'bg-[#001F5D] text-[#ECD700] border-2 border-[#ECD700] shadow-lg ring-2 ring-[#001F5D]/30'
                : 'bg-white text-[#001F5D] border border-[#001F5D] shadow-md hover:bg-slate-50'
            }">
              ${carSvg}
              <span class="tracking-tight">$${parking.hourlyRate.toFixed(2)}/h</span>
            </div>
            ${
              isSelected
                ? `
                  <div class="absolute -bottom-1.5 left-1/2 -translate-x-1/2 flex items-center justify-center">
                    <span class="w-2.5 h-2.5 rounded-full bg-[#ECD700] animate-ping absolute"></span>
                    <span class="w-2 h-2 rounded-full bg-[#ECD700] ring-2 ring-[#001F5D] relative"></span>
                  </div>
                `
                : ''
            }
          </div>
        `,
        iconSize: [92, 34],
        iconAnchor: [46, 34],
        popupAnchor: [0, -34],
      });

      const marker = L.marker([lat, lng], {
        icon: customIcon,
        zIndexOffset: isSelected ? 1000 : 100,
      });

      // Popup informativo sutil
      const popupHtml = `
        <div class="p-2.5 max-w-[210px] text-slate-800 font-sans">
          <div class="flex items-center justify-between gap-1 mb-1">
            <span class="text-[9px] font-extrabold uppercase tracking-wider text-[#5A81D2]">${parking.zone}</span>
            <span class="text-xs font-black text-[#001F5D]">$${parking.hourlyRate.toFixed(2)}/h</span>
          </div>
          <h4 class="text-xs font-bold text-slate-900 leading-tight mb-1">${parking.title}</h4>
          <p class="text-[10px] text-slate-500 mb-2 leading-relaxed">${parking.addressReference}</p>
          <div class="flex items-center justify-between text-[10px] pt-1.5 border-t border-slate-100 font-semibold text-slate-600">
            <span class="text-[#ECD700] font-bold">★ <span class="text-slate-700">${parking.rating.toFixed(1)} (${parking.reviewCount})</span></span>
            <span class="text-emerald-600 font-bold">A ${parking.distanceMeters}m</span>
          </div>
        </div>
      `;

      marker.bindPopup(popupHtml, {
        closeButton: false,
        className: 'osm-custom-popup',
      });

      marker.on('click', () => {
        onSelectParking(parking);
      });

      marker.addTo(markersLayer);
    });

    // Centrar suavemente en cochera seleccionada con paneo sutil
    if (selectedParking?.coordinates?.lat && selectedParking?.coordinates?.lng) {
      map.panTo(
        [selectedParking.coordinates.lat, selectedParking.coordinates.lng],
        {
          animate: true,
          duration: 0.6,
        }
      );
    } else if (bounds.isValid() && parkings.length > 0) {
      map.fitBounds(bounds, { padding: [30, 30], maxZoom: 14 });
    }
  }, [parkings, selectedParking, onSelectParking]);

  // 3. Centrado automático con animación fluida al seleccionar una zona
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !selectedZone) return;

    const target = ZONE_VIEWPORTS[selectedZone] || ZONE_VIEWPORTS['all'];
    map.flyTo(target.center, target.zoom, { duration: 1.0, easeLinearity: 0.25 });
  }, [selectedZone]);

  // Controles
  const handleZoomIn = () => {
    mapInstanceRef.current?.zoomIn();
  };

  const handleZoomOut = () => {
    mapInstanceRef.current?.zoomOut();
  };

  const handleRecenter = () => {
    if (!mapInstanceRef.current) return;
    if (selectedParking?.coordinates?.lat && selectedParking?.coordinates?.lng) {
      mapInstanceRef.current.flyTo(
        [selectedParking.coordinates.lat, selectedParking.coordinates.lng],
        14,
        { duration: 0.6 }
      );
    } else {
      mapInstanceRef.current.flyTo(DEFAULT_CENTER, DEFAULT_ZOOM, { duration: 0.6 });
    }
  };

  return (
    <div
      className={`relative w-full h-full overflow-hidden ${className}`}
    >
      {/* Contenedor del mapa con filtro de modo oscuro limpio */}
      <div
        ref={mapContainerRef}
        style={
          isDarkMode
            ? { filter: 'invert(100%) hue-rotate(180deg) brightness(85%) contrast(105%)' }
            : undefined
        }
        className={`w-full h-full z-0 transition-[filter] duration-300 ${
          isDarkMode ? 'bg-[#0B1329]' : 'bg-[#EAEAEA]'
        }`}
      />

      {/* Botones flotantes sobre el mapa en esquina derecha: GPS y Zoom */}
      <div className="absolute bottom-4 right-3 z-30 flex flex-col gap-2">
        <button
          type="button"
          onClick={handleRecenter}
          title="Mi ubicación / Centrar cochera"
          className={`w-9 h-9 backdrop-blur-md rounded-xl border shadow-md flex items-center justify-center active:scale-90 transition-all cursor-pointer ${
            isDarkMode
              ? 'bg-slate-900/90 border-slate-700 text-[#ECD700] hover:bg-slate-800'
              : 'bg-white/95 border-slate-200/90 text-primary hover:bg-slate-50'
          }`}
        >
          <LocateFixed className="w-4 h-4" />
        </button>

        <div
          className={`flex flex-col rounded-xl overflow-hidden shadow-md border backdrop-blur-md ${
            isDarkMode
              ? 'bg-slate-900/90 border-slate-700'
              : 'bg-white/95 border-slate-200/90'
          }`}
        >
          <button
            type="button"
            onClick={handleZoomIn}
            title="Acercar"
            className={`w-9 h-8 flex items-center justify-center active:scale-90 transition-all border-b cursor-pointer ${
              isDarkMode
                ? 'text-white border-slate-700 hover:bg-slate-800'
                : 'text-primary border-slate-100 hover:bg-slate-50'
            }`}
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={handleZoomOut}
            title="Alejar"
            className={`w-9 h-8 flex items-center justify-center active:scale-90 transition-all cursor-pointer ${
              isDarkMode
                ? 'text-white hover:bg-slate-800'
                : 'text-primary hover:bg-slate-50'
            }`}
          >
            <ZoomOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default OsmMap;
