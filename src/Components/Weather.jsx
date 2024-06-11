import React, { useEffect, useState, useCallback } from "react";
import searchIcon from "./Assets/icons/search.png";
import clearIcon from "./Assets/icons/clear.png";
import cloudIcon from "./Assets/icons/cloud.png";
import drizzleIcon from "./Assets/icons/drizzle.png";
import humidityIcon from "./Assets/icons/humidity.svg";
import rainIcon from "./Assets/icons/rain.png";
import snowIcon from "./Assets/icons/snow.png";
import windIcon from "./Assets/icons/wind.svg";
import pressureIcon from "./Assets/icons/pressure.svg";
import feelsIcon from "./Assets/icons/feels_like.svg";
import { useDate } from "../Utils/useDate";
import clearBackground from "./Assets/backgrounds/Clear.jpg";
import cloudyBackground from "./Assets/backgrounds/Cloudy.jpg";
import rainBackground from "./Assets/backgrounds/Rainy.jpg";
import snowBackground from "./Assets/backgrounds/snow.jpg";

export default function Weather() {
  const [weather, setWeather] = useState({
    temp: 0,
    location: "",
    lat: 0,
    lon: 0,
    des: "",
    humidity: 0,
    wind: 0,
    pressure: 0,
    feelslike: 0,
  });

  const [input, setInput] = useState("");
  const [icon, setIcon] = useState(cloudIcon);

  const api_key = "c5bdd6f900d13018e9b5121254011a46";

  const setBodyBackground = useCallback((background) => {
    document.body.style.backgroundImage = `url(${background})`;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundPosition = "center";
  }, []);

  const search = useCallback(
    async (city = "London") => {
      try {
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=Metric&appid=${api_key}`;
        let data = await fetch(url);
        let parsedData = await data.json();

        setWeather({
          temp: parsedData.main.temp,
          location: parsedData.name,
          lat: parsedData.coord.lat,
          lon: parsedData.coord.lon,
          des: parsedData.weather[0].description,
          humidity: parsedData.main.humidity,
          wind: parsedData.wind.speed,
          pressure: parsedData.main.pressure,
          feelslike: parsedData.main.feels_like,
        });

        setInput("");

        switch (parsedData.weather[0].icon) {
          case "01d":
          case "01n":
            setIcon(clearIcon);
            setBodyBackground(clearBackground);
            break;
          case "02d":
          case "02n":
            setIcon(cloudIcon);
            setBodyBackground(cloudyBackground);
            break;
          case "03d":
          case "03n":
          case "04d":
          case "04n":
          case "50d":
          case "50n":
            setIcon(drizzleIcon);
            setBodyBackground(rainBackground);
            break;
          case "09d":
          case "09n":
          case "10d":
          case "10n":
            setIcon(rainIcon);
            setBodyBackground(rainBackground);
            break;
          case "13d":
          case "13n":
            setIcon(snowIcon);
            setBodyBackground(snowBackground);
            break;
          default:
            setIcon(clearIcon);
            setBodyBackground(clearBackground);
            break;
        }
      } catch (error) {
        console.error("Error fetching weather data: ", error);
      }
    },
    [setBodyBackground]
  );

  useEffect(() => {
    search();
  }, [search]);

  const handleOnChange = (event) => {
    setInput(event.target.value);
  };

  const handleSearchClick = () => {
    if (input.trim() !== "") {
      search(input);
      setInput("");
    }
  };

  const { time } = useDate();

  return (
    <div className="container">
      <aside>
        <div className="topbar">
          <input
            type="text"
            value={input}
            onChange={handleOnChange}
            className="cityInput"
            placeholder="search city"
          />
          <div className="search-icon" onClick={handleSearchClick}>
            <img src={searchIcon} alt="search" />
          </div>
        </div>
        <div className="weather-details">
          <div className="cloud-icon">
            <img src={icon} alt="weather icon" width="150" height="150" />
          </div>
          <div className="weather-temp">{Math.floor(weather.temp)}&deg;C</div>
          <div className="time">
            <p className="d-flex text-center">{new Date().toDateString()}</p>
            <p className="d-flex text">{time}</p>
          </div>
          <div className="weather-location">{weather.location}</div>
          <div className="description">{weather.des}</div>
          <div className="coord">
            H: {weather.lat}° L: {weather.lon}°
          </div>
        </div>
      </aside>
      {input.length === 0 && (
        <div className="highlights">
          <div className="humidity_card">
            <div className="humidity_details">
              <img src={humidityIcon} alt="humidity" width="20" height="20" />
              <h1>HUMIDITY</h1>
            </div>
            <div className="humidity_value">{weather.humidity}°</div>
          </div>
          <div className="wind_card">
            <div className="wind_details">
              <img src={windIcon} alt="wind" width="20" height="20" />
              <h1>WIND</h1>
            </div>
            <div className="wind_value">{weather.wind} km/h</div>
          </div>
          <div className="pressure_card">
            <div className="pressure_details">
              <img src={pressureIcon} alt="pressure" width="20" height="20" />
              <h1>PRESSURE</h1>
            </div>
            <div className="pressure_value">{weather.pressure} hPa</div>
          </div>
          <div className="feelslike_card">
            <div className="feelslike_details">
              <img src={feelsIcon} alt="feels like" width="20" height="20" />
              <h1>FEELS LIKE</h1>
            </div>
            <div className="feelslike_value">{weather.feelslike}°</div>
          </div>
        </div>
      )}
    </div>
  );
}
