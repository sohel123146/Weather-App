import React, { useEffect, useState } from "react";
import "./Weather.css";
import searchIcon from "../Assets/search.png";
import clearIcon from "../Assets/clear.png";
import cloudIcon from "../Assets/cloud.png";
import drizzleIcon from "../Assets/drizzle.png";
import humidityIcon from "../Assets/humidity.svg";
import rainIcon from "../Assets/rain.png";
import snowIcon from "../Assets/snow.png";
import windIcon from "../Assets/wind.svg";
import pressureIcon from "../Assets/pressure.svg";
import feelsIcon from "../Assets/feels_like.svg";

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

  const search = async (city = "London") => {
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
            break;
          case "02d":
          case "02n":
            setIcon(cloudIcon);
            break;
          case "03d":
          case "03n":
          case "04d":
          case "04n":
          case "50d":
          case "50n":
            setIcon(drizzleIcon);
            break;
          case "09d":
          case "09n":
          case "10d":
          case "10n":
          case "11d":
          case "11n":
            setIcon(rainIcon);
            break;
          case "13d":
          case "13n":
            setIcon(snowIcon);
            break;
          default:
            setIcon(clearIcon);
            break;
        }
    } catch (error) {
        console.error("Error fetching weather data: ", error);
    }
  };

  useEffect(() => {
    search();
  }, []);

  const handleOnChange = (event) => {
    setInput(event.target.value);
  };

  const handleSearchClick = () => {
    if (input.trim() !== "") {
      search(input);
      setInput("");
    }
  };

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
