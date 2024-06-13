import React from "react";

const Minicards = ({getDayFromDate,day}) => {
  return (
    <div className="minicards">
      <div className="minicards-cards">
        <h4>{getDayFromDate(day.date)}</h4>
        <img src={day.icon} alt={day.description} />
        <p>{day.temp}&deg;C</p>
      </div>
    </div>
  );
};

export default Minicards;
