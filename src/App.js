// App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Weather from './Components/Weather';
import WeatherInfo from './Components/WeatherInfo';
import './App.css';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Weather />} />
          <Route exact path="/WeatherInfo" element={<WeatherInfo />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
