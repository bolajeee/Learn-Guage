'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/store/useAppStore';
import { generateLesson } from '@/services/api';
import { Input } from '@/components/Input';
import { Select } from '@/components/Select';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import type { DepthLevel, Language } from '@/types';

/**
 * Dashboard Page
 * Entry point for the AI learning platform
 * Users input their learning topic, depth level, and language preference
 */
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

  const [validationError, setValidationError] = useState<string>('');

  /**
   * Validate input and generate lesson
   */
  const handleGenerateLesson = async () => {
    setValidationError('');
    setError(null);

    // Validation
    if (!currentTopic.trim()) {
      setValidationError('Please enter a topic');
      return;
    }

    if (currentTopic.trim().length < 2) {
      setValidationError('Topic must be at least 2 characters');
      return;
    }

    setIsLoading(true);

    try {
      const response = await generateLesson({
        topic: currentTopic,
        depth: depth as DepthLevel,
        language: language as Language,
      });

      if (response.success && response.data) {
        setCurrentLesson(response.data);
        router.push('/lesson');
      } else {
        setError(response.error || 'Failed to generate lesson');
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handle Enter key press
   */
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isLoading) {
      handleGenerateLesson();
    }
  };

  return (
    <div className="min-h-screen bg-bg-primary flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-text-primary mb-2">
            Learn Anything
          </h1>
          <p className="text-text-secondary">
            Get personalized lessons powered by AI
          </p>
        </div>

        <div className="space-y-6">
          {/* Topic Input */}
          <Input
            label="What do you want to learn?"
            type="text"
            placeholder="e.g., Photosynthesis, Quantum Physics, Renaissance Art..."
            value={currentTopic}
            onChange={e => setCurrentTopic(e.target.value)}
            onKeyPress={handleKeyPress}
            error={validationError}
            disabled={isLoading}
          />

          {/* Depth Level Selector */}
          <Select
            label="Learning Depth"
            value={depth}
            onChange={e => setDepth(e.target.value as DepthLevel)}
            options={[
              { value: 'beginner', label: 'Beginner' },
              { value: 'intermediate', label: 'Intermediate' },
              { value: 'advanced', label: 'Advanced' },
            ]}
            disabled={isLoading}
          />

          {/* Language Selector */}
          <Select
            label="Language"
            value={language}
            onChange={e => setLanguage(e.target.value as Language)}
            options={[
              { value: 'English', label: 'English' },
              { value: 'French', label: 'French' },
              { value: 'Spanish', label: 'Spanish' },
            ]}
            disabled={isLoading}
          />

          {/* Error Display */}
          {storeError && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-800 text-sm">{storeError}</p>
            </div>
          )}

          {/* Generate Button */}
          <Button
            onClick={handleGenerateLesson}
            isLoading={isLoading}
            fullWidth
            disabled={!currentTopic.trim()}
          >
            {isLoading ? 'Generating Lesson...' : 'Generate Lesson'}
          </Button>
        </div>

        {/* Helper Text */}
        <p className="text-text-secondary text-xs mt-8 text-center">
          💡 Tip: Start with any topic you're curious about
        </p>
      </Card>
    </div>
  );
}
