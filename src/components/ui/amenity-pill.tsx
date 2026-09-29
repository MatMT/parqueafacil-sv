import React from 'react';
import { ShieldCheck, Camera, Lock, Zap, CheckCircle2 } from 'lucide-react';

export interface AmenityPillProps {
  iconType: 'shield' | 'camera' | 'gate' | 'ev' | 'maneuver' | 'covered';
  label: string;
  className?: string;
}

export const AmenityPill: React.FC<AmenityPillProps> = ({
  iconType,
  label,
  className = '',
}) => {
  const getIcon = () => {
    switch (iconType) {
      case 'shield':
        return <ShieldCheck className="w-4 h-4 text-emerald-600" />;
      case 'camera':
        return <Camera className="w-4 h-4 text-secondary-dark" />;
      case 'gate':
        return <Lock className="w-4 h-4 text-primary" />;
      case 'ev':
        return <Zap className="w-4 h-4 text-amber-500" />;
      case 'covered':
      case 'maneuver':
      default:
        return <CheckCircle2 className="w-4 h-4 text-primary" />;
    }
  };

  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-50 border border-slate-100 text-xs font-medium text-slate-800 ${className}`}
    >
      <span className="shrink-0">{getIcon()}</span>
      <span>{label}</span>
    </div>
  );
};
