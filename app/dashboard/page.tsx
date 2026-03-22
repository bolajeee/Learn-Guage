'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { Input } from '@/components/Input';
import { Select } from '@/components/Select';
import { Badge } from '@/components/ui/Badge';
import { MetricCard } from '@/components/ui/MetricCard';
import { PageHeader } from '@/components/ui/PageHeader';
import { generateLesson, isDemoMode } from '@/services/api';
import { useAppStore } from '@/store/useAppStore';
import type { DepthLevel, Language } from '@/types';

const topicSuggestions = [
  'Photosynthesis',
  "Newton's laws",
  'Fractions',
  'Human digestion',
  'Cell division',
  'Probability',
];

const learningSteps = [
  'Enter a topic you want the tutor to explain.',
  'Select the depth and language that match the learner.',
  'Generate a lesson and move directly into the quiz.',
];

export default function DashboardPage() {
  const router = useRouter();
  const {
    currentTopic,
    setCurrentTopic,
    depth,
    setDepth,
    language,
    setLanguage,
    isLoading,
    setIsLoading,
    error: storeError,
    setError,
    setCurrentLesson,
  } = useAppStore();
  const [validationError, setValidationError] = useState('');

  const handleGenerateLesson = async () => {
    const topic = currentTopic.trim();

    setValidationError('');
    setError(null);

    if (!topic) {
      setValidationError('Please enter a topic before generating a lesson.');
      return;
    }

    if (topic.length < 2) {
      setValidationError('The topic should be at least two characters long.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await generateLesson({
        topic,
        depth: depth as DepthLevel,
        language: language as Language,
      });

      if (response.success && response.data) {
        setCurrentLesson(response.data);
        router.push('/lesson');
        return;
      }

      setError(response.error || 'Failed to generate lesson.');
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'An unexpected error occurred.';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const hasTopic = currentTopic.trim().length > 0;

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Dashboard"
        title="Shape the next lesson."
        description="This is the control center for the AI tutor. Pick a topic, set the learning depth, and generate a lesson that flows into a quiz."
        status={
          isDemoMode
            ? 'Demo mode is active, so content returns from the local mock layer.'
            : 'Connected to the live API service.'
        }
        action={
          <div className="flex flex-wrap gap-3">
            <Badge tone={isDemoMode ? 'warning' : 'success'}>
              {isDemoMode ? 'Mock content' : 'Live API'}
            </Badge>
            <Link
              href="/settings"
              className="inline-flex items-center justify-center rounded-full border border-border-color bg-white px-4 py-2 text-sm font-medium text-text-primary transition-colors hover:bg-surface-muted"
            >
              Open settings
            </Link>
          </div>
        }
      />

      <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <Card className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <Input
              label="Topic"
              type="text"
              placeholder="e.g. Photosynthesis, fractions, or Newton's laws"
              value={currentTopic}
              onChange={event => setCurrentTopic(event.target.value)}
              disabled={isLoading}
              error={validationError}
            />
            <Select
              label="Language"
              value={language}
              onChange={event => setLanguage(event.target.value as Language)}
              options={[
                { value: 'English', label: 'English' },
                { value: 'French', label: 'French' },
                { value: 'Spanish', label: 'Spanish' },
              ]}
              disabled={isLoading}
            />
            <Select
              label="Depth"
              value={depth}
              onChange={event => setDepth(event.target.value as DepthLevel)}
              options={[
                { value: 'beginner', label: 'Beginner' },
                { value: 'intermediate', label: 'Intermediate' },
                { value: 'advanced', label: 'Advanced' },
              ]}
              disabled={isLoading}
            />
            <div className="rounded-2xl border border-border-color bg-surface-muted p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-text-secondary">
                Quick helper
              </p>
              <p className="mt-2 text-sm leading-6 text-text-primary">
                The tutor will build a lesson around your topic, then hand off to a
                quiz with the same learning context.
              </p>
            </div>
          </div>

          {validationError && (
            <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
              {validationError}
            </div>
          )}

          {storeError && (
            <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
              {storeError}
            </div>
          )}

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              onClick={handleGenerateLesson}
              isLoading={isLoading}
              disabled={!hasTopic}
              fullWidth
            >
              {isLoading ? 'Generating lesson...' : 'Generate lesson'}
            </Button>
            <Link
              href="/resources"
              className="inline-flex items-center justify-center rounded-full border border-border-color bg-white px-5 py-3 font-medium text-text-primary transition-colors hover:bg-surface-muted"
            >
              Browse resources
            </Link>
          </div>
        </Card>

        <div className="space-y-6">
          <MetricCard
            label="Session state"
            value={hasTopic ? 'Ready to generate' : 'Waiting for a topic'}
            detail={`Depth: ${depth} | Language: ${language}`}
            accent="blue"
          />

          <Card>
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-text-secondary">
                  Suggested topics
                </p>
                <h2 className="mt-2 text-xl font-semibold text-text-primary">
                  Start with a ready-made idea
                </h2>
              </div>
              <Badge tone="accent">Fast start</Badge>
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
              {topicSuggestions.map(topic => (
                <button
                  key={topic}
                  type="button"
                  onClick={() => setCurrentTopic(topic)}
                  className="rounded-full border border-border-color bg-surface-muted px-4 py-2 text-sm font-medium text-text-primary transition-colors hover:bg-white"
                  disabled={isLoading}
                >
                  {topic}
                </button>
              ))}
            </div>
          </Card>

          <Card>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-text-secondary">
              Learning flow
            </p>
            <div className="mt-4 space-y-3">
              {learningSteps.map((step, index) => (
                <div
                  key={step}
                  className="flex items-start gap-4 rounded-2xl bg-surface-muted px-4 py-4"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-blue text-sm font-semibold text-white">
                    {index + 1}
                  </span>
                  <p className="text-sm leading-6 text-text-primary">{step}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
