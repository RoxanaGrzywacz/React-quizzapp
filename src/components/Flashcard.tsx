// src/components/Flashcard.tsx

import { useState } from 'react';
import { motion } from 'framer-motion';
import type { Flashcard as FlashcardType } from '../types';
import styles from './Flashcard.module.css';

interface FlashcardProps {
  card: FlashcardType;
}

const Flashcard = ({ card }: FlashcardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className={styles.flashcard} onClick={handleFlip}>
      <motion.div
        className={styles.flashcardInner}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Przednia strona fiszki */}
        <div className={styles.flashcardFace}>
          {card.term}
        </div>
        {/* Tylna strona fiszki */}
        <div className={`${styles.flashcardFace} ${styles.flashcardBack}`}>
          {card.definition}
        </div>
      </motion.div>
    </div>
  );
};

export default Flashcard;