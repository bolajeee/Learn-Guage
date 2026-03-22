import React from 'react';

interface MetricCardProps {
  label: string;
  value: string;
  detail: string;
  accent?: 'blue' | 'cyan' | 'amber' | 'emerald';
}

const accentStyles: Record<NonNullable<MetricCardProps['accent']>, string> = {
  blue: 'from-brand-blue/15 to-brand-blue/5 text-brand-blue',
  cyan: 'from-brand-accent/15 to-brand-accent/5 text-brand-accent',
  amber: 'from-amber-400/15 to-amber-200/5 text-amber-700',
  emerald: 'from-emerald-500/15 to-emerald-200/5 text-emerald-700',
};

/**
 * Compact metric panel for high-signal product stats.
 */
export const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  detail,
  accent = 'blue',
}) => {
  return (
    <div className="rounded-3xl border border-white/70 bg-white/90 p-5 shadow-soft">
      <div className={`rounded-2xl bg-gradient-to-br p-5 ${accentStyles[accent]}`}>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] opacity-70">
          {label}
        </p>
        <p className="mt-3 break-words text-3xl font-semibold leading-tight text-current">
          {value}
        </p>
        <p className="mt-2 text-sm leading-6 opacity-70">{detail}</p>
      </div>
    </div>
  );
};
