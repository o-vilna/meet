import React from 'react';
import CitySearch from './components/CitySearch';
import EventList from './components/EventList';
import NumberOfEvents from './components/NumberOfEvents';
import { useEffect, useState } from 'react';
import { extractLocations, getEvents } from './api';

import './App.css';

const App = () => {
  const [events, setEvents] = useState([]);
  const [currentNOE, setCurrentNOE] = useState(32);
  const [allLocations, setAllLocations] = useState([]);
  const [currentCity, setCurrentCity] = useState("See all cities");

  useEffect(() => {
    fetchData();
  }, [currentCity, currentNOE]);

  const fetchData = async () => {
    const allEvents = await getEvents();
    
    // Filter events by city
    const filteredEvents = currentCity === "See all cities" 
      ? allEvents 
      : allEvents.filter(event => {
          return event.location && 
                 event.location.toLowerCase().includes(currentCity.toLowerCase());
        });
    
    // Limit the number of events according to currentNOE
    setEvents(filteredEvents.slice(0, currentNOE));
    setAllLocations(extractLocations(allEvents));
  };

  return (
    <div className="App">
      <div className="alerts-container">
        {/* Place for future alerts */}
      </div>
      <CitySearch 
        allLocations={allLocations} 
        setCurrentCity={setCurrentCity} 
      />
      <NumberOfEvents 
        setNumberOfEvents={setCurrentNOE}
      />
      <div className="charts-container">
        {/* Місце для майбутніх графіків */}
      </div>
      <EventList 
        events={events}
      />
    </div>
  );
}

export default App;
