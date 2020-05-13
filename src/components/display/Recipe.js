import React from 'react';

const Recipe = props => {
  return (
    <div
      className="recipe"
      style={{
        background: `url(${props.image}) center no-repeat`,
        backgroundSize: 'cover',
      }}
    >
      <p className="recipe-title">
        <a href={props.sourceUrl} target="_blank">
          {props.title}
        </a>
      </p>
    </div>
  );
};

export default Recipe;
