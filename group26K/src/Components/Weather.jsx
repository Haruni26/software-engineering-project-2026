/**
 * @file Weather.js
 * @description React component to display weather information based on latitude and longitude using the OpenWeatherMap API.
 * @author Alexander Colpitts
 */

import React, { useState, useEffect } from "react";
import axios from "axios";

/**
 * Weather Component
 *
 * @param {Object} props - Component properties.
 * @param {number} props.lat - Latitude of the location.
 * @param {number} props.lon - Longitude of the location.
 * @returns {JSX.Element} A component displaying the current weather information.
 */


const Weather = ({ lat, lon }) => {
  /**
   * State to store weather data fetched from the API.
   * @type {[Object|null, Function]}
   */
  const [weatherData, setWeatherData] = useState(null);

  /**
   * Effect to fetch weather data when latitude or longitude changes.
   */
  useEffect(() => {
    /**
     * Fetches weather data from OpenWeatherMap API.
     */
    const fetchWeather = async () => {
      const apiKey = import.meta.env.VITE_WEATHER_API_KEY;// Unique API Key received from OpenWeatherMap
      // Altered to hide the API key from GitHub - DeJuan
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
        );
        setWeatherData(response.data);
      } catch (error) {
        console.error("Error fetching the weather data", error);
      }
    };

    fetchWeather();
  }, [lat, lon]);

  // Show loading message while data is being fetched
  if (!weatherData) {
    return <p>Loading...</p>;
  }

  // Extract temperature and icon URL from weather data
  const temp = Math.round(weatherData.main.temp);
  const iconUrl = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;

  return (
    <div className="flex flex-col items-center space-y-1">
      {/* Weather Display */}
      <img src={iconUrl} alt="Weather Icon" className="w-8 h-8" />
      <span className="text-sm font-medium">{temp}°C</span>
    </div>
  );
};

export default Weather;
