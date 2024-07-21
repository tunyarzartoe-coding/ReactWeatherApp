import React from "react";
import WeatherForecast from "../components/WeatherForecast";

const WeatherContainer = ({ weather }) => {
  return (
    <div className="weather-container">
      <WeatherForecast weather={weather} />
    </div>
  );
};

export default WeatherContainer;
