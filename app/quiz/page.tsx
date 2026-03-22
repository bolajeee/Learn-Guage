'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/store/useAppStore';
import { calculateQuizResults } from '@/services/api';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';

/**
 * Quiz Page
 * Interactive quiz interface with randomized answers
 * Shows results and scoring after submission
 */
export default function QuizPage() {
  const router = useRouter();
  const {
    currentQuiz,
    currentTopic,
    quizAnswers,
    setQuizAnswer,
    setQuizResult,
    clearQuizAnswers,
  } = useAppStore();

  const [isSubmitted, setIsSubmitted] = useState(false);

  /**
   * Randomize answer options for each question
   */
  const randomizedQuestions = useMemo(() => {
    if (!currentQuiz) return [];

    return currentQuiz.questions.map(q => {
      const allAnswers = [q.correct_answer, ...q.distractors];
      const shuffled = [...allAnswers].sort(() => Math.random() - 0.5);
      return { ...q, shuffledAnswers: shuffled };
    });
  }, [currentQuiz]);

  /**
   * Validate all questions are answered
   */
  const allQuestionsAnswered = useMemo(() => {
    if (!currentQuiz) return false;
    return currentQuiz.questions.every((_, index) => quizAnswers[index]);
  }, [currentQuiz, quizAnswers]);

  /**
   * Submit quiz and show results
   */
  const handleSubmitQuiz = () => {
    if (!currentQuiz || !allQuestionsAnswered) return;

    const results = calculateQuizResults(
      currentQuiz.questions,
      quizAnswers
    );

    setQuizResult(results);
    setIsSubmitted(true);
  };

  /**
   * Reset and start new quiz
   */
  const handleNewQuiz = () => {
    clearQuizAnswers();
    setIsSubmitted(false);
    router.push('/dashboard');
  };

  /**
   * Redirect if no quiz loaded
   */
  useEffect(() => {
    if (!currentQuiz) {
      router.push('/lesson');
    }
  }, [currentQuiz, router]);

  if (!currentQuiz) {
    return (
      <div className="min-h-screen bg-bg-primary flex items-center justify-center">
        <p className="text-text-secondary">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-primary py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.push('/lesson')}
            className="text-brand-blue hover:underline text-sm font-medium mb-4"
            disabled={isSubmitted}
          >
            ← Back to Lesson
          </button>
          <h1 className="text-4xl font-bold text-text-primary mb-2">
            Test Your Knowledge
          </h1>
          <p className="text-text-secondary">
            Answer all questions to see your score
          </p>
        </div>

        {/* Results View */}
        {isSubmitted && (
          <Card className="mb-8 bg-gradient-to-br from-blue-50 to-cyan-50 border-brand-blue">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-brand-blue mb-2">
                Your Score
              </h2>
              <div className="text-6xl font-bold text-brand-blue">
                {useAppStore.getState().lastQuizResult?.score || 0}%
              </div>
              <p className="text-text-secondary mt-4">
                {useAppStore.getState().lastQuizResult?.correctAnswers || 0} of{' '}
                {useAppStore.getState().lastQuizResult?.totalQuestions || 0}{' '}
                questions correct
              </p>
            </div>
          </Card>
        )}

        {/* Questions View */}
        {!isSubmitted && (
          <>
            <div className="space-y-6 mb-8">
              {randomizedQuestions.map((question, index) => (
                <Card key={index}>
                  <h3 className="text-lg font-semibold text-text-primary mb-4">
                    {index + 1}. {question.question}
                  </h3>

                  <div className="space-y-2">
                    {question.shuffledAnswers.map((answer, answerIndex) => (
                      <label
                        key={answerIndex}
                        className="flex items-center p-3 rounded-lg border-2 border-border-color cursor-pointer transition-all hover:bg-bg-secondary"
                        style={{
                          borderColor:
                            quizAnswers[index] === answer
                              ? '#1E40AF'
                              : '#E5E7EB',
                          backgroundColor:
                            quizAnswers[index] === answer
                              ? '#F0F9FF'
                              : 'transparent',
                        }}
                      >
                        <input
                          type="radio"
                          name={`question-${index}`}
                          value={answer}
                          checked={quizAnswers[index] === answer}
                          onChange={() => setQuizAnswer(index, answer)}
                          className="w-4 h-4 cursor-pointer"
                        />
                        <span className="ml-3 text-text-primary">{answer}</span>
                      </label>
                    ))}
                  </div>
                </Card>
              ))}
            </div>

            {/* Submit Button */}
            <Button
              onClick={handleSubmitQuiz}
              disabled={!allQuestionsAnswered}
              fullWidth
            >
              {allQuestionsAnswered
                ? 'Submit Quiz'
                : `Answer all ${currentQuiz.questions.length} questions to continue`}
            </Button>
          </>
        )}

        {/* Results Actions */}
        {isSubmitted && (
          <div className="space-y-4">
            <Card className="p-4">
              <h3 className="font-semibold text-text-primary mb-4">
                Review Your Answers
              </h3>
              <div className="space-y-4">
                {useAppStore
                  .getState()
                  .lastQuizResult?.answers.map((answer, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg border-l-4 ${
                        answer.isCorrect
                          ? 'bg-green-50 border-green-500'
                          : 'bg-red-50 border-red-500'
                      }`}
                    >
                      <p className="font-semibold text-text-primary mb-2">
                        {index + 1}. {answer.question}
                      </p>
                      <p
                        className={`text-sm ${
                          answer.isCorrect
                            ? 'text-green-700'
                            : 'text-red-700'
                        }`}
                      >
                        {answer.isCorrect
                          ? `✓ Correct: ${answer.selectedAnswer}`
                          : `✗ Your answer: ${answer.selectedAnswer}`}
                      </p>
                      {!answer.isCorrect && (
                        <p className="text-sm text-red-700 mt-1">
                          Correct answer: {answer.correctAnswer}
                        </p>
                      )}
                    </div>
                  ))}
              </div>
            </Card>

            <Button onClick={handleNewQuiz} fullWidth>
              Learn Another Topic
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
