import React from "react";
import windIcon from "./Assets/icons/wind.svg";

function TravelerInfo({ weather }) {
  return (
    <div className="traveler-info">
      <h3>Traveler's Weather Information</h3>
      <div className="highlight-card">
        <img src={windIcon} alt="advisory" width="30" height="30" />
        <div>Travel Advisories {weather.advisories.length > 0 ? weather.advisories.join(", ") : "None"}</div>
      </div>
    </div>
  );
}

export default TravelerInfo;
