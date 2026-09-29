'use client';

import React from 'react';
import { ScreenStep } from '../../types';
import { RotateCcw, Presentation, Sparkles } from 'lucide-react';

export interface PitchControlsProps {
  currentStep: ScreenStep;
  onGoToStep: (step: ScreenStep) => void;
  onReset: () => void;
}

const STEP_LABELS: Record<ScreenStep, { label: string; short: string }> = {
  1: { label: '1. Mapa y Cercanos', short: 'Mapa' },
  2: { label: '2. Ficha y Reseñas', short: 'Ficha' },
  3: { label: '3. Horario y 15%', short: 'Tarifa' },
  4: { label: '4. Pasarela de Pago', short: 'Pago' },
  5: { label: '5. Ticket QR', short: 'Ticket' },
};

export const PitchControls: React.FC<PitchControlsProps> = ({
  currentStep,
  onGoToStep,
  onReset,
}) => {
  return (
    <aside
      aria-label="Controles de demostración"
      className="w-full max-w-xl mx-auto mb-4 px-3 py-2 bg-white/90 backdrop-blur-md border border-slate-200/80 rounded-2xl shadow-sm flex items-center justify-between gap-2 z-50 text-xs text-slate-800"
    >
      <div className="flex items-center gap-1.5 font-semibold text-primary">
        <Presentation className="w-4 h-4 text-primary" />
        <span className="hidden sm:inline">Pitch Demo:</span>
        <span className="bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full font-bold text-[11px] flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-amber-600" />
          {STEP_LABELS[currentStep].label}
        </span>
      </div>

      <nav aria-label="Navegación entre pantallas del pitch" className="flex items-center gap-1">
        {([1, 2, 3, 4, 5] as ScreenStep[]).map((step) => {
          const isActive = currentStep === step;
          return (
            <button
              key={step}
              onClick={() => onGoToStep(step)}
              title={STEP_LABELS[step].label}
              className={`px-2.5 py-1 rounded-lg font-bold text-xs transition-all duration-150 active:scale-95 cursor-pointer ${
                isActive
                  ? 'bg-primary text-white shadow-sm ring-1 ring-primary'
                  : 'bg-slate-100 text-textSecondary hover:bg-slate-200 hover:text-slate-900'
              }`}
            >
              {step}
            </button>
          );
        })}
      </nav>

      <button
        onClick={onReset}
        title="Reiniciar flujo"
        className="flex items-center gap-1 text-[11px] font-medium text-textSecondary hover:text-primary px-2 py-1 rounded-lg hover:bg-slate-100 transition-colors"
      >
        <RotateCcw className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">Reiniciar</span>
      </button>
    </aside>
  );
};
