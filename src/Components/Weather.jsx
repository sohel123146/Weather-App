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
import rainBackground from "./Assets/backgrounds/Rain.jpg";
import snowBackground from "./Assets/backgrounds/snow.jpg";
import Minicards from "./Minicards";
import Hourlycards from "./Hourlycards";
// import FarmerInfo from "./FarmerInfo"
// import TravelerInfo from "./TravelerInfo";
// import EventPlannerInfo from "./EventPlannerInfo"
import WeatherInfo from "./WeatherInfo";

function getDayFromDate(dateString) {
  const date = new Date(dateString);
  const options = { weekday: "long" };
  const day = date.toLocaleDateString("en-US", options);
  return day;
}

const Weather = () => {
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
    forecast: [],
    hourly: [],
    rainProbability: 0,
    soilMoisture: 0,
    advisories: [],
  });

  const [input, setInput] = useState("");
  const [icon, setIcon] = useState(cloudIcon);

  const apikey = "d94ef4569ed145c988b133335241206";

  const setBodyBackground = useCallback((background) => {
    document.body.style.backgroundImage = `url(${background})`;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundPosition = "center";
  }, []);

  const search = useCallback(
    async (location) => {
      try {
        const url = `https://api.weatherapi.com/v1/forecast.json?key=${apikey}&q=${location}&days=3&aqi=no&alerts=yes`;
        let data = await fetch(url);
        let parsedData = await data.json();

        const currentWeather = parsedData.current;
        const forecast = parsedData.forecast.forecastday;
        const hourly = forecast[0].hour;

        setWeather({
          temp: currentWeather.temp_c,
          location: parsedData.location.name,
          lat: parsedData.location.lat,
          lon: parsedData.location.lon,
          des: currentWeather.condition.text,
          humidity: currentWeather.humidity,
          wind: currentWeather.wind_kph,
          pressure: currentWeather.pressure_mb,
          feelslike: currentWeather.feelslike_c,
          forecast: forecast.map((day) => ({
            date: day.date,
            icon: day.day.condition.icon,
            temp: day.day.avgtemp_c,
            description: day.day.condition.text,
          })),
          hourly: hourly.map((hour) => ({
            time: hour.time,
            icon: hour.condition.icon,
            temp: hour.temp_c,
            description: hour.condition.text,
          })),
          rainProbability: currentWeather.precip_mm,
          soilMoisture: currentWeather.soil_moisture, // Assuming API provides this data
          advisories: parsedData.alerts ? parsedData.alerts.alert : [],
        });

        setInput("");

        // Set background based on current weather condition
        switch (currentWeather.condition.icon) {
          case "//cdn.weatherapi.com/weather/64x64/day/113.png":
          case "//cdn.weatherapi.com/weather/64x64/night/113.png":
            setIcon(clearIcon);
            setBodyBackground(clearBackground);
            break;
          case "//cdn.weatherapi.com/weather/64x64/day/116.png":
          case "//cdn.weatherapi.com/weather/64x64/night/116.png":
            setIcon(cloudIcon);
            setBodyBackground(cloudyBackground);
            break;
          case "//cdn.weatherapi.com/weather/64x64/day/119.png":
          case "//cdn.weatherapi.com/weather/64x64/night/119.png":
          case "//cdn.weatherapi.com/weather/64x64/day/122.png":
          case "//cdn.weatherapi.com/weather/64x64/night/122.png":
          case "//cdn.weatherapi.com/weather/64x64/day/143.png":
          case "//cdn.weatherapi.com/weather/64x64/night/143.png":
            setIcon(drizzleIcon);
            setBodyBackground(rainBackground);
            break;
          case "//cdn.weatherapi.com/weather/64x64/day/176.png":
          case "//cdn.weatherapi.com/weather/64x64/night/176.png":
          case "//cdn.weatherapi.com/weather/64x64/day/179.png":
          case "//cdn.weatherapi.com/weather/64x64/night/179.png":
            setIcon(rainIcon);
            setBodyBackground(rainBackground);
            break;
          case "//cdn.weatherapi.com/weather/64x64/day/227.png":
          case "//cdn.weatherapi.com/weather/64x64/night/227.png":
          case "//cdn.weatherapi.com/weather/64x64/day/230.png":
          case "//cdn.weatherapi.com/weather/64x64/night/230.png":
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
    search("India"); // Default location
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
    <>
    <div className="container">
      <aside>
        <div className="topbar">
          <input
            type="text"
            value={input}
            onChange={handleOnChange}
            className="cityInput"
            placeholder="Search city"
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
      <section>
        {input.length === 0 && (
          <div className="highlights">
            <div className="highlight_card">
              <div className="highlight_details">
                <img src={humidityIcon} alt="humidity" width="20" height="20" />
                <h3 className="highlight-text">HUMIDITY</h3>
              </div>
              <div className="highlight_value">{weather.humidity}%</div>
            </div>
            <div className="highlight_card">
              <div className="highlight_details">
                <img src={windIcon} alt="wind" width="20" height="20" />
                <h3 className="highlight-text">WIND</h3>
              </div>
              <div className="highlight_value">{weather.wind} km/h</div>
            </div>
            <div className="highlight_card">
              <div className="highlight_details">
                <img src={pressureIcon} alt="pressure" width="20" height="20" />
                <h3 className="highlight-text">PRESSURE</h3>
              </div>
              <div className="highlight_value">{weather.pressure} hPa</div>
            </div>
            <div className="highlight_card">
              <div className="highlight_details">
                <img src={feelsIcon} alt="feels like" width="20" height="20" />
                <h3 className="highlight-text">FEELS LIKE</h3>
              </div>
              <div className="highlight_value">{weather.feelslike}°C</div>
            </div>
          </div>
        )}
      </section>
      {input.length === 0 && (
        <section>
          <div>
            {weather.forecast.length > 0 && (
              <div className="minicard-items">
                {weather.forecast.map((day, index) => (
                  <Minicards
                    key={index}
                    day={day}
                    index={index}
                    getDayFromDate={getDayFromDate}
                  />
                ))}
              </div>
            )}
          </div>
          {weather.hourly.length > 0 && (
            <div className="hourly-forecast">
              {weather.hourly.map((hour, index) => (
                <Hourlycards key={index} hour={hour} />
              ))}
            </div>
          )}
        </section>
      )}
    </div>
    {input.length === 0 && (<div>
      <WeatherInfo weather={weather}/>
    </div>)}
    </>
  );
};

export default Weather;

