import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingProps {
  text?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const Loading: React.FC<LoadingProps> = ({ 
  text = 'Loading...', 
  size = 'md' 
}) => {
  const sizeStyles = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  return (
    <div className="flex items-center justify-center p-8">
      <div className="text-center">
        <Loader2 className={`${sizeStyles[size]} animate-spin mx-auto text-purple-500 mb-2`} />
        <p className="text-gray-400 text-sm">{text}</p>
      </div>
    </div>
  );
};