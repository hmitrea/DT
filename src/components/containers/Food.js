import React from 'react';
import Recipe from '../display/Recipe';

const Food = props => {
  const recipeArr = [];
  const { recipes } = props;
  recipes.forEach((recipe, index) => {
    let { title, sourceUrl, image } = recipe;
    title = title.charAt(0).toUpperCase() + title.slice(1);
    recipeArr.push(
      <Recipe
        key={`recipe-${index + 1}`}
        title={title}
        sourceUrl={sourceUrl}
        image={image}
      />
    );
  });
  return (
    <div id='food-container'>
      <p id='food-title'>Great Local Recipes!</p>
      {recipeArr}
    </div>
  );
};

export default Food;
