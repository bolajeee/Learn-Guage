'use client';

import Link from 'next/link';
import { Card } from '@/components/Card';
import { Badge } from '@/components/ui/Badge';
import { MetricCard } from '@/components/ui/MetricCard';
import { PageHeader } from '@/components/ui/PageHeader';
import { useAppStore } from '@/store/useAppStore';

const achievements = [
  'Lesson builder',
  'Quiz finisher',
  'Topic explorer',
  'Progress tracker',
];

export default function ProfilePage() {
  const { currentTopic, depth, language, lastQuizResult, currentLesson } =
    useAppStore();

  const latestScore = lastQuizResult?.score ?? 0;

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Profile"
        title="A clearer learner identity."
        description="This page makes the workspace feel personal with a profile summary, current goals, and the most recent learning activity."
        status="No backend profile API is required yet, but the layout is ready for it."
        action={<Badge tone="primary">Learning profile</Badge>}
      />

      <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <Card className="space-y-6">
          <div className="flex items-start gap-5">
            <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-brand-blue text-2xl font-semibold text-white shadow-glow">
              LG
            </div>
            <div className="flex-1 space-y-3">
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="text-2xl font-semibold text-text-primary">
                  Learn Gauge student
                </h2>
                <Badge tone="success">Active</Badge>
              </div>
              <p className="text-sm leading-6 text-text-secondary">
                The profile adapts as the learner generates lessons, completes
                quizzes, and revisits topics.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge tone="muted">{depth}</Badge>
                <Badge tone="muted">{language}</Badge>
                <Badge tone="accent">{currentTopic.trim() || 'No active topic'}</Badge>
              </div>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl bg-surface-muted p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-text-secondary">
                Learning goal
              </p>
              <p className="mt-2 text-sm leading-6 text-text-primary">
                Build confidence in STEM topics through short lesson cycles and
                immediate quiz feedback.
              </p>
            </div>
            <div className="rounded-2xl bg-surface-muted p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-text-secondary">
                Current module
              </p>
              <p className="mt-2 text-sm leading-6 text-text-primary">
                {currentLesson?.coreConcept || 'No lesson generated yet.'}
              </p>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-semibold text-text-primary">
                Profile completeness
              </p>
              <span className="text-sm font-medium text-brand-blue">78%</span>
            </div>
            <div className="mt-3 h-3 rounded-full bg-surface-muted">
              <div className="h-3 w-[78%] rounded-full bg-brand-blue" />
            </div>
            <p className="mt-3 text-sm leading-6 text-text-secondary">
              Once a saved profile API exists, this can track preferences, goals,
              and completion history automatically.
            </p>
          </div>
        </Card>

        <div className="space-y-6">
          <MetricCard
            label="Recent score"
            value={`${latestScore}%`}
            detail="Latest quiz result from the current session."
            accent="emerald"
          />
          <MetricCard
            label="Learning depth"
            value={depth}
            detail="This preference follows the learner across the app."
            accent="blue"
          />

          <Card>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-text-secondary">
              Achievements
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {achievements.map(item => (
                <div
                  key={item}
                  className="rounded-2xl border border-border-color bg-white px-4 py-4 text-sm font-medium text-text-primary"
                >
                  {item}
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-text-secondary">
              Activity
            </p>
            <div className="mt-4 space-y-3 text-sm leading-6 text-text-primary">
              <div className="rounded-2xl bg-surface-muted px-4 py-3">
                Generated a lesson on {currentTopic.trim() || 'a new topic'}.
              </div>
              <div className="rounded-2xl bg-surface-muted px-4 py-3">
                Prepared a quiz with {currentLesson ? 'structured sections' : 'no lesson yet'}.
              </div>
              <div className="rounded-2xl bg-surface-muted px-4 py-3">
                Completed {lastQuizResult ? 'a scored review session.' : 'the profile shell.'}
              </div>
            </div>
          </Card>

          <Link
            href="/contact"
            className="inline-flex w-full items-center justify-center rounded-full border border-border-color bg-white px-5 py-3 font-medium text-text-primary transition-colors hover:bg-surface-muted"
          >
            Update your profile with support
          </Link>
        </div>
      </div>
    </div>
  );
}
