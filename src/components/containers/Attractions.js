import React from "react";
import Attraction from "../display/Attraction";

const Attractions = (props) => {
  const attractionArr = [];
  const { attractions } = props;
  attractions.forEach((attraction, index) => {
    let { name, url, thumbnail_url } = attraction;
    attractionArr.push(
      <Attraction
        key={`attraction-${index + 1}`}
        name={name}
        url={url}
        thumbnail_url={thumbnail_url}
      />
    );
  });
  return (
    <div id="attractions-list">
      <h1 id="attractions-title">Sights to See</h1>
      {attractionArr}
    </div>
  );
};
export default Attractions;
