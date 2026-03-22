import { create } from 'zustand';
import { DepthLevel, Language, Lesson, Quiz, QuizResult } from '@/types';

/**
 * Global app state interface
 */
interface AppState {
  // User preferences
  depth: DepthLevel;
  language: Language;
  setDepth: (depth: DepthLevel) => void;
  setLanguage: (language: Language) => void;

  // Current topic
  currentTopic: string;
  setCurrentTopic: (topic: string) => void;

  // Lesson state
  currentLesson: Lesson | null;
  setCurrentLesson: (lesson: Lesson) => void;

  // Quiz state
  currentQuiz: Quiz | null;
  setCurrentQuiz: (quiz: Quiz) => void;

  // Quiz answers
  quizAnswers: Record<number, string>;
  setQuizAnswer: (questionIndex: number, answer: string) => void;
  clearQuizAnswers: () => void;

  // Quiz results
  lastQuizResult: QuizResult | null;
  setQuizResult: (result: QuizResult) => void;

  // UI states
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  error: string | null;
  setError: (error: string | null) => void;

  // Reset function
  reset: () => void;
}

/**
 * Initial state
 */
const initialState = {
  depth: 'intermediate' as DepthLevel,
  language: 'English' as Language,
  currentTopic: '',
  currentLesson: null,
  currentQuiz: null,
  quizAnswers: {},
  lastQuizResult: null,
  isLoading: false,
  error: null,
};

/**
 * Zustand store for global app state
 * Centralized state management for user preferences and AI responses
 */
export const useAppStore = create<AppState>(set => ({
  ...initialState,

  setDepth: depth => set({ depth }),
  setLanguage: language => set({ language }),

  setCurrentTopic: currentTopic => set({ currentTopic }),

  setCurrentLesson: currentLesson => set({ currentLesson }),

  setCurrentQuiz: currentQuiz => set({ currentQuiz }),

  setQuizAnswer: (questionIndex, answer) =>
    set(state => ({
      quizAnswers: {
        ...state.quizAnswers,
        [questionIndex]: answer,
      },
    })),

  clearQuizAnswers: () => set({ quizAnswers: {} }),

  setQuizResult: lastQuizResult => set({ lastQuizResult }),

  setIsLoading: isLoading => set({ isLoading }),

  setError: error => set({ error }),

  reset: () => set(initialState),
}));
