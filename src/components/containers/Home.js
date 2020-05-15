/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React from "react";
import { useState, useEffect } from "react";
import { FontAwesomeIcon as FAIcon } from "@fortawesome/react-fontawesome";
import { faStar as regStar } from "@fortawesome/free-regular-svg-icons";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";

import Spotify from "./Spotify";
import Weather from "./Weather";
import Window from "./Window";
import Search from "./Search";
import Food from "./Food";
import Favorites from "./Favorites";
import Attractions from "./Attractions";
import Youtube from "./Youtube";
import unsplashId from "../../unsplash_id";

const Home = () => {
  const [current, setCurrent] = useState({});  
  // current is the bigAssObject we receive from "grabLocationData" that feeds most of the components with data
  const [username, setUserName] = useState("");
  // for welcoming
  const [email, setEmail] = useState("");
  // unique name to add favs to db
  const [favorites, setFavorites] = useState([]);
  // array of favs we got on initial load
  const [query, setQuery] = useState("");
  // save users search in case he wants to add it to favs(we only save his query, not actual country data
  const [iconStatus, setFavIcon] = useState(false);
  // FavIcon condition
  
  // since its different every time)

  // initial load
  useEffect(() => {
    fetch("http://localhost:8080/api/user")
      .then((res) => res.json())
      .then((user) => {
        console.log('Api/user path')
        setUserName(user.display_name);
        console.log('line 42 before email')
        setEmail(user.email);
        console.log('line 44 after email')
        console.log('Updating favs: ', user.favsArray)
        setFavorites(user.favsArray);
      })
      .catch((err) => err);
  }, []);
  // fires up on search submit and on click of fav city
  const grabLocationData = (location) => {
    console.log('Grabbing location')
    if (!location) return;
    // change the format of incoming string to add if as params
    const locationString = location
      .split(",")
      .map((word) => word.trim())
      .join("&");
    fetch(`http://localhost:8080/api/${locationString}`)
      .then((data) => data.json())
      .then((response) => {
        console.log("This is the response in grabLocationData: ", response);
        setCurrent(response);
        setQuery(email + ", " + response.userQuery);
      });
    
    fetch(
      `https://api.unsplash.com/search/photos?query=${locationString},skyline&client_id=${unsplashId}`
    )
      .then((data) => data.json())
      .then((response) => {
        console.log("This is the response from unsplash: ", response);
        const gradientOpacity = 0.2;
        const rand = Math.floor(Math.random() * 1000);
        document.body.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, ${gradientOpacity}), rgba(0, 0, 0, ${gradientOpacity})), url(${response.results[1].urls.full})`;
      });
  };
  // toggle fav doesnt toggle, only adds fav, there is no way to remove it, sorry guys, we had no time:(
  const toggleFav = (queryString) => {
    // format the string for params
    const values = queryString.split(",").map((elem) => elem.trim());
    const city = values[1];
    const country = values[2];
    const userEmail = values[0];
    fetch(`http://localhost:8080/api/toggleFav/${city}&${country}&${userEmail}`, {
      method: "POST",
    })
      .then((data) => data.json())
      .then((updatedFavs) => {
        console.log('Updating favs: ', updatedFavs)
        setFavorites(updatedFavs);
        // receive new array of favs and change the state
      });
  };

  if (!Object.keys(current).length) {
    // there is no current - render only these..
    return (
      <div>
        <div id="leftColumn">
          <Search grabLocationData={grabLocationData} />
          <div className="welcoming">Welcome, {username}!</div>
        </div>
        <div id="middleColumn"></div>
        <div className="rightColumn">
          <Favorites
            favorites={favorites}
            grabLocationData={grabLocationData}
            setCurrent={setCurrent}
          />
        </div>
      </div>
    );
  }

  // Determine star icon based on whether current city is a favorite or not
  const favIcon =( 
    <span className="favIcon empty-icon">
      <FAIcon
        onClick={() => {
          toggleFav(query);
        }}
        size="2x"
        icon={regStar}
        style={{ color: "white" }}
      />
  </span>
  );
  // const values = current.userQuery.split(",").map((elem) => elem.trim());
  // // If the favorites array is not empty
  // if (favorites.length > 0){
  //   // Check if favorites has an object where the city is equal to our current city.
  //   const favIcon = favorites.some(obj => obj['city']=values[0]) ? (
  //     <span className="favIcon solid-icon">
  //       <FAIcon
  //         onClick={() => {
  //           toggleFav(query);
  //         }}
  //         size="2x"
  //         icon={solidStar}
  //         style={{ color: "yellow" }}
  //       />
  //     </span>) : favIcon
  // }

  return (
    <div id="main">
      <div id="leftColumn">
        <div className="welcoming">
          {" "}
          <br />
          Welcome, {username}
          !
          <br />
          <br />{" "}
        </div>
        <Weather weather={current.weatherData} />
        <Window country={current.countryData} />
        <Spotify songs={current.trackList} />
      </div>
      <div id="middleColumn">
        <Search grabLocationData={grabLocationData} />
        <div id="favIcon">{favIcon}</div>
        <Youtube video={current.youtube} />
        {/* <div id="youtube-container">
          <iframe
            className="youtube-iframe"
            width="560"
            height="315"
            src="https://www.youtube.com/embed/g-FH4-kKJbE"
            frameborder="0"
            allow="accelerometer; autoplay;  encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div> */}
        <Attractions attractions={current.travelInfo} />
        
      </div>
      <div id="rightColumn">
        <Favorites
          favorites={favorites}
          grabLocationData={grabLocationData}
          setCurrent={setCurrent}
        />
        <Food recipes={current.recipes} />
      </div>
    </div>
  );
}

export default Home;
