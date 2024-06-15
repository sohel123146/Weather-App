// Single component with tabs for different user roles
import React, { useState } from 'react';
import FarmerInfo from './FarmerInfo';
import EventPlannerInfo from './EventPlannerInfo';
import TravelerInfo from './TravelerInfo';

function WeatherInfo({ weather }) {
  const [activeTab, setActiveTab] = useState('farmer');

  return (
    <div>
      <nav>
        <button onClick={() => setActiveTab('farmer')}>Farmer</button>
        <button onClick={() => setActiveTab('traveler')}>Traveler</button>
        <button onClick={() => setActiveTab('eventPlanner')}>Event Planner</button>
      </nav>
      <div className='d-flex align-items-center justify-content-center'>
        {activeTab === 'farmer' && <FarmerInfo weather={weather} />}
        {activeTab === 'traveler' && <TravelerInfo weather={weather} />}
        {activeTab === 'eventPlanner' && <EventPlannerInfo weather={weather} />}
      </div>
    </div>
  );
}
export default WeatherInfo;
