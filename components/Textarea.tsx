import React from 'react';

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

/**
 * Reusable textarea component for longer form input.
 */
export const Textarea: React.FC<TextareaProps> = ({
  label,
  error,
  helperText,
  className = '',
  rows = 5,
  ...props
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-text-primary mb-2">
          {label}
        </label>
      )}
      <textarea
        rows={rows}
        className={`
          w-full
          px-4
          py-3
          rounded-2xl
          border
          border-border-color
          bg-white/85
          text-text-primary
          placeholder:text-text-secondary
          focus:outline-none
          focus:ring-2
          focus:ring-brand-blue/15
          focus:border-brand-blue
          transition-all
          resize-y
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
