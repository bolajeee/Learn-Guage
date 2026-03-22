import Link from 'next/link';
import React from 'react';
import { Badge } from './Badge';
import { Card } from '@/components/Card';

interface PlaceholderPageProps {
  title: string;
  description: string;
  status?: string;
  highlights?: string[];
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
}

/**
 * Standardized placeholder screen for features that are planned but not live.
 */
export const PlaceholderPage: React.FC<PlaceholderPageProps> = ({
  title,
  description,
  status = 'Coming soon',
  highlights = [],
  primaryHref = '/dashboard',
  primaryLabel = 'Back to Dashboard',
  secondaryHref = '/contact',
  secondaryLabel = 'Request access',
}) => {
  return (
    <div className="space-y-6">
      <Card className="overflow-hidden">
        <div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">
          <div className="space-y-4">
            <Badge tone="warning">{status}</Badge>
            <div className="space-y-3">
              <h1 className="text-3xl font-semibold tracking-tight text-text-primary sm:text-4xl">
                {title}
              </h1>
              <p className="max-w-2xl text-sm leading-6 text-text-secondary sm:text-base">
                {description}
              </p>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                href={primaryHref}
                className="inline-flex items-center justify-center rounded-full bg-brand-blue px-5 py-3 font-medium text-white shadow-glow transition-colors hover:bg-[#16357d]"
              >
                {primaryLabel}
              </Link>
              <Link
                href={secondaryHref}
                className="inline-flex items-center justify-center rounded-full border border-border-color bg-white px-5 py-3 font-medium text-text-primary transition-colors hover:bg-surface-muted"
              >
                {secondaryLabel}
              </Link>
            </div>
          </div>

          <div className="rounded-3xl bg-surface-muted p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-text-secondary">
              Planned highlights
            </p>
            <ul className="mt-4 space-y-3 text-sm text-text-primary">
              {highlights.map(highlight => (
                <li
                  key={highlight}
                  className="rounded-2xl bg-white/80 px-4 py-3 shadow-sm"
                >
                  {highlight}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
};
