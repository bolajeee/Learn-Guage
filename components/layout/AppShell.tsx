'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useMemo, useState } from 'react';
import { Badge } from '@/components/ui/Badge';
import { isDemoMode } from '@/services/api';

interface NavItem {
  label: string;
  href: string;
  description: string;
  status?: 'live' | 'soon';
}

const primaryNav: NavItem[] = [
  {
    label: 'Overview',
    href: '/',
    description: 'Landing and product snapshot',
    status: 'live',
  },
  {
    label: 'Dashboard',
    href: '/dashboard',
    description: 'Create lessons and quizzes',
    status: 'live',
  },
  {
    label: 'Lesson',
    href: '/lesson',
    description: 'Read generated explanations',
    status: 'live',
  },
  {
    label: 'Quiz',
    href: '/quiz',
    description: 'Practice and measure retention',
    status: 'live',
  },
  {
    label: 'Progress',
    href: '/progress',
    description: 'Review learning momentum',
    status: 'live',
  },
  {
    label: 'Resources',
    href: '/resources',
    description: 'Study kits and saved assets',
    status: 'live',
  },
  {
    label: 'Profile',
    href: '/profile',
    description: 'Learner identity and goals',
    status: 'live',
  },
  {
    label: 'Settings',
    href: '/settings',
    description: 'Adjust learning preferences',
    status: 'live',
  },
  {
    label: 'Contact',
    href: '/contact',
    description: 'Support and feedback',
    status: 'live',
  },
];

const comingSoonNav: NavItem[] = [
  {
    label: 'Community',
    href: '/community',
    description: 'Shared study rooms and discussion',
    status: 'soon',
  },
  {
    label: 'AI Coach',
    href: '/coach',
    description: 'Adaptive study guidance',
    status: 'soon',
  },
  {
    label: 'Certificates',
    href: '/certificates',
    description: 'Shareable proof of progress',
    status: 'soon',
  },
  {
    label: 'Saved Lessons',
    href: '/saved',
    description: 'Bookmark and revisit lessons',
    status: 'soon',
  },
];

