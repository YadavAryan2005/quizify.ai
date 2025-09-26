export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Quiz {
  topic: string;
  questions: Question[];
  currentQuestion: number;
  score: number;
  userAnswers: (number | null)[];
  isCompleted: boolean;
}

export interface QuizConfig {
  topic: string;
  questionCount: number;
}