'use client';

import { Card } from '@/components/Card';
import { Badge } from '@/components/ui/Badge';
import { MetricCard } from '@/components/ui/MetricCard';
import { PageHeader } from '@/components/ui/PageHeader';
import { useAppStore } from '@/store/useAppStore';

const milestones = [
  {
    label: 'Lesson built',
    detail: 'Turns a topic into an explainable structure.',
    value: 92,
  },
  {
    label: 'Quiz accuracy',
    detail: 'Measures recall after the explanation phase.',
    value: 78,
  },
  {
    label: 'Consistency',
    detail: 'How regularly the learner returns to the app.',
    value: 64,
  },
  {
    label: 'Confidence',
    detail: 'A soft signal based on recent performance.',
    value: 84,
  },
];

export default function ProgressPage() {
  const { currentTopic, lastQuizResult, currentLesson } = useAppStore();

  const latestScore = lastQuizResult?.score ?? 0;

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Progress"
        title="See the learning momentum."
        description="The progress surface turns recent activity into a readable summary so the learner can tell whether the flow is working."
        status="This page is mostly static for now, but it already feels like a proper product dashboard."
        action={<Badge tone="primary">Analytics preview</Badge>}
      />

      <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <div className="space-y-6">
          <MetricCard
            label="Latest quiz score"
            value={`${latestScore}%`}
            detail="The most recent quiz result is surfaced here for quick review."
            accent="emerald"
          />
          <MetricCard
            label="Active topic"
            value={currentTopic.trim() || 'No topic yet'}
            detail="The tracker follows the current topic that the learner is studying."
            accent="blue"
          />
        </div>

        <Card className="space-y-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-text-secondary">
              Learning profile
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-text-primary">
              Progress indicators at a glance
            </h2>
          </div>

          <div className="space-y-4">
            {milestones.map(item => (
              <div key={item.label} className="rounded-2xl bg-surface-muted p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-text-primary">
                      {item.label}
                    </p>
                    <p className="mt-1 text-sm leading-6 text-text-secondary">
                      {item.detail}
                    </p>
                  </div>
                  <Badge tone={item.value >= 80 ? 'success' : 'muted'}>
                    {item.value}%
                  </Badge>
                </div>
                <div className="mt-4 h-2 rounded-full bg-white">
                  <div
                    className="h-2 rounded-full bg-brand-blue"
                    style={{ width: `${item.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-text-secondary">
            Lesson state
          </p>
          <p className="mt-3 text-2xl font-semibold text-text-primary">
            {currentLesson ? 'Ready' : 'Awaiting lesson'}
          </p>
          <p className="mt-2 text-sm leading-6 text-text-secondary">
            The lesson surface makes it easy to see whether a topic has been built.
          </p>
        </Card>
        <Card>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-text-secondary">
            Quiz state
          </p>
          <p className="mt-3 text-2xl font-semibold text-text-primary">
            {lastQuizResult ? 'Scored' : 'Not yet scored'}
          </p>
          <p className="mt-2 text-sm leading-6 text-text-secondary">
            A score summary appears right after submission in the quiz flow.
          </p>
        </Card>
        <Card>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-text-secondary">
            Next action
          </p>
          <p className="mt-3 text-2xl font-semibold text-text-primary">
            Generate again
          </p>
          <p className="mt-2 text-sm leading-6 text-text-secondary">
            Returning to the dashboard refreshes the lesson and keeps the cycle moving.
          </p>
        </Card>
      </div>
    </div>
  );
}
