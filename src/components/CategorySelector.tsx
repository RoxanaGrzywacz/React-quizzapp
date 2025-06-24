import React from 'react';

interface CategorySelectorProps {
  categories: string[];
  onSelectCategory: (category: string) => void;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({ categories, onSelectCategory }) => {
  return (
    <div className="category-selector">
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