import React from "react";
import rainIcon from "./Assets/icons/rain.png";
import windIcon from "./Assets/icons/wind.svg";

function EventPlannerInfo({ weather }) {
  if (!weather || weather.rainProbability === undefined) {
    return <div>Loading...</div>;
  }
  return (
    <div className="event-planner-info">
      <h3>Event Planner's Weather Information</h3>
      <div className="highlight-card">
        <img src={rainIcon} alt="rain" width="30" height="30" />
        <div>Rain Probability</div>
        <div>{weather.rainProbability}%</div>
      </div>
      <div className="highlight-card">
        <img src={windIcon} alt="wind" width="30" height="30" />
        <div>Wind Speed</div>
        <div>{weather.wind} km/h</div>
      </div>
    </div>
  );
}

export default EventPlannerInfo;
