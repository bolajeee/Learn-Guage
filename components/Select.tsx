import React from 'react';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: SelectOption[];
  error?: string;
}

/**
 * Reusable select component
 */
export const Select: React.FC<SelectProps> = ({
  label,
  options,
  error,
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
      <select
        className={`
          w-full
          px-4
          py-3
          rounded-2xl
          border
          border-border-color
          bg-white/85
          text-text-primary
          focus:outline-none
          focus:ring-2
          focus:ring-brand-blue/15
          focus:border-brand-blue
          transition-all
          cursor-pointer
          ${error ? 'border-red-500 focus:border-red-600' : ''}
          ${className}
        `}
        {...props}
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
    </div>
  );
};
