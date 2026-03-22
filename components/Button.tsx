import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  isLoading?: boolean;
  fullWidth?: boolean;
}

/**
 * Reusable button component
 * Supports primary and secondary variants with loading state
 */
export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  isLoading = false,
  fullWidth = false,
  disabled = false,
  className = '',
  ...props
}) => {
  const baseStyles =
    'px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2';

  const variantStyles = {
    primary: `
      bg-brand-blue
      text-white
      hover:bg-blue-700
      active:bg-blue-800
      disabled:bg-gray-300
      disabled:cursor-not-allowed
    `,
    secondary: `
      bg-bg-secondary
      text-text-primary
      border border-border-color
      hover:bg-gray-100
      active:bg-gray-200
      disabled:opacity-50
      disabled:cursor-not-allowed
    `,
  };

  const widthStyle = fullWidth ? 'w-full' : '';
  const disabledState = disabled || isLoading;

  return (
    <button
      disabled={disabledState}
      className={`
        ${baseStyles}
        ${variantStyles[variant]}
        ${widthStyle}
        ${className}
      `}
      {...props}
    >
      {isLoading && (
        <svg
          className="animate-spin h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {children}
    </button>
  );
};
