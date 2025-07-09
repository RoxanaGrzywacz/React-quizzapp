// Opisuje, jak wygląda pojedyncze pytanie
export interface Question {
  question: string;
  answers: string[];
  correct: number | number[];
  explanation: string;
}

// NOWY interfejs dla fiszki
export interface Flashcard {
  term: string;
  definition: string;
}

// Opisuje, jak wygląda cały zbiór danych z quizami
export interface QuizData {
  [category: string]: (Question | Flashcard)[];
}