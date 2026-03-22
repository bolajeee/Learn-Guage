import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Reusable card component for consistent layout
 * Used across lesson and quiz pages
 */
export const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div
      className={`
        rounded-3xl
        border border-white/70
        bg-white/90
        p-6
        shadow-soft
        backdrop-blur-sm
        ${className}
      `}
    >
      {children}
    </div>
  );
};
