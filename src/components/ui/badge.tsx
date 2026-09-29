import React from 'react';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'accent' | 'success' | 'outline' | 'neutral';
  size?: 'sm' | 'md';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'secondary',
  size = 'md',
  className = '',
}) => {
  const variantStyles = {
    primary: 'bg-primary text-white',
    secondary: 'bg-secondary-light text-primary font-medium',
    accent: 'bg-accent text-primary font-bold shadow-sm',
    success: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
    outline: 'border border-slate-200 text-textSecondary bg-white',
    neutral: 'bg-slate-100 text-slate-700',
  };

  const sizeStyles = {
    sm: 'text-[11px] px-2 py-0.5 rounded-full',
    md: 'text-xs px-2.5 py-1 rounded-full',
  };

  return (
    <span
      className={`inline-flex items-center gap-1 font-sans tracking-tight transition-colors duration-150 ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {children}
    </span>
  );
};
