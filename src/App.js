import { useEffect, useState } from "react";
import WeatherContainer from "./containers/WeatherContainer";
import axios from "axios";
import SearchEngine from "./components/SearchEngine";

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({
    loading: true,
    data: {},
    error: false,
  });

  const getWeatherData = async (url) => {
    try {
      const res = await axios.get(url);
      setWeather({ data: res.data, loading: false, error: false });
    } catch (error) {
      setWeather({ ...weather, data: {}, error: true });
      // console.log("Error:", error);
    }
  };

  const search = async (event) => {
    event.preventDefault();
    if (
      event.type === "click" ||
      (event.type === "keypress" && event.key === "Enter")
    ) {
      setWeather({ ...weather, loading: true });
      const apiKey = "ce585554713cb245ff62b2fb7ed448bf";
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=metric`;
      await getWeatherData(url);
    }
  };

  useEffect(() => {
    const fetchWeatherForCurrentLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            const apiKey = "ce585554713cb245ff62b2fb7ed448bf";
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
            await getWeatherData(url);
          },
          (error) => {
            console.log("error:", error);
            const defaultCity = "Yangon";
            const apiKey = "ce585554713cb245ff62b2fb7ed448bf";
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${defaultCity}&appid=${apiKey}&units=metric`;
            getWeatherData(url);
          }
        );
      } else {
        const defaultCity = "Yangon";
        const apiKey = "ce585554713cb245ff62b2fb7ed448bf";
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${defaultCity}&appid=${apiKey}&units=metric`;
        getWeatherData(url);
      }
    };

    fetchWeatherForCurrentLocation();
  }, []);

  return (
    <div className="App">
      <SearchEngine query={query} setQuery={setQuery} search={search} />

      {weather.loading && (
        <>
          <br />
          <br />
          <div className="text-center">
            <l-trio size="40" speed="1.3" color="black"></l-trio>
          </div>
        </>
      )}

      {weather.error && (
        <>
          <br />
          <br />
          <span className="error-message">
            <span style={{ fontFamily: "font" }}>
              Sorry, city not found. Please try again.
            </span>
          </span>
        </>
      )}

      {weather && weather.data && weather.data.weather && (
        <WeatherContainer weather={weather} />
      )}
    </div>
  );
}

export default App;
