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
  1: { label: '1. Mapa', short: 'Mapa' },
  2: { label: '2. Ficha', short: 'Ficha' },
  3: { label: '3. Tarifa', short: 'Tarifa' },
  4: { label: '4. Pago', short: 'Pago' },
  5: { label: '5. Ticket', short: 'Ticket' },
};

export const PitchControls: React.FC<PitchControlsProps> = ({
  currentStep,
  onGoToStep,
  onReset,
}) => {
  return (
    <aside
      aria-label="Controles de demostración"
      className="hidden md:flex w-full max-w-xl mx-auto px-4 py-2 bg-slate-900/80 backdrop-blur-md border border-slate-800 text-slate-200 shadow-xl rounded-full text-xs font-medium items-center justify-between gap-3 z-50 transition-all select-none whitespace-nowrap"
    >
      <div className="flex items-center gap-2.5 whitespace-nowrap shrink-0">
        <Presentation className="w-4 h-4 text-[#ECD700] shrink-0" />
        <span className="text-xs font-semibold whitespace-nowrap shrink-0 text-white">Presentación:</span>
        <span className="text-xs font-medium whitespace-nowrap shrink-0 px-2.5 py-1 bg-slate-800 text-slate-200 rounded-full border border-slate-700 flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-[#ECD700] shrink-0" />
          {STEP_LABELS[currentStep].label}
        </span>
      </div>

      <nav aria-label="Navegación entre pantallas del pitch" className="flex items-center gap-1.5 shrink-0 whitespace-nowrap">
        {([1, 2, 3, 4, 5] as ScreenStep[]).map((step) => {
          const isActive = currentStep === step;
          return (
            <button
              key={step}
              onClick={() => onGoToStep(step)}
              title={STEP_LABELS[step].label}
              className={`w-7 h-7 rounded-full font-black text-xs transition-all duration-150 active:scale-95 cursor-pointer flex items-center justify-center shrink-0 ${
                isActive
                  ? 'bg-[#001F5D] text-white shadow-sm ring-2 ring-[#ECD700] scale-105 border border-[#7C9FE7]/40'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
              }`}
            >
              {step}
            </button>
          );
        })}
      </nav>

      <button
        onClick={onReset}
        title="Reiniciar demostración"
        className="flex items-center gap-1 text-[11px] font-semibold text-slate-400 hover:text-white px-2.5 py-1 rounded-full hover:bg-slate-800 transition-colors cursor-pointer shrink-0 whitespace-nowrap"
      >
        <RotateCcw className="w-3.5 h-3.5 text-slate-400 shrink-0" />
        <span>Reiniciar</span>
      </button>
    </aside>
  );
};
