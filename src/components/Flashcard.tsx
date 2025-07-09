// src/components/Flashcard.tsx

import { useState } from 'react';
import { motion } from 'framer-motion';
import type { Flashcard as FlashcardType } from '../types';

interface FlashcardProps {
  card: FlashcardType;
}

const Flashcard = ({ card }: FlashcardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="flashcard" onClick={handleFlip}>
      <motion.div
        className="flashcard-inner"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Przednia strona fiszki */}
        <div className="flashcard-face flashcard-front">
          {card.term}
        </div>
        {/* Tylna strona fiszki */}
        <div className="flashcard-face flashcard-back">
          {card.definition}
        </div>
      </motion.div>
    </div>
  );
};

export default Flashcard;