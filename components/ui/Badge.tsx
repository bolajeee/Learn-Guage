import React from 'react';

type BadgeTone = 'primary' | 'accent' | 'muted' | 'success' | 'warning';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone;
}

const toneStyles: Record<BadgeTone, string> = {
  primary: 'bg-brand-blue/10 text-brand-blue ring-brand-blue/10',
  accent: 'bg-brand-accent/10 text-brand-accent ring-brand-accent/10',
  muted: 'bg-slate-100 text-slate-700 ring-slate-200',
  success: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  warning: 'bg-amber-50 text-amber-700 ring-amber-200',
};

/**
 * Rounded status badge for compact UI labels.
 */
export const Badge: React.FC<BadgeProps> = ({
  children,
  tone = 'muted',
  className = '',
  ...props
}) => {
  return (
    <span
      className={`
        inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold
        tracking-wide ring-1 ring-inset ${toneStyles[tone]} ${className}
      `}
      {...props}
    >
      {children}
    </span>
  );
};
