import React from 'react';
import styles from './CategorySelector.module.css';

interface CategorySelectorProps {
  categories: string[];
  onSelectCategory: (category: string) => void;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({ categories, onSelectCategory }) => {
  return (
    <div className={styles.container}>
      <h2>Wybierz kategorię</h2>
      {categories.map(category => (
        <button key={category} onClick={() => onSelectCategory(category)}>
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default CategorySelector;