/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React from "react";

function City(props) {
  return (
    <div
      className="cityCard"
      onClick={() => props.grabLocationData(`${props.name.city}, ${props.name.country}`)}
    >
      <h5 className="cityName">{props.name.city}</h5>
    </div>
  );
}

export default City;
