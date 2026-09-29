import React from 'react';
import { Loader2 } from 'lucide-react';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'accent' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  className = '',
  disabled,
  type = 'button',
  ...props
}) => {
  const baseStyles =
    'relative inline-flex items-center justify-center font-medium select-none cursor-pointer transition-all duration-150 ease-out active:scale-[0.97] focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100';

  const variantStyles = {
    // Amarillo Intenso con texto oscuro Navy Blue para contraste impecable
    accent:
      'bg-accent text-primary font-bold hover:bg-accent-hover shadow-sm active:bg-[#e0cc00]',
    // Navy Blue institucional
    primary:
      'bg-primary text-white hover:bg-primary-hover shadow-sm active:bg-[#001745]',
    // Light Blue
    secondary:
      'bg-secondary text-white hover:bg-secondary-dark active:bg-secondary-dark',
    // Outline con borde Navy Blue
    outline:
      'border-2 border-primary text-primary bg-white hover:bg-slate-50 active:bg-slate-100',
    // Ghost
    ghost:
      'text-textSecondary hover:text-primary hover:bg-slate-100 active:bg-slate-200',
  };

  const sizeStyles = {
    sm: 'text-xs px-3 py-1.5 rounded-xl gap-1.5 h-8',
    md: 'text-sm px-4 py-2.5 rounded-2xl gap-2 h-11',
    lg: 'text-base px-6 py-3.5 rounded-2xl gap-2.5 h-13 font-semibold',
  };

  const widthStyle = fullWidth ? 'w-full' : '';

  return (
    <button
      type={type}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyle} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-5 h-5 animate-spin" />
      ) : (
        <>
          {leftIcon && <span className="shrink-0">{leftIcon}</span>}
          <span>{children}</span>
          {rightIcon && <span className="shrink-0">{rightIcon}</span>}
        </>
      )}
    </button>
  );
};
