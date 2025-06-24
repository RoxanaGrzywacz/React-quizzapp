// src/components/Quiz.tsx

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Results from './Results';
import type { Question } from '../types';

interface QuizProps {
  questions: Question[];
  onReturnHome: () => void;
}

const Quiz = ({ questions, onReturnHome }: QuizProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);
  const [showResults, setShowResults] = useState<boolean>(false);

  const currentQuestion = questions[currentQuestionIndex];
  const isMultipleChoice = Array.isArray(currentQuestion.correct);

  const handleMultipleAnswerToggle = (answerIndex: number) => {
    const newSelectedAnswers = [...selectedAnswers];
    const currentIndex = newSelectedAnswers.indexOf(answerIndex);
    if (currentIndex === -1) {
      newSelectedAnswers.push(answerIndex);
    } else {
      newSelectedAnswers.splice(currentIndex, 1);
    }
    setSelectedAnswers(newSelectedAnswers);
  };

  const handleSingleAnswerClick = (answerIndex: number) => {
    setSelectedAnswers([answerIndex]);
    if (answerIndex === currentQuestion.correct) {
      setScore(s => s + 1);
    }
    setShowExplanation(true);
  };

  const checkMultipleChoiceAnswer = () => {
  // === NOWA LOGIKA - POCZĄTEK ===
  if (selectedAnswers.length === 0) {
    const userWantsToSkip = window.confirm(
      "Nie wybrałeś żadnej odpowiedzi. Czy chcesz przejść do następnego pytania?"
    );

    if (userWantsToSkip) {
      // Jeśli użytkownik kliknie "Tak", przechodzimy do następnego pytania
      handleNextQuestion();
    }
    
    // Niezależnie od wyboru, przerywamy dalsze wykonywanie tej funkcji
    return; 
  }
  // === NOWA LOGIKA - KONIEC ===

    // Sprawdzanie poprawności nie zalicza punktu, jeśli odpowiedź jest częściowa.
    // To jest już zaimplementowane poprawnie.
    const correctAnswers = currentQuestion.correct as number[];
    const isPerfectMatch =
      selectedAnswers.length === correctAnswers.length &&
      selectedAnswers.sort().toString() === [...correctAnswers].sort().toString();

    if (isPerfectMatch) {
      setScore(s => s + 1);
    }
    // Zawsze pokazujemy wyjaśnienie, niezależnie od wyniku.
    setShowExplanation(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswers([]);
      setShowExplanation(false);
    } else {
      setShowResults(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedAnswers([]);
    setShowExplanation(false);
    setShowResults(false);
  };

  if (showResults) {
    return (
      <Results 
        score={score} 
        totalQuestions={questions.length} 
        onRestart={handleRestart}
        onReturnHome={onReturnHome}
      />
    );
  }

  return (
    
    <AnimatePresence mode="wait">
      {/* Cały kontener quizu opakowujemy w motion.div */}
      {/* Dajemy mu unikalny klucz, aby Framer Motion wiedział, kiedy element się zmienia */}
      <motion.div
        key={currentQuestionIndex}
        initial={{ opacity: 0, y: 20 }} // Stan początkowy (niewidoczny, lekko poniżej)
        animate={{ opacity: 1, y: 0 }} // Stan końcowy (widoczny, na swojej pozycji)
        exit={{ opacity: 0, y: -20 }} // Stan wyjścia (zanika, lekko w górę)
        transition={{ duration: 0.3 }} // Czas trwania animacji
      >
      <p id="progress">Pytanie {currentQuestionIndex + 1} z {questions.length}</p>
      <div id="quiz-container">
        <p>{currentQuestion.question}</p>
        
        {isMultipleChoice ? (
          <div className="checkbox-container">
            {currentQuestion.answers.map((answer, index) => {
              // === POCZĄTEK NOWEJ LOGIKI WIZUALNEJ ===
              let labelClassName = 'checkbox-label'; // Domyślna klasa
              
              if (showExplanation) {
                const correctAnswers = currentQuestion.correct as number[];
                const isCorrectAnswer = correctAnswers.includes(index);
                const wasSelected = selectedAnswers.includes(index);

                if (isCorrectAnswer && wasSelected) {
                  // Poprawna i zaznaczona -> zielony
                  labelClassName += ' correct';
                } else if (isCorrectAnswer && !wasSelected) {
                  // Poprawna, ale pominięta -> pomarańczowy
                  labelClassName += ' missed';
                } else if (!isCorrectAnswer && wasSelected) {
                  // Błędna i zaznaczona -> czerwony
                  labelClassName += ' incorrect';
                }
              }
              // === KONIEC NOWEJ LOGIKI WIZUALNEJ ===

              return (
                <label key={index} className={labelClassName}>
                  <input
                    type="checkbox"
                    name="answer"
                    value={index}
                    checked={selectedAnswers.includes(index)}
                    onChange={() => handleMultipleAnswerToggle(index)}
                    disabled={showExplanation}
                  />
                  <span className="checkbox-custom"></span>
                  {answer}
                </label>
              );
            })}
          </div>
        ) : (
          // Logika dla pytań jednokrotnego wyboru (bez zmian)
          <div>
            {currentQuestion.answers.map((answer, index) => {
              let className = '';
              if (showExplanation) {
                const correct = currentQuestion.correct as number;
                if (index === correct) {
                  className = 'correct';
                } else if (selectedAnswers.includes(index)) {
                  className = 'incorrect';
                }
              }
              return (
                <button
                  key={index}
                  className={className}
                  onClick={() => handleSingleAnswerClick(index)}
                  disabled={showExplanation}
                >
                  {answer}
                </button>
              );
            })}
          </div>
        )}

        {showExplanation && (
          <>
            <p className="explanation">{currentQuestion.explanation}</p>
            <button className="next_button" onClick={handleNextQuestion}>Dalej</button>
          </>
        )}

        {isMultipleChoice && !showExplanation && (
          <button className="next_button" onClick={checkMultipleChoiceAnswer}>
            Sprawdź odpowiedź
          </button>
        )}
      </div>
    </motion.div>
    </AnimatePresence>
  );

};

export default Quiz;