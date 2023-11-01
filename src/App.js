import React, { useState, useEffect, useCallback } from 'react';
import './WeatherApp.css';

const WeatherApp = () => {
  const [temp, setTemp] = useState('');
  const [weather, setWeather] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);

  const handleGeoSucc = useCallback((position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    getWeather(latitude, longitude);
  }, []);

  const requestCoords = useCallback(() => {
    navigator.geolocation.getCurrentPosition(handleGeoSucc, handleGeoErr);
  }, [handleGeoSucc]);

  function handleGeoErr(err) {
    console.log("geo err! " + err);
  }

  function getWeather(lat, lon) {
    fetch(`http://api.openweathermap.org/data/2.5/weather?id=1835848&appid=88c0d21361193be6e5495b837aeee17c`)
      .then(res => res.json())
      .then(data => {
        const temperature = (data.main.temp - 273.15).toFixed(2);
        const weatherType = data.weather[data.weather.length - 1].main;
        setTemp(temperature);
        setWeather(weatherType);
        setIsLoaded(true);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }

  useEffect(() => {
    requestCoords();
  }, [requestCoords]);

  return (
    <div className={`weather-container ${isLoaded ? 'show' : ''}`}>
      <h2>LJB 수원 날씨</h2>
      <div className="weather-info">
        <p className="temperature">온도°C: {temp}°C</p>
        <p className="weather-type">기상: {weather}</p>
      </div>
    </div>
  );
};

export default WeatherApp;
