/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React from "react";

import { faSun as solidSun } from "@fortawesome/free-solid-svg-icons";
import { faMoon as solidMoon } from "@fortawesome/free-solid-svg-icons";
import { faCloudShowersHeavy as solidRain } from "@fortawesome/free-solid-svg-icons";
import { faCloud as solidCloud } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon as FAIcon } from "@fortawesome/react-fontawesome";

const Weather = (props) => {
  //function to check if its day/night
  const isDay = () => {
    const timeNow = Date.now();
    const timeThere = timeNow + props.weather.timezone + 14400;
    if (timeThere > props.weather.sunrise * 1000 && timeThere < props.weather.sunset * 1000) {
      return true;
    }
    return false;
  };
  //change backgrounds based on daytime
  const gradientOpacity = 0.25;
  // if (isDay()) {
  //   document.body.style.backgroundImage =
  //     // "url(https://files.123freevectors.com/wp-content/original/104312-yellow-stripes-pattern.jpg)";
  //     `linear-gradient(rgba(0, 0, 0, ${gradientOpacity}), rgba(0, 0, 0, ${gradientOpacity})), url(https://stockarch.com/files/12/06/panoramic_skyline.jpg)`;
  // }
  // else {
  // document.body.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, ${gradientOpacity}), rgba(0, 0, 0, ${gradientOpacity})), url(https://i.pinimg.com/originals/07/00/b5/0700b59b0a405697a65f09fb414e75fe.jpg)`;
  // }
  //change icons based on daytime

  let icon = isDay() ? solidSun : solidMoon;
  let iconColor = isDay() ? "orange" : "white";
  const color = "rgb(36, 35, 30)";
  //change backgrounds and icons based on weather

  if (props.weather.weather === "Clouds") {
    // document.body.style.backgroundImage =
    //   // "url(https://c1.wallpaperflare.com/preview/717/892/904/air-sky-cloud-background.jpg)";
    //   `linear-gradient(rgba(0, 0, 0, ${gradientOpacity}), rgba(0, 0, 0, ${gradientOpacity})), url(https://i.imgur.com/FBLroIN.jpg)`;
    icon = solidCloud;
    iconColor = "white";
  }
  if (props.weather.weather === "Rain") {
    // document.body.style.backgroundImage =
    //   //"url(https://d39l2hkdp2esp1.cloudfront.net/img/photo/133463/133463_00_2x.jpg?20171113020257)";
    //   `linear-gradient(rgba(0, 0, 0, ${gradientOpacity}), rgba(0, 0, 0, ${gradientOpacity})), url(https://live.staticflickr.com/6209/6087695435_4b545db144_b.jpg)`;
    icon = solidRain;
    iconColor = "white";
  }
  document.body.style.color = "white";

  const style = {
    backgroundColor: color,
  };
  return (
    <div style={style} id="weather">
      <div id="weather-texts">
        <span className="weather-text">
          {Math.round(props.weather.temp)} °C {<br></br>}
        </span>
        <span className="weather-text">
          {props.weather.weather === "Clear" ? "Clear" : props.weather.weather} {<br></br>}
        </span>
        <span className="weather-text">
          Wind: {Math.round(props.weather.windSpeed)} km/h {<br></br>}
        </span>{" "}
      </div>
      <div className="weather-icon">
        <FAIcon
          onClick={() => favClicked(id)}
          icon={icon}
          className="fas fa-camera fa-3x"
          style={{ color: iconColor }}
        />
      </div>
    </div>
  );
}

export default Weather;