function isActivePath(pathname: string, href: string) {
  if (href === '/') {
    return pathname === '/';
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

/**
 * Application shell with a persistent sidebar and responsive top bar.
 */
export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const currentNavItem = useMemo(() => {
    return [...primaryNav, ...comingSoonNav].find(item =>
      isActivePath(pathname, item.href)
    );
  }, [pathname]);

  return (
    <div className="min-h-screen text-text-primary">
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[-10%] top-[-8%] h-80 w-80 rounded-full bg-brand-blue/10 blur-3xl" />
        <div className="absolute right-[-5%] top-[12%] h-72 w-72 rounded-full bg-brand-accent/10 blur-3xl" />
        <div className="absolute bottom-[-12%] left-[25%] h-80 w-80 rounded-full bg-amber-200/20 blur-3xl" />
      </div>

      <div className="mx-auto flex min-h-screen max-w-[1680px]">
        <aside className="hidden w-80 shrink-0 border-r border-white/70 bg-white/65 px-6 py-8 backdrop-blur-xl lg:flex lg:flex-col">
          <div className="space-y-8">
            <Link href="/" className="block">
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-blue">
                  Learn Gauge
                </p>
                <h1 className="text-2xl font-semibold tracking-tight text-text-primary">
                  AI STEM Tutor
                </h1>
                <p className="text-sm leading-6 text-text-secondary">
                  Structured learning tools with a polished workspace for lessons,
                  quizzes, and student progress.
                </p>
              </div>
            </Link>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-text-secondary">
                  Workspace
                </p>
                <Badge tone={isDemoMode ? 'warning' : 'success'}>
                  {isDemoMode ? 'Demo mode' : 'Live API'}
                </Badge>
              </div>
              <nav className="space-y-2">
                {primaryNav.map(item => {
                  const active = isActivePath(pathname, item.href);

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`
                        group block rounded-2xl px-4 py-3 transition-all
                        ${active ? 'bg-brand-blue text-white shadow-glow' : 'hover:bg-white/80'}
                      `}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <p
                            className={`text-sm font-semibold ${
                              active ? 'text-white' : 'text-text-primary'
                            }`}
                          >
                            {item.label}
                          </p>
                          <p
                            className={`mt-1 text-xs leading-5 ${
                              active ? 'text-white/80' : 'text-text-secondary'
                            }`}
                          >
                            {item.description}
                          </p>
                        </div>
                        {item.status && (
                          <Badge
                            tone={active ? 'accent' : 'muted'}
                            className={
                              active ? 'bg-white/15 text-white ring-white/20' : ''
                            }
                          >
                            {item.status}
                          </Badge>
                        )}
                      </div>
                    </Link>
                  );
                })}
              </nav>
            </div>

            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-text-secondary">
                Coming soon
              </p>
              <div className="space-y-2">
                {comingSoonNav.map(item => {
                  const active = isActivePath(pathname, item.href);

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`
                        block rounded-2xl px-4 py-3 transition-all border
                        ${
                          active
                            ? 'border-brand-blue/30 bg-brand-blue/5'
                            : 'border-transparent hover:border-border-color hover:bg-white/75'
                        }
                      `}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <p className="text-sm font-semibold text-text-primary">
                            {item.label}
                          </p>
                          <p className="mt-1 text-xs leading-5 text-text-secondary">
                            {item.description}
                          </p>
                        </div>
                        <Badge tone="warning">soon</Badge>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="mt-auto space-y-4 pt-8">
            <div className="rounded-3xl border border-brand-blue/10 bg-brand-blue/5 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-blue">
                Session
              </p>
              <p className="mt-3 text-sm leading-6 text-text-primary">
                {currentNavItem?.label ?? 'Workspace'}
              </p>
              <p className="mt-1 text-sm leading-6 text-text-secondary">
                Keep the interface polished and the learning flow predictable.
              </p>
            </div>

            <Link href="/contact" className="block">
              <div className="rounded-3xl bg-brand-ink px-5 py-4 text-white shadow-soft">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/60">
                  Need help?
                </p>
                <p className="mt-2 text-sm leading-6 text-white/90">
                  Open the contact page for support, feedback, or product requests.
                </p>
              </div>
            </Link>
          </div>
        </aside>

        <div className="flex min-h-screen flex-1 flex-col">
          <header className="sticky top-0 z-20 border-b border-white/70 bg-white/75 backdrop-blur-xl">
            <div className="flex items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setMobileOpen(open => !open)}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-border-color bg-white/80 text-text-primary shadow-sm lg:hidden"
                  aria-label="Toggle navigation menu"
                >
                  {mobileOpen ? (
                    <span className="text-xl leading-none">Close</span>
                  ) : (
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="h-5 w-5"
                    >
                      <path
                        d="M4 7h16M4 12h16M4 17h16"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                      />
                    </svg>
                  )}
                </button>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-text-secondary">
                    {currentNavItem?.label ?? 'Learn Gauge'}
                  </p>
                  <p className="text-sm text-text-primary">
                    {currentNavItem?.description ??
                      'AI STEM Tutor workspace with a refined product shell.'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Badge tone={isDemoMode ? 'warning' : 'success'}>
                  {isDemoMode ? 'Demo ready' : 'Backend live'}
                </Badge>
                <Link
                  href="/profile"
                  className="flex h-11 items-center gap-3 rounded-full border border-border-color bg-white/80 px-4 pr-5 shadow-sm"
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-blue text-xs font-semibold text-white">
                    LG
                  </span>
                  <span className="hidden text-sm font-medium text-text-primary sm:block">
                    Profile
                  </span>
                </Link>
              </div>
            </div>
          </header>

          <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
            <div className="mx-auto w-full max-w-7xl">{children}</div>
          </main>
        </div>
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 z-30 bg-brand-ink/45 backdrop-blur-sm lg:hidden">
          <div className="absolute inset-y-0 left-0 w-[88%] max-w-sm border-r border-white/70 bg-white px-5 py-6 shadow-soft">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-blue">
                  Learn Gauge
                </p>
                <p className="mt-1 text-lg font-semibold text-text-primary">
                  Workspace menu
                </p>
              </div>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="rounded-full border border-border-color px-3 py-2 text-sm font-medium text-text-primary"
              >
                Close
              </button>
            </div>

            <div className="mt-6 space-y-5">
              <div className="space-y-2">
                {primaryNav.map(item => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block rounded-2xl border border-border-color px-4 py-3"
                  >
                    <p className="text-sm font-semibold text-text-primary">
                      {item.label}
                    </p>
                    <p className="mt-1 text-xs leading-5 text-text-secondary">
                      {item.description}
                    </p>
                  </Link>
                ))}
              </div>

              <div className="space-y-2">
                {comingSoonNav.map(item => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block rounded-2xl border border-dashed border-border-color px-4 py-3"
                  >
                    <p className="text-sm font-semibold text-text-primary">
                      {item.label}
                    </p>
                    <p className="mt-1 text-xs leading-5 text-text-secondary">
                      {item.description}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
