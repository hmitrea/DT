import React from "react";

const Attraction = (props) => {
  return (
    <div
      className="attraction"
      style={{
        background: `url(${props.thumbnail_url}) center no-repeat`,
        backgroundSize: "cover",
      }}
    >
      <p className="attraction-name">
        <a href={props.url}>{props.name}</a>
      </p>
    </div>
  );
};

export default Attraction;
