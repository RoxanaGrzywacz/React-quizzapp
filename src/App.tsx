import  { useState, useEffect } from 'react';
import CategorySelector from './components/CategorySelector';
import Quizz from './components/Quizz';
import FlashcardViewer from './components/FlashcardViewer';
import type{ QuizData, Question, Flashcard } from './types';

// Funkcja pomocnicza do sprawdzania typu danych w kategorii
const isFlashcardArray = (data: (Question | Flashcard)[]): data is Flashcard[] => {
  // Jeśli pierwszy element ma pole 'term', zakładamy, że to fiszki
  return data.length > 0 && 'term' in data[0];
};

function App() {
  const [quizData, setQuizData] = useState<QuizData | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    fetch('/questions.json')
      .then(response => response.json())
      .then(data => setQuizData(data as QuizData))
      .catch(error => console.error("Błąd podczas ładowania danych:", error));
  }, []);

  const handleSelectCategory = (category: string) => {
    if (quizData && quizData[category] && quizData[category].length > 0) {
      setSelectedCategory(category);
    } else {
      alert("Przepraszamy, brak danych w tej kategorii.");
    }
  };

  const handleReturnToHome = () => {
    setSelectedCategory(null);
  };

  const renderContent = () => {
    if (!selectedCategory || !quizData) {
      return <CategorySelector onSelectCategory={handleSelectCategory} categories={quizData ? Object.keys(quizData) : []} />;
    }

    const categoryData = quizData[selectedCategory];

    // Sprawdzamy, czy to fiszki czy quiz
    if (isFlashcardArray(categoryData)) {
      return <FlashcardViewer cards={categoryData} onReturnHome={handleReturnToHome} />;
    } else {
      return <Quizz questions={categoryData as Question[]} onReturnHome={handleReturnToHome} />;
    }
  };

  if (!quizData) {
    return <div>Ładowanie...</div>;
  }

  return (
    <>
      <header>
        <h3>Nice and Simple Quizz app for studying</h3>
      </header>

      <main>
        {renderContent()}
      </main>

      <footer>© Roxana Grzywacz 2025</footer>
    </>
  );
}

export default App;