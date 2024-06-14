import React from "react";
import rainIcon from "./Assets/icons/rain.png";
import windIcon from "./Assets/icons/wind.svg";

function EventPlannerInfo({ weather }) {
  return (
    <div className="event-planner-info">
      <h3>Event Planner's Weather Information</h3>
      <div className="highlight_card">
        <img src={rainIcon} alt="rain" width="20" height="20" />
        <div>Rain Probability {weather.rainProbability}%</div>
      </div>
      <div className="highlight_card">
        <img src={windIcon} alt="wind" width="20" height="20" />
        <div>Wind Speed {weather.wind} km/h</div>
      </div>
    </div>
  );
}

export default EventPlannerInfo;
