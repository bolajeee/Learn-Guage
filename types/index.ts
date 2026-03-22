/**
 * Learning Depth Levels
 */
export type DepthLevel = 'beginner' | 'intermediate' | 'advanced';

/**
 * Supported Languages
 */
export type Language = 'English' | 'French' | 'Spanish';

/**
 * User Preferences
 */
export interface UserPreferences {
  depth: DepthLevel;
  language: Language;
}

/**
 * Lesson Request Payload
 */
export interface GenerateLessonRequest {
  topic: string;
  depth: DepthLevel;
  language: Language;
}

/**
 * Lesson Content Structure
 */
export interface Lesson {
  coreConcept: string;
  explanation: string;
  example: string;
  summary: string;
}

/**
 * Quiz Question
 */
export interface QuizQuestion {
  question: string;
  correct_answer: string;
  distractors: string[];
}

/**
 * Quiz Request Payload
 */
export interface GenerateQuizRequest {
  topic: string;
  depth: DepthLevel;
  language: Language;
}

/**
 * Quiz Content
 */
export interface Quiz {
  questions: QuizQuestion[];
}

/**
 * Quiz Answer Submission
 */
export interface QuizAnswer {
  questionIndex: number;
  selectedAnswer: string;
}

/**
 * Quiz Results
 */
export interface QuizResult {
  totalQuestions: number;
  correctAnswers: number;
  score: number;
  answers: {
    questionIndex: number;
    question: string;
    selectedAnswer: string;
    correctAnswer: string;
    isCorrect: boolean;
  }[];
}

/**
 * API Response Wrapper
 */
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
