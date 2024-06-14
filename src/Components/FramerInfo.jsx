import React from "react";
import humidityIcon from "./Assets/icons/humidity.svg";
import rainIcon from "./Assets/icons/rain.png";
import windIcon from "./Assets/icons/wind.svg";

function FarmerInfo({ weather }) {
  return (
    <div className="farmer-info">
      <h3>Farmer's Weather Information</h3>
      <div className="highlight_card">
        <img src={rainIcon} alt="rain" width="20" height="20" />
        <div>Precipitation {weather.rainProbability} mm</div>
      </div>
      <div className="highlight_card">
        <img src={humidityIcon} alt="humidity" width="20" height="20" />
        <div>Humidity {weather.humidity}%</div>
      </div>
      <div className="highlight_card">
        <img src={windIcon} alt="wind" width="20" height="20" />
        <div>Wind Speed {weather.wind} km/h</div>
      </div>
    </div>
  );
}

export default FarmerInfo;
