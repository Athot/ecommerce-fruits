import React from "react";

const categories = ["All", "Fruits", "Vegetables"];

const CategoryFilter = ({ selectedCategory, setSelectedCategory }) => {
  return (
    <div className="flex flex-wrap gap-3">
      {categories.map((category) => {
        const isActive = selectedCategory === category;

        return (
          <button
            key={category}
            type="button"
            onClick={() => setSelectedCategory(category)}
            className={`rounded-full px-5 py-2.5 text-sm font-semibold transition ${
              isActive
                ? "bg-green-600 text-white shadow-md shadow-green-600/20"
                : "border border-gray-200 bg-white text-gray-600 hover:border-green-300 hover:text-green-700"
            }`}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
};

export default CategoryFilter;
