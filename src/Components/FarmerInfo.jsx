import React from "react";
import humidityIcon from "./Assets/icons/humidity.svg";
import rainIcon from "./Assets/icons/rain.png";
import windIcon from "./Assets/icons/wind.svg";

function FarmerInfo({ weather }) {
    if (!weather || weather.rainProbability === undefined) {
        return <div>Loading...</div>;
      }
  return (
    <div className="farmer-info">
      <h3>Farmer's Weather Information</h3>
      <div className="highlight-card">
        <img src={rainIcon} alt="rain" width="30" height="30" />
        <div>Precipitation</div>
        <div>{weather.rainProbability} mm</div>
      </div>
      <div className="highlight-card">
        <img src={humidityIcon} alt="humidity" width="30" height="30" />
        <div>Humidity</div>
        <div>{weather.humidity}%</div>
      </div>
      <div className="highlight-card">
        <img src={windIcon} alt="wind" width="30" height="30" />
        <div>Wind Speed</div>
        <div>{weather.wind} km/h</div>
      </div>
    </div>
  );
}

export default FarmerInfo;
