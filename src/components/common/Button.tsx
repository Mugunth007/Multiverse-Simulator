import React from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  icon,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-950 disabled:opacity-50 disabled:cursor-not-allowed select-none';
  
  const variantStyles = {
    primary: 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white shadow-apple hover:shadow-apple-lg focus:ring-blue-500/50 font-medium',
    secondary: 'bg-gray-850 hover:bg-gray-800 active:bg-gray-700 text-white border border-gray-700/50 hover:border-gray-600/50 focus:ring-gray-500/50 font-medium',
    ghost: 'text-gray-400 hover:text-white hover:bg-gray-850/50 active:bg-gray-800/50 focus:ring-gray-500/50 font-medium'
  };
  
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm h-8',
    md: 'px-4 py-2 text-sm h-10',
    lg: 'px-6 py-3 text-base h-12'
  };
  
  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <Loader2 className="w-4 h-4 animate-spin mr-2" />
      ) : icon ? (
        <span className="mr-2">{icon}</span>
      ) : null}
      {children}
    </button>
  );
};