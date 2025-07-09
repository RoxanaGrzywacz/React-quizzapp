// src/components/FlashcardViewer.tsx

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Flashcard from './Flashcard';
import type { Flashcard as FlashcardType } from '../types';

interface FlashcardViewerProps {
  cards: FlashcardType[];
  onReturnHome: () => void;
}

const FlashcardViewer = ({ cards, onReturnHome }: FlashcardViewerProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + cards.length) % cards.length);
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 200 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -200 }}
          transition={{ duration: 0.3 }}
          style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}
        >
          <Flashcard card={cards[currentIndex]} />
        </motion.div>
      </AnimatePresence>

      <p id="progress">Fiszka {currentIndex + 1} z {cards.length}</p>

      <div className="navigation-buttons" style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '20px' }}>
        <button className="next_button" onClick={handlePrev}>Poprzednia</button>
        <button className="next_button" onClick={handleNext}>Następna</button>
      </div>
      <button className="next_button" onClick={onReturnHome} style={{ marginTop: '20px' }}>
        Wróć do kategorii
      </button>
    </div>
  );
};

export default FlashcardViewer;