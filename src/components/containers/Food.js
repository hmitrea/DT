import React from "react";
import Recipe from "../display/Recipe";

const Food = (props) => {
  const recipeArr = [
    {
      title: "Hello",
      sourceUrl: "www.google.com",
      image:
        "https://files.123freevectors.com/wp-content/original/104312-yellow-stripes-pattern.jpg",
    },
  ];
  props.recipes.forEach((recipe, index) => {
    let { title, sourceUrl, image } = recipe;
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
    <div id="food-container">
      <p>Great Local Recipes!</p>
      {recipeArr}
    </div>
  );
};

export default Food;
