import  { useState, useEffect } from 'react';
import CategorySelector from './components/CategorySelector';
import Quizz from './components/Quizz';
import type{ QuizData } from './types';

function App() {
  const [quizData, setQuizData] = useState<QuizData | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    fetch('/questions.json')
      .then(response => response.json())
      .then(data => setQuizData(data as QuizData))
      .catch(error => console.error("Błąd podczas ładowania pytań:", error));
  }, []);

  const handleSelectCategory = (category: string) => {
    if (quizData && quizData[category] && quizData[category].length > 0) {
      setSelectedCategory(category);
    } else {
      alert("Przepraszamy, brak pytań w tej kategorii.");
    }
  };

  const handleReturnToHome = () => {
    setSelectedCategory(null);
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
        {!selectedCategory ? (
          <CategorySelector 
            onSelectCategory={handleSelectCategory} 
            categories={Object.keys(quizData)} 
          />
        ) : (
          <Quizz 
            questions={quizData[selectedCategory]} 
            onReturnHome={handleReturnToHome} 
          />
        )}
      </main>

      <footer>© Roxana Grzywacz 2025</footer>
    </>
  );
}

export default App;