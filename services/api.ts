import {
  GenerateLessonRequest,
  GenerateQuizRequest,
  Lesson,
  Quiz,
  ApiResponse,
} from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
const DEMO_MODE = process.env.NEXT_PUBLIC_DEMO_MODE === 'true';

/**
 * Mock lesson data for demo mode
 */
const MOCK_LESSONS: Record<string, Lesson> = {
  'photosynthesis-beginner': {
    coreConcept: 'Photosynthesis',
    explanation:
      'Photosynthesis is the process by which plants use sunlight, water, and carbon dioxide to create oxygen and energy in the form of glucose. It occurs mainly in the leaves, specifically in the chloroplasts, where the green pigment chlorophyll absorbs light energy.',
    example:
      'When you see a plant sitting on a windowsill turning green and growing, photosynthesis is happening. The plant takes in CO2 from the air through tiny pores called stomata, absorbs water through its roots, and uses sunlight to create food for itself.',
    summary:
      'Photosynthesis is nature\'s way of converting light energy into chemical energy. The simple equation is: 6CO2 + 6H2O + light energy → C6H12O6 + 6O2. Plants produce oxygen as a byproduct, which we breathe.',
  },
};

/**
 * Mock quiz data for demo mode
 */
const MOCK_QUIZ: Quiz = {
  questions: [
    {
      question: 'What is the primary pigment in photosynthesis?',
      correct_answer: 'Chlorophyll',
      distractors: ['Hemoglobin', 'Melanin', 'Carotenoid'],
    },
    {
      question: 'Where does photosynthesis occur in a plant cell?',
      correct_answer: 'Chloroplast',
      distractors: ['Mitochondrion', 'Nucleus', 'Ribosome'],
    },
    {
      question: 'What is the main product of photosynthesis?',
      correct_answer: 'Glucose',
      distractors: ['Protein', 'Lipid', 'Nucleic acid'],
    },
  ],
};

/**
 * Generate lesson content from backend
 */
export async function generateLesson(
  request: GenerateLessonRequest
): Promise<ApiResponse<Lesson>> {
  try {
    if (DEMO_MODE) {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      const mockKey = `${request.topic.toLowerCase()}-${request.depth}`;
      const lesson =
        MOCK_LESSONS[mockKey] || MOCK_LESSONS['photosynthesis-beginner'];

      return {
        success: true,
        data: lesson,
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
 * Generate quiz from backend
 */
export async function generateQuiz(
  request: GenerateQuizRequest
): Promise<ApiResponse<Quiz>> {
  try {
    if (DEMO_MODE) {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800));
      return {
        success: true,
        data: MOCK_QUIZ,
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
 * Validate quiz answers and return results
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
    score: Math.round((correctCount / questions.length) * 100),
    answers: results,
  };
}
