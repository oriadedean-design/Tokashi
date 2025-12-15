import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className = '', hoverEffect = false }) => {
  return (
    <div className={`glass-card rounded-3xl p-6 ${hoverEffect ? 'hover:bg-white/5 transition-colors duration-500' : ''} ${className}`}>
      {children}
    </div>
  );
};
