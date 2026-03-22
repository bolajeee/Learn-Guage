import {
  ApiResponse,
  GenerateLessonRequest,
  GenerateQuizRequest,
  Lesson,
  Quiz,
} from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
export const isDemoMode = process.env.NEXT_PUBLIC_DEMO_MODE === 'true';
const DEMO_DELAY_MS = 900;

function normalizeTopic(topic: string) {
  return topic.trim().replace(/\s+/g, ' ');
}

function delay(duration: number) {
  return new Promise(resolve => setTimeout(resolve, duration));
}

function createMockLesson(request: GenerateLessonRequest): Lesson {
  const topic = normalizeTopic(request.topic);
  const levelLabel =
    request.depth === 'beginner'
      ? 'simple, intuitive language'
      : request.depth === 'advanced'
        ? 'precise technical language'
        : 'structured practical language';

  return {
    coreConcept: `${topic} at a glance`,
    explanation: `At the ${request.depth} level, ${topic} is explained with ${levelLabel} so the learner can understand the core idea, the moving parts, and why it matters in real life. The selected language is ${request.language}, which keeps the experience aligned with the user's preferred learning flow.`,
    example: `Imagine applying ${topic} inside a real classroom, lab, or project. The lesson would walk through a concrete situation, show how the concept behaves step by step, and then connect it back to a practical outcome that feels useful rather than abstract.`,
    summary: `The key takeaway is that ${topic} becomes easier to remember when it is broken into a definition, a process, a real example, and a short recap. That structure is what makes the product feel crisp, teachable, and ready for extended use.`,
  };
}

function createMockQuiz(request: GenerateQuizRequest): Quiz {
  const topic = normalizeTopic(request.topic);

  return {
    questions: [
      {
        question: `Which description best matches the main idea behind ${topic}?`,
        correct_answer: `It explains how ${topic} works in practice`,
        distractors: [
          'It is only useful as a memory trick',
          'It replaces all related concepts',
          'It does not have real-world value',
        ],
      },
      {
        question: `What helps most when studying ${topic} at the ${request.depth} level?`,
        correct_answer: 'Breaking it into steps and examples',
        distractors: [
          'Skipping the explanation entirely',
          'Focusing only on the answer choices',
          'Memorizing without context',
        ],
      },
      {
        question: `How should a learner reinforce ${topic} after reading the lesson?`,
        correct_answer: 'Review the summary and answer a short quiz',
        distractors: [
          'Ignore the recap and move on',
          'Only read the first sentence',
          'Avoid checking understanding',
        ],
      },
    ],
  };
}

/**
 * Generate lesson content from backend.
 */
export async function generateLesson(
  request: GenerateLessonRequest
): Promise<ApiResponse<Lesson>> {
  try {
    if (isDemoMode) {
      await delay(DEMO_DELAY_MS);

      return {
        success: true,
        data: createMockLesson(request),
      };
    }

    const response = await fetch(`${API_BASE_URL}/api/generate-lesson`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data = (await response.json()) as ApiResponse<Lesson>;
    return data;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error occurred';
    return {
      success: false,
      error: `Failed to generate lesson: ${errorMessage}`,
    };
  }
}

/**
 * Generate quiz from backend.
 */
export async function generateQuiz(
  request: GenerateQuizRequest
): Promise<ApiResponse<Quiz>> {
  try {
    if (isDemoMode) {
      await delay(DEMO_DELAY_MS);
      return {
        success: true,
        data: createMockQuiz(request),
      };
    }

    const response = await fetch(`${API_BASE_URL}/api/generate-quiz`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data = (await response.json()) as ApiResponse<Quiz>;
    return data;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error occurred';
    return {
      success: false,
      error: `Failed to generate quiz: ${errorMessage}`,
    };
  }
}

/**
 * Validate quiz answers and return results.
 */
export function calculateQuizResults(
  questions: { question: string; correct_answer: string }[],
  answers: Record<number, string>
) {
  let correctCount = 0;
  const results = questions.map((q, index) => {
    const userAnswer = answers[index] || '';
    const isCorrect = userAnswer === q.correct_answer;
    if (isCorrect) correctCount++;

    return {
      questionIndex: index,
      question: q.question,
      selectedAnswer: userAnswer,
      correctAnswer: q.correct_answer,
      isCorrect,
    };
  });

  return {
    totalQuestions: questions.length,
    correctAnswers: correctCount,
    score:
      questions.length === 0 ? 0 : Math.round((correctCount / questions.length) * 100),
    answers: results,
  };
}
