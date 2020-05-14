import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";

function Info(props) {
  const languages = [];
  props.countryData.languages.forEach((language, index) =>
    languages.push(<li key={"language" + index}>{language}</li>)
  );

  return (
    <div id='country-info'>
      <ul>
        <li className="country-list-item">
          Capital: <span className="country-data">{props.countryData.capital}</span>
        </li>
        <li className="country-list-item">
          Region: <span className="country-data">{props.countryData.region}</span>
        </li>
        <li className="country-list-item">
          Area: <span className="country-data">{props.countryData.area} km²</span>
        </li>
        <li className="country-list-item">
          Population: <span className="country-data">{props.countryData.population}</span>
        </li>
      </ul>
      <ul>
        Languages:
        {languages}
      </ul>
    </div>
  );
}

export default Info;
