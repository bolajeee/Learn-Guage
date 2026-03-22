'use client';

import { useState } from 'react';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { Select } from '@/components/Select';
import { Badge } from '@/components/ui/Badge';
import { PageHeader } from '@/components/ui/PageHeader';
import { isDemoMode } from '@/services/api';
import { useAppStore } from '@/store/useAppStore';
import type { DepthLevel, Language } from '@/types';

export default function SettingsPage() {
  const {
    depth,
    language,
    setDepth,
    setLanguage,
    reset,
    currentTopic,
    currentLesson,
    currentQuiz,
  } = useAppStore();
  const [practiceReminders, setPracticeReminders] = useState(true);
  const [emailDigest, setEmailDigest] = useState(false);

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Settings"
        title="Tune the learning workspace."
        description="Preferences update the global store immediately, which keeps the dashboard, lesson flow, and future pages aligned."
        status="These controls are intentionally lightweight so the core product remains easy to extend."
        action={
          <Badge tone={isDemoMode ? 'warning' : 'success'}>
            {isDemoMode ? 'Demo mode active' : 'Live API active'}
          </Badge>
        }
      />

      <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <Card className="space-y-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-text-secondary">
              Learning preferences
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-text-primary">
              Set the default experience
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Select
              label="Preferred depth"
              value={depth}
              onChange={event => setDepth(event.target.value as DepthLevel)}
              options={[
                { value: 'beginner', label: 'Beginner' },
                { value: 'intermediate', label: 'Intermediate' },
                { value: 'advanced', label: 'Advanced' },
              ]}
            />
            <Select
              label="Preferred language"
              value={language}
              onChange={event => setLanguage(event.target.value as Language)}
              options={[
                { value: 'English', label: 'English' },
                { value: 'French', label: 'French' },
                { value: 'Spanish', label: 'Spanish' },
              ]}
            />
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            {[
              {
                title: 'Practice reminders',
                value: practiceReminders,
                setter: setPracticeReminders,
                detail: 'Nudge the learner to revisit a lesson.',
              },
              {
                title: 'Email digest',
                value: emailDigest,
                setter: setEmailDigest,
                detail: 'Receive a lightweight weekly summary.',
              },
            ].map(item => (
              <button
                key={item.title}
                type="button"
                onClick={() => item.setter(value => !value)}
                className={`rounded-2xl border px-4 py-4 text-left transition-all ${
                  item.value
                    ? 'border-brand-blue bg-brand-blue/5'
                    : 'border-border-color bg-white'
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-text-primary">{item.title}</p>
                  <Badge tone={item.value ? 'success' : 'muted'}>
                    {item.value ? 'On' : 'Off'}
                  </Badge>
                </div>
                <p className="mt-2 text-sm leading-6 text-text-secondary">
                  {item.detail}
                </p>
              </button>
            ))}
          </div>
        </Card>

        <div className="space-y-6">
          <Card>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-text-secondary">
              Workspace status
            </p>
            <div className="mt-4 space-y-3 text-sm text-text-primary">
              <div className="rounded-2xl bg-surface-muted px-4 py-3">
                Current topic: {currentTopic.trim() || 'None selected'}
              </div>
              <div className="rounded-2xl bg-surface-muted px-4 py-3">
                Lesson loaded: {currentLesson ? 'Yes' : 'No'}
              </div>
              <div className="rounded-2xl bg-surface-muted px-4 py-3">
                Quiz loaded: {currentQuiz ? 'Yes' : 'No'}
              </div>
            </div>
          </Card>

          <Card className="space-y-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-text-secondary">
                Reset controls
              </p>
              <h2 className="mt-2 text-xl font-semibold text-text-primary">
                Clear the workspace when needed
              </h2>
            </div>
            <p className="text-sm leading-6 text-text-secondary">
              Resetting the app clears the active topic, lesson, quiz, answers, and
              score state, which is useful when handing the app to another learner.
            </p>
            <Button variant="secondary" onClick={reset} fullWidth>
              Reset workspace
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
