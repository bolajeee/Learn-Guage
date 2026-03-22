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
        bg-white
        rounded-lg
        border border-border-color
        p-6
        shadow-sm
        ${className}
      `}
    >
      {children}
    </div>
  );
};
