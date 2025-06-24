import React from 'react';

interface ResultsProps {
  score: number;
  totalQuestions: number;
  onRestart: () => void;
  onReturnHome: () => void;
}

const Results: React.FC<ResultsProps> = ({ score, totalQuestions, onRestart, onReturnHome }) => {
  return (
    <div className="results-container">
      <h2>Quiz zakończony!</h2>
      <p>Twój wynik: {score} z {totalQuestions}</p>
      <button onClick={onRestart} className="next_button">Zacznij od nowa</button>
      <button onClick={onReturnHome} className="next_button">Wróć do kategorii</button>
    </div>
  );
};

export default Results;