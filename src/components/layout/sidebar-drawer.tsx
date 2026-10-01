'use client';

import React from 'react';
import Image from 'next/image';
import { SidebarView, UserProfile } from '../../types';
import {
  X,
  User,
  Clock,
  Heart,
  Settings,
  HelpCircle,
  LogOut,
  Moon,
  Sun,
  ChevronRight,
  ChevronLeft,
  ShieldCheck,
  Car,
  Wallet,
  Bell,
  Sparkles,
  Phone,
} from 'lucide-react';

export interface SidebarDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  view: SidebarView;
  onSelectView: (view: SidebarView) => void;
  user: UserProfile;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export const SidebarDrawer: React.FC<SidebarDrawerProps> = ({
  isOpen,
  onClose,
  view,
  onSelectView,
  user,
  isDarkMode,
  onToggleDarkMode,
}) => {
  return (
    <div
      className={`absolute inset-0 z-50 overflow-hidden transition-all duration-300 ${
        isOpen ? 'pointer-events-auto visible' : 'pointer-events-none invisible'
      }`}
    >
      {/* Fondo translúcido con desenfoque suave (Backdrop) */}
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Panel Deslizable (Drawer Panel) */}
      <aside
        aria-label="Menú principal de navegación"
        className={`absolute left-0 top-0 bottom-0 w-[84%] max-w-[320px] transition-transform duration-300 ease-out flex flex-col shadow-2xl z-10 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } ${
          isDarkMode
            ? 'bg-slate-900 text-white border-r border-slate-800'
            : 'bg-white text-slate-900 border-r border-slate-100'
        }`}
      >
        {/* VISTA 1: MENÚ PRINCIPAL */}
        {view === 'menu' && (
          <div className="flex flex-col h-full">
            {/* Header del Perfil */}
            <div
              className={`p-4 pt-6 border-b ${
                isDarkMode
                  ? 'bg-slate-950/70 border-slate-800'
                  : 'bg-slate-50/80 border-slate-100'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="bg-[#001F5D] px-2 py-0.5 rounded-lg shadow-xs flex items-center gap-0.5">
                    <span className="text-white font-black text-[10px]">PARQUEA</span>
                    <span className="text-[#ECD700] font-black text-[10px]">FÁCIL</span>
                    <span className="text-[8px] font-black bg-[#ECD700] text-[#001F5D] px-0.5 rounded ml-0.5">
                      SV
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  title="Cerrar menú"
                  className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
                    isDarkMode
                      ? 'hover:bg-slate-800 text-slate-400 hover:text-white'
                      : 'hover:bg-slate-200 text-[#59667B] hover:text-slate-900'
                  }`}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Tarjeta de usuario clickable para ir al perfil */}
              <div
                onClick={() => onSelectView('profile')}
                className={`p-2.5 rounded-2xl flex items-center gap-3 cursor-pointer transition-all duration-150 active:scale-98 ${
                  isDarkMode
                    ? 'hover:bg-slate-800/80 bg-slate-900/60 border border-slate-800'
                    : 'hover:bg-white bg-white/70 border border-slate-200/60 shadow-xs'
                }`}
              >
                <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-[#7C9FE7] shrink-0">
                  <Image
                    src={user.avatar}
                    alt={user.name}
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1">
                    <h3 className="text-xs font-bold truncate leading-tight">{user.name}</h3>
                    <ShieldCheck className="w-3.5 h-3.5 text-[#001F5D] dark:text-[#7C9FE7] shrink-0" />
                  </div>
                  <p className="text-[10px] text-[#59667B] dark:text-slate-400 truncate mb-1">
                    {user.carModel}
                  </p>
                  <span className="text-[9px] font-extrabold bg-[#ECD700]/20 text-[#001F5D] dark:text-[#ECD700] px-1.5 py-0.2 rounded inline-block">
                    ★ {user.rating.toFixed(2)} ({user.tripsCount} viajes)
                  </span>
                </div>
                <ChevronRight className="w-4 h-4 text-[#59667B] shrink-0" />
              </div>

              {/* Saldo en billetera según paleta de marca: bg-[#7C9FE7]/15 con texto #001F5D en negrita */}
              <div
                className={`mt-2.5 px-3 py-1.5 rounded-xl flex items-center justify-between text-[11px] font-semibold ${
                  isDarkMode
                    ? 'bg-slate-800/80 border border-slate-700 text-slate-200'
                    : 'bg-slate-50 border border-slate-200 text-[#001F5D]'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <Wallet className="w-3.5 h-3.5 text-[#7C9FE7]" />
                  <span className="text-[#59667B] dark:text-slate-300">Saldo ParqueaFácil</span>
                </div>
                <span className="font-extrabold bg-[#7C9FE7]/15 text-[#001F5D] dark:text-[#7C9FE7] px-2 py-0.5 rounded-lg border border-[#7C9FE7]/30">
                  ${user.walletBalance.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Lista de Navegación de Opciones */}
            <div className="flex-1 overflow-y-auto px-3 py-3 space-y-1 no-scrollbar text-xs">
              <button
                type="button"
                onClick={() => onSelectView('profile')}
                className={`w-full px-3 py-2.5 rounded-xl flex items-center justify-between font-medium transition-colors cursor-pointer ${
                  isDarkMode
                    ? 'hover:bg-slate-800 text-slate-200'
                    : 'hover:bg-slate-100 text-slate-700'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <User className="w-4 h-4 text-[#7C9FE7]" />
                  <span>Mi Perfil y Vehículo</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>

              <button
                type="button"
                onClick={onClose}
                className={`w-full px-3 py-2.5 rounded-xl flex items-center justify-between font-medium transition-colors cursor-pointer ${
                  isDarkMode
                    ? 'hover:bg-slate-800 text-slate-200'
                    : 'hover:bg-slate-100 text-slate-700'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-[#7C9FE7]" />
                  <span>Mis Reservas Activas</span>
                </div>
                {/* Badge de Reservas: Fondo bg-[#7C9FE7]/20 con texto #001F5D */}
                <span className="text-[10px] font-bold bg-[#7C9FE7]/20 text-[#001F5D] dark:text-[#7C9FE7] px-2 py-0.5 rounded-full border border-[#7C9FE7]/30">
                  1 activa
                </span>
              </button>

              <button
                type="button"
                onClick={onClose}
                className={`w-full px-3 py-2.5 rounded-xl flex items-center justify-between font-medium transition-colors cursor-pointer ${
                  isDarkMode
                    ? 'hover:bg-slate-800 text-slate-200'
                    : 'hover:bg-slate-100 text-slate-700'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Heart className="w-4 h-4 text-[#7C9FE7]" />
                  <span>Cocheras Favoritas</span>
                </div>
                <span className="text-[10px] text-[#59667B] dark:text-slate-400">3</span>
              </button>

              <div className="py-1">
                <div className={`h-px ${isDarkMode ? 'bg-slate-800' : 'bg-slate-100'}`} />
              </div>

              {/* Banner Anfitrión: Fondo #FEF9C3, borde #ECD700 y botón #001F5D */}
              <div
                className={`p-3.5 rounded-2xl border flex flex-col gap-1.5 ${
                  isDarkMode
                    ? 'bg-[#FEF9C3]/10 border-[#ECD700]/50 text-slate-100'
                    : 'bg-[#FEF9C3] border-[#ECD700] text-slate-900 shadow-xs'
                }`}
              >
                <div className="flex items-center gap-1.5 font-bold text-[11px] text-[#001F5D] dark:text-[#ECD700]">
                  <Sparkles className="w-3.5 h-3.5 text-[#001F5D] dark:text-[#ECD700]" />
                  <span>¿Tienes una cochera vacía?</span>
                </div>
                <p className="text-[10px] leading-tight text-[#59667B] dark:text-slate-300">
                  Gana hasta <strong className="text-[#001F5D] dark:text-[#ECD700] font-black">$250/mes</strong> alquilando tu espacio en horas muertas.
                </p>
                <button
                  type="button"
                  onClick={onClose}
                  className="mt-1 w-full py-2 bg-[#001F5D] hover:bg-[#001745] text-white text-[10px] font-black rounded-xl border border-blue-900/60 shadow-xs text-center active:scale-95 transition-all cursor-pointer"
                >
                  Registrar mi cochera
                </button>
              </div>

              <div className="py-1">
                <div className={`h-px ${isDarkMode ? 'bg-slate-800' : 'bg-slate-100'}`} />
              </div>

              {/* Botón hacia Configuraciones */}
              <button
                type="button"
                onClick={() => onSelectView('settings')}
                className={`w-full px-3 py-2.5 rounded-xl flex items-center justify-between font-medium transition-colors cursor-pointer ${
                  isDarkMode
                    ? 'hover:bg-slate-800 text-slate-200'
                    : 'hover:bg-slate-100 text-slate-700'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Settings className="w-4 h-4 text-[#59667B]" />
                  <span>Configuración y Modo Oscuro</span>
                </div>
                <ChevronRight className="w-4 h-4 text-[#59667B]" />
              </button>

              <button
                type="button"
                onClick={onClose}
                className={`w-full px-3 py-2.5 rounded-xl flex items-center justify-between font-medium transition-colors cursor-pointer ${
                  isDarkMode
                    ? 'hover:bg-slate-800 text-slate-200'
                    : 'hover:bg-slate-100 text-slate-700'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <HelpCircle className="w-4 h-4 text-[#7C9FE7]" />
                  <span>Soporte WhatsApp (+503)</span>
                </div>
                <Phone className="w-3.5 h-3.5 text-[#59667B]" />
              </button>

              <button
                type="button"
                onClick={onClose}
                className={`w-full px-3 py-2 rounded-xl flex items-center justify-between font-medium transition-colors cursor-pointer ${
                  isDarkMode
                    ? 'hover:bg-rose-950/30 text-rose-400'
                    : 'hover:bg-rose-50 text-rose-600'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <LogOut className="w-4 h-4" />
                  <span>Cerrar Sesión</span>
                </div>
              </button>
            </div>

            {/* Footer con Switch rápido de Modo Oscuro */}
            <div
              className={`p-3.5 border-t flex items-center justify-between ${
                isDarkMode ? 'border-slate-800 bg-slate-950/80' : 'border-slate-100 bg-slate-50/60'
              }`}
            >
              <div className="flex items-center gap-2 text-xs font-semibold">
                {isDarkMode ? (
                  <Moon className="w-4 h-4 text-[#ECD700]" />
                ) : (
                  <Sun className="w-4 h-4 text-amber-500" />
                )}
                <span>Modo Oscuro</span>
              </div>
              <button
                type="button"
                onClick={onToggleDarkMode}
                title="Alternar Modo Oscuro"
                className={`w-11 h-6 rounded-full transition-colors relative p-0.5 cursor-pointer ${
                  isDarkMode ? 'bg-[#ECD700]' : 'bg-slate-300'
                }`}
              >
                <span
                  className={`block w-5 h-5 rounded-full bg-white shadow-md transform transition-transform ${
                    isDarkMode ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>
        )}

        {/* VISTA 2: PERFIL DEL USUARIO */}
        {view === 'profile' && (
          <div className="flex flex-col h-full">
            <div
              className={`p-4 border-b flex items-center justify-between ${
                isDarkMode ? 'border-slate-800' : 'border-slate-100'
              }`}
            >
              <button
                type="button"
                onClick={() => onSelectView('menu')}
                className="flex items-center gap-1 text-xs font-bold text-[#7C9FE7] cursor-pointer hover:underline"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Volver</span>
              </button>
              <h2 className="text-xs font-black tracking-tight uppercase">Mi Perfil</h2>
              <button
                type="button"
                onClick={onClose}
                className="w-6 h-6 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs no-scrollbar">
              <div className="flex flex-col items-center text-center">
                <div className="relative w-20 h-20 rounded-full overflow-hidden ring-4 ring-[#001F5D] mb-2 shadow-md">
                  <Image
                    src={user.avatar}
                    alt={user.name}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </div>
                <h3 className="text-sm font-black">{user.name}</h3>
                <span className="text-[10px] text-[#59667B] dark:text-slate-400">{user.email}</span>
                <span className="mt-1 px-2.5 py-0.5 bg-[#7C9FE7]/20 text-[#001F5D] dark:text-[#7C9FE7] font-extrabold rounded-full text-[9px] border border-[#7C9FE7]/40">
                  Usuario Verificado DUI / Licencia SV
                </span>
              </div>

              {/* Datos de Contacto y Vehículo */}
              <div
                className={`p-3 rounded-2xl border space-y-2.5 ${
                  isDarkMode ? 'bg-slate-800/60 border-slate-700' : 'bg-slate-50 border-slate-200/80'
                }`}
              >
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-400">Teléfono:</span>
                  <span className="font-bold">{user.phone}</span>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-400">Vehículo:</span>
                  <span className="font-bold">{user.carModel}</span>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-400">Placa Nacional:</span>
                  <span className="font-mono font-bold bg-[#001F5D] text-white px-2 py-0.5 rounded text-[10px]">
                    {user.licensePlate}
                  </span>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-400">Puntaje Conductor:</span>
                  <span className="font-bold text-[#ECD700]">★ {user.rating} (Excelente)</span>
                </div>
              </div>

              <div
                className={`p-3 rounded-2xl border ${
                  isDarkMode ? 'bg-slate-800/40 border-slate-700' : 'bg-blue-50/60 border-blue-100'
                }`}
              >
                <div className="flex items-center gap-1.5 font-bold mb-1 text-[11px] text-[#7C9FE7]">
                  <Car className="w-3.5 h-3.5" />
                  <span>Garantía ParqueaFácil SV</span>
                </div>
                <p className="text-[10px] text-slate-400 leading-relaxed">
                  Tu perfil cuenta con cobertura de daños y seguro colaborativo ante cualquier incidente en cocheras registradas.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* VISTA 3: CONFIGURACIONES */}
        {view === 'settings' && (
          <div className="flex flex-col h-full">
            <div
              className={`p-4 border-b flex items-center justify-between ${
                isDarkMode ? 'border-slate-800' : 'border-slate-100'
              }`}
            >
              <button
                type="button"
                onClick={() => onSelectView('menu')}
                className="flex items-center gap-1 text-xs font-bold text-[#7C9FE7] cursor-pointer hover:underline"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Volver</span>
              </button>
              <h2 className="text-xs font-black tracking-tight uppercase">Configuración</h2>
              <button
                type="button"
                onClick={onClose}
                className="w-6 h-6 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs no-scrollbar">
              {/* Opción destacada: Modo Oscuro */}
              <div
                className={`p-3.5 rounded-2xl border flex items-center justify-between ${
                  isDarkMode
                    ? 'bg-slate-800/70 border-slate-700'
                    : 'bg-white border-slate-200 shadow-xs'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-[#001F5D] flex items-center justify-center text-[#ECD700]">
                    {isDarkMode ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                  </div>
                  <div>
                    <h4 className="font-bold text-xs leading-tight">Modo Oscuro</h4>
                    <p className="text-[10px] text-slate-400">
                      {isDarkMode ? 'Tema oscuro activo' : 'Tema claro activo'}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={onToggleDarkMode}
                  title="Cambiar tema de la app"
                  className={`w-12 h-6.5 rounded-full transition-colors relative p-0.5 cursor-pointer ${
                    isDarkMode ? 'bg-[#ECD700]' : 'bg-slate-300'
                  }`}
                >
                  <span
                    className={`block w-5.5 h-5.5 rounded-full bg-white shadow-md transform transition-transform ${
                      isDarkMode ? 'translate-x-5.5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* Notificaciones */}
              <div
                className={`p-3 rounded-2xl border space-y-3 ${
                  isDarkMode ? 'bg-slate-800/40 border-slate-700' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <h4 className="font-bold text-[11px] text-slate-400 uppercase tracking-wider">
                  Notificaciones
                </h4>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Bell className="w-3.5 h-3.5 text-[#7C9FE7]" />
                    <span className="text-slate-700 dark:text-slate-300">Aviso apertura de portón</span>
                  </div>
                  <span className="text-[10px] font-bold text-[#001F5D] dark:text-[#7C9FE7]">Sí</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-[#7C9FE7]" />
                    <span className="text-slate-700 dark:text-slate-300">Alerta 15 min antes de vencer</span>
                  </div>
                  <span className="text-[10px] font-bold text-[#001F5D] dark:text-[#7C9FE7]">Sí</span>
                </div>
              </div>

              {/* Moneda y Región */}
              <div
                className={`p-3 rounded-2xl border space-y-2 ${
                  isDarkMode ? 'bg-slate-800/40 border-slate-700' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <h4 className="font-bold text-[11px] text-slate-400 uppercase tracking-wider">
                  Región y Divisa
                </h4>
                <div className="flex items-center justify-between">
                  <span>País de Operación</span>
                  <span className="font-bold">El Salvador 🇸🇻</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Moneda Principal</span>
                  <span className="font-bold">Dólar (USD / $)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Cripto / Lightning</span>
                  <span className="font-bold text-amber-500">Chivo Wallet ⚡</span>
                </div>
              </div>

              <div className="pt-2 text-center text-[10px] text-slate-400">
                ParqueaFácilSV v1.2.0 • Prototipo Oficial
              </div>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
};

export default SidebarDrawer;
