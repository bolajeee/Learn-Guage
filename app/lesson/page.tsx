'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/store/useAppStore';
import { generateQuiz } from '@/services/api';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import type { DepthLevel, Language } from '@/types';

/**
 * Lesson Page
 * Displays structured AI-generated content
 * Sections: Core Concept, Explanation, Example, Summary
 */
export default function LessonPage() {
  const router = useRouter();
  const {
    currentLesson,
    currentTopic,
    depth,
    language,
    isLoading,
    setIsLoading,
    error: storeError,
    setError,
    setCurrentQuiz,
    clearQuizAnswers,
  } = useAppStore();

  /**
   * Redirect to dashboard if no lesson is loaded
   */
  useEffect(() => {
    if (!currentLesson) {
      router.push('/dashboard');
    }
  }, [currentLesson, router]);

  /**
   * Generate quiz and navigate
   */
  const handleGenerateQuiz = async () => {
    setError(null);
    setIsLoading(true);
    clearQuizAnswers();

    try {
      const response = await generateQuiz({
        topic: currentTopic,
        depth: depth as DepthLevel,
        language: language as Language,
      });

      if (response.success && response.data) {
        setCurrentQuiz(response.data);
        router.push('/quiz');
      } else {
        setError(response.error || 'Failed to generate quiz');
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  if (!currentLesson) {
    return (
      <div className="min-h-screen bg-bg-primary flex items-center justify-center">
        <p className="text-text-secondary">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-primary py-8 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.push('/dashboard')}
            className="text-brand-blue hover:underline text-sm font-medium mb-4"
          >
            ← Back to Dashboard
          </button>
          <h1 className="text-4xl font-bold text-text-primary mb-2">
            {currentTopic}
          </h1>
          <p className="text-text-secondary">
            {depth.charAt(0).toUpperCase() + depth.slice(1)} Level • {language}
          </p>
        </div>

        {/* Error Display */}
        {storeError && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800 text-sm">{storeError}</p>
          </div>
        )}

        {/* Core Concept Section */}
        <Card className="mb-6">
          <h2 className="text-xl font-bold text-brand-blue mb-3">
            Core Concept
          </h2>
          <p className="text-text-primary leading-relaxed">
            {currentLesson.coreConcept}
          </p>
        </Card>

        {/* Explanation Section */}
        <Card className="mb-6">
          <h2 className="text-xl font-bold text-brand-blue mb-3">
            Understanding It
          </h2>
          <p className="text-text-primary leading-relaxed">
            {currentLesson.explanation}
          </p>
        </Card>

        {/* Example Section */}
        <Card className="mb-6">
          <h2 className="text-xl font-bold text-brand-blue mb-3">
            Real-World Example
          </h2>
          <p className="text-text-primary leading-relaxed">
            {currentLesson.example}
          </p>
        </Card>

        {/* Summary Section */}
        <Card className="mb-8">
          <h2 className="text-xl font-bold text-brand-blue mb-3">Key Takeaway</h2>
          <p className="text-text-primary leading-relaxed">
            {currentLesson.summary}
          </p>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <Button
            variant="secondary"
            onClick={() => router.push('/dashboard')}
            disabled={isLoading}
          >
            New Topic
          </Button>
          <Button
            onClick={handleGenerateQuiz}
            isLoading={isLoading}
            fullWidth
          >
            {isLoading ? 'Generating Quiz...' : 'Test Your Knowledge'}
          </Button>
        </div>
      </div>
    </div>
  );
}
