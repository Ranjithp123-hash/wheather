import React, { useState, useEffect } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';

import clouds from '../assest/clouds.png';
import humidity from '../assest/humidity.png';
import wind from '../assest/wind.png';
import clear from '../assest/clear.png';
import rain from '../assest/rain.png';
import drizzle from '../assest/drizzle.png';
import mist from '../assest/mist.png';
import windSVG from '../assest/wind-svgrepo-com.svg';
import humaditySVG from '../assest/humidity-svgrepo-com.svg'
import './Wheather.css';

const Wheather = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  const apiKey = "20873376e9def4a5ae27f3e8a5ad8512";
  const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

  useEffect(() => {
    document.body.className = isDarkMode ? 'dark-mode' : 'light-mode';
  }, [isDarkMode]);

  const checkWeather = async () => {
    try {
      const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
      if (response.status === 404) {
        setError(true);
        setWeatherData(null);
      } else {
        const data = await response.json();
        setWeatherData(data);
        setError(false);
      }
    } catch (error) {
      setError(true);
      setWeatherData(null);
    }
  };

  const getWeatherIcon = (weather) => {
    switch (weather) {
      case 'Clouds':
        return clouds;
      case 'Clear':
        return clear;
      case 'Rain':
        return rain;
      case 'Drizzle':
        return drizzle;
      case 'Mist':
        return mist;
      default:
        return 'default.png';
    }
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const formatDate = (timestamp, timezone) => {
    const date = new Date((timestamp + timezone) * 1000);
    return date.toUTCString().replace('GMT', '');
  };

  return (
    <div className={isDarkMode ? 'card dark' : 'card light'}>
      <div className="theme-toggle">
        <button onClick={toggleTheme}>
          {isDarkMode ? <i className="fa-solid fa-moon"></i> : <i className="fa-solid fa-sun"></i>}
        </button>
      </div>
      <div className="search">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={checkWeather}>
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </div>
      {error && <div className="error">Invalid data</div>}
      {weatherData && (
        <div className="weather">
          <img
            src={getWeatherIcon(weatherData.weather[0].main)}
            className="weather-icon"
            alt="weather icon"
          />
          <h1 className="temp">{Math.round(weatherData.main.temp)}°C</h1>
          <h2 className="city">{weatherData.name}</h2>
          <p className="date">
            {formatDate(weatherData.dt, weatherData.timezone)}
          </p>
          <div className="details">
            <div className="col">
              <img src={!isDarkMode ? humaditySVG : humidity} alt="humidity" />
              <div>
                <p className="humidity">{weatherData.main.humidity}%</p>
                <p>Humidity</p>
              </div>
            </div>
            <div className="col">
              <img src={!isDarkMode ? windSVG : wind} alt="wind" />
              <div>
                <p className="wind">{weatherData.wind.speed} km/h</p>
                <p>Wind Speed</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Wheather;
