// Opisuje, jak wygląda pojedyncze pytanie
export interface Question {
  question: string;
  answers: string[];
  correct: number | number[];
  explanation: string;
}

// Opisuje, jak wygląda cały zbiór danych z quizami
export interface QuizData {
  [category: string]: Question[];
}