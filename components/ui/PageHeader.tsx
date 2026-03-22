import React from 'react';
import { Badge } from './Badge';

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description: string;
  action?: React.ReactNode;
  status?: string;
  tone?: 'primary' | 'accent' | 'muted' | 'success' | 'warning';
}

/**
 * Shared page header used across the workspace.
 */
export const PageHeader: React.FC<PageHeaderProps> = ({
  eyebrow,
  title,
  description,
  action,
  status,
  tone = 'primary',
}) => {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
      <div className="space-y-3">
        {eyebrow && <Badge tone={tone}>{eyebrow}</Badge>}
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight text-text-primary sm:text-4xl">
            {title}
          </h1>
          <p className="max-w-3xl text-sm leading-6 text-text-secondary sm:text-base">
            {description}
          </p>
        </div>
        {status && <p className="text-sm font-medium text-brand-blue">{status}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
};
