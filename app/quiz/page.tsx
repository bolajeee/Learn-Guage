'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { Badge } from '@/components/ui/Badge';
import { MetricCard } from '@/components/ui/MetricCard';
import { PageHeader } from '@/components/ui/PageHeader';
import { calculateQuizResults } from '@/services/api';
import { useAppStore } from '@/store/useAppStore';

export default function QuizPage() {
  const router = useRouter();
  const {
    currentQuiz,
    currentTopic,
    quizAnswers,
    setQuizAnswer,
    setQuizResult,
    clearQuizAnswers,
    lastQuizResult,
  } = useAppStore();
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (!currentQuiz) {
      router.push('/lesson');
    }
  }, [currentQuiz, router]);

  const randomizedQuestions = useMemo(() => {
    if (!currentQuiz) {
      return [];
    }

    return currentQuiz.questions.map(question => {
      const answers = [question.correct_answer, ...question.distractors];
      const shuffled = [...answers].sort(() => Math.random() - 0.5);

      return {
        ...question,
        shuffledAnswers: shuffled,
      };
    });
  }, [currentQuiz]);

  const allQuestionsAnswered = useMemo(() => {
    if (!currentQuiz) {
      return false;
    }

    return currentQuiz.questions.every((_, index) => Boolean(quizAnswers[index]));
  }, [currentQuiz, quizAnswers]);

  const handleSubmitQuiz = () => {
    if (!currentQuiz || !allQuestionsAnswered) {
      return;
    }

    const results = calculateQuizResults(currentQuiz.questions, quizAnswers);
    setQuizResult(results);
    setIsSubmitted(true);
  };

  const handleNewQuiz = () => {
    clearQuizAnswers();
    setIsSubmitted(false);
    router.push('/dashboard');
  };

  if (!currentQuiz) {
    return (
      <div className="space-y-6">
        <PageHeader
          eyebrow="Quiz"
          title="Loading your questions."
          description="The quiz screen appears after a lesson has been generated."
        />
        <Card className="flex min-h-[280px] items-center justify-center">
          <p className="text-sm text-text-secondary">Loading quiz...</p>
        </Card>
      </div>
    );
  }

  const score = lastQuizResult?.score ?? 0;
  const correctAnswers = lastQuizResult?.correctAnswers ?? 0;
  const totalQuestions = lastQuizResult?.totalQuestions ?? currentQuiz.questions.length;

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Quiz"
        title={`Check your understanding of ${currentTopic || 'the lesson'}.`}
        description="The learner can only submit after every question is answered, and the review state clearly separates correct and incorrect responses."
        status={
          isSubmitted
            ? 'Results are available below.'
            : 'Answer every question before submitting.'
        }
        action={
          <div className="flex flex-wrap gap-3">
            <Badge tone="accent">{currentQuiz.questions.length} questions</Badge>
            <Badge tone={allQuestionsAnswered ? 'success' : 'warning'}>
              {allQuestionsAnswered ? 'Ready' : 'Incomplete'}
            </Badge>
          </div>
        }
      />

      {isSubmitted ? (
        <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
          <MetricCard
            label="Score"
            value={`${score}%`}
            detail={`${correctAnswers} of ${totalQuestions} answers were correct.`}
            accent="emerald"
          />

          <Card className="space-y-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-text-secondary">
                  Review summary
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-text-primary">
                  What happened on each question
                </h2>
              </div>
              <Badge tone="primary">Submitted</Badge>
            </div>

            <div className="space-y-4">
              {lastQuizResult?.answers.map(answer => (
                <div
                  key={answer.questionIndex}
                  className={`rounded-2xl border px-4 py-4 ${
                    answer.isCorrect
                      ? 'border-emerald-200 bg-emerald-50'
                      : 'border-rose-200 bg-rose-50'
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="font-semibold text-text-primary">
                      {answer.questionIndex + 1}. {answer.question}
                    </p>
                    <Badge tone={answer.isCorrect ? 'success' : 'warning'}>
                      {answer.isCorrect ? 'Correct' : 'Needs review'}
                    </Badge>
                  </div>
                  <p className="mt-3 text-sm text-text-primary">
                    Your answer: {answer.selectedAnswer || 'No answer'}
                  </p>
                  {!answer.isCorrect && (
                    <p className="mt-1 text-sm text-text-secondary">
                      Correct answer: {answer.correctAnswer}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </Card>

          <div className="xl:col-span-2 flex flex-col gap-3 sm:flex-row">
            <Button variant="secondary" onClick={() => router.push('/lesson')}>
              Back to lesson
            </Button>
            <Button onClick={handleNewQuiz} fullWidth>
              Learn another topic
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-4">
              {randomizedQuestions.map((question, index) => (
                <Card key={index} className="space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-text-secondary">
                        Question {index + 1}
                      </p>
                      <h2 className="mt-2 text-lg font-semibold text-text-primary">
                        {question.question}
                      </h2>
                    </div>
                    <Badge tone={quizAnswers[index] ? 'success' : 'muted'}>
                      {quizAnswers[index] ? 'Answered' : 'Open'}
                    </Badge>
                  </div>

                  <div className="grid gap-3">
                    {question.shuffledAnswers.map(answer => {
                      const selected = quizAnswers[index] === answer;

                      return (
                        <label
                          key={answer}
                          className={`flex cursor-pointer items-center gap-3 rounded-2xl border px-4 py-3 transition-all ${
                            selected
                              ? 'border-brand-blue bg-brand-blue/5'
                              : 'border-border-color bg-white hover:bg-surface-muted'
                          }`}
                        >
                          <input
                            type="radio"
                            name={`question-${index}`}
                            value={answer}
                            checked={selected}
                            onChange={() => setQuizAnswer(index, answer)}
                            className="h-4 w-4 text-brand-blue"
                          />
                          <span className="text-sm text-text-primary">{answer}</span>
                        </label>
                      );
                    })}
                  </div>
                </Card>
              ))}
            </div>

            <div className="space-y-6">
              <MetricCard
                label="Answer progress"
                value={`${Object.keys(quizAnswers).length}/${currentQuiz.questions.length}`}
                detail="All questions must be answered before submission is enabled."
                accent="amber"
              />

              <Card>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-text-secondary">
                  Submission rule
                </p>
                <div className="mt-4 space-y-3 text-sm leading-6 text-text-primary">
                  <div className="rounded-2xl bg-surface-muted px-4 py-3">
                    Prevent accidental submissions by requiring every choice first.
                  </div>
                  <div className="rounded-2xl bg-surface-muted px-4 py-3">
                    Keep the review state readable with clear correct and incorrect cues.
                  </div>
                  <div className="rounded-2xl bg-surface-muted px-4 py-3">
                    Show a score summary after submission so the next step is obvious.
                  </div>
                </div>
              </Card>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button variant="secondary" onClick={() => router.push('/lesson')}>
              Back to lesson
            </Button>
            <Button onClick={handleSubmitQuiz} disabled={!allQuestionsAnswered} fullWidth>
              {allQuestionsAnswered ? 'Submit quiz' : 'Answer all questions to continue'}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
