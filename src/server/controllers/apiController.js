/* eslint-disable object-curly-newline */
const apiController = {};
const fetch = require('node-fetch');
const axios = require('axios');

apiController.setQuery = (req, res, next) => {
  res.locals.data = { userQuery: `${req.params.city}, ${req.params.country}` };
  return next();
};

apiController.getCountryData = (req, res, next) => {
  let { country } = req.params;
  country = country.toLowerCase();

  // handle common inputs that result in errors unexpected country
  if (country === 'uk') {
    country = 'GB';
  } else if (country === 'us' || country === 'united states') {
    country = 'usa';
  }

  const url = `https://restcountries.eu/rest/v2/name/${country}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      // destructure from array
      const [countryObj] = data;

      // destructure preferred properties
      const { name, alpha2Code, capital, region, area, population, languages, flag } = countryObj;

      // format languages
      const langs = languages.map((lang) => lang.name);

      const countryData = {
        name,
        alpha2Code,
        capital,
        region,
        area,
        population,
        languages: langs,
        flag,
      };
      res.locals.data.countryData = countryData;

      // console.log(res.locals.data);
      return next();
    })
    .catch((err) => next(`Error in getCountryData${err}`));
};

apiController.getWeatherData = (req, res, next) => {
  const { city } = req.params;
  const apiKey = '3f38b9994196b8f88058af69468302df';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      // format weather data from api
      const weatherData = {
        weather: data.weather[0].main,
        temp: data.main.temp,
        feels_like: data.main.feels_like,
        temp_min: data.main.temp_min,
        temp_max: data.main.temp_max,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        sunrise: data.sys.sunrise,
        sunset: data.sys.sunset,
        timezone: data.timezone,
      };
      res.locals.data.weatherData = weatherData;

      return next();
    })
    .catch((err) => {
      next(`Error in getWeatheryData: ${err}`);
    });
};

apiController.getSpotifyData = (req, res, next) => {
  // fetch featured playlist in specified country from spotify
  const accessToken = req.cookies.token.access_token;
  const { alpha2Code } = res.locals.data.countryData;
  let country = res.locals.data.countryData.name;
  const url = `https://api.spotify.com/v1/browse/categories/toplists/playlists?country=${alpha2Code}`;

  if (alpha2Code === 'US') {
    country = 'United States';
  } else if (alpha2Code === 'GB') {
    country = 'United Kingdom';
  }

  // use access token cookie
  const options = {
    headers: { Authorization: `Bearer ${accessToken}` },
    mode: 'no-cors',
  };

  // get featured playlists from region
  fetch(url, options)
    .then((response) => response.json())
    .then((data) => {
      // get tracks href of top 50 regional playlist
      // console.log('This is the data from Spotify-> ', data.playlists.items);
      const tracksURL = data.playlists.items.find(
        (playlist) => playlist.name === `${country} Top 50`
      );

      res.locals.data.trackList = tracksURL.id;
      return next();
    })
    .catch((err) => next(
      {
        log: 'Error fetching tracklist data from Spotify Api.',
        message: { error: 'Error from Spotify Api: ', err },
      },
    ));

  // .catch( (err) => {
  //   console.log('spotify not available in specified country');
  //   res.locals.data.trackList = [];
  //   return next();
  // });
};

apiController.getComplexRecipes = (req, res, next) => {
  // const searchCuisine = req.body.searchParams;
  let countryKey = req.params.country.toLowerCase();
  if (countryKey === 'us' || countryKey === 'usa' || countryKey === 'united states' || countryKey === 'america') {
    countryKey = 'unitedStates';
  }
  if (countryKey === 'uk' || countryKey === 'united kingdom' || countryKey === 'britain' || countryKey === 'great britain' || countryKey === 'gb') {
    countryKey = 'unitedKingdom';
  }
  const cuisineObj = {
    argentina: 'Latin American',
    australia: 'British',
    austria: 'European',
    brazil: 'Latin American',
    canada: 'British',
    chile: 'Spanish',
    china: 'Chinese',
    colombia: 'Latin American',
    denmark: 'European',
    egypt: 'African',
    estonia: 'European',
    finland: 'European',
    france: 'French',
    germany: 'German',
    greece: 'Greek',
    iceland: 'European',
    india: 'Indian',
    indonesia: 'Chinese',
    iran: 'Mediterranean',
    ireland: 'Irish',
    israel: 'Jewish',
    italy: 'Italian',
    japan: 'Japanese',
    unitedKingdom: 'British',
    unitedStates: 'American',
  };


  let cuisineChoice;
  if (cuisineObj.hasOwnProperty(countryKey)) {
    cuisineChoice = cuisineObj[countryKey];
  } else {
    cuisineChoice = 'Italian';
  }

  const limit = '10'; // Lowered the limit so David gets more hits
  const apiKey = 'fc4f7bc8bd37432684adbe0ec6844a8c';

  const url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&cuisine=${cuisineChoice}&addRecipeInformation=true&number=${limit}`;

  // console.log('url **** =', url);
  axios
    .get(url)
    .then((response) => {
      res.locals.data.recipes = response.data.results;
      return next();
    })
    .catch((err) => next(
      {
        log: 'Error fetching data from Spoonacular Api.',
        message: { error: 'Error from Spoonacular Api: ', err },
      },
    ));
};

apiController.getYouTubeVideos = (req, res, next) => {
  let { city } = req.params;
  city = city.replace(' ', '%20');
  // console.log('city =', city);

  const url = `https://www.googleapis.com/youtube/v3/search?q=${city}%20travel&key=AIzaSyC3SG6pLaOfulxfZeyl7Uy489tCAF-m1XQ`;

  axios
    .get(url)
    .then((response) => {
      // console.log("data we're getting back: ***", response.data.items);
      res.locals.data.youtube = response.data.items;
      return next();
    })
    .catch((err) => next(
      {
        log: 'Error fetching data from YouTube Api.',
        message: { error: 'Error from YouTube Api: ', err },
      },
    ));
};

apiController.getTravelInfo = (req, res, next) => {
  let { city } = req.params;
  city = city.replace(' ', '%20');
  // console.log("This is the city in getTravelInfo: ", city);
  const url1 = `https://api.sygictravelapi.com/1.2/en/places/list?limit=1&query=${city}`;
  const options = { headers: { 'x-api-key': 'pi9AODHpaqUOdUTgNweA7LbzxbJFKkD7O9fZ0We8' } };
  axios
    .get(url1, options)
    .then((response1) => {
      const placeInfo = response1.data.data.places;
      const { id } = placeInfo[0];
      // console.log("This is the id in getTravelInfo: ", id);
      const url2 = `https://api.sygictravelapi.com/1.1/en/places/list?parents=${id}&categories=sightseeing&limit=10`;
      axios
        .get(url2, options)
        .then((response2) => {
          // console.log(
          //   "This is the api response data after second request: ",
          //   response2.data.data.places
          // );
          res.locals.data.travelInfo = response2.data.data.places;
          return next();
        })
        .catch((err) => {
          return next({
            log: 'Error fetching travelInfo in getTravelInfo',
            message: { error: 'Error message from server: ', err },
          });
        });
    })
    .catch((err) => next(
      {
        log: 'Error fetching data from Sygic Travel Api.',
        message: {error: 'Error from Sygic Travel Api: ', err },
      },
    ));
};
module.exports = apiController;
