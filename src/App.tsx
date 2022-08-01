import React, { FC } from 'react';
import './App.css';
import { Routes, Route } from "react-router-dom";
import DriverResults from './components/DriverResults';
import Overall from './components/Overall';
import RaceResults from './components/RaceResults';

const App: FC = () => {
  return (
    <div className="App">      
        <Routes>
          <Route path="/" element={<Overall />} />
          <Route path="driverresults/:id" element={<DriverResults />} />
          <Route path="raceresults/:round" element={<RaceResults />} />
        </Routes>
    </div>
  );
}

export default App;
