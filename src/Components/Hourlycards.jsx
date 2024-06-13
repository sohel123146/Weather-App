import React from "react";

const Hourlycards = ({hour}) => {
  return (
    <div>
      <div className="hourly-forecast-item">
        <p>
          {new Date(hour.time).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
        <img src={hour.icon} alt={hour.description} />
        <p>{hour.temp}&deg;C</p>
      </div>
    </div>
  );
};

export default Hourlycards;
