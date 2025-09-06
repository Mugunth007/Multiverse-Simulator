import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  gradient?: boolean;
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  hover = false, 
  gradient = false 
}) => {
  const baseStyles = 'rounded-2xl border border-gray-800/50 shadow-apple backdrop-blur-sm transition-all duration-300';
  const backgroundStyles = gradient 
    ? 'bg-gradient-to-br from-gray-900/80 via-gray-850/80 to-gray-900/80' 
    : 'bg-gray-900/80';
  const hoverStyles = hover 
    ? 'hover:border-blue-500/30 hover:shadow-apple-lg hover:bg-gray-850/80 hover:-translate-y-0.5' 
    : '';
  
  return (
    <div className={`${baseStyles} ${backgroundStyles} ${hoverStyles} ${className}`}>
      {children}
    </div>
  );
};