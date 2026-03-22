import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

/**
 * Reusable input component with validation styling
 */
export const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  className = '',
  ...props
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-text-primary mb-2">
          {label}
        </label>
      )}
      <input
        className={`
          w-full
          px-4
          py-3
          rounded-lg
          border-2
          border-border-color
          text-text-primary
          placeholder-text-secondary
          focus:outline-none
          focus:border-brand-blue
          transition-colors
          ${error ? 'border-red-500 focus:border-red-600' : ''}
          ${className}
        `}
        {...props}
      />
      {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
      {helperText && !error && (
        <p className="text-text-secondary text-sm mt-1">{helperText}</p>
      )}
    </div>
  );
};
