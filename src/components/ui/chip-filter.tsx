import React from 'react';
import { ZoneType } from '../../types';

export interface ChipFilterProps {
  zones: ZoneType[];
  selectedZone: ZoneType;
  onSelectZone: (zone: ZoneType) => void;
  className?: string;
}

export const ChipFilter: React.FC<ChipFilterProps> = ({
  zones,
  selectedZone,
  onSelectZone,
  className = '',
}) => {
  return (
    <div
      className={`flex items-center gap-2 overflow-x-auto no-scrollbar py-1 px-4 scroll-smooth ${className}`}
      role="tablist"
      aria-label="Filtro de zonas"
    >
      {zones.map((zone) => {
        const isActive = selectedZone === zone;
        return (
          <button
            key={zone}
            onClick={() => onSelectZone(zone)}
            type="button"
            className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-150 active:scale-95 select-none ${
              isActive
                ? 'bg-primary text-white shadow-sm ring-1 ring-primary'
                : 'bg-white border border-slate-200 text-textSecondary hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            {zone}
          </button>
        );
      })}
    </div>
  );
};
